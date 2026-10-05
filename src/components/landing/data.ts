/**
 * Static landing-page content (navigation, footer links).
 * This is site copy, not backend data — anything the backend owns lives in
 * src/mocks/data.ts and is loaded through src/services + src/hooks.
 */
export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#about" },
  { label: "Help", href: "#help" },
];

export type FooterColumn = { title: string; links: NavLink[] };

export const footerColumns: FooterColumn[] = [
  {
    title: "Need Assistance ?",
    links: [
      { label: "Forgot Password", href: "#" },
      { label: "System Outages", href: "#" },
      { label: "Multi-Store Controls", href: "#" },
    ],
  },
  {
    title: "Contact IT & Support",
    links: [
      { label: "IT Support Hotline: 02-8635-0751", href: "tel:0286350751" },
      { label: "Support Mobile: +63-917-555-4877", href: "tel:+639175554877" },
      { label: "IT Helpdesk Email: itsupport@sims.com.ph", href: "mailto:itsupport@sims.com.ph" },
      { label: "Service Hours: 24/7 Operations Support", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Security", href: "#" },
      { label: "Grocery Case Studies", href: "#" },
      { label: "Retail Contact", href: "#" },
    ],
  },
];