import { useState } from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function UserFeedback({ feedback }) {
  const [sortBy, setSortBy] = useState("date")

  const sortedFeedback = [...feedback].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date) - new Date(a.date)
    } else {
      return b.rating - a.rating
    }
  })

  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4">User Feedback</h2>
      <div className="mb-4">
        <Select onValueChange={setSortBy} defaultValue={sortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-4">
        {sortedFeedback.map((item) => (
          <motion.div
            key={item.id}
            className="bg-gray-100 p-4 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{item.userName}</h3>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < item.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-600">{item.comment}</p>
            <p className="text-sm text-gray-500 mt-2">
              {new Date(item.date).toLocaleDateString()}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
