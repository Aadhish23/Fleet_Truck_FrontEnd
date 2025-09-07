// src/pages/Trucks.tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Fuel, Truck } from "lucide-react";

const trucks = [
	{
		id: "TRK001",
		name: "Truck A",
		location: "Chennai",
		status: "Running",
		fuelLevel: 65,
	},
	{
		id: "TRK002",
		name: "Truck B",
		location: "Bangalore",
		status: "Idle",
		fuelLevel: 30,
	},
	{
		id: "TRK003",
		name: "Truck C",
		location: "Hyderabad",
		status: "Maintenance",
		fuelLevel: 50,
	},
];

const statusColors: Record<string, string> = {
	Running: "text-green-600",
	Idle: "text-yellow-500",
	Maintenance: "text-red-500",
};

export default function Trucks() {
	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Truck Overview</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{trucks.map((truck) => (
					<Card key={truck.id} className="bg-white rounded-xl shadow-md">
						<CardContent className="p-4 space-y-2">
							<div className="flex items-center justify-between">
								<h2 className="text-lg font-semibold">{truck.name}</h2>
								<Truck className="text-blue-600" />
							</div>
							<div className="flex items-center gap-2 text-sm">
								<MapPin className="w-4 h-4 text-gray-500" />
								<span>{truck.location}</span>
							</div>
							<div className="flex items-center gap-2 text-sm">
								<Fuel className="w-4 h-4 text-gray-500" />
								<span>{truck.fuelLevel}% fuel</span>
							</div>
							<div
								className={`text-sm font-medium ${
									statusColors[truck.status] || "text-gray-500"
								}`}
							>
								Status: {truck.status}
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
