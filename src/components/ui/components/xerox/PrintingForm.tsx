"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function PrintingForm() {
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    phone: session?.user?.phone || "",
    file: null as File | null,
    colour: "black-white", // Default value
    format: "single-sided", // Default value
  });

  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        name: session.user.name || "",
        email: session.user.email || "",
      }));
    }
  }, [session]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file) {
      alert("Please upload a PDF file.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("file", formData.file);
      formDataToSend.append("colour", formData.colour);
      formDataToSend.append("format", formData.format);
      formDataToSend.append("userId", session?.user?.id || "");

      await axios.post("/api/admin/xerox/uplode", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Print job submitted successfully!");
      setFormData((prev) => ({ ...prev, file: null })); // Reset file input
    } catch (error) {
      console.error("Error submitting print job:", error);
      alert("Failed to submit print job.");
    }
  };

  return (
    <Card className="card-shadow">
      <CardHeader className="bg-primary text-white rounded-t-lg">
        <CardTitle className="text-2xl">Submit Print Job</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="file">Upload PDF</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="file"
                name="file"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                required
                className="w-full"
              />
              <Upload className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="colour">Colour</Label>
            <Select
              value={formData.colour}
              onValueChange={(value) => handleSelectChange("colour", value)}
              required
              className="w-full"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Colour" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="black-white">Black-and-White</SelectItem>
                <SelectItem value="colourful">Colourful</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="format">Format</Label>
            <Select
              value={formData.format}
              onValueChange={(value) => handleSelectChange("format", value)}
              required
              className="w-full"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single-sided">Single-Sided</SelectItem>
                <SelectItem value="back-to-back">Back-to-Back</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white">
            Submit Print Job
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
