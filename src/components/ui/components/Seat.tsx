import type React from "react"

interface SeatProps {
  tableId: number
  seatId: number
  onClick: () => void
  isSelected: boolean
  style?: React.CSSProperties
}

export default function Seat({ tableId, seatId, onClick, isSelected, style }: SeatProps) {
  return (
    <button
      className={`w-5 h-5 rounded-md ${
        isSelected ? "bg-green-500" : "bg-gray-400"
      } hover:bg-blue-500 transition-colors duration-200 flex items-center justify-center text-white text-[10px] font-bold`}
      onClick={onClick}
      style={style}
    >
      {seatId + 1}
    </button>
  )
}

