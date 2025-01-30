import Seat from "./Seat"

interface TableProps {
  tableId: number
  onSeatClick: (tableId: number, seatId: number) => void
  selectedSeats: { tableId: number; seatId: number }[]
}

export default function Table({ tableId, onSeatClick, selectedSeats }: TableProps) {
  return (
    <div className="relative sm:w-40 sm:h-32 h-28 w-32">
      <div className="absolute inset-3 bg-gray-300 rounded-lg flex items-center justify-center">
        <span className="text-xs font-bold">Table {tableId + 1}</span>
      </div>
      <div className="absolute inset-0">
        <div className="w-full h-full flex flex-wrap justify-between items-center">
          {[...Array(8)].map((_, seatId) => (
            <Seat
              key={seatId}
              tableId={tableId}
              seatId={seatId}
              onClick={() => onSeatClick(tableId, seatId)}
              isSelected={selectedSeats.some((seat) => seat.tableId === tableId && seat.seatId === seatId)}
              style={{
                position: "absolute",
                ...(seatId < 3
                  ? { top: "-6px", left: `${(seatId + 1) * 25}%` }
                  : seatId === 3
                    ? { top: "50%", right: "-6px", transform: "translateY(-50%)" }
                    : seatId < 7
                      ? { bottom: "-6px", left: `${(7 - seatId) * 25}%` }
                      : { top: "50%", left: "-6px", transform: "translateY(-50%)" }),
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

