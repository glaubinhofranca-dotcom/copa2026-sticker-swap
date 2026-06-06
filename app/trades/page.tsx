import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import TradeList from '@/components/TradeList'

export default async function TradesPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-green-700 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">⚽ Copa 2026 Sticker Swap</h1>
        <div className="flex gap-4 text-sm">
          <a href="/dashboard" className="hover:underline">My Collection</a>
          <a href={`/u/${session.user.username}`} className="hover:underline">My Profile</a>
          <a href="/api/auth/signout" className="hover:underline opacity-70">Sign Out</a>
        </div>
      </nav>
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Trade Matches</h2>
        <TradeList />
      </div>
    </div>
  )
}
