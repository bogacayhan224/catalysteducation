"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { CheckCircle, AlertCircle } from "lucide-react";
import { event } from "@/lib/gtm";

interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  programType: string;
  subject: string;
  grade: string;
  message: string;
  whatsappConsent: boolean;
  privacyConsent: boolean;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  programType?: string;
  privacyConsent?: string;
}

export function ContactForm() {
  const t = useTranslations("contact");
  const tLead = useTranslations("leadForm");
  const locale = useLocale();

  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    phone: "",
    email: "",
    programType: "",
    subject: "",
    grade: "",
    message: "",
    whatsappConsent: true,
    privacyConsent: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!formData.fullName.trim()) errs.fullName = t("requiredField");
    if (!formData.phone.trim()) {
      errs.phone = t("requiredField");
    } else if (!/^[\d\s+\-()]{7,}$/.test(formData.phone.trim())) {
      errs.phone = t("phoneInvalid");
    }
    if (!formData.programType) errs.programType = t("requiredField");
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
          parentName: formData.fullName,
          phone: formData.phone,
          email: formData.email || undefined,
          program_type: formData.programType,
          grade: formData.grade || undefined,
          privacyConsent: formData.privacyConsent,
          whatsappConsent: formData.whatsappConsent,
          locale,
        }),
      });

      if (!res.ok) throw new Error("submission_failed");
      event({ action: 'form_submit', section_name: 'ContactForm', program_type: formData.programType });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_2px_16px_rgba(31,29,26,0.08)] border border-warm-300 text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-12 w-12 text-trust-500" />
        </div>
        <h3 className="text-xl font-bold text-warm-800 mb-2">{t("successTitle")}</h3>
        <p className="text-warm-600">{t("successMessage")}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_2px_16px_rgba(31,29,26,0.08)] border border-warm-300">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-warm-700 mb-1">
            {t("fieldFullName")} <span className="text-brand-500">*</span>
          </label>
          <input
            type="text"
            placeholder={t("fieldFullNamePlaceholder")}
            value={formData.fullName}
            onChange={(e) => setFormData((f) => ({ ...f, fullName: e.target.value }))}
            className={`w-full h-11 rounded-xl border px-4 text-sm text-warm-800 placeholder:text-warm-500 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 transition ${
              errors.fullName ? "border-brand-300 bg-brand-50/50" : "border-warm-300 bg-warm-100/80"
            }`}
          />
          {errors.fullName && <p className="text-xs text-brand-600 mt-1">{errors.fullName}</p>}
        </div>

        {/* Phone + Email */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-warm-700 mb-1">
              {t("fieldPhone")} <span className="text-brand-500">*</span>
            </label>
            <input
              type="tel"
              placeholder={t("fieldPhonePlaceholder")}
              value={formData.phone}
              onChange={(e) => setFormData((f) => ({ ...f, phone: e.target.value }))}
              className={`w-full h-11 rounded-xl border px-4 text-sm text-warm-800 placeholder:text-warm-500 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 transition ${
                errors.phone ? "border-brand-300 bg-brand-50/50" : "border-warm-300 bg-warm-100/80"
              }`}
            />
            {errors.phone && <p className="text-xs text-brand-600 mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-warm-700 mb-1">{t("fieldEmail")}</label>
            <input
              type="email"
              placeholder={t("fieldEmailPlaceholder")}
              value={formData.email}
              onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
              className="w-full h-11 rounded-xl border border-warm-300 bg-warm-100/80 px-4 text-sm text-warm-800 placeholder:text-warm-500 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 transition"
            />
          </div>
        </div>

        {/* Program Type */}
        <div>
          <label className="block text-sm font-medium text-warm-700 mb-1">
            {tLead("programType")} <span className="text-brand-500">*</span>
          </label>
          <select
            value={formData.programType}
            onChange={(e) => setFormData((f) => ({ ...f, programType: e.target.value }))}
            className={`w-full h-11 rounded-xl border px-4 text-sm text-warm-800 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 transition ${errors.programType ? "border-brand-300 bg-brand-50/50" : "border-warm-300 bg-warm-100/80"}`}
          >
            <option value="">{tLead("programTypePlaceholder")}</option>
            <option value="diploma">{tLead("programTypeDiploma")}</option>
            <option value="certificates">{tLead("programTypeCertificates")}</option>
            <option value="undecided">{tLead("programTypeUndecided")}</option>
          </select>
          {errors.programType && <p className="text-xs text-brand-600 mt-1">{errors.programType}</p>}
        </div>

        {/* Subject + Grade */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-warm-700 mb-1">{t("fieldSubject")}</label>
            <select
              value={formData.subject}
              onChange={(e) => setFormData((f) => ({ ...f, subject: e.target.value }))}
              className="w-full h-11 rounded-xl border border-warm-300 bg-warm-100/80 px-4 text-sm text-warm-800 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 transition"
            >
              <option value="">{t("fieldSubjectPlaceholder")}</option>
              <option value="program">{t("subjectProgram")}</option>
              <option value="enrollment">{t("subjectEnrollment")}</option>
              <option value="pricing">{t("subjectPricing")}</option>
              <option value="other">{t("subjectOther")}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-warm-700 mb-1">{t("fieldGrade")}</label>
            <select
              value={formData.grade}
              onChange={(e) => setFormData((f) => ({ ...f, grade: e.target.value }))}
              className="w-full h-11 rounded-xl border border-warm-300 bg-warm-100/80 px-4 text-sm text-warm-800 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 transition"
            >
              <option value="">{t("fieldGradePlaceholder")}</option>
              <option value="9">{t("grade9")}</option>
              <option value="10">{t("grade10")}</option>
              <option value="11">{t("grade11")}</option>
              <option value="12">{t("grade12")}</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-warm-700 mb-1">{t("fieldMessage")}</label>
          <textarea
            rows={4}
            placeholder={t("fieldMessagePlaceholder")}
            value={formData.message}
            onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))}
            className="w-full rounded-xl border border-warm-300 bg-warm-100/80 px-4 py-3 text-sm text-warm-800 placeholder:text-warm-500 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 transition resize-none"
          />
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
              {t("checkPrivacy")} <span className="text-brand-500">*</span>
            </span>
          </label>
          {errors.privacyConsent && (
            <p className="text-xs text-brand-600 -mt-1 ml-7">{errors.privacyConsent}</p>
          )}

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.whatsappConsent}
              onChange={(e) => setFormData((f) => ({ ...f, whatsappConsent: e.target.checked }))}
              className="mt-0.5 h-4 w-4 rounded border-warm-300 text-brand-500 focus:ring-brand-300 flex-shrink-0"
            />
            <span className="text-xs text-warm-600 leading-relaxed">{t("checkWhatsApp")}</span>
          </label>
        </div>

        {/* Error banner */}
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
          {status === "submitting" ? t("submitting") : t("submitBtn")}
        </button>
      </form>
    </div>
  );
}
