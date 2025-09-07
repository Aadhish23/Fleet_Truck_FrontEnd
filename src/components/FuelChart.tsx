// FRONTEND/src/components/FuelChart.tsx
import { useEffect, useState } from "react";
import { Bar, BarChart, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";

export default function FuelChart() {
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/fuel/summary`)
      .then((res) => res.json())
      .then((data) => setSummary(data))
      .catch((err) => console.error(err));
  }, []);

  if (!summary) return <div>Loading charts...</div>;

  const COLORS = ["#22c55e", "#facc15", "#ef4444"]; // green, yellow, red

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Weekly Consumption */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Weekly Fuel Consumption</h3>
        <BarChart width={400} height={300} data={summary.weeklyConsumption.map((item: any) => ({
          day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][item._id - 1],
          totalFuel: item.totalFuel,
        }))}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalFuel" fill="#3b82f6" />
        </BarChart>
      </div>

      {/* Fleet Fuel Levels */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Fleet Fuel Levels</h3>
        <PieChart width={400} height={300}>
          <Pie
            data={[
              { name: "Good", value: summary.fleetLevels.good },
              { name: "Medium", value: summary.fleetLevels.medium },
              { name: "Low", value: summary.fleetLevels.low },
            ]}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label
          >
            {COLORS.map((color, index) => (
              <Cell key={`cell-${index}`} fill={color} />
            ))}
          </Pie>
        </PieChart>
      </div>
    </div>
  );
}
