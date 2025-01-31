"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

// Xerox shop card component
const XeroxShopCard = ({ id, storeName, location, user }: { id: number; storeName: string; location: string; user: any }) => (
  <Card className="w-full rounded-lg shadow-lg hover:scale-105 transition-all duration-300 ease-in-out bg-gradient-to-r from-blue-400 to-blue-600">
    <CardContent className="flex flex-col p-6">
      <h2 className="text-2xl font-extrabold text-white">{storeName}</h2>
      <p className="text-sm text-white/80">📍 {location}</p>
      <p className="text-sm text-white/60">👤 {user?.name || "Unknown User"}</p>
    </CardContent>
  </Card>
);

// Main page component
export default function XeroxShopsPage() {
  const [xeroxShops, setXeroxShops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch Xerox shop details
    const fetchXeroxShops = async () => {
      try {
        const response = await fetch("/api/admin/xerox");
        const data = await response.json();
        if (data.success) {
          setXeroxShops(data.data);
        }
      } catch (error) {
        console.error("Error fetching Xerox shops:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchXeroxShops();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
        Xerox Shops
      </h1>
      {loading ? (
        <p className="text-center text-lg text-gray-500">Loading...</p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {xeroxShops.length > 0 ? (
            xeroxShops.map((shop) => (
              <Link href={`/user/home/xerox/shop?user=${JSON.stringify(shop)}`}>
  <XeroxShopCard key={shop.id} id={shop.id} storeName={shop.storeName} location={shop.location} user={shop.user} />
</Link>

            ))
          ) : (
            <p className="text-center text-lg text-gray-500">No Xerox shops available.</p>
          )}
        </div>
      )}
    </div>
  );
}
