"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"
import { useSession } from "next-auth/react"
import { useSearchParams } from "next/navigation"

interface MenuItem {
  name: string
  price: number
}

interface ShopData {
  shopType: "canteen" | "xerox"
  shopName: string
  address: string
  contact: string
  menuItems: MenuItem[]
}

function MenuItemForm({
  onAddItem,
  onRemoveItem,
  menuItems,
}: {
  onAddItem: (item: MenuItem) => void
  onRemoveItem: (index: number) => void
  menuItems: MenuItem[]
}) {
  const [itemName, setItemName] = useState("")
  const [itemPrice, setItemPrice] = useState("")

  const handleAddItem = (e: React.MouseEvent<HTMLButtonElement>) => {
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
      <div className="space-y-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <Label htmlFor="itemName" className="text-sm font-semibold text-blue-800">
              Item Name
            </Label>
            <Input
              id="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-900"
            />
          </div>
        </div>
        <Button
          onClick={handleAddItem}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
        >
          <Plus className="mr-2 h-5 w-5 inline" /> Add Item
        </Button>
      </div>
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

function ShopForm({ onSubmit, initialData }: { onSubmit: (data: ShopData) => void; initialData: ShopData | null }) {
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
            placeholder="Enter shop name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-900 bg-white"
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

export default function AdminDashboard() {
  const [shopData, setShopData] = useState<ShopData | null>(null)

  

  const searchParams = useSearchParams();
  const userId = searchParams.get("id"); // Get user ID from query params
//   const handleShopDataSubmit = async (data: ShopData) => {
//     const endpoint = data.shopType === "canteen" ? "/api/admin/canteen" : "/api/admin/xerox";
  
//     try {
//       const response = await fetch(endpoint, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });
  
//       if (!response.ok) {
//         throw new Error(`Failed to submit ${data.shopType} data`);
//       }
  
//       const result = await response.json();
//       console.log("Shop data submitted successfully:", result);
//       setShopData(result);
//     } catch (error) {
//       console.error("Error submitting shop data:", error);
//     }
//   };
const handleShopDataSubmit = async (data: ShopData) => {
    if (!userId) {
      console.error("User ID is missing in the URL");
      return;
    }
  
    try {
      let xeroxResult = null;
  
      if (data.shopType === "xerox") {
        const xeroxResponse = await fetch("/api/admin/xerox", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: parseInt(userId, 10), // Ensure userId is an integer
            storeName: data.shopName,
            address: data.address,
          }),
        });
  
        if (!xeroxResponse.ok) throw new Error("Failed to submit Xerox data");
  
        xeroxResult = await xeroxResponse.json();
      }
  
      // Submit data to the Canteen API
      const canteenResponse = await fetch("/api/admin/canteen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: parseInt(userId, 10),
          storeName: data.shopName,
          location: data.address,
          menu: data.menuItems?.map((item) => ({
            item: item.item,
            price: item.price.toString(), // Ensure price is a string
          })) || [],
        }),
      });
  
      if (!canteenResponse.ok) throw new Error("Failed to submit Canteen data");
  
      const canteenResult = await canteenResponse.json();
  
      console.log("Shop data submitted successfully:", { xeroxResult, canteenResult });
  
      setShopData({ xerox: xeroxResult, canteen: canteenResult });
    } catch (error) {
      console.error("Error submitting shop data:", error);
    }
  };
  
  
  
  
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-800 drop-shadow-lg">Admin Dashboard</h1>
      <div className="bg-white rounded-lg shadow-2xl p-6 md:p-8 max-w-3xl mx-auto">
        <ShopForm onSubmit={handleShopDataSubmit} initialData={shopData} />
      </div>
      {shopData && (
        <div className="mt-8 bg-white rounded-lg shadow-2xl p-6 md:p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Submitted Shop Data</h2>
          <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">{JSON.stringify(shopData, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}