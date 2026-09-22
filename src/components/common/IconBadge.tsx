/** Small blush square holding a PNG icon */
export const IconBadge = ({ icon }: { icon: string }) => (
  <span className="grid size-10 place-items-center rounded-lg bg-blush">
    <img src={icon} alt="" className="size-6 object-contain" />
  </span>
);
