"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Search } from "lucide-react";
import axios from "axios";

export default function XeroxDashboard() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch data from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/admin/xerox/uplode");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Handle search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Handle file download
  const handleDownload = async (fileUrl: string, fileName: string) => {
    try {
      const response = await axios.get(fileUrl, { responseType: "blob" }); // Get file as blob
      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName; // Set the file name for download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Failed to download file.");
    }
  };

  // Handle status change and update API
  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await axios.put(`/api/jobs/${id}`, { status: newStatus });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, status: newStatus } : user
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-indigo-800 mb-6">
          Xerox Owner&apos;s Dashboard
        </h1>

        {/* Search Input */}
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

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {users
            .filter(
              (user) =>
                user.name.toLowerCase().includes(searchTerm) ||
                user.phone.includes(searchTerm)
            )
            .map((user, index) => (
              <Card key={user.id} className={`${index % 2 === 0 ? "bg-indigo-50" : "bg-blue-50"}`}>
                <CardContent className="p-4">
                  {/* Serial Number and Cost */}
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-indigo-700">S.R: {user.sr}</span>
                    <span className="text-sm text-indigo-600">${user.cost.toFixed(2)}</span>
                  </div>

                  {/* User Info */}
                  <h3 className="text-lg font-semibold text-indigo-900 mb-2">
                    {user.name}
                  </h3>
                  <p className="text-sm text-indigo-600 mb-2">{user.phone}</p>

                  {/* File Download & Status */}
                  <div className="flex justify-between items-center mb-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(user.fileUrl, user.fileName)}
                      className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 p-0"
                    >
                      <Download size={16} className="mr-2" />
                      {user.fileName}
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

                  {/* Update Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => alert(`Status updated for ${user.name}`)}
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
  );
}
