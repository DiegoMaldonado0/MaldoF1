import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DriverDetail() {
  const { driverId } = useParams();
  const [driver, setDriver] = useState(null);
  const [standings, setStandings] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga

  // Cargar la información del piloto
  useEffect(() => {
    fetch(`https://f1-api-7h7q.onrender.com/api/drivers`)
      .then((response) => response.json())
      .then((data) => {
        const selectedDriver = data.find((d) => d.driverId === driverId);
        setDriver(selectedDriver);
        setIsLoading(false); // Cuando los datos se hayan cargado, cambiamos el estado
      });
  }, [driverId]);

  // Cargar la información del campeonato (posición, puntos, victorias, code)
  useEffect(() => {
    if (driverId) {
      fetch(`https://f1-api-7h7q.onrender.com/api/standings/drivers`)
        .then((response) => response.json())
        .then((data) => {
          const driverStanding = data.find((d) => d.Driver.driverId === driverId);
          setStandings(driverStanding);
        });
    }
  }, [driverId]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <img
          src="/images/loading.png" // Imagen de carga, puedes personalizarla
          alt="Loading"
          className="animate-pulse"
        />
      </div>
    );
  }

  if (!driver) {
    return <div>No se encontró al piloto.</div>; // En caso de que no se encuentre el piloto
  }

  if (!standings) {
    return <div>No se encontró la información del campeonato.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">{driver.givenName} {driver.familyName} - Detalles</h1>
      <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col sm:flex-row items-center sm:items-start">
        {/* Contenedor para la imagen y detalles */}
        <div className="flex-1 sm:pr-6 mb-4 sm:mb-0">
          <img
            src={`/images/drivers/${driver.familyName}.avif`} // Asegúrate de que la ruta de la imagen sea correcta
            alt={driver.givenName}
            className="w-62 h-auto object-contain rounded-lg"
          />
        </div>
        {/* Detalles del piloto */}
        <div className="flex-1 sm:ml-6 flex flex-col justify-center h-full">
          <h2 className="text-xl font-semibold text-black">{driver.givenName} {driver.familyName}</h2>
          <p className="text-gray-600">Número: {driver.permanentNumber}</p>
          <p className="text-gray-600">Nacionalidad: {driver.nationality}</p>
          <p className="text-gray-600">Fecha de nacimiento: {new Date(driver.dateOfBirth).toLocaleDateString()}</p>

          {/* Información del campeonato */}
          <div className="mt-4">
            <p className="text-gray-600">Posición en el campeonato: {standings.positionText}</p>
            <p className="text-gray-600">Puntos: {standings.points}</p>
            <p className="text-gray-600">Victorias: {standings.wins}</p>
            <p className="text-gray-600">Código: {standings.Driver.code}</p>
          </div>

          {/* Contenedor de la bandera para centrarla */}
          <div className="flex justify-center mt-4">
            <img src={driver.flagUrl} alt={driver.nationality} className="w-48 h-auto" />
          </div>

          <a
            href={driver.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline mt-4 block"
          >
            Ver más información en Wikipedia
          </a>
        </div>
      </div>
    </div>
  );
}

export default DriverDetail;
