import { motion, AnimatePresence } from "framer-motion"
import { Bell } from "lucide-react"

export default function Notifications({ notifications }) {
  return (
    <motion.div
      className="fixed top-4 right-4 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence>
        {notifications.slice(-3).map((notification, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 mb-2 flex items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Bell className="w-5 h-5 mr-2 text-sky-300" />
            <p>{notification}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}