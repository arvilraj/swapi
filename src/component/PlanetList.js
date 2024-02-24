import React, { useEffect, useState } from 'react';

const PlanetsList = ({ setSelectedPlanetId }) => {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/planets/');
        const data = await response.json();
        setPlanets(data.results);
        fetchPlanetImages(data.results);
      } catch (error) {
        console.error('Error fetching planets:', error);
      }
    };
    fetchPlanets();
  }, []);

  const fetchPlanetImages = async (planets) => {
    const planetsWithImages = await Promise.all(
      planets.map(async (planet) => {
        try {
          const response = await fetch(`https://starwars-visualguide.com/assets/img/planets/${getPlanetId(planet.url)}.jpg`);
          if (response.ok) {
            const imageUrl = `https://starwars-visualguide.com/assets/img/planets/${getPlanetId(planet.url)}.jpg`;
            return { ...planet, imageUrl };
          } else {
            console.error(`Error fetching image for ${planet.name}: ${response.statusText}`);
            return { ...planet, imageUrl: '' };
          }
        } catch (error) {
          console.error(`Error fetching image for ${planet.name}:`, error);
          return { ...planet, imageUrl: '' };
        }
      })
    );
    setPlanets(planetsWithImages);
  };

  const getPlanetId = (url) => {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 2];
  };

  return (
    <ul className="grid grid--columns grid--gap">
      {planets.map((planet) => (
        <li key={planet.name} className="planet-item">
          <div className="desc">
            <h2>{planet.name}</h2>
            {planet.imageUrl && (
              <img
                src={planet.imageUrl}
                alt={planet.name}
                className="planet-image"
              />
            )}
            <p>Diameter: {planet.diameter}</p>
            <p>Climate: {planet.climate}</p>
            <p>Terrain: {planet.terrain}</p>
            <p>Population: {planet.population}</p>
            <p>Gravity: {planet.gravity}</p>
            <p>Orbital Period: {planet.orbital_period}</p>
            <p>Rotation Period: {planet.rotation_period}</p>
            <button
              className="button primary inline"
              onClick={() => setSelectedPlanetId(getPlanetId(planet.url))}
              type="button"
            >
              Resident info
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PlanetsList;
