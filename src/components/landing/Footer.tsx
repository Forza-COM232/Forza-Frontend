import logoMark from "@/assets/images/logo-mark.png";
import { footerColumns } from "./data";

export const Footer = () => {
  return (
    <footer
      id="help"
      className="mt-24 bg-gradient-to-b from-transparent to-[#762d28] md:mt-40"
    >
      <div className="mx-auto grid w-full max-w-[1288px] gap-10 px-6 pb-24 pt-6 sm:grid-cols-2 md:pb-24 lg:grid-cols-[203fr_119fr_179fr_119fr] lg:gap-x-0">
        <div>
          <a href="#" className="flex items-center gap-3">
            <span className="grid size-7 place-items-center rounded-md bg-maroon">
              <img src={logoMark} alt="" className="size-4" />
            </span>
            <span className="font-brand text-lg font-black text-cream">SIMS</span>
          </a>
          <p className="mt-5 max-w-[280px] text-xs leading-relaxed text-cream">
            Real-time supermarket operations command console. Turn shrinkage into absolute
            growth.
          </p>
        </div>

        {footerColumns.map((column) => (
          <div key={column.title}>
            <h4 className="text-xs font-bold uppercase text-cream">{column.title}</h4>
            <ul className="mt-4 flex flex-col gap-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs text-cream/90 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
};
