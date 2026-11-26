'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Check,
  ChevronDown,
  Copy,
  Lock,
  Sparkles,
  ArrowLeft,
  FolderOpen,
} from 'lucide-react';
import type { LeadMagnetGuide } from '../data/leadMagnets';
import { Footer } from './Footer';

interface LeadMagnetPageClientProps {
  guide: LeadMagnetGuide;
}

const COUNTRY_CODES = [
  { code: '+20', label: '🇪🇬 +20' },
  { code: '+966', label: '🇸🇦 +966' },
  { code: '+971', label: '🇦🇪 +971' },
  { code: '+965', label: '🇰🇼 +965' },
  { code: '+974', label: '🇶🇦 +974' },
  { code: '+973', label: '🇧🇭 +973' },
  { code: '+968', label: '🇴🇲 +968' },
  { code: '+962', label: '🇯🇴 +962' },
  { code: '+961', label: '🇱🇧 +961' },
  { code: '+212', label: '🇲🇦 +212' },
  { code: '+216', label: '🇹🇳 +216' },
  { code: '+213', label: '🇩🇿 +213' },
  { code: '+964', label: '🇮🇶 +964' },
  { code: '+1', label: '🇺🇸 +1' },
  { code: '+44', label: '🇬🇧 +44' },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function normalizePhone(countryCode: string, rawInput: string): string {
  const cleaned = rawInput.trim().replace(/[\s\-()]/g, '');
  if (!cleaned) return '';

  if (cleaned.startsWith('+')) {
    return '+' + cleaned.slice(1).replace(/\D/g, '');
  }

  let digits = cleaned.replace(/\D/g, '');
  if (digits.startsWith('00')) {
    return '+' + digits.slice(2);
  }

  const codeDigits = countryCode.replace(/\D/g, '');
  if (digits.startsWith(codeDigits) && digits.length >= codeDigits.length + 8) {
    return '+' + digits;
  }

  if (countryCode === '+20' && digits.startsWith('0')) {
    digits = digits.slice(1);
  }

  return `${countryCode}${digits}`;
}

function isValidPhone(normalized: string, countryCode: string): boolean {
  if (!/^\+[1-9]\d{7,14}$/.test(normalized)) return false;
  if (countryCode === '+20' && normalized.startsWith('+20')) {
    return /^\+20\d{10}$/.test(normalized);
  }
  return true;
}

async function copyTextToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fall back to textarea copy below
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

export function LeadMagnetPageClient({ guide }: LeadMagnetPageClientProps) {
  const storageKey = `lead_magnet_unlocked_${guide.slug}`;

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [countryCode, setCountryCode] = useState('+20');
  const [phoneInput, setPhoneInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [promptCopied, setPromptCopied] = useState(false);
  const [followUpCopied, setFollowUpCopied] = useState(false);

  const promptTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const followUpTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved === '1') {
        setIsUnlocked(true);
      }
    } catch {
      // Ignore storage access errors (e.g. private browsing)
    }

    return () => {
      if (promptTimerRef.current) clearTimeout(promptTimerRef.current);
      if (followUpTimerRef.current) clearTimeout(followUpTimerRef.current);
    };
  }, [storageKey]);

  const handleUnlockSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedPhone = normalizePhone(countryCode, phoneInput);
    const trimmedEmail = emailInput.trim().toLowerCase();

    let hasError = false;
    if (!phoneInput.trim() || !isValidPhone(normalizedPhone, countryCode)) {
      setPhoneError('من فضلك أدخل رقم واتساب صحيح (مثال: 01012345678).');
      hasError = true;
    } else {
      setPhoneError('');
    }

    if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail)) {
      setEmailError('من فضلك أدخل بريد إلكتروني صحيح.');
      hasError = true;
    } else {
      setEmailError('');
    }

    if (hasError) return;

    setIsSubmitting(true);

    let utmSource: string | null = null;
    let utmMedium: string | null = null;
    let utmCampaign: string | null = null;
    let referrer: string | null = null;

    try {
      const params = new URLSearchParams(window.location.search);
      utmSource = params.get('utm_source');
      utmMedium = params.get('utm_medium');
      utmCampaign = params.get('utm_campaign');
      referrer = document.referrer || null;
    } catch {
      // Ignore URL parsing issues
    }

    // Fire tracking events
    try {
      const eventId =
        'event_' + Date.now() + '_' + Math.random().toString(36).slice(2, 11);
      (window as any).fbq?.(
        'track',
        'Lead',
        { content_name: guide.slug },
        { eventID: eventId }
      );
      (window as any).ttq?.track('SubmitForm', {
        content_id: guide.slug,
        content_name: guide.title,
      });
      (window as any).gtag?.('event', 'generate_lead', {
        guide_slug: guide.slug,
      });
    } catch (trackErr) {
      console.error('Tracking error:', trackErr);
    }

    // Save lead through server route without ever blocking unlock on failure
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const res = await fetch('/api/lead-magnets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guide_slug: guide.slug,
          phone: normalizedPhone,
          email: trimmedEmail,
          utm_source: utmSource,
          utm_medium: utmMedium,
          utm_campaign: utmCampaign,
          referrer,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errBody = await res.text().catch(() => '');
        console.error('Failed to save lead:', res.status, errBody);
      }
    } catch (err) {
      console.error('Failed to submit lead to server:', err);
    } finally {
      try {
        window.localStorage.setItem(storageKey, '1');
      } catch {
        // Ignore storage write errors
      }
      setIsUnlocked(true);
      setIsSubmitting(false);
    }
  };

  const handleCopyPrompt = async () => {
    const ok = await copyTextToClipboard(guide.promptText);
    if (ok) {
      setPromptCopied(true);
      if (promptTimerRef.current) clearTimeout(promptTimerRef.current);
      promptTimerRef.current = setTimeout(() => setPromptCopied(false), 2000);
    }
  };

  const handleCopyFollowUp = async () => {
    const ok = await copyTextToClipboard(guide.followUpPrompt);
    if (ok) {
      setFollowUpCopied(true);
      if (followUpTimerRef.current) clearTimeout(followUpTimerRef.current);
      followUpTimerRef.current = setTimeout(() => setFollowUpCopied(false), 2000);
    }
  };

  return (
    <>
      <main
        className="min-h-screen pt-28 sm:pt-32 pb-16 px-4 sm:px-6 relative z-10"
        dir="rtl"
      >
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header */}
          <header className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neongreen/10 border border-neongreen/30 text-neongreen text-xs sm:text-sm font-medium">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>جايد مجاني خطوة بخطوة</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-[2.6rem] font-outfit font-extrabold text-white leading-snug tracking-tight">
              {guide.title}
            </h1>

            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {guide.subtitle}
            </p>
          </header>

          {/* Step 1: Always visible */}
          <section
            aria-labelledby="step-1-heading"
            className="rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0d1124]/90 p-5 sm:p-8 shadow-xl"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-neongreen/15 border border-neongreen/30 text-neongreen flex items-center justify-center shrink-0 mt-0.5">
                <FolderOpen className="w-5 h-5" />
              </div>
              <h2
                id="step-1-heading"
                className="text-xl sm:text-2xl font-outfit font-bold text-white leading-snug"
              >
                {guide.step1.heading}
              </h2>
            </div>

            <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-4">
              {guide.step1.intro}{' '}
              {guide.step1.inlinePath && (
                <code
                  dir="ltr"
                  className="inline-block px-2 py-0.5 mx-1 rounded-md bg-white/10 border border-white/10 text-neongreen font-mono text-xs sm:text-sm"
                >
                  {guide.step1.inlinePath}
                </code>
              )}{' '}
              {guide.step1.introAfterPath}
            </p>

            <ul className="space-y-3 text-gray-300 text-sm sm:text-base leading-relaxed">
              {guide.step1.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-neongreen font-bold mt-0.5 shrink-0">
                    •
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Step 2: Locked Gate OR Unlocked Guide */}
          <section
            aria-labelledby="step-2-heading"
            className="rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0d1124]/90 p-5 sm:p-8 shadow-xl relative overflow-hidden"
          >
            <h2
              id="step-2-heading"
              className="text-xl sm:text-2xl font-outfit font-bold text-white leading-snug mb-4"
            >
              {guide.step2Heading}
            </h2>

            {!isUnlocked ? (
              <div className="relative">
                {/* Blurred preview behind the lock gate */}
                <div
                  aria-hidden="true"
                  className="select-none pointer-events-none blur-[6px] opacity-40 space-y-4 pb-6"
                >
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    افتح مشروعك في أي أداة AI بتكتب كود زي Claude Code أو Cursor
                    أو Antigravity، وانسخ البرومبت كله والصقه زي ما هو.
                  </p>
                  <div className="rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-xs text-gray-400 text-left" dir="ltr">
                    You are given a task to integrate an existing React component
                    in the codebase. Copy-paste this component to /components/ui
                    folder: product-rail-gallery.tsx ...
                  </div>
                  <p className="text-gray-300 text-sm">
                    وبعد البرومبت مباشرةً، ضيف السطر ده عشان يستخدم صورك أنت...
                  </p>
                </div>

                {/* Gradient overlay + Lock icon + Lead capture form card */}
                <div className="relative -mt-44 sm:-mt-40 pt-6 pb-2 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-neongreen/15 border border-neongreen/40 text-neongreen flex items-center justify-center mb-4 shadow-[0_0_24px_rgba(1,240,142,0.2)]">
                    <Lock className="w-5 h-5" />
                  </div>

                  <div className="w-full max-w-md rounded-2xl border border-white/15 bg-[#121731]/95 p-5 sm:p-7 shadow-[0_16px_50px_rgba(0,0,0,0.65)]">
                    <h3 className="text-lg sm:text-xl font-outfit font-bold text-white text-center mb-5 leading-snug">
                      ادخل رقمك وإيميلك وخد الجايد كامل ببلاش 👇
                    </h3>

                    <form
                      onSubmit={handleUnlockSubmit}
                      noValidate
                      className="space-y-4"
                    >
                      {/* WhatsApp Phone Field */}
                      <div>
                        <label
                          htmlFor="lead-phone"
                          className="block text-sm font-medium text-gray-200 mb-1.5"
                        >
                          رقم الواتساب
                        </label>
                        <div className="flex gap-2" dir="ltr">
                          <select
                            aria-label="كود الدولة"
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            className="w-28 shrink-0 rounded-xl bg-[#090d1e] border border-white/15 px-2.5 py-3 text-sm text-white focus:outline-none focus:border-neongreen transition-colors"
                          >
                            {COUNTRY_CODES.map((c) => (
                              <option key={c.code} value={c.code}>
                                {c.label}
                              </option>
                            ))}
                          </select>

                          <input
                            id="lead-phone"
                            name="phone"
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            required
                            dir="ltr"
                            placeholder="1012345678"
                            value={phoneInput}
                            onChange={(e) => {
                              setPhoneInput(e.target.value);
                              if (phoneError) setPhoneError('');
                            }}
                            className="flex-1 min-w-0 rounded-xl bg-[#090d1e] border border-white/15 px-3.5 py-3 text-sm sm:text-base text-white placeholder:text-gray-500 focus:outline-none focus:border-neongreen transition-colors"
                          />
                        </div>
                        {phoneError && (
                          <p
                            role="alert"
                            className="text-red-400 text-xs mt-1.5"
                          >
                            {phoneError}
                          </p>
                        )}
                      </div>

                      {/* Email Field */}
                      <div>
                        <label
                          htmlFor="lead-email"
                          className="block text-sm font-medium text-gray-200 mb-1.5"
                        >
                          الإيميل
                        </label>
                        <input
                          id="lead-email"
                          name="email"
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          required
                          dir="ltr"
                          placeholder="name@example.com"
                          value={emailInput}
                          onChange={(e) => {
                            setEmailInput(e.target.value);
                            if (emailError) setEmailError('');
                          }}
                          className="w-full rounded-xl bg-[#090d1e] border border-white/15 px-3.5 py-3 text-sm sm:text-base text-white placeholder:text-gray-500 focus:outline-none focus:border-neongreen transition-colors"
                        />
                        {emailError && (
                          <p
                            role="alert"
                            className="text-red-400 text-xs mt-1.5"
                          >
                            {emailError}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-6 rounded-xl bg-neongreen hover:bg-[#19ff9d] text-darkspace font-outfit font-extrabold text-base sm:text-lg transition-all duration-200 shadow-[0_0_24px_rgba(1,240,142,0.3)] hover:shadow-[0_0_32px_rgba(1,240,142,0.5)] active:scale-[0.99] disabled:opacity-70 cursor-pointer"
                      >
                        {isSubmitting ? 'جاري فتح الجايد...' : 'افتح الجايد'}
                      </button>

                      <p className="text-center text-xs text-gray-400 leading-relaxed pt-1">
                        هنبعتلك جايدز وعروض على واتساب والإيميل، وتقدر توقفها
                        في أي وقت.
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                  {guide.step2Intro}
                </p>

                {/* Main Prompt Box: Dropdown collapsed by default + always-visible copy button */}
                <div className="rounded-2xl border border-white/15 bg-[#070a18] overflow-hidden">
                  <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 bg-white/[0.03]">
                    <button
                      type="button"
                      onClick={() => setIsPromptOpen((prev) => !prev)}
                      aria-expanded={isPromptOpen}
                      className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-white hover:text-neongreen transition-colors cursor-pointer"
                    >
                      <span>{guide.promptToggleLabel}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isPromptOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={handleCopyPrompt}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        promptCopied
                          ? 'bg-neongreen text-darkspace'
                          : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_16px_rgba(37,99,235,0.35)]'
                      }`}
                    >
                      {promptCopied ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>✓ اتنسخ</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>{guide.promptCopyLabel}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {isPromptOpen && (
                    <div className="border-t border-white/10 p-4">
                      <pre
                        dir="ltr"
                        className="max-h-96 overflow-y-auto overflow-x-auto font-mono text-xs sm:text-sm text-gray-200 leading-relaxed whitespace-pre-wrap break-words text-left select-all"
                      >
                        {guide.promptText}
                      </pre>
                    </div>
                  )}
                </div>

                {/* Follow-up prompt line */}
                <div className="space-y-3">
                  <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                    {guide.followUpIntro}
                  </p>

                  <div className="rounded-2xl border border-white/15 bg-[#070a18] p-4 flex flex-col gap-3">
                    <pre
                      dir="ltr"
                      className="font-mono text-xs sm:text-sm text-neongreen/95 leading-relaxed whitespace-pre-wrap break-words text-left"
                    >
                      {guide.followUpPrompt}
                    </pre>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={handleCopyFollowUp}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                          followUpCopied
                            ? 'bg-neongreen text-darkspace'
                            : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                        }`}
                      >
                        {followUpCopied ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>✓ اتنسخ</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>انسخ السطر</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Result excitement text */}
                <p className="text-base sm:text-lg font-semibold text-white leading-relaxed">
                  {guide.afterPromptText}
                </p>

                {/* Quick Tips */}
                <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-4 sm:p-5 space-y-2.5">
                  <p className="font-bold text-amber-300 text-sm sm:text-base">
                    {guide.tipsHeading}
                  </p>
                  <ul className="space-y-2 text-gray-200 text-sm sm:text-base leading-relaxed">
                    {guide.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-300 font-bold shrink-0">
                          •
                        </span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </section>

          {/* Bottom Course CTA Card (only after unlock? Or always? Let's check requirement) */}
          {isUnlocked && (
            <section className="rounded-2xl sm:rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-950/70 via-[#0d1430] to-emerald-950/40 p-6 sm:p-8 shadow-xl space-y-4">
              <h3 className="text-xl sm:text-2xl font-outfit font-bold text-white leading-snug">
                {guide.ctaHeading}
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {guide.ctaBody}
              </p>
              <div className="pt-1">
                <Link
                  href={guide.ctaHref}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-outfit font-bold text-sm sm:text-base transition-all shadow-[0_0_24px_rgba(37,99,235,0.4)] hover:shadow-[0_0_32px_rgba(37,99,235,0.6)]"
                >
                  <span>{guide.ctaButtonLabel}</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
