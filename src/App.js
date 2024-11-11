import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importa los componentes desde sus respectivas carpetas
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import RaceDetail from './components/RaceDetail/RaceDetail';
import DriversList from './components/DriversList/DriversList';
import DriverDetail from './components/DriverDetail/DriverDetail';
import DriverStandings from './components/DriverStandings/DriverStandings';
import ConstructorStandings from './components/ConstructorStandings/ConstructorStandings';
import RaceResults from './components/RaceResults/RaceResults';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />  {/* Aquí agregamos el componente Navbar */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/race/:id" element={<RaceDetail />} />
          <Route path="/drivers" element={<DriversList />} />
          <Route path="/driver/:driverId" element={<DriverDetail />} />
          <Route path="/driver-standings" element={<DriverStandings />} />
          <Route path="/constructor-standings" element={<ConstructorStandings />} />
          <Route path="/raceResults/:round" element={<RaceResults />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
