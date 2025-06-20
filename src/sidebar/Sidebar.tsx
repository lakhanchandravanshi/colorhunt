
// src/sidebar/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@mantine/core';
import {
  IconStarFilled,
  IconFlame,
  IconRefresh,
  IconHeart,
} from '@tabler/icons-react';

const links = [
  { label: 'New', icon: IconStarFilled, to: '/' },
  { label: 'Popular', icon: IconFlame, to: '/palettes/popular' },
  { label: 'Random', icon: IconRefresh, to: '/palettes/random' },
  { label: 'Collection', icon: IconHeart, to: '/palettes/collection' },
];

const categories = [
  'Pastel',
  'Vintage',
  'Retro',
  'Neon',
  'Gold',
  'Light',
  'Dark',
  'Warm',
  'Cold',
  'Summer',
  'Fall',
  'Winter',
  'Spring',
  'Happy',
];

const Sidebar: React.FC = () => {
  return (
    <Box p="md" style={{ width: '100%' }}>
      <Stack gap={16}>
        {links.map(({ label, icon: Icon, to }) => (
          <NavLink
            to={to}
            key={label}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              backgroundColor: isActive ? '#f1f3f5' : 'transparent',
              textDecoration: 'none',
              color: isActive ? '#1c7ed6' : '#333',
              fontWeight: isActive ? 700 : 500,
            })}
          >
            <Icon size={20} />
            <Text>{label}</Text>
          </NavLink>
        ))}

        <Box
          style={{
            height: 1,
            backgroundColor: '#e9ecef',
            margin: '8px 0',
          }}
        />

        <Stack gap={4}>
          {categories.map((cat) => (
            <NavLink
              key={cat}
              to={`/palettes/${cat.toLowerCase()}`}
              style={({ isActive }) => ({
                display: 'block',
                padding: '4px 8px',
                paddingLeft: '1.5rem',
                borderRadius: '6px',
                textDecoration: 'none',
                backgroundColor: isActive ? '#f1f3f5' : 'transparent',
                color: '#212529',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.875rem',
              })}
            >
              {cat}
            </NavLink>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Sidebar;





