"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from "lucide-react"
import { MenuItem } from "./Types"

interface MenuItemFormProps {
  onAddItem: (item: MenuItem) => void
  onRemoveItem: (index: number) => void
  menuItems: MenuItem[]
}

export default function MenuItemForm({ onAddItem, onRemoveItem, menuItems }: MenuItemFormProps) {
  const [itemName, setItemName] = useState("")
  const [itemPrice, setItemPrice] = useState("")

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (itemName && itemPrice) {
      onAddItem({ name: itemName, price: Number.parseFloat(itemPrice) })
      setItemName("")
      setItemPrice("")
    }
  }

  return (
    <div className="mt-8 bg-blue-50 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Menu Items</h2>
      <form onSubmit={handleAddItem} className="space-y-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <Label htmlFor="itemName" className="text-sm font-semibold text-blue-800">
              Item Name
            </Label>
            <Input
              id="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-900"
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="itemPrice" className="text-sm font-semibold text-blue-800">
              Price
            </Label>
            <Input
              id="itemPrice"
              type="number"
              step="0.01"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-900"
            />
          </div>
        </div>
        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
        >
          <Plus className="mr-2 h-5 w-5 inline" /> Add Item
        </Button>
      </form>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4 text-blue-800">Current Menu Items:</h3>
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index} className="bg-white p-3 rounded-md shadow-sm flex justify-between items-center">
              <span className="font-medium text-gray-700">{item.name}</span>
              <div className="flex items-center">
                <span className="text-blue-600 font-bold mr-4">${item.price.toFixed(2)}</span>
                <Button
                  onClick={() => onRemoveItem(index)}
                  variant="destructive"
                  size="sm"
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}