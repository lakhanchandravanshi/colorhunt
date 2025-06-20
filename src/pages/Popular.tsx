import { supabase } from "../supabase/Client";
import React, { useEffect, useState } from "react";
import { Card, Text, SimpleGrid, Box, Center, Loader } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

interface PopularItem {
  id: string;
  colors: string[] | string;
  title: string;
  likes: number;
  creator: string;
  created_at: string;
}

const Popular: React.FC = () => {
  const [palettes, setPalettes] = useState<PopularItem[]>([]);
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
    const fetchPopular = async () => {
      const { data, error } = await supabase
        .from("popular")
        .select("*")
        .order("likes", { ascending: false }); // <-- highest first

      if (error) {
        console.error("Error fetching popular palettes:", error);
      } else {
        const parsed = (data || []).map((item) => ({
          ...item,
          colors:
            typeof item.colors === "string"
              ? JSON.parse(item.colors)
              : item.colors,
        }));
        setPalettes(parsed);
      }

      setLoading(false);
    };

    fetchPopular();
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
          {palettes.map((palette) => (
            <Card
              key={palette.id}
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
              {(palette.colors as string[]).slice(0, 4).map((color, idx) => (
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
                <Text fw={600}>{palette.title}</Text>
                <Text size="sm" c="dimmed">
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

export default Popular;
