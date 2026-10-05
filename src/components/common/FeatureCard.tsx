import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconBadge } from "./IconBadge";

type FeatureCardProps = {
  title: string;
  subtitle: string;
  icon?: string | ReactNode;
  /** show the ">" arrow in the top-right corner */
  arrow?: boolean;
  /** "stack" puts children under the title; "split" puts them to the right of it */
  layout?: "stack" | "split";
  className?: string;
  children?: ReactNode;
};

/** Big-title white card used on Suppliers & Analytics */
export const FeatureCard = ({
  title,
  subtitle,
  icon,
  arrow,
  layout = "stack",
  className,
  children,
}: FeatureCardProps) => {
  const header = (
    <div className={layout === "split" ? "self-start" : undefined}>
      {(icon || arrow) && (
        <div className="mb-3 flex items-center justify-between">
          {icon ? <IconBadge icon={icon} /> : <span />}
          {arrow && <ChevronRight className="size-4 text-slate-600" />}
        </div>
      )}
      <h2 className="font-grotesk text-[28px] font-extrabold leading-tight tracking-tight">{title}</h2>
      <p className="mt-1 text-[13px] text-slate-500">{subtitle}</p>
    </div>
  );

  return (
    <section
      className={cn(
        "rounded-[20px] bg-white p-6 text-ink shadow-[0_4px_16px_rgba(74,29,26,0.06)]",
        layout === "split" && "grid items-center gap-4 sm:grid-cols-[minmax(0,auto)_minmax(0,1fr)]",
        className,
      )}
    >
      {header}
      {children}
    </section>
  );
};
