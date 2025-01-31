"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface MenuItem {
  id: number;
  item: string;
  price: string;
  canteenId: number;
}

interface Canteen {
  id: number;
  storeName: string;
  color: string;
  menu: MenuItem[]; // Include menu items
}

export default function CanteensPage() {
  const [canteens, setCanteens] = useState<Canteen[]>([]);

  useEffect(() => {
    const fetchCanteens = async () => {
      try {
        const response = await fetch("/api/admin/canteen/allcanteens");
        if (!response.ok) throw new Error("Failed to fetch canteens");

        const data = await response.json();
        setCanteens(
          data.map((canteen: any, index: number) => ({
            id: canteen.id,
            storeName: canteen.storeName,
            menu: canteen.menu || [], // Include menu items, default to empty array if missing
            color: ["bg-red-400", "bg-blue-400", "bg-green-400", "bg-yellow-400", "bg-purple-400"][index % 5], // Assign colors dynamically
          }))
        );
      } catch (error) {
        console.error("Error fetching canteens:", error);
      }
    };

    fetchCanteens();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
        Our Canteens
      </h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {canteens.map((canteen) => (
          <Link key={canteen.id} href={`/user/home/canteen/tables?canteen=${JSON.stringify(canteen.menu)}`}>
            <Card className={`w-full rounded-lg shadow-lg hover:scale-105 transition-all duration-300 ease-in-out ${canteen.color}`}>
              <CardContent className="p-6">
                <h2 className="text-2xl font-extrabold text-white">{canteen.storeName}</h2>
                <p className="text-sm text-white/80">ID: {canteen.id}</p>
                {/* <p className="text-sm text-white/80">ID: {canteen}</p> */}

              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
