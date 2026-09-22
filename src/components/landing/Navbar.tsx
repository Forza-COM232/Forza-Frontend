import cartIcon from "@/assets/images/cart-icon.png";
import { Link } from "react-router";
import { navLinks } from "./data";

export const Navbar = () => {
  return (
    <header className="mx-auto flex w-full max-w-[1288px] items-center justify-between px-6 pt-6 md:pt-8">
      <div className="flex items-center gap-10 md:gap-[72px]">
        <a
          href="#"
          className="font-brand text-4xl font-black leading-none tracking-tight text-cream md:text-[58px]"
        >
          SIMS
        </a>
        <nav className="hidden items-center gap-16 sm:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-lg font-bold text-cream transition-opacity hover:opacity-80 md:text-2xl"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <Link
        to="/login"
        aria-label="Sign in"
        className="grid size-14 place-items-center rounded-xl bg-maroon transition-colors hover:bg-ruby md:size-[84px] md:rounded-2xl"
      >
        <img src={cartIcon} alt="" className="size-8 object-contain md:size-12" />
      </Link>
    </header>
  );
};
