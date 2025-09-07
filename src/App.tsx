// App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import MainLayout from "@/components/MainLayout";
import Index from "@/pages/Index";
import Trucks from "@/pages/Trucks";
import { ReportsPanel } from "@/components/ReportsPanel";
import { SettingsPage } from "@/components/SettingsPage";
import NotFound from "@/pages/NotFound";
import LoginPage from "@/components/LoginPage"; // ← Add your login page
import { PrivateRoute } from "@/components/PrivateRoute"; // ← Add auth wrapper

// Import Leaflet setup - this must be imported before any components that use Leaflet
import "./leaflet-setup";

// Import Leaflet CSS
import "leaflet/dist/leaflet.css";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Route - Login */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <MainLayout />
                </PrivateRoute>
              }
            >
              <Route index element={<Index />} />
              <Route path="trucks" element={<Trucks />} />
              <Route path="reports" element={<ReportsPanel />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            {/* 404 & Redirects */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
