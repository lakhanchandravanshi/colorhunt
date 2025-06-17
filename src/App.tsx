// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { MantineProvider, Box } from '@mantine/core';

// import Sidebar from './sidebar/Sidebar';
// import New from './pages/New';
// import Popular from './pages/Popular';
// import Random from './pages/Random';
// import Collection from './pages/Collection';

// const App: React.FC = () => {
//   return (
//     <MantineProvider>
//       <BrowserRouter>
//         <Box style={{ display: 'flex', height: '100vh' }}>
//           {/* Sidebar on the left */}
//           <Box style={{ width: '250px', borderRight: '1px solid #e0e0e0' }}>
//             <Sidebar />
//           </Box>

//           {/* Main content on the right */}
//           <Box style={{ flex: 1, padding: '1rem' }}>
//             <Routes>
//               <Route path="/" element={<New />} />
//               <Route path="/palettes/popular" element={<Popular />} />
//               <Route path="/palettes/random" element={<Random />} />
//               <Route path="/palettes/collection" element={<Collection />} />
//               <Route path="*" element={<Navigate to="/" />} />
//             </Routes>
//           </Box>
//         </Box>
//       </BrowserRouter>
//     </MantineProvider>
//   );
// };

// export default App;



import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MantineProvider, Box } from '@mantine/core';

import Sidebar from './sidebar/Sidebar';
import Header from './components/Header'; // ✅ Import Header
import New from './pages/New';
import Popular from './pages/Popular';
import Random from './pages/Random';
import Collection from './pages/Collection';

const App: React.FC = () => {
  return (
    <MantineProvider>
      <BrowserRouter>
      <Header />

        <Box style={{ display: 'flex', height: '100vh' }}>
          {/* Sidebar on the left */}
          <Box style={{ width: '250px', borderRight: '1px solid #e0e0e0' }}>
            <Sidebar />
          </Box>

          {/* Main content on the right */}
          <Box style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          

            {/* Page content */}
            <Box style={{ flex: 1, padding: '1rem' }}>
              <Routes>
                <Route path="/" element={<New />} />
                <Route path="/palettes/popular" element={<Popular />} />
                <Route path="/palettes/random" element={<Random />} />
                <Route path="/palettes/collection" element={<Collection />} />
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
