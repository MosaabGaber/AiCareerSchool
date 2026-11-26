import fs from 'node:fs';
import path from 'node:path';

export interface LeadMagnetStep1 {
  heading: string;
  intro: string;
  inlinePath?: string;
  introAfterPath?: string;
  bullets: string[];
}

export interface LeadMagnetGuide {
  slug: string;
  title: string;
  subtitle: string;
  seoTitle: string;
  seoDescription: string;
  step1: LeadMagnetStep1;
  step2Heading: string;
  step2Intro: string;
  promptToggleLabel: string;
  promptCopyLabel: string;
  promptText: string;
  followUpIntro: string;
  followUpPrompt: string;
  afterPromptText: string;
  tipsHeading: string;
  tips: string[];
  ctaHeading: string;
  ctaBody: string;
  ctaButtonLabel: string;
  ctaHref: string;
}

interface LeadMagnetConfig extends Omit<LeadMagnetGuide, 'promptText'> {
  promptFile: string;
}

function loadPromptExact(relativeFilePath: string): string {
  const fullPath = path.join(process.cwd(), relativeFilePath);
  return fs.readFileSync(fullPath, 'utf-8');
}

const LEAD_MAGNET_CONFIGS: LeadMagnetConfig[] = [
  {
    slug: 'clothing-rail',
    title: 'اعمل موقع الهدوم المتعلقة على الشماعة بالذكاء الاصطناعي 🛍️',
    subtitle:
      'ده الجايد اللي هيخليك تعمل نفس الموقع اللي في الفيديو، في خطوتين بس، ومن غير ما تكتب ولا سطر كود.',
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
    step2Heading: 'الخطوة 2: الصق البرومبت في مساعد الكود بتاعك',
    step2Intro:
      'افتح مشروعك في أي أداة AI بتكتب كود زي Claude Code أو Cursor أو Antigravity، وانسخ البرومبت كله والصقه زي ما هو.',
    promptToggleLabel: '📋 اعرض البرومبت',
    promptCopyLabel: 'انسخ البرومبت',
    promptFile: 'content/lead-magnets/clothing-rail-prompt.txt',
    followUpIntro: 'وبعد البرومبت مباشرةً، ضيف السطر ده عشان يستخدم صورك أنت:',
    followUpPrompt:
      'Use my own product photos from the folder public/images/products instead of Unsplash. Use the -front, -back and -side photo of each piece as its image, backImage and sideImage, and change the product names and prices to mine.',
    afterPromptText:
      'وبس كده! الأداة هتركّب الموقع، وهتلاقي الهدوم متعلقة وبتتحرك وتلف لما تقف عليها 🔥',
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
];

export const leadMagnets: LeadMagnetGuide[] = LEAD_MAGNET_CONFIGS.map(
  ({ promptFile, ...rest }) => ({
    ...rest,
    promptText: loadPromptExact(promptFile),
  })
);

export function getLeadMagnetBySlug(slug: string): LeadMagnetGuide | undefined {
  return leadMagnets.find((guide) => guide.slug === slug);
}
