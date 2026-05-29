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
    question: "هل الكورس مفيد لسماسرة العقارات والمصممين الداخليين؟",
    answer: "أيوه بالتأكيد. بتقدر تعمل صور احترافية للوحدات، فيديوهات جولات افتراضية، تصميمات داخلية بالذكاء الاصطناعي، وإعلانات ممولة جاهزة — كل ده بدون مصور أو مصمم."
  },

  {
    question: "الأدوات بتتغير بسرعة، الكورس ازاي بيتابع التطور؟",
    answer: "الكورس بيتحدث كل 3 لـ 5 أيام بأحدث الأدوات والتقنيات. اشتراكك بيضمنلك كل التحديثات المستقبلية."
  },
  {
    question: "الكورس مسجل ولا لايف؟",
    answer: "الكورس مسجل بالكامل وتقدر تتفرج عليه في أي وقت يناسبك. اشتراكك بيديك وصول مدى الحياة, يعني تقدر ترجعله في أي وقت."
  },
  {
    question: "هل في شهادة بعد الكورس؟",
    answer: "أيوه، بتاخد شهادة إتمام بعد ما تخلص الكورس تقدر تضيفها على LinkedIn أو البورتفوليو بتاعك."
  },
  {
    question: "إيه الأدوات اللي هنتعلمها في الكورس؟",
    answer: "سنستخدم مجموعة من الأدوات المجانية وأخرى توفر مزايا مدفوعة منها: Nanobanan, Veo, Kling, Higgsfield, Freepik, Weavy, Seedance, Canva, ElevenLabs, Heygen"
  }
];

export function FAQRealEstate() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-gray-900 mb-4" dir="rtl">
            أسئلة شائعة
          </h2>
        </div>

        <div className="flex flex-col gap-4" dir="rtl">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl relative group transition-all duration-300 hover:border-gray-300 hover:shadow-md cursor-pointer bg-white border border-gray-200 shadow-sm"
                onClick={() => toggleFAQ(i)}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 font-outfit leading-tight m-0 text-right">
                    {faq.question}
                  </h3>
                  <div className={`w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-200 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 bg-blue-50 border-blue-200' : ''}`}>
                    <ChevronDown className={`text-gray-400 transition-colors ${isOpen ? 'text-blue-500' : ''}`} size={24} />
                  </div>
                </div>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <p className="text-gray-600 font-inter text-base md:text-lg leading-relaxed m-0 text-right">
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
