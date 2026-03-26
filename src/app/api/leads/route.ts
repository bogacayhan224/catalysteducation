import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Domain parts must be non-empty alphanumeric segments — rejects consecutive dots (e.g. hotmail..com)
const EMAIL_RE = /^[^\s@]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
const VALID_PROGRAM_TYPES = new Set(["diploma", "certificates", "undecided"]);
const VALID_GRADES = new Set(["9", "10", "11", "12"]);

interface LeadPayload {
  parentName: string;
  phone: string;
  email?: string;
  grade?: string;
  program_type?: string;
  subject?: string;
  message?: string;
  privacyConsent: boolean;
  whatsappConsent?: boolean;
  locale: string;
}

// Split "First Last" into firstname / lastname
function splitName(fullName: string): { firstname: string; lastname: string } {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return { firstname: parts[0], lastname: "" };
  const lastname = parts.pop()!;
  return { firstname: parts.join(" "), lastname };
}

async function sendLeadEmail(payload: LeadPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[leads] RESEND_API_KEY not set — skipping email notification");
    return;
  }

  const resend = new Resend(apiKey);
  const NOTIFY_TO = "info@catalysteducation.ca";
  const FROM = "Catalyst Website <noreply@catalysteducation.ca>";

  const programLabels: Record<string, string> = {
    diploma: "Canadian High School Diploma (OSSD)",
    certificates: "Future Skills Certificates",
    undecided: "Karar Verilmedi / Undecided",
  };

  const subjectLabels: Record<string, string> = {
    program: "Program Hakkında",
    enrollment: "Kayıt / Kabul",
    pricing: "Ücretlendirme",
    other: "Diğer",
  };

  const subjectRow = payload.subject
    ? `<tr><td style="padding:8px 0;color:#6b7280;width:140px">Konu</td><td style="padding:8px 0;color:#1F1D1A">${subjectLabels[payload.subject] ?? payload.subject}</td></tr>`
    : "";

  const messageRow = payload.message
    ? `<tr style="background:#f9fafb"><td style="padding:8px 12px 8px 0;color:#6b7280;vertical-align:top;width:140px">Mesaj</td><td style="padding:8px 0;color:#1F1D1A;white-space:pre-wrap">${payload.message}</td></tr>`
    : "";

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#fff;border:1px solid #e5e7eb;border-radius:8px">
      <h2 style="margin:0 0 20px;color:#1F1D1A;font-size:20px">📋 Yeni Lead — Catalyst Education</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:8px 0;color:#6b7280;width:140px">Ad Soyad</td><td style="padding:8px 0;font-weight:600;color:#1F1D1A">${payload.parentName}</td></tr>
        <tr style="background:#f9fafb"><td style="padding:8px 0;color:#6b7280">Telefon</td><td style="padding:8px 0;font-weight:600;color:#1F1D1A">${payload.phone}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280">E-posta</td><td style="padding:8px 0;color:#1F1D1A">${payload.email ?? "—"}</td></tr>
        <tr style="background:#f9fafb"><td style="padding:8px 0;color:#6b7280">Program</td><td style="padding:8px 0;color:#1F1D1A">${programLabels[payload.program_type ?? ""] ?? payload.program_type ?? "—"}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280">Sınıf</td><td style="padding:8px 0;color:#1F1D1A">${payload.grade ? `${payload.grade}. Sınıf` : "—"}</td></tr>
        ${subjectRow}
        ${messageRow}
        <tr style="background:#f9fafb"><td style="padding:8px 0;color:#6b7280">WhatsApp Onayı</td><td style="padding:8px 0;color:#1F1D1A">${payload.whatsappConsent ? "✅ Evet" : "❌ Hayır"}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280">Dil</td><td style="padding:8px 0;color:#1F1D1A">${payload.locale === "tr" ? "🇹🇷 Türkçe" : "🇺🇸 English"}</td></tr>
        <tr style="background:#f9fafb"><td style="padding:8px 0;color:#6b7280">Zaman</td><td style="padding:8px 0;color:#1F1D1A">${new Date().toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" })}</td></tr>
      </table>
      <p style="margin:20px 0 0;font-size:12px;color:#9ca3af">Bu e-posta catalysteducation.ca üzerindeki form doldurulduğunda otomatik olarak gönderilir.</p>
    </div>
  `;

  try {
    await resend.emails.send({
      from: FROM,
      to: NOTIFY_TO,
      subject: `Yeni Lead: ${payload.parentName} — ${programLabels[payload.program_type ?? ""] ?? payload.program_type}`,
      html,
    });
  } catch (err) {
    console.error("[leads] Resend email failed:", err);
  }
}

async function createHubSpotContact(payload: LeadPayload): Promise<string | null> {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) {
    console.warn("[leads] HUBSPOT_ACCESS_TOKEN not set — skipping HubSpot contact creation");
    return null;
  }

  const { firstname, lastname } = splitName(payload.parentName);

  const properties: Record<string, string> = {
    firstname,
    lastname,
    phone: payload.phone,
    lead_language: payload.locale,
  };

  if (payload.email) properties.email = payload.email;
  if (payload.grade) properties.student_grade = payload.grade;
  if (payload.program_type) properties.program_type = payload.program_type;
  if (payload.whatsappConsent !== undefined) {
    properties.whatsapp_consent = String(payload.whatsappConsent);
  }

  // Try to create. If conflict (409), search by email and return existing ID.
  const res = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ properties }),
  });

  if (res.status === 409 && payload.email) {
    // Contact exists — search by email to get the ID
    const existing = await findContactByEmail(token, payload.email);
    if (existing) {
      // Update the existing contact with new info
      await updateHubSpotContact(token, existing, properties);
    }
    return existing;
  }

  if (!res.ok) {
    const err = await res.text();
    console.error("[leads] HubSpot contact creation failed:", res.status, err);
    return null;
  }

  const data = await res.json() as { id: string };
  return data.id;
}

async function findContactByEmail(token: string, email: string): Promise<string | null> {
  const res = await fetch(
    `https://api.hubapi.com/crm/v3/objects/contacts/search`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filterGroups: [
          {
            filters: [{ propertyName: "email", operator: "EQ", value: email }],
          },
        ],
        properties: ["id"],
        limit: 1,
      }),
    }
  );
  if (!res.ok) return null;
  const data = await res.json() as { results: { id: string }[] };
  return data.results?.[0]?.id ?? null;
}

async function updateHubSpotContact(
  token: string,
  contactId: string,
  properties: Record<string, string>
): Promise<void> {
  await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ properties }),
  });
}

async function createHubSpotDeal(contactId: string, payload: LeadPayload): Promise<void> {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  const pipelineId = process.env.HUBSPOT_PIPELINE_ID ?? "default";
  const stageId = process.env.HUBSPOT_DEAL_STAGE_ID ?? "appointmentscheduled";

  if (!token) return;

  const date = new Date().toLocaleDateString(payload.locale === "tr" ? "tr-TR" : "en-US");
  const dealName = `Yeni Lead — ${payload.parentName} — ${date}`;

  const dealRes = await fetch("https://api.hubapi.com/crm/v3/objects/deals", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      properties: {
        dealname: dealName,
        dealstage: stageId,
        pipeline: pipelineId,
      },
    }),
  });

  if (!dealRes.ok) {
    console.error("[leads] HubSpot deal creation failed:", dealRes.status, await dealRes.text());
    return;
  }

  const deal = await dealRes.json() as { id: string };

  // Associate deal with contact
  await fetch(
    `https://api.hubapi.com/crm/v3/objects/deals/${deal.id}/associations/contacts/${contactId}/deal_to_contact`,
    {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

export async function POST(req: NextRequest) {
  let body: LeadPayload;

  try {
    body = await req.json() as LeadPayload;
  } catch {
    return NextResponse.json({ success: false, error: "invalid_body" }, { status: 400 });
  }

  // Independent server-side validation — never trust the frontend
  const fieldErrors: Record<string, string> = {};

  if (!body.parentName?.trim()) {
    fieldErrors.parentName = "Bu alan zorunludur.";
  }

  if (!body.phone?.trim()) {
    fieldErrors.phone = "Telefon numarası zorunludur.";
  } else {
    const digits = body.phone.trim().replace(/\D/g, "");
    if (digits.length < 7) {
      fieldErrors.phone = "Lütfen geçerli bir telefon numarası girin.";
    }
  }

  if (body.email?.trim() && !EMAIL_RE.test(body.email.trim())) {
    fieldErrors.email = "Lütfen geçerli bir e-posta adresi girin.";
  }

  if (!body.program_type) {
    fieldErrors.program_type = "Lütfen bir program seçin.";
  } else if (!VALID_PROGRAM_TYPES.has(body.program_type)) {
    fieldErrors.program_type = "Geçersiz program seçimi.";
  }

  if (body.grade && !VALID_GRADES.has(body.grade)) {
    fieldErrors.grade = "Geçersiz sınıf değeri.";
  }

  if (!body.privacyConsent) {
    fieldErrors.privacyConsent = "Devam etmek için kişisel veri onayını vermelisiniz.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      { success: false, error: "validation_failed", fieldErrors },
      { status: 400 }
    );
  }

  // Sanitize
  const payload: LeadPayload = {
    parentName: body.parentName.trim(),
    phone: body.phone.trim(),
    email: body.email?.trim() || undefined,
    grade: body.grade || undefined,
    program_type: body.program_type,
    subject: body.subject?.trim() || undefined,
    message: body.message?.trim().slice(0, 2000) || undefined,
    privacyConsent: body.privacyConsent,
    whatsappConsent: body.whatsappConsent ?? false,
    locale: body.locale ?? "tr",
  };

  // Run HubSpot and email notification in parallel — neither blocks the other
  const [contactId] = await Promise.all([
    createHubSpotContact(payload),
    sendLeadEmail(payload),
  ]);

  // Create deal if HubSpot contact was created/found
  if (contactId) {
    await createHubSpotDeal(contactId, payload);
  }

  // Return success regardless — we don't want a HubSpot/email outage to block form submissions
  return NextResponse.json({ success: true });
}
