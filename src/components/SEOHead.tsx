import { useEffect } from "react";
import type { Language } from "@/lib/i18n";

interface SEOHeadProps {
  title: string;
  description: string;
  lang: Language;
  canonicalPath?: string;
  schema?: object;
}

export function SEOHead({ title, description, lang, canonicalPath = "", schema }: SEOHeadProps) {
  const baseUrl = "https://egyspring.com"; // Production domain assumption
  const alternateLang = lang === 'en' ? 'ar' : 'en';
  
  // Construct URLs
  const currentUrl = `${baseUrl}/${lang}${canonicalPath}`;
  const alternateUrl = `${baseUrl}/${alternateLang}${canonicalPath}`;

  useEffect(() => {
    // Update Title
    document.title = `${title} | EGYSPRING`;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update/Add Hreflang tags (Dynamic injection for SPA is tricky, but good for Googlebot rendering)
    const updateLink = (rel: string, href: string, hreflang?: string) => {
      let link = document.querySelector(`link[rel="${rel}"]${hreflang ? `[hreflang="${hreflang}"]` : ''}`) as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        if (hreflang) link.setAttribute('hreflang', hreflang);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    updateLink('canonical', currentUrl);
    updateLink('alternate', currentUrl, lang === 'en' ? 'en-eg' : 'ar-eg');
    updateLink('alternate', alternateUrl, lang === 'en' ? 'ar-eg' : 'en-eg');
    
    // Inject Schema
    if (schema) {
      let script = document.querySelector('#json-ld-schema');
      if (!script) {
        script = document.createElement('script');
        script.id = 'json-ld-schema';
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    }

  }, [title, description, lang, currentUrl, alternateUrl, schema]);

  return null; // Logic only
}
