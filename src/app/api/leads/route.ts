import { NextRequest, NextResponse } from "next/server";

interface LeadPayload {
  parentName: string;
  phone: string;
  email?: string;
  grade?: string;
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
    hs_lead_source: "WEBSITE",
    lead_language: payload.locale,
  };

  if (payload.email) properties.email = payload.email;
  if (payload.grade) properties.student_grade = payload.grade;
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
        lead_source: "Website",
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
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  // Basic server-side validation
  if (!body.parentName?.trim() || !body.phone?.trim()) {
    return NextResponse.json({ error: "missing_required_fields" }, { status: 400 });
  }
  if (!body.privacyConsent) {
    return NextResponse.json({ error: "privacy_consent_required" }, { status: 400 });
  }

  // Sanitize
  const payload: LeadPayload = {
    parentName: body.parentName.trim(),
    phone: body.phone.trim(),
    email: body.email?.trim() || undefined,
    grade: body.grade || undefined,
    privacyConsent: body.privacyConsent,
    whatsappConsent: body.whatsappConsent ?? false,
    locale: body.locale ?? "tr",
  };

  // Create HubSpot contact
  const contactId = await createHubSpotContact(payload);

  // Create deal if contact was created/found
  if (contactId) {
    await createHubSpotDeal(contactId, payload);
  }

  // Return success regardless — we don't want a HubSpot outage to block form submissions
  return NextResponse.json({ success: true });
}
