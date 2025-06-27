
import React from 'react';
import { Box, Title, Text, List, ListItem, Stack } from '@mantine/core';

const Privacy: React.FC = () => {
  return (
    <Box maw={800} mx="auto" mt="xl" p="md">
      <Stack gap="md">
        <Title order={2}>Privacy Policy</Title>
        <Text>
          This is Color Hunt’s Privacy Policy for www.colorhunt.co. This document explains Color Hunt policies for the collection, use, and disclosure of personal information on www.colorhunt.co. This privacy policy deals with personally-identifiable information (referred to as “data” below) that may be collected by this site.
        </Text>

        <Title order={3} mt="lg">COLLECTION OF DATA</Title>
        <Text>
          As on many websites, the site editor may automatically receive general information that is contained in server log files, such as your IP address, and cookie information. Information about how advertising may be served on this site (if it is indeed the site editor’s policy to display advertising) is set forth below.
        </Text>

        <Title order={3} mt="lg">USE OF DATA</Title>
        <Text>
          Data may be used to customize and improve your user experience on this site. Efforts will be made to prevent your data from being made available to third parties unless:
        </Text>
        <List withPadding>
          <ListItem>provided for otherwise in this Privacy Policy;</ListItem>
          <ListItem>
            your consent is obtained, such as when you choose to opt-in or opt-out for the sharing of data;
          </ListItem>
          <ListItem>
            a service provided on our site requires interaction with a third party, or is provided by a third party, such as an application service provider;
          </ListItem>
          <ListItem>
            pursuant to legal action or law enforcement;
          </ListItem>
          <ListItem>
            it is found that your use of the site violates the site editor’s policy, terms of service, or other usage guidelines;
          </ListItem>
          <ListItem>
            or if it is deemed reasonably necessary by the site editor to protect the site editor’s legal rights and/or property;
          </ListItem>
          <ListItem>
            or this site is purchased by a third party, in which case that third party will be able to use the data in the same manner as set forth in this policy.
          </ListItem>
        </List>

        <Text>
          In the event you choose to use links displayed on this website to visit other websites, you are advised to read the privacy policies published on those sites. Color Hunt uses third-party advertising companies to serve ads when you visit our website. These companies may use information (not including your name, address, email address, or telephone number) about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
        </Text>

        <Title order={3} mt="lg">COOKIES</Title>
        <Text>
          Like many websites, this website sets and uses cookies to enhance your user experience — to remember your personal settings, for instance.
        </Text>
        <Text>
          Advertisements may display on this website and, if so, may set and access cookies on your computer; such cookies are subject to the privacy policy of the parties providing the advertisement. However, the parties providing the advertising do not have access to this site’s cookies. These parties usually use non–personally-identifiable or anonymous codes to obtain information about your visits to this site.
        </Text>
        <Text>
          Please note that turning off advertising cookies won’t mean that you are not served any advertising, merely that it will not be tailored to your interests.
        </Text>
      </Stack>
    </Box>
  );
};

export default Privacy;

