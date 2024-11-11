import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importa Link

const DriverStandings = () => {
  const [standings, setStandings] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para la carga

  useEffect(() => {
    // Hacer la petición a la API
    axios.get('https://f1-api-7h7q.onrender.com/api/standings/drivers')
      .then((response) => {
        setStandings(response.data);
        setIsLoading(false); // Finaliza la carga al recibir la respuesta
      })
      .catch((error) => {
        console.error('Error fetching driver standings:', error);
        setIsLoading(false); // Finaliza la carga en caso de error
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
    <div className="p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center">Driver Standings</h2>
      <div className="overflow-x-auto"> {/* Contenedor para hacer la tabla responsive */}
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-black">
              <th className="px-4 py-2 text-left">Position</th>
              <th className="px-4 py-2 text-left">Driver</th>
              <th className="px-4 py-2 text-left">Points</th>
              <th className="px-4 py-2 text-left">Wins</th>
              <th className="px-4 py-2 text-left">Constructor</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((entry, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{entry.positionText}</td>
                <td className="px-4 py-2">
                  {/* Usamos Link en lugar de <a> */}
                  <Link
                    to={`/driver/${entry.Driver.driverId}`} // Asumiendo que `driverId` es el identificador único del piloto
                    className="text-blue-500"
                  >
                    {`${entry.Driver.givenName} ${entry.Driver.familyName}`}
                  </Link>
                </td>
                <td className="px-4 py-2">{entry.points}</td>
                <td className="px-4 py-2">{entry.wins}</td>
                <td className="px-4 py-2">
                  <a href={entry.Constructors[0].url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    {entry.Constructors[0].name}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DriverStandings;
