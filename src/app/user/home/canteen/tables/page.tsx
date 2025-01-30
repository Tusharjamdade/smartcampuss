// "use client"

// import BookingModal from "@/components/ui/components/BookingModal";
// import Table from "@/components/ui/components/Table";
// import { useState } from "react"

// export default function Canteen() {
//   const [selectedSeats, setSelectedSeats] = useState<{ tableId: number; seatId: number }[]>([])
//   const [isModalOpen, setIsModalOpen] = useState(false)

//   const handleSeatClick = (tableId: number, seatId: number) => {
//     const seatIndex = selectedSeats.findIndex((seat) => seat.tableId === tableId && seat.seatId === seatId)
//     if (seatIndex > -1) {
//       setSelectedSeats(selectedSeats.filter((_, index) => index !== seatIndex))
//     } else {
//       setSelectedSeats([...selectedSeats, { tableId, seatId }])
//     }
//   }

//   const handleBooking = () => {
//     if (selectedSeats.length > 0) {
//       setIsModalOpen(true)
//     }
//   }

//   return (
//     <div className="container mx-auto p-4 min-h-screen bg-gray-100 ">
//       <h1 className="text-3xl font-bold text-center mb-8">Virtual Canteen</h1>
//       <div className="bg-white rounded-lg shadow-lg p-8 overflow-x-auto">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {[...Array(9)].map((_, index) => (
//             <Table key={index} tableId={index} onSeatClick={handleSeatClick} selectedSeats={selectedSeats} />
//           ))}
//         </div>
//       </div>
//       <div className="mt-8 text-center">
//         <button
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           onClick={handleBooking}
//           disabled={selectedSeats.length === 0}
//         >
//           Book Selected Seats
//         </button>
//       </div>
//       <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} selectedSeats={selectedSeats} />
//     </div>
//   )
// }

"use client"

import BookingModal from "@/components/ui/components/BookingModal"
import Table from "@/components/ui/components/Table"
import { useState } from "react"

export default function Canteen() {
  const [selectedSeats, setSelectedSeats] = useState<{ tableId: number; seatId: number }[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSeatClick = (tableId: number, seatId: number) => {
    const seatIndex = selectedSeats.findIndex((seat) => seat.tableId === tableId && seat.seatId === seatId)
    if (seatIndex > -1) {
      setSelectedSeats(selectedSeats.filter((_, index) => index !== seatIndex))
    } else {
      setSelectedSeats([...selectedSeats, { tableId, seatId }])
    }
  }

  const handleBooking = () => {
    if (selectedSeats.length > 0) {
      setIsModalOpen(true)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="container max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">Virtual Canteen</h1>
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 overflow-x-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            {[...Array(9)].map((_, index) => (
              <Table key={index} tableId={index} onSeatClick={handleSeatClick} selectedSeats={selectedSeats} />
            ))}
          </div>
        </div>
        <div className="mt-8 text-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleBooking}
            disabled={selectedSeats.length === 0}
          >
            Book Selected Seats
          </button>
        </div>
        <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} selectedSeats={selectedSeats} />
      </div>
    </div>
  )
}

