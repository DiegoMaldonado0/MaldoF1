import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function DriversList() {
  const [drivers, setDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga

  useEffect(() => {
    fetch('https://f1-api-7h7q.onrender.com/api/drivers')
      .then((response) => response.json())
      .then((data) => {
        setDrivers(data);
        setIsLoading(false); // Al finalizar la carga, actualizamos el estado
      });
  }, []);

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Pilotos de Fórmula 1</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {drivers.map((driver) => (
          <div key={driver.driverId} className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs mx-auto">
            <img
              src={`/images/drivers/${driver.familyName}.avif`}
              alt={driver.givenName}
              className="w-full h-64 object-contain" // Aquí se cambió de object-cover a object-contain
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-black">{driver.givenName} {driver.familyName}</h2>
              <p className="text-gray-600">Número: {driver.permanentNumber}</p>
              <p className="text-gray-500">Nacionalidad: {driver.nationality}</p>
              <p className="text-gray-500">Fecha de nacimiento: {new Date(driver.dateOfBirth).toLocaleDateString()}</p>
              <div className="flex items-center mt-4">
                <img src={driver.flagUrl} alt={driver.nationality} className="w-6 h-4 mr-2" />
                <Link
                  to={`/driver/${driver.driverId}`}
                  className="text-blue-500 hover:underline"
                >
                  Más información
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DriversList;
