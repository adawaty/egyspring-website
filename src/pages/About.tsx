import { Layout } from "@/components/Layout";
import { useTranslation } from "@/lib/i18n";
import type { Language } from "@/lib/i18n";
import { CheckCircle2, Factory, Award, Users } from "lucide-react";
import heroImage from "@/assets/images/warehouse.jpeg";

export default function About({ lang }: { lang: Language }) {
  const t = useTranslation(lang);

  return (
    <Layout lang={lang}>
      {/* Header */}
      <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div 
            className="absolute inset-0 bg-cover bg-center z-0 opacity-40" 
            style={{ backgroundImage: `url(${heroImage})` }} 
            role="img"
            aria-label="Warehouse background"
        />
        <div className="container mx-auto px-4 relative z-20 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">{t.about.title}</h1>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-heading font-bold text-slate-900 mb-6">{t.about.story_title}</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              {t.about.story_text}
            </p>
            <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-primary">
              <h3 className="font-bold text-slate-900 mb-2">{t.about.mission_title}</h3>
              <p className="text-slate-600 italic">"{t.about.mission_text}"</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-white p-6 shadow-md rounded-lg text-center border-t-4 border-primary">
                <Factory className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-slate-900 mb-1">30+</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">{lang === 'en' ? 'Years Exp' : 'سنوات خبرة'}</div>
             </div>
             <div className="bg-white p-6 shadow-md rounded-lg text-center border-t-4 border-primary">
                <Award className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-slate-900 mb-1">ISO</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">9001:2015</div>
             </div>
             <div className="bg-white p-6 shadow-md rounded-lg text-center border-t-4 border-primary">
                <Users className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-slate-900 mb-1">500+</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">{lang === 'en' ? 'Clients' : 'عميل'}</div>
             </div>
             <div className="bg-white p-6 shadow-md rounded-lg text-center border-t-4 border-primary">
                <CheckCircle2 className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-slate-900 mb-1">100%</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">{lang === 'en' ? 'Quality' : 'جودة'}</div>
             </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
