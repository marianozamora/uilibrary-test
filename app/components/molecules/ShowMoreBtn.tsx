interface Props {
  count: number
  onClick: () => void
}

export default function ShowMoreBtn({ count, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="col-span-1 sm:col-span-2 flex items-center justify-center gap-2 py-3 bg-white border border-dashed border-black/[0.12] rounded-2xl
                 text-[13px] text-zinc-400 hover:bg-zinc-50 hover:text-zinc-600 hover:border-black/[0.2] transition-all
                 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
    >
      Show more assets ({count} more)
    </button>
  )
}
