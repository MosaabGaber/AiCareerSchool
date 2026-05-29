'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  { name: "محمود رضا", rating: 5, text: "أنا سمسار في القاهرة الجديدة وكنت بدفع لمصور فريلانس كل ما عندي وحدة جديدة. دلوقتي بعمل صور احترافية للوحدات بالذكاء الاصطناعي في دقايق. العملاء بيقولولي الصور دي أحسن من اللي شايفينه عند غيرك." },
  { name: "كريم الشافعي", rating: 5, text: "أنا معماري وكنت بستخدم الرندر التقليدي اللي بياخد وقت وفلوس. دلوقتي بعمل فيجوالز للعملاء بالذكاء الاصطناعي في نص الوقت وبجودة أعلى. المشاريع بقت تتباع أسرع لأن العميل بيشوف الصورة النهائية من أول يوم." },
  { name: "نورهان مصطفى", rating: 5, text: "أنا مصممة داخلية وكنت بعتمد على شركات الرندر. بعد الكورس بقيت اعمل كل الموودبوردز والفيجوالز بنفسي. وفرت أكتر من 5000 جنيه في الشهر وبقيت أسرع في تسليم المشاريع." },
  { name: "أحمد سامي", rating: 4.5, text: "عندي شركة سيلز عقارية في الإسكندرية. الكورس غير طريقة تسويقنا خالص. دلوقتي بنعمل فيديوهات جولات افتراضية للوحدات بالذكاء الاصطناعي والانجيجمنت على السوشيال ميديا اتضاعف." },
  { name: "ريم خالد", rating: 5, text: "أنا مصممة خارجية وكنت بتعب في عرض أفكاري على العملاء. دلوقتي بعمل فيجوالز للواجهات والحدايق بالذكاء الاصطناعي وبعرضها في الاجتماع نفسه. العملاء بيوافقوا أسرع بكتير." },
  { name: "عمر حسني", rating: 4.5, text: "بدأت حديثاً في مجال العقارات وكنت مش قادر أنافس السماسرة الكبار في التسويق. بعد الكورس بقيت أعمل محتوى احترافي زي الشركات الكبيرة بالظبط. الكورس أسرع طريقة تفرق بيها عن غيرك في السوق." },
  { name: "منى إبراهيم", rating: 5, text: "أنا مديرة مشاريع في شركة تطوير عقاري. بقينا نستخدم الذكاء الاصطناعي في تصور المشاريع قبل ما تتبنى. العملاء بيشتروا على الخريطة أسرع لأنهم بيشوفوا النتيجة النهائية بوضوح." },
  { name: "يوسف طارق", rating: 5, text: "كنت باخد كورسات تصوير عقاري بمبالغ كبيرة. الكورس ده اقتصادي وعملي أكتر بكتير. دلوقتي بعمل صور فيلا كاملة في ساعة من غير ما أحتاج كاميرا أو مصور." },
  { name: "دينا عصام", rating: 4.8, text: "أنا عندي أوفيس تصميم داخلي في المعادي. الكورس غير أسلوب عملي كله. بقيت أعمل موكأب للشقق قبل التنفيذ وبعرضه للعميل. الموافقات بقت أسرع والمشاريع زادت الحمد لله." }
];

// Duplicate for infinite scroll effect
const doubleReviews = [...reviews, ...reviews];

export function ReviewsCarouselRealEstate() {
  return (
    <section id="reviews" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-outfit font-bold text-gray-900 mb-4">
          Trusted by <span className="text-[#00944d] glow-text">1,200+</span> students
        </h2>
        <div className="flex justify-center gap-1 text-[#00944d] mb-4">
          {[1, 2, 3, 4, 5].map(i => <Star key={i} fill="currentColor" size={24} />)}
        </div>
        <p className="text-gray-600">Average rating of 4.9/5 stars across all graduates</p>
      </div>

      <div className="relative w-full flex overflow-x-hidden">
        {/* Left/Right fading gradients — desktop only */}
        <div className="hidden md:block absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-20" />
        <div className="hidden md:block absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-20" />

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
              className="w-[85vw] md:w-[350px] shrink-0 bg-white p-[1.2rem] md:p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col"
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1 text-[#00944d]">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      size={16}
                      className={star <= Math.round(review.rating) ? "fill-current" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="text-gray-900 font-bold text-sm mx-2">{review.rating}</span>
              </div>
              <p className="text-gray-600 font-inter text-[0.85rem] md:text-lg italic mb-6 grow leading-relaxed">"{review.text}"</p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-700 font-bold text-xl">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-gray-900 font-bold font-outfit text-[0.9rem] md:text-lg">{review.name}</h4>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
