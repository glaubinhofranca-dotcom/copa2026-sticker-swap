import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function UserProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  const user = await prisma.user.findUnique({
    where: { username },
    include: { stickers: true },
  })
  if (!user) notFound()

  const stickerMap: Record<number, string> = {}
  user.stickers.forEach(s => { stickerMap[s.stickerId] = s.status })

  const have = user.stickers.filter(s => s.status === 'HAVE').length
  const need = user.stickers.filter(s => s.status === 'NEED').length

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-green-700 text-white px-6 py-4">
        <h1 className="text-xl font-bold">⚽ Copa 2026 Sticker Swap</h1>
      </nav>
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold">{user.name || user.username}&apos;s Collection</h2>
            <p className="text-gray-500">@{user.username} · {have} have · {need} need</p>
          </div>
        </div>
        <div className="flex gap-4 mb-4 text-sm">
          <span className="flex items-center gap-1"><span className="w-4 h-4 rounded bg-green-500 inline-block"></span> Have</span>
          <span className="flex items-center gap-1"><span className="w-4 h-4 rounded bg-red-400 inline-block"></span> Need</span>
          <span className="flex items-center gap-1"><span className="w-4 h-4 rounded bg-gray-300 inline-block"></span> Neutral</span>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(36px,1fr))] gap-1">
          {Array.from({ length: 400 }, (_, i) => i + 1).map(n => {
            const status = stickerMap[n]
            const bg = status === 'HAVE' ? 'bg-green-500 text-white' : status === 'NEED' ? 'bg-red-400 text-white' : 'bg-gray-200 text-gray-500'
            return (
              <div key={n} className={`${bg} rounded text-xs flex items-center justify-center h-9 font-mono`}>
                {n}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
