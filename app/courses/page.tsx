'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, RefreshCw, Infinity as InfinityIcon, Award, Search, CheckCircle, ChevronLeft, Star } from 'lucide-react';
import { Footer } from '../../src/components/Footer';

const COURSES = [
  {
    id: 1,
    title: 'صناعة المحتوى بالذكاء الاصطناعي',
    subtitle: 'صور، فيديوهات، إعلانات، UGC، براندينج',
    description: 'إتعلم تعمل محتوى بصري احترافي بالذكاء الاصطناعي من الصفر. صور، فيديوهات، إعلانات ممولة، وأكتر.',
    price: 1200,
    priceStr: '1,200 EGP',
    status: 'available',
    link: '/v2',
    categories: ['تصميم', 'Video Creation', 'Marketing', 'Media Buying'],
    level: 'مبتدئ',
    badge: 'متاح الآن',
    badgeColor: 'bg-[#00944d]',
    thumbnailText: 'AI Content Creation',
    date: '2023-01-01',
    rating: 5,
    sales: 1200
  },
  {
    id: 2,
    title: 'الذكاء الاصطناعي للعقارات والتصميم الداخلي',
    subtitle: 'صور عقارية، جولات افتراضية، فيديوهات تسويقية',
    description: 'حوّل عقاراتك ومشاريعك لمحتوى بصري احترافي بالذكاء الاصطناعي بدون مصور أو مصمم.',
    price: 1500,
    priceStr: '1,500 EGP',
    status: 'available',
    link: '/real-estate',
    categories: ['عقارات', 'تصميم'],
    level: 'محترف',
    badge: 'متاح الآن',
    badgeColor: 'bg-[#00944d]',
    thumbnailText: 'AI for Real Estate',
    date: '2023-02-01',
    rating: 4.8,
    sales: 800
  },
  {
    id: 3,
    title: 'الأتمتة بالذكاء الاصطناعي',
    subtitle: 'أتمتة المهام، الـ workflows، وتوفير الوقت',
    description: 'إتعلم تأتمت شغلك بالكامل بالذكاء الاصطناعي وتوفر ساعات من العمل اليومي.',
    price: 0,
    priceStr: '---',
    status: 'coming_soon',
    link: '#',
    categories: ['أتمتة'],
    level: 'كل المستويات',
    badge: 'قريباً',
    badgeColor: 'bg-amber-500',
    thumbnailText: 'AI Automation',
    date: '2024-01-01',
    rating: 0,
    sales: 0
  },
  {
    id: 4,
    title: 'الذكاء الاصطناعي العام — كن في المقدمة دايماً',
    subtitle: 'كل جديد في عالم AI في مكان واحد',
    description: 'كورس شامل يغطي كل أدوات وتطورات الذكاء الاصطناعي عشان تفضل دايماً متقدم على الكل.',
    price: 0,
    priceStr: '---',
    status: 'coming_soon',
    link: '#',
    categories: ['Web Development', 'Marketing'],
    level: 'كل المستويات',
    badge: 'قريباً',
    badgeColor: 'bg-amber-500',
    thumbnailText: 'General AI',
    date: '2024-02-01',
    rating: 0,
    sales: 0
  }
];

const REVIEWS = [
  { name: 'سارة ابراهيم', rating: 5, text: 'خلصت الكورس من شهرين و جبت أول كلاينت ليا بعدها بأسبوع. لحد دلوقتي جبت كلاينتين ب 20 ألف جنيه الحمدالله.' },
  { name: 'محمود رضا', rating: 4.5, text: 'انا سمسار عقارات و كنت بدفع فلوس كتير لمصورين و مصممين. دلوقتي بعمل الصور و الفيديوهات للوحدات بنفسي بالذكاء الاصطناعي. المبيعات اتحسنت.' },
  { name: 'يوسف منصور', rating: 5, text: 'وفرت ميزانية ضخمة كنت بصرفها على المصورين والمصممين. دلوقتي بعمل كل الكونتنت بنفسي وبستخدم الفلوس دي في الإعلانات الممولة.' },
  { name: 'ياسمين محمد', rating: 5, text: 'استفدت من الكورس في شغلي على السوشيال ميديا. بقيت اعمل صور و محتوى أحسن للبيدج بتاعتي. الشرح واضح و سهل التطبيق.' },
  { name: 'كريم نبيل', rating: 4.2, text: 'كورس عملي و مفيد. الأمثلة واقعية و قابلة للتطبيق. بدأت استخدم الأدوات دي في الفريلانسينج و الحمد لله بجيب شغل.' },
  { name: 'نورهان مصطفى', rating: 5, text: 'بعد الكورس بقيت اعمل كل الموودبوردز والفيجوالز بنفسي. وفرت أكتر من 5000 جنيه في الشهر وبقيت أسرع في تسليم المشاريع.' }
];

const DIFFERENTIATORS = [
  { icon: Globe, title: 'محتوى عربي 100%', description: 'كل الشرح والأمثلة بالعربي عشان تفهم أسرع وتطبق أسرع' },
  { icon: RefreshCw, title: 'بيتحدث كل 3-5 أيام', description: 'مش هتلاقي كورس تاني بيتحدث بالسرعة دي — دايماً أحدث أدوات في إيدك' },
  { icon: InfinityIcon, title: 'وصول مدى الحياة', description: 'ادفع مرة واحدة وارجع للكورس في أي وقت تحب' },
  { icon: Award, title: 'شهادة إتمام معتمدة', description: 'بتاخد شهادة إتمام تقدر تضيفها على LinkedIn وبورتفوليو' }
];

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [selectedLevel, setSelectedLevel] = useState('كل المستويات');
  const [selectedPrice, setSelectedPrice] = useState('كل الأسعار');
  const [selectedSort, setSelectedSort] = useState('الأحدث');

  const [studentCount, setStudentCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [notification, setNotification] = useState<string | null>(null);
  const [enrolledCourse, setEnrolledCourse] = useState<string | null>(null);

  useEffect(() => {
    const course = localStorage.getItem('enrolled_course');
    if (course) setEnrolledCourse(course);
  }, []);

  useEffect(() => {
    setStudentCount(Math.floor(Math.random() * (35 - 18 + 1) + 18));
    const interval = setInterval(() => {
      setStudentCount(prev => {
        const diff = Math.floor(Math.random() * 3) + 1;
        const add = Math.random() > 0.5;
        let next = add ? prev + diff : prev - diff;
        if (next < 15) next = 15;
        if (next > 45) next = 45;
        return next;
      });
    }, Math.floor(Math.random() * (15000 - 8000 + 1) + 8000));
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const targetDate = new Date('2026-06-01T23:59:59+02:00').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const messages = [
      'طالب من القاهرة اشترك منذ 3 دقايق',
      'طالب من الإسكندرية اشترك منذ 7 دقايق',
      'طالب من الرياض اشترك منذ 12 دقيقة',
      'طالب من دبي اشترك منذ 5 دقايق',
      'طالب من جدة اشترك منذ 15 دقيقة',
      'طالب من عمان اشترك منذ 20 دقيقة',
      'طالب من الكويت اشترك منذ 8 دقايق',
      'طالب من المنصورة اشترك منذ 11 دقيقة'
    ];
    let timeout: NodeJS.Timeout;
    
    const triggerNotification = () => {
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      setNotification(randomMsg);
      setTimeout(() => setNotification(null), 4000);
      const nextDelay = Math.floor(Math.random() * (45000 - 30000 + 1) + 30000);
      timeout = setTimeout(triggerNotification, nextDelay);
    };

    timeout = setTimeout(triggerNotification, 15000);
    return () => clearTimeout(timeout);
  }, []);

  const filteredCourses = COURSES.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === 'الكل' || c.categories.includes(selectedCategory);
    const matchLevel = selectedLevel === 'كل المستويات' || c.level === selectedLevel;
    const matchPrice = selectedPrice === 'كل الأسعار' 
      ? true 
      : selectedPrice === 'أقل من 1000 EGP' 
        ? c.price < 1000 
        : selectedPrice === '1000-2000 EGP' 
          ? c.price >= 1000 && c.price <= 2000
          : c.price > 2000;
    
    return matchSearch && matchCategory && matchLevel && matchPrice;
  }).sort((a, b) => {
    if (selectedSort === 'الأحدث') return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (selectedSort === 'الأعلى تقييماً') return b.rating - a.rating;
    if (selectedSort === 'الأكثر مبيعاً') return b.sales - a.sales;
    return 0;
  });

  return (
    <>
      <main className="min-h-screen bg-white flex flex-col items-center pb-20 pt-24 px-4 md:px-8 relative z-10 selection:bg-blue-600 selection:text-white">
        
        {enrolledCourse && (
          <div className="w-full max-w-6xl mx-auto mb-8 bg-[#eff6ff] rounded-xl border border-blue-200 py-4 px-6 flex flex-col sm:flex-row items-center justify-between shadow-sm" dir="rtl">
            <span className="text-blue-800 font-bold font-outfit text-lg">أهلاً بعودتك! كمّل مشوارك في التعلم 👋</span>
            <Link href={enrolledCourse.startsWith('/') ? enrolledCourse : '/v2'} className="mt-3 sm:mt-0 bg-[#2563eb] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#1d4ed8] transition-colors">
              اكمل الكورس
            </Link>
          </div>
        )}

        {/* 1. Breadcrumb */}
        <div className="w-full max-w-[1000px] mx-auto flex items-center gap-2 text-sm text-gray-500 mb-6" dir="rtl">
          <Link href="/" className="hover:text-[#2563eb] transition-colors font-outfit">الرئيسية</Link>
          <ChevronLeft size={14} />
          <span className="text-gray-900 font-semibold font-outfit">الكورسات</span>
        </div>

        {/* 2. Search and Filters */}
        <div className="w-full max-w-[1000px] mx-auto mb-16 flex flex-col gap-6" dir="rtl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
            <h2 className="text-2xl font-outfit font-bold text-[#0f172a]">تصفح الكورسات</h2>
            <div className="flex items-center gap-2 bg-[#eff6ff] border border-blue-100 px-4 py-2 rounded-full shadow-sm">
              <div className="w-2.5 h-2.5 bg-[#00944d] rounded-full animate-pulse"></div>
              <span className="text-[#0f172a] font-semibold text-sm font-outfit">{studentCount} طالب بيتفرجوا دلوقتي</span>
            </div>
          </div>

          <div className="relative w-full">
            <input 
              type="text" 
              placeholder="ابحث عن كورس..." 
              className="w-full bg-white border border-gray-200 rounded-xl py-3 pr-12 pl-4 outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all shadow-sm"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>

          <div className="flex flex-wrap gap-2">
            {['الكل', 'تصميم', 'عقارات', 'أتمتة', 'Media Buying', 'Video Creation', 'Marketing', 'Web Development'].map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${selectedCategory === cat ? 'bg-[#2563eb] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <select className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-[#2563eb] shadow-sm" value={selectedLevel} onChange={e => setSelectedLevel(e.target.value)}>
              {['كل المستويات', 'مبتدئ', 'محترف'].map(l => <option key={l} value={l}>{l}</option>)}
            </select>
            <select className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-[#2563eb] shadow-sm" value={selectedPrice} onChange={e => setSelectedPrice(e.target.value)}>
              {['كل الأسعار', 'أقل من 1000 EGP', '1000-2000 EGP', 'أكتر من 2000 EGP'].map(l => <option key={l} value={l}>{l}</option>)}
            </select>
            <select className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-[#2563eb] shadow-sm" value={selectedSort} onChange={e => setSelectedSort(e.target.value)}>
              {['الأحدث', 'الأعلى تقييماً', 'الأكثر مبيعاً'].map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>

        {/* 3. Header Section (headline, subtitle, stats bar) */}
        <div className="w-full max-w-6xl mx-auto text-center mb-16 flex flex-col items-center">
          <div className="bg-darkspace rounded-3xl p-4 mb-8 shadow-sm">
            <img src="/logo.png" alt="AI Career School" className="w-20 md:w-28 h-auto" />
          </div>
          
          <h1 className="text-[2.2rem] md:text-[4rem] font-outfit font-extrabold text-[#0f172a] leading-tight mb-6 tracking-tight" dir="rtl">
            أقوى منصة عربية لتعلم الذكاء الاصطناعي
          </h1>
          
          <h2 className="text-[1.2rem] md:text-[1.6rem] font-outfit font-medium text-gray-600 mb-4 max-w-3xl leading-relaxed" dir="rtl">
            كن دايماً متقدم على الكل — تعلم أحدث أدوات AI وطبقها في شغلك فوراً
          </h2>
          
          <p className="text-gray-500 font-inter text-sm md:text-base tracking-[0.2em] uppercase mt-2 mb-10 font-semibold">
            The #1 Arabic AI Learning Platform
          </p>

          <div className="w-full bg-[#eff6ff] rounded-2xl max-w-6xl mx-auto py-12 px-8 flex flex-col items-center shadow-sm border border-blue-100">
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 mb-6" dir="rtl">
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-outfit font-extrabold text-[#1d4ed8] mb-2">+1,200</span>
                <span className="text-gray-600 text-sm font-outfit font-semibold tracking-wide">طالب</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-outfit font-extrabold text-[#1d4ed8] mb-2">4.9/5</span>
                <span className="text-gray-600 text-sm font-outfit font-semibold tracking-wide">تقييم</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-outfit font-extrabold text-[#1d4ed8] mb-2">+10</span>
                <span className="text-gray-600 text-sm font-outfit font-semibold tracking-wide">أدوات AI</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-outfit font-extrabold text-[#1d4ed8] mb-2">4</span>
                <span className="text-gray-600 text-sm font-outfit font-semibold tracking-wide">كورسات متخصصة</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm font-outfit font-medium tracking-wide px-4 text-center mt-2" dir="rtl">
              بيتحدث كل 3-5 أيام بأحدث الأدوات
            </p>
          </div>
        </div>

        {/* 4. Courses Grid */}
        <motion.div layout className="w-full max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-24" dir="rtl">
          <AnimatePresence>
            {filteredCourses.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className="col-span-1 md:col-span-2 text-center py-12 text-gray-500 font-outfit"
              >
                لم يتم العثور على كورسات تطابق بحثك.
              </motion.div>
            ) : (
              filteredCourses.map(course => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  key={course.id}
                  className={`bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col group relative ${course.status === 'coming_soon' ? 'opacity-90' : ''}`}
                >
                  
                  <div className={`h-56 flex flex-col items-center justify-center border-b border-gray-100 relative overflow-hidden ${course.status === 'coming_soon' ? 'bg-gray-50' : 'bg-[#eff6ff]'}`}>
                    <span className={`font-outfit font-bold text-xl md:text-2xl relative z-10 tracking-wide uppercase ${course.status === 'coming_soon' ? 'text-gray-400' : 'text-[#1e3a5f]'}`}>
                      {course.thumbnailText}
                    </span>
                    <div className={`absolute top-4 right-4 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide z-10 ${course.badgeColor}`}>
                      {course.badge}
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-grow relative z-10">
                    <h3 className={`text-[1.4rem] font-outfit font-bold mb-2 leading-snug ${course.status === 'coming_soon' ? 'text-gray-500' : 'text-[#0f172a]'}`}>
                      {course.title}
                    </h3>
                    <p className={`text-sm font-semibold mb-5 tracking-wide ${course.status === 'coming_soon' ? 'text-amber-600' : 'text-[#2563eb]'}`}>
                      {course.subtitle}
                    </p>
                    <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed font-inter">
                      {course.description}
                    </p>

                    {course.status === 'available' && (
                      <div className="bg-[#eff6ff] rounded-xl p-3 mt-2 mb-6 flex flex-col items-center border border-blue-100">
                        <span className="text-xs text-[#2563eb] font-bold mb-2">ينتهي العرض خلال</span>
                        <div className="flex items-center justify-center gap-3 text-[#0f172a] font-bold font-outfit text-sm">
                          <div className="flex flex-col items-center">
                            <span>{timeLeft.days}</span>
                            <span className="text-[0.6rem] text-gray-500 font-normal">أيام</span>
                          </div>
                          <span>:</span>
                          <div className="flex flex-col items-center">
                            <span>{timeLeft.hours.toString().padStart(2, '0')}</span>
                            <span className="text-[0.6rem] text-gray-500 font-normal">ساعات</span>
                          </div>
                          <span>:</span>
                          <div className="flex flex-col items-center">
                            <span>{timeLeft.minutes.toString().padStart(2, '0')}</span>
                            <span className="text-[0.6rem] text-gray-500 font-normal">دقائق</span>
                          </div>
                          <span>:</span>
                          <div className="flex flex-col items-center">
                            <span>{timeLeft.seconds.toString().padStart(2, '0')}</span>
                            <span className="text-[0.6rem] text-gray-500 font-normal">ثواني</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
                      <span className={`text-2xl font-bold font-outfit tracking-tight ${course.status === 'coming_soon' ? 'text-gray-400' : 'text-[#0f172a]'}`}>
                        {course.priceStr}
                      </span>
                      {course.status === 'available' ? (
                        <Link href={course.link} className="bg-[#2563eb] text-white px-6 md:px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-[#1d4ed8] transition-all duration-300">
                          اشترك الآن
                        </Link>
                      ) : (
                        <button disabled className="bg-gray-200 text-gray-500 px-6 md:px-8 py-2.5 rounded-xl text-sm font-bold cursor-not-allowed">
                          قريباً
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {/* 5. Student Reviews Carousel */}
        <div className="w-full max-w-full overflow-hidden mb-20">
          <h2 className="text-3xl font-outfit font-bold text-[#0f172a] mb-8 text-center" dir="rtl">آراء طلابنا</h2>
          
          <div className="relative w-full flex overflow-x-hidden group pb-8 pt-4">
            <div className="hidden md:block absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
            <div className="hidden md:block absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

            <motion.div
              className="flex gap-6 px-6"
              animate={{ x: [0, -1920] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {[...REVIEWS, ...REVIEWS].map((review, i) => (
                <div key={i} className="w-[300px] md:w-[350px] shrink-0 bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col" dir="rtl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-outfit font-bold text-[#0f172a] text-lg">{review.name}</span>
                    <div className="flex items-center gap-1 text-amber-500">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star key={star} size={14} className={star <= Math.floor(review.rating) ? "fill-current text-amber-500" : "text-gray-300"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-[0.95rem] leading-relaxed font-inter italic">"{review.text}"</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* 6. 'ليه AI Career School؟' section */}
        <div className="w-full max-w-6xl mx-auto mb-16 px-4">
          <h2 className="text-3xl font-outfit font-bold text-[#0f172a] mb-8 text-center" dir="rtl">ليه AI Career School؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" dir="rtl">
            {DIFFERENTIATORS.map((feature, idx) => (
              <div key={idx} className="bg-white border border-[#2563eb]/20 rounded-2xl shadow-sm p-6 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="bg-[#eff6ff] p-3 rounded-xl text-[#2563eb] shrink-0">
                  <feature.icon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0f172a] mb-2 font-outfit">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: 50, x: -50 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: 50, x: -50 }}
              className="fixed bottom-24 left-6 z-50 bg-white border border-gray-100 rounded-xl shadow-lg p-4 flex items-center gap-3"
              dir="rtl"
            >
              <CheckCircle className="text-[#00944d]" size={24} />
              <span className="text-gray-800 font-inter text-sm font-semibold">{notification}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.link/hc7cmh"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.3)] hover:shadow-[0_4px_28px_rgba(37,211,102,0.6)] hover:scale-110 active:scale-95 transition-all duration-200"
          style={{ width: '56px', height: '56px', background: '#25D366' }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
          </svg>
        </a>

      </main>

      {/* 7. Footer */}
      <Footer />
    </>
  );
}
