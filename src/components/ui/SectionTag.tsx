interface SectionTagProps {
  label: string;
  color?: string;
}

export function SectionTag({ label, color = '#7c3aed' }: SectionTagProps) {
  return (
    <div
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
      style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
      {label}
    </div>
  );
}
