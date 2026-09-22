import { NavLink, Link } from "react-router";
import { ChevronDown } from "lucide-react";
import { icons } from "@/assets/icons";
import logoMark from "@/assets/images/logo-mark.png";
import { cn } from "@/lib/utils";
import { DEFAULT_YEAR, useCurrentUser } from "@/hooks/queries";
import { Skeleton } from "@/components/common/Skeleton";

const links = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Inventory", to: "/inventory" },
  { label: "Suppliers", to: "/suppliers" },
  { label: "Analytics", to: "/analytics" },
];

export const AppNavbar = () => {
  const { data: user } = useCurrentUser();

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
        <button
          type="button"
          className="flex items-center gap-2 rounded-full bg-[#5e2522] px-4 py-2.5 text-[15px] text-cream"
        >
          <img src={icons.calendar} alt="" className="h-4 w-auto" />
          {DEFAULT_YEAR}
          <ChevronDown className="size-4" />
        </button>
        <button type="button" className="flex items-center gap-3 text-left text-cream">
          <img src={icons.worker} alt="" className="size-8" />
          <span className="hidden sm:block">
            {user ? (
              <>
                <span className="block text-sm font-semibold leading-tight">{user.name}</span>
                <span className="block text-xs text-cream/70">{user.role}</span>
              </>
            ) : (
              <Skeleton className="h-8 w-24 bg-white/15" />
            )}
          </span>
          <ChevronDown className="size-4" />
        </button>
      </div>
    </header>
  );
};
