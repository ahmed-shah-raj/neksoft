"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// business type
type Business = {
  data: {
    fullName?: string;
    email?: string;
    id?: string;
    isAdminSeller?: boolean;
    phoneNumber?: string;
    sellerEmail?: string;
    sellerId?: string;
    sellerType?: string;
    accountType?: string;
    shopLogo?: {
      url?: string;
    };
  };
  description?: string;
};

export default function BusinessDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/login");
    } else {
      fetchBusinessData(token);
    }
  }, [router]);

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
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500 text-lg">
        Error: {error}
      </div>
    );
  }

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
          <InfoBlock label="Account Type" value={data?.accountType} />
          <InfoBlock label="Email" value={data?.email} />
          <InfoBlock label="ID" value={data?.id} />
          <InfoBlock label="Is Admin Seller" value={data?.isAdminSeller ? "Yes" : "No"} />
          <InfoBlock label="Phone Number" value={data?.phoneNumber} />
          <InfoBlock label="Seller Email" value={data?.sellerEmail} />
          <InfoBlock label="Seller ID" value={data?.sellerId} />
          <InfoBlock label="Seller Type" value={data?.sellerType} />
        </CardContent>
      </Card>
    </div>
  );
}

// Reusable component for displaying key-value pairs
function InfoBlock({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-base font-semibold text-gray-800">{value ?? "N/A"}</p>
    </div>
  );
}
