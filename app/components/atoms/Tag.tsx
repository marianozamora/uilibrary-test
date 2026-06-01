interface Props {
  label: string
  variant?: 'soft' | 'outline'
}

export default function Tag({ label, variant = 'soft' }: Props) {
  if (variant === 'outline') {
    return (
      <span className="text-[12.5px] px-3 py-1 rounded-full border border-black/[0.12] text-zinc-500 bg-white">
        {label}
      </span>
    )
  }
  return (
    <span className="text-xs px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-500 border border-black/[0.07]">
      {label}
    </span>
  )
}
