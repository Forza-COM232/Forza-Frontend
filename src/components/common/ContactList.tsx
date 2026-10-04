export type ContactItem = { label: string; caption: string; icon: string };

/** Icon + two-line rows with dividers, used inside maroon panels */
export const ContactList = ({ items }: { items: ContactItem[] }) => (
  <ul className="mt-5">
    {items.map(({ label, caption, icon }) => (
      <li key={label} className="flex items-center gap-4 border-b-2 border-[#9b534e] py-3">
        <span className="grid size-10 place-items-center rounded-lg bg-cream">
          <img src={icon} alt="" className="size-6 object-contain" />
        </span>
        <span>
          <span className="block text-[15px] font-medium text-white">{label}</span>
          <span className="block text-xs text-cream/75">{caption}</span>
        </span>
      </li>
    ))}
  </ul>
);
