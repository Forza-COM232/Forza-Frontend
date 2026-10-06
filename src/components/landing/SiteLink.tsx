import { Link } from "react-router";
import type { NavLink } from "./data";

type SiteLinkProps = {
  link: NavLink;
  className?: string;
  /** open in-app pages in a new browser tab (used by the footer) */
  newTab?: boolean;
};

/** Renders a NavLink: in-app route, outside link (phone/email), or plain text */
export const SiteLink = ({ link, className, newTab = false }: SiteLinkProps) => {
  if (link.to) {
    return (
      <Link
        to={link.to}
        className={className}
        {...(newTab && { target: "_blank", rel: "noopener noreferrer" })}
      >
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