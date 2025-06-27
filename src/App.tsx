
// App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { MantineProvider, Box } from '@mantine/core';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Sidebar from './sidebar/Sidebar';
import Header from './components/Header';
import New from './pages/New';
import Popular from './pages/Popular';
import Random from './pages/Random';
import Collection from './pages/Collection';
import Privacy from './menu/Privacy';
import About from './menu/About';
import TermService from './menu/TermService';
import Create from './menu/Create';

// Subpages
import Pastel from './pages/subpages/Pastel';
import Vintage from './pages/subpages/Vintage';
import Retro from './pages/subpages/Retro';
import Neon from './pages/subpages/Neon';
import Gold from './pages/subpages/Gold';
import Light from './pages/subpages/Light';
import Dark from './pages/subpages/Dark';
import Warm from './pages/subpages/Warm';
import Cold from './pages/subpages/Cold';
import Summer from './pages/subpages/Summer';
import Fall from './pages/subpages/Fall';
import Winter from './pages/subpages/Winter';
import Spring from './pages/subpages/Spring';
import Happy from './pages/subpages/Happy';
import Nature from './pages/subpages/Nature';
import Earth from './pages/subpages/Earth';


import PaletteDetail from './pages/PaletteDetail';

const AppContent: React.FC = () => {
  const location = useLocation();

  return (
    <Box style={{ display: 'flex', height: 'calc(100vh - 60px)' }}>
      {location.pathname !== '/about' &&
        location.pathname !== '/privacy' &&
        location.pathname !== '/terms' &&
        location.pathname !== '/create' && (
          <Box
            style={{
              width: '250px',
              borderRight: '1px solid #e0e0e0',
              overflowY: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <style>
              {`
              .sidebar::-webkit-scrollbar {
                display: none;
              }
            `}
            </style>
            <div className="sidebar">
              <Sidebar />
            </div>
          </Box>
        )}

      <Box style={{ flex: 1, overflowY: 'auto' }}>
        <Box style={{ padding: '1rem' }}>
          <Routes>
            <Route path="/" element={<New />} />
            <Route path="/palettes/popular" element={<Popular />} />
            <Route path="/palettes/random" element={<Random />} />
            <Route path="/palettes/collection" element={<Collection />} />
            <Route path="/palettes/pastel" element={<Pastel />} />
            <Route path="/palettes/vintage" element={<Vintage />} />
            <Route path="/palettes/retro" element={<Retro />} />
            <Route path="/palettes/neon" element={<Neon />} />
            <Route path="/palettes/gold" element={<Gold />} />
            <Route path="/palettes/light" element={<Light />} />
            <Route path="/palettes/dark" element={<Dark />} />
            <Route path="/palettes/warm" element={<Warm />} />
            <Route path="/palettes/cold" element={<Cold />} />
            <Route path="/palettes/summer" element={<Summer />} />
            <Route path="/palettes/fall" element={<Fall />} />
            <Route path="/palettes/winter" element={<Winter />} />
            <Route path="/palettes/spring" element={<Spring />} />
            <Route path="/palettes/happy" element={<Happy />} />
            <Route path="/palettes/nature" element={<Nature />} />
            <Route path="/palettes/earth" element={<Earth />} />

          
            <Route path="/palette/:id" element={<PaletteDetail />} />

            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<TermService />} />
            <Route path="/create" element={<Create />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

const App: React.FC = () => {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Header />
        <AppContent />
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar
          newestOnTop
          closeOnClick
          pauseOnHover
        />
      </BrowserRouter>
    </MantineProvider>
  );
};

export default App;
