// App.js
import React, { useState } from 'react';
import PlanetsList from './PlanetList';
import ResidentsDetails from './ResidentsDetails';

import '../Style/index.css';

export default function App() {
  const [selectedPlanetId, setSelectedPlanetId] = useState(null);

  const handleReturnToMain = () => {
    setSelectedPlanetId(null);
  };

  return (
    <div className="container">
      <h1 className="AP">Star Wars API</h1>
      {selectedPlanetId ? (
        <ResidentsDetails planetId={selectedPlanetId} onReturnToMain={handleReturnToMain} />
      ) : (
        <>
          <h2 className='PD'>Planets directory</h2>
          <div className="vertical-list">
            <PlanetsList setSelectedPlanetId={setSelectedPlanetId} />
          </div>
        </>
      )}
    </div>
  );
}
