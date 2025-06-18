

// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MantineProvider, Box } from '@mantine/core';

import Sidebar from './sidebar/Sidebar';
import Header from './components/Header';
import New from './pages/New';
import Popular from './pages/Popular';
import Random from './pages/Random';
import Collection from './pages/Collection';

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

const App: React.FC = () => {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Header />
        <Box style={{ display: 'flex', height: '100vh' }}>
          <Box style={{ width: '250px', borderRight: '1px solid #e0e0e0' }}>
            <Sidebar />
          </Box>
          <Box style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Box style={{ flex: 1, padding: '1rem' }}>
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
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </BrowserRouter>
    </MantineProvider>
  );
};

export default App;





