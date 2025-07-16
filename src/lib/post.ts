import { prisma } from "@/lib/prisma";

export async function getPosts(order: "asc" | "desc" = "asc"){
    return await prisma.post.findMany({
        where:{published:true},
        include:{
            author:{
                select:{
                    name:true
                }
            }
        },
        orderBy:{
            createdAt:order
        }
    })
}

export async function searchPosts(search : string){
    const decodedSearch = decodeURIComponent(search)   
    const normalizedSearch = decodedSearch.replace(/[\s　]+/g, ' ').trim() 
    const searchWords = normalizedSearch.split(' ').filter(Boolean)

const filters = searchWords.map(word => ({
    content: { contains: word }
}))

    return await prisma.post.findMany({
        where:{
            AND: filters
        },
        include:{
            author:{
                select:{
                    name:true
                }
            }
        },
        orderBy:{
            createdAt:"desc"
        }       
    })
}