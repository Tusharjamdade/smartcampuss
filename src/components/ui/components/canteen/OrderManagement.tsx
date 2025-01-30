import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Printer, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function OrderManagement({ orders, setOrders }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")

  const handleStatusUpdate = (id, newStatus) => {
    setOrders(orders.map((order) => (order.id === id ? { ...order, deliveryStatus: newStatus } : order)))
  }

  const filteredOrders = orders.filter(
    (order) =>
      (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.userName.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filter === "all" || order.paymentStatus.toLowerCase() === filter),
  )

  const printReceipt = (order) => {
    // Implement receipt printing logic here
    console.log("Printing receipt for order:", order.id)
  }

  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Order Management</h2>
      <div className="flex items-center space-x-2 mb-4">
        <Search className="w-5 h-5 text-gray-500" />
        <Input
          type="text"
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="p-2 border rounded-md">
          <option value="all">All</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Table</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {filteredOrders.map((order) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.userName}</TableCell>
                <TableCell>{order.tableNumber}</TableCell>
                <TableCell>{order.items.join(", ")}</TableCell>
                <TableCell>₹{order.total}</TableCell>
                <TableCell>
                  <span className={order.paymentStatus === "Paid" ? "text-green-500" : "text-red-500"}>
                    {order.paymentStatus}
                  </span>
                </TableCell>
                <TableCell>{order.deliveryStatus}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleStatusUpdate(order.id, "Prepared")}>
                      <Check className="w-4 h-4 mr-1" />
                      Prepared
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleStatusUpdate(order.id, "Delivered")}>
                      <Check className="w-4 h-4 mr-1" />
                      Delivered
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => printReceipt(order)}>
                      <Printer className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </motion.tr>
            ))}
          </AnimatePresence>
        </TableBody>
      </Table>
    </motion.div>
  )
}