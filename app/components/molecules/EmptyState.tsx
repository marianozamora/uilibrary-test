interface Props {
  query?: string
}

export default function EmptyState({ query }: Props) {
  return (
    <div className="col-span-1 sm:col-span-2 text-center py-12 text-zinc-400">
      <p className="text-[15px] font-medium text-zinc-500 mb-1.5">
        {query ? 'Not seeing it… try search' : 'Nothing here yet'}
      </p>
      <p className="text-[13.5px]">
        {query ? `No assets matched "${query}". Try a different term or tag.` : 'No assets in this category.'}
      </p>
    </div>
  )
}
