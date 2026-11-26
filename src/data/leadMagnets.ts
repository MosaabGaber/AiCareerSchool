import fs from 'node:fs';
import path from 'node:path';

export interface LeadMagnetStep1 {
  heading: string;
  intro: string;
  inlinePath?: string;
  introAfterPath?: string;
  bullets: string[];
}

export interface LeadMagnetInlineLinkLine {
  before: string;
  linkText: string;
  href: string;
  after?: string;
}

export interface LeadMagnetStatBlock {
  value: string;
  label: string;
  tagline: string;
  /** Small chips under the stat (e.g. example names). */
  chips?: string[];
}

/** Placeholder content shown blurred behind the unlock form. */
export interface LeadMagnetLockedPreview {
  before: string;
  code?: string;
  after?: string;
}

/** Unlocked content: one big prompt to copy + a follow-up line. */
export interface LeadMagnetPromptUnlock {
  kind: 'prompt';
  intro: string;
  promptToggleLabel: string;
  promptCopyLabel: string;
  promptText: string;
  followUpIntro: string;
  followUpPrompt: string;
  afterPromptText: string;
}

export interface LeadMagnetLinkCard {
  href: string;
  display: string;
  copyLabel: string;
  /** Small credit line shown under the card. */
  credit?: string;
}

export interface LeadMagnetUnlockStep {
  heading: string;
  intro?: string;
  linkCard?: LeadMagnetLinkCard;
  bullets?: string[];
}

/** Unlocked content: a list of numbered steps. */
export interface LeadMagnetStepsUnlock {
  kind: 'steps';
  steps: LeadMagnetUnlockStep[];
}

export interface LeadMagnetGuide {
  slug: string;
  /** Small pill label above the title. */
  badgeLabel: string;
  title: string;
  subtitle: string;
  /** Optional line under the subtitle with an inline link (e.g. to a course). */
  subtitleCourseLine?: LeadMagnetInlineLinkLine;
  statBlock?: LeadMagnetStatBlock;
  seoTitle: string;
  seoDescription: string;
  /** Optional step shown before the lock (always visible). */
  step1?: LeadMagnetStep1;
  /** Optional heading of the locked section (visible before unlock). */
  lockedHeading?: string;
  lockedPreview: LeadMagnetLockedPreview;
  formHeading: string;
  formButtonLabel: string;
  unlocked: LeadMagnetPromptUnlock | LeadMagnetStepsUnlock;
  tipsHeading: string;
  tips: string[];
  ctaHeading: string;
  ctaBody: string;
  ctaButtonLabel: string;
  ctaHref: string;
}

type PromptUnlockConfig = Omit<LeadMagnetPromptUnlock, 'promptText'> & {
  promptFile: string;
};

interface LeadMagnetConfig extends Omit<LeadMagnetGuide, 'unlocked'> {
  unlocked: PromptUnlockConfig | LeadMagnetStepsUnlock;
}

function loadPromptExact(relativeFilePath: string): string {
  const fullPath = path.join(process.cwd(), relativeFilePath);
  return fs.readFileSync(fullPath, 'utf-8');
}

const LEAD_MAGNET_CONFIGS: LeadMagnetConfig[] = [
  {
    slug: 'clothing-rail',
    badgeLabel: 'جايد مجاني خطوة بخطوة',
    title: 'اعمل موقع الهدوم المتعلقة على الشماعة بالذكاء الاصطناعي 🛍️',
    subtitle:
      'ده الجايد اللي هيخليك تعمل نفس الموقع اللي في الفيديو، في خطوتين بس، ومن غير ما تكتب ولا سطر كود.',
    subtitleCourseLine: {
      before: 'ولو عايز تتعلم تعمل مواقع بالذكاء الاصطناعي وتبيعها وتكسب منها، شوف ',
      linkText: 'كورس إنشاء المواقع بالذكاء الاصطناعي',
      href: '/web-creation',
    },
    seoTitle:
      'جايد مجاني: موقع الهدوم على الشماعة بالذكاء الاصطناعي | AI Career School',
    seoDescription:
      'ده الجايد اللي هيخليك تعمل نفس الموقع اللي في الفيديو، في خطوتين بس، ومن غير ما تكتب ولا سطر كود.',
    step1: {
      heading: 'الخطوة 1: حط صور منتجاتك في فولدر',
      intro: 'جوه مشروعك، اعمل فولدر اسمه',
      inlinePath: 'public/images/products',
      introAfterPath: 'وحط فيه صور الهدوم بتاعتك:',
      bullets: [
        'لكل قطعة 3 صور: من قدام، من ورا، ومن الجنب. صورة القدام بس كفاية لو مش عندك الباقي.',
        'سمّيهم كده: hoodie-front.png و hoodie-back.png و hoodie-side.png',
        'خلفية شفافة (PNG أو WebP)، والقطعة لوحدها من غير موديل.',
        'المقاس الأنسب: 400 × 620 بيكسل (طولي)، ونفس المقاس لكل صور القطعة الواحدة.',
      ],
    },
    lockedHeading: 'الخطوة 2: الصق البرومبت في مساعد الكود بتاعك',
    lockedPreview: {
      before:
        'افتح مشروعك في أي أداة AI بتكتب كود زي Claude Code أو Cursor أو Antigravity، وانسخ البرومبت كله والصقه زي ما هو.',
      code: 'You are given a task to integrate an existing React component in the codebase. Copy-paste this component to /components/ui folder: product-rail-gallery.tsx ...',
      after: 'وبعد البرومبت مباشرةً، ضيف السطر ده عشان يستخدم صورك أنت...',
    },
    formHeading: 'ادخل رقمك وإيميلك وخد الجايد كامل ببلاش 👇',
    formButtonLabel: 'افتح الجايد',
    unlocked: {
      kind: 'prompt',
      intro:
        'افتح مشروعك في أي أداة AI بتكتب كود زي Claude Code أو Cursor أو Antigravity، وانسخ البرومبت كله والصقه زي ما هو.',
      promptToggleLabel: '📋 اعرض البرومبت',
      promptCopyLabel: 'انسخ البرومبت',
      promptFile: 'content/lead-magnets/clothing-rail-prompt.txt',
      followUpIntro: 'وبعد البرومبت مباشرةً، ضيف السطر ده عشان يستخدم صورك أنت:',
      followUpPrompt:
        'Use my own product photos from the folder public/images/products instead of Unsplash. Use the -front, -back and -side photo of each piece as its image, backImage and sideImage, and change the product names and prices to mine.',
      afterPromptText:
        'وبس كده! الأداة هتركّب الموقع، وهتلاقي الهدوم متعلقة وبتتحرك وتلف لما تقف عليها 🔥',
    },
    tipsHeading: '💡 نصايح سريعة:',
    tips: [
      'لو صورك فيها شماعة أصلًا، قول للأداة: use hanger="none".',
      'عايز الكلام بالعربي؟ قولها: "غيّر كل النصوص للعربي".',
    ],
    ctaHeading: '🚀 عايز تعمل مواقع زي دي لأي براند وتبيعها للعملاء؟',
    ctaBody:
      'كورس إنشاء المواقع بالذكاء الاصطناعي بيمشي معاك بالعربي من الصفر: إزاي تخلي الموقع احترافي، تعدّله لأي عميل، تنشره على دومين، وتسعّره وتبيعه.',
    ctaButtonLabel: 'اعرف تفاصيل الكورس',
    ctaHref: '/web-creation',
  },
  {
    slug: 'video-editing-styles',
    badgeLabel: 'جايد مجاني من AI Career School',
    title: '100 ستايل للمونتاج وصناعة الفيديوهات 🎬',
    subtitle:
      'مجموعة فيها 100 ستايل للمونتاج والموشن ديزاين في Skill واحدة. كل اللي عليك إنك تديها للـ AI اللي بتستخدمه.',
    statBlock: {
      value: '100',
      label: 'ستايل للمونتاج والموشن ديزاين',
      tagline: 'Skill واحدة. 100 ستايل.',
      // Real style names from the MotionForge README (github.com/aykutucesai/motionforge)
      chips: [
        'creator-reels-dark',
        'talking-head-pop',
        'product-hero-turntable',
        'cinematic-quote',
        'matchday-graphics',
        'true-crime-board',
      ],
    },
    seoTitle:
      '100 ستايل مونتاج وموشن ديزاين في Skill واحدة (مجاناً) | AI Career School',
    seoDescription:
      'مجموعة فيها 100 ستايل للمونتاج والموشن ديزاين في Skill واحدة. كل اللي عليك إنك تديها للـ AI اللي بتستخدمه.',
    lockedPreview: {
      before: 'الخطوة 1: حمّل الـ Skill. الـ Skill اسمها MotionForge وموجودة على GitHub:',
      code: 'github.com/••••••••/••••••••••',
      after: 'الخطوة 2: اديها للـ AI بتاعك، وبعدين اطلب منه أي ستايل بالاسم...',
    },
    formHeading: 'ادخل رقمك وإيميلك وخد الـ Skill ببلاش 👇',
    formButtonLabel: 'افتح الجايد',
    unlocked: {
      kind: 'steps',
      steps: [
        {
          heading: 'الخطوة 1: حمّل الـ Skill',
          intro: 'الـ Skill اسمها MotionForge وموجودة على GitHub:',
          linkCard: {
            href: 'https://github.com/aykutucesai/motionforge',
            display: 'github.com/aykutucesai/motionforge',
            copyLabel: 'انسخ اللينك',
            credit:
              'الـ Skill من عمل aykutucesai ومتاحة على GitHub — إحنا جمعناهالك وبنشرح إزاي تستخدمها.',
          },
        },
        {
          heading: 'الخطوة 2: اديها للـ AI بتاعك',
          bullets: [
            'لو بتستخدم Claude Code: حط فولدر الـ Skill جوه \u2066.claude/skills\u2069 في مشروعك.', // \u2066…\u2069 keeps the path left-to-right inside Arabic text
            'لو بتستخدم Claude على الويب أو الديسكتوب: ارفع الـ Skill من إعدادات الـ Skills.',
            'وبعدين اطلب منه أي ستايل بالاسم، وهو يمشي معاك خطوة بخطوة.',
          ],
        },
      ],
    },
    tipsHeading: '💡 نصيحة:',
    tips: [
      'ابدأ بستايل واحد وطبّقه على فيديو حقيقي عندك، بدل ما تجرب الـ 100 مرة واحدة.',
    ],
    ctaHeading: '🚀 عايز تتعلم تعمل فيديوهات بالذكاء الاصطناعي للبراندات والعملاء؟',
    ctaBody: 'كورسات AI Career School بالعربي، من الصفر لحد أول عميل.',
    ctaButtonLabel: 'اعرف تفاصيل الكورس',
    ctaHref: '/ai-content',
  },
];

export const leadMagnets: LeadMagnetGuide[] = LEAD_MAGNET_CONFIGS.map(
  (config) => {
    if (config.unlocked.kind === 'prompt') {
      const { promptFile, ...unlockedRest } = config.unlocked;
      return {
        ...config,
        unlocked: { ...unlockedRest, promptText: loadPromptExact(promptFile) },
      };
    }
    return { ...config, unlocked: config.unlocked };
  }
);

export function getLeadMagnetBySlug(slug: string): LeadMagnetGuide | undefined {
  return leadMagnets.find((guide) => guide.slug === slug);
}
