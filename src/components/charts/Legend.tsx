export const Legend = ({ items }: { items: { label: string; color: string }[] }) => (
  <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
    {items.map((i) => (
      <li key={i.label} className="flex items-center gap-1.5">
        <span className="size-2.5 rounded-full" style={{ background: i.color }} />
        {i.label}
      </li>
    ))}
  </ul>
);
