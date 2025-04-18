// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// type Business = {
//   _id: string;
//   fullName: string;
//   email: string;
//   status: string;
//   shopLogo?: {
//     url: string;
//   };
// };

// export default function BusinessCardView() {
//   const router = useRouter();
//   const [businessData, setBusinessData] = useState<Business[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const token = localStorage.getItem("access_token");

//     if (!token) {
//       router.push("/login");
//     } else {
//       fetchBusinessData(token);
//     }
//   }, [router]);

//   const fetchBusinessData = async (token: string) => {
//     try {
//       const response = await fetch(
//         "https://adminbuypass.neksoft.com/api/v1/business?page=10&count=10&searchfield=?20",
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch business data.");
//       }

//       const data = await response.json();
//       setBusinessData(data.data.data);
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError("Unknown error");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (isLoading) return <div className="text-center mt-10">Loading...</div>;
//   if (error)
//     return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

//   return (
//     <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//       {businessData.map((business) => (
//         <Link key={business._id} href={`/data/${business._id}`}>
//           <Card className="shadow-md h-[13rem] hover:shadow-xl transition duration-300 cursor-pointer">
//             <CardHeader className="flex flex-col items-center justify-center">
//               {business.shopLogo?.url && (
//                 <div className="flex items-center space-x-2">
//                   <img
//                     src={business.shopLogo.url}
//                     alt={`${business.fullName} logo`}
//                     className="w-10 h-10 rounded-full object-cover"
//                   />
//                 </div>
//               )}
//               <CardTitle className="text-lg">{business.fullName}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-sm text-gray-700">
//                 <strong>Email:</strong> {business.email}
//               </p>
//               <p className="text-sm text-gray-700">
//                 <strong>Status:</strong> {business.status}
//               </p>
//               <p className="text-sm text-gray-700">
//                 <strong>ID:</strong> {business._id}
//               </p>
//             </CardContent>
//           </Card>
//         </Link>
//       ))}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from "@/components/ui/pagination";

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
  const [page, setPage] = useState(1);
  const countPerPage = 10; // default page size
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      router.push("/login");
    } else {
      fetchBusinessData(token, page);
    }
  }, [page, router]);

  const fetchBusinessData = async (token: string, page: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://adminbuypass.neksoft.com/api/v1/business?page=${page}&count=${countPerPage}`,
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
      const total = data.data.total || 100; // assuming total is returned
      setTotalPages(Math.ceil(total / countPerPage));
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
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Pagination */}
      <div className="mt-10 flex justify-center cursor-pointer">
        <Pagination>
          <PaginationContent>
            {/* Previous Button */}
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => {
              const pageNumber = i + 1;
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    isActive={page === pageNumber}
                    onClick={() => setPage(pageNumber)}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {/* Next Button */}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                className={
                  page === totalPages ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
