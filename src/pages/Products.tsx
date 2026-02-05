import { Layout } from "@/components/Layout";
import { useTranslation } from "@/lib/i18n";
import type { Language } from "@/lib/i18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { Award, ShieldCheck, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import imgCompression from "@/assets/images/prod-compression.jpeg";
import imgExtension from "@/assets/images/prod-extension.jpeg";
import imgTorsion from "@/assets/images/prod-torsion.png";
import imgWireform from "@/assets/images/prod-wireform.webp";
import imgBearing from "@/assets/images/prod-bearing.jpeg";
import imgStamping from "@/assets/images/prod-stamping.jpeg";
import imgDieSpring from "@/assets/images/prod-diespring.jpeg";
import imgDiscSpring from "@/assets/images/prod-discspring.jpeg";
import imgRoller from "@/assets/images/prod-roller.jpeg";
import imgConical from "@/assets/images/prod-conical.jpeg";
import imgDoubleTorsion from "@/assets/images/prod-double-torsion.jpeg";
import imgNeedle from "@/assets/images/prod-needle.jpeg";
import imgCylindrical from "@/assets/images/prod-cylindrical.jpeg";
import imgThrust from "@/assets/images/prod-thrust.jpeg";
import imgAppAutomotive from "@/assets/images/app-automotive.png";
import imgAppMachinery from "@/assets/images/app-machinery.jpeg";
import imgAppGears from "@/assets/images/app-gears.jpeg";

// Extended Product Data
const products = [
  // --- Springs ---
  { 
    id: 'compression', 
    name_en: 'Compression Springs', 
    name_ar: 'سوست ضغط', 
    cat: 'springs', 
    img: imgCompression,
    specs: [
      { label_en: "Materials", label_ar: "الخامات", value_en: "Stainless Steel (304, 316), High Carbon Steel, Music Wire", value_ar: "ستانلس ستيل (٣٠٤، ٣١٦)، صلب كربوني عالي، سلك موسيقى" },
      { label_en: "Wire Diameter", label_ar: "قطر السلك", value_en: "0.1 mm - 25 mm", value_ar: "٠.١ مم - ٢٥ مم" },
      { label_en: "Ends", label_ar: "النهايات", value_en: "Closed & Ground, Closed Not Ground, Open", value_ar: "مغلقة ومجلوخة، مغلقة غير مجلوخة، مفتوحة" },
      { label_en: "Finish", label_ar: "التشطيب", value_en: "Zinc Plating, Powder Coating, Black Oxide", value_ar: "طلاء زنك، دهان بودرة، أكسدة سوداء" },
    ]
  },
  {
    id: 'conical',
    name_en: 'Conical Compression Springs',
    name_ar: 'سوست ضغط مخروطية',
    cat: 'springs',
    img: imgConical,
    specs: [
      { label_en: "Advantage", label_ar: "الميزة", value_en: "Reduced solid height (telescoping)", value_ar: "ارتفاع مضغوط أقل (تداخل الحلقات)" },
      { label_en: "Rate", label_ar: "المعدل", value_en: "Variable/Non-linear", value_ar: "متغير / غير خطي" },
      { label_en: "Applications", label_ar: "التطبيقات", value_en: "Battery Contacts, Heavy Loads in small space", value_ar: "ملامسات البطاريات، أحمال ثقيلة في مساحة صغيرة" },
    ]
  },
  { 
    id: 'extension', 
    name_en: 'Extension Springs', 
    name_ar: 'سوست شد', 
    cat: 'springs', 
    img: imgExtension,
    specs: [
      { label_en: "Materials", label_ar: "الخامات", value_en: "Stainless Steel, Carbon Steel, Oil Tempered", value_ar: "ستانلس ستيل، صلب كربوني، صلب معالج بالزيت" },
      { label_en: "End Types", label_ar: "أنواع الخطافات", value_en: "Machine Loop, English Loop, Extended Hook", value_ar: "حلقة ماكينة، حلقة إنجليزية، خطاف ممتد" },
      { label_en: "Max Load", label_ar: "أقصى حمل", value_en: "Custom calculation based on design", value_ar: "حساب مخصص بناءً على التصميم" },
    ]
  },
  { 
    id: 'torsion', 
    name_en: 'Torsion Springs', 
    name_ar: 'سوست لي', 
    cat: 'springs', 
    img: imgTorsion,
    specs: [
      { label_en: "Leg Types", label_ar: "أنواع الأرجل", value_en: "Straight, Offset, Hinged, Short Hook", value_ar: "مستقيمة، منحرفة، مفصلية، خطاف قصير" },
      { label_en: "Direction", label_ar: "الاتجاه", value_en: "Left Hand (LH), Right Hand (RH), Double Torsion", value_ar: "يسار (LH)، يمين (RH)، لي مزدوج" },
      { label_en: "Applications", label_ar: "التطبيقات", value_en: "Clothespins, Tailgates, Garage Doors", value_ar: "مشابك الغسيل، الأبواب الخلفية، أبواب الجراج" },
    ]
  },
  { 
    id: 'double-torsion', 
    name_en: 'Double Torsion Springs', 
    name_ar: 'سوست لي مزدوجة', 
    cat: 'springs', 
    img: imgDoubleTorsion,
    specs: [
      { label_en: "Structure", label_ar: "التركيب", value_en: "Two coil sections wound in opposite directions", value_ar: "قسمين من الحلقات ملفوفة في اتجاهين متعاكسين" },
      { label_en: "Torque", label_ar: "عزم الدوران", value_en: "Double the torque of single spring", value_ar: "ضعف عزم السوستة المفردة" },
      { label_en: "Applications", label_ar: "التطبيقات", value_en: "Clipboards, Heavy Door Hinges", value_ar: "لوحات الكتابة، مفصلات الأبواب الثقيلة" },
    ]
  },
  {
    id: 'die-spring',
    name_en: 'Die Springs',
    name_ar: 'سوست اسطمبات',
    cat: 'springs',
    img: imgDieSpring,
    specs: [
      { label_en: "Standard", label_ar: "المواصفة", value_en: "ISO 10243", value_ar: "أيزو ١٠٢٤٣" },
      { label_en: "Color Coding", label_ar: "التكويد اللوني", value_en: "Green (Light), Blue (Medium), Red (Heavy), Yellow (Extra Heavy)", value_ar: "أخضر (خفيف)، أزرق (متوسط)، أحمر (ثقيل)، أصفر (ثقيل جداً)" },
      { label_en: "Shape", label_ar: "الشكل", value_en: "Rectangular Wire Section", value_ar: "سلك مقطع مستطيل" },
    ]
  },
  {
    id: 'disc-spring',
    name_en: 'Disc Springs',
    name_ar: 'سوست طبقية',
    cat: 'springs',
    img: imgDiscSpring,
    specs: [
      { label_en: "Standard", label_ar: "المواصفة", value_en: "DIN 2093", value_ar: "DIN 2093" },
      { label_en: "Material", label_ar: "الخامة", value_en: "51CrV4 (Spring Steel)", value_ar: "51CrV4 (صلب سوست)" },
      { label_en: "Features", label_ar: "المميزات", value_en: "High Load in Small Space", value_ar: "حمل عالي في مساحة صغيرة" },
    ]
  },

  // --- Bearings ---
  { 
    id: 'bearing-ball', 
    name_en: 'Deep Groove Ball Bearings', 
    name_ar: 'رولمان بلي أخدود عميق', 
    cat: 'bearings', 
    img: imgBearing,
    specs: [
      { label_en: "Types", label_ar: "الأنواع", value_en: "Deep Groove, Angular Contact, Thrust", value_ar: "أخدود عميق، تلامس زاوي، دفعي" },
      { label_en: "Precision", label_ar: "الدقة", value_en: "P0, P6, P5, P4", value_ar: "P0, P6, P5, P4" },
      { label_en: "Seals", label_ar: "موانع التسرب", value_en: "Open, Rubber Sealed (2RS), Metal Shielded (ZZ)", value_ar: "مفتوح، مانع تسرب مطاطي (2RS)، درع معدني (ZZ)" },
    ]
  },
  { 
    id: 'bearing-roller', 
    name_en: 'Tapered Roller Bearings', 
    name_ar: 'رولمان بلي مخروطي', 
    cat: 'bearings', 
    img: imgRoller,
    specs: [
      { label_en: "Load Type", label_ar: "نوع الحمل", value_en: "Combined Radial & Axial Loads", value_ar: "أحمال مركبة (شعاعية ومحورية)" },
      { label_en: "Applications", label_ar: "التطبيقات", value_en: "Automotive Hubs, Gearboxes", value_ar: "صرر السيارات، صناديق التروس" },
      { label_en: "Material", label_ar: "الخامة", value_en: "Case Carburized Steel", value_ar: "صلب مكربن" },
    ]
  },
  { 
    id: 'bearing-needle', 
    name_en: 'Needle Roller Bearings', 
    name_ar: 'رولمان بلي إبر', 
    cat: 'bearings', 
    img: imgNeedle,
    specs: [
      { label_en: "Feature", label_ar: "الميزة", value_en: "High load capacity, low profile", value_ar: "قدرة حمل عالية، ارتفاع منخفض" },
      { label_en: "Applications", label_ar: "التطبيقات", value_en: "Transmissions, Rocker Arms", value_ar: "ناقلات الحركة، أذرع التأرجح" },
    ]
  },
  { 
    id: 'bearing-cylindrical', 
    name_en: 'Cylindrical Roller Bearings', 
    name_ar: 'رولمان بلي أسطواني', 
    cat: 'bearings', 
    img: imgCylindrical,
    specs: [
      { label_en: "Load Type", label_ar: "نوع الحمل", value_en: "Very High Radial Load", value_ar: "حمل شعاعي عالي جداً" },
      { label_en: "Speed", label_ar: "السرعة", value_en: "Suitable for high speeds", value_ar: "مناسب للسرعات العالية" },
    ]
  },
  { 
    id: 'bearing-thrust', 
    name_en: 'Thrust Ball Bearings', 
    name_ar: 'رولمان بلي دفعي', 
    cat: 'bearings', 
    img: imgThrust,
    specs: [
      { label_en: "Load Type", label_ar: "نوع الحمل", value_en: "Axial Load Only", value_ar: "حمل محوري فقط" },
      { label_en: "Direction", label_ar: "الاتجاه", value_en: "Single or Double Direction", value_ar: "اتجاه واحد أو اتجاهين" },
    ]
  },

  // --- Metal Forming ---
  { 
    id: 'wire-form', 
    name_en: 'Wire Forms', 
    name_ar: 'تشكيل سلك', 
    cat: 'forming', 
    img: imgWireform,
    specs: [
      { label_en: "Materials", label_ar: "الخامات", value_en: "Steel, Copper, Brass, Aluminum", value_ar: "صلب، نحاس، نحاس أصفر، ألومنيوم" },
      { label_en: "Processes", label_ar: "العمليات", value_en: "CNC Bending, Cutting, Chamfering", value_ar: "ثني CNC، قطع، شطف" },
      { label_en: "Tolerance", label_ar: "التفاوت", value_en: "+/- 0.1 mm", value_ar: "+/- ٠.١ مم" },
    ]
  },
  { 
    id: 'stamping', 
    name_en: 'Metal Stamping', 
    name_ar: 'كبس معادن', 
    cat: 'forming', 
    img: imgStamping,
    specs: [
      { label_en: "Materials", label_ar: "الخامات", value_en: "Sheet Metal, Aluminum, Copper", value_ar: "صاج، ألومنيوم، نحاس" },
      { label_en: "Thickness", label_ar: "السمك", value_en: "0.5 mm - 10 mm", value_ar: "٠.٥ مم - ١٠ مم" },
      { label_en: "Capabilities", label_ar: "القدرات", value_en: "Blanking, Piercing, Deep Drawing", value_ar: "تقطيع، تثقيب، سحب عميق" },
    ]
  },
];

const applications = [
  {
    id: 'auto',
    title_en: 'Automotive & Transportation',
    title_ar: 'السيارات والنقل',
    desc_en: 'High-performance suspension springs, engine valve springs, and chassis components designed for durability under extreme conditions.',
    desc_ar: 'سوست تعليق عالية الأداء، سوست صمامات المحرك، ومكونات الشاسيه المصممة للمتانة تحت الظروف القاسية.',
    img: imgAppAutomotive
  },
  {
    id: 'machinery',
    title_en: 'Industrial Machinery',
    title_ar: 'الماكينات الصناعية',
    desc_en: 'Heavy-duty springs and gears for manufacturing equipment, agricultural machinery, and mining operations.',
    desc_ar: 'سوست وتروس للخدمة الشاقة لمعدات التصنيع، الآلات الزراعية، وعمليات التعدين.',
    img: imgAppMachinery
  },
  {
    id: 'appliances',
    title_en: 'Home Appliances & Automation',
    title_ar: 'الأجهزة المنزلية والأتمتة',
    desc_en: 'Precision components for washing machines, refrigerators, and automated systems requiring consistent performance.',
    desc_ar: 'مكونات دقيقة للغسالات، الثلاجات، والأنظمة الآلية التي تتطلب أداءً ثابتاً.',
    img: imgAppGears
  }
];

export default function Products({ lang }: { lang: Language }) {
  const t = useTranslation(lang);
  const isRTL = lang === 'ar';
  const [location, setLocation] = useLocation();

  // Handle Query Param Scrolling
  useEffect(() => {
    // Check if URL has ?category=X
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    
    if (category) {
      const element = document.getElementById(category);
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
      }
    } else {
      // Fallback for hash scrolling
      const hash = window.location.hash;
      if (hash) {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 300);
        }
      }
    }
  }, [location]);

  // Group products
  const springs = products.filter(p => p.cat === 'springs');
  const bearings = products.filter(p => p.cat === 'bearings');
  const forming = products.filter(p => p.cat === 'forming');

  const ProductGrid = ({ items }: { items: typeof products }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      {items.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <Card className="hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group border-slate-200 h-full">
            <div className="h-64 bg-white flex items-center justify-center relative overflow-hidden border-b border-slate-100">
              <div className="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img 
                src={p.img} 
                alt={lang === 'en' ? p.name_en : p.name_ar} 
                className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-700 ease-out z-10"
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-bold font-heading text-slate-800">
                    {lang === 'en' ? p.name_en : p.name_ar}
                  </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="flex-1"></div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full font-bold uppercase tracking-wide hover:bg-primary hover:text-white transition-colors cursor-pointer border-slate-300 hover:border-primary group-hover:border-primary/50">
                    <span className="mr-2">{lang === 'en' ? 'View Specs' : 'المواصفات'}</span>
                    <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                  </Button>
                </DialogTrigger>
                <DialogContent className={`max-w-2xl max-h-[90vh] overflow-y-auto ${isRTL ? 'rtl' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-heading font-bold text-primary mb-2 flex items-center gap-2">
                      {lang === 'en' ? p.name_en : p.name_ar}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="mt-4 border rounded-md overflow-hidden">
                    <Table>
                      <TableHeader className="bg-slate-100">
                        <TableRow>
                          <TableHead className={`w-1/3 font-bold text-slate-900 ${isRTL ? 'text-right' : 'text-left'}`}>
                            {lang === 'en' ? 'Specification' : 'المواصفة'}
                          </TableHead>
                          <TableHead className={`font-bold text-slate-900 ${isRTL ? 'text-right' : 'text-left'}`}>
                            {lang === 'en' ? 'Details' : 'التفاصيل'}
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {p.specs.map((spec, idx) => (
                          <TableRow key={idx} className="hover:bg-slate-50">
                            <TableCell className="font-medium text-slate-700 bg-slate-50/50">
                              {lang === 'en' ? spec.label_en : spec.label_ar}
                            </TableCell>
                            <TableCell className="text-slate-600 font-mono text-sm">
                              {lang === 'en' ? spec.value_en : spec.value_ar}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="mt-6 flex justify-end gap-3">
                    <Button variant="outline" onClick={() => window.print()}>
                        {lang === 'en' ? 'Print' : 'طباعة'}
                    </Button>
                    <Button className="bg-primary text-white cursor-pointer hover:bg-primary/90" onClick={() => setLocation(`/${lang}/quote`)}>
                      {lang === 'en' ? 'Request Quote' : 'طلب عرض سعر'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
  
  return (
    <Layout lang={lang}>
      <div className="bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-heading font-bold mb-4 text-slate-900">{t.products.title}</h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              {lang === 'en' ? 'Comprehensive catalog of precision-engineered components.' : 'كتالوج شامل للمكونات الهندسية عالية الدقة.'}
            </p>
          </motion.div>
          
          <div id="springs" className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-slate-300"></div>
              <h2 className="text-3xl font-bold font-heading text-slate-800 uppercase tracking-widest px-4 border border-slate-300 py-2 rounded bg-white">
                {lang === 'en' ? 'Industrial Springs' : 'السوست الصناعية'}
              </h2>
              <div className="h-px flex-1 bg-slate-300"></div>
            </div>
            <ProductGrid items={springs} />
          </div>

          <div id="bearings" className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-slate-300"></div>
              <h2 className="text-3xl font-bold font-heading text-slate-800 uppercase tracking-widest px-4 border border-slate-300 py-2 rounded bg-white">
                {lang === 'en' ? 'Bearings' : 'رولمان بلي'}
              </h2>
              <div className="h-px flex-1 bg-slate-300"></div>
            </div>
            <ProductGrid items={bearings} />
          </div>

          <div id="forming" className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-slate-300"></div>
              <h2 className="text-3xl font-bold font-heading text-slate-800 uppercase tracking-widest px-4 border border-slate-300 py-2 rounded bg-white">
                {lang === 'en' ? 'Metal Forming' : 'تشكيل المعادن'}
              </h2>
              <div className="h-px flex-1 bg-slate-300"></div>
            </div>
            <ProductGrid items={forming} />
          </div>

          {/* Industry Applications Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-20 mb-20"
          >
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px flex-1 bg-slate-300"></div>
              <h2 className="text-3xl font-bold font-heading text-slate-800 uppercase tracking-widest px-4 border border-slate-300 py-2 rounded bg-white">
                {lang === 'en' ? 'Industry Applications' : 'تطبيقات صناعية'}
              </h2>
              <div className="h-px flex-1 bg-slate-300"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {applications.map((app, i) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  className="group relative h-[400px] overflow-hidden rounded-lg shadow-lg"
                >
                  <img 
                    src={app.img} 
                    alt={lang === 'en' ? app.title_en : app.title_ar} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent flex flex-col justify-end p-6 text-white">
                    <h3 className="text-2xl font-bold mb-3 font-heading border-l-4 border-primary pl-3">
                      {lang === 'en' ? app.title_en : app.title_ar}
                    </h3>
                    <p className="text-slate-200 leading-relaxed opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                      {lang === 'en' ? app.desc_en : app.desc_ar}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Industry Standards Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            id="standards" 
            className="mt-20 border-t border-slate-200 pt-16"
          >
            <h2 className="text-3xl font-heading font-bold text-center mb-12">
              {lang === 'en' ? 'Industry Standards & Compliance' : 'معايير الصناعة والامتثال'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-white border-slate-200 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Award className="w-8 h-8 text-primary" />
                    {lang === 'en' ? 'ISO 9001:2015' : 'أيزو ٩٠٠١:٢٠١٥'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 leading-relaxed">
                    {lang === 'en' 
                      ? 'Our manufacturing processes are certified under ISO 9001:2015, ensuring consistent quality management and continuous improvement across all production lines.'
                      : 'عمليات التصنيع لدينا معتمدة بموجب شهادة الأيزو ٩٠٠١:٢٠١٥، مما يضمن إدارة جودة متسقة وتحسين مستمر عبر جميع خطوط الإنتاج.'}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-slate-200 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <ShieldCheck className="w-8 h-8 text-primary" />
                    {lang === 'en' ? 'Product Standards (ISO/DIN)' : 'معايير المنتجات (ISO/DIN)'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4 font-medium">
                    {lang === 'en' ? 'We manufacture according to rigorous global specifications:' : 'نقوم بالتصنيع وفقاً للمواصفات العالمية الصارمة:'}
                  </p>
                  <ul className="list-disc list-inside text-slate-600 space-y-2 ml-2">
                    <li><span className="font-bold text-slate-800">ISO 10243:</span> {lang === 'en' ? 'Standard for Die Springs (Color-coded)' : 'المعيار القياسي لسوست الاسطمبات (المكودة لونياً)'}</li>
                    <li><span className="font-bold text-slate-800">DIN 2093:</span> {lang === 'en' ? 'Disc Springs / Belleville Washers' : 'سوست طبقية / وردات بيلفيل'}</li>
                    <li><span className="font-bold text-slate-800">ASTM A228:</span> {lang === 'en' ? 'Music Wire for high-stress applications' : 'سلك موسيقى للتطبيقات عالية الإجهاد'}</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>

        </div>
      </div>
    </Layout>
  );
}
