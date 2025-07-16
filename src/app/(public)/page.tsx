import { compareDatePosts, getPosts, searchPosts } from "@/lib/post"
import PostCard from "@/components/post/PostCard"
import { Post } from "@/types/post"

import * as React from 'react';
import { LineChart } from '@mui/x-charts';

type SearchParams = {
    search?: string
    order?: "asc" | "desc"
    date?: Date
}

type Props = {
    searchParams: Promise<SearchParams>
}

function renderPostGrid(posts: Post[]) {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
            <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[
                    {
                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                    },
                ]}
                height={300}
            />
        </div>
    )
}

export default async function PostsPage({ searchParams }: Props) {
    const resolvedParams = await searchParams
    const searchQuery = resolvedParams.search ?? ""
    const comparedDate = resolvedParams.date ? new Date(resolvedParams.date) : null
    const order: "asc" | "desc" = resolvedParams.order === "desc" ? "desc" : "asc"

    if (comparedDate) {
        const dateFilteredPosts = await compareDatePosts(comparedDate) as Post[]
        return renderPostGrid(dateFilteredPosts)
    }

    const posts: Post[] = searchQuery
        ? await searchPosts(searchQuery)
        : await getPosts(order)

    return renderPostGrid(posts)
}
