import { Layout } from "@/components/Layout";
import { useState } from "react";
import type { Language } from "@/lib/i18n";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Info, Download, Calculator, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Data for Tensile Strength vs Wire Diameter
const tensileData = [
  { diameter: 0.5, music_wire: 2800, stainless_302: 2400, chrome_silicon: 2100, oil_tempered: 1900 },
  { diameter: 1.0, music_wire: 2600, stainless_302: 2200, chrome_silicon: 2050, oil_tempered: 1850 },
  { diameter: 2.0, music_wire: 2300, stainless_302: 1900, chrome_silicon: 1950, oil_tempered: 1700 },
  { diameter: 3.0, music_wire: 2100, stainless_302: 1750, chrome_silicon: 1900, oil_tempered: 1600 },
  { diameter: 5.0, music_wire: 1900, stainless_302: 1500, chrome_silicon: 1800, oil_tempered: 1500 },
  { diameter: 8.0, music_wire: 1700, stainless_302: 1300, chrome_silicon: 1700, oil_tempered: 1400 },
];

// Data for Max Operating Temp
const tempData = [
  { name: 'Music Wire (A228)', temp: 120, fill: '#8884d8' },
  { name: 'Stainless (302/304)', temp: 260, fill: '#82ca9d' },
  { name: 'Chrome Silicon (A401)', temp: 245, fill: '#ffc658' },
  { name: 'Inconel X-750', temp: 650, fill: '#ff7300' },
  { name: 'Phosphor Bronze', temp: 95, fill: '#0088fe' },
];

// Data for Durability & Corrosion (Score 1-10)
const durabilityData = [
  { name: 'Music Wire', fatigue: 9, corrosion: 2 },
  { name: 'Stainless 302', fatigue: 7, corrosion: 9 },
  { name: 'Chrome Silicon', fatigue: 8, corrosion: 3 },
  { name: 'Inconel X-750', fatigue: 8, corrosion: 10 },
  { name: 'Phosphor Bronze', fatigue: 6, corrosion: 8 },
  { name: 'Oil Tempered', fatigue: 5, corrosion: 2 },
];

export default function Materials({ lang }: { lang: Language }) {
  const isRTL = lang === 'ar';
  
  // Calculator State
  const [wireDia, setWireDia] = useState('');
  const [outerDia, setOuterDia] = useState('');
  const [activeCoils, setActiveCoils] = useState('');
  const [material, setMaterial] = useState('music_wire');
  const [calcResult, setCalcResult] = useState<number | null>(null);

  const calculateRate = () => {
    const d = parseFloat(wireDia);
    const OD = parseFloat(outerDia);
    const n = parseFloat(activeCoils);
    
    if (isNaN(d) || isNaN(OD) || isNaN(n) || d <= 0 || OD <= 0 || n <= 0) return;
    if (d >= OD) return; // Physical impossibility

    const D = OD - d; // Mean Diameter
    
    // Shear Modulus (G) in MPa (N/mm^2)
    const materials: Record<string, number> = {
      music_wire: 79300,
      stainless: 69000,
      chrome_silicon: 77200,
      oil_tempered: 79300,
      phosphor_bronze: 41400
    };
    
    const G = materials[material] || 79300;
    
    // Rate k = (G * d^4) / (8 * D^3 * n)
    const k = (G * Math.pow(d, 4)) / (8 * Math.pow(D, 3) * n);
    setCalcResult(k);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(210, 0, 0); // EGYSPRING Red
    doc.text("EGYSPRING", 14, 20);
    
    doc.setFontSize(14);
    doc.setTextColor(40);
    doc.text("Technical Material Specifications", 14, 30);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Generated on: " + new Date().toLocaleDateString(), 14, 38);

    // Section 1: Tensile Strength
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text("1. Tensile Strength (MPa) vs Wire Diameter", 14, 50);
    
    const tensileBody = tensileData.map(row => [
      row.diameter, 
      row.music_wire, 
      row.stainless_302, 
      row.chrome_silicon, 
      row.oil_tempered
    ]);

    autoTable(doc, {
      startY: 55,
      head: [['Dia (mm)', 'Music Wire', 'Stainless 302', 'Chrome Si', 'Oil Tempered']],
      body: tensileBody,
      theme: 'striped',
      headStyles: { fillColor: [40, 40, 40] },
    });

    // Section 2: Temperature Resistance
    let currentY = (doc as any).lastAutoTable.finalY + 15;
    doc.text("2. Max Operating Temperature (°C)", 14, currentY);
    
    const tempBody = tempData.map(row => [row.name, row.temp + "°C"]);
    
    autoTable(doc, {
      startY: currentY + 5,
      head: [['Material', 'Max Temp']],
      body: tempBody,
      theme: 'grid',
      headStyles: { fillColor: [80, 80, 80] },
    });

    // Section 3: Durability Ratings
    currentY = (doc as any).lastAutoTable.finalY + 15;
    doc.text("3. Durability & Corrosion Ratings (1-10)", 14, currentY);
    
    const duraBody = durabilityData.map(row => [row.name, row.fatigue, row.corrosion]);
    
    autoTable(doc, {
      startY: currentY + 5,
      head: [['Material', 'Fatigue Life', 'Corrosion Res.']],
      body: duraBody,
      theme: 'grid',
      headStyles: { fillColor: [80, 80, 80] },
    });

    // Footer
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text("Contact EGYSPRING: info@egyspring.com | +20 10 5021 5333", 14, pageHeight - 10);

    doc.save("egyspring-material-specs.pdf");
  };

  return (
    <Layout lang={lang}>
      <div className="bg-slate-50 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <div>
                <h1 className="text-4xl font-heading font-bold text-center md:text-left">
                  {lang === 'en' ? 'Material Comparison' : 'مقارنة الخامات'}
                </h1>
                <p className="text-slate-600 mt-2 text-center md:text-left max-w-xl">
                  {lang === 'en' 
                    ? 'Technical data for spring engineering and selection.'
                    : 'البيانات الفنية لهندسة واختيار السوست.'}
                </p>
              </div>
              <Button onClick={handleDownloadPDF} className="gap-2 bg-slate-900 hover:bg-slate-800">
                <Download className="w-4 h-4" />
                {lang === 'en' ? 'Download PDF Report' : 'تحميل التقرير (PDF)'}
              </Button>
            </div>

            <Tabs defaultValue="strength" className="space-y-8" dir={isRTL ? 'rtl' : 'ltr'}>
              <TabsList className="grid w-full grid-cols-3 lg:w-[600px] mx-auto">
                <TabsTrigger value="strength">
                  {lang === 'en' ? 'Tensile Strength' : 'قوة الشد'}
                </TabsTrigger>
                <TabsTrigger value="temp">
                  {lang === 'en' ? 'Temperature' : 'الحرارة'}
                </TabsTrigger>
                <TabsTrigger value="durability">
                  {lang === 'en' ? 'Durability' : 'المتانة'}
                </TabsTrigger>
                <TabsTrigger value="calculator" className="gap-2">
                  <Calculator className="w-4 h-4" />
                  {lang === 'en' ? 'Rate Calculator' : 'حاسبة القوة'}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="strength">
                <Card>
                  <CardHeader>
                    <CardTitle>{lang === 'en' ? 'Tensile Strength vs Wire Diameter' : 'قوة الشد مقابل قطر السلك'}</CardTitle>
                    <CardDescription>
                      {lang === 'en' 
                        ? 'Showing approximate tensile strength (MPa) as wire diameter increases. Higher values mean stronger springs capable of higher loads.' 
                        : 'يوضح قوة الشد التقريبية (ميجا باسكال) مع زيادة قطر السلك. القيم الأعلى تعني سوست أقوى قادرة على تحمل أحمال أعلى.'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={tensileData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="diameter" 
                          label={{ value: lang === 'en' ? 'Wire Diameter (mm)' : 'قطر السلك (مم)', position: 'insideBottom', offset: -5 }} 
                        />
                        <YAxis 
                          label={{ value: 'MPa', angle: -90, position: 'insideLeft' }} 
                        />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="music_wire" name="Music Wire (A228)" stroke="#8884d8" strokeWidth={2} />
                        <Line type="monotone" dataKey="chrome_silicon" name="Chrome Silicon (A401)" stroke="#ffc658" strokeWidth={2} />
                        <Line type="monotone" dataKey="stainless_302" name="Stainless Steel (302)" stroke="#82ca9d" strokeWidth={2} />
                        <Line type="monotone" dataKey="oil_tempered" name="Oil Tempered (A229)" stroke="#ff7300" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="temp">
                <Card>
                  <CardHeader>
                    <CardTitle>{lang === 'en' ? 'Maximum Operating Temperature' : 'أقصى درجة حرارة للتشغيل'}</CardTitle>
                    <CardDescription>
                      {lang === 'en'
                        ? 'Comparison of heat resistance for common spring materials. For high-heat environments (>200°C), specialized alloys like Inconel are required.'
                        : 'مقارنة مقاومة الحرارة لخامات السوست الشائعة. للبيئات عالية الحرارة (>٢٠٠ درجة مئوية)، يلزم استخدام سبائك متخصصة مثل الإنكونيل.'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={tempData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" width={150} />
                        <Tooltip cursor={{ fill: 'transparent' }} />
                        <Legend />
                        <Bar dataKey="temp" name={lang === 'en' ? 'Max Temp (°C)' : 'أقصى حرارة (مْ)'} fill="#8884d8" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="durability">
                <Card>
                  <CardHeader>
                    <CardTitle>{lang === 'en' ? 'Durability & Corrosion Resistance' : 'المتانة ومقاومة التآكل'}</CardTitle>
                    <CardDescription>
                      {lang === 'en'
                        ? 'Comparative score (1-10) for Fatigue Life (Durability) and Corrosion Resistance. Higher is better.'
                        : 'درجة مقارنة (١-١٠) لعمر التعب (المتانة) ومقاومة التآكل. القيمة الأعلى هي الأفضل.'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={durabilityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 10]} label={{ value: 'Score (1-10)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip cursor={{ fill: 'transparent' }} />
                        <Legend />
                        <Bar dataKey="fatigue" name={lang === 'en' ? 'Fatigue Life' : 'عمر التعب'} fill="#82ca9d" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="corrosion" name={lang === 'en' ? 'Corrosion Resistance' : 'مقاومة التآكل'} fill="#ff7300" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="calculator">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="w-6 h-6 text-primary" />
                      {lang === 'en' ? 'Spring Rate Calculator' : 'حاسبة معدل السوستة'}
                    </CardTitle>
                    <CardDescription>
                      {lang === 'en'
                        ? 'Calculate the spring rate (stiffness) based on dimensions and material properties.'
                        : 'احسب معدل السوستة (الصلابة) بناءً على الأبعاد وخصائص الخامة.'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="material">{lang === 'en' ? 'Wire Material' : 'خامة السلك'}</Label>
                            <select 
                              id="material" 
                              value={material}
                              onChange={(e) => setMaterial(e.target.value)}
                              className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <option value="music_wire">{lang === 'en' ? 'Music Wire / Carbon Steel' : 'سلك موسيقى / صلب كربوني'}</option>
                              <option value="stainless">{lang === 'en' ? 'Stainless Steel (302/304)' : 'ستانلس ستيل (٣٠٢/٣٠٤)'}</option>
                              <option value="chrome_silicon">{lang === 'en' ? 'Chrome Silicon' : 'كروم سيليكون'}</option>
                              <option value="oil_tempered">{lang === 'en' ? 'Oil Tempered' : 'صلب معالج بالزيت'}</option>
                              <option value="phosphor_bronze">{lang === 'en' ? 'Phosphor Bronze' : 'فوسفور برونز'}</option>
                            </select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="wireDia">{lang === 'en' ? 'Wire Diameter (d) [mm]' : 'قطر السلك (d) [مم]'}</Label>
                            <Input 
                              id="wireDia" 
                              type="number" 
                              placeholder="e.g. 2.0" 
                              value={wireDia}
                              onChange={(e) => setWireDia(e.target.value)}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="outerDia">{lang === 'en' ? 'Outer Diameter (OD) [mm]' : 'القطر الخارجي (OD) [مم]'}</Label>
                            <Input 
                              id="outerDia" 
                              type="number" 
                              placeholder="e.g. 20.0" 
                              value={outerDia}
                              onChange={(e) => setOuterDia(e.target.value)}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="coils">{lang === 'en' ? 'Active Coils (n)' : 'عدد الحلقات الفعالة (n)'}</Label>
                            <Input 
                              id="coils" 
                              type="number" 
                              placeholder="e.g. 10" 
                              value={activeCoils}
                              onChange={(e) => setActiveCoils(e.target.value)}
                            />
                          </div>
                        </div>

                        <Button onClick={calculateRate} className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 text-lg">
                          <RefreshCw className="w-5 h-5 mr-2" />
                          {lang === 'en' ? 'Calculate Rate' : 'احسب المعدل'}
                        </Button>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-8 flex flex-col items-center justify-center text-center border border-slate-200">
                        <h3 className="text-slate-500 font-medium uppercase tracking-widest mb-4">
                          {lang === 'en' ? 'Calculated Spring Rate' : 'معدل السوستة المحسوب'}
                        </h3>
                        {calcResult !== null ? (
                          <div className="space-y-2">
                            <div className="text-6xl font-bold font-heading text-primary">
                              {calcResult.toFixed(2)}
                              <span className="text-2xl text-slate-400 ml-2 font-normal">N/mm</span>
                            </div>
                            <div className="text-xl text-slate-400 font-mono">
                              ≈ {(calcResult * 0.10197).toFixed(3)} kg/mm
                            </div>
                          </div>
                        ) : (
                          <div className="text-slate-300">
                            <Calculator className="w-24 h-24 mx-auto mb-4 opacity-20" />
                            <p>{lang === 'en' ? 'Enter dimensions to see result' : 'أدخل الأبعاد لرؤية النتيجة'}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="mt-12">
              <Alert className="bg-primary/5 border-primary/20">
                <Info className="h-4 w-4 text-primary" />
                <AlertTitle className="text-primary font-bold">{lang === 'en' ? 'Need Engineering Advice?' : 'هل تحتاج مساعدة هندسية؟'}</AlertTitle>
                <AlertDescription className="text-slate-600">
                  {lang === 'en' 
                    ? 'Choosing the right material is critical for spring life and performance. Our engineering team can help you select the optimal alloy for your specific load and environment.' 
                    : 'اختيار الخامة المناسبة أمر بالغ الأهمية لعمر وأداء السوستة. يمكن لفريقنا الهندسي مساعدتك في اختيار السبيكة المثلى لحملك وبيئتك المحددة.'}
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
