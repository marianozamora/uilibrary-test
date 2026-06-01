type Tab = 'featured' | 'kpi' | 'layouts' | 'storyboards'

const TABS: Tab[] = ['featured', 'kpi', 'layouts', 'storyboards']

interface Props {
  active: Tab
  onChange: (t: Tab) => void
}

export default function TabBar({ active, onChange }: Props) {
  return (
    <div className="max-w-[560px] mx-auto mb-9">
      <div className="grid grid-cols-4 border border-black/[0.12] rounded-xl overflow-hidden bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
        {TABS.map((t, i) => (
          <button
            key={t}
            onClick={() => onChange(t)}
            className={`py-2.5 text-[13.5px] transition-all
              ${i < TABS.length - 1 ? 'border-r border-black/[0.09]' : ''}
              ${active === t ? 'bg-zinc-900 text-white font-medium' : 'text-zinc-400 hover:bg-zinc-50 hover:text-zinc-600'}`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
    </div>
  )
}
