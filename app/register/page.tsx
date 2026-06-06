'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', username: '', password: '' })
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error); return }
    await signIn('credentials', { email: form.email, password: form.password, redirect: false })
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">⚽ Create Account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {(['name', 'username', 'email', 'password'] as const).map(field => (
            <input
              key={field}
              type={field === 'email' ? 'email' : field === 'password' ? 'password' : 'text'}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          ))}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition">
            Create Account
          </button>
        </form>
        <p className="text-center text-gray-500 mt-4 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-green-600 hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  )
}
