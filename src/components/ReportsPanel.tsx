import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  AlertTriangle,
  Fuel,
  Calendar,
} from "lucide-react";

const fuelData = [
  { name: "Mon", weekly: 450, monthly: 1800 },
  { name: "Tue", weekly: 520, monthly: 2100 },
  { name: "Wed", weekly: 480, monthly: 1950 },
  { name: "Thu", weekly: 600, monthly: 2400 },
  { name: "Fri", weekly: 550, monthly: 2200 },
  { name: "Sat", weekly: 380, monthly: 1500 },
  { name: "Sun", weekly: 320, monthly: 1300 },
];

const drowsinessData = [
  { name: "Week 1", incidents: 12 },
  { name: "Week 2", incidents: 8 },
  { name: "Week 3", incidents: 15 },
  { name: "Week 4", incidents: 6 },
];

const severityData = [
  { name: "Drowsy", value: 65, color: "hsl(var(--warning))" },
  { name: "Unresponsive", value: 35, color: "hsl(var(--destructive))" },
];

export function ReportsPanel() {
  const [period, setPeriod] = useState<"weekly" | "monthly">("weekly");

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Fuel className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Fuel Usage</p>
                <p className="text-2xl font-bold">2,847L</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <div>
                <p className="text-sm text-muted-foreground">Alert Incidents</p>
                <p className="text-2xl font-bold">41</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Efficiency</p>
                <p className="text-2xl font-bold">87%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Report Period</p>
                <Badge variant="outline" className="text-xs">
                  {period === "weekly" ? "This Week" : "This Month"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="fuel" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="fuel">Fuel Usage</TabsTrigger>
          <TabsTrigger value="drowsiness">Drowsiness Incidents</TabsTrigger>
          <TabsTrigger value="severity">Alert Severity</TabsTrigger>
        </TabsList>

        {/* Fuel Chart */}
        <TabsContent value="fuel">
          <Card>
            <CardHeader>
              <CardTitle>Fuel Consumption Trends</CardTitle>
              <div className="flex gap-2 mt-2">
                {["weekly", "monthly"].map((key) => (
                  <Badge
                    key={key}
                    variant={period === key ? "default" : "outline"}
                    className="cursor-pointer text-xs"
                    onClick={() => setPeriod(key as "weekly" | "monthly")}
                  >
                    {key === "weekly" ? "Weekly" : "Monthly"}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={fuelData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar
                    dataKey={period}
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Drowsiness Chart */}
        <TabsContent value="drowsiness">
          <Card>
            <CardHeader>
              <CardTitle>Drowsiness Incidents Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={drowsinessData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="incidents"
                    stroke="hsl(var(--warning))"
                    strokeWidth={3}
                    dot={{
                      fill: "hsl(var(--warning))",
                      strokeWidth: 2,
                      r: 6,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Severity Chart */}
        <TabsContent value="severity">
          <Card>
            <CardHeader>
              <CardTitle>Alert Severity Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={severityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {severityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
