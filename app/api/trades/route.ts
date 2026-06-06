import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const myStickers = await prisma.userSticker.findMany({
    where: { userId: session.user.id },
  })
  const myHave = myStickers.filter(s => s.status === 'HAVE').map(s => s.stickerId)
  const myNeed = myStickers.filter(s => s.status === 'NEED').map(s => s.stickerId)

  if (myHave.length === 0 || myNeed.length === 0) return NextResponse.json([])

  // Find users who have what I need AND need what I have
  const candidates = await prisma.user.findMany({
    where: {
      id: { not: session.user.id },
      stickers: {
        some: { stickerId: { in: myNeed }, status: 'HAVE' },
      },
    },
    include: { stickers: true },
  })

  const matches = candidates
    .map(user => {
      const theyHave = user.stickers.filter(s => s.status === 'HAVE').map(s => s.stickerId)
      const theyNeed = user.stickers.filter(s => s.status === 'NEED').map(s => s.stickerId)
      const iCanGive = myHave.filter(id => theyNeed.includes(id))
      const iCanGet = myNeed.filter(id => theyHave.includes(id))
      if (iCanGive.length === 0 || iCanGet.length === 0) return null
      return {
        user: { id: user.id, name: user.name, username: user.username, email: user.email },
        iCanGive,
        iCanGet,
      }
    })
    .filter(Boolean)

  return NextResponse.json(matches)
}
