"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin, Phone, Mail, User } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function AdminInfo() {
  const searchParams = useSearchParams();
  
  // Extract user and shop info from query params
  const userParam = searchParams.get("user");
  const parsedUser = userParam ? JSON.parse(decodeURIComponent(userParam)) : null;

  // Fallback if user is not present or query is malformed
  if (!parsedUser) {
    return <div>Loading...</div>;
  }

  // Extract additional store information
  const storeName = parsedUser.storeName || "N/A";
  const location = parsedUser.location || "N/A";
  const ownerName = parsedUser.user?.name || "N/A";
  const ownerEmail = parsedUser.user?.email || "N/A";
  const ownerPhone = parsedUser.user?.phone || "N/A";

  return (
    <Card className="card-shadow">
      <CardHeader className="bg-primary text-white rounded-t-lg">
        <CardTitle className="text-2xl">Xerox Shop Information</CardTitle>
      </CardHeader>
      <CardContent className="mt-4 space-y-4">
        <InfoItem icon={User} label="Owner" value={ownerName} />
        <InfoItem icon={MapPin} label="Location" value={location} />
        <InfoItem icon={Clock} label="Store Name" value={storeName} />
        <InfoItem icon={Phone} label="Contact" value={ownerPhone} />
        <InfoItem icon={Mail} label="Email" value={ownerEmail} />
      </CardContent>
    </Card>
  );
}

function InfoItem({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center space-x-3">
      <Icon className="h-5 w-5 text-primary" />
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-base font-semibold">{value}</p>
      </div>
    </div>
  );
}
