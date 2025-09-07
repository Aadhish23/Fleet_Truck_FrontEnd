import { Truck, Bell, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Use a world-class, professional font (e.g., Inter)
const fontFamily = { fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif" };

const DashboardHeader = () => {
  return (
    <header
      className="bg-white border-b border-blue-100 px-8 py-5 shadow-sm"
      style={fontFamily}
    >
      <div className="flex items-center justify-between">
        {/* Brand & Search */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="bg-blue-600 rounded-full p-2 shadow">
              <Truck className="h-8 w-8 text-white" />
            </span>
            <h1
              className="text-3xl font-extrabold tracking-tight text-blue-900"
              style={{ letterSpacing: "0.03em" }}
            >
              MoniTruck
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-blue-50 rounded-xl px-4 py-2 shadow-inner border border-blue-100">
            <Search className="h-5 w-5 text-blue-400" />
            <Input
              placeholder="Search vehicles, drivers, alerts..."
              className="border-0 bg-transparent focus-visible:ring-0 w-72 text-blue-900 placeholder:text-blue-300"
              style={fontFamily}
            />
          </div>
        </div>
        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-blue-50 transition"
            aria-label="Notifications"
          >
            <Bell className="h-6 w-6 text-blue-500" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-pink-500 border-2 border-white rounded-full animate-pulse"></span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-blue-50 transition"
            aria-label="Profile"
          >
            <User className="h-6 w-6 text-blue-500" />
          </Button>
          <div className="hidden md:flex flex-col items-end ml-2">
            <span
              className="font-semibold text-blue-900 text-sm"
              style={fontFamily}
            >
              Alex Mathews
            </span>
            <span className="text-xs text-blue-400">Fleet Manager</span>
          </div>
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="User Avatar"
            className="ml-2 w-10 h-10 rounded-full border-2 border-blue-100 shadow"
          />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;