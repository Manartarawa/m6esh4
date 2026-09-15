"use client";

import { useEffect, useState } from "react";

const translations: Record<string, string> = {
  Explore: "استكشف",
  Creators: "المبدعون",
  Projects: "المشاريع",
  Dashboard: "لوحة التحكم",
  "Sign in": "تسجيل الدخول",
  "Sign up": "إنشاء حساب",
  "Join MESH": "انضم إلى MESH",
  "Post a brief": "أضف موجزاً",
  "Browse creators": "تصفح المبدعين",
  "Creative marketplace": "سوق إبداعي",
  "Where briefs meet the right creative minds.": "حيث تلتقي الموجزات بالعقول الإبداعية المناسبة.",
  "Featured creators": "المبدعون المميزون",
  "Open projects": "المشاريع المفتوحة",
  "Featured projects": "المشاريع المميزة",
  "Selected creative work": "أعمال إبداعية مختارة",
  "Explore projects": "استكشف المشاريع",
  "View all": "عرض الكل",
  "Meet the creators": "تعرّف على المبدعين",
  Categories: "التصنيفات",
  "Search projects": "ابحث في المشاريع",
  "Search explore": "ابحث في الاستكشاف",
  All: "الكل",
  Branding: "الهوية والعلامة التجارية",
  "Graphic Design": "التصميم الجرافيكي",
  "Web Design": "تصميم المواقع",
  "UI/UX": "واجهة وتجربة المستخدم",
  "Motion Graphics": "الرسوم المتحركة",
  Illustration: "الرسم التوضيحي",
  Photography: "التصوير الفوتوغرافي",
  Advertising: "الإعلان",
  Packaging: "التغليف",
  "No projects found": "لم يتم العثور على مشاريع",
  "Try another category or search term.": "جرّب تصنيفاً أو كلمة بحث أخرى.",
  "Creator settings": "إعدادات المبدع",
  "Profile details": "تفاصيل الملف الشخصي",
  "Behance Portfolio Sync": "مزامنة ملف Behance",
  "Sync Behance projects": "مزامنة مشاريع Behance",
  "Sync Behance Now": "مزامنة Behance الآن",
  Portfolio: "ملف الأعمال",
  "Behance sync": "مزامنة Behance",
  "AI powered": "مدعوم بالذكاء الاصطناعي",
  "View project": "عرض المشروع",
  "Make featured": "جعله مميزاً",
  "Remove featured": "إزالة التمييز",
  Hide: "إخفاء",
  Show: "إظهار",
  "Set order": "حفظ الترتيب",
  "Platform settings": "إعدادات المنصة",
  "Behance projects": "مشاريع Behance",
  "All projects": "كل المشاريع",
  "Sign out": "تسجيل الخروج",
  "Save profile": "حفظ الملف الشخصي",
  Continue: "متابعة",
  "Create an account": "إنشاء حساب",
  "New here?": "جديد هنا؟",
  Email: "البريد الإلكتروني",
  Password: "كلمة المرور",
  "Light": "فاتح",
  "Dark": "داكن",
};

function translatePage(language: "en" | "ar") {
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const value = node.nodeValue?.trim();
    if (!value || !node.parentElement || ["SCRIPT", "STYLE"].includes(node.parentElement.tagName)) continue;
    const translated = translations[value];
    if (language === "ar" && translated) node.nodeValue = node.nodeValue?.replace(value, translated) ?? node.nodeValue;
    if (language === "en") {
      const original = Object.entries(translations).find(([, arabic]) => arabic === value)?.[0];
      if (original) node.nodeValue = node.nodeValue?.replace(value, original) ?? node.nodeValue;
    }
  }
  document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea").forEach((element) => {
    const original = element.dataset.meshPlaceholder ?? element.placeholder;
    if (!element.dataset.meshPlaceholder) element.dataset.meshPlaceholder = original;
    const translated = translations[original];
    element.placeholder = language === "ar" && translated ? translated : element.dataset.meshPlaceholder;
  });
}

export function LanguageToggle() {
  const [language, setLanguage] = useState<"en" | "ar">("en");

  useEffect(() => {
    const stored = localStorage.getItem("mesh-language") === "ar" ? "ar" : "en";
    setLanguage(stored);
    translatePage(stored);
    const observer = new MutationObserver(() => translatePage(stored));
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  function toggle() {
    const next = language === "en" ? "ar" : "en";
    setLanguage(next);
    localStorage.setItem("mesh-language", next);
    translatePage(next);
  }

  return (
    <button type="button" className="btn btn-secondary language-toggle px-3 py-2 text-sm" onClick={toggle} aria-label="Change language">
      {language === "en" ? "العربية" : "English"}
    </button>
  );
}
