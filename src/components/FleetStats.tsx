import { useEffect, useState } from "react";
import {
  Card, CardContent, CardHeader, CardTitle
} from "@/components/ui/card";
import { Truck, Fuel, AlertTriangle, MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";

// Simulated API hook
const useFleetStats = () => {
  const [data, setData] = useState<null | typeof initialStats>(null);

  useEffect(() => {
    setTimeout(() => setData(initialStats), 1200);
  }, []);

  return data;
};

const initialStats = [
  {
    title: "Active Vehicles",
    value: "247",
    change: "+12 today",
    icon: Truck,
    variant: "primary" as const,
    tooltip: "Fleet vehicles currently operational",
  },
  {
    title: "Fuel Efficiency",
    value: "8.2L / 100km",
    change: "+5% vs last week",
    icon: Fuel,
    variant: "success" as const,
    tooltip: "Average consumption across all trucks",
  },
  {
    title: "Active Alerts",
    value: "3",
    change: "2 drowsiness, 1 low fuel",
    icon: AlertTriangle,
    variant: "warning" as const,
    tooltip: "Live alert count in system",
  },
  {
    title: "Routes Active",
    value: "89",
    change: "12 completed today",
    icon: MapPin,
    variant: "primary" as const,
    tooltip: "Ongoing fleet routes",
  },
];

const variantStyles = {
  primary: {
    card: "shadow-fleet border-primary/20",
    icon: "text-primary bg-primary/10",
  },
  success: {
    card: "shadow-success border-success/20",
    icon: "text-success bg-success/10",
  },
  warning: {
    card: "shadow-alert border-accent/20",
    icon: "text-accent bg-accent/10",
  },
};

export default function FleetStats() {
  const stats = useFleetStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
      {(stats ?? Array(4).fill(null)).map((stat, index) => {
        const variant = stat?.variant ?? "primary";
        const style = variantStyles[variant];

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`${style.card} border-2 rounded-xl`}>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CardTitle className="text-sm font-medium text-muted-foreground cursor-help">
                      {stat?.title ?? <Skeleton className="h-4 w-28" />}
                    </CardTitle>
                  </TooltipTrigger>
                  <TooltipContent>
                    {stat?.tooltip ?? "Loading..."}
                  </TooltipContent>
                </Tooltip>
                <div className={`p-2 rounded-lg ${style.icon}`}>
                  {stat?.icon ? <stat.icon className="h-4 w-4" /> : <Skeleton className="h-4 w-4" />}
                </div>
              </CardHeader>
              <CardContent>
                {stat?.value ? (
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                ) : (
                  <Skeleton className="h-6 w-16 mb-1" />
                )}
                {stat?.change ? (
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                ) : (
                  <Skeleton className="h-3 w-24" />
                )}
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
