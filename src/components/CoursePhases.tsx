'use client';

import { useState } from 'react';
import { ChevronDown, Clock, Infinity, Award } from 'lucide-react';

const phases = [
  {
    title: "Phase 1: AI Foundations & Understanding",
    arabicTitle: "المرحلة الأولى: أساسيات الذكاء الاصطناعي والفهم",
    description: "Understand how AI image and video generation works, the difference between models, and core concepts like prompts, parameters, and quality settings."
  },
  {
    title: "Phase 2: Mastering Image Prompts",
    arabicTitle: "المرحلة الثانية: إتقان كتابة البرومبتات للصور",
    description: "Learn professional prompt engineering techniques to create photorealistic images, control composition, lighting, and style across different AI platforms."
  },
  {
    title: "Phase 3: Advanced Image Generation",
    arabicTitle: "المرحلة الثالثة: أدوات توليد الصور المتقدمة",
    description: "Master creating images for product photography, brand visuals, and commercial-grade imagery."
  },
  {
    title: "Phase 4: Brand Identity & Visual Systems",
    arabicTitle: "المرحلة الرابعة: الهوية البصرية والأنظمة التصميمية",
    description: "Build complete brand identities including logos, color palettes, patterns, and visual guidelines using AI-powered design tools."
  },
  {
    title: "Phase 5: Video Generation Fundamentals",
    arabicTitle: "المرحلة الخامسة: أساسيات توليد الفيديو",
    description: "Understand AI video generation models, frame-to-frame consistency, camera movements, and how to create cinematic motion from text and images."
  },
  {
    title: "Phase 6: Intro to Creating Professional Video Content",
    arabicTitle: "المرحلة السادسة: إنشاء محتوى فيديو احترافي",
    description: "Generate commercial-quality videos for ads, social media, and brand storytelling."
  },
  {
    title: "Phase 7: Professional Video Ads & Commercials",
    arabicTitle: "المرحلة السابعة: إعلانات وكوميرشيالات الفيديو الاحترافية",
    description: "Create luxury brand-level video commercials with cinematic sequences, product reveals, and visual storytelling that match big studio production quality."
  },
  {
    title: "Phase 8: UGC / Influencers & Character Consistency",
    arabicTitle: "المرحلة الثامنة: ثبات الشخصيات والأفاتار",
    description: "Create consistent AI characters, realistic avatars, and clone yourself for UGC-style content without hiring actors or models."
  },
  {
    title: "Phase 9: Social Media Content Creation",
    arabicTitle: "المرحلة التاسعة: إنشاء محتوى السوشيال ميديا",
    description: "Create scroll-stopping images and videos optimized for Instagram, TikTok, Facebook, and other platforms to boost engagement and sales."
  },
  {
    title: "Phase 10: Getting Clients & Applications",
    arabicTitle: "المرحلة العاشرة: التطبيقات التجارية والعمل مع العملاء",
    description: "Package your skills for freelancing, deliver client projects professionally, and create portfolios that land high-paying AI content creation gigs."
  }
];

export function CoursePhases() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const togglePhase = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="curriculum" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-outfit font-bold text-white mb-4">
            The <span className="text-neongreen glow-text">Curriculum</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-inter mb-8">
            A step-by-step roadmap to go from absolute beginner to professional AI visual artist.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glassmorphism bg-white/5 border border-white/10" dir="rtl">
              <span className="text-white text-sm font-outfit">ساعات محتوى</span>
              <span className="text-white text-sm font-outfit" dir="ltr">9+</span>
              <Clock size={16} className="text-neongreen" />
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glassmorphism bg-white/5 border border-white/10">
              <Infinity size={16} className="text-neongreen" />
              <span className="text-white text-sm font-outfit italic">وصول مدى الحياة</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glassmorphism bg-white/5 border border-white/10">
              <Award size={16} className="text-neongreen" />
              <span className="text-white text-sm font-outfit">شهادة إتمام الدورة</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4" dir="rtl">
          {phases.map((phase, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="glassmorphism p-6 rounded-2xl relative group transition-all duration-300 hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(0,71,255,0.15)] cursor-pointer bg-white/5 border border-white/10"
                onClick={() => togglePhase(i)}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg md:text-xl font-bold text-white font-outfit leading-tight m-0 text-right">
                    {phase.arabicTitle}
                  </h3>
                  <div className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 bg-blue-500/20 border-blue-500/50' : ''}`}>
                    <ChevronDown className={`text-gray-300 transition-colors ${isOpen ? 'text-blue-400' : ''}`} size={24} />
                  </div>
                </div>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <h4 className="text-base font-bold text-[#1a9a46] mb-2 font-outfit text-left" dir="ltr">{phase.title}</h4>
                    <p className="text-gray-400 font-inter text-sm md:text-base leading-relaxed m-0 text-left" dir="ltr">
                      {phase.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
