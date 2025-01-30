import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function TableAvailability() {
  const [availableTables, setAvailableTables] = useState(10)

  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Table Availability</h2>
      <div className="flex items-center space-x-4">
        <Label htmlFor="tableCount">Available Tables:</Label>
        <Input
          id="tableCount"
          type="number"
          value={availableTables}
          onChange={(e) => setAvailableTables(parseInt(e.target.value) || 0)}
          className="w-20"
        />
        <Button onClick={() => setAvailableTables(availableTables + 1)}>+</Button>
        <Button onClick={() => setAvailableTables(Math.max(0, availableTables - 1))}>-</Button>
      </div>
      <motion.p
        className={`mt-4 text-lg font-semibold ${
          availableTables > 0 ? "text-green-500" : "text-red-500"
        }`}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 0.3 }}
      >
        {availableTables > 0 ? `${availableTables} tables available` : "No tables available"}
      </motion.p>
    </motion.div>
  )
}
