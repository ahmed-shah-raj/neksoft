"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Business = {
  _id: string;
  fullName: string;
  email: string;
  status: string;
  shopLogo?: {
    url: string;
  };
};

export default function BusinessCardView() {
  const router = useRouter();
  const [businessData, setBusinessData] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        "https://adminbuypass.neksoft.com/api/v1/business?page=10&count=10&searchfield=?20",
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
      setBusinessData(data.data.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {businessData.map((business) => (
        <Link key={business._id} href={`/data/${business._id}`}>
          <Card className="shadow-md h-[13rem] hover:shadow-xl transition duration-300 cursor-pointer">
            <CardHeader className="flex flex-col items-center justify-center">
              {business.shopLogo?.url && (
                <div className="flex items-center space-x-2">
                  <img
                    src={business.shopLogo.url}
                    alt={`${business.fullName} logo`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
              )}
              <CardTitle className="text-lg">{business.fullName}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700">
                <strong>Email:</strong> {business.email}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Status:</strong> {business.status}
              </p>
              <p className="text-sm text-gray-700">
                <strong>ID:</strong> {business._id}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
