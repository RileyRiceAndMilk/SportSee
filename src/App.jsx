import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Selector from './pages/Selector';  
import Profil from './pages/Profil';  
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Selector />} />
        <Route path="/profil/:id" element={<Profil />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;

