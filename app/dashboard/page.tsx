import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import StickerGrid from '@/components/StickerGrid'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const stickers = await prisma.userSticker.findMany({
    where: { userId: session.user.id },
  })

  const stickerMap: Record<number, string> = {}
  stickers.forEach(s => { stickerMap[s.stickerId] = s.status })

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-green-700 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">⚽ Copa 2026 Sticker Swap</h1>
        <div className="flex gap-4 text-sm">
          <a href="/trades" className="hover:underline">My Trades</a>
          <a href={`/u/${session.user.username}`} className="hover:underline">My Profile</a>
          <a href="/api/auth/signout" className="hover:underline opacity-70">Sign Out</a>
        </div>
      </nav>
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-2">My Sticker Collection</h2>
        <div className="flex gap-4 mb-6 text-sm">
          <span className="flex items-center gap-1"><span className="w-4 h-4 rounded bg-green-500 inline-block"></span> I have it</span>
          <span className="flex items-center gap-1"><span className="w-4 h-4 rounded bg-red-400 inline-block"></span> I need it</span>
          <span className="flex items-center gap-1"><span className="w-4 h-4 rounded bg-gray-300 inline-block"></span> Neutral</span>
        </div>
        <StickerGrid initialStickers={stickerMap} total={400} />
      </div>
    </div>
  )
}
