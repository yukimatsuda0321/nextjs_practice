import { format } from "date-fns";
import { ja } from "date-fns/locale";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { PostCardProps } from "@/types/post";
import Link from "next/link";

export default function PostCard({ post }: PostCardProps) {
  console.log(post.createdAt);
  return (
    <Card className="shadow-lg rounded-lg transition-transform hover:scale-[1.01] hover:shadow-xl duration-200">
      <Link href={`/video/${post.id}`}>
        {post.topImage && (
          <div className="relative w-full h-48">
            <img
              src="image.png"
              alt="画像が見つかりません"
              width="225px"
              className="ml-12 rounded-t-md object-cover"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle>
            <time>
              {format(new Date(post.createdAt), "yyyy/M/d HH:mm:ss", {
                locale: ja,
              })}
            </time>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-bold">Dr. {post.author.name}</p>
          <p className="mt-2 text-sm text-gray-600 mb-2 line-clamp-2">
            {post.content}
          </p>
        </CardContent>
      </Link>
    </Card>
  );
}