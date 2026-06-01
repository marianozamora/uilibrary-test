export default function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10.5px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">
      {children}
    </p>
  )
}
