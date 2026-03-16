import { BookOpen, Sparkles, Wand2, Video } from 'lucide-react';

const phases = [
  {
    icon: <BookOpen className="text-neongreen" size={32} />,
    title: "Phase 1: AI Foundations & Understanding",
    arabicTitle: "المرحلة الأولى: أساسيات الذكاء الاصطناعي والفهم",
    description: "Understand how AI image and video generation works, the difference between models, and core concepts like prompts, parameters, and quality settings."
  },
  {
    icon: <Sparkles className="text-softcyan" size={32} />,
    title: "Phase 2: Mastering Image Prompts",
    arabicTitle: "المرحلة الثانية: إتقان كتابة البرومبتات للصور",
    description: "Learn professional prompt engineering techniques to create photorealistic images, control composition, lighting, and style across different AI platforms."
  },
  {
    icon: <Wand2 className="text-[#a855f7]" size={32} />,
    title: "Phase 3: Advanced Image Generation",
    arabicTitle: "المرحلة الثالثة: أدوات توليد الصور المتقدمة",
    description: "Master creating images for product photography, brand visuals, and commercial-grade imagery."
  },
  {
    icon: <BookOpen className="text-[#f43f5e]" size={32} />,
    title: "Phase 4: Brand Identity & Visual Systems",
    arabicTitle: "المرحلة الرابعة: الهوية البصرية والأنظمة التصميمية",
    description: "Build complete brand identities including logos, color palettes, patterns, and visual guidelines using AI-powered design tools."
  },
  {
    icon: <Video className="text-neongreen" size={32} />,
    title: "Phase 5: Video Generation Fundamentals",
    arabicTitle: "المرحلة الخامسة: أساسيات توليد الفيديو",
    description: "Understand AI video generation models, frame-to-frame consistency, camera movements, and how to create cinematic motion from text and images."
  },
  {
    icon: <Sparkles className="text-softcyan" size={32} />,
    title: "Phase 6: Intro to Creating Professional Video Content",
    arabicTitle: "المرحلة السادسة: إنشاء محتوى فيديو احترافي",
    description: "Generate commercial-quality videos for ads, social media, and brand storytelling."
  },
  {
    icon: <Video className="text-[#a855f7]" size={32} />,
    title: "Phase 7: Professional Video Ads & Commercials",
    arabicTitle: "المرحلة السابعة: إعلانات وكوميرشيالات الفيديو الاحترافية",
    description: "Create luxury brand-level video commercials with cinematic sequences, product reveals, and visual storytelling that match big studio production quality."
  },
  {
    icon: <Wand2 className="text-[#f43f5e]" size={32} />,
    title: "Phase 8: UGC / Influencers & Character Consistency",
    arabicTitle: "المرحلة الثامنة: ثبات الشخصيات والأفاتار",
    description: "Create consistent AI characters, realistic avatars, and clone yourself for UGC-style content without hiring actors or models."
  },
  {
    icon: <Sparkles className="text-neongreen" size={32} />,
    title: "Phase 9: Social Media Content Creation",
    arabicTitle: "المرحلة التاسعة: إنشاء محتوى السوشيال ميديا",
    description: "Create scroll-stopping images and videos optimized for Instagram, TikTok, Facebook, and other platforms to boost engagement and sales."
  },
  {
    icon: <BookOpen className="text-softcyan" size={32} />,
    title: "Phase 10: Getting Clients & Applications",
    arabicTitle: "المرحلة العاشرة: التطبيقات التجارية والعمل مع العملاء",
    description: "Package your skills for freelancing, deliver client projects professionally, and create portfolios that land high-paying AI content creation gigs."
  }
];

export function CoursePhases() {
  return (
    <section id="curriculum" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-outfit font-bold text-white mb-4">
            The <span className="text-neongreen glow-text">Curriculum</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-inter">
            A step-by-step roadmap to go from absolute beginner to professional AI visual artist.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"></div>

        {phases.map((phase, i) => (
          <div
            key={i}
            className="glassmorphism p-8 rounded-2xl relative group overflow-hidden transition-all duration-300 hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(0,71,255,0.15)]"
          >
            {/* Hover glow effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

            <div className="mb-6 w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-blue-500/30 transition-colors">
              {phase.icon}
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-outfit leading-tight">{phase.title}</h3>
            <h4 className="text-base font-bold text-gray-300 mb-4 font-outfit" dir="rtl">{phase.arabicTitle}</h4>
            <p className="text-gray-400 font-inter text-sm leading-relaxed">
              {phase.description}
            </p>

            <div className="mt-6 flex items-center text-sm font-semibold text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
              Explore Phase <span className="ml-2">→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
    </section >
  );
}
