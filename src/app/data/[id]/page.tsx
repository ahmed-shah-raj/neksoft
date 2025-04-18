"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function BusinessDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [business, setBusiness] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    // to check if token is available or not
    if (!token) {
      router.push("/login");
    } else {
      fetchBusinessData(token);
    }
  }, [router]);

  // to fetch data
  const fetchBusinessData = async (token: string) => {
    try {
      const response = await fetch(
        `https://adminbuypass.neksoft.com/api/v1/business/detail?businesId=${params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch business data.");
      }

      const data = await response.json();
      setBusiness(data);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading)
    return <div className="text-center mt-10 text-lg">Loading...</div>;

  if (error)
    return (
      <div className="text-center mt-10 text-red-500 text-lg">
        Error: {error}
      </div>
    );

  const data = business?.data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-200">
        <CardHeader className="flex flex-col items-center text-center gap-4 pb-0">
          <Avatar className="w-24 h-24 ring-2 ring-primary shadow-md">
            <AvatarImage
              src={data?.shopLogo?.url}
              alt="Business Logo"
              className="object-cover"
            />
            <AvatarFallback className="text-xl font-bold bg-gray-200 text-gray-600">
              {data?.fullName?.[0] ?? "?"}
            </AvatarFallback>
          </Avatar>

          <CardTitle className="text-3xl font-bold text-gray-800">
            {data?.fullName || "Business Name"}
          </CardTitle>
          <p className="text-gray-500 text-sm max-w-sm">
            {business?.description || "No description available."}
          </p>
        </CardHeader>

        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
          <div>
            <p className="text-sm font-medium text-gray-500">Account Type</p>
            <p className="text-base font-semibold text-gray-800">
              {data?.accountType ?? "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="text-base font-semibold text-gray-800">
              {data?.email ?? "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">ID</p>
            <p className="text-base font-semibold text-gray-800">
              {data?.id ?? "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Is Admin Seller</p>
            <p className="text-base font-semibold text-gray-800">
              {data?.isAdminSeller ? "Yes" : "No"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Phone Number</p>
            <p className="text-base font-semibold text-gray-800">
              {data?.phoneNumber ?? "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Seller Email</p>
            <p className="text-base font-semibold text-gray-800">
              {data?.sellerEmail ?? "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Seller ID</p>
            <p className="text-base font-semibold text-gray-800">
              {data?.sellerId ?? "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Seller Type</p>
            <p className="text-base font-semibold text-gray-800">
              {data?.sellerType ?? "N/A"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
