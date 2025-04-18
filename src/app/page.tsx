import { Button } from "@/components/ui/button"; // Shadcn UI Button
import Link from "next/link";

const AnimatedPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className="text-center space-y-8">
        {/* Welcome Text Animation */}
        <h1 className="text-4xl font-extrabold text-white">
          Welcome to Our App!
        </h1>

        {/* Login Button Animation */}
        <div>
          <Link href="/login" passHref>
            <Button className="px-6 py-3 text-white font-semibold bg-blue-600 hover:bg-blue-700 transition">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AnimatedPage;