import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const stickers = await prisma.userSticker.findMany({
    where: { userId: session.user.id },
  })
  return NextResponse.json(stickers)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { stickerId, status } = await req.json()
  const sticker = await prisma.userSticker.upsert({
    where: { userId_stickerId: { userId: session.user.id, stickerId } },
    update: { status },
    create: { userId: session.user.id, stickerId, status },
  })
  return NextResponse.json(sticker)
}
