import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { User } from "lucide-react";

// Enhanced fonts for a professional look
const nameFont = { fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif", letterSpacing: "0.02em" };
const statusFont = { fontFamily: "'Roboto Slab', 'Georgia', serif", fontWeight: 700, letterSpacing: "0.01em" };
const detailFont = { fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif" };

interface DriverStatusCardProps {
  driverName: string;
  status: "awake" | "drowsy" | "unresponsive";
  lastAlert?: string;
}

const statusConfig = {
  awake: {
    label: "Awake",
    emoji: "🟢",
    variant: "default" as const,
    bgClass: "bg-gradient-to-br from-green-50 via-green-100 to-green-200 border-green-200",
    badgeClass: "bg-green-100 text-green-700 border-green-200",
    dot: "bg-green-500",
  },
  drowsy: {
    label: "Drowsy",
    emoji: "🟠",
    variant: "secondary" as const,
    bgClass: "bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 border-yellow-200",
    badgeClass: "bg-yellow-100 text-yellow-800 border-yellow-200",
    dot: "bg-yellow-500",
  },
  unresponsive: {
    label: "Unresponsive",
    emoji: "🔴",
    variant: "destructive" as const,
    bgClass: "bg-gradient-to-br from-red-50 via-red-100 to-red-200 border-red-200",
    badgeClass: "bg-red-100 text-red-700 border-red-200",
    dot: "bg-red-500",
  },
};

export function DriverStatusCard({ driverName, status, lastAlert }: DriverStatusCardProps) {
  const config = statusConfig[status];

  return (
    <Card
      className={`
        ${config.bgClass} border-2 rounded-2xl transition-all duration-300
        hover:shadow-xl hover:scale-[1.04] group
      `}
      style={detailFont}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span
              className={`bg-white rounded-full p-2 shadow border border-gray-100 transition-all duration-300 group-hover:scale-110`}
            >
              <User className="h-6 w-6 text-gray-400" />
            </span>
            <span
              className="font-bold text-lg text-gray-900"
              style={nameFont}
            >
              {driverName}
            </span>
          </div>
          <Badge
            variant={config.variant}
            className={`text-xs px-2 py-1 border ${config.badgeClass} font-semibold shadow-sm tracking-wide`}
            style={statusFont}
          >
            <span className="mr-1">{config.emoji}</span>
            {config.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          {lastAlert ? (
            <div
              className="text-xs text-gray-500 mt-1"
              style={detailFont}
            >
              <span className="font-medium text-gray-700" style={statusFont}>Last alert:</span>{" "}
              <span className="font-semibold text-gray-900" style={nameFont}>{lastAlert}</span>
            </div>
          ) : (
            <div className="text-xs text-gray-400 italic" style={detailFont}>
              No recent alerts
            </div>
          )}
          {/* Status dot removed */}
        </div>
      </CardContent>
    </Card>
  );
}