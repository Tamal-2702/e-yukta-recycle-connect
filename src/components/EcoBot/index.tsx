
import React from 'react';
import { EcoBot } from './EcoBot';
import { EcoBotSettings } from './EcoBotSettings';

interface EcoBotWrapperProps {
  initialState?: boolean;
}

const EcoBotWrapper: React.FC<EcoBotWrapperProps> = ({ initialState = false }) => {
  return (
    <div className="relative">
      <EcoBotSettings />
      <EcoBot initialOpen={initialState} />
    </div>
  );
};

export default EcoBotWrapper;
