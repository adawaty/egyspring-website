import { Layout } from "@/components/Layout";
import { useTranslation } from "@/lib/i18n";
import type { Language } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, MessageCircle, MapPinned, Loader2, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";

export default function Contact({ lang }: { lang: Language }) {
  const t = useTranslation(lang);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Precise coordinates from user-provided Google Maps link
  // Link: https://maps.app.goo.gl/utMF25c54US1UcMv6
  // Location: 30.2837267, 31.7194104 (EGYSPRING / المصرية للسوست واليايات)
  const mapSrc = `https://maps.google.com/maps?q=30.2837267,31.7194104&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Simulated Contact Submission:", data);

    toast.success(lang === 'en' ? 'Message sent successfully!' : 'تم إرسال الرسالة بنجاح!');
    reset();
    setIsSubmitting(false);
  };

  return (
    <Layout lang={lang}>
      <div className="bg-slate-50 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-heading font-bold text-center mb-12">{t.contact.title}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Info Card */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                className="bg-slate-900 text-white p-8 rounded-lg shadow-2xl relative overflow-hidden"
              >
                 <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                 <h2 className="text-2xl font-bold mb-6 font-heading">{t.contact.address_title}</h2>
                 
                 <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-6 h-6 text-primary shrink-0 mt-1" />
                      <div>
                        <div className="font-bold mb-1">{t.contact.address_title}</div>
                        <p className="text-slate-300 text-sm leading-relaxed">{t.contact.address}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Phone className="w-6 h-6 text-primary shrink-0 mt-1" />
                      <div>
                        <div className="font-bold mb-1">{t.contact.phone}</div>
                        <a
                          href="tel:+201050215333"
                          className="text-slate-300 text-sm hover:text-white transition-colors"
                          aria-label="Call EGYSPRING"
                        >
                          <span dir="ltr" className="inline-block" style={{ unicodeBidi: 'isolate' }}>
                            +20 10 5021 5333
                          </span>
                        </a>

                        <a
                          href="https://wa.me/201050215333"
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-full hover:bg-[#128C7E] transition-all duration-300 font-bold shadow-lg hover:shadow-[#25D366]/20"
                        >
                          <MessageCircle className="w-4 h-4" />
                          {lang === 'en' ? 'Chat on WhatsApp' : 'تواصل عبر واتساب'}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Mail className="w-6 h-6 text-primary shrink-0 mt-1" />
                      <div>
                        <div className="font-bold mb-1">{t.contact.email}</div>
                        <a
                          href="mailto:info@egyspring.com"
                          className="text-slate-300 text-sm hover:text-white transition-colors"
                          aria-label="Email EGYSPRING"
                        >
                          <span dir="ltr" className="inline-block" style={{ unicodeBidi: 'isolate' }}>
                            info@egyspring.com
                          </span>
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Clock className="w-6 h-6 text-primary shrink-0 mt-1" />
                      <div>
                        <div className="font-bold mb-1">{t.contact.hours}</div>
                      </div>
                    </div>
                 </div>

                 {/* Google Map */}
                 <div className="mt-8 h-56 bg-slate-800 rounded border border-slate-700 overflow-hidden">
                   <iframe
                     title="EGYSPRING Location Map"
                     src={mapSrc}
                     className="w-full h-full"
                     loading="lazy"
                     referrerPolicy="no-referrer-when-downgrade"
                   />
                 </div>
              </motion.div>

              {/* Form */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.3 }}
                className="bg-white p-8 rounded-lg shadow-xl border border-slate-100"
              >
                 <h2 className="text-2xl font-bold mb-6 font-heading text-slate-900">{t.contact.form_title}</h2>
                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">{t.contact.name}</label>
                      <Input {...register("name", { required: true })} placeholder={lang === 'en' ? "John Doe" : "الاسم"} className={errors.name ? "border-red-500" : ""} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">{t.contact.email}</label>
                      <Input type="email" {...register("email", { required: true })} placeholder="john@company.com" className={errors.email ? "border-red-500" : ""} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">{t.contact.phone}</label>
                      <Input type="tel" {...register("phone")} placeholder="+20..." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">{t.contact.message}</label>
                      <Textarea {...register("message", { required: true })} className={`h-32 ${errors.message ? "border-red-500" : ""}`} />
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider disabled:opacity-70 disabled:cursor-not-allowed">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          {lang === 'en' ? 'Sending...' : 'جاري الإرسال...'}
                        </>
                      ) : (
                        <>
                          {t.contact.submit}
                        </>
                      )}
                    </Button>
                 </form>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
