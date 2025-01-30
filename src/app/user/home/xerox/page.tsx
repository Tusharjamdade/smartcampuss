import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

// Mock data for canteens with color information
const canteens = [
  { id: "C001", name: "Main Building Cafeteria", color: "bg-gradient-to-r from-red-400 to-red-600" },
  { id: "C002", name: "Science Block Canteen", color: "bg-gradient-to-r from-blue-400 to-blue-600" },
  { id: "C003", name: "Sports Complex Snack Bar", color: "bg-gradient-to-r from-green-400 to-green-600" },
  { id: "C004", name: "Library Café", color: "bg-gradient-to-r from-yellow-400 to-yellow-600" },
  { id: "C005", name: "Engineering Wing Eatery", color: "bg-gradient-to-r from-purple-400 to-purple-600" },
];

// Canteen card component
const CanteenCard = ({ id, name, color }: { id: string; name: string; color: string }) => (
    <Link href={"/user/home/xerox/shop"}> 
  <Card className={`w-full rounded-lg shadow-lg hover:scale-105 transition-all duration-300 ease-in-out ${color}`}>
    <CardContent className="flex justify-between items-center p-6">
      <h2 className="text-2xl font-extrabold text-white">{name}</h2>
      <p className="text-sm text-white/80">ID: {id}</p>
    </CardContent>
  </Card>
  </Link>
);

// Main page component
export default function CanteensPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
        Our Canteens
      </h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {canteens.map((canteen) => (
          <CanteenCard key={canteen.id} id={canteen.id} name={canteen.name} color={canteen.color} />
        ))}
      </div>
    </div>
  );
}
