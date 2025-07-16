"use client"

import { useRouter } from "next/navigation"
import React, { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export default function DatePickerButton() {
const [selectedDate, setSelectedDate] = useState<Date | null>(null)
const [showCalendar, setShowCalendar] = useState(false)
const router = useRouter()

const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
    setShowCalendar(false)
    router.push(`/?date=${date}`)
}

return (
    <div className="relative inline-block">
    <button
        onClick={() => setShowCalendar(!showCalendar)}
        className="px-4 py-2 bg-white text-black border border-black rounded hover:bg-gray-100"
    >
        作成日で絞り込み
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
