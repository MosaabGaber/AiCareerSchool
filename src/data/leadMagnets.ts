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

export interface GuideToolRow {
  name: string;
  description: string;
  href: string;
  display: string;
}

/** Generic content blocks for guides built from sections. */
export type GuideBlock =
  | { kind: 'paragraph'; text: string; strong?: boolean }
  | { kind: 'bullets'; items: string[] }
  | { kind: 'numbered'; items: string[] }
  /** Left-to-right monospace box without a copy button (e.g. a folder tree). */
  | { kind: 'codeBox'; text: string }
  /** Titled prompt box with a copy button. `text` is copied exactly. */
  | { kind: 'prompt'; title: string; text: string; copyLabel: string }
  /** Small highlighted box with a course link. */
  | { kind: 'callout'; text: string; linkText: string; href: string }
  | { kind: 'toolsTable'; columns: [string, string, string]; rows: GuideToolRow[] }
  | { kind: 'note'; text: string };

export interface GuideSection {
  /** Omit for a section whose heading is already shown (e.g. the locked heading). */
  heading?: string;
  blocks: GuideBlock[];
}

/** Unlocked content: a list of sections built from generic blocks. */
export interface LeadMagnetSectionsUnlock {
  kind: 'sections';
  sections: GuideSection[];
}

export interface LeadMagnetGuide {
  /** Omitted = classic lead magnet (form + unlock). */
  type?: 'lead-magnet';
  slug: string;
  /** Topic tags shown on /guides (e.g. "موقع", "فيديو"). */
  tags: string[];
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
  /** Always-visible sections shown after step1 and before the lock. */
  visibleSections?: GuideSection[];
  /** Which fields the unlock form asks for. Default: 'phone-email'. */
  formFields?: 'phone-email' | 'email';
  /** Line under the form button. Default mentions WhatsApp and email. */
  formDisclaimer?: string;
  unlocked: LeadMagnetPromptUnlock | LeadMagnetStepsUnlock | LeadMagnetSectionsUnlock;
  tipsHeading: string;
  tips: string[];
  ctaHeading: string;
  ctaBody: string;
  ctaButtonLabel: string;
  ctaHref: string;
  /** Green highlighted CTA card instead of the default gray one. */
  ctaProminent?: boolean;
}

export interface CourseTeaserPart {
  title: string;
  body: string;
}

/** Explainer page with no form/lock that leads to a course. */
export interface CourseTeaserGuide {
  type: 'course-teaser';
  slug: string;
  tags: string[];
  badgeLabel: string;
  title: string;
  subtitle: string;
  seoTitle: string;
  seoDescription: string;
  partsHeading: string;
  parts: CourseTeaserPart[];
  partsOutro: string;
  ctaHeading: string;
  ctaBody: string;
  ctaButtonLabel: string;
  ctaHref: string;
  ctaNote: string;
  /** Used for InitiateCheckout / begin_checkout on the course button. */
  courseName: string;
  coursePrice: number;
  footerLinkText: string;
  footerLinkHref: string;
}

export type Guide = LeadMagnetGuide | CourseTeaserGuide;

type PromptUnlockConfig = Omit<LeadMagnetPromptUnlock, 'promptText'> & {
  promptFile: string;
};

interface LeadMagnetConfig extends Omit<LeadMagnetGuide, 'unlocked'> {
  unlocked: PromptUnlockConfig | LeadMagnetStepsUnlock | LeadMagnetSectionsUnlock;
}

function loadPromptExact(relativeFilePath: string): string {
  const fullPath = path.join(process.cwd(), relativeFilePath);
  return fs.readFileSync(fullPath, 'utf-8');
}

const LEAD_MAGNET_CONFIGS: LeadMagnetConfig[] = [
  {
    slug: 'clothing-rail',
    tags: ['موقع'],
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
    tags: ['فيديو'],
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
  {
    slug: 'ai-video-editor',
    tags: ['مونتاج'],
    badgeLabel: 'جايد مجاني من AI Career School',
    title: 'اعمل المونتير بتاعك بالذكاء الاصطناعي 🎬',
    subtitle:
      'تقدر تبني مونتير AI خاص بيك بـ Claude Code و5 أدوات مجانية، والجايد ده فيه كل اللي محتاجه: 4 خطوات، و3 برومبتات جاهزة للنسخ، ولينكات كل أداة.',
    subtitleCourseLine: {
      before: 'وده جزء صغير من اللي بنعلمه في ',
      linkText: 'كورس صناعة المحتوى بالذكاء الاصطناعي',
      href: '/ai-content',
    },
    seoTitle:
      'اعمل مونتير AI ببلاش بـ Claude Code و5 أدوات مجانية | AI Career School',
    seoDescription:
      'تقدر تبني مونتير AI خاص بيك بـ Claude Code و5 أدوات مجانية، والجايد ده فيه كل اللي محتاجه: 4 خطوات، و3 برومبتات جاهزة للنسخ، ولينكات كل أداة.',
    visibleSections: [
      {
        heading: 'قبل ما تبدأ',
        blocks: [
          {
            kind: 'paragraph',
            text: 'جهّز الحاجات دي الأول، عشان ماتقفش في نص الطريق:',
          },
          {
            kind: 'bullets',
            items: [
              'تطبيق Claude على الديسكتوب، وتفتح Claude Code جواه. استخدم تطبيق الديسكتوب، مش المتصفح.',
              'اشتراك في Claude فيه Claude Code. ممكن يحتاج اشتراك مدفوع.',
              'Node.js إصدار 22 أو أحدث، لأن HyperFrames محتاجه.',
              'لينكات إنستجرام لـ 3 لـ 5 فيديوهات عاجبك ستايل المونتاج بتاعها (للخطوة 3).',
              'فيديو خام واحد بتاعك (للخطوة 4).',
            ],
          },
        ],
      },
      {
        heading: 'الخطوة 1: جهّز مكان الشغل',
        blocks: [
          {
            kind: 'paragraph',
            text: 'اعمل فولدر واحد جواه 3 فولدرات، وافتحه في Claude Code عشان Claude يشوف ملفاتك.',
          },
          {
            kind: 'numbered',
            items: [
              'على جهازك، اعمل فولدر اسمه AI Video Editor.',
              'جواه اعمل 3 فولدرات: Raw Footage و References و Exports.',
              'افتح تطبيق Claude على الديسكتوب وابدأ شات Claude Code جديد.',
              'اختار Local، وبعدين اختار فولدر AI Video Editor.',
            ],
          },
          {
            kind: 'codeBox',
            text: [
              'AI Video Editor',
              '   Raw Footage',
              '   References',
              '   Exports',
            ].join('\n'),
          },
          {
            kind: 'paragraph',
            text: 'Raw Footage فيه الفيديوهات الخام بتاعتك. References فيه الفيديوهات اللي Claude بيتعلم منها. Exports فيه الفيديوهات الجاهزة.',
          },
        ],
      },
    ],
    lockedHeading: 'الخطوة 2: نزّل الأدوات',
    lockedPreview: {
      before:
        'الصق البرومبت 1، وClaude هينزّل الـ 5 أدوات ويجربهم بنفسه. استنى لحد ما يقولك إنه جاهز.',
      code: 'I want you to be my video editor. Install these tools on my computer and test each one: 1. Remotion ...',
      after: 'الخطوة 3: علّم Claude ستايل المونتاج بتاعك...',
    },
    formFields: 'email',
    formHeading: 'ادخل إيميلك وخد الـ 3 برومبتات والجايد كامل ببلاش 👇',
    formButtonLabel: 'افتح الجايد',
    formDisclaimer: 'هنبعتلك جايدز وعروض على الإيميل، وتقدر توقفها في أي وقت.',
    unlocked: {
      kind: 'sections',
      sections: [
        {
          // Heading "الخطوة 2: نزّل الأدوات" is shown as lockedHeading
          blocks: [
            {
              kind: 'paragraph',
              text: 'الصق البرومبت 1، وClaude هينزّل الـ 5 أدوات ويجربهم بنفسه. استنى لحد ما يقولك إنه جاهز.',
            },
            {
              kind: 'prompt',
              title: 'Prompt 1: Install the tools',
              copyLabel: 'انسخ البرومبت',
              text: [
                'I want you to be my video editor. Install these tools on my computer and test each one:',
                '',
                '1. Remotion: github.com/remotion-dev/remotion',
                '2. HyperFrames: github.com/heygen-com/hyperframes',
                '3. FFmpeg: github.com/FFmpeg/FFmpeg',
                '4. Whisper (whisper.cpp): github.com/ggml-org/whisper.cpp',
                '5. yt dlp: github.com/yt-dlp/yt-dlp',
                '',
                'When everything works, tell me you are ready.',
              ].join('\n'),
            },
          ],
        },
        {
          heading: 'الخطوة 3: علّم Claude ستايل المونتاج بتاعك',
          blocks: [
            {
              kind: 'paragraph',
              text: 'الصق البرومبت 2 مع لينكات 3 لـ 5 فيديوهات عاجبك مونتاجهم، وClaude هيعملك Brand Sheet منهم. غيّر الـ 3 أماكن اللي بين القوسين بلينكات إنستجرام بتاعتك.',
            },
            {
              kind: 'prompt',
              title: 'Prompt 2: Learn your style',
              copyLabel: 'انسخ البرومبت',
              text: [
                'Learn the editing style from these videos:',
                '[PASTE INSTAGRAM LINK 1]',
                '[PASTE INSTAGRAM LINK 2]',
                '[PASTE INSTAGRAM LINK 3]',
                '',
                '1. Download each one into my References folder.',
                '2. Study what they have in common: fonts, colors, caption style, cuts, zooms, pacing, motion graphics, music, and sound.',
                '3. Build me a brand sheet that I can review. Make it inspired by these videos, not a copy of them.',
                '',
                'Once I approve it, follow it every time you edit for me.',
              ].join('\n'),
            },
            {
              kind: 'paragraph',
              text: 'اقرا الـ Brand Sheet قبل ما توافق عليه. جملة \u2066inspired, not a copy\u2069 بتخلي المونتاج بتاعك أصلي ومش نسخة من حد.',
            },
            {
              kind: 'callout',
              text: '💡 في كورس صناعة المحتوى بنعلمك إزاي تبني ستايل خاص بيك وتعمل فيديوهات وإعلانات بالذكاء الاصطناعي للبراندات.',
              linkText: 'اعرف أكتر',
              href: '/ai-content',
            },
          ],
        },
        {
          heading: 'الخطوة 4: صوّر وعدّل',
          blocks: [
            {
              kind: 'paragraph',
              text: 'صوّر الفيديو بتاعك عادي، وحط الملف الخام في فولدر Raw Footage. وبعدين الصق البرومبت 3 وغيّر اسم الملف.',
            },
            {
              kind: 'prompt',
              title: 'Prompt 3: Edit the Reel',
              copyLabel: 'انسخ البرومبت',
              text: [
                'Edit my new video into an Instagram Reel:',
                '[FILE NAME] in my Raw Footage folder',
                '',
                '1. Remove every pause longer than 0.1 seconds.',
                '2. Follow my approved brand sheet.',
                '3. Add captions, music, and motion graphics.',
                '4. Use anything useful from my References folder.',
                '',
                'Show me a storyboard to review first. After I approve it, export the final video to my Exports folder.',
              ].join('\n'),
            },
            {
              kind: 'paragraph',
              text: 'Claude هيوريك Storyboard الأول. وافق عليه، والفيديو الجاهز هينزل في فولدر Exports.',
            },
            {
              kind: 'paragraph',
              text: 'ولو في حاجة مش عاجباك، قوله بكلام عادي:',
            },
            { kind: 'codeBox', text: 'Make the hook bigger.' },
            {
              kind: 'callout',
              text: '🎥 الفيديو بقى جاهز… طب إزاي تبيع الشغل ده؟ في كورس صناعة المحتوى بالذكاء الاصطناعي بنعلمك تعمل فيديوهات وإعلانات للبراندات والعملاء وتسعّرها.',
              linkText: 'شوف الكورس',
              href: '/ai-content',
            },
          ],
        },
        {
          heading: 'لينكات الأدوات على GitHub',
          blocks: [
            {
              kind: 'paragraph',
              text: 'الـ 5 أدوات دول هما اللي بيشغلوا المونتير، والبرومبت 1 بينزّلهم كلهم. (اللينكات اتراجعت في 25 أكتوبر 2026.)',
            },
            {
              kind: 'toolsTable',
              columns: ['Tool', 'بيعمل إيه', 'GitHub link'],
              rows: [
                {
                  name: 'Remotion',
                  description: 'بيعمل فيديوهات من كود React، للمونتاج والموشن جرافيك',
                  href: 'https://github.com/remotion-dev/remotion',
                  display: 'github.com/remotion-dev/remotion',
                },
                {
                  name: 'HyperFrames',
                  description: 'أداة مفتوحة المصدر من HeyGen بتحوّل HTML لفيديو MP4، معمولة للـ AI',
                  href: 'https://github.com/heygen-com/hyperframes',
                  display: 'github.com/heygen-com/hyperframes',
                },
                {
                  name: 'FFmpeg',
                  description: 'بيقص ويحوّل ويصدّر الفيديو والصوت',
                  href: 'https://github.com/FFmpeg/FFmpeg',
                  display: 'github.com/FFmpeg/FFmpeg',
                },
                {
                  name: 'Whisper (whisper.cpp)',
                  description: 'بيحوّل الكلام لنص عشان Claude يعمل الكابشن',
                  href: 'https://github.com/ggml-org/whisper.cpp',
                  display: 'github.com/ggml-org/whisper.cpp',
                },
                {
                  name: 'yt dlp',
                  description: 'بينزّل فيديوهات الـ References من إنستجرام ومواقع تانية',
                  href: 'https://github.com/yt-dlp/yt-dlp',
                  display: 'github.com/yt-dlp/yt-dlp',
                },
              ],
            },
            {
              kind: 'note',
              text: 'FFmpeg على GitHub نسخة مرآة، وموقعه الرسمي ffmpeg.org. وكل أداة ليها رخصة خاصة بيها، فراجع الرخصة قبل ما تستخدمها في شغل لعميل.',
            },
          ],
        },
      ],
    },
    tipsHeading: '💡 نصايح عشان النتيجة تطلع أحسن',
    tips: [
      'اختار 3 لـ 5 فيديوهات References ليهم نفس الستايل اللي عايزه.',
      'راجع الـ Brand Sheet والـ Storyboard قبل ما توافق على أي واحد فيهم.',
      'اطلب تعديل واحد بس في المرة، بكلام بسيط، زي: make the hook bigger.',
      'خلي الفيديوهات الخام في Raw Footage والجاهزة في Exports، عشان Claude يعرف يدوّر فين.',
      'تابعنا، لأننا هنوريك ستايل المونتاج بتاعنا قريب.',
    ],
    ctaHeading: '🚀 عايز تتعلم تعمل فيديوهات وإعلانات بالذكاء الاصطناعي للبراندات والعملاء؟',
    ctaBody:
      'كورس صناعة المحتوى بالذكاء الاصطناعي بيمشي معاك بالعربي من الصفر لحد أول عميل: صور، فيديوهات، إعلانات، وإزاي تبيع شغلك.',
    ctaButtonLabel: 'اشترك في الكورس',
    ctaHref: '/ai-content',
    ctaProminent: true,
  },
];

const COURSE_TEASERS: CourseTeaserGuide[] = [
  {
    type: 'course-teaser',
    slug: 'live-try-on',
    tags: ['موقع'],
    badgeLabel: 'من AI Career School',
    title: 'إزاي تعمل موقع الـ Live Try-On اللي الكل بيدور عليه 👕✨',
    subtitle:
      'العميل يجرب اللبس على نفسه قبل ما يشتري. ده اللي محتاجه عشان تعمل موقع زيه.',
    seoTitle: 'إزاي تعمل موقع Live Try-On بالذكاء الاصطناعي | AI Career School',
    seoDescription:
      'العميل يجرب اللبس على نفسه قبل ما يشتري. ده اللي محتاجه عشان تعمل موقع زيه.',
    partsHeading: 'الموقع ده معمول من حاجتين:',
    parts: [
      {
        title: 'موقع بالذكاء الاصطناعي',
        body: 'صفحات المنتجات، الصور، والتصميم. بيتعمل بأدوات بتكتب الكود بدالك، من غير ما تكون مبرمج.',
      },
      {
        title: 'موديل Virtual Try-On',
        body: 'أداة ذكاء اصطناعي بتاخد صورة العميل وصورة القطعة، وتطلعلك صورة العميل لابسها.',
      },
    ],
    partsOutro:
      'وبعد كده بتربط الاتنين ببعض، فالعميل يرفع صورته من الموقع ويشوف النتيجة.',
    ctaHeading: '🚀 عايز تتعلم تعمل الموقع ده خطوة بخطوة؟',
    ctaBody:
      'في كورس إنشاء المواقع بالذكاء الاصطناعي هتتعلم تبني مواقع احترافية من الصفر من غير كود، وتضيف عليها مميزات زي الـ Try-On، وتبيعها للبراندات والعملاء.',
    ctaButtonLabel: 'اشترك في الكورس',
    ctaHref: '/web-creation',
    ctaNote: 'بالعربي، ومن غير أي خبرة برمجة.',
    courseName: 'Web Creation Course',
    coursePrice: 1200,
    footerLinkText: 'شوف باقي الجايدز المجانية',
    footerLinkHref: '/guides',
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

/** Every page under /guides, newest first. */
export const allGuides: Guide[] = [...COURSE_TEASERS, ...leadMagnets.slice().reverse()];

export function getLeadMagnetBySlug(slug: string): LeadMagnetGuide | undefined {
  return leadMagnets.find((guide) => guide.slug === slug);
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return allGuides.find((guide) => guide.slug === slug);
}
