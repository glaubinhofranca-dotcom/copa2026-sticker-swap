'use client'
import { useState, useCallback } from 'react'

type Status = 'HAVE' | 'NEED' | 'NEUTRAL'

const CYCLE: Status[] = ['NEUTRAL', 'HAVE', 'NEED']

export default function StickerGrid({ initialStickers, total }: { initialStickers: Record<number, string>, total: number }) {
  const [stickers, setStickers] = useState<Record<number, Status>>(() => {
    const map: Record<number, Status> = {}
    Object.entries(initialStickers).forEach(([k, v]) => { map[Number(k)] = v as Status })
    return map
  })
  const [saving, setSaving] = useState<number | null>(null)

  const toggle = useCallback(async (n: number) => {
    const cur: Status = stickers[n] || 'NEUTRAL'
    const next = CYCLE[(CYCLE.indexOf(cur) + 1) % CYCLE.length]
    setStickers(s => ({ ...s, [n]: next }))
    setSaving(n)
    await fetch('/api/stickers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stickerId: n, status: next }),
    })
    setSaving(null)
  }, [stickers])

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(40px,1fr))] gap-1">
      {Array.from({ length: total }, (_, i) => i + 1).map(n => {
        const status = stickers[n] || 'NEUTRAL'
        const bg = status === 'HAVE' ? 'bg-green-500 text-white' : status === 'NEED' ? 'bg-red-400 text-white' : 'bg-gray-200 text-gray-600'
        return (
          <button
            key={n}
            onClick={() => toggle(n)}
            className={`${bg} rounded text-xs h-10 font-mono hover:opacity-80 transition ${saving === n ? 'opacity-50' : ''}`}
            title={`Sticker #${n} — click to cycle: neutral → have → need`}
          >
            {n}
          </button>
        )
      })}
    </div>
  )
}
