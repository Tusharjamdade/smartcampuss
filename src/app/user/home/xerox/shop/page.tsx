import AdminInfo from "@/components/ui/components/xerox/AdminInfo";
import PrintingForm from "@/components/ui/components/xerox/PrintingForm";

export default function Home() {
  return (
    <div className="min-h-screen gradient-bg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-primary">Campus Printing Service</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <AdminInfo />
          <PrintingForm />
        </div>
      </div>
    </div>
  )
}