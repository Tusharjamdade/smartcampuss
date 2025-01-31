// import { useState } from "react"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Input } from "../input"

// interface BookingModalProps {
//   isOpen: boolean
//   onClose: () => void
//   selectedSeats: { tableId: number; seatId: number }[]
// }

// export default function BookingModal({ isOpen, onClose, selectedSeats }: BookingModalProps) {
//   const [names, setNames] = useState<string[]>(Array(selectedSeats.length).fill(""))

//   const handleNameChange = (index: number, value: string) => {
//     const newNames = [...names]
//     newNames[index] = value
//     setNames(newNames)
//   }

//   const handleSubmit = () => {
//     // Here you would typically send the booking data to a server
//     console.log(
//       "Booking submitted:",
//       selectedSeats.map((seat, index) => ({
//         ...seat,
//         name: names[index],
//       })),
//     )
//     onClose()
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Enter Names for Selected Seats</DialogTitle>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           {selectedSeats.map((seat, index) => (
//             <div key={`${seat.tableId}-${seat.seatId}`} className="grid grid-cols-2 items-center gap-4">
//               <span>
//                 Table {seat.tableId + 1}, Seat {seat.seatId + 1}:
//               </span>
//               <Input
//                 value={names[index]}
//                 onChange={(e) => handleNameChange(index, e.target.value)}
//                 placeholder="Enter name"
//               />
//             </div>
//           ))}
//         </div>
//         <DialogFooter>
//           <Button onClick={handleSubmit}>Confirm Booking</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "../input";
import { useSession } from "next-auth/react"; // To get current userId

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSeats: { tableId: number; seatId: number }[];
}

export default function BookingModal({ isOpen, onClose, selectedSeats }: BookingModalProps) {
  const { data: session } = useSession(); // Get user session data
  const [names, setNames] = useState<string[]>(Array(selectedSeats.length).fill(""));

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
  };

  const handleSubmit = async () => {
    if (!session?.user?.id) {
      alert("You must be logged in to book seats.");
      return;
    }

    const userId = session.user.id;

    // Prepare the data to be sent to the backend
    const bookingData = {
      userId,
      name: names.join(", "), // Concatenate all names into a single string (or customize as needed)
      selectedSeats: JSON.stringify(selectedSeats), // Serialize the selectedSeats array into a JSON string
    };

    // Send the data to the API
    const response = await fetch("/api/admin/canteen/tablebooking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    if (response.ok) {
      alert("Seats booked successfully!");
      onClose(); // Close modal after booking
    } else {
      alert("Failed to book seats. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Names for Selected Seats</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {selectedSeats.map((seat, index) => (
            <div key={`${seat.tableId}-${seat.seatId}`} className="grid grid-cols-2 items-center gap-4">
              <span>
                Table {seat.tableId + 1}, Seat {seat.seatId + 1}:
              </span>
              <Input
                value={names[index]}
                onChange={(e) => handleNameChange(index, e.target.value)}
                placeholder="Enter name"
              />
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Confirm Booking</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
