import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function DriversList() {
  const [drivers, setDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageAvailability, setImageAvailability] = useState({});

  // Function to check if an image exists
  const checkImageExists = (src, driverId) => {
    const img = new Image();
    img.onload = () => {
      setImageAvailability(prev => ({
        ...prev,
        [driverId]: true
      }));
    };
    img.onerror = () => {
      setImageAvailability(prev => ({
        ...prev, 
        [driverId]: false
      }));
    };
    img.src = src;
  };

  // Fetch drivers data
  useEffect(() => {
    fetch('https://f1-api-7h7q.onrender.com/api/drivers')
      .then((response) => response.json())
      .then((data) => {
        setDrivers(data);
        setIsLoading(false);
      });
  }, []);

  // Check image availability after drivers load
  useEffect(() => {
    if (drivers.length > 0) {
      drivers.forEach(driver => {
        const imgSrc = `/images/drivers/${driver.familyName}.avif`;
        checkImageExists(imgSrc, driver.driverId);
      });
    }
  }, [drivers]);

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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Drivers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {drivers.map((driver) => {
          // Skip rendering cards where images don't exist
          if (imageAvailability[driver.driverId] === false) {
            return null;
          }
          
          return (
            <div 
              key={driver.driverId} 
              className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs mx-auto relative group h-96"
            >
              <img
                src={`/images/drivers/${driver.familyName}.avif`}
                alt={driver.givenName}
                className="w-full h-full object-cover transition-all duration-300 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex flex-col justify-end">
                <div className="p-4 text-white">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">{driver.givenName} {driver.familyName}</h2>
                    <img src={driver.flagUrl} alt={driver.nationality} className="w-10 h-auto mr-2" />
                  </div>
                  <p className="text-gray-300">Número: {driver.permanentNumber}</p>
                  <p className="text-gray-300">Nacionalidad: {driver.nationality}</p>
                  <p className="text-gray-300">Fecha de nacimiento: {new Date(driver.dateOfBirth).toLocaleDateString()}</p>
                  <div className="flex items-center mt-4">
                    <Link
                      to={`/driver/${driver.driverId}`}
                      className="text-blue-300 hover:text-blue-100 transition-colors duration-300"
                    >
                      Más información
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DriversList;