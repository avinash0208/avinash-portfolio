export const supportedLocales = ["en", "hi"] as const;

export type Locale = (typeof supportedLocales)[number];

export const defaultLocale: Locale = "en";

export function isSupportedLocale(value: string): value is Locale {
  return supportedLocales.includes(value as Locale);
}

type Messages = {
  nav: {
    home: string;
    lab: string;
    blog: string;
  };
  home: {
    badge: string;
    intro: string;
    focusTitle: string;
    focusBody: string;
    exploreLab: string;
    readBlogs: string;
    pushTitle: string;
  };
  lab: {
    badge: string;
    title: string;
    body: string;
    back: string;
  };
  blog: {
    badge: string;
    title: string;
    body: string;
    back: string;
    readPost: string;
  };
};

export const messages: Record<Locale, Messages> = {
  en: {
    nav: {
      home: "Home",
      lab: "Lab",
      blog: "Blog",
    },
    home: {
      badge: "Portfolio v1",
      intro:
        "Senior Frontend Engineer with 7+ years building web products across domains. This portfolio showcases architecture depth, quality practices, and modern frontend techniques.",
      focusTitle: "Engineering Focus Areas",
      focusBody:
        "SSR and CSR composition, accessibility, localization, service workers with push notifications, and production-grade delivery.",
      exploreLab: "Explore Lab",
      readBlogs: "Read Blogs",
      pushTitle: "Push Notifications",
    },
    lab: {
      badge: "Frontend Lab",
      title: "CSR Interactive Demos + LLD",
      body: "This lab showcases focused client-side interaction patterns with concise low-level design notes to explain architecture and state decisions.",
      back: "Back to Home",
    },
    blog: {
      badge: "Blog",
      title: "MDX Engineering Notes",
      body: "Long-form technical writing on architecture, performance, accessibility, and frontend platform practices.",
      back: "Back to Home",
      readPost: "Read post",
    },
  },
  hi: {
    nav: {
      home: "होम",
      lab: "लैब",
      blog: "ब्लॉग",
    },
    home: {
      badge: "पोर्टफोलियो v1",
      intro:
        "7+ वर्षों के अनुभव के साथ सीनियर फ्रंटएंड इंजीनियर। यह पोर्टफोलियो आर्किटेक्चर गहराई, क्वालिटी प्रैक्टिस और आधुनिक फ्रंटएंड तकनीकों को दिखाता है।",
      focusTitle: "इंजीनियरिंग फोकस एरिया",
      focusBody:
        "SSR और CSR संयोजन, एक्सेसिबिलिटी, लोकलाइजेशन, सर्विस वर्कर के साथ पुश नोटिफिकेशन, और प्रोडक्शन-ग्रेड डिलीवरी।",
      exploreLab: "लैब देखें",
      readBlogs: "ब्लॉग पढ़ें",
      pushTitle: "पुश नोटिफिकेशन",
    },
    lab: {
      badge: "फ्रंटएंड लैब",
      title: "CSR इंटरएक्टिव डेमो + LLD",
      body: "यह लैब क्लाइंट-साइड इंटरएक्शन पैटर्न और लो-लेवल डिजाइन नोट्स के साथ आर्किटेक्चर निर्णयों को प्रदर्शित करती है।",
      back: "होम पर जाएं",
    },
    blog: {
      badge: "ब्लॉग",
      title: "MDX इंजीनियरिंग नोट्स",
      body: "आर्किटेक्चर, परफॉर्मेंस, एक्सेसिबिलिटी और फ्रंटएंड प्लेटफॉर्म प्रैक्टिस पर विस्तृत लेख।",
      back: "होम पर जाएं",
      readPost: "पोस्ट पढ़ें",
    },
  },
};

export function getMessages(locale: Locale) {
  return messages[locale];
}
