import { Link, useLocation } from "wouter";
import { useTranslation } from "@/lib/i18n";
import type { Language } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Globe, Menu, X, ChevronRight, MapPinned, Phone, Mail, User } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import logoImage from "@/assets/images/logo-1.jpg";

interface LayoutProps {
  children: React.ReactNode;
  lang: Language;
}

export function Layout({ children, lang }: LayoutProps) {
  const [location, setLocation] = useLocation();
  const t = useTranslation(lang);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLang = () => {
    const newLang = lang === "en" ? "ar" : "en";
    // Replace the current language prefix in the path
    const newPath = location.replace(`/${lang}`, `/${newLang}`);
    setLocation(newPath);
  };

  const navLinks = [
    { href: "", label: t.nav.home }, // Empty string for root relative to lang
    { href: "products", label: t.nav.products },
    { href: "materials", label: lang === 'en' ? "Materials & Specs" : "الخامات والمواصفات" }, // Added Materials link
    { href: "about", label: t.nav.about },
    { href: "contact", label: t.nav.contact },
    { href: "quote", label: "Get a Quote", highlight: true }
  ];

  // Helper to generate correct paths: /en/products, /ar/about, etc.
  const getPath = (href: string) => {
     return href === "" ? `/${lang}` : `/${lang}/${href}`;
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans ${lang === 'ar' ? 'font-arabic' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Top Bar */}
      <div className="bg-slate-900 text-slate-300 py-2 text-xs border-b border-slate-800 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-6">
            <span className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
              ISO 9001:2015 Certified
            </span>
            <span className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
              Leading Spring Manufacturer in Egypt
            </span>
          </div>
          <div className="flex gap-6">
             <Link href={`/${lang}/dashboard`}>
               <a className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer text-white font-bold bg-white/10 px-3 py-0.5 rounded-sm">
                 <User className="w-3 h-3" />
                 {lang === 'en' ? 'Client Dashboard' : 'حساب العميل'}
               </a>
             </Link>
             <a href="mailto:info@egyspring.com" className="hover:text-primary transition-colors">info@egyspring.com</a>
             <a href="tel:+201050215333" className="hover:text-primary transition-colors" dir="ltr">+20 10 5021 5333</a>
          </div>
        </div>
      </div>

      <header 
        className={cn(
          "sticky top-0 z-50 transition-all duration-300 border-b border-transparent",
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-md border-slate-100 py-2" : "bg-white py-4"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href={`/${lang}`} className="relative group">
            <div className="flex items-center gap-3">
              <img 
                src={logoImage} 
                alt="EGYSPRING" 
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="hidden lg:block">
                 <h1 className="text-xl font-black tracking-tighter text-slate-900 leading-none">EGYSPRING</h1>
                 <p className="text-[10px] text-slate-500 font-medium tracking-widest uppercase">Precision Engineering</p>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const fullPath = getPath(link.href);
              const isActive = location === fullPath || (link.href === "" && location === `/${lang}`);
              
              return (
                <Link key={link.href} href={fullPath}>
                  <a className={cn(
                    "px-4 py-2 rounded-full text-sm font-bold transition-all duration-300",
                    isActive 
                      ? "text-primary bg-primary/5" 
                      : link.highlight 
                        ? "bg-primary text-white hover:bg-primary/90 ml-4 shadow-lg shadow-primary/20 hover:shadow-primary/40"
                        : "text-slate-600 hover:text-primary hover:bg-slate-50"
                  )}>
                    {link.label}
                  </a>
                </Link>
              );
            })}
            
            <div className="w-px h-6 bg-slate-200 mx-2" />

            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleLang}
              className="font-bold text-slate-600 hover:text-primary hover:bg-slate-50 rounded-full px-3"
            >
              <Globe className="h-4 w-4 mr-2" />
              {lang === "en" ? "AR" : "EN"}
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600 hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => {
                 const fullPath = getPath(link.href);
                 const isActive = location === fullPath;
                 return (
                  <Link key={link.href} href={fullPath}>
                    <a 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "block px-4 py-3 rounded-lg text-sm font-bold transition-colors",
                        isActive 
                          ? "bg-primary/5 text-primary" 
                          : link.highlight
                            ? "bg-primary text-white text-center mt-2"
                            : "text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      {link.label}
                    </a>
                  </Link>
                 );
              })}
              
              <Link href={`/${lang}/dashboard`}>
                <a 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 border-t border-slate-100 mt-2"
                >
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {lang === 'en' ? 'Client Dashboard' : 'حساب العميل'}
                  </div>
                </a>
              </Link>

              <div className="h-px bg-slate-100 my-2" />
              <button 
                onClick={() => { toggleLang(); setIsMobileMenuOpen(false); }}
                className="flex items-center justify-center gap-2 w-full py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-lg"
              >
                <Globe className="h-4 w-4" />
                {lang === "en" ? "Switch to Arabic" : "Switch to English"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 pt-0">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-white p-2 rounded-lg">
                  <img src={logoImage} alt="EGYSPRING" className="h-8 w-auto" />
                </div>
                <span className="text-2xl font-black text-white tracking-tighter">EGYSPRING</span>
              </div>
              <p className="text-slate-400 mb-8 max-w-md leading-relaxed">
                {lang === 'en' 
                  ? "Egypt's premier manufacturer of precision springs and wire forms. Delivering engineering excellence since 2010." 
                  : "الشركة المصنعة الأولى في مصر للنوابض الدقيقة وتشكيلات الأسلاك. نقدم التميز الهندسي منذ عام 2010."}
              </p>
              <div className="flex gap-4">
                {/* Social Links Placeholder */}
                <a href="https://www.facebook.com/share/1874wnEZb1/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                </a>
                <a href="https://www.instagram.com/egy.spring?igsh=MXBkZ2VxNDVqczY2aA==" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.416 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.047 1.407-.06 3.808-.06zm0-2c-2.739 0-3.054.01-4.122.06-1.065.05-1.79.217-2.428.465-1.502.582-2.669 1.749-3.25 3.25-.248.637-.415 1.363-.465 2.428C2.013 7.254 2 7.569 2 10.315v.63c0 2.739.01 3.054.06 4.122.05 1.065.217 1.79.465 2.428.581 1.502 1.749 2.669 3.25 3.25.637.248 1.363.415 2.428.465 1.068.049 1.383.06 4.122.06h.63c2.739 0 3.054-.01 4.122-.06 1.065-.05 1.79-.217 2.428-.465 1.502-.581 2.669-1.749 3.25-3.25.248-.637.415-1.363.465-2.428.049-1.068.06-1.383.06-4.122v-.63c0-2.739-.01-3.054-.06-4.122-.05-1.065-.217-1.79-.465-2.428a9.04 9.04 0 00-3.25-3.25c-.637-.248-1.363-.415-2.428-.465C15.369 2.013 15.054 2 12.315 2z" clipRule="evenodd" /></svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-white mb-6 font-heading">{t.nav.products}</h3>
              <ul className="space-y-4 text-sm">
                <li><Link href={`/${lang}/products?category=compression`}><a className="hover:text-primary transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-primary" />Compression Springs</a></Link></li>
                <li><Link href={`/${lang}/products?category=extension`}><a className="hover:text-primary transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-primary" />Extension Springs</a></Link></li>
                <li><Link href={`/${lang}/products?category=torsion`}><a className="hover:text-primary transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-primary" />Torsion Springs</a></Link></li>
                <li><Link href={`/${lang}/products?category=wireforms`}><a className="hover:text-primary transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-primary" />Wire Forms</a></Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-6 font-heading">{t.nav.contact}</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                   <MapPinned className="w-5 h-5 text-primary shrink-0" />
                   <span className="leading-relaxed">Industrial Zone, 10th of Ramadan City, Egypt</span>
                </li>
                <li className="flex items-center gap-3">
                   <Phone className="w-5 h-5 text-primary shrink-0" />
                   <a href="tel:+201050215333" className="hover:text-primary transition-colors" dir="ltr">+20 10 5021 5333</a>
                </li>
                <li className="flex items-center gap-3">
                   <Mail className="w-5 h-5 text-primary shrink-0" />
                   <a href="mailto:info@egyspring.com" className="hover:text-primary transition-colors">info@egyspring.com</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p>&copy; {new Date().getFullYear()} EGYSPRING. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
