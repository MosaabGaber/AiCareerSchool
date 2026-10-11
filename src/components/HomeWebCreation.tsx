'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Clock,
  Infinity as InfinityIcon,
  Award,
  ShieldCheck,
  Star,
  Sparkles,
  ShoppingCart,
  Building2,
  DollarSign,
  Search,
  Palette,
  Users,
  Layers,
  ArrowRight,
  Globe,
  CheckCircle2
} from 'lucide-react';
import { CountdownBanner } from './CountdownBanner';
import { InfoModal } from './InfoModal';

interface HomeWebCreationProps {
  setIsPromptsModalOpen: (val: boolean) => void;
  setIsPrivacyOpen: (val: boolean) => void;
  setIsTermsOpen: (val: boolean) => void;
  setIsRefundOpen: (val: boolean) => void;
}

const HIGHLIGHTS = [
  {
    icon: Layers,
    titleArabic: 'مواقع ثلاثية الأبعاد',
    titleEnglish: '3D Websites',
    desc: 'تصميمات بصرية مذهلة بتبرز عن المنافسين وتجذب العملاء بتأثيرات تفاعلية حديثة.',
    color: 'from-blue-500/10 to-indigo-500/10',
    iconColor: 'text-blue-600',
  },
  {
    icon: ShoppingCart,
    titleArabic: 'متاجر إلكترونية',
    titleEnglish: 'E-commerce Stores',
    desc: 'مواقع بيع كاملة بعربة تسوق ودفع إلكتروني وإدارة منتجات جاهزة للعمل فوراً.',
    color: 'from-emerald-500/10 to-teal-500/10',
    iconColor: 'text-emerald-600',
  },
  {
    icon: Building2,
    titleArabic: 'مواقع الشركات',
    titleEnglish: 'Business Websites',
    desc: 'مواقع احترافية للشركات والبراندات تعكس قوة علامتهم التجارية وتزيد مصداقيتهم.',
    color: 'from-purple-500/10 to-violet-500/10',
    iconColor: 'text-purple-600',
  },
  {
    icon: DollarSign,
    titleArabic: 'بيع المواقع',
    titleEnglish: 'Sell Websites',
    desc: 'استراتيجيات بيع المواقع لعملاء بآلاف الجنيهات والتسعير الاحترافي لإغلاق الصفقات.',
    color: 'from-amber-500/10 to-orange-500/10',
    iconColor: 'text-amber-600',
  },
  {
    icon: Search,
    titleArabic: 'SEO وظهور في جوجل',
    titleEnglish: 'SEO & Google Ranking',
    desc: 'تحسين محركات البحث وظهور الموقع في أولى نتائج جوجل لجلب زيارات مستمرة مجاناً.',
    color: 'from-sky-500/10 to-blue-500/10',
    iconColor: 'text-sky-600',
  },
  {
    icon: Sparkles,
    titleArabic: 'مواقع بالذكاء الاصطناعي',
    titleEnglish: 'AI-Powered Sites',
    desc: 'استخدام أحدث أدوات الذكاء الاصطناعي لإنشاء محتوى وصور وهياكل المواقع في دقائق.',
    color: 'from-fuchsia-500/10 to-pink-500/10',
    iconColor: 'text-fuchsia-600',
  },
  {
    icon: Palette,
    titleArabic: 'تصميم UI/UX',
    titleEnglish: 'UI/UX Design',
    desc: 'تصميم تجربة مستخدم احترافية وسهلة الاستخدام تضمن بقاء الزائر وتحويله لعميل.',
    color: 'from-rose-500/10 to-red-500/10',
    iconColor: 'text-rose-600',
  },
  {
    icon: Users,
    titleArabic: 'فريلانس وعملاء',
    titleEnglish: 'Freelance & Clients',
    desc: 'كيفية إيجاد العملاء، التفاوض، وإدارة المشاريع بنجاح لتحقيق دخل شهري مستمر.',
    color: 'from-cyan-500/10 to-teal-500/10',
    iconColor: 'text-cyan-600',
  },
];

const SHOWCASE_ITEMS = [
  '3D Interactive Websites',
  'Full E-Commerce Stores',
  'Corporate & Business Sites',
  'High-Converting Landing Pages',
  'Modern Portfolios',
];

const PHASES = [
  {
    arabicTitle: 'المرحلة الأولى: أساسيات بناء المواقع بالذكاء الاصطناعي',
    englishTitle: 'Phase 1: AI Website Fundamentals',
    description: 'فهم أدوات الذكاء الاصطناعي لتطوير الويب، اختيار الأدوات المناسبة، وتوليد الأفكار وهياكل المواقع في دقائق بدون كتابة سطر كود واحد.',
  },
  {
    arabicTitle: 'المرحلة الثانية: المواقع الثلاثية الأبعاد',
    englishTitle: 'Phase 2: 3D Websites',
    description: 'تصميم مواقع عصرية بتأثيرات بصرية ثلاثية الأبعاد وعناصر تفاعلية تجذب الزوار وتخلي الموقع يفرق تماماً عن أي موقع تقليدي في السوق.',
  },
  {
    arabicTitle: 'المرحلة الثالثة: المتاجر الإلكترونية',
    englishTitle: 'Phase 3: E-commerce Stores',
    description: 'بناء متاجر إلكترونية متكاملة مع عربة تسوق، بوابات دفع، إدارة منتجات، وتتبع الطلبات جاهزة لاستقبال المدفوعات والبيع المباشر.',
  },
  {
    arabicTitle: 'المرحلة الرابعة: SEO والظهور في جوجل',
    englishTitle: 'Phase 4: SEO & Google Visibility',
    description: 'تهيئة الموقع لمحركات البحث (SEO)، تحسين سرعة التحميل، واستخدام استراتيجيات تصدر نتائج البحث في جوجل لجلب زوار وعملاء مهتمين.',
  },
  {
    arabicTitle: 'المرحلة الخامسة: بيع المواقع والحصول على عملاء',
    englishTitle: 'Phase 5: Selling Websites & Getting Clients',
    description: 'استراتيجيات التسويق لنفسك كصانع مواقع، تسعير خدماتك بآلاف الجنيهات، إيجاد العملاء في مصر والخليج، وإدارة المشاريع باحترافية.',
  },
];

const FAQS = [
  {
    question: 'هل محتاج خبرة في البرمجة؟',
    answer: 'لا خالص، الكورس مصمم للمبتدئين بالكامل بدون أي كود. بنعلمك تبني مواقع احترافية خطوة بخطوة باستخدام أحدث أدوات الذكاء الاصطناعي والبناء البصري.',
  },
  {
    question: 'الأدوات المستخدمة مجانية؟',
    answer: 'بنغطي أدوات مجانية ومدفوعة وبنوريك أرخص البدائل وكيفية الاستفادة القصوى من الخطط المجانية في كل أداة لبدء عملك بأقل تكلفة ممكنة.',
  },
  {
    question: 'هقدر أبيع المواقع فعلاً؟',
    answer: 'أيوه، بنعلمك استراتيجيات إيجاد العملاء، تسعير شغلك بآلاف الجنيهات، تقديم عروض الأسعار، وإبرام الاتفاقيات مع أصحاب الأعمال والشركات.',
  },
  {
    question: 'الكورس بيتحدث؟',
    answer: 'أيوه، بيتحدث باستمرار بأحدث الأدوات والتقنيات في عالم الذكاء الاصطناعي وتطوير الويب لضمان بقائك دايماً متقدماً على السوق.',
  },
  {
    question: 'الكورس مسجل ولا لايف؟',
    answer: 'الكورس مسجل بالكامل بجودة عالية وتقدر تتفرج عليه في أي وقت يناسبك، مع وصول مدى الحياة وتحديثات مستمرة.',
  },
  {
    question: 'هل بحصل على شهادة إتمام؟',
    answer: 'أيوه، بعد إتمام الكورس ستحصل على شهادة إتمام معتمدة من AI Career School يمكنك إضافتها إلى لينكد إن وبورتفوليو أعمالك.',
  },
];

const REVIEWS = [
  {
    name: 'أحمد طارق',
    role: 'Freelancer',
    rating: 5,
    text: 'عملت أول موقع لشركة توريدات بعد أسبوعين من الكورس وقبضت 12,000 جنيه. الشرح عملي جداً والأدوات غيرت نظرتي لتطوير الويب تماماً.',
  },
  {
    name: 'مريم عادل',
    role: 'UI Designer',
    rating: 5,
    text: 'كنت بصمم واجهات بس ومش بعرف أنفذها. دلوقتي بقيت أسلّم الموقع شغال بالكامل للعميل في يومين بالذكاء الاصطناعي وبدون أي كود!',
  },
  {
    name: 'عمر نبيل',
    role: 'E-commerce Owner',
    rating: 5,
    text: 'بنيت متجري الإلكتروني بنفسي في 3 أيام وفرت أكتر من 20,000 جنيه كانت شركات الويب طلباها مني. الكورس استثمار رجعلي أضعافه فوراً.',
  },
  {
    name: 'سارة حسام',
    role: 'Marketing Specialist',
    rating: 5,
    text: 'المواقع ثلاثية الأبعاد بتبهر العملاء جداً! ميزة تنافسية خرافية مفيش حد بيعملها بالشكل ده. الكورس ممتاز ومنظم لأقصى درجة.',
  },
  {
    name: 'محمود عبد العزيز',
    role: 'Agency Founder',
    rating: 4.8,
    text: 'أضفنا خدمة بناء المواقع في وكالتنا بعد الكورس وبقى ده المصدر الأكبر للدخل عندنا. بنسلّم مواقع في أيام بدل أسابيع.',
  },
];

export function HomeWebCreation({
  setIsPromptsModalOpen,
  setIsPrivacyOpen,
  setIsTermsOpen,
  setIsRefundOpen,
}: HomeWebCreationProps) {
  const [activeShowcase, setActiveShowcase] = useState(0);
  const [openPhase, setOpenPhase] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveShowcase((prev) => (prev + 1) % SHOWCASE_ITEMS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleCheckout = () => {
    window.location.href = '/web-creation-checkout';
  };

  return (
    <div className="bg-white min-h-screen text-gray-900 selection:bg-blue-600 selection:text-white">
      <CountdownBanner />

      <main className="mt-6">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] md:min-h-0 flex items-center justify-center pt-32 pb-12 md:pt-28 md:pb-16 overflow-hidden">
          <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Top Tag */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-semibold mb-6 shadow-sm">
                <Sparkles size={16} />
                <span>كورس شامل بدون كود • Web Creation Course</span>
              </div>

              {/* Headlines */}
              <h1
                className="text-[2.2rem] md:text-[3.8rem] font-outfit font-extrabold text-gray-900 leading-tight mb-4 tracking-tight"
                dir="rtl"
              >
                إنشاء مواقع احترافية بالذكاء الاصطناعي
              </h1>

              <h2 className="text-[1.3rem] md:text-[1.8rem] font-outfit font-semibold text-blue-600 mb-6 tracking-wide">
                Build Professional Websites with AI
              </h2>

              {/* Subtitles */}
              <p
                className="text-lg md:text-2xl font-outfit font-medium text-gray-700 mb-3 max-w-3xl mx-auto leading-relaxed"
                dir="rtl"
              >
                تعلم تبني مواقع ويب مذهلة بدون كود — وتبيعها بآلاف الجنيهات
              </p>

              <p className="text-sm md:text-base text-gray-500 font-inter mb-10 max-w-2xl mx-auto">
                Learn to build stunning websites without code — and sell them for thousands
              </p>

              {/* Quick Jump Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                <button
                  onClick={() => document.getElementById('highlights')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white border border-gray-300 shadow-sm hover:border-gray-400 hover:shadow-md text-gray-800 rounded-full px-5 py-2 font-outfit text-sm hover:bg-gray-50 transition-all cursor-pointer"
                >
                  مميزات الكورس
                </button>
                <button
                  onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white border border-gray-300 shadow-sm hover:border-gray-400 hover:shadow-md text-gray-800 rounded-full px-5 py-2 font-outfit text-sm hover:bg-gray-50 transition-all cursor-pointer"
                >
                  تفاصيل المحتوى
                </button>
                <button
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white border border-gray-300 shadow-sm hover:border-gray-400 hover:shadow-md text-gray-800 rounded-full px-5 py-2 font-outfit text-sm hover:bg-gray-50 transition-all cursor-pointer"
                >
                  الأسعار
                </button>
                <button
                  onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white border border-gray-300 shadow-sm hover:border-gray-400 hover:shadow-md text-gray-800 rounded-full px-5 py-2 font-outfit text-sm hover:bg-gray-50 transition-all cursor-pointer"
                >
                  أسئلة شائعة
                </button>
              </div>

              {/* CTA Button */}
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="inline-block">
                <button
                  onClick={handleCheckout}
                  className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-10 py-4 rounded-2xl text-lg md:text-xl font-bold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 transition-all duration-300 flex items-center gap-3 cursor-pointer"
                  dir="rtl"
                >
                  <span>اشترك الآن بـ 1,200 EGP</span>
                  <ArrowRight size={22} className="rtl:rotate-180" />
                </button>
              </motion.div>

              {/* Guarantees / Badges */}
              <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-gray-500" dir="rtl">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-blue-600" /> وصول فوري ومدى الحياة
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-blue-600" /> بدون أي خبرة برمجة
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-blue-600" /> شهادة إتمام معتمدة
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Learn to Create showcase */}
        <section className="py-8 bg-gray-50 border-y border-gray-200">
          <div className="container mx-auto px-6 text-center">
            <h3 className="text-2xl md:text-3xl font-outfit font-extrabold text-gray-900 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
              <span>Learn to Create:</span>
              <div className="h-[1.3em] relative flex items-center min-w-[320px] md:min-w-[420px] justify-center md:justify-start">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={activeShowcase}
                    initial={{ y: 25, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -25, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="text-blue-600 font-bold absolute left-0 right-0 md:text-left text-center"
                  >
                    {SHOWCASE_ITEMS[activeShowcase]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </h3>
          </div>
        </section>

        {/* Course Highlights (8 Feature Cards) */}
        <section id="highlights" className="py-20 px-6 container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest font-outfit">
              Everything You Will Learn
            </span>
            <h2 className="text-3xl md:text-5xl font-outfit font-extrabold text-gray-900 mt-2 mb-4" dir="rtl">
              ماذا ستتعلم في الكورس؟
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto" dir="rtl">
              مهارات شاملة لبناء أحدث أنواع المواقع واقتحام سوق العمل كصانع مواقع محترف.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" dir="rtl">
            {HIGHLIGHTS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-5 ${item.iconColor}`}>
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold font-outfit text-gray-900 mb-1 leading-snug">
                      {item.titleArabic}
                    </h3>
                    <h4 className="text-xs font-semibold font-outfit text-blue-600 uppercase tracking-wide mb-3" dir="ltr">
                      {item.titleEnglish}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed font-inter">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 bg-[#eff6ff] border-y border-blue-100 relative z-10">
          <div className="container mx-auto px-6 text-center max-w-4xl">
            <span className="text-blue-700 font-bold tracking-widest uppercase mb-3 text-sm block">
              سعر الكورس لفترة محدودة / Course Price:
            </span>

            <div className="flex flex-col md:flex-row items-center justify-center gap-x-6 gap-y-2 mb-4">
              <span className="text-4xl md:text-6xl font-outfit font-extrabold text-gray-900 tracking-tight">
                Pay 1,200 EGP
              </span>
              <span className="text-2xl md:text-3xl font-outfit text-gray-400 line-through">
                instead of LE 2,500
              </span>
            </div>

            <p className="text-emerald-600 font-bold text-lg mb-8" dir="rtl">
              وفر أكثر من 50% — خصم لفترة محدودة للدفعة الحالية
            </p>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="inline-block mb-8">
              <button
                onClick={handleCheckout}
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-12 py-4 rounded-2xl text-xl font-bold shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all cursor-pointer"
                dir="rtl"
              >
                اشترك الآن بـ 1,200 EGP
              </button>
            </motion.div>

            {/* Payment Logos */}
            <div className="mt-4 flex flex-col items-center gap-3">
              <span className="text-gray-600 font-medium text-sm" dir="rtl">
                طرق الدفع المتاحة (فوري، كارت، إنستاباي، فودافون كاش)
              </span>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <img src="/payment/insta.png" alt="Instapay" className="h-[46px] w-auto object-contain" />
                <img src="/payment/voda.png" alt="Vodafone Cash" className="h-[46px] w-auto object-contain" />
                <img src="/payment/telda.png" alt="Telda" className="h-[46px] w-auto object-contain" />
                <img src="/payment/visa.png" alt="Visa" className="h-[46px] w-auto object-contain" />
                <img src="/payment/master.png" alt="Mastercard" className="h-[46px] w-auto object-contain" />
              </div>
            </div>
          </div>
        </section>

        {/* Curriculum / Phases Accordion */}
        <section id="curriculum" className="py-24 px-6 container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest font-outfit">
              Step-by-step roadmap
            </span>
            <h2 className="text-3xl md:text-5xl font-outfit font-bold text-gray-900 mt-2 mb-4" dir="rtl">
              مراحل وخطة الكورس
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-inter mb-8" dir="rtl">
              من الصفر للاحتراف — مسار تطبيقي عملي تطلع منه بمشاريع كاملة في بورتفوليو بتاعك.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm" dir="rtl">
                <Clock size={16} className="text-blue-600" />
                <span className="text-gray-900 text-sm font-outfit font-semibold">+5 ساعات محتوى عملي</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm" dir="rtl">
                <InfinityIcon size={16} className="text-blue-600" />
                <span className="text-gray-900 text-sm font-outfit font-semibold">وصول مدى الحياة</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm" dir="rtl">
                <Award size={16} className="text-blue-600" />
                <span className="text-gray-900 text-sm font-outfit font-semibold">شهادة إتمام معتمدة</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4" dir="rtl">
            {PHASES.map((phase, i) => {
              const isOpen = openPhase === i;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl transition-all duration-300 bg-white border border-gray-200 shadow-sm hover:shadow-md cursor-pointer"
                  onClick={() => setOpenPhase(isOpen ? null : i)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 font-outfit leading-tight text-right">
                      {phase.arabicTitle}
                    </h3>
                    <div
                      className={`w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-200 transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 bg-blue-50 border-blue-200' : ''
                      }`}
                    >
                      <ChevronDown className={`text-gray-400 ${isOpen ? 'text-blue-600' : ''}`} size={22} />
                    </div>
                  </div>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <h4 className="text-sm font-bold text-blue-600 mb-2 font-outfit text-left" dir="ltr">
                        {phase.englishTitle}
                      </h4>
                      <p className="text-gray-600 font-inter text-sm md:text-base leading-relaxed m-0 text-right">
                        {phase.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Student Reviews Section */}
        <section className="py-20 bg-gray-50 border-y border-gray-200 overflow-hidden">
          <div className="container mx-auto px-6 text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-outfit font-bold text-gray-900 mb-4" dir="rtl">
              آراء الطلاب والخريجين
            </h2>
            <div className="flex justify-center gap-1 text-amber-500 mb-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} fill="currentColor" size={22} />
              ))}
            </div>
            <p className="text-gray-600 text-sm md:text-base font-outfit">
              تقييم 4.9/5 عبر كل خريجي AI Career School
            </p>
          </div>

          <div className="relative w-full flex overflow-x-hidden">
            <motion.div
              className="flex gap-6 px-6"
              animate={{ x: [0, -1800] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 32,
                  ease: 'linear',
                },
              }}
            >
              {[...REVIEWS, ...REVIEWS].map((review, i) => (
                <div
                  key={i}
                  dir="rtl"
                  className="w-[85vw] md:w-[350px] shrink-0 bg-white p-6 md:p-7 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-outfit font-bold text-gray-900 text-lg">{review.name}</h4>
                        <span className="text-xs text-blue-600 font-medium">{review.role}</span>
                      </div>
                      <div className="flex text-amber-500">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={15} fill="currentColor" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed font-inter italic">
                      "{review.text}"
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 px-6 container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest font-outfit">
              Got Questions?
            </span>
            <h2 className="text-3xl md:text-4xl font-outfit font-bold text-gray-900 mt-2 mb-4" dir="rtl">
              أسئلة شائعة
            </h2>
          </div>

          <div className="flex flex-col gap-4" dir="rtl">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl transition-all duration-300 bg-white border border-gray-200 shadow-sm hover:shadow-md cursor-pointer"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 font-outfit leading-tight text-right">
                      {faq.question}
                    </h3>
                    <div
                      className={`w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-200 transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 bg-blue-50 border-blue-200' : ''
                      }`}
                    >
                      <ChevronDown className={`text-gray-400 ${isOpen ? 'text-blue-600' : ''}`} size={22} />
                    </div>
                  </div>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-gray-600 font-inter text-sm md:text-base leading-relaxed m-0 text-right">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA in FAQ */}
          <div className="mt-16 text-center">
            <button
              onClick={handleCheckout}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-10 py-4 rounded-2xl text-lg font-bold shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all cursor-pointer"
              dir="rtl"
            >
              ابدأ الآن بـ 1,200 EGP فقط
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-10 mt-12 relative z-10 bg-white">
        <div className="container mx-auto px-6 flex flex-col items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 flex items-center justify-center opacity-80">
              <img src="/logo.png" alt="AI Career School Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-outfit font-bold text-gray-600">
              AI Career School &copy; {new Date().getFullYear()}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/aicareer.school?igsh=MXFoY3doNTk4NG9jaw%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-all duration-200 hover:scale-110"
              aria-label="Instagram"
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            <a
              href="https://www.tiktok.com/@ai.career.school?_r=1&_t=ZS-94iXhQRgBtg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-all duration-200 hover:scale-110"
              aria-label="TikTok"
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
              </svg>
            </a>

            <button
              onClick={() => setIsPromptsModalOpen(true)}
              className="ml-4 px-5 py-1.5 rounded-full border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 shadow-sm transition-all duration-300 text-sm font-medium tracking-wide flex items-center justify-center cursor-pointer"
            >
              Prompts
            </button>

            <button
              onClick={handleCheckout}
              className="ml-2 px-5 py-1.5 rounded-full border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 shadow-sm transition-all duration-300 text-sm font-medium tracking-wide flex items-center justify-center cursor-pointer"
            >
              Checkout
            </button>
          </div>

          <div className="flex items-center text-sm text-gray-600 gap-6">
            <span className="flex items-center gap-1">
              <ShieldCheck size={16} /> SSL Secured
            </span>
            <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-gray-900 transition-colors cursor-pointer">
              Privacy
            </button>
            <button onClick={() => setIsTermsOpen(true)} className="hover:text-gray-900 transition-colors cursor-pointer">
              Terms
            </button>
            <button onClick={() => setIsRefundOpen(true)} className="hover:text-gray-900 transition-colors cursor-pointer">
              Refund Policy
            </button>
            <Link href="/contact" className="hover:text-gray-900 transition-colors text-gray-600">
              Contact
            </Link>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.link/hc7cmh"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-[9999] flex items-center justify-center rounded-full shadow-[0_4px_20px_rgba(37,99,235,0.4)] hover:shadow-[0_4px_28px_rgba(37,99,235,0.6)] hover:scale-110 active:scale-95 transition-all duration-200"
        style={{ width: '56px', height: '56px', background: '#25D366' }}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
