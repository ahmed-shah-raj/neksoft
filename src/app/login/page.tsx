"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "https://adminbuypass.neksoft.com/api/v1/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userName, password }),
        }
      );

      const data = await response.json();

      // Get access token from the response
      const token =
        data?.data?.access_token || data?.access_token || data?.data?.token;

      if (response.ok && token) {
        localStorage.setItem("access_token", token); // Save token
        setMessage("Login successful ✅");

        // Redirect to /data immediately
        router.push("/data");
      } else {
        setMessage(data?.message || "Login failed ❌");
      }
    } catch (err) {
      setMessage("An error occurred.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md p-8 space-y-6">
        <h1 className="text-2xl font-bold">Login</h1>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button onClick={handleLogin} disabled={loading} className="w-full">
          {loading ? "Logging in..." : "Login"}
        </Button>

        {message && (
          <p
            className={`text-sm ${
              message.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
