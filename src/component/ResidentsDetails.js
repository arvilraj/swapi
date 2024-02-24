// ResidentsDetails.js
import React, { useEffect, useState } from 'react';
// import '../Style/resident.css';


const ResidentsDetails = ({ planetId, onReturnToMain }) => {
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/planets/${planetId}/`);
        const data = await response.json();
        const residentUrls = data.residents;
        const residentsData = await Promise.all(
          residentUrls.map(async (residentUrl) => {
            const residentResponse = await fetch(residentUrl);
            const residentData = await residentResponse.json();
            return {
              name: residentData.name,
              height: residentData.height,
              mass: residentData.mass,
              gender: residentData.gender,
            };
          })
        );
        setResidents(residentsData);
      } catch (error) {
        console.error('Error fetching residents:', error);
      }
    };

    if (planetId) {
      fetchResidents();
    }
  }, [planetId]);

  return (
    <div>
      <h2>Residents of {planetId}</h2>
      <button onClick={onReturnToMain}>Return to PlanetList</button>
      <ul>
        {residents.map((resident, index) => (
          <li key={index}>
            <h3>{resident.name}</h3>
            <p>Height: {resident.height}</p>
            <p>Mass: {resident.mass}</p>
            <p>Gender: {resident.gender}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResidentsDetails;
