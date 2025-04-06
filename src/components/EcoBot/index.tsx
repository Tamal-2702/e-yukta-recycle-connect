
import React from 'react';
import { EcoBot } from './EcoBot';
import { EcoBotSettings } from './EcoBotSettings';
import { useEcoBotApi } from '@/hooks/useEcoBotApi';

const EcoBotWrapper: React.FC = () => {
  const { hasApiKey } = useEcoBotApi();

  return (
    <div className="relative">
      <EcoBotSettings />
      <EcoBot />
    </div>
  );
};

export default EcoBotWrapper;
