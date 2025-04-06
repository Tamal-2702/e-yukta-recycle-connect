
import React from 'react';
import { EcoBot } from './EcoBot';
import { EcoBotSettings } from './EcoBotSettings';

const EcoBotWrapper: React.FC = () => {
  return (
    <div className="relative">
      <EcoBotSettings />
      <EcoBot />
    </div>
  );
};

export default EcoBotWrapper;
