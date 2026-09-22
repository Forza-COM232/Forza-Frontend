import type { ReactNode } from "react";
import { Ellipsis } from "lucide-react";
import { cn } from "@/lib/utils";

type PanelProps = {
  title?: string;
  subtitle?: string;
  /** show the "..." menu button in the top-right corner */
  menu?: boolean;
  variant?: "white" | "maroon";
  className?: string;
  children?: ReactNode;
};

export const Panel = ({ title, subtitle, menu, variant = "white", className, children }: PanelProps) => {
  const isMaroon = variant === "maroon";
  return (
    <section
      className={cn(
        "rounded-[20px] p-6 shadow-[0_4px_16px_rgba(74,29,26,0.06)]",
        isMaroon ? "bg-maroon text-white" : "bg-white text-ink",
        className,
      )}
    >
      {(title || menu) && (
        <div className="flex items-start justify-between gap-4">
          <div>
            {title && <h3 className="text-[17px] font-semibold">{title}</h3>}
            {subtitle && (
              <p className={cn("mt-0.5 text-[13px]", isMaroon ? "text-cream/80" : "text-slate-500")}>
                {subtitle}
              </p>
            )}
          </div>
          {menu && (
            <button type="button" aria-label="More options" className="text-current/70">
              <Ellipsis className="size-5" />
            </button>
          )}
        </div>
      )}
      {children}
    </section>
  );
};
