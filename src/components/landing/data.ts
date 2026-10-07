/**
 * Static landing-page content (navigation, footer links).
 * This is site copy, not backend data — anything the backend owns lives in
 * src/mocks/data.ts and is loaded through src/services + src/hooks.
 */
/** `to` = page inside the app, `href` = phone/email/#section/outside-site link, neither = plain text */
export type NavLink = { label: string; to?: string; href?: string };

export const navLinks: NavLink[] = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/info/about" },
  { label: "Help", href: "#help" },
];

export type FooterColumn = { title: string; links: NavLink[] };

export const footerColumns: FooterColumn[] = [
  {
    title: "Need Assistance ?",
    links: [
      { label: "System Outages", to: "/info/system-outages" },
      {
        label: "Multi-Store Controls",
        href: "https://www.robinsonssupermarket.com.ph/find-a-store",
      },
    ],
  },
  {
    title: "Contact IT & Support",
    links: [
      { label: "IT Support Hotline: 02-8635-0751", href: "tel:0286350751" },
      { label: "Support Mobile: +63-917-555-4877", href: "tel:+639175554877" },
      { label: "IT Helpdesk Email: itsupport@sims.com.ph", href: "mailto:itsupport@sims.com.ph" },
      { label: "Service Hours: 24/7 Operations Support", to: "/info/contact-support" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "https://www.robinsonssupermarket.com.ph/our-company" },
      { label: "Security", href: "https://www.robinsonssupermarket.com.ph/privacy-policy" },
      { label: "Grocery Case Studies", href: "https://www.robinsonssupermarket.com.ph/news-and-press" },
      { label: "Retail Contact", href: "https://www.robinsonssupermarket.com.ph/talk-to-us" },
    ],
  },
];

/** Pages behind the footer links, shown by pages/InfoPage.tsx at /info/:slug */
export type InfoPageContent = { title: string; subtitle: string; body: string[] };

export const infoPages: Record<string, InfoPageContent> = {
  "contact-support": {
    title: "Contact Support",
    subtitle: "IT Support is available 24/7 for store operations.",
    body: [
      "Call the IT Support Hotline at 02-8635-0751 or the Support Mobile at +63-917-555-4877.",
      "Email itsupport@sims.com.ph with your store branch, Employee ID and a short description of the problem.",
    ],
  },
  about: {
    title: "About",
    subtitle: "SIMS is the inventory management system for our supermarket branches.",
    body: [
      "Inspired by the legacy of Robinsons Supermarket, SIMS helps bring fresh, healthy and high-quality choices to every household.",
      "It connects the warehouse floor to the retail shelves, so staff can track stock, expiring items and suppliers in one place.",
    ],
  },
};