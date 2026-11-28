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
  ExternalLink,
} from 'lucide-react';
import type {
  GuideBlock,
  GuideSection,
  LeadMagnetGuide,
  LeadMagnetPromptUnlock,
  LeadMagnetSectionsUnlock,
  LeadMagnetStepsUnlock,
} from '../data/leadMagnets';
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

const makeEventId = () =>
  'event_' + Date.now() + '_' + Math.random().toString(36).slice(2, 11);

export function LeadMagnetPageClient({ guide }: LeadMagnetPageClientProps) {
  const storageKey = `lead_magnet_unlocked_${guide.slug}`;
  const askPhone = guide.formFields !== 'email';
  const isGated = guide.gated !== false;
  const viewTrackedRef = useRef(false);

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [countryCode, setCountryCode] = useState('+20');
  const [phoneInput, setPhoneInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isPromptOpen, setIsPromptOpen] = useState(false);
  // Which copy button was clicked last (shows "✓ اتنسخ" for 2s)
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Open guides: ViewContent / view_item once per page load
  useEffect(() => {
    if (isGated || viewTrackedRef.current) return;
    viewTrackedRef.current = true;
    try {
      (window as any).fbq?.(
        'track',
        'ViewContent',
        { content_name: guide.slug, content_type: 'guide' },
        { eventID: makeEventId() }
      );
      (window as any).ttq?.track('ViewContent', {
        content_id: guide.slug,
        content_name: guide.title,
      });
      (window as any).gtag?.('event', 'view_item', {
        guide_slug: guide.slug,
      });
    } catch (err) {
      console.error('Tracking error:', err);
    }
  }, [isGated, guide.slug, guide.title]);

  // Open guides: InitiateCheckout / begin_checkout on any course link click
  const handleMainClickCapture = (e: React.MouseEvent<HTMLElement>) => {
    if (isGated) return;
    const link = (e.target as HTMLElement).closest('a');
    if (!link || link.getAttribute('href') !== guide.ctaHref) return;
    try {
      (window as any).fbq?.(
        'track',
        'InitiateCheckout',
        {
          currency: 'EGP',
          content_name: guide.courseName ?? guide.ctaHref,
          guide_slug: guide.slug,
        },
        { eventID: makeEventId() }
      );
      (window as any).ttq?.track('InitiateCheckout', {
        content_id: guide.slug,
        currency: 'EGP',
      });
      (window as any).gtag?.('event', 'begin_checkout', {
        guide_slug: guide.slug,
        currency: 'EGP',
      });
    } catch (err) {
      console.error('Tracking error:', err);
    }
  };

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
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, [storageKey]);

  const handleUnlockSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedPhone = normalizePhone(countryCode, phoneInput);
    const trimmedEmail = emailInput.trim().toLowerCase();

    let hasError = false;
    if (
      askPhone &&
      (!phoneInput.trim() || !isValidPhone(normalizedPhone, countryCode))
    ) {
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
          ...(askPhone ? { phone: normalizedPhone } : {}),
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

  const handleCopy = async (key: string, text: string) => {
    const ok = await copyTextToClipboard(text);
    if (ok) {
      setCopiedKey(key);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const copyButtonContent = (key: string, label: string) =>
    copiedKey === key ? (
      <>
        <Check className="w-4 h-4" />
        <span>✓ اتنسخ</span>
      </>
    ) : (
      <>
        <Copy className="w-4 h-4" />
        <span>{label}</span>
      </>
    );

  const renderBlock = (block: GuideBlock, key: string) => {
    switch (block.kind) {
      case 'paragraph':
        return (
          <p
            key={key}
            className={`text-[#111111] leading-relaxed ${
              block.strong
                ? 'text-base sm:text-lg font-semibold'
                : 'text-sm sm:text-base'
            }`}
          >
            {block.text}
          </p>
        );
      case 'bullets':
        return (
          <ul
            key={key}
            className="space-y-2.5 text-[#111111] text-sm sm:text-base leading-relaxed"
          >
            {block.items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-[#067A4E] font-bold mt-0.5 shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );
      case 'numbered':
        return (
          <ol
            key={key}
            className="space-y-2.5 text-[#111111] text-sm sm:text-base leading-relaxed"
          >
            {block.items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-[#E8FBF2] border border-[#067A4E]/30 text-[#067A4E] text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        );
      case 'codeBox':
        return (
          <pre
            key={key}
            dir="ltr"
            className="rounded-xl border border-[#E5E5E5] bg-white p-3.5 font-mono text-xs sm:text-sm text-[#111111] leading-relaxed whitespace-pre-wrap break-words text-left"
          >
            {block.text}
          </pre>
        );
      case 'prompt':
        return (
          <div
            key={key}
            className="rounded-2xl border border-[#E5E5E5] bg-white overflow-hidden"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 px-3.5 py-3 sm:px-4 bg-[#F5F5F7] border-b border-[#E5E5E5]">
              <span
                dir="ltr"
                className="font-mono text-xs sm:text-sm font-bold text-[#111111]"
              >
                {block.title}
              </span>
              <button
                type="button"
                onClick={() => handleCopy(key, block.text)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  copiedKey === key
                    ? 'bg-neongreen text-[#111111]'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm'
                }`}
              >
                {copyButtonContent(key, block.copyLabel)}
              </button>
            </div>
            <pre
              dir="ltr"
              className="p-4 font-mono text-xs sm:text-sm text-[#111111] leading-relaxed whitespace-pre-wrap break-words text-left"
            >
              {block.text}
            </pre>
          </div>
        );
      case 'callout':
        return (
          <div
            key={key}
            className="rounded-2xl border border-[#067A4E]/30 bg-[#E8FBF2] p-4 sm:p-5 space-y-2"
          >
            <p className="text-[#111111] text-sm sm:text-base leading-relaxed">
              {block.text}
            </p>
            <Link
              href={block.href}
              className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-[#067A4E] underline underline-offset-4 decoration-2 hover:text-[#04593A] transition-colors"
            >
              <span>{block.linkText}</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        );
      case 'toolsTable':
        return (
          <div
            key={key}
            className="w-full max-w-full overflow-x-auto rounded-2xl border border-[#E5E5E5] bg-white"
          >
            <table className="w-full min-w-[680px] text-right text-sm text-[#111111]">
              <thead className="bg-[#F5F5F7]">
                <tr>
                  {block.columns.map((col) => (
                    <th
                      key={col}
                      scope="col"
                      className="px-4 py-3 font-bold whitespace-nowrap border-b border-[#E5E5E5]"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row) => (
                  <tr key={row.name} className="border-b border-[#E5E5E5] last:border-b-0 align-top">
                    <td className="px-4 py-3 font-bold whitespace-nowrap">
                      {row.name}
                    </td>
                    <td className="px-4 py-3 leading-relaxed min-w-[220px]">{row.description}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <a
                        href={row.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        dir="ltr"
                        className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#067A4E] underline underline-offset-4 hover:text-[#04593A]"
                      >
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        <span>{row.display}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'note':
        return (
          <p key={key} className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            {block.text}
          </p>
        );
    }
  };

  const renderSectionBody = (section: GuideSection, sectionKey: string) => (
    <div className="space-y-4">
      {section.blocks.map((block, idx) =>
        renderBlock(block, `${sectionKey}-${idx}`)
      )}
    </div>
  );

  const renderSectionsUnlock = (unlocked: LeadMagnetSectionsUnlock) => (
    <>
      {unlocked.sections.map((section, idx) => (
        <div
          key={idx}
          className={`space-y-4 ${idx > 0 ? 'pt-6 border-t border-[#E5E5E5]' : ''}`}
        >
          {section.heading && (
            <h3 className="text-xl sm:text-2xl font-outfit font-bold text-[#111111] leading-snug">
              {section.heading}
            </h3>
          )}
          {renderSectionBody(section, `unlocked-${idx}`)}
        </div>
      ))}
    </>
  );

  const renderPromptUnlock = (unlocked: LeadMagnetPromptUnlock) => (
    <>
      <p className="text-[#111111] text-sm sm:text-base leading-relaxed">
        {unlocked.intro}
      </p>

      {/* Main Prompt Box: Dropdown collapsed by default + always-visible copy button */}
      <div className="rounded-2xl border border-[#E5E5E5] bg-white overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 bg-[#F5F5F7]">
          <button
            type="button"
            onClick={() => setIsPromptOpen((prev) => !prev)}
            aria-expanded={isPromptOpen}
            className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#111111] hover:text-[#067A4E] transition-colors cursor-pointer"
          >
            <span>{unlocked.promptToggleLabel}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isPromptOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          <button
            type="button"
            onClick={() => handleCopy('prompt', unlocked.promptText)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              copiedKey === 'prompt'
                ? 'bg-neongreen text-[#111111]'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm'
            }`}
          >
            {copyButtonContent('prompt', unlocked.promptCopyLabel)}
          </button>
        </div>

        {isPromptOpen && (
          <div className="border-t border-[#E5E5E5] bg-[#F5F5F7] p-4">
            <pre
              dir="ltr"
              className="max-h-96 overflow-y-auto overflow-x-auto font-mono text-xs sm:text-sm text-[#111111] leading-relaxed whitespace-pre-wrap break-words text-left select-all"
            >
              {unlocked.promptText}
            </pre>
          </div>
        )}
      </div>

      {/* Follow-up prompt line */}
      <div className="space-y-3">
        <p className="text-[#111111] text-sm sm:text-base leading-relaxed">
          {unlocked.followUpIntro}
        </p>

        <div className="rounded-2xl border border-[#E5E5E5] bg-white p-4 flex flex-col gap-3">
          <pre
            dir="ltr"
            className="font-mono text-xs sm:text-sm text-[#111111] bg-[#F5F5F7] rounded-xl p-3 leading-relaxed whitespace-pre-wrap break-words text-left"
          >
            {unlocked.followUpPrompt}
          </pre>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => handleCopy('followUp', unlocked.followUpPrompt)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                copiedKey === 'followUp'
                  ? 'bg-neongreen text-[#111111]'
                  : 'bg-white hover:bg-[#EDEDF0] text-[#111111] border border-[#D4D4D8]'
              }`}
            >
              {copyButtonContent('followUp', 'انسخ السطر')}
            </button>
          </div>
        </div>
      </div>

      <p className="text-base sm:text-lg font-semibold text-[#111111] leading-relaxed">
        {unlocked.afterPromptText}
      </p>
    </>
  );

  const renderStepsUnlock = (unlocked: LeadMagnetStepsUnlock) => (
    <>
      {unlocked.steps.map((step, stepIdx) => (
        <div key={stepIdx} className="space-y-3">
          <h3 className="text-lg sm:text-xl font-outfit font-bold text-[#111111] leading-snug">
            {step.heading}
          </h3>

          {step.intro && (
            <p className="text-[#111111] text-sm sm:text-base leading-relaxed">
              {step.intro}
            </p>
          )}

          {step.linkCard && (
            <div className="space-y-2">
              <div className="rounded-2xl border border-[#E5E5E5] bg-white p-3.5 sm:p-4 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={step.linkCard.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  className="inline-flex items-center gap-2 min-w-0 font-mono text-sm sm:text-base font-bold text-[#067A4E] underline underline-offset-4 decoration-2 hover:text-[#04593A] break-all"
                >
                  <ExternalLink className="w-4 h-4 shrink-0" />
                  <span>{step.linkCard.display}</span>
                </a>

                <button
                  type="button"
                  onClick={() =>
                    handleCopy(`link-${stepIdx}`, step.linkCard!.href)
                  }
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    copiedKey === `link-${stepIdx}`
                      ? 'bg-neongreen text-[#111111]'
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm'
                  }`}
                >
                  {copyButtonContent(`link-${stepIdx}`, step.linkCard.copyLabel)}
                </button>
              </div>

              {step.linkCard.credit && (
                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                  {step.linkCard.credit}
                </p>
              )}
            </div>
          )}

          {step.bullets && (
            <ul className="space-y-2.5 text-[#111111] text-sm sm:text-base leading-relaxed">
              {step.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-[#067A4E] font-bold mt-0.5 shrink-0">
                    •
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </>
  );

  return (
    <>
      <main
        onClickCapture={handleMainClickCapture}
        className="min-h-screen pt-28 sm:pt-32 pb-16 px-4 sm:px-6 relative z-10 bg-white text-[#111111]"
        dir="rtl"
      >
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header */}
          <header className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8FBF2] border border-[#067A4E]/30 text-[#067A4E] text-xs sm:text-sm font-medium">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>{guide.badgeLabel}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-[2.6rem] font-outfit font-extrabold text-[#111111] leading-snug tracking-tight">
              {guide.title}
            </h1>

            <p className="text-base sm:text-lg text-[#111111] max-w-2xl mx-auto leading-relaxed">
              {guide.subtitle}
            </p>

            {guide.subtitleCourseLine && (
              <p className="text-base sm:text-lg text-[#111111] max-w-2xl mx-auto leading-relaxed">
                {guide.subtitleCourseLine.before}
                <Link
                  href={guide.subtitleCourseLine.href}
                  className="font-bold text-[#067A4E] underline underline-offset-4 decoration-2 hover:text-[#04593A] transition-colors"
                >
                  {guide.subtitleCourseLine.linkText}
                </Link>
                {guide.subtitleCourseLine.after}
              </p>
            )}
          </header>

          {/* Stat block (optional) */}
          {guide.statBlock && (
            <section className="rounded-2xl sm:rounded-3xl border border-[#E5E5E5] bg-[#F5F5F7] p-6 sm:p-8 shadow-sm text-center space-y-2">
              <p className="text-6xl sm:text-7xl font-outfit font-extrabold text-[#067A4E] leading-none tracking-tight">
                {guide.statBlock.value}
              </p>
              <p className="text-lg sm:text-xl font-bold text-[#111111]">
                {guide.statBlock.label}
              </p>
              <p className="text-sm sm:text-base text-[#555555]">
                {guide.statBlock.tagline}
              </p>
              {guide.statBlock.chips && guide.statBlock.chips.length > 0 && (
                <ul
                  dir="ltr"
                  className="flex flex-wrap justify-center gap-2 pt-4"
                  aria-label="أمثلة على الستايلات"
                >
                  {guide.statBlock.chips.map((chip) => (
                    <li
                      key={chip}
                      className="px-3 py-1 rounded-full bg-white border border-[#E5E5E5] text-[#111111] font-mono text-xs sm:text-sm"
                    >
                      {chip}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {/* Step 1 (optional, always visible) */}
          {guide.step1 && (
            <section
              aria-labelledby="step-1-heading"
              className="rounded-2xl sm:rounded-3xl border border-[#E5E5E5] bg-[#F5F5F7] p-5 sm:p-8 shadow-sm"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[#E8FBF2] border border-[#067A4E]/30 text-[#067A4E] flex items-center justify-center shrink-0 mt-0.5">
                  <FolderOpen className="w-5 h-5" />
                </div>
                <h2
                  id="step-1-heading"
                  className="text-xl sm:text-2xl font-outfit font-bold text-[#111111] leading-snug"
                >
                  {guide.step1.heading}
                </h2>
              </div>

              <p className="text-[#111111] text-sm sm:text-base leading-relaxed mb-4">
                {guide.step1.intro}{' '}
                {guide.step1.inlinePath && (
                  <code
                    dir="ltr"
                    className="inline-block px-2 py-0.5 mx-1 rounded-md bg-white border border-[#E5E5E5] text-[#111111] font-mono text-xs sm:text-sm"
                  >
                    {guide.step1.inlinePath}
                  </code>
                )}{' '}
                {guide.step1.introAfterPath}
              </p>

              <ul className="space-y-3 text-[#111111] text-sm sm:text-base leading-relaxed">
                {guide.step1.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#067A4E] font-bold mt-0.5 shrink-0">
                      •
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Always-visible sections (optional) */}
          {guide.visibleSections?.map((section, idx) => (
            <section
              key={idx}
              aria-label={section.heading}
              className="rounded-2xl sm:rounded-3xl border border-[#E5E5E5] bg-[#F5F5F7] p-5 sm:p-8 shadow-sm space-y-4 min-w-0"
            >
              {section.heading && (
                <h2 className="text-xl sm:text-2xl font-outfit font-bold text-[#111111] leading-snug">
                  {section.heading}
                </h2>
              )}
              {renderSectionBody(section, `visible-${idx}`)}
            </section>
          ))}

          {/* Locked Gate OR Unlocked Guide */}
          <section
            aria-labelledby={guide.lockedHeading ? 'locked-heading' : undefined}
            aria-label={guide.lockedHeading ? undefined : 'الجايد'}
            className="rounded-2xl sm:rounded-3xl border border-[#E5E5E5] bg-[#F5F5F7] p-5 sm:p-8 shadow-sm relative overflow-hidden"
          >
            {guide.lockedHeading && (
              <h2
                id="locked-heading"
                className="text-xl sm:text-2xl font-outfit font-bold text-[#111111] leading-snug mb-4"
              >
                {guide.lockedHeading}
              </h2>
            )}

            {isGated && !isUnlocked ? (
              <div className="relative">
                {/* Blurred preview behind the lock gate */}
                <div
                  aria-hidden="true"
                  className="select-none pointer-events-none blur-[6px] opacity-50 space-y-4 pb-6"
                >
                  <p className="text-[#555555] text-sm sm:text-base leading-relaxed">
                    {guide.lockedPreview.before}
                  </p>
                  {guide.lockedPreview.code && (
                    <div
                      className="rounded-xl border border-[#E5E5E5] bg-white p-4 font-mono text-xs text-[#555555] text-left"
                      dir="ltr"
                    >
                      {guide.lockedPreview.code}
                    </div>
                  )}
                  {guide.lockedPreview.after && (
                    <p className="text-[#555555] text-sm">
                      {guide.lockedPreview.after}
                    </p>
                  )}
                </div>

                {/* Lock icon + Lead capture form card */}
                <div className="relative -mt-44 sm:-mt-40 pt-6 pb-2 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#E8FBF2] border border-[#067A4E]/40 text-[#067A4E] flex items-center justify-center mb-4 shadow-sm">
                    <Lock className="w-5 h-5" />
                  </div>

                  <div className="w-full max-w-md rounded-2xl border border-[#E5E5E5] bg-[#F5F5F7] p-5 sm:p-7 shadow-[0_12px_40px_rgba(17,17,17,0.12)]">
                    <h3 className="text-lg sm:text-xl font-outfit font-bold text-[#111111] text-center mb-5 leading-snug">
                      {guide.formHeading}
                    </h3>
                    <form
                      onSubmit={handleUnlockSubmit}
                      noValidate
                      className="space-y-4"
                    >
                      {/* WhatsApp Phone Field */}
                      {askPhone && (
                      <div>
                        <label
                          htmlFor="lead-phone"
                          className="block text-sm font-medium text-[#111111] mb-1.5"
                        >
                          رقم الواتساب
                        </label>
                        <div className="flex gap-2" dir="ltr">
                          <select
                            aria-label="كود الدولة"
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            className="w-28 shrink-0 rounded-xl bg-white border border-[#D4D4D8] px-2.5 py-3 text-sm text-[#111111] focus:outline-none focus:border-[#067A4E] transition-colors"
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
                            className="flex-1 min-w-0 rounded-xl bg-white border border-[#D4D4D8] px-3.5 py-3 text-sm sm:text-base text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#067A4E] transition-colors"
                          />
                        </div>
                        {phoneError && (
                          <p
                            role="alert"
                            className="text-red-600 text-xs mt-1.5"
                          >
                            {phoneError}
                          </p>
                        )}
                      </div>
                      )}

                      {/* Email Field */}
                      <div>
                        <label
                          htmlFor="lead-email"
                          className="block text-sm font-medium text-[#111111] mb-1.5"
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
                          className="w-full rounded-xl bg-white border border-[#D4D4D8] px-3.5 py-3 text-sm sm:text-base text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#067A4E] transition-colors"
                        />
                        {emailError && (
                          <p
                            role="alert"
                            className="text-red-600 text-xs mt-1.5"
                          >
                            {emailError}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-6 rounded-xl bg-neongreen hover:bg-[#19ff9d] text-[#111111] font-outfit font-extrabold text-base sm:text-lg transition-all duration-200 shadow-[0_4px_16px_rgba(1,240,142,0.35)] hover:shadow-[0_6px_22px_rgba(1,240,142,0.5)] active:scale-[0.99] disabled:opacity-70 cursor-pointer"
                      >
                        {isSubmitting ? 'جاري فتح الجايد...' : guide.formButtonLabel}
                      </button>

                      <p className="text-center text-xs text-[#555555] leading-relaxed pt-1">
                        {guide.formDisclaimer ??
                          'هنبعتلك جايدز وعروض على واتساب والإيميل، وتقدر توقفها في أي وقت.'}
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {guide.unlocked.kind === 'prompt'
                  ? renderPromptUnlock(guide.unlocked)
                  : guide.unlocked.kind === 'sections'
                    ? renderSectionsUnlock(guide.unlocked)
                    : renderStepsUnlock(guide.unlocked)}

                {/* Tips */}
                <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 sm:p-5 space-y-2.5">
                  {guide.tips.length === 1 ? (
                    <p className="text-[#111111] text-sm sm:text-base leading-relaxed">
                      <span className="font-bold text-amber-800">
                        {guide.tipsHeading}
                      </span>{' '}
                      {guide.tips[0]}
                    </p>
                  ) : (
                    <>
                      <p className="font-bold text-amber-800 text-sm sm:text-base">
                        {guide.tipsHeading}
                      </p>
                      <ul className="space-y-2 text-[#111111] text-sm sm:text-base leading-relaxed">
                        {guide.tips.map((tip, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-amber-700 font-bold shrink-0">
                              •
                            </span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            )}
          </section>

          {/* Bottom Course CTA Card (after unlock) */}
          {(!isGated || isUnlocked) && (
            <section
              className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-4 ${
                guide.ctaProminent
                  ? 'border-2 border-[#067A4E]/40 bg-[#E8FBF2] shadow-[0_12px_40px_rgba(6,122,78,0.12)] text-center'
                  : 'border border-[#E5E5E5] bg-[#F5F5F7] shadow-sm'
              }`}
            >
              <h3 className="text-xl sm:text-2xl font-outfit font-bold text-[#111111] leading-snug">
                {guide.ctaHeading}
              </h3>
              <p className="text-[#111111] text-sm sm:text-base leading-relaxed">
                {guide.ctaBody}
              </p>
              <div className="pt-1">
                <Link
                  href={guide.ctaHref}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-outfit font-bold text-sm sm:text-base transition-all shadow-sm hover:shadow-md"
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
