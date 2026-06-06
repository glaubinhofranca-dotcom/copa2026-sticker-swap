'use client'
import { useEffect, useState } from 'react'

type Match = {
  user: { id: string; name: string | null; username: string | null; email: string | null }
  iCanGive: number[]
  iCanGet: number[]
}

export default function TradeList() {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/trades').then(r => r.json()).then(data => {
      setMatches(Array.isArray(data) ? data : [])
      setLoading(false)
    })
  }, [])

  if (loading) return <p className="text-gray-500">Finding trade matches...</p>
  if (matches.length === 0) return (
    <div className="text-center py-12 text-gray-500">
      <p className="text-4xl mb-4">🔍</p>
      <p>No trade matches yet. Mark some stickers as HAVE or NEED in your collection!</p>
    </div>
  )

  return (
    <div className="space-y-4">
      {matches.map(m => (
        <div key={m.user.id} className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-bold text-lg">{m.user.name || m.user.username}</h3>
              <p className="text-gray-500 text-sm">@{m.user.username}</p>
            </div>
            <a href={`/u/${m.user.username}`} className="text-green-600 text-sm hover:underline">
              View collection →
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-green-700 mb-1">You give them ({m.iCanGive.length}):</p>
              <p className="text-gray-600 font-mono text-xs">{m.iCanGive.slice(0, 20).join(', ')}{m.iCanGive.length > 20 ? '…' : ''}</p>
            </div>
            <div>
              <p className="font-semibold text-blue-700 mb-1">You get from them ({m.iCanGet.length}):</p>
              <p className="text-gray-600 font-mono text-xs">{m.iCanGet.slice(0, 20).join(', ')}{m.iCanGet.length > 20 ? '…' : ''}</p>
            </div>
          </div>
          {m.user.email && (
            <p className="mt-4 text-xs text-gray-400">Contact: {m.user.email}</p>
          )}
        </div>
      ))}
    </div>
  )
}
