import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import BookingPage from './pages/BookingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/book/:onwardId" element={<BookingPage />} />
        <Route path="/book/:onwardId/:returnId" element={<BookingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
