'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const res = await signIn('credentials', { email, password, redirect: false })
    if (res?.error) setError('Invalid email or password')
    else router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">⚽ Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition">
            Sign In
          </button>
        </form>
        <p className="text-center text-gray-500 mt-4 text-sm">
          No account?{' '}
          <Link href="/register" className="text-green-600 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  )
}
