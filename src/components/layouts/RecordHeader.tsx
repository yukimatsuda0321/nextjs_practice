"use client"

import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function RecordHeader() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const currentOrder = searchParams.get("order") === "desc" ? "desc" : "asc"

  const updateOrder = (order: "asc" | "desc") => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("order", order)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <header className="w-full border-b shadow-sm bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="font-bold text-xl">記録一覧</div>
        <div className="flex gap-2">
          <Button
            variant={currentOrder === "asc" ? "default" : "outline"}
            onClick={() => updateOrder("asc")}
          >
            昇順
          </Button>
          <Button
            variant={currentOrder === "desc" ? "default" : "outline"}
            onClick={() => updateOrder("desc")}
          >
            降順
          </Button>
        </div>
      </div>
    </header>
  )
}
