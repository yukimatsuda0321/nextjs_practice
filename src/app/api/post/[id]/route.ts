// app/api/post/[id]/route.ts

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const post = await prisma.post.findUnique({
        where: { id: params.id },
        include: {
            author: {
                select: { name: true },
            },
        },
    })

    if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json(post)
}
