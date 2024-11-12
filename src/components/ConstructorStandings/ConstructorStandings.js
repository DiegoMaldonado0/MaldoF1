import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConstructorStandings = () => {
  const [standings, setStandings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hacer la petición a la API
    axios.get('https://f1-api-7h7q.onrender.com/api/standings/constructors')
      .then((response) => {
        setStandings(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching constructor standings:', error);
        setIsLoading(false);
      });
  }, []);

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

  return (
    <div className="p-6 rounded-lg shadow-lg text-white">
      <h2 className="text-xl font-bold mb-4 text-center">Constructor Standings</h2>
      {standings.length === 0 ? (
        <div className="text-center">
          <img 
            src="/images/no_results.png" 
            alt="No results"
            className="mx-auto mb-4 w-2/3 md:w-1/2 lg:w-1/3" 
          />
          <p>No standings available.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {standings.map((entry, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center p-4 border border-gray-700 rounded-lg bg-white text-black">
              {/* Contenedor de texto a la izquierda */}
              <div className="flex-1 mb-4 md:mb-0">
                <h3 className="text-lg font-semibold text-black">Position: {entry.positionText}</h3>
                <p>
                  Constructor: 
                  <a 
                    href={entry.Constructor.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {entry.Constructor.name}
                  </a>
                </p>
                <p>Points: {entry.points}</p>
                <p>Wins: {entry.wins}</p>
              </div>

              {/* Imagen del constructor a la derecha */}
              <div className="ml-4">
                <img
                  src={`/images/cars/${entry.Constructor.constructorId}.avif`}  // Imagen del constructor
                  alt={entry.Constructor.name}
                  className="h-auto w-auto md:h-30 md:w-auto object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConstructorStandings;

