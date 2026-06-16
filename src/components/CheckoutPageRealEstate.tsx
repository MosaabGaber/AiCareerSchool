'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


import { InfoModal } from './InfoModal';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xgadpsudjrlgrvhofqkd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhnYWRwc3VkanJsZ3J2aG9mcWtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3MzM4MDIsImV4cCI6MjA5MDMwOTgwMn0.ZkjHb1XNa7Svt_sngzVT_uG7KFshoNAOpVV_D-xWJTA';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function CheckoutPageRealEstate() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isRefundOpen, setIsRefundOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'instapay' | 'vodafone'>('card');
  const [showPaymobIframe, setShowPaymobIframe] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const saveLead = async () => {
    try {
      if (!email && !phoneNumber) return;

      let query = supabase.from('leads').select('id');
      if (email && phoneNumber) {
        query = query.or(`email.eq.${email},phone_number.eq.${phoneNumber}`);
      } else if (email) {
        query = query.eq('email', email);
      } else if (phoneNumber) {
        query = query.eq('phone_number', phoneNumber);
      }

      const { data: existingLeads } = await query.limit(1);

      if (existingLeads && existingLeads.length > 0) {
        await supabase
          .from('leads')
          .update({ name: fullName, email, phone_number: phoneNumber, page: 'real-estate-checkout' })
          .eq('id', existingLeads[0].id);
      } else {
        await supabase
          .from('leads')
          .insert([{ name: fullName, email, phone_number: phoneNumber, page: 'real-estate-checkout' }]);
      }
    } catch (err) {
      console.error('Failed to auto-save lead:', err);
    }
  };

  const uploadScreenshot = async (file: File) => {
    setIsUploading(true);
    setUploadError('');
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${fullName.replace(/\s+/g, '_')}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from('payment-screenshots')
        .upload(fileName, file);
      if (error) throw error;
      (window as any).fbq?.('track', 'Purchase', { value: 1500, currency: 'EGP', content_name: 'Real Estate Course' });
      (window as any).ttq?.track('Purchase', { value: 1500, currency: 'EGP', content_type: 'product', content_id: 'ai-real-estate-course', content_name: 'AI for Real Estate Course' });
      await saveLead();
      setUploadSuccess(true);
    } catch (err: any) {
      setUploadError('حدث خطأ أثناء الرفع. حاول تاني.');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    if (paymentMethod === 'instapay' || paymentMethod === 'vodafone') return;

    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const { error } = await supabase
        .from('Enrollments')
        .insert([{ name: fullName, email, phone_number: phoneNumber }]);

      if (error) throw error;

      const response = await fetch('/api/create-intention', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fullName,
          email,
          amount: 150000,
        }),
      });

      const data = await response.json();

      if (data.client_secret) {
        setClientSecret(data.client_secret);
        setShowPaymobIframe(true);
        (window as any).fbq?.('track', 'Purchase', { value: 1500, currency: 'EGP', content_name: 'Real Estate Course' });
        (window as any).ttq?.track('InitiateCheckout', { value: 1500, currency: 'EGP' });
        (window as any).ttq?.track('Purchase', { value: 1500, currency: 'EGP', content_type: 'product', content_id: 'ai-real-estate-course', content_name: 'AI for Real Estate Course' });
      } else {
        throw new Error(data.error || 'Failed to initialize payment');
      }
    } catch (error: any) {
      console.error('Error saving enrollment or proceeding to payment:', error);
      setErrorMsg(error.message || 'An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 relative z-10 py-20">
      <div className="absolute top-24 md:top-20 left-8 z-[100]">
        <button
          onClick={() => router.push('/real-estate')}
          className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full border border-gray-200 cursor-pointer"
        >
          <ArrowLeft size={20} />
          <span className="font-medium text-sm">Back to Home</span>
        </button>
      </div>

      <motion.div
        initial={{ scale: 1, opacity: 1, y: 0 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0 }}
        className="relative w-full max-w-4xl"
      >
        {/* Order Summary Bar */}
        <div className="w-full bg-[#f7f7f7] border border-gray-200 rounded-xl px-4 md:px-6 py-4 flex justify-between items-center mb-8 mt-20">
          <button className="flex items-center gap-2 text-black hover:text-gray-700 transition-colors cursor-pointer">
            <span className="font-medium">Order summary</span>
            <ChevronDown size={18} className="text-gray-500" />
          </button>
          <div className="flex items-center gap-3">
            <span className="text-gray-500 line-through text-sm">EGP 2,500</span>
            <span className="text-black font-bold text-lg">EGP 1,500</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-outfit font-bold text-black mb-4">
            Get Lifetime Access to The Course
          </h1>
          <p className="text-xl md:text-2xl font-bold text-[#1a9a46] mb-4" dir="rtl">
            Course Available NOW / الحق مكانك الآن
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 md:p-8 mb-6 border border-gray-100">

          {showPaymobIframe ? (
            <div className="flex flex-col items-center w-full">
              <div className="w-full flex justify-end mb-4">
                <button
                  onClick={() => setShowPaymobIframe(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-lg font-bold text-sm transition-colors cursor-pointer"
                  dir="rtl"
                >
                  رجوع
                </button>
              </div>
              <iframe
                src={`https://accept.paymob.com/unifiedcheckout/?publicKey=egy_pk_live_XUoAxwNsU13axDyyPivhFkPAh6EDSwIy&clientSecret=${clientSecret}`}
                className="w-full h-[500px] md:h-[700px] rounded-xl border border-gray-200 shadow-sm"
              />
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit}>
            <div className="space-y-4 mb-8">
              {errorMsg && (
                <div className="text-center mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 font-medium text-sm">
                    {errorMsg}
                  </p>
                </div>
              )}
              <div className="text-center mb-6">
                <p className="text-lg md:text-xl text-gray-800">
                  Step #1: Fill in your details below
                </p>
              </div>

              <div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onBlur={(e) => { if (e.target.value) saveLead(); }}
                  placeholder="Your Full Name / اسمك بالكامل"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] transition-colors"
                  required
                />
              </div>

              <div>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onBlur={(e) => { if (e.target.value) saveLead(); }}
                  placeholder="Your Phone Number / رقم تليفونك"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] transition-colors"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={(e) => { if (e.target.value) saveLead(); }}
                  placeholder="Your Email Address / بريدك الإلكتروني"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] transition-colors"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col-reverse md:flex-row-reverse gap-8 items-start border-t border-gray-200 pt-8 mt-4">
              {/* Payment Summary Box */}
              <div className="w-full md:w-[320px] shrink-0 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-black font-bold text-xl mb-6">Order Summary</h3>
                <div className="text-gray-800 mb-6 font-medium text-base">
                  AI Career School Course
                </div>

                <div className="flex gap-2 mb-6">
                  <input
                    type="text"
                    placeholder="Promo Code"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] bg-white text-black text-sm"
                  />
                  <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium">
                    Apply
                  </button>
                </div>

                <div className="border-t border-gray-200 pt-4 flex justify-between items-center mt-auto">
                  <span className="text-black font-bold text-lg">Total:</span>
                  <span className="text-[#1a9a46] font-bold text-xl">EGP 1,500</span>
                </div>
              </div>

              {/* Payment Methods Section */}
              <div className="flex-1 w-full">
                <div className="text-center md:text-left mb-6">
                  <p className="text-lg md:text-xl text-gray-800">
                    Step #2: Pay <span className="text-[#1a9a46] font-bold">EGP 1,500</span> instead of <span className="line-through text-gray-500">LE 2,500</span>
                  </p>
                  <h3 className="text-black text-xl font-bold mt-8 mb-4">Payment Methods:</h3>
                </div>

                {/* Payment Methods - buttons in grid, instructions full-width on desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 items-start">
                  {/* Card Column */}
                  <div className="flex flex-col gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer min-h-[120px] ${paymentMethod === 'card'
                        ? 'border-[#1a9a46] bg-[#f0fdf4]'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <img src="/payment/visa.png" alt="Visa" className="h-8 w-auto" />
                        <img src="/payment/master.png" alt="Mastercard" className="h-8 w-auto" />
                      </div>
                      <span className="font-semibold text-black leading-tight text-sm text-center">Pay with Card or Apple Pay</span>
                    </button>

                    {paymentMethod === 'card' && (
                      <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-[#1a9a46] hover:bg-[#15803d] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-4 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2 text-base"
                        >
                          {isSubmitting ? 'Processing...' : 'Pay Now - EGP 1,500'}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* InstaPay Column */}
                  <div className="flex flex-col gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentMethod('instapay');
                        (window as any).ttq?.track('Purchase', { value: 1500, currency: 'EGP', content_type: 'product', content_id: 'ai-real-estate-course', content_name: 'AI for Real Estate Course' });
                      }}
                      className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer min-h-[120px] ${paymentMethod === 'instapay'
                        ? 'border-[#1a9a46] bg-[#f0fdf4]'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                    >
                      <div className="flex items-center">
                        <img src="/payment/insta.png" alt="InstaPay" className="h-8 w-auto" />
                      </div>
                      <span className="font-semibold text-black leading-tight text-sm text-center">Pay with Instapay</span>
                    </button>

                    {/* Mobile only: instructions inline under button */}
                    {paymentMethod === 'instapay' && (
                      <div className="sm:hidden bg-white rounded-xl border-2 border-gray-200 p-6 mt-4 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
                        <p className="text-black font-semibold text-sm mb-1 text-right" dir="rtl">
                          ادفع 1,500 جنيه عن طريق InstaPay على <a href="https://ipn.eg/S/mosaabgaber2/instapay/6i3fZF" target="_blank" rel="noopener noreferrer" className="text-[#1a9a46] underline" dir="ltr" style={{ display: 'inline-block' }}>@mosaabgaber2</a>
                        </p>
                        <p className="text-gray-600 text-sm mb-4 text-left">
                          Pay EGP 1,500 via InstaPay to <a href="https://ipn.eg/S/mosaabgaber2/instapay/6i3fZF" target="_blank" rel="noopener noreferrer" className="text-[#1a9a46] font-semibold underline">@mosaabgaber2</a>
                        </p>

                        <p className="text-black font-semibold text-sm mb-1 text-right" dir="rtl">
                          احفظ صورة التحويل وابعتها على الواتساب
                        </p>
                        <p className="text-gray-600 text-sm mb-5 text-left">
                          Save the transaction screenshot and send it on WhatsApp
                        </p>

                        <div className="flex flex-col gap-3">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              (window as any).fbq?.('track', 'AddToCart', { value: 1500, currency: 'EGP', content_name: 'Real Estate Course' });
                              (window as any).ttq?.track('InitiateCheckout', { value: 1500, currency: 'EGP' });
                              (window as any).ttq?.track('Purchase', { value: 1500, currency: 'EGP', content_type: 'product', content_id: 'ai-real-estate-course', content_name: 'AI for Real Estate Course' });
                              window.open('https://ipn.eg/S/mosaabgaber2/instapay/6i3fZF', '_blank');
                            }}
                            className="w-full text-center bg-gray-100 hover:bg-gray-200 text-black px-4 py-3 rounded-lg transition-colors text-sm font-medium border border-gray-200"
                          >
                            Open Instapay Link
                          </button>
                          <a
                            href="https://wa.link/hc7cmh"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full text-center bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#1a9a46] border border-[#25D366]/50 px-4 py-3 rounded-lg transition-colors text-sm font-medium"
                          >
                            Send on WhatsApp
                          </a>
                        </div>

                        <div className="mt-4 border-t border-gray-200 pt-4">
                          {!uploadSuccess ? (
                            <>
                              <p className="text-black font-semibold text-sm mb-2 text-right" dir="rtl">
                                ارفع صورة التحويل هنا بعد الدفع
                              </p>
                              <p className="text-gray-600 text-xs mb-3 text-left">
                                Upload your payment screenshot here after paying
                              </p>
                              <label className="w-full flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#1a9a46] hover:bg-[#f0fdf4] transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                <span className="text-sm text-gray-500">{screenshotFile ? screenshotFile.name : 'اختار الصورة / Choose image'}</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) setScreenshotFile(file);
                                  }}
                                />
                              </label>
                              {screenshotFile && (
                                <button
                                  type="button"
                                  onClick={() => uploadScreenshot(screenshotFile)}
                                  disabled={isUploading}
                                  className="w-full mt-3 bg-[#1a9a46] hover:bg-[#15803d] disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all text-sm"
                                >
                                  {isUploading ? 'جاري الرفع...' : 'ارفع صورة التحويل'}
                                </button>
                              )}
                              {uploadError && <p className="text-red-500 text-xs mt-2 text-center">{uploadError}</p>}
                            </>
                          ) : (
                            <div className="flex flex-col items-center gap-2 py-4">
                              <div className="w-12 h-12 bg-[#f0fdf4] rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#1a9a46]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <p className="text-[#1a9a46] font-bold text-sm text-center" dir="rtl">تم رفع الصورة بنجاح! هنتواصل معاك قريباً.</p>
                              <p className="text-gray-500 text-xs text-center">Screenshot uploaded successfully! We will contact you soon.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Vodafone Cash Column */}
                  <div className="flex flex-col gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentMethod('vodafone');
                        (window as any).ttq?.track('Purchase', { value: 1500, currency: 'EGP', content_type: 'product', content_id: 'ai-real-estate-course', content_name: 'AI for Real Estate Course' });
                      }}
                      className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer min-h-[120px] ${paymentMethod === 'vodafone'
                        ? 'border-[#1a9a46] bg-[#f0fdf4]'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                    >
                      <div className="flex items-center">
                        <img src="/payment/voda.png" alt="Vodafone Cash" className="h-8 w-auto" />
                      </div>
                      <span className="font-semibold text-black leading-tight text-sm text-center">Pay with Vodafone Cash</span>
                    </button>

                    {/* Mobile only: instructions inline under button */}
                    {paymentMethod === 'vodafone' && (
                      <div className="sm:hidden bg-white rounded-xl border-2 border-gray-200 p-6 mt-4 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
                        <p className="text-black font-semibold text-sm mb-1 text-right" dir="rtl">
                          ادفع 1,500 جنيه على رقم فودافون كاش <span className="text-[#1a9a46]">01008176408</span>
                        </p>
                        <p className="text-gray-600 text-sm mb-4 text-left">
                          Pay EGP 1,500 to Vodafone Cash number <span className="text-[#1a9a46] font-semibold">01008176408</span>
                        </p>

                        <p className="text-black font-semibold text-sm mb-1 text-right" dir="rtl">
                          احفظ صورة التحويل وابعتها على الواتساب
                        </p>
                        <p className="text-gray-600 text-sm mb-5 text-left">
                          Save the transaction screenshot and send it on WhatsApp
                        </p>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            (window as any).fbq?.('track', 'AddToCart', { value: 1500, currency: 'EGP', content_name: 'Real Estate Course' });
                            (window as any).ttq?.track('InitiateCheckout', { value: 1500, currency: 'EGP' });
                            (window as any).ttq?.track('Purchase', { value: 1500, currency: 'EGP', content_type: 'product', content_id: 'ai-real-estate-course', content_name: 'AI for Real Estate Course' });
                            window.open('https://wa.link/hc7cmh', '_blank');
                          }}
                          className="w-full block text-center bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#1a9a46] border border-[#25D366]/50 px-4 py-3 rounded-lg transition-colors text-sm font-medium"
                        >
                          Send on WhatsApp
                        </button>

                        <div className="mt-4 border-t border-gray-200 pt-4">
                          {!uploadSuccess ? (
                            <>
                              <p className="text-black font-semibold text-sm mb-2 text-right" dir="rtl">
                                ارفع صورة التحويل هنا بعد الدفع
                              </p>
                              <p className="text-gray-600 text-xs mb-3 text-left">
                                Upload your payment screenshot here after paying
                              </p>
                              <label className="w-full flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#1a9a46] hover:bg-[#f0fdf4] transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                <span className="text-sm text-gray-500">{screenshotFile ? screenshotFile.name : 'اختار الصورة / Choose image'}</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) setScreenshotFile(file);
                                  }}
                                />
                              </label>
                              {screenshotFile && (
                                <button
                                  type="button"
                                  onClick={() => uploadScreenshot(screenshotFile)}
                                  disabled={isUploading}
                                  className="w-full mt-3 bg-[#1a9a46] hover:bg-[#15803d] disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all text-sm"
                                >
                                  {isUploading ? 'جاري الرفع...' : 'ارفع صورة التحويل'}
                                </button>
                              )}
                              {uploadError && <p className="text-red-500 text-xs mt-2 text-center">{uploadError}</p>}
                            </>
                          ) : (
                            <div className="flex flex-col items-center gap-2 py-4">
                              <div className="w-12 h-12 bg-[#f0fdf4] rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#1a9a46]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <p className="text-[#1a9a46] font-bold text-sm text-center" dir="rtl">تم رفع الصورة بنجاح! هنتواصل معاك قريباً.</p>
                              <p className="text-gray-500 text-xs text-center">Screenshot uploaded successfully! We will contact you soon.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Desktop only: full-width instruction panels below the grid */}
                {paymentMethod === 'instapay' && (
                  <div className="hidden sm:block bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300 mb-8">
                    <p className="text-black font-semibold text-sm mb-1 text-right" dir="rtl">
                      ادفع 1,500 جنيه عن طريق InstaPay على <a href="https://ipn.eg/S/mosaabgaber2/instapay/6i3fZF" target="_blank" rel="noopener noreferrer" className="text-[#1a9a46] underline" dir="ltr" style={{ display: 'inline-block' }}>@mosaabgaber2</a>
                    </p>
                    <p className="text-gray-600 text-sm mb-4 text-left">
                      Pay EGP 1,500 via InstaPay to <a href="https://ipn.eg/S/mosaabgaber2/instapay/6i3fZF" target="_blank" rel="noopener noreferrer" className="text-[#1a9a46] font-semibold underline">@mosaabgaber2</a>
                    </p>

                    <p className="text-black font-semibold text-sm mb-1 text-right" dir="rtl">
                      احفظ صورة التحويل وابعتها على الواتساب
                    </p>
                    <p className="text-gray-600 text-sm mb-5 text-left">
                      Save the transaction screenshot and send it on WhatsApp
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          (window as any).fbq?.('track', 'AddToCart', { value: 1500, currency: 'EGP', content_name: 'Real Estate Course' });
                          (window as any).ttq?.track('InitiateCheckout', { value: 1500, currency: 'EGP' });
                          (window as any).ttq?.track('Purchase', { value: 1500, currency: 'EGP', content_type: 'product', content_id: 'ai-real-estate-course', content_name: 'AI for Real Estate Course' });
                          window.open('https://ipn.eg/S/mosaabgaber2/instapay/6i3fZF', '_blank');
                        }}
                        className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-black px-4 py-3 rounded-lg transition-colors text-sm font-medium border border-gray-200"
                      >
                        Open Instapay Link
                      </button>
                      <a
                        href="https://wa.link/hc7cmh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#1a9a46] border border-[#25D366]/50 px-4 py-3 rounded-lg transition-colors text-sm font-medium"
                      >
                        Send on WhatsApp
                      </a>
                    </div>

                    <div className="mt-4 border-t border-gray-200 pt-4">
                      {!uploadSuccess ? (
                        <>
                          <p className="text-black font-semibold text-sm mb-2 text-right" dir="rtl">
                            ارفع صورة التحويل هنا بعد الدفع
                          </p>
                          <p className="text-gray-600 text-xs mb-3 text-left">
                            Upload your payment screenshot here after paying
                          </p>
                          <label className="w-full flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#1a9a46] hover:bg-[#f0fdf4] transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            <span className="text-sm text-gray-500">{screenshotFile ? screenshotFile.name : 'اختار الصورة / Choose image'}</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) setScreenshotFile(file);
                              }}
                            />
                          </label>
                          {screenshotFile && (
                            <button
                              type="button"
                              onClick={() => uploadScreenshot(screenshotFile)}
                              disabled={isUploading}
                              className="w-full mt-3 bg-[#1a9a46] hover:bg-[#15803d] disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all text-sm"
                            >
                              {isUploading ? 'جاري الرفع...' : 'ارفع صورة التحويل'}
                            </button>
                          )}
                          {uploadError && <p className="text-red-500 text-xs mt-2 text-center">{uploadError}</p>}
                        </>
                      ) : (
                        <div className="flex flex-col items-center gap-2 py-4">
                          <div className="w-12 h-12 bg-[#f0fdf4] rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#1a9a46]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <p className="text-[#1a9a46] font-bold text-sm text-center" dir="rtl">تم رفع الصورة بنجاح! هنتواصل معاك قريباً.</p>
                          <p className="text-gray-500 text-xs text-center">Screenshot uploaded successfully! We will contact you soon.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {paymentMethod === 'vodafone' && (
                  <div className="hidden sm:block bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300 mb-8">
                    <p className="text-black font-semibold text-sm mb-1 text-right" dir="rtl">
                      ادفع 1,500 جنيه على رقم فودافون كاش <span className="text-[#1a9a46]">01008176408</span>
                    </p>
                    <p className="text-gray-600 text-sm mb-4 text-left">
                      Pay EGP 1,500 to Vodafone Cash number <span className="text-[#1a9a46] font-semibold">01008176408</span>
                    </p>

                    <p className="text-black font-semibold text-sm mb-1 text-right" dir="rtl">
                      احفظ صورة التحويل وابعتها على الواتساب
                    </p>
                    <p className="text-gray-600 text-sm mb-5 text-left">
                      Save the transaction screenshot and send it on WhatsApp
                    </p>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        (window as any).fbq?.('track', 'AddToCart', { value: 1500, currency: 'EGP', content_name: 'Real Estate Course' });
                        (window as any).ttq?.track('InitiateCheckout', { value: 1500, currency: 'EGP' });
                        (window as any).ttq?.track('Purchase', { value: 1500, currency: 'EGP', content_type: 'product', content_id: 'ai-real-estate-course', content_name: 'AI for Real Estate Course' });
                        window.open('https://wa.link/hc7cmh', '_blank');
                      }}
                      className="w-full block text-center bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#1a9a46] border border-[#25D366]/50 px-4 py-3 rounded-lg transition-colors text-sm font-medium"
                    >
                      Send on WhatsApp
                    </button>

                    <div className="mt-4 border-t border-gray-200 pt-4">
                      {!uploadSuccess ? (
                        <>
                          <p className="text-black font-semibold text-sm mb-2 text-right" dir="rtl">
                            ارفع صورة التحويل هنا بعد الدفع
                          </p>
                          <p className="text-gray-600 text-xs mb-3 text-left">
                            Upload your payment screenshot here after paying
                          </p>
                          <label className="w-full flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#1a9a46] hover:bg-[#f0fdf4] transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            <span className="text-sm text-gray-500">{screenshotFile ? screenshotFile.name : 'اختار الصورة / Choose image'}</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) setScreenshotFile(file);
                              }}
                            />
                          </label>
                          {screenshotFile && (
                            <button
                              type="button"
                              onClick={() => uploadScreenshot(screenshotFile)}
                              disabled={isUploading}
                              className="w-full mt-3 bg-[#1a9a46] hover:bg-[#15803d] disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all text-sm"
                            >
                              {isUploading ? 'جاري الرفع...' : 'ارفع صورة التحويل'}
                            </button>
                          )}
                          {uploadError && <p className="text-red-500 text-xs mt-2 text-center">{uploadError}</p>}
                        </>
                      ) : (
                        <div className="flex flex-col items-center gap-2 py-4">
                          <div className="w-12 h-12 bg-[#f0fdf4] rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#1a9a46]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <p className="text-[#1a9a46] font-bold text-sm text-center" dir="rtl">تم رفع الصورة بنجاح! هنتواصل معاك قريباً.</p>
                          <p className="text-gray-500 text-xs text-center">Screenshot uploaded successfully! We will contact you soon.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>

          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm font-medium" dir="rtl">
              More payment methods coming soon / طرق دفع إضافية قريباً
            </p>
          </div>
            </>
          )}
        </div>
      </motion.div>

      {/* Simple Footer */}
      <footer className="w-full max-w-4xl mt-12 mb-4 border-t border-gray-200 pt-6">
        <div className="flex flex-row items-center justify-center gap-6 text-sm text-gray-500">
          <Link href="/contact" className="hover:text-black transition-colors cursor-pointer">
            Contact
          </Link>
          <button
            onClick={() => setIsRefundOpen(true)}
            className="hover:text-black transition-colors cursor-pointer"
          >
            Refund Policy
          </button>
        </div>
      </footer>

      <InfoModal
        isOpen={isRefundOpen}
        onClose={() => setIsRefundOpen(false)}
        title="AI Career School - Refund Policy"
        content="Refunds are handled on a case-by-case basis. If you're not satisfied with your purchase, please contact us within 2 days of purchase at: theaicareerschool@gmail.com — Include your full name, purchase date, and reason for the refund request. Refunds are processed within 5-7 business days if approved. Once refunded, course access will be revoked immediately. For any questions, contact us at theaicareerschool@gmail.com"
      />
    </div>
  );
}
