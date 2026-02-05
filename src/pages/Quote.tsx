import { Layout } from "@/components/Layout";
import { useTranslation } from "@/lib/i18n";
import type { Language } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Upload, FileCheck, Send, ShieldCheck, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";

export default function Quote({ lang }: { lang: Language }) {
  const t = useTranslation(lang);
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm();
  const [fileName, setFileName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Simulated Quote Submission:", data);
    if (fileName) {
      console.log("Attached File:", fileName);
    }

    toast.success(lang === 'en' ? 'Quote request received! We will contact you shortly.' : 'تم استلام طلب العرض! سنتواصل معك قريباً.');
    reset();
    setFileName(null);
    setIsSubmitting(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <Layout lang={lang}>
      <div className="bg-slate-50 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <h1 className="text-4xl font-heading font-bold text-slate-900 mb-4">{t.quote.title}</h1>
              <p className="text-slate-600 text-lg max-w-xl mx-auto">{t.quote.subtitle}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="shadow-xl border-slate-200 overflow-hidden">
                <div className="h-2 bg-primary w-full" />
                <CardHeader className="bg-white border-b border-slate-100 pb-8">
                  <div className="flex items-center gap-3 justify-center text-slate-400 text-sm mb-2">
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                    <span>{lang === 'en' ? 'Your data is secure and confidential' : 'بياناتك آمنة وسرية'}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    
                    {/* Section 1: Contact Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4">
                        {lang === 'en' ? '1. Contact Information' : '١. بيانات التواصل'}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">{t.contact.name} *</Label>
                          <Input id="name" {...register("name", { required: true })} className={errors.name ? "border-red-500" : ""} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">{lang === 'en' ? 'Company Name' : 'اسم الشركة'}</Label>
                          <Input id="company" {...register("company")} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">{t.contact.email} *</Label>
                          <Input id="email" type="email" {...register("email", { required: true })} className={errors.email ? "border-red-500" : ""} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">{t.contact.phone} *</Label>
                          <Input id="phone" type="tel" {...register("phone", { required: true })} className={errors.phone ? "border-red-500" : ""} />
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Project Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4">
                        {lang === 'en' ? '2. Project Specification' : '٢. تفاصيل المشروع'}
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>{lang === 'en' ? 'Product Category' : 'نوع المنتج'}</Label>
                          <Controller
                            name="category"
                            control={control}
                            defaultValue="springs"
                            render={({ field }) => (
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="springs">{t.products.springs}</SelectItem>
                                  <SelectItem value="bearings">{t.products.bearings}</SelectItem>
                                  <SelectItem value="forming">{t.products.forming}</SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>{lang === 'en' ? 'Material Preference' : 'تفضيل الخامة'}</Label>
                          <Controller
                            name="material"
                            control={control}
                            defaultValue="music_wire"
                            render={({ field }) => (
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Material" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="music_wire">{lang === 'en' ? 'Music Wire (Carbon Steel)' : 'سلك موسيقى (صلب كربوني)'}</SelectItem>
                                  <SelectItem value="stainless">{lang === 'en' ? 'Stainless Steel (302/304/316)' : 'ستانلس ستيل (٣٠٢/٣٠٤/٣١٦)'}</SelectItem>
                                  <SelectItem value="chrome_silicon">{lang === 'en' ? 'Chrome Silicon (Heavy Duty)' : 'كروم سيليكون (خدمة شاقة)'}</SelectItem>
                                  <SelectItem value="oil_tempered">{lang === 'en' ? 'Oil Tempered' : 'صلب معالج بالزيت'}</SelectItem>
                                  <SelectItem value="unsure">{lang === 'en' ? 'Not Sure (Need Advice)' : 'غير متأكد (أحتاج نصيحة)'}</SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="quantity">{lang === 'en' ? 'Estimated Quantity' : 'الكمية التقديرية'}</Label>
                          <Input id="quantity" type="number" {...register("quantity")} placeholder="e.g. 1000" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="deadline">{lang === 'en' ? 'Required Delivery' : 'ميعاد التسليم المطلوب'}</Label>
                          <Input id="deadline" type="date" {...register("deadline")} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">{lang === 'en' ? 'Additional Details / Dimensions' : 'تفاصيل إضافية / الأبعاد'}</Label>
                        <Textarea 
                          id="description" 
                          {...register("description")} 
                          className="h-32" 
                          placeholder={lang === 'en' ? "Please describe your requirements, dimensions, or specific application..." : "يرجى وصف متطلباتك، الأبعاد، أو طبيعة الاستخدام..."}
                        />
                      </div>
                    </div>

                    {/* Section 3: File Upload */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4">
                        {lang === 'en' ? '3. Technical Drawings (Optional)' : '٣. الرسومات الفنية (اختياري)'}
                      </h3>
                      
                      <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:bg-slate-50 transition-colors relative cursor-pointer group">
                        <Input 
                          type="file" 
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                          onChange={handleFileChange}
                          accept=".pdf,.dwg,.dxf,.jpg,.png"
                        />
                        <div className="flex flex-col items-center gap-2 text-slate-500 group-hover:text-primary transition-colors">
                          {fileName ? (
                            <>
                              <FileCheck className="w-10 h-10 text-green-500" />
                              <span className="font-bold text-slate-900">{fileName}</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-10 h-10" />
                              <span className="font-medium">{lang === 'en' ? 'Click to upload CAD files or Drawings' : 'اضغط لرفع ملفات CAD أو الرسومات'}</span>
                              <span className="text-xs text-slate-400">PDF, DWG, DXF, JPG, PNG (Max 10MB)</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 text-lg uppercase tracking-wider shadow-lg disabled:opacity-70 disabled:cursor-not-allowed">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          {lang === 'en' ? 'Sending...' : 'جاري الإرسال...'}
                        </>
                      ) : (
                        <>
                          <Send className={`w-5 h-5 ${lang === 'en' ? 'mr-2' : 'ml-2'}`} />
                          {lang === 'en' ? 'Submit Quote Request' : 'إرسال طلب العرض'}
                        </>
                      )}
                    </Button>

                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
