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
import { LoginPage } from "@/components/LoginPage";
import { RegisterPage } from "@/components/RegisterPage";
import { PrivateRoute } from "@/components/PrivateRoute";
import { AuthProvider } from "@/context/AuthContext";

// Import Leaflet setup
import "./leaflet-setup";
import "leaflet/dist/leaflet.css";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

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
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;