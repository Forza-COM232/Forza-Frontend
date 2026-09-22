import { cn } from "@/lib/utils";

/** Grey pulsing block shown while data loads */
export const Skeleton = ({ className }: { className?: string }) => (
  <span className={cn("inline-block animate-pulse rounded-md bg-slate-200/80", className)} />
);
