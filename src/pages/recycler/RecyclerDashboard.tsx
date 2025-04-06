
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import VerificationStatusCard from '@/components/recycler/VerificationStatusCard';
import StatsCards from '@/components/recycler/StatsCards';
import InboundPickupsCard from '@/components/recycler/InboundPickupsCard';
import ComplianceStatusCard from '@/components/recycler/ComplianceStatusCard';
import RecyclingReportsCard from '@/components/recycler/RecyclingReportsCard';

const RecyclerDashboard: React.FC = () => {
  const { t } = useLanguage();

  const complianceStatus = {
    isVerified: false,
    missingDocuments: ['E-Waste Recycler Certificate', 'EPR Authorization', 'Pollution Control Board Certification'],
    lastUpdated: 'Never'
  };

  return (
    <DashboardLayout role="recycler">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{t('recycler.dashboard')}</h1>
          <p className="text-muted-foreground mt-1">Monitor and manage your recycling operations</p>
        </div>

        {/* Verification Status */}
        {!complianceStatus.isVerified && (
          <VerificationStatusCard complianceStatus={complianceStatus} />
        )}

        {/* Stats cards */}
        <StatsCards />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Inbound Pickups */}
          <InboundPickupsCard />

          {/* Compliance Status */}
          <ComplianceStatusCard complianceStatus={complianceStatus} />
        </div>

        {/* Reporting card */}
        <RecyclingReportsCard />
      </div>
    </DashboardLayout>
  );
};

export default RecyclerDashboard;
