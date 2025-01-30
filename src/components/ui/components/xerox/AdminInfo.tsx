import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, MapPin, Phone, Mail, User } from "lucide-react"

export default function AdminInfo() {
  return (
    <Card className="card-shadow">
      <CardHeader className="bg-primary text-white rounded-t-lg">
        <CardTitle className="text-2xl">Xerox Shop Information</CardTitle>
      </CardHeader>
      <CardContent className="mt-4 space-y-4">
        <InfoItem icon={User} label="Owner" value="John Doe" />
        <InfoItem icon={MapPin} label="Location" value="Student Center, Room 101" />
        <InfoItem icon={Clock} label="Hours" value="Mon-Fri, 8:00 AM - 6:00 PM" />
        <InfoItem icon={Phone} label="Contact" value="(555) 123-4567" />
        <InfoItem icon={Mail} label="Email" value="print@campusquickprint.com" />
      </CardContent>
    </Card>
  )
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
  )
}