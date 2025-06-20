
import React from 'react';
import { Box, Text, Title, Container, Image, Stack } from '@mantine/core';

const About: React.FC = () => {
  return (
    <Container size="md" pt="xl" pb="xl">
      <Stack align="center" gap={32}>
        <Image
          src="https://colorhunt.co/img/color-hunt-logo-animation.gif"
          alt="Color Hunt Logo"
          style={{ width: '150px', height: 'auto' }} // Explicitly set width and maintain aspect ratio
        />

        <Box>
          <Title order={3} style={{ textAlign: 'center' }}>Color Hunt</Title>
          <Text style={{ textAlign: 'center' }} mt="sm">
            Color Hunt is an open collection of beautiful color palettes, created by{' '}
            <a href="https://galshir.com" target="_blank" rel="noopener noreferrer">Gal Shir</a>.
            Color Hunt started as a personal small project built to share trendy color combinations between a group of designer friends. 
            The collection scaled up and is now used daily by thousands of people all over the world. 
            It was created to celebrate the beauty of colors and provide inspiration.
          </Text>
        </Box>

        <Box>
          <Title order={4} style={{ textAlign: 'center' }} mt="lg">Who creates the color palettes?</Title>
          <Text style={{ textAlign: 'center' }} mt="sm">
            You, the users, create the palettes using Color Hunt’s palette creator. 
            Everyone can create and submit their own combinations. 
            Each palette is public and not owned by any specific creator or by Color Hunt.
          </Text>
        </Box>

        <Box>
          <Title order={4} style={{ textAlign: 'center' }} mt="lg">Which palettes get featured?</Title>
          <Text style={{ textAlign: 'center' }} mt="sm">
            Color Hunt is open, but also curated. Palettes are hand-picked by curators.
            The best submissions are picked up daily and featured on the homepage the next day.
          </Text>
        </Box>

        <Box>
          <Title order={4} style={{ textAlign: 'center' }} mt="lg">Made by Gal Shir</Title>
          <Text style={{ textAlign: 'center' }} mt="sm">
            Color Hunt was founded by <a href="https://galshir.com" target="_blank" rel="noopener noreferrer">Gal Shir</a>, 
            a designer and artist from Tel Aviv who is passionate about colors. 
            Since 2015, he has been sharing this passion and providing a helpful resource for designers and artists.
          </Text>
        </Box>

        <Box>
          <Title order={5} style={{ textAlign: 'center' }} mt="lg">Partnerships/sponsorships</Title>
          <Text style={{ textAlign: 'center' }} mt="sm">
            Reach out to <a href="mailto:hello@galshir.com">hello@galshir.com</a>
          </Text>
        </Box>
      </Stack>
    </Container>
  );
};

export default About;