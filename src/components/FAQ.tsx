'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "هل الكورس بالعربي؟",
    answer: "أيوه، الكورس كله بالعربي 100%، شرح ومحتوى وأمثلة."
  },
  {
    question: "هل محتاج خبرة سابقة؟",
    answer: "لا خالص. بنبدأ من الصفر تماماً. الكورس مصمم لأي حد حتى لو عمره ما فتح أداة AI قبل كده."
  },

  {
    question: "الأدوات بتتغير بسرعة، الكورس ازاي بيتابع التطور؟",
    answer: "الكورس بيتحدث كل 3 لـ 5 أيام بأحدث الأدوات والتقنيات. اشتراكك بيضمنلك كل التحديثات المستقبلية."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-white mb-4" dir="rtl">
            أسئلة شائعة
          </h2>
        </div>

        <div className="flex flex-col gap-4" dir="rtl">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="glassmorphism p-6 rounded-2xl relative group transition-all duration-300 hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(0,71,255,0.15)] cursor-pointer bg-white/5 border border-white/10"
                onClick={() => toggleFAQ(i)}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl md:text-2xl font-bold text-white font-outfit leading-tight m-0 text-right">
                    {faq.question}
                  </h3>
                  <div className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 bg-blue-500/20 border-blue-500/50' : ''}`}>
                    <ChevronDown className={`text-gray-300 transition-colors ${isOpen ? 'text-blue-400' : ''}`} size={24} />
                  </div>
                </div>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <p className="text-gray-400 font-inter text-base md:text-lg leading-relaxed m-0 text-right">
                      {faq.answer}
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
