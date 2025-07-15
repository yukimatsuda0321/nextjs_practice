import {format} from "date-fns"
import {ja} from "date-fns/locale"
import Image from "next/image"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PostCardProps } from "@/types/post"

export default function PostCard({post} : PostCardProps){
    return(
        <Card>
        {post.topImage && (
            <div className="relative w-full h-48">
                <Image src={post.topImage} alt="画像が見つかりません" fill sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw" className="rounded-t-md object-cover" priority />
            </div>
        )}
        <CardHeader>
            <CardTitle><time>{format(new Date(post.createdAt), "yyyy/M/d HH:mm", { locale: ja })}</time></CardTitle>
        </CardHeader>
        <CardContent>
            <p className="font-bold">Dr. {post.author.name}</p>
            <p className="mt-2 text-sm text-gray-600 mb-2 line-clamp-2">
                {post.content}
            </p>
        </CardContent>
        </Card>
    )
}