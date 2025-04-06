
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Scan, Calendar, Map, ShoppingBag, BookOpen, ArrowRight, 
  Award, BarChart
} from 'lucide-react';
import { Link } from 'react-router-dom';

const UserDashboard: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    { label: 'E-waste recycled', value: '0 kg' },
    { label: 'Pickups scheduled', value: '0' },
    { label: 'Carbon offset', value: '0 kg' },
    { label: 'Reward points', value: '0' },
  ];

  const actions = [
    { 
      icon: <Scan />, 
      title: t('user.scan'), 
      description: 'Identify and categorize your e-waste', 
      to: '/user/scan',
      primary: true 
    },
    { 
      icon: <Calendar />, 
      title: t('user.schedule'), 
      description: 'Book a pickup for your e-waste', 
      to: '/user/schedule',
      primary: false 
    },
    { 
      icon: <Map />, 
      title: t('user.track'), 
      description: 'Track where your e-waste goes', 
      to: '/user/track',
      primary: false 
    },
    { 
      icon: <ShoppingBag />, 
      title: t('user.marketplace'), 
      description: 'Browse refurbished electronics', 
      to: '/user/marketplace',
      primary: false 
    },
    { 
      icon: <BookOpen />, 
      title: t('user.awareness'), 
      description: 'Learn about e-waste management', 
      to: '/user/awareness',
      primary: false 
    },
    { 
      icon: <Award />, 
      title: 'Progress Tracker', 
      description: 'View your achievements and rewards', 
      to: '/user/progress',
      primary: false 
    },
  ];

  return (
    <DashboardLayout role="user">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{t('user.dashboard')}</h1>
          <p className="text-muted-foreground mt-1">Welcome to your e-waste management dashboard</p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Hero card with illustration */}
        <Card className="bg-[#76b947] text-white overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <CardContent className="p-6 md:p-8 md:w-2/3">
              <h2 className="text-2xl font-bold mb-2">Ready to recycle your e-waste?</h2>
              <p className="mb-4">Schedule a pickup or drop-off today and earn rewards for your contribution to a cleaner environment.</p>
              <Link to="/user/scan">
                <Button variant="outline" className="bg-white/20 hover:bg-white/30 text-white border-white/50">
                  Start Scanning
                </Button>
              </Link>
            </CardContent>
            <div className="md:w-1/3 p-4 flex items-center justify-center">
              <img src="/lovable-uploads/5cf4d238-8867-41cf-8b31-91d2cabfc66a.png" alt="E-waste illustration" className="max-h-48" />
            </div>
          </div>
        </Card>

        {/* Quick action cards */}
        <h2 className="text-xl font-semibold mt-6 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions.map((action, index) => (
            <Card key={index} className={`card-hover ${action.primary ? 'border-[#76b947]/50' : ''}`}>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className={`${action.primary ? 'bg-[#76b947] text-white' : 'bg-[#76b947]/10 text-[#76b947]'} p-2 rounded-full`}>
                  {action.icon}
                </div>
                <div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Link to={action.to}>
                  <Button variant={action.primary ? "default" : "outline"} className="w-full flex items-center justify-between gap-2">
                    Go to {action.title} <ArrowRight size={16} />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
