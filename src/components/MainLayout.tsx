import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(true);

  // Collapse sidebar on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCollapsed(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      className="flex h-screen w-screen overflow-hidden bg-gray-100 text-blue-900"
      role="application"
    >
      {/* Sidebar Navigation */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content */}
      <main
        className="flex-1 overflow-auto p-4 transition-all duration-300 ease-in-out"
        role="main"
        aria-label="Main content area"
        onClick={() => {
          if (!collapsed) setCollapsed(true);
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
