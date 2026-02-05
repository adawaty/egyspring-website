import { useEffect } from "react";
import { useLocation, Redirect, Link } from "wouter";
import { Layout } from "@/components/Layout";
import { useTranslation } from "@/lib/i18n";
import type { Language } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/images/hero-springs.jpeg";
import imgCompression from "@/assets/images/prod-compression.jpeg";
import imgBearing from "@/assets/images/prod-bearing.jpeg";
import imgStamping from "@/assets/images/prod-stamping.jpeg";

export default function Home({ lang }: { lang: Language }) {
  const t = useTranslation(lang);
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const isRTL = lang === 'ar';

  return (
    <Layout lang={lang}>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Industrial Springs Manufacturing" 
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
             <div className="flex items-center gap-2 mb-4">
                <span className="bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm">ISO 9001 Certified</span>
                <span className="bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm backdrop-blur-sm">Est. 1990</span>
             </div>
             <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight uppercase">
               {t.hero.title}
             </h1>
             <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed max-w-lg">
               {t.hero.subtitle}
             </p>
             <div className="flex gap-4 flex-col sm:flex-row">
               <Link href={`/${lang}/products`}>
                 <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold h-14 px-8 uppercase tracking-wider text-base cursor-pointer">
                   {t.hero.cta_primary}
                 </Button>
               </Link>
               {/* Fixed Quote Link */}
               <Link href={`/${lang}/quote`}>
                 <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 h-14 px-8 uppercase tracking-wider text-base cursor-pointer">
                   {t.nav.quote}
                 </Button>
               </Link>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Features Strip */}
      <div className="bg-primary py-8 text-white overflow-hidden">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
           {[
             { title: "Precision Engineered", desc: "Micro-tolerances for demanding applications" },
             { title: "Custom Manufacturing", desc: "From prototyping to mass production" },
             { title: "Fast Delivery", desc: "Strategic location in 10th of Ramadan" }
           ].map((feature, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: i * 0.2 }}
               className="flex items-center gap-4 justify-center md:justify-start"
             >
                <CheckCircle2 className="w-10 h-10 opacity-80" />
                <div>
                  <h3 className="font-bold text-lg uppercase">{feature.title}</h3>
                  <p className="text-sm opacity-90">{feature.desc}</p>
                </div>
             </motion.div>
           ))}
        </div>
      </div>

      {/* Products Preview */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-primary font-bold text-sm tracking-widest uppercase mb-2">Our Capabilities</h2>
            <h3 className="text-4xl font-heading font-bold text-slate-900">{t.products.title}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col"
            >
               <div className="h-64 relative overflow-hidden bg-white">
                 <img 
                   src={imgCompression} 
                   alt="Springs" 
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                 />
                 <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors" />
               </div>
               <div className="p-8 flex-1 flex flex-col">
                 <h4 className="text-2xl font-bold mb-3 font-heading text-slate-900 group-hover:text-primary transition-colors">{t.products.springs}</h4>
                 <p className="text-slate-600 mb-6 leading-relaxed flex-1">Compression, Extension, and Torsion springs manufactured with high-grade steel and precise heat treatment.</p>
                 <Link href={`/${lang}/products?category=springs`} className="inline-flex items-center text-primary font-bold uppercase tracking-wider text-sm hover:underline mt-auto cursor-pointer">
                   View Catalog <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180 mr-2' : 'ml-2'}`} />
                 </Link>
               </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col"
            >
               <div className="h-64 relative overflow-hidden bg-white">
                 <img 
                   src={imgBearing} 
                   alt="Bearings" 
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                 />
               </div>
               <div className="p-8 flex-1 flex flex-col">
                 <h4 className="text-2xl font-bold mb-3 font-heading text-slate-900 group-hover:text-primary transition-colors">{t.products.bearings}</h4>
                 <p className="text-slate-600 mb-6 leading-relaxed flex-1">High-performance industrial bearings for heavy machinery, automotive, and specialized applications.</p>
                 <Link href={`/${lang}/products?category=bearings`} className="inline-flex items-center text-primary font-bold uppercase tracking-wider text-sm hover:underline mt-auto cursor-pointer">
                   View Catalog <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180 mr-2' : 'ml-2'}`} />
                 </Link>
               </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col"
            >
               <div className="h-64 relative overflow-hidden bg-white">
                 <img 
                   src={imgStamping} 
                   alt="Metal Forming" 
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                 />
               </div>
               <div className="p-8 flex-1 flex flex-col">
                 <h4 className="text-2xl font-bold mb-3 font-heading text-slate-900 group-hover:text-primary transition-colors">{t.products.forming}</h4>
                 <p className="text-slate-600 mb-6 leading-relaxed flex-1">Custom metal forming, wire bending, and stamping services tailored to your engineering blueprints.</p>
                 <Link href={`/${lang}/products?category=forming`} className="inline-flex items-center text-primary font-bold uppercase tracking-wider text-sm hover:underline mt-auto cursor-pointer">
                   View Catalog <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180 mr-2' : 'ml-2'}`} />
                 </Link>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('@/assets/images/warehouse.jpeg')] bg-cover bg-center opacity-10" />
         <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 uppercase">Ready to optimize your supply chain?</h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">Get a competitive quote for your manufacturing needs within 24 hours.</p>
            {/* Fixed Quote Link */}
            <Link href={`/${lang}/quote`}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold h-16 px-10 text-lg uppercase tracking-wider shadow-lg shadow-primary/20 transform hover:-translate-y-1 transition-all cursor-pointer">
                {t.nav.quote}
              </Button>
            </Link>
         </div>
      </section>
    </Layout>
  );
}
