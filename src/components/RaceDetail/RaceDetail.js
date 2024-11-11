import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function RaceDetail() {
  const { id } = useParams();
  const [race, setRace] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`https://f1-api-7h7q.onrender.com/api/races`)
      .then((response) => response.json())
      .then((data) => {
        const selectedRace = data.find((race) => race.round === id);
        setRace(selectedRace);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <img
          src="/images/loading.png"
          alt="Loading"
          className="animate-pulse"
        />
      </div>
    );
  }

  // Función para formatear fechas, devolviendo un texto si la fecha es undefined
  const formatDate = (date) => {
    return date ? new Date(date).toLocaleString() : 'Fecha no disponible';
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">{race.raceName} - Detalles</h1>
      <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col md:flex-row gap-4">
        
        {/* Información de la carrera */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold text-black">Información del Circuito</h2>
            <p className='text-black'>{race.Circuit.circuitName}</p>
            <a href={race.Circuit.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Más información
            </a>
            
            <h3 className="mt-4 font-semibold text-black">Fecha de la carrera</h3>
            <p className="text-black">{new Date(race.date).toLocaleDateString()}</p>

            <h3 className="mt-4 font-semibold text-black">Prácticas y Clasificación</h3>
            <ul>
              <li><strong className="text-black">Primera Práctica:</strong> <span className="text-black">{formatDate(race.FirstPractice?.date)}</span></li>
              <li><strong className="text-black">Segunda Práctica:</strong> <span className="text-black">{formatDate(race.SecondPractice?.date)}</span></li>
              <li><strong className="text-black">Tercera Práctica:</strong> <span className="text-black">{formatDate(race.ThirdPractice?.date)}</span></li>
              <li><strong className="text-black">Clasificación:</strong> <span className="text-black">{formatDate(race.Qualifying?.date)}</span></li>
            </ul>
          </div>
        </div>

        {/* Imagen del circuito */}
        <div className="mt-6 md:mt-0 flex-shrink-0 w-full md:w-1/3">
          <img
            src={`/images/circuits/${race.raceName}.png`}
            alt={race.Circuit.circuitName}
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>
        
      </div>
      <div className="mt-auto text-center">
          <Link 
            to={`/raceResults/${race.round}`} 
            className="text-blue-600 hover:underline text-lg"
          >
            Ver resultados de la carrera
          </Link>
        </div>
    </div>
  );
}

export default RaceDetail;
