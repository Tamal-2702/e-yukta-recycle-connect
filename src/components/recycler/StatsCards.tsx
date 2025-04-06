
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Recycle, Package, Truck, ShieldCheck } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value }) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 p-2 rounded-full text-primary">
          {icon}
        </div>
        <div>
          <div className="text-2xl font-bold">{value}</div>
          <p className="text-muted-foreground text-sm">{label}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const StatsCards: React.FC = () => {
  const stats = [
    { icon: <Recycle />, label: 'Total processed', value: '0 tons' },
    { icon: <Package />, label: 'Current inventory', value: '0 kg' },
    { icon: <Truck />, label: 'Pending pickups', value: '0' },
    { icon: <ShieldCheck />, label: 'Compliance rate', value: '0%' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatsCards;
