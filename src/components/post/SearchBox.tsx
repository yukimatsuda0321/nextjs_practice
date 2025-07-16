"use client"

import { Input } from "../ui/input";
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { de } from "date-fns/locale";

export default function SearchBox(){
    const [search, setSearch] = useState("")
    const [ debauncedSearch, setDebauncedSearch ] = useState("")
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebauncedSearch(search)
        }, 500)

        return () => clearTimeout(timer)
    },[search])

    useEffect(() => {
        if(debauncedSearch.trim()){
            router.push(`/?search=${debauncedSearch.trim()}`)
        }else{
            router.push("/")
        }
    },[debauncedSearch, router])

    return(
        <>
        <Input placeholder="歩行記録を検索" className="w-[200px] lg:w-[300px]" value={search} onChange={(e) => setSearch(e.target.value)}/>
        </>
    )
}