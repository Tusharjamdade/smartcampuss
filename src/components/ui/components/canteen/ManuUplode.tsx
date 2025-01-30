import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function MenuUpload({ setMenuItems }) {
  const [item, setItem] = useState({ name: "", description: "", price: "", image: null })

  const handleSubmit = (e) => {
    e.preventDefault()
    setMenuItems((prev) => [...prev, { ...item, id: Date.now() }])
    setItem({ name: "", description: "", price: "", image: null })
  }

  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Upload Today's Menu</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Food Item Name</Label>
          <Input id="name" value={item.name} onChange={(e) => setItem({ ...item, name: e.target.value })} required />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={item.description}
            onChange={(e) => setItem({ ...item, description: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            value={item.price}
            onChange={(e) => setItem({ ...item, price: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="image">Image</Label>
          <Input
            id="image"
            type="file"
            onChange={(e) => setItem({ ...item, image: e.target.files[0] })}
            accept="image/*"
          />
        </div>
        <Button type="submit">Add Item</Button>
      </form>
    </motion.div>
  )
}