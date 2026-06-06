import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-700 via-yellow-500 to-blue-600 flex flex-col items-center justify-center text-white p-8">
      <h1 className="text-5xl font-bold mb-4 text-center">⚽ Copa 2026 Sticker Swap</h1>
      <p className="text-xl mb-8 text-center max-w-xl opacity-90">
        Track your FIFA World Cup 2026 sticker collection and find perfect trade partners instantly.
      </p>
      <div className="flex gap-4">
        <Link href="/register" className="bg-white text-green-700 font-bold px-8 py-3 rounded-full hover:bg-green-50 transition">
          Get Started
        </Link>
        <Link href="/login" className="border-2 border-white px-8 py-3 rounded-full hover:bg-white/20 transition">
          Sign In
        </Link>
      </div>
      <div className="mt-16 grid grid-cols-3 gap-8 text-center max-w-2xl">
        {[
          { icon: '📋', title: 'Track Collection', desc: 'Mark stickers you have or need' },
          { icon: '🤝', title: 'Find Trades', desc: 'Automatic matching with other collectors' },
          { icon: '🔗', title: 'Share Profile', desc: 'Share your collection with a link' },
        ].map(f => (
          <div key={f.title} className="bg-white/20 rounded-xl p-6">
            <div className="text-4xl mb-2">{f.icon}</div>
            <h3 className="font-bold text-lg">{f.title}</h3>
            <p className="text-sm opacity-80 mt-1">{f.desc}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
