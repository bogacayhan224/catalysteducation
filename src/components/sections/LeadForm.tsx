"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { CheckCircle, MessageCircle, AlertCircle } from "lucide-react";

const COUNTRY_CODES = [
  { code: "+90", flag: "🇹🇷" },
  { code: "+1",  flag: "🇺🇸" },
  { code: "+44", flag: "🇬🇧" },
  { code: "+49", flag: "🇩🇪" },
  { code: "+31", flag: "🇳🇱" },
  { code: "+32", flag: "🇧🇪" },
  { code: "+33", flag: "🇫🇷" },
  { code: "+41", flag: "🇨🇭" },
  { code: "+43", flag: "🇦🇹" },
  { code: "+61", flag: "🇦🇺" },
  { code: "+971", flag: "🇦🇪" },
  { code: "+966", flag: "🇸🇦" },
];

function normalizePhone(countryCode: string, localPhone: string): string {
  const digits = localPhone.replace(/\D/g, "");
  const stripped = digits.startsWith("0") ? digits.slice(1) : digits;
  return `${countryCode}${stripped}`;
}

function isValidEmail(email: string): boolean {
  // Domain parts must be non-empty alphanumeric segments — rejects consecutive dots
  return /^[^\s@]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(email);
}

function trackEvent(name: string, properties?: Record<string, unknown>) {
  // Analytics hook — connect to GA4, Segment, or your preferred tool
  if (typeof window !== "undefined" && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", name, properties);
  }
  // eslint-disable-next-line no-console
  console.log("[track]", name, properties);
}

interface FormData {
  parentName: string;
  countryCode: string;
  phone: string;
  programType: string;
  email: string;
  grade: string;
  privacyConsent: boolean;
  whatsappConsent: boolean;
}

interface FormErrors {
  parentName?: string;
  phone?: string;
  programType?: string;
  email?: string;
  grade?: string;
  privacyConsent?: string;
}

interface LeadFormProps {
  compact?: boolean;
  redirectTo?: string;
  defaultProgramType?: string;
  requireEmail?: boolean;
  requireGrade?: boolean;
}

export function LeadForm({
  compact = false,
  redirectTo,
  defaultProgramType = "",
  requireEmail = false,
  requireGrade = false,
}: LeadFormProps) {
  const t = useTranslations("leadForm");
  const locale = useLocale();
  const whatsapp = useTranslations("whatsapp");
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    parentName: "",
    countryCode: "+90",
    phone: "",
    programType: defaultProgramType,
    email: "",
    grade: "",
    privacyConsent: false,
    whatsappConsent: true,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "905334702735";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsapp("message"))}`;

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!formData.parentName.trim()) errs.parentName = t("required");

    if (!formData.phone.trim()) {
      errs.phone = t("phoneRequired");
    } else {
      const digits = formData.phone.replace(/\D/g, "").replace(/^0/, "");
      if (digits.length < 7) errs.phone = t("phoneInvalid");
    }

    if (!formData.programType) errs.programType = t("programRequired");

    if (requireEmail) {
      if (!formData.email.trim()) errs.email = t("required");
      else if (!isValidEmail(formData.email.trim())) errs.email = t("emailInvalid");
    } else if (formData.email.trim() && !isValidEmail(formData.email.trim())) {
      errs.email = t("emailInvalid");
    }

    if (requireGrade && !formData.grade) errs.grade = t("required");

    if (!formData.privacyConsent) errs.privacyConsent = t("privacyRequired");
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("submitting");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentName: formData.parentName.trim(),
          phone: normalizePhone(formData.countryCode, formData.phone),
          program_type: formData.programType,
          email: formData.email.trim() || undefined,
          grade: formData.grade || undefined,
          privacyConsent: formData.privacyConsent,
          whatsappConsent: formData.whatsappConsent,
          locale,
        }),
      });

      if (!res.ok) throw new Error("submission_failed");

      trackEvent("lead_form_submit", {
        locale,
        program_type: formData.programType,
        grade: formData.grade,
        whatsapp_consent: formData.whatsappConsent,
      });

      if (redirectTo) {
        router.push(redirectTo);
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_2px_16px_rgba(31,29,26,0.08)] border border-warm-300 text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-12 w-12 text-trust-500" />
        </div>
        <h3 className="text-xl font-bold text-warm-800 mb-2">{t("successTitle")}</h3>
        <p className="text-warm-700 mb-6">{t("successMessage")}</p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_click", { source: "form_success", locale })}
          className="inline-flex items-center gap-2 justify-center w-full h-12 rounded-full bg-trust-500 px-6 text-sm font-semibold text-white hover:bg-trust-600 transition-colors"
        >
          <MessageCircle className="h-5 w-5" />
          {t("successWhatsApp")}
        </a>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-3xl shadow-[0_2px_16px_rgba(31,29,26,0.08)] border border-warm-300 ${compact ? "p-5" : "p-6 md:p-8"}`}>
      {!compact && (
        <div className="mb-5">
          <h3 className="text-lg font-bold text-warm-800">{t("title")}</h3>
          <p className="text-sm text-warm-600 mt-1">{t("subtitle")}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Parent Name */}
        <div>
          <label className="block text-sm font-medium text-warm-700 mb-1">
            {t("parentName")} <span className="text-brand-500">*</span>
          </label>
          <input
            type="text"
            placeholder={t("parentNamePlaceholder")}
            value={formData.parentName}
            onChange={(e) => setFormData((f) => ({ ...f, parentName: e.target.value }))}
            className={`w-full h-11 rounded-xl border px-4 text-sm text-warm-800 placeholder:text-warm-500 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 transition ${errors.parentName ? "border-brand-300 bg-brand-50/50" : "border-warm-300 bg-warm-100/80"}`}
          />
          {errors.parentName && <p className="text-xs text-brand-600 mt-1">{errors.parentName}</p>}
        </div>

        {/* Phone with country code */}
        <div>
          <label className="block text-sm font-medium text-warm-700 mb-1">
            {t("phone")} <span className="text-brand-500">*</span>
          </label>
          <div className={`flex h-11 rounded-xl border overflow-hidden focus-within:ring-2 focus-within:ring-brand-300 focus-within:border-brand-400 transition ${errors.phone ? "border-brand-300 bg-brand-50/50" : "border-warm-300"}`}>
            <select
              value={formData.countryCode}
              onChange={(e) => setFormData((f) => ({ ...f, countryCode: e.target.value }))}
              className="bg-warm-200/70 border-r border-warm-300 pl-3 pr-1 text-sm text-warm-800 focus:outline-none flex-shrink-0"
            >
              {COUNTRY_CODES.map(({ code, flag }) => (
                <option key={code} value={code}>{flag} {code}</option>
              ))}
            </select>
            <input
              type="tel"
              placeholder={t("phonePlaceholder")}
              value={formData.phone}
              onChange={(e) => setFormData((f) => ({ ...f, phone: e.target.value }))}
              className="flex-1 bg-warm-100/80 px-4 text-sm text-warm-800 placeholder:text-warm-500 focus:outline-none"
            />
          </div>
          {errors.phone && <p className="text-xs text-brand-600 mt-1">{errors.phone}</p>}
        </div>

        {/* Program Type */}
        <div>
          <label className="block text-sm font-medium text-warm-700 mb-1">
            {t("programType")} <span className="text-brand-500">*</span>
          </label>
          <select
            value={formData.programType}
            onChange={(e) => setFormData((f) => ({ ...f, programType: e.target.value }))}
            className={`w-full h-11 rounded-xl border px-4 text-sm text-warm-800 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 transition ${errors.programType ? "border-brand-300 bg-brand-50/50" : "border-warm-300 bg-warm-100/80"}`}
          >
            <option value="">{t("programTypePlaceholder")}</option>
            <option value="diploma">{t("programTypeDiploma")}</option>
            <option value="certificates">{t("programTypeCertificates")}</option>
            <option value="undecided">{t("programTypeUndecided")}</option>
          </select>
          {errors.programType && <p className="text-xs text-brand-600 mt-1">{errors.programType}</p>}
          {formData.programType === "diploma" && (
            <div className="mt-2 flex items-start gap-2.5 rounded-xl bg-trust-50 border border-trust-200 px-3.5 py-2.5">
              <span className="text-base leading-none mt-0.5">🇨🇦</span>
              <p className="text-xs text-trust-700 leading-relaxed">
                <span className="font-semibold">Çift diploma fırsatı:</span>{" "}
                Türkiye'deki lise eğitimine devam ederken Kanada diploması kazanılır. Her iki diploma da geçerli kalır.
              </p>
            </div>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-warm-700 mb-1">
            {requireEmail ? t("email").replace(" (isteğe bağlı)", "") : t("email")}
            {requireEmail && <span className="text-brand-500"> *</span>}
          </label>
          <input
            type="email"
            placeholder={t("emailPlaceholder")}
            value={formData.email}
            onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
            className={`w-full h-11 rounded-xl border px-4 text-sm text-warm-800 placeholder:text-warm-500 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 transition ${errors.email ? "border-brand-300 bg-brand-50/50" : "border-warm-300 bg-warm-100/80"}`}
          />
          {errors.email && <p className="text-xs text-brand-600 mt-1">{errors.email}</p>}
        </div>

        {/* Grade */}
        <div>
          <label className="block text-sm font-medium text-warm-700 mb-1">
            {requireGrade ? t("grade").replace(" (isteğe bağlı)", "") : t("grade")}
            {requireGrade && <span className="text-brand-500"> *</span>}
          </label>
          <select
            value={formData.grade}
            onChange={(e) => setFormData((f) => ({ ...f, grade: e.target.value }))}
            className={`w-full h-11 rounded-xl border px-4 text-sm text-warm-800 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 transition ${errors.grade ? "border-brand-300 bg-brand-50/50" : "border-warm-300 bg-warm-100/80"}`}
          >
            <option value="">{t("gradePlaceholder")}</option>
            <option value="9">{t("grade9")}</option>
            <option value="10">{t("grade10")}</option>
            <option value="11">{t("grade11")}</option>
            <option value="12">{t("grade12")}</option>
          </select>
          {errors.grade && <p className="text-xs text-brand-600 mt-1">{errors.grade}</p>}
        </div>

        {/* Consents */}
        <div className="space-y-3 pt-1">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.privacyConsent}
              onChange={(e) => setFormData((f) => ({ ...f, privacyConsent: e.target.checked }))}
              className="mt-0.5 h-4 w-4 rounded border-warm-300 text-brand-500 focus:ring-brand-300 flex-shrink-0"
            />
            <span className="text-xs text-warm-600 leading-relaxed">
              {t("privacyConsent")} <span className="text-brand-500">*</span>
            </span>
          </label>
          {errors.privacyConsent && <p className="text-xs text-brand-600 -mt-1 ml-7">{errors.privacyConsent}</p>}

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.whatsappConsent}
              onChange={(e) => setFormData((f) => ({ ...f, whatsappConsent: e.target.checked }))}
              className="mt-0.5 h-4 w-4 rounded border-warm-300 text-brand-500 focus:ring-brand-300 flex-shrink-0"
            />
            <span className="text-xs text-warm-600 leading-relaxed">{t("whatsappConsent")}</span>
          </label>
        </div>

        {/* Error message */}
        {status === "error" && (
          <div className="flex items-center gap-2 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-700">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {t("errorMessage")}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full h-12 rounded-full bg-brand-500 px-6 text-sm font-semibold text-white shadow-md hover:bg-brand-600 active:bg-brand-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? t("submitting") : t("submit")}
        </button>
      </form>
    </div>
  );
}
