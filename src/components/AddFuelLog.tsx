// FRONTEND/src/components/AddFuelLog.tsx
import { useState } from "react";

export default function AddFuelLog() {
  const [truckId, setTruckId] = useState("");
  const [fuelAmount, setFuelAmount] = useState("");
  const [fuelLevelPercentage, setFuelLevelPercentage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/fuel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ truckId, fuelAmount: Number(fuelAmount), fuelLevelPercentage: Number(fuelLevelPercentage) }),
      });
      const data = await res.json();
      alert("Fuel log added successfully!");
      console.log(data);
    } catch (error) {
      console.error(error);
      alert("Failed to add fuel log");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Truck ID</label>
        <input
          type="text"
          value={truckId}
          onChange={(e) => setTruckId(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <label>Fuel Amount (Liters)</label>
        <input
          type="number"
          value={fuelAmount}
          onChange={(e) => setFuelAmount(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <label>Fuel Level (%)</label>
        <input
          type="number"
          value={fuelLevelPercentage}
          onChange={(e) => setFuelLevelPercentage(e.target.value)}
          className="border p-2 w-full"
          required
          min="0"
          max="100"
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Log
      </button>
    </form>
  );
}
