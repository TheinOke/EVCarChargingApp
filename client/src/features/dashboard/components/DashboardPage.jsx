import { mockCar } from './mockCarData.js';
import CarInfoCard from './CarInfoCard.jsx';
import BatteryStatusCard from './BatteryStatusCard.jsx';
import CostEstimateCard from './CostEstimateCard.jsx';

function DashboardPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CarInfoCard car={mockCar} />
        <BatteryStatusCard car={mockCar} />
        <CostEstimateCard car={mockCar} />
      </div>
    </div>
  );
}

export default DashboardPage;
