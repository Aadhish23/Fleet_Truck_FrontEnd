import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, User } from "lucide-react";

interface AlertEvent {
  id: string;
  driverName: string;
  timestamp: string;
  status: "drowsy" | "unresponsive";
}

const mockAlerts: AlertEvent[] = [
  { id: "1", driverName: "Mike Johnson", timestamp: "10:45 AM", status: "drowsy" },
  { id: "2", driverName: "Sarah Davis", timestamp: "9:30 AM", status: "unresponsive" },
  { id: "3", driverName: "Mike Johnson", timestamp: "8:15 AM", status: "drowsy" },
  { id: "4", driverName: "Tom Wilson", timestamp: "7:22 AM", status: "drowsy" },
  { id: "5", driverName: "Sarah Davis", timestamp: "6:45 AM", status: "unresponsive" },
];

const statusConfig = {
  drowsy: {
    label: "Drowsy Alert",
    variant: "secondary" as const,
    icon: "🟠",
    bgClass: "bg-warning/5 border-l-warning"
  },
  unresponsive: {
    label: "Unresponsive",
    variant: "destructive" as const, 
    icon: "🔴",
    bgClass: "bg-destructive/5 border-l-destructive"
  }
};

export function SleepAlertLog() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <span>Sleep Alert Log</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="space-y-2 p-4">
            {mockAlerts.map((alert) => {
              const config = statusConfig[alert.status];
              
              return (
                <div
                  key={alert.id}
                  className={`p-3 border-l-4 rounded-r-md ${config.bgClass} transition-all duration-200 hover:bg-opacity-80`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-sm">{alert.driverName}</span>
                    </div>
                    <Badge variant={config.variant} className="text-xs">
                      <span className="mr-1">{config.icon}</span>
                      {config.label}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{alert.timestamp}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}