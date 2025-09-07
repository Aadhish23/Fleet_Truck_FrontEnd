import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Truck, AlertCircle, Fuel } from "lucide-react";

const TruckMap = () => {
  const mapRef = useRef(null);

  // Sample truck data with real coordinates (around India)
  const trucks = [
    { 
      id: "TRK-001", 
      driver: "Ravi Kumar", 
      location: "Mumbai Highway", 
      status: "active", 
      fuel: 85,
      coordinates: [19.0760, 72.8777] // Mumbai
    },
    { 
      id: "TRK-002", 
      driver: "Meena Devi", 
      location: "Bangalore Route", 
      status: "drowsy", 
      fuel: 42,
      coordinates: [12.9716, 77.5946] // Bangalore
    },
    { 
      id: "TRK-003", 
      driver: "Sundar", 
      location: "Chennai Express", 
      status: "active", 
      fuel: 76,
      coordinates: [13.0827, 80.2707] // Chennai
    },
    { 
      id: "TRK-004", 
      driver: "Patel", 
      location: "Delhi Highway", 
      status: "low-fuel", 
      fuel: 15,
      coordinates: [28.6139, 77.2090] // Delhi
    },
  ];

  // Route coordinates for polyline
  const routeCoordinates = [
    [28.6139, 77.2090], // Delhi
    [26.9124, 75.7873], // Jaipur
    [23.0225, 72.5714], // Ahmedabad
    [19.0760, 72.8777], // Mumbai
    [15.2993, 74.1240], // Goa
    [12.9716, 77.5946], // Bangalore
    [13.0827, 80.2707], // Chennai
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-100";
      case "drowsy":
        return "text-yellow-600 bg-yellow-100";
      case "low-fuel":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <Truck className="h-4 w-4 text-green-600" />;
      case "drowsy":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case "low-fuel":
        return <Fuel className="h-4 w-4 text-red-600" />;
      default:
        return <Truck className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Active";
      case "drowsy":
        return "Drowsy Alert";
      case "low-fuel":
        return "Low Fuel";
      default:
        return "Unknown";
    }
  };

  // Initialize map with pure Leaflet
  useEffect(() => {
    // Check if Leaflet is available test
    if (typeof window !== 'undefined' && (window as any).L) {
      const L = (window as any).L;
      
      if (mapRef.current && !mapRef.current._leaflet_id) {
        // Initialize map
        const map = L.map(mapRef.current).setView([20.5937, 78.9629], 5);
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Custom truck icon function
        const createTruckIcon = (status) => {
          const getColor = (status) => {
            switch (status) {
              case 'active': return '#10b981';
              case 'drowsy': return '#f59e0b';
              case 'low-fuel': return '#ef4444';
              default: return '#6b7280';
            }
          };

          return L.divIcon({
            html: `<div style="
              background-color: ${getColor(status)};
              width: 25px;
              height: 25px;
              border-radius: 50%;
              border: 2px solid white;
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
            ">🚛</div>`,
            className: 'custom-truck-marker',
            iconSize: [25, 25],
            iconAnchor: [12, 12]
          });
        };

        // Add truck markers
        const markers = [];
        trucks.forEach(truck => {
          const marker = L.marker(truck.coordinates, {
            icon: createTruckIcon(truck.status)
          })
          .addTo(map)
          .bindPopup(`
            <div style="min-width: 200px; font-family: system-ui;">
              <div style="font-weight: bold; font-size: 16px; margin-bottom: 8px;">${truck.id}</div>
              <div style="margin: 4px 0;"><strong>Driver:</strong> ${truck.driver}</div>
              <div style="margin: 4px 0;"><strong>Location:</strong> ${truck.location}</div>
              <div style="margin: 4px 0;"><strong>Status:</strong> ${truck.status}</div>
              <div style="margin: 8px 0; padding-top: 8px; border-top: 1px solid #eee;">
                <strong>Fuel:</strong> ${truck.fuel}%
              </div>
            </div>
          `);
          markers.push(marker);
        });

        // Add route polyline
        const polyline = L.polyline(routeCoordinates, {
          color: '#3b82f6',
          weight: 3,
          opacity: 0.7,
          dashArray: '5, 10'
        }).addTo(map);

        // Fit map to show all markers
        if (markers.length > 0) {
          const group = new L.featureGroup(markers);
          map.fitBounds(group.getBounds().pad(0.1));
        }

        // Cleanup function
        return () => {
          map.remove();
        };
      }
    } else {
      // Load Leaflet if not available
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => {
        // Re-run the effect after Leaflet loads
        setTimeout(() => {
          if (mapRef.current && (window as any).L && !mapRef.current._leaflet_id) {
            const L = (window as any).L;
            
            // Fix for default markers
            delete L.Icon.Default.prototype._getIconUrl;
            L.Icon.Default.mergeOptions({
              iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
              iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
              shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
            });

            // Initialize map
            const map = L.map(mapRef.current).setView([20.5937, 78.9629], 5);
            
            // Add tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            // Add markers and routes (same as above)
            const createTruckIcon = (status) => {
              const getColor = (status) => {
                switch (status) {
                  case 'active': return '#10b981';
                  case 'drowsy': return '#f59e0b';
                  case 'low-fuel': return '#ef4444';
                  default: return '#6b7280';
                }
              };

              return L.divIcon({
                html: `<div style="
                  background-color: ${getColor(status)};
                  width: 25px;
                  height: 25px;
                  border-radius: 50%;
                  border: 2px solid white;
                  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 12px;
                ">🚛</div>`,
                className: 'custom-truck-marker',
                iconSize: [25, 25],
                iconAnchor: [12, 12]
              });
            };

            const markers = [];
            trucks.forEach(truck => {
              const marker = L.marker(truck.coordinates, {
                icon: createTruckIcon(truck.status)
              })
              .addTo(map)
              .bindPopup(`
                <div style="min-width: 200px; font-family: system-ui;">
                  <div style="font-weight: bold; font-size: 16px; margin-bottom: 8px;">${truck.id}</div>
                  <div style="margin: 4px 0;"><strong>Driver:</strong> ${truck.driver}</div>
                  <div style="margin: 4px 0;"><strong>Location:</strong> ${truck.location}</div>
                  <div style="margin: 4px 0;"><strong>Status:</strong> ${truck.status}</div>
                  <div style="margin: 8px 0; padding-top: 8px; border-top: 1px solid #eee;">
                    <strong>Fuel:</strong> ${truck.fuel}%
                  </div>
                </div>
              `);
              markers.push(marker);
            });

            L.polyline(routeCoordinates, {
              color: '#3b82f6',
              weight: 3,
              opacity: 0.7,
              dashArray: '5, 10'
            }).addTo(map);

            if (markers.length > 0) {
              const group = new L.featureGroup(markers);
              map.fitBounds(group.getBounds().pad(0.1));
            }
          }
        }, 100);
      };
      document.head.appendChild(script);
    }
  }, []);

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-blue-600" />
          <span>Live Fleet Tracking</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Map Container */}
          <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ height: '400px' }}>
            <div 
              ref={mapRef}
              className="w-full h-full"
              style={{ minHeight: '400px' }}
            />
          </div>

          {/* Truck Status List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trucks.map((truck) => (
              <div
                key={truck.id}
                className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className={`p-2 rounded-full ${getStatusColor(truck.status)}`}>
                  {getStatusIcon(truck.status)}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">{truck.id}</div>
                  <div className="text-xs text-gray-600">{truck.driver}</div>
                  <div className="text-xs text-gray-500">{truck.location}</div>
                </div>
                <div className="text-right">
                  <div className={`text-xs px-2 py-1 rounded ${getStatusColor(truck.status)}`}>
                    {getStatusText(truck.status)}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">⛽ {truck.fuel}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TruckMap;