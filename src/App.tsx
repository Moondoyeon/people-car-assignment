import { Routes, Route, Navigate } from 'react-router-dom';
import CarDetail from './pages/CarDetail';
import CarList from './pages/CarList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/cars" />} />
        <Route path="/cars" element={<CarList />} />
        <Route path="/cars/:id" element={<CarDetail />} />
      </Routes>
    </div>
  );
}

export default App;
