import React from 'react';
import { Box, Title, Text, Stack } from '@mantine/core';

const TermService: React.FC = () => {
  return (
    <Box maw={800} mx="auto" mt="xl" p="md">
      <Stack gap="md">
        <Title order={2}>Terms of Service</Title>
        <Text>
          Welcome to Color Hunt. By accessing or using our website, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not access or use our website.
        </Text>

        <Title order={3}>Limitation of Liability</Title>
        <Text>
          We make no warranties or representations about the accuracy or completeness of the content on our website, and we are not liable for any damages arising from your use of our website or the content on it. In no event shall our company be liable for any damages whatsoever arising out of or in connection with the use or inability to use our website or the content on it.
        </Text>

        <Title order={3}>Indemnification</Title>
        <Text>
          You agree to indemnify and hold our company, its officers, directors, employees, agents, and affiliates, harmless from any and all claims, damages, expenses, and liabilities, including reasonable attorneys’ fees, arising out of or in connection with your use of our website or your violation of these Terms of Service.
        </Text>

        <Title order={3}>Termination</Title>
        <Text>
          We may terminate or suspend your access to our website, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms of Service.
        </Text>

        <Title order={3}>Changes to Terms of Service</Title>
        <Text>
          We reserve the right, at our sole discretion, to modify or replace these Terms of Service at any time. Your continued use of our website after any such changes constitutes your acceptance of the new Terms of Service.
        </Text>
      </Stack>
    </Box>
  );
};

export default TermService;
