export type AwardItem = {
  title: string;
  description?: string;
  link?: string;
};

export type CompanyAwards = {
  company: string;
  accent: string;
  emoji: string;
  awards: AwardItem[];
};

export const awardsByCompany: CompanyAwards[] = [
  {
    company: "Brightly",
    accent: "#0f766e",
    emoji: "🏆",
    awards: [
      {
        title: "High Impact New Joiner Award",
        description: "UI Development and micro frontend setup",
        link: "https://drive.google.com/file/d/1mHnhJf1xAIDAgSif1goerDYXfq1VhugQ/view",
      },
      {
        title: "Technical Excellence Award",
        description: "Notification Platform",
        link: "https://drive.google.com/file/d/1DmprcqCC20_nxLSdcMbFNWNSqE64g3pS/view",
      },
    ],
  },
  {
    company: "Paytm",
    accent: "#2563eb",
    emoji: "⭐",
    awards: [
      {
        title: "Rising Star of the Month",
        description: "August 2022",
      },
      {
        title: "Rockstar of the Month",
        description: "November 2023",
      },
    ],
  },
  {
    company: "Perfios",
    accent: "#9333ea",
    emoji: "✨",
    awards: [
      {
        title: "Engaging the Software Component and Operations Process",
        link: "https://drive.google.com/file/d/1uiVEX1HojbxWVgPgNGOPgyVuTRNxY-fL/view",
      },
      {
        title: "New Product Go Live with MediAssist",
        link: "https://drive.google.com/file/d/1MK1O-rKTcIrKlAGUG73eq0dpnWWXkAR1/view",
      },
    ],
  },
];
