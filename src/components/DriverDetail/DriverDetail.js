import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DriverDetail() {
  const { driverId } = useParams();
  const [driver, setDriver] = useState(null);
  const [standings, setStandings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar la información del piloto
  useEffect(() => {
    fetch(`https://f1-api-7h7q.onrender.com/api/drivers`)
      .then((response) => response.json())
      .then((data) => {
        const selectedDriver = data.find((d) => d.driverId === driverId);
        setDriver(selectedDriver);
        setIsLoading(false);
      });
  }, [driverId]);

  // Cargar la información del campeonato
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
        <img src="/images/loading.png" alt="Loading" className="animate-pulse" />
      </div>
    );
  }

  if (!driver) {
    return <div>No se encontró al piloto.</div>;
  }

  if (!standings) {
    return <div>No se encontró la información del campeonato.</div>;
  }

  // Obtener constructorId para la imagen del auto
  const constructorId = standings.Constructors[0]?.constructorId;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        {driver.givenName} {driver.familyName} - Detalles
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col sm:flex-row items-center sm:items-start">
        {/* Contenedor para la imagen y detalles */}
        <div className="flex-1 sm:pr-6 mb-4 sm:mb-0">
          <img
            src={`/images/drivers/${driver.familyName}.avif`}
            alt={driver.givenName}
            className="w-62 h-auto object-contain rounded-lg"
          />
        </div>

        {/* Detalles del piloto */}
        <div className="flex-1 sm:ml-6 flex flex-col justify-center h-full">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold text-black mr-2">{driver.givenName} {driver.familyName}</h2>
            <img src={driver.flagUrl} alt={driver.nationality} className="w-8 h-auto" />
          </div>
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

          {/* Contenedor del auto */}
          <div className="flex justify-center mt-4">
            <img src={`/images/cars/${constructorId}.avif`} alt={constructorId} className="w-auto h-auto" />
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
