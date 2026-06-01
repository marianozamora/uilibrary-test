interface Props {
  title?: string
  sub?: string
  children: React.ReactNode
}

export default function Section({ title, sub, children }: Props) {
  return (
    <div className="mb-10">
      {title && (
        <div className="mb-4">
          <h2 className="font-serif-display text-[30px] font-normal tracking-tight text-zinc-900">{title}</h2>
          {sub && <p className="text-[13px] text-zinc-400 mt-0.5">{sub}</p>}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">{children}</div>
    </div>
  )
}
