import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Truck, FileText, Settings, User, LogOut } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const navItems = [
  { name: "Dashboard", path: "/", icon: Home },
  { name: "Truck Overview", path: "/trucks", icon: Truck },
  { name: "Reports", path: "/reports", icon: FileText },
  { name: "Settings", path: "/settings", icon: Settings },
];

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest("a")
      ) {
        setCollapsed(true);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCollapsed(true);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [setCollapsed]);

  useEffect(() => {
    setCollapsed(true);
  }, [location.pathname, setCollapsed]);

  return (
    <TooltipProvider>
      <aside
        ref={sidebarRef}
        role="navigation"
        aria-label="Sidebar navigation"
        aria-expanded={!collapsed}
        className={`h-screen sticky top-0 z-30 shadow-xl flex flex-col justify-between transition-all border-r
          ${collapsed ? "w-[72px]" : "w-64"}
          bg-white border-blue-100`}
        style={{ transition: "all 0.5s cubic-bezier(.77,0,.18,1)" }}
      >
        <div>
          {/* Logo & Branding */}
          <div className="flex items-center px-4 py-5 border-b border-blue-100">
            <span className="bg-blue-600 rounded-full p-2">
              <User className="text-white" size={28} />
            </span>
            <span
              className={`ml-3 text-xl font-bold tracking-wide text-blue-900 transition-all duration-300 ${
                collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
              }`}
              style={{ letterSpacing: "0.05em" }}
            >
              MoniTruck
            </span>
          </div>

          {/* Navigation */}
          <nav className="mt-4 flex flex-col gap-1">
            {navItems.map(({ name, path, icon: Icon }) => {
              const isActive = location.pathname === path;
              return (
                <Tooltip key={name}>
                  <TooltipTrigger asChild>
                    <Link
                      to={path}
                      className={`group mx-2 px-4 py-2 rounded-lg flex items-center gap-3 transition-all
                        ${
                          isActive
                            ? "bg-blue-50 text-blue-700 font-semibold shadow"
                            : "text-blue-900 hover:bg-blue-50"
                        }
                      `}
                    >
                      <Icon size={22} className="shrink-0" />
                      <span
                        className={`text-base transition-all duration-300 ${
                          collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                        }`}
                      >
                        {name}
                      </span>
                    </Link>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right" className="capitalize">
                      {name}
                    </TooltipContent>
                  )}
                </Tooltip>
              );
            })}
          </nav>
        </div>

        {/* Profile + Logout */}
        <div className="px-4 pb-6 flex flex-col gap-2">
          <div
            className={`flex items-center gap-3 mb-2 transition-all duration-300 ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <div className="bg-blue-100 p-2 rounded-full">
              <User className="text-blue-700" size={22} />
            </div>
            <div
              className={`transition-all duration-300 ${
                collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
              }`}
            >
              <div className="text-sm font-semibold text-blue-900">Alex Mathews</div>
              <div className="text-xs text-blue-400">Fleet Manager</div>
            </div>
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="flex items-center justify-center gap-2 w-full py-2 text-sm rounded-lg border border-blue-100 text-blue-700 hover:bg-blue-50 transition-all"
                type="button"
                aria-label="Logout"
                onClick={() => alert("Logged out!")}
              >
                <LogOut size={18} />
                <span
                  className={`transition-all duration-300 ${
                    collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                  }`}
                >
                  Logout
                </span>
              </button>
            </TooltipTrigger>
            {collapsed && <TooltipContent side="right">Logout</TooltipContent>}
          </Tooltip>

          <div
            className={`mt-2 text-xs text-blue-300 text-center transition-all duration-300 ${
              collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
            }`}
            style={{ letterSpacing: "0.05em" }}
          >
            © 2025 MoniTruck
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
};

export default Sidebar;
