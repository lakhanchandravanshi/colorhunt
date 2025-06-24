import { supabase } from "../../supabase/Client";
import React, { useEffect, useState } from "react";
import { Card, Text, SimpleGrid, Box, Center, Loader } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

interface PaletteData {
  id: string;
  colors: string[];
  names: string[];
  created_at: string;
}

const Retro: React.FC = () => {
  const [palettes, setPalettes] = useState<PaletteData[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  const isXs = useMediaQuery("(max-width: 576px)");
  const isSm = useMediaQuery("(max-width: 768px)");
  const isMd = useMediaQuery("(max-width: 992px)");

  const getCols = () => {
    if (isXs) return 1;
    if (isSm) return 2;
    if (isMd) return 3;
    return 4;
  };

  useEffect(() => {
    const fetchPalettes = async () => {
      const { data, error } = await supabase
        .from("create")
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

  const handleCopy = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopiedColor(color);
      setTimeout(() => {
        setCopiedColor(null);
      }, 1500);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <Box p="md">
      {loading ? (
        <Center mt="xl">
          <Loader size="lg" />
        </Center>
      ) : (
        <SimpleGrid cols={getCols()} spacing="lg" mt="md">
          {palettes.map((palette, index) => (
            <Card
              key={index}
              shadow="sm"
              radius="md"
              withBorder
              style={{ transition: "transform 0.2s" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              {palette.colors?.slice(0, 4).map((color, idx) => (
                <Box
                  key={idx}
                  h={50}
                  onMouseEnter={() => setHoveredColor(color)}
                  onMouseLeave={() => setHoveredColor(null)}
                  style={{
                    backgroundColor: color,
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {hoveredColor === color && (
                    <Box
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(color);
                      }}
                      style={{
                        position: "absolute",
                        bottom: 4,
                        left: 4,
                        color: "#fff",
                        fontSize: "12px",
                        fontWeight: 600,
                        padding: "2px 6px",
                        borderRadius: "4px",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        cursor: "pointer",
                      }}
                    >
                      {copiedColor === color ? "Copied!" : color}
                    </Box>
                  )}
                </Box>
              ))}
              <Box mt="sm">
                <Text size="sm" c="dimmed">
                  {new Date(palette.created_at).toLocaleDateString()}
                </Text>
              </Box>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default Retro;


