"use client"

import { Button } from "@/components/ui/button"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

export default function RecordHeader() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [selectedSort, setSelectedSort] = useState("");
  const currentOrder = searchParams.get("order") === "desc" ? "desc" : "asc"

  const updateOrder = (order: "asc" | "desc") => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("order", order)
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleSortChange = (value: string) => {
    //setSelectedSort(value);
    const params = new URLSearchParams(searchParams.toString())
    params.set("selectedSort", value)
    router.push(`${pathname}?${params.toString()}`)
  };

  return (
    <header className="w-full border-b shadow-sm bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="font-bold text-xl">記録一覧</div>
        <div className="flex">
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
          <Select onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="並び替え" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="byCharger">担当者順</SelectItem>
              <SelectItem value="byDate">撮影日順</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  )
}
