
import { supabase } from "../supabase/Client";
import React, { useEffect, useState } from "react";
import {
  Card,
  Text,
  SimpleGrid,
  Box,
  Center,
  Loader,
  Button,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // ✅ Added import

interface PaletteItem {
  id: string;
  title: string;
  colors: string[] | string;
  likes: number;
  creator: string;
  created_at: string;
  tags: string[] | string;
}

const Random: React.FC = () => {
  const [palettes, setPalettes] = useState<PaletteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  const navigate = useNavigate(); // ✅ Use navigate

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
    const fetchRandomFromPopular = async () => {
      const { data, error } = await supabase.from("popular").select("*");

      if (error) {
        console.error("Error fetching palettes:", error);
      } else {
        const parsed = (data || []).map((item) => ({
          ...item,
          colors:
            typeof item.colors === "string"
              ? JSON.parse(item.colors)
              : item.colors,
        }));

        const shuffled = parsed.sort(() => 0.5 - Math.random());
        setPalettes(shuffled);
      }

      setLoading(false);
    };

    fetchRandomFromPopular();
  }, []);

  const handleCopy = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopiedColor(color);
      setTimeout(() => setCopiedColor(null), 1500);
    } catch (err) {
      console.error("Failed to copy color:", err);
    }
  };

  const handleAddToCollection = (palette: PaletteItem) => {
    const existing = JSON.parse(localStorage.getItem("my_collection") || "[]");

    const isAlreadyAdded = existing.some(
      (p: PaletteItem) => p.id === palette.id
    );
    if (isAlreadyAdded) {
      toast.info("Already in collection", {
        toastId: `exists-${palette.id}`,
      });
      return;
    }

    const updated = [palette, ...existing];
    localStorage.setItem("my_collection", JSON.stringify(updated));
    window.dispatchEvent(new Event("collection_updated"));

    toast.success("Added to collection", {
      toastId: `added-${palette.id}`,
      autoClose: 1500,
    });
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
              style={{
                cursor: "pointer",
                transition: "transform 0.2s",
              }}
              onClick={() =>
                navigate(`/palette/${palette.id}`, {
                  state: { table: "popular" }, 
                })
              }
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
                <Button
                  fullWidth
                  mt="sm"
                  variant="light"
                  color="blue"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleAddToCollection(palette);
                  }}
                >
                  Add
                </Button>
              </Box>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default Random;


