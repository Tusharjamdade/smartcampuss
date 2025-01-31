"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import MenuItemForm from "./MenuItemForm"
import { MenuItem, ShopData } from "./Types"


interface ShopFormProps {
  onSubmit: (data: ShopData) => void
  initialData: ShopData | null
}

export default function ShopForm({ onSubmit, initialData }: ShopFormProps) {
  const [shopType, setShopType] = useState<"canteen" | "xerox">("canteen")
  const [shopName, setShopName] = useState("")
  const [address, setAddress] = useState("")
  const [contact, setContact] = useState("")
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])

  useEffect(() => {
    if (initialData) {
      setShopType(initialData.shopType)
      setShopName(initialData.shopName)
      setAddress(initialData.address)
      setContact(initialData.contact)
      setMenuItems(initialData.menuItems || [])
    }
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      shopType,
      shopName,
      address,
      contact,
      menuItems: shopType === "canteen" ? menuItems : [],
    })
  }

  const handleAddMenuItem = (item: MenuItem) => {
    setMenuItems((prevItems) => [...prevItems, item])
  }

  const handleRemoveMenuItem = (index: number) => {
    setMenuItems((prevItems) => prevItems.filter((_, i) => i !== index))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="shopName" className="text-lg font-semibold text-blue-800">
            Shop Name
          </Label>
          <Input
            id="shopName"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-900"
          />
        </div>
        <div>
          <Label htmlFor="address" className="text-lg font-semibold text-blue-800">
            Address
          </Label>
          <Input
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-900"
          />
        </div>
        <div>
          <Label htmlFor="contact" className="text-lg font-semibold text-blue-800">
            Contact
          </Label>
          <Input
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-900"
          />
        </div>
      </div>
      <div className="mt-6">
        <Label htmlFor="shopType" className="text-lg font-semibold text-blue-800">
          Shop Type
        </Label>
        <Select value={shopType} onValueChange={(value: "canteen" | "xerox") => setShopType(value)}>
          <SelectTrigger className="w-full mt-1">
            <SelectValue placeholder="Select shop type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="canteen">Canteen</SelectItem>
            <SelectItem value="xerox">Xerox Center</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {shopType === "canteen" && (
        <MenuItemForm onAddItem={handleAddMenuItem} onRemoveItem={handleRemoveMenuItem} menuItems={menuItems} />
      )}
      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
      >
        Save Shop Details
      </Button>
    </form>
  )
}