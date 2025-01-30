"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Search } from "lucide-react"

// Mock data for the table
const initialUsers = [
  {
    id: 1,
    sr: "001",
    name: "Alice Johnson",
    phone: "123-456-7890",
    file: "document1.pdf",
    status: "Pending",
    cost: 5.5,
  },
  {
    id: 2,
    sr: "002",
    name: "Bob Smith",
    phone: "098-765-4321",
    file: "presentation.pptx",
    status: "Completed",
    cost: 7.25,
  },
  {
    id: 3,
    sr: "003",
    name: "Charlie Brown",
    phone: "111-222-3333",
    file: "essay.docx",
    status: "Printing",
    cost: 3.75,
  },
  { id: 4, sr: "004", name: "Diana Prince", phone: "444-555-6666", file: "report.pdf", status: "Pending", cost: 6.0 },
  { id: 5, sr: "005", name: "Ethan Hunt", phone: "777-888-9999", file: "thesis.pdf", status: "Completed", cost: 15.5 },
]

export default function XeroxDashboard() {
  const [users, setUsers] = useState(initialUsers)
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    const filteredUsers = initialUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(event.target.value.toLowerCase()) || user.phone.includes(event.target.value),
    )
    setUsers(filteredUsers)
  }

  const handleDownload = (file: string) => {
    // Implement file download logic here
    console.log(Downloading file: ${file})
  }

  const handleStatusChange = (id: number, newStatus: string) => {
    // Implement status change logic here
    console.log(Changing status for user with id: ${id} to ${newStatus})
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-indigo-800 mb-6">Xerox Owner&apos;s Dashboard</h1>

        <div className="mb-6 relative">
          <Input
            type="text"
            placeholder="Search by name or phone"
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" size={20} />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {users.map((user, index) => (
            <Card key={user.id} className={overflow-hidden ${index % 2 === 0 ? "bg-indigo-50" : "bg-blue-50"}}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-indigo-700">S.R: {user.sr}</span>
                  <span className="text-sm text-indigo-600">${user.cost.toFixed(2)}</span>
                </div>
                <h3 className="text-lg font-semibold text-indigo-900 mb-2">{user.name}</h3>
                <p className="text-sm text-indigo-600 mb-2">{user.phone}</p>
                <div className="flex justify-between items-center mb-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDownload(user.file)}
                    className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 p-0"
                  >
                    <Download size={16} className="mr-2" />
                    {user.file}
                  </Button>
                  <select
                    value={user.status}
                    onChange={(e) => handleStatusChange(user.id, e.target.value)}
                    className="bg-transparent border-b border-indigo-200 focus:border-indigo-500 text-sm text-indigo-700"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Printing">Printing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange(user.id, user.status)}
                  className="w-full mt-2 border-indigo-300 text-indigo-700 hover:bg-indigo-100"
                >
                  Update
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}