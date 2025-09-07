import DashboardHeader from "@/components/DashboardHeader";
import FleetStats from "@/components/FleetStats";
import TruckMap from "@/components/TruckMap";
import AlertsPanel from "@/components/AlertsPanel";
import FuelChart from "@/components/FuelChart";
import { DriverStatusCard } from "@/components/DriverStatusCard";
import heroImage from "@/assets/dashboard-hero.jpg";

const Index = () => {
  return (
    <div className="flex-1">
      {/* Top Dashboard Header */}
      <DashboardHeader />

      {/* Hero Image Section */}
      <div className="relative h-32 md:h-48 overflow-hidden rounded-md shadow">
        <img
          src={heroImage}
          alt="Fleet Dashboard Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-2xl md:text-4xl font-bold mb-1">
              Fleet Command Center
            </h2>
            <p className="text-sm md:text-lg opacity-90">
              Real-time Monitoring & AI-powered Insights
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Fleet Stats Overview */}
        <FleetStats />

        {/* Driver Status Section */}
        <section className="my-10">
          <h3 className="text-lg font-semibold mb-4">Driver Status</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <DriverStatusCard
              driverName="Ravi Kumar"
              status="drowsy"
              lastAlert="2025-07-29 09:15 AM"
            />
            <DriverStatusCard
              driverName="Meena Devi"
              status="awake"
              lastAlert="2025-07-29 08:00 AM"
            />
            <DriverStatusCard
              driverName="Sundar"
              status="unresponsive"
              lastAlert="2025-07-29 06:20 AM"
            />
          </div>
        </section>

        {/* Truck Map & Alerts Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Map takes 2/3, Alerts takes 1/3 */}
          <div className="lg:col-span-2">
            <TruckMap />
          </div>
          <div>
            <AlertsPanel />
          </div>
        </div>

        {/* Fuel Usage Chart */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Fuel Efficiency</h3>
          <FuelChart />
        </section>
      </div>
    </div>
  );
};

export default Index;
