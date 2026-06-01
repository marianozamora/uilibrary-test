'use client'
import { useState } from 'react'
import { CloseIcon, PlusIcon } from '@/components/atoms/icons'

interface Props {
  assetName?: string
  onClose: () => void
}

export default function RequestModal({ assetName, onClose }: Props) {
  const [asset, setAsset] = useState(assetName ?? '')
  const [team, setTeam] = useState('')
  const [reason, setReason] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [done, setDone] = useState(false)

  function submit() {
    const e: Record<string, string> = {}
    if (!asset.trim()) e.asset = 'Required'
    if (!team.trim()) e.team = 'Required'
    if (!reason.trim()) e.reason = 'Required'
    if (Object.keys(e).length) { setErrors(e); return }
    setDone(true)
  }

  function inputClass(key: string) {
    return `w-full h-10 px-3.5 text-[13.5px] border rounded-xl bg-zinc-50 text-zinc-900 outline-none focus:ring-2 transition-all placeholder:text-zinc-300
      ${errors[key] ? 'border-red-400 focus:ring-red-100' : 'border-black/[0.12] focus:border-black/[0.25] focus:ring-black/[0.06]'}`
  }

  return (
    <div className="flex flex-col w-full max-w-[540px] bg-white rounded-2xl border border-black/[0.07] overflow-hidden
                    shadow-[0_20px_60px_rgba(0,0,0,0.16)] animate-modal">
      <div className="h-[3px] bg-zinc-900 flex-shrink-0" />
      <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-4 border-b border-black/[0.07]">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-zinc-100 flex items-center justify-center flex-shrink-0">
            <PlusIcon />
          </div>
          <div>
            <h2 className="text-[17px] font-semibold tracking-tight text-zinc-900">Request access</h2>
            <p className="text-[12.5px] text-zinc-400 mt-1">Describe why you need access to this asset</p>
          </div>
        </div>
        <button onClick={onClose}
          className="w-7 h-7 rounded-full bg-zinc-100 border border-black/[0.07] flex items-center justify-center hover:bg-zinc-200 transition-colors flex-shrink-0 mt-0.5">
          <CloseIcon />
        </button>
      </div>

      {done ? (
        <div className="px-5 py-12 flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6 text-green-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-[16px] font-semibold text-zinc-900">Request sent</p>
          <p className="text-[13.5px] text-zinc-400 max-w-[300px] leading-relaxed">
            We'll get back to you on <span className="font-medium text-zinc-600">{asset}</span>.
          </p>
          <button onClick={onClose} className="mt-4 h-10 px-6 bg-zinc-900 text-white text-[13.5px] font-medium rounded-xl hover:bg-zinc-800 transition-colors">
            Done
          </button>
        </div>
      ) : (
        <>
          <div className="px-5 py-5 flex flex-col gap-4">
            <div>
              <p className="text-[10.5px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">Asset name</p>
              <input
                value={asset}
                onChange={e => { setAsset(e.target.value); setErrors(p => ({ ...p, asset: '' })) }}
                className={inputClass('asset')}
                placeholder="Which asset do you need?"
              />
              {errors.asset && <p className="mt-1 text-[11.5px] text-red-500">{errors.asset}</p>}
            </div>
            <div>
              <p className="text-[10.5px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">Your team / area</p>
              <input
                value={team}
                onChange={e => { setTeam(e.target.value); setErrors(p => ({ ...p, team: '' })) }}
                className={inputClass('team')}
                placeholder="e.g. Sales, Finance, Product…"
              />
              {errors.team && <p className="mt-1 text-[11.5px] text-red-500">{errors.team}</p>}
            </div>
            <div>
              <p className="text-[10.5px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">Reason for access</p>
              <textarea
                value={reason}
                onChange={e => { setReason(e.target.value); setErrors(p => ({ ...p, reason: '' })) }}
                className={`w-full px-3.5 py-2.5 text-[13.5px] border rounded-xl bg-zinc-50 text-zinc-900 outline-none focus:ring-2 transition-all resize-none placeholder:text-zinc-300 leading-relaxed
                  ${errors.reason ? 'border-red-400 focus:ring-red-100' : 'border-black/[0.12] focus:border-black/[0.25] focus:ring-black/[0.06]'}`}
                rows={4}
                placeholder="Describe why you need access and how you'll use it…"
              />
              {errors.reason && <p className="mt-1 text-[11.5px] text-red-500">{errors.reason}</p>}
            </div>
          </div>

          <div className="flex gap-2 px-5 pb-5">
            <button
              onClick={submit}
              className="flex-1 h-10 bg-zinc-900 text-white text-[13.5px] font-medium rounded-xl hover:bg-zinc-800 transition-colors"
            >
              Submit request
            </button>
            <button
              onClick={onClose}
              className="h-10 px-4 bg-white border border-black/[0.12] rounded-xl text-[13.5px] text-zinc-500 hover:bg-zinc-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  )
}
