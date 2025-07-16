"use client"

import { useRouter } from "next/navigation"
import React, { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { format } from "date-fns"
import { ja } from "date-fns/locale"

export default function DatePickerButton() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [showCalendar, setShowCalendar] = useState(false)
    const [dispText, setDispText] = useState("作成日で絞り込み")
    const router = useRouter()

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date)
        setShowCalendar(false)

        if (date) {
            const formattedDate = date.toISOString().split("T")[0] // "YYYY-MM-DD"
            setDispText(`${formattedDate} 以降のデータ`)
            router.push(`/?date=${formattedDate}`)
        } else {
            setDispText("日付が選択されていません")
        }
        router.push(`/?date=${date}`)

    }

    return (
        <div className="relative inline-block">
            <button
                onClick={() => setShowCalendar(!showCalendar)}
                className="px-4 py-2 bg-white text-black border border-black rounded hover:bg-gray-100"
            >
                {dispText}
            </button>

            {showCalendar && (
                <div className="absolute mt-2 z-50">
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        inline
                    />
                </div>
            )}
        </div>
    )
}
