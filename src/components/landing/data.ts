/**
 * Static landing-page content (navigation, footer links).
 * This is site copy, not backend data — anything the backend owns lives in
 * src/mocks/data.ts and is loaded through src/services + src/hooks.
 */
/** `to` = page inside the app, `href` = phone/email/#section link, neither = plain text */
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
      { label: "Multi-Store Controls", to: "/info/multi-store-controls" },
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
      { label: "About", to: "/info/about" },
      { label: "Security", to: "/info/security" },
      { label: "Grocery Case Studies", to: "/info/grocery-case-studies" },
      { label: "Retail Contact", to: "/info/retail-contact" },
    ],
  },
];

/** Pages behind the footer links, shown by pages/InfoPage.tsx at /info/:slug */
export type InfoPageContent = { title: string; subtitle: string; body: string[] };

export const infoPages: Record<string, InfoPageContent> = {
  "system-outages": {
    title: "System Outages",
    subtitle: "Planned maintenance and outage notices for SIMS are posted here.",
    body: [
      "If SIMS is slow or unavailable at your store, check with your store manager first, then contact IT Support.",
      "Have the store branch, the time the problem started, and any error message ready when you call.",
    ],
  },
  "multi-store-controls": {
    title: "Multi-Store Controls",
    subtitle: "SIMS keeps inventory, suppliers and reports for every branch in one place.",
    body: [
      "Managers can review stock levels, expiring batches and supplier activity per branch from the dashboard.",
      "Access to other branches depends on your role. Ask IT Support if you need access to another store.",
    ],
  },
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
  security: {
    title: "Security",
    subtitle: "SIMS is used only by authorized supermarket staff.",
    body: [
      "Sign in with your own Employee ID and never share your password.",
      'Only check "Trust this station" on store terminals, not on personal or shared devices.',
      "Report a lost badge or suspicious activity to IT Support right away.",
    ],
  },
  "grocery-case-studies": {
    title: "Grocery Case Studies",
    subtitle: "How stores use SIMS to cut manual work and reduce waste.",
    body: [
      "Expiration tracking helps staff move items that are close to their expiry date before they go to waste.",
      "Low-stock alerts and supplier history make purchase orders faster to prepare.",
    ],
  },
  "retail-contact": {
    title: "Retail Contact",
    subtitle: "For supplier, partnership and store operations concerns.",
    body: [
      "Email itsupport@sims.com.ph and include your store branch and the nature of your concern.",
      "For urgent system issues, call the IT Support Hotline at 02-8635-0751.",
    ],
  },
};