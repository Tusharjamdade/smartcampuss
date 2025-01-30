"use client";

import { useState } from "react";
import { signIn } from "next-auth/react"; // Use next-auth signIn
import { useRouter } from "next/navigation"; // Import useRouter for redirection
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SignInPage() {
  const [userType, setUserType] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Initialize router

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(""); // Reset error state

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      userType,
    });

    if (result?.error) {
      setError(result.error); // Display error message
    } else {
      console.log("Sign in successful");
      router.push("/"); // Redirect to home page after successful sign-in
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex justify-center items-center mb-1">
              <CardTitle>Sign In</CardTitle>
            </div>
            <div className="flex justify-center items-center">
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="userType">User Type</Label>
                <Select onValueChange={setUserType} defaultValue={userType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select user type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="hidden lg:flex w-1/2 bg-cover bg-center items-center justify-center p-8 " style={{ backgroundImage: "url('/img.jpg')",color:"white" }}>
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-lg">
          <h2 className="text-2xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-gray-700">Log in to access your account and start managing your tasks effortlessly.</p>
        </div>
      </div>
    </div>
  );
}
