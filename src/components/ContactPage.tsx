import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowLeft } from 'lucide-react';

export function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative z-10 pt-32">
      <div
        className="max-w-md w-full p-8 sm:p-10 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden group"
        style={{
          background: 'rgba(20, 25, 45, 0.45)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)',
        }}
      >
        <Link
          to="/"
          className="inline-flex items-center text-sm font-medium text-white/50 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Main
        </Link>

        <h1 className="text-3xl sm:text-4xl font-outfit font-bold text-white mb-8 tracking-tight leading-tight">
          Contact Us <span className="text-white/30 mx-2">/</span><br />
          <span className="text-3xl text-white/90">تواصل معنا</span>
        </h1>

        <div className="space-y-4">
          {/* Email */}
          <a
            href="mailto:theaicareerschoo@gmail.com"
            className="flex items-center gap-5 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group/item"
          >
            <div className="w-12 h-12 shrink-0 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover/item:scale-110 group-hover/item:bg-blue-500/30 transition-all duration-300">
              <Mail className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-white/50 mb-0.5 font-medium uppercase tracking-wider">Email</p>
              <p className="font-medium text-white/90 truncate">theaicareerschoo@gmail.com</p>
            </div>
          </a>

          {/* Phone */}
          <a
            href="tel:+201065716446"
            className="flex items-center gap-5 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group/item"
          >
            <div className="w-12 h-12 shrink-0 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 group-hover/item:scale-110 group-hover/item:bg-green-500/30 transition-all duration-300">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-white/50 mb-0.5 font-medium uppercase tracking-wider">Phone</p>
              <p className="font-medium text-white/90" dir="ltr">+20 1065716446</p>
            </div>
          </a>

          {/* Address */}
          <div className="flex items-start gap-5 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group/item">
            <div className="w-12 h-12 shrink-0 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover/item:scale-110 group-hover/item:bg-purple-500/30 transition-all duration-300">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-white/50 mb-0.5 font-medium uppercase tracking-wider">Address</p>
              <p className="font-medium text-white/90 leading-relaxed text-sm" dir="rtl">شارع المشروع السويسري- الحي العاشر، مدينة نصر أول - القاهرة</p>
            </div>
          </div>
        </div>

        {/* Decorative glows inside the card */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
      </div>
    </div>
  );
}
