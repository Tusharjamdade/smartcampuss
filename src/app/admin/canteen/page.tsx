"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

import AnalyticsDashboard from "@/components/ui/components/canteen/AnalyticsDashboard"
import MenuDisplay from "@/components/ui/components/canteen/MenuDisplay"
import OrderManagement from "@/components/ui/components/canteen/OrderManagement"
import TableAvailability from "@/components/ui/components/canteen/TableAvailability"
import UserFeedback from "@/components/ui/components/canteen/UserFeedback"
import Notifications from "@/components/ui/components/canteen/Notifications"
import MenuUpload from "@/components/ui/components/canteen/ManuUplode"

export default function CanteenManagement() {
  const [menuItems, setMenuItems] = useState([])
  const [orders, setOrders] = useState([])
  const [feedback, setFeedback] = useState([])
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    // Simulating real-time updates
    const interval = setInterval(() => {
      // Simulate new order
      if (Math.random() > 0.7) {
        const newOrder = {
          id: `ORD${Math.floor(Math.random() * 1000)}`,
          userName: `User${Math.floor(Math.random() * 100)}`,
          tableNumber: Math.floor(Math.random() * 20) + 1,
          items: ["Item 1", "Item 2"],
          total: Math.floor(Math.random() * 1000) + 100,
          orderTime: new Date().toISOString(),
          paymentStatus: Math.random() > 0.5 ? "Paid" : "Pending",
          deliveryStatus: "Preparing",
        }
        setOrders((prev) => [...prev, newOrder])
        setNotifications((prev) => [
          ...prev,
          `New order received from ${newOrder.userName}`,
        ])
      }

      // Simulate new feedback
      if (Math.random() > 0.8) {
        const newFeedback = {
          id: `FB${Math.floor(Math.random() * 1000)}`,
          userName: `User${Math.floor(Math.random() * 100)}`,
          rating: Math.floor(Math.random() * 5) + 1,
          comment: "Great food and service!",
          date: new Date().toISOString(),
        }
        setFeedback((prev) => [...prev, newFeedback])
        setNotifications((prev) => [
          ...prev,
          `New feedback received from ${newFeedback.userName}`,
        ])
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-3xl font-bold mb-8 text-sky-300"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Canteen Management
      </motion.h1>

      <Notifications notifications={notifications} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <MenuUpload setMenuItems={setMenuItems} />
        <MenuDisplay menuItems={menuItems} setMenuItems={setMenuItems} />
      </div>

      {/* <TableAvailability /> */}

      <OrderManagement orders={orders} setOrders={setOrders} />

      <UserFeedback feedback={feedback} />

      <AnalyticsDashboard menuItems={menuItems} orders={orders} />
    </div>
  )
}
