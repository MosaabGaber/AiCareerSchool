'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  { name: "أحمد عبد الرحمن", rating: 5, text: "الكورس مفيد جداً و عملي. استخدمت الأدوات في شغلي و فعلاً وفرت وقت. الشرح واضح و مباشر. ينفع لأي حد حتى لو مش من المجال." },
  { name: "مريم حسين", rating: 4.5, text: "كورس حلو و منظم. كنت خايفة يبقى اصعب بس طلع سهل و مفهوم. عملت لوجو و تصميمات لمشروعي الصغير." },
  { name: "ياسمين محمد", rating: 5, text: "استفدت من الكورس في شغلي على السوشيال ميديا. بقيت اعمل صور و محتوى أحسن للبيدج بتاعتي. الشرح واضح و سهل التطبيق. سعر الكورس معقول." },
  { name: "يوسف منصور", rating: 5, text: "انا عندي Local brand و كنت بصرف على المصورين و الموديلز و المحتوى كل شهر مبالغ كبيرة. بعد الكورس بقيت اعمل كل الكونتنت بنفسي - صور المنتجات، فيديوهات UGC، حتى الموديلز بستخدم AI avatars. وفرت ميزانية ضخمة و بستخدمها دلوقتي في الإعلانات الممولة." },
  { name: "كريم نبيل", rating: 4.2, text: "كورس عملي و مفيد. الأمثلة واقعية و قابلة للتطبيق. بدأت استخدم الأدوات دي في الفريلانسينج و الحمد لله بجيب شغل. يستاهل السعر بتاعه." },
  { name: "نوف المطيري", rating: 5, text: "دورة مرتبة وفيها معلومات مفيدة. استفدت من جزء التسويق والمحتوى البصري. بديت أقدم خدمات وماشي الحال الحمدلله." },
  { name: "محمود رضا", rating: 4.5, text: "انا سمسار عقارات و كنت بدفع فلوس كتير لمصورين و مصممين. دلوقتي بعمل الصور و الفيديوهات للوحدات بنفسي بالذكاء الاصطناعي. العملاء بيتفاعلوا مع البوستات أكتر و المبيعات اتحسنت." },
  { name: "سارة ابراهيم", rating: 5, text: "خلصت الكورس من شهرين و جبت أول كلاينت ليا بعدها بأسبوع. لحد دلوقتي جبت كلاينتين ب 20 ألف جنيه الحمدالله. مكنتش متخيلة اني هبدأ أكسب بالسرعة دي." },
  { name: "ندى حسن", rating: 5, text: "كان عندي صفحة صغيرة على الانستجرام بس المحتوى كان عادي. بعد الكورس بقيت اعمل صور و فيديوهات UGC و الصفحة كبرت. اتواصلت معايا براند مصري و عملنا أول تعاون مدفوع الشهر اللي فات." }
];

// Duplicate for infinite scroll effect
const doubleReviews = [...reviews, ...reviews];

export function ReviewsCarousel() {
  return (
    <section id="reviews" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-outfit font-bold text-white mb-4">
          Trusted by <span className="text-softcyan glow-text">1,200+</span> students
        </h2>
        <div className="flex justify-center gap-1 text-neongreen mb-4">
          {[1,2,3,4,5].map(i => <Star key={i} fill="currentColor" size={24} />)}
        </div>
        <p className="text-gray-400">Average rating of 4.9/5 stars across all graduates</p>
      </div>

      <div className="relative w-full flex overflow-x-hidden">
        {/* Left/Right fading gradients — desktop only */}
        <div className="hidden md:block absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-darkspace to-transparent z-20" />
        <div className="hidden md:block absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-darkspace to-transparent z-20" />
        
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
          {doubleReviews.map((review, i) => (
            <div 
              key={i} 
              dir="rtl"
              className="w-[85vw] md:w-[350px] shrink-0 glassmorphism p-[1.2rem] md:p-8 rounded-2xl border border-white/5 flex flex-col"
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1 text-neongreen">
                  {[1,2,3,4,5].map(star => (
                    <Star 
                      key={star} 
                      size={16} 
                      className={star <= Math.round(review.rating) ? "fill-current" : "text-gray-600 opacity-30"} 
                    />
                  ))}
                </div>
                <span className="text-white font-bold text-sm mx-2">{review.rating}</span>
              </div>
              <p className="text-gray-300 font-inter text-[0.85rem] md:text-lg italic mb-6 grow leading-relaxed">"{review.text}"</p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-gray-600 flex items-center justify-center text-white font-bold text-xl">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-bold font-outfit text-[0.9rem] md:text-lg">{review.name}</h4>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
