// src/lib/i18n.ts
export type Language = 'en' | 'ar';

export const translations = {
  en: {
    nav: {
      home: 'Home',
      products: 'Products',
      services: 'Services',
      about: 'About Us',
      contact: 'Contact',
      resources: 'Materials & Specs',
      quote: 'Request Quote',
    },
    hero: {
      title: 'Precision Industrial Springs & Bearings',
      subtitle: '30+ Years of Manufacturing Excellence in Egypt. ISO Certified.',
      cta_primary: 'View Products',
      cta_secondary: 'Contact Us',
    },
    products: {
      title: 'Our Products',
      springs: 'Springs',
      bearings: 'Bearings',
      forming: 'Metal Forming',
    },
    about: {
      title: 'About EGYSPRING',
      story_title: '30 Years of Excellence',
      story_text: 'Founded in 1990 by Engineer Wahba Al-Jamal, EGYSPRING has grown from a local workshop to Egypt’s leading manufacturer of industrial springs and bearings. We combine traditional craftsmanship with modern CNC technology.',
      mission_title: 'Our Mission',
      mission_text: 'To support Egyptian industry with high-quality, locally manufactured components that meet international standards (ISO 9001).',
    },
    contact: {
      title: 'Contact Us',
      form_title: 'Send us a message',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      message: 'Message',
      submit: 'Send Message',
      address_title: 'Factory Location',
      address: 'Plot IA, Industrial Zone B1, 10th of Ramadan City, Sharqia Governorate, Egypt (near Al-Mokhbitin Mosque)',
      hours: 'Sun - Thu: 9:00 AM - 5:00 PM',
    },
    quote: {
      title: 'Request a Quote',
      subtitle: 'Tell us about your project requirements. Our engineering team will review your specifications and provide a detailed cost estimate within 24 hours.',
    },
    footer: {
      rights: 'All rights reserved EGYSPRING © 2026',
      location: '10th of Ramadan City, Egypt',
    }
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      products: 'منتجاتنا',
      services: 'خدماتنا',
      about: 'من نحن',
      contact: 'اتصل بنا',
      resources: 'الخامات والمواصفات',
      quote: 'طلب عرض سعر',
    },
    hero: {
      title: 'تصنيع سوست ويايات صناعية بدقة عالية',
      subtitle: 'أكثر من ٣٠ عاماً من الخبرة في الصناعة المصرية. حاصلون على شهادة الأيزو.',
      cta_primary: 'تصفح المنتجات',
      cta_secondary: 'تواصل معنا',
    },
    products: {
      title: 'منتجاتنا',
      springs: 'سوست ويايات',
      bearings: 'رولمان بلي',
      forming: 'تشكيل معادن',
    },
    about: {
      title: 'عن الشركة',
      story_title: '٣٠ عاماً من التميز',
      story_text: 'تأسست الشركة المصرية للسوست واليايات في عام ١٩٩٠ على يد المهندس وهبة الجمل، ونمت لتصبح المصنع الرائد في مصر للسوست الصناعية ورولمان البلي. نجمع بين الحرفية التقليدية وتكنولوجيا CNC الحديثة.',
      mission_title: 'مهمتنا',
      mission_text: 'دعم الصناعة المصرية بمكونات عالية الجودة مُصنعة محلياً تطابق المعايير العالمية (أيزو ٩٠٠١).',
    },
    contact: {
      title: 'اتصل بنا',
      form_title: 'أرسل لنا رسالة',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      message: 'الرسالة',
      submit: 'إرسال الرسالة',
      address_title: 'موقع المصنع',
      address: 'القطعة IA، المنطقة الصناعية B1، مدينة العاشر من رمضان، محافظة الشرقية، مصر (بجوار مسجد المخبتين)',
      hours: 'الأحد - الخميس: ٩:٠٠ ص - ٥:٠٠ م',
    },
    quote: {
      title: 'طلب عرض سعر',
      subtitle: 'أخبرنا عن متطلبات مشروعك. سيقوم فريقنا الهندسي بمراجعة مواصفاتك وتقديم تقدير تفصيلي للتكلفة في غضون ٢٤ ساعة.',
    },
    footer: {
      rights: 'جميع الحقوق محفوظة للشركة المصرية للسوست واليايات © ٢٠٢٦',
      location: 'مدينة العاشر من رمضان، مصر',
    }
  }
};

export const useTranslation = (lang: Language) => {
  return translations[lang];
};
