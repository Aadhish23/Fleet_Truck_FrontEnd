import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Fuel, Eye, Clock } from "lucide-react";

const AlertsPanel = () => {
  const alerts = [
    {
      id: 1,
      type: "drowsiness",
      driver: "Maria Garcia",
      vehicle: "TRK-002",
      message: "Drowsiness detected - immediate attention required",
      timestamp: "2 min ago",
      severity: "high",
      icon: Eye,
    },
    {
      id: 2,
      type: "fuel",
      driver: "Sarah Johnson",
      vehicle: "TRK-004",
      message: "Low fuel level - 15% remaining",
      timestamp: "8 min ago",
      severity: "medium",
      icon: Fuel,
    },
    {
      id: 3,
      type: "maintenance",
      driver: "Mike Wilson",
      vehicle: "TRK-007",
      message: "Scheduled maintenance due in 50 miles",
      timestamp: "1 hour ago",
      severity: "low",
      icon: Clock,
    },
  ];

  // Dynamic background color for each alert card
  const getBgColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 hover:bg-red-200";
      case "medium":
        return "bg-yellow-100 hover:bg-yellow-200";
      case "low":
        return "bg-blue-100 hover:bg-blue-200";
      default:
        return "bg-gray-100 hover:bg-gray-200";
    }
  };

  const getBorderColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "border-red-200";
      case "medium":
        return "border-yellow-200";
      case "low":
        return "border-blue-200";
      default:
        return "border-gray-200";
    }
  };

  const getIconStyles = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-yellow-700 bg-yellow-100";
      case "low":
        return "text-blue-700 bg-blue-100";
      default:
        return "text-gray-500 bg-gray-100";
    }
  };

  return (
    <Card className="shadow-lg border-2 border-blue-100 rounded-2xl bg-gradient-to-br from-white via-blue-50 to-blue-100">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-yellow-500 animate-bounce" />
          <span className="font-bold text-lg text-blue-900">Active Alerts</span>
          <Badge variant="secondary" className="ml-auto bg-blue-200 text-blue-800 font-semibold">
            {alerts.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.length === 0 && (
          <div className="text-center text-blue-400 py-8">
            <AlertTriangle className="mx-auto mb-2 h-8 w-8" />
            <span className="font-medium">No active alerts 🎉</span>
          </div>
        )}
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`
              flex items-start space-x-3 p-4 rounded-xl border transition-all duration-200 shadow-sm bg-white/80
              ${getBgColor(alert.severity)} ${getBorderColor(alert.severity)}
              hover:scale-[1.03] hover:shadow-lg cursor-pointer
            `}
            style={{
              transition: "background 0.2s, transform 0.2s, box-shadow 0.2s",
            }}
          >
            <div className={`p-2 rounded-lg shadow ${getIconStyles(alert.severity)}`}>
              <alert.icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <Badge className={`border font-semibold ${getBorderColor(alert.severity)}`}>
                  {alert.severity.toUpperCase()}
                </Badge>
                <span className="text-sm font-semibold text-blue-900">{alert.vehicle}</span>
              </div>
              <p className="text-sm text-blue-900 font-medium">{alert.message}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-blue-400">
                  {alert.driver} • {alert.timestamp}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs border-blue-200 text-blue-700 hover:bg-blue-100"
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ))}
        <Button
          variant="outline"
          className="w-full mt-2 border-blue-200 text-blue-700 font-semibold hover:bg-blue-100"
          size="sm"
        >
          View All Alerts
        </Button>
      </CardContent>
    </Card>
  );
};

export default AlertsPanel;