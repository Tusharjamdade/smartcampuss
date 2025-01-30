import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Bar, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js"
import { Button } from "@/components/ui/button"

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement)

export default function AnalyticsDashboard({ menuItems, orders }) {
  const [orderData, setOrderData] = useState({
    labels: [],
    datasets: [
      {
        label: "Total Orders",
        data: [],
        backgroundColor: "rgba(135, 206, 235, 0.6)",
        borderColor: "rgba(135, 206, 235, 1)",
        borderWidth: 1,
      },
    ],
  })

  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [
      {
        label: "Revenue",
        data: [],
        fill: false,
        borderColor: "rgba(135, 206, 235, 1)",
        tension: 0.1,
      },
    ],
  })

  useEffect(() => {
    // Process orders data for charts
    const ordersByDate = orders.reduce((acc, order) => {
      const date = new Date(order.orderTime).toLocaleDateString()
      acc[date] = (acc[date] || 0) + 1
      return acc
    }, {})

    const revenueByDate = orders.reduce((acc, order) => {
      const date = new Date(order.orderTime).toLocaleDateString()
      acc[date] = (acc[date] || 0) + order.total
      return acc
    }, {})

    setOrderData({
      labels: Object.keys(ordersByDate),
      datasets: [
        {
          ...orderData.datasets[0],
          data: Object.values(ordersByDate),
        },
      ],
    })

    setRevenueData({
      labels: Object.keys(revenueByDate),
      datasets: [
        {
          ...revenueData.datasets[0],
          data: Object.values(revenueByDate),
        },
      ],
    })
  }, [orders, orderData.datasets[0]])

  const exportData = () => {
    // Implement CSV export logic here
    console.log("Exporting data...")
  }

  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Analytics Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-2">Total Orders per Day</h3>
          <Bar data={orderData} />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Revenue Generated</h3>
          <Line data={revenueData} />
        </div>
      </div>
      <div className="mt-8">
        <Button onClick={exportData}>Export Data as CSV</Button>
      </div>
    </motion.div>
  )
}