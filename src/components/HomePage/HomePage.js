import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    fetch('https://f1-api-7h7q.onrender.com/api/races')
      .then((response) => response.json())
      .then((data) => {
        setRaces(data);
        setLoading(false); // Cambia a false cuando la carga termine
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Mostrar imagen de carga si está cargando */}
      {loading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <img
            src="/images/loading.png" // Cambia a la ruta de tu imagen de carga
            alt="Loading"
            className="animate-pulse" // Animación para parpadear
          />
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-center mb-8">Fórmula 1 - Temporada 2024</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {races.map((race) => (
              <div key={race.round} className="bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Imagen del circuito */}
                <img
                  src={`/images/circuits/${race.raceName}.png`}
                  alt={race.raceName}
                  className="w-full h-auto object-cover"
                />
                <div className="p-4 bg-red-800">
                  {/* Nombre de la carrera con color negro */}
                  <h2 className="text-xl font-semibold text-white">{race.raceName}</h2>
                  <p className="text-black">{race.Circuit.Location.locality}, {race.Circuit.Location.country}</p>
                  <p className="text-black">{new Date(race.date).toLocaleDateString()}</p>
                  <Link
                    to={`/race/${race.round}`}
                    className="text-blue-500 hover:underline mt-2 block"
                  >
                    Ver detalles
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;
