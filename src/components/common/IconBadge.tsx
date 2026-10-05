import type { ReactNode } from "react";

/** Small blush square holding a PNG icon (string src) or any icon element */
export const IconBadge = ({ icon }: { icon: string | ReactNode }) => (
  <span className="grid size-10 place-items-center rounded-lg bg-blush text-ruby">
    {typeof icon === "string" ? <img src={icon} alt="" className="size-6 object-contain" /> : icon}
  </span>
);
