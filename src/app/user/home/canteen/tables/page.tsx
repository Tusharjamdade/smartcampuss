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

import { useState, useEffect } from "react"
import BookingModal from "@/components/ui/components/BookingModal"
import Table from "@/components/ui/components/Table"

interface MenuItem {
  id: number
  item: string
  price: string
  canteenId: number
}

export default function Canteen() {
  const [selectedSeats, setSelectedSeats] = useState<{ tableId: number; seatId: number }[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])

  // Handle seat selection
  const handleSeatClick = (tableId: number, seatId: number) => {
    const seatIndex = selectedSeats.findIndex((seat) => seat.tableId === tableId && seat.seatId === seatId)
    if (seatIndex > -1) {
      setSelectedSeats(selectedSeats.filter((_, index) => index !== seatIndex))
    } else {
      setSelectedSeats([...selectedSeats, { tableId, seatId }])
    }
  }

  // Open modal when booking is confirmed
  const handleBooking = () => {
    if (selectedSeats.length > 0) {
      setIsModalOpen(true)
    }
  }

  // Function to extract menu data from the query string
  const getMenuFromQuery = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const canteenParam = urlParams.get('canteen')

    if (canteenParam) {
      try {
        // Parse the JSON string and update the menu state
        const parsedMenu = JSON.parse(decodeURIComponent(canteenParam))
        setMenuItems(parsedMenu)
      } catch (error) {
        console.error("Error parsing canteen data:", error)
      }
    }
  }

  // Fetch menu from the URL when component mounts
  useEffect(() => {
    getMenuFromQuery()
  }, [])

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="container max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">Virtual Canteen</h1>
        
        {/* Display the menu items with their prices */}
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Menu</h2>
          <div className="space-y-4">
            {menuItems.length > 0 ? (
              menuItems.map((menuItem) => (
                <div key={menuItem.id} className="flex justify-between items-center">
                  <span>{menuItem.item}</span> {/* Display item name */}
                  <span>₹{menuItem.price}</span> {/* Display price */}
                </div>
              ))
            ) : (
              <p>No menu available</p>
            )}
          </div>
        </div>

        {/* Seat Booking Section */}
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
      </div>
      
      {/* Booking Modal */}
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} selectedSeats={selectedSeats} />
    </div>
  )
}
