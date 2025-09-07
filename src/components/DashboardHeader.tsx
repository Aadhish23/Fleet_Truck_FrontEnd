import { Truck, Bell, User, Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";

// Use a world-class, professional font (e.g., Inter)
const fontFamily = { fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif" };

const DashboardHeader = () => {
  const { user, logout } = useAuth();

  // Get user initials for avatar
  const getUserInitials = (name: string): string => {
    if (!name) return "U";
    const words = name.trim().split(" ");
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  // Format role for display
  const formatRole = (role: string): string => {
    return role
      .split("_")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const handleLogout = () => {
    logout();
  };

  const userInitials = user ? getUserInitials(user.name) : "U";
  const displayName = user?.name || "User";
  const displayRole = user?.role ? formatRole(user.role) : "User";

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

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-3 hover:bg-blue-50 transition px-3 py-2 h-auto"
              >
                {/* User Info - Hidden on small screens */}
                <div className="hidden md:flex flex-col items-end">
                  <span
                    className="font-semibold text-blue-900 text-sm"
                    style={fontFamily}
                  >
                    {displayName}
                  </span>
                  <span className="text-xs text-blue-400">{displayRole}</span>
                </div>

                {/* Profile Avatar with Initials */}
                <Avatar className="w-10 h-10 border-2 border-blue-100 shadow">
                  <AvatarFallback 
                    className="bg-blue-600 text-white font-semibold text-sm"
                    style={fontFamily}
                  >
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent 
              align="end" 
              className="w-56"
              style={fontFamily}
            >
              <DropdownMenuLabel className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{displayName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </DropdownMenuLabel>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem 
                className="flex items-center gap-2 text-red-600 focus:text-red-600"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;