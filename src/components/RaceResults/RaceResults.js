import React, { useEffect, useState } from 'react'; 
import { useParams, Link } from 'react-router-dom';

const RaceResults = () => {
  const { round } = useParams();
  const [raceResults, setRaceResults] = useState([]);
  const [raceName, setRaceName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRaceDetails = async () => {
      try {
        const response = await fetch('https://f1-api-7h7q.onrender.com/api/races');
        const races = await response.json();

        // Buscar la carrera que coincida con el round
        const race = races.find((r) => r.round === round);
        if (race) {
          setRaceName(race.raceName); // Establecer el nombre de la carrera
        } else {
          setRaceName('Race Not Found');
        }
      } catch (error) {
        console.error('Error fetching race details:', error);
      }
    };

    const fetchRaceResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://f1-api-7h7q.onrender.com/api/raceResults/${round}`);
        const data = await response.json();
        setRaceResults(data);
      } catch (error) {
        console.error('Error fetching race results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRaceDetails();
    fetchRaceResults();
  }, [round]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <img
          src="/images/loading.png"  // Asegúrate de tener una imagen de carga adecuada
          alt="Loading"
          className="animate-pulse"
        />
      </div>
    );
  }

  return (
    <div className="p-6 rounded-lg shadow-lg text-white">
      <h2 className="text-xl font-bold mb-4 text-center">Race Results - {raceName || 'Loading...'}</h2>
      {raceResults.length === 0 ? (
        <p className="text-center">No results found for this round.</p>
      ) : (
        <div className="space-y-4">
          {raceResults.map((result) => (
            <div key={result.number} className="flex items-center p-4 border border-gray-700 rounded-lg bg-white text-black">
              {/* Contenedor de texto a la izquierda */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-black">Position: {result.positionText}</h3>
                <p>
                  Driver: 
                  <Link 
                    to={`/driver/${result.Driver.driverId}`}  // Navegar a la página del piloto usando su driverId
                    className="text-blue-500 hover:underline"
                  >
                    {result.Driver.givenName} {result.Driver.familyName}
                  </Link>
                </p>
                <p>Constructor: <a href={result.Constructor.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">{result.Constructor.name}</a></p>
                <p>Laps: {result.laps}</p>
                <p>Status: {result.status}</p>
                <p>Time: {result.Time ? result.Time.time : 'N/A'}</p> {/* Verificación para Time */}
                <p>
                  Fastest Lap: 
                  {result.FastestLap ? 
                    ` Lap ${result.FastestLap.lap} - Time: ${result.FastestLap.Time ? result.FastestLap.Time.time : 'N/A'} - Speed: ${result.FastestLap.AverageSpeed ? result.FastestLap.AverageSpeed.speed : 'N/A'} kph` 
                    : 'N/A'}
                </p> {/* Verificación para FastestLap */}
              </div>

              {/* Imagen del piloto a la derecha */}
              <div className="ml-4">
                <img
                  src={`/images/drivers/${result.Driver.familyName}.avif`}  // Asegúrate de que la imagen esté en la carpeta correcta
                  alt={`${result.Driver.familyName} ${result.Driver.givenName}`}
                  className="h-20 w-20 md:h-48 md:w-auto rounded-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RaceResults;
