"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { CheckCircle, MessageCircle, AlertCircle } from "lucide-react";

interface FormData {
  parentName: string;
  phone: string;
  email: string;
  grade: string;
  privacyConsent: boolean;
  whatsappConsent: boolean;
}

interface FormErrors {
  parentName?: string;
  phone?: string;
  privacyConsent?: string;
}

function trackEvent(name: string, properties?: Record<string, unknown>) {
  // Analytics hook — connect to GA4, Segment, or your preferred tool
  if (typeof window !== "undefined" && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", name, properties);
  }
  // eslint-disable-next-line no-console
  console.log("[track]", name, properties);
}

export function LeadForm({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("leadForm");
  const locale = useLocale();
  const whatsapp = useTranslations("whatsapp");

  const [formData, setFormData] = useState<FormData>({
    parentName: "",
    phone: "",
    email: "",
    grade: "",
    privacyConsent: false,
    whatsappConsent: true,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "905551234567";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsapp("message"))}`;

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!formData.parentName.trim()) errs.parentName = t("required");
    if (!formData.phone.trim()) {
      errs.phone = t("required");
    } else if (!/^[\d\s+\-()]{7,}$/.test(formData.phone.trim())) {
      errs.phone = t("phoneInvalid");
    }
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
        body: JSON.stringify({ ...formData, locale }),
      });

      if (!res.ok) throw new Error("submission_failed");

      trackEvent("lead_form_submit", {
        locale,
        grade: formData.grade,
        whatsapp_consent: formData.whatsappConsent,
      });

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

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-warm-700 mb-1">
            {t("phone")} <span className="text-brand-500">*</span>
          </label>
          <input
            type="tel"
            placeholder={t("phonePlaceholder")}
            value={formData.phone}
            onChange={(e) => setFormData((f) => ({ ...f, phone: e.target.value }))}
            className={`w-full h-11 rounded-xl border px-4 text-sm text-warm-800 placeholder:text-warm-500 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 transition ${errors.phone ? "border-brand-300 bg-brand-50/50" : "border-warm-300 bg-warm-100/80"}`}
          />
          {errors.phone && <p className="text-xs text-brand-600 mt-1">{errors.phone}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-warm-700 mb-1">{t("email")}</label>
          <input
            type="email"
            placeholder={t("emailPlaceholder")}
            value={formData.email}
            onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
            className="w-full h-11 rounded-xl border border-warm-300 bg-warm-100/80 px-4 text-sm text-warm-800 placeholder:text-warm-500 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 transition"
          />
        </div>

        {/* Grade */}
        <div>
          <label className="block text-sm font-medium text-warm-700 mb-1">{t("grade")}</label>
          <select
            value={formData.grade}
            onChange={(e) => setFormData((f) => ({ ...f, grade: e.target.value }))}
            className="w-full h-11 rounded-xl border border-warm-300 bg-warm-100/80 px-4 text-sm text-warm-800 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 transition"
          >
            <option value="">{t("gradePlaceholder")}</option>
            <option value="9">{t("grade9")}</option>
            <option value="10">{t("grade10")}</option>
            <option value="11">{t("grade11")}</option>
            <option value="12">{t("grade12")}</option>
          </select>
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
