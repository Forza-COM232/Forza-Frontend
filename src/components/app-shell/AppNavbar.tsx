import { NavLink, Link } from "react-router";
import logoMark from "@/assets/images/logo-mark.png";
import { cn } from "@/lib/utils";
import { CalendarDropdown } from "./CalendarDropdown";
import { UserMenu } from "./UserMenu";

const links = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Inventory", to: "/inventory" },
  { label: "Suppliers", to: "/suppliers" },
  { label: "Analytics", to: "/analytics" },
];

export const AppNavbar = () => {
  return (
    <header className="mx-auto flex h-24 w-full max-w-[1348px] items-center justify-between gap-4 px-6 md:h-[120px]">
      <Link to="/" className="flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-full bg-maroon">
          <img src={logoMark} alt="" className="size-5" />
        </span>
        <span className="font-brand text-3xl font-black leading-none text-cream">SIMS</span>
      </Link>

      <nav className="hidden items-center gap-2 md:flex">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              cn(
                "rounded-full px-5 py-2.5 text-[15px] text-cream transition-colors",
                isActive ? "bg-maroon" : "hover:bg-maroon/50",
              )
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-5">
        <CalendarDropdown />
        <UserMenu />
      </div>
    </header>
  );
};
