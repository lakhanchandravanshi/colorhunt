
import { supabase } from "../supabase/Client";
import React, { useEffect, useState } from "react";
import {
  Card,
  Text,
  Tooltip,
  SimpleGrid,
  Box,
  Center,
  Title,
  Loader,
} from "@mantine/core";

interface ColorPalette {
  id: string;
  colors: string[];
  title: string;
  likes: number;
  created_at: string;
  creator: string;
}

const ColorList: React.FC = () => {
  const [palettes, setPalettes] = useState<ColorPalette[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPalettes = async () => {
      const { data, error } = await supabase
        .from("colors")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setPalettes(data || []);
      }

      setLoading(false);
    };

    fetchPalettes();
  }, []);

  return (
    <Box p="md">
      {loading ? (
        <Center mt="xl">
          <Loader size="lg" />
        </Center>
      ) : (
        <SimpleGrid cols={4} spacing="lg" mt="md" breakpoints={[
          { maxWidth: 'md', cols: 3 },
          { maxWidth: 'sm', cols: 2 },
          { maxWidth: 'xs', cols: 1 },
        ]}>
          {palettes.map((palette) => (
            <Card
              key={palette.id}
              shadow="sm"
              radius="md"
              withBorder
              sx={{ transition: "transform 0.2s", "&:hover": { transform: "scale(1.03)" } }}
            >
              {palette.colors.slice(0, 4).map((color, idx) => (
                <Tooltip label={color} withArrow key={idx}>
                  <Box
                    h={50}
                    style={{
                      backgroundColor: color,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  />
                </Tooltip>
              ))}
              <Box mt="sm">
                <Text weight={600}>{palette.title}</Text>
                <Text size="sm" color="dimmed">
                  ❤️ {palette.likes} · by {palette.creator}
                </Text>
              </Box>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default ColorList;
