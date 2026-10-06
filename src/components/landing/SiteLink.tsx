import { Link } from "react-router";
import type { NavLink } from "./data";

/** Renders a NavLink: in-app route, outside link (phone/email), or plain text */
export const SiteLink = ({ link, className }: { link: NavLink; className?: string }) => {
  if (link.to) {
    return (
      <Link to={link.to} className={className}>
        {link.label}
      </Link>
    );
  }
  if (link.href) {
    return (
      <a href={link.href} className={className}>
        {link.label}
      </a>
    );
  }
  return <span className={className}>{link.label}</span>;
};