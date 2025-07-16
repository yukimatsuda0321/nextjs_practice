import {compareDatePosts, getPosts, searchPosts} from "@/lib/post"
import PostCard from "@/components/post/PostCard"
import { Post } from "@/types/post"

type SearchParams = {
    search? : string
    order?: "asc" | "desc"
    date?: Date
}

export default async function PostsPage({searchParams}:{searchParams: Promise<SearchParams>}) {
    const resolvedSearchParams = await searchParams
    const query = resolvedSearchParams.search ?? ""
    const comparedDate = resolvedSearchParams.date ? new Date(resolvedSearchParams.date) : null
    const order = resolvedSearchParams.order === "desc" ? "desc" : "asc"

    const posts = query ? await searchPosts(query) as Post[] : await getPosts(order) as Post[]

    if(comparedDate){
        console.log("引数に渡す日時", comparedDate)
        const posts = await compareDatePosts(comparedDate) as Post[]
        return(
            <>
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post}/>
                    ))}

                </div>
            </div>
            </>
        )
    }

    return(
        <>
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post}/>
                ))}

            </div>
        </div>
        </>
    )
}