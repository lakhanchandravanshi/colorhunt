import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import App from './App';
import '@mantine/core/styles.css'
const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme='light' theme={{
      fontFamily:'DIN Round,sans-serif'
    }}>
      <App />
    </MantineProvider>
  </React.StrictMode>
);


