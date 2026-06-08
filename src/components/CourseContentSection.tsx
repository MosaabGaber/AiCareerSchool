'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, PlayCircle } from 'lucide-react';

const COURSE_CONTENT = [
  {
    chapter: 'Introduction to Ai',
    lessons: [
      { title: 'Introduction to Course', duration: '23m', description: 'مقدمة سريعة بتشرح إيه اللي هتتعلمه في الكورس ده وإزاي هتستفاد منه' },
      { title: 'Lesson 1 - Intro To Image Creation & Prompt Engineering', duration: '25m', description: 'هتتعلم إزاي تفكر وتكتب برومبت صح عشان توصل للصورة اللي في دماغك' },
      { title: 'Lesson 2 - Prompt Engineering 2', duration: '57m', description: 'تعمق أكتر في تقنيات الـ prompt engineering وإزاي تتحكم في كل تفاصيل الصورة' },
      { title: 'Lesson 3 - Tools', duration: '18m', description: 'استعراض لأهم الأدوات اللي هنستخدمها في الكورس وإزاي تبدأ معاها' },
      { title: 'Lesson 4 - Creating Images & Campaigns', duration: '34m', description: 'هتعمل صور كاملة لحملات إعلانية احترافية من الصفر' },
      { title: 'Lesson 5 - Editing Images With AI', duration: '37m', description: 'هتتعلم تعدل على الصور بالذكاء الاصطناعي وتخلي أي صورة تبان احترافية' },
      { title: 'Lesson 6 - Recreating Campaigns', duration: '15m', description: 'هتتعلم إزاي تعيد إنتاج حملات إعلانية موجودة بأسلوبك الخاص' }
    ]
  },
  {
    chapter: 'Video and Ads Creation',
    lessons: [
      { title: 'Lesson 1 - Intro To Video Creation', duration: '8m', description: 'مقدمة سريعة على عالم الفيديو بالذكاء الاصطناعي وإيه الأدوات الأقوى' },
      { title: 'Lesson 2 - Creating Ads - Product Ads', duration: '40m', description: 'هتعمل إعلانات فيديو احترافية للمنتجات من صور ثابتة' },
      { title: 'Lesson 3 - Creating Ads Part 2 - Company Ads', duration: '14m', description: 'هتكمل وتعمل إعلانات فيديو للشركات والبراندات' },
      { title: 'Lesson 4 - Cloning Yourself and Motion Control', duration: '11m', description: 'هتتعلم إزاي تعمل كلون لنفسك وتتحكم في حركة الفيديو' }
    ]
  },
  {
    chapter: 'UGC & Influencers',
    lessons: [
      { title: 'Lesson 1 - Creating UGC Videos', duration: '23m', description: 'هتعمل فيديوهات UGC احترافية زي اللي بتشوفها على تيك توك وانستجرام' },
      { title: 'Lesson 2 - AI Influencer', duration: '1h 3m', description: 'هتتعلم إزاي تعمل مؤثر افتراضي بالكامل بالذكاء الاصطناعي' }
    ]
  },
  {
    chapter: 'Creating Commercials',
    lessons: [
      { title: 'Lesson 1 - Creating Full Commercials', duration: '1h 21m', description: 'هتعمل كوميرشيال كامل من الفكرة للتنفيذ بجودة عالية' }
    ]
  },
  {
    chapter: 'Cartoons',
    lessons: [
      { title: 'Cartoons Lesson 1', duration: '8m', description: 'هتتعلم إزاي تعمل محتوى كرتون بالذكاء الاصطناعي' }
    ]
  },
  {
    chapter: 'Real Estate videos',
    lessons: [
      { title: 'Lesson 1 - Real Estate Videos', duration: '39m', description: 'هتعمل فيديوهات عقارية احترافية تساعدك تبيع أو تسوق للوحدات بشكل مختلف' }
    ]
  },
  {
    chapter: 'Branding with Ai',
    lessons: [
      { title: 'Branding', duration: '21m', description: 'هتتعلم إزاي تبني هوية بصرية كاملة للبراند بالذكاء الاصطناعي' }
    ]
  },
  {
    chapter: 'Creating websites with ai',
    lessons: [
      { title: 'Lesson 1 - Creating a Website with AI', duration: '24m', description: 'هتعمل موقع إلكتروني احترافي بالكامل بالذكاء الاصطناعي من غير ما تكتب كود' },
      { title: 'Lesson 2 - Make a 3D Website', duration: '11m', description: 'هتتعلم إزاي تضيف عناصر ثلاثية الأبعاد على موقعك عشان يبان مختلف' }
    ]
  },
  {
    chapter: 'Media buying',
    lessons: [
      { title: 'Facebook & Instagram Ads', duration: '1.5hr', description: 'هتتعلم إزاي تشغل إعلانات ممولة على فيسبوك وانستجرام بالذكاء الاصطناعي' },
      { title: 'TikTok Ads', duration: '1hr', description: 'هتتعلم إزاي تشغل إعلانات على تيك توك وتوصل لأكبر عدد من العملاء' }
    ]
  }
];

export function CourseContentSection() {
  const [openChapter, setOpenChapter] = useState<number | null>(0);
  const [openLesson, setOpenLesson] = useState<{chapter: number, lesson: number} | null>(null);

  const toggleChapter = (index: number) => {
    setOpenChapter(openChapter === index ? null : index);
  };

  const toggleLesson = (chapterIndex: number, lessonIndex: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (openLesson?.chapter === chapterIndex && openLesson?.lesson === lessonIndex) {
      setOpenLesson(null);
    } else {
      setOpenLesson({ chapter: chapterIndex, lesson: lessonIndex });
    }
  };

  return (
    <section className="py-16 px-4 md:px-8 container mx-auto max-w-7xl relative z-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-outfit font-bold text-white tracking-tight mb-4" dir="rtl">
          محتوى <span className="text-neongreen">الكورس</span>
        </h2>
        <p className="text-gray-400 text-lg md:text-xl font-outfit" dir="rtl">
          نظرة سريعة على كل اللي هتتعلمه جوه الكورس
        </p>
      </div>

      <div 
        className="rounded-2xl border border-blue-500/30 p-4 md:p-6 lg:p-8"
        style={{
          backgroundColor: 'rgba(10, 15, 35, 0.8)',
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.15), 0 0 40px rgba(59, 130, 246, 0.08), inset 0 0 20px rgba(59, 130, 246, 0.05)'
        }}
      >
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Column - Video */}
          <div className="w-full lg:w-[60%] lg:sticky lg:top-24 z-20">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,255,157,0.15)] border border-white/10 bg-white/5 backdrop-blur-md">
              <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                <iframe
                  src="https://player.mediadelivery.net/embed/631325/71395d57-c96a-40fe-b62a-c2def1c653a6?autoplay=false&loop=false&muted=false&preload=true&responsive=true"
                  loading="lazy"
                  style={{ border: 0, position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}
                  allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
                  allowFullScreen={true}
                ></iframe>
              </div>
            </div>
          </div>

          {/* Right Column - Accordion */}
          <div className="w-full lg:w-[40%]">
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-3 md:p-4 lg:max-h-[600px] lg:overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-thumb]:bg-neongreen/50 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-neongreen/80 transition-colors">
              <div className="flex flex-col gap-2">
                {COURSE_CONTENT.map((chapter, chapterIdx) => (
                  <div 
                    key={chapterIdx} 
                    className="rounded-xl overflow-hidden bg-black/20 border border-white/5 transition-all duration-300"
                    dir="ltr"
                  >
                    <button
                      onClick={() => toggleChapter(chapterIdx)}
                      className="w-full flex items-center justify-between p-3 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-6 w-6 rounded-full bg-neongreen/10 text-neongreen items-center justify-center font-bold text-xs">
                          {chapterIdx + 1}
                        </div>
                        <h3 className="text-neongreen font-bold text-sm text-left">
                          {chapter.chapter}
                        </h3>
                      </div>
                      <div className="text-gray-400 shrink-0">
                        {openChapter === chapterIdx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </button>

                    <div 
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        openChapter === chapterIdx ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="p-2 pt-0 pb-3 flex flex-col gap-2">
                        {chapter.lessons.map((lesson, lessonIdx) => {
                          const isLessonOpen = openLesson?.chapter === chapterIdx && openLesson?.lesson === lessonIdx;
                          return (
                            <div 
                              key={lessonIdx}
                              className="rounded-lg overflow-hidden border border-white/5 bg-white/5 hover:border-white/10 transition-all cursor-pointer"
                              onClick={(e) => toggleLesson(chapterIdx, lessonIdx, e)}
                            >
                              <div className="p-2 flex items-start sm:items-center justify-between gap-3">
                                <div className="flex items-center gap-2 flex-1">
                                  <PlayCircle size={14} className="text-neongreen shrink-0 mt-0.5 sm:mt-0" />
                                  <span className="text-white text-xs font-medium">{lesson.title}</span>
                                </div>
                                <span className="text-gray-500 text-[10px] sm:text-xs shrink-0 font-mono mt-0.5 sm:mt-0">{lesson.duration}</span>
                              </div>
                              
                              <div 
                                className={`transition-all duration-300 ease-in-out bg-black/30 overflow-hidden ${
                                  isLessonOpen ? 'max-h-40 opacity-100 p-2' : 'max-h-0 opacity-0 px-2 py-0'
                                }`}
                                dir="rtl"
                              >
                                <p className="text-gray-400 text-xs">{lesson.description}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
