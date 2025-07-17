import { prisma } from "@/lib/prisma";

export async function getPosts(order: "asc" | "desc" = "asc", selectedSort: "byCharger" | "byDate" = "byCharger") {
    const orderByCondition =
        selectedSort === "byCharger"
            ? { author: { name: order } }
            : { createdAt: order };

    return await prisma.post.findMany({
        where: { published: true },
        include: {
            author: {
                select: {
                    name: true,
                },
            },
        },
        orderBy: orderByCondition,
    });
}

export async function getPostById(id: string) {
    return await prisma.post.findUnique({
        where: { id },
        include: {
            author: {
                select: {
                    name: true
                }
            }
        }
    })
}


export async function compareDatePosts(date: Date) {
    return await prisma.post.findMany({
        where: {
            createdAt: {
                gte: date
            }
        },
        include: {
            author: {
                select: {
                    name: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })
}

export async function searchPosts(search: string) {
    const decodedSearch = decodeURIComponent(search)
    const normalizedSearch = decodedSearch.replace(/[\s　]+/g, ' ').trim()
    const searchWords = normalizedSearch.split(' ').filter(Boolean)

    const filters = searchWords.map(word => ({
        content: { contains: word }
    }))

    return await prisma.post.findMany({
        where: {
            AND: filters
        },
        include: {
            author: {
                select: {
                    name: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })
}