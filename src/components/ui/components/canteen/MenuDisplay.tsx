import { motion, AnimatePresence } from "framer-motion"
import { Edit, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function MenuDisplay({ menuItems, setMenuItems }) {
  const handleDelete = (id) => {
    setMenuItems(menuItems.filter((item) => item.id !== id))
  }

  const handleEdit = (id, newPrice) => {
    setMenuItems(menuItems.map((item) => (item.id === id ? { ...item, price: newPrice } : item)))
  }

  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Today's Menu</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AnimatePresence>
          {menuItems.map((item) => (
            <motion.div
              key={item.id}
              className="bg-gray-100 p-4 rounded-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="text-lg font-bold mt-2">₹{item.price}</p>
              <div className="flex justify-end mt-2 space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Price</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                          Price
                        </Label>
                        <Input
                          id="price"
                          defaultValue={item.price}
                          className="col-span-3"
                          onChange={(e) => handleEdit(item.id, e.target.value)}
                        />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="icon" onClick={() => handleDelete(item.id)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}