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
    <div className="p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center text-white">Constructor Standings</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-black text-white">
              <th className="px-4 py-2 text-left">Position</th>
              <th className="px-4 py-2 text-left">Constructor</th>
              <th className="px-4 py-2 text-left">Points</th>
              <th className="px-4 py-2 text-left">Wins</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((entry, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{entry.positionText}</td>
                <td className="px-4 py-2">
                  <a href={entry.Constructor.url} className="text-blue-500">{entry.Constructor.name}</a>
                </td>
                <td className="px-4 py-2">{entry.points}</td>
                <td className="px-4 py-2">{entry.wins}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConstructorStandings;
