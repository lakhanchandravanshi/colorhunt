import { supabase } from "../../supabase/Client";
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
import { useNavigate } from "react-router-dom";

interface ColorPalette {
  id: string;
  colors: string[];
  title: string;
  likes: number;
  created_at: string;
  creator: string;
  tags?: string[];
}

const Neon: React.FC = () => {
  const [palettes, setPalettes] = useState<ColorPalette[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  const navigate = useNavigate();

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
    const fetchNeonPalettes = async () => {
      const { data, error } = await supabase
        .from("colors")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching Neon palettes:", error);
      } else {
        const parsed = (data || []).map((item) => ({
          ...item,
          colors: typeof item.colors === "string" ? JSON.parse(item.colors) : item.colors,
          tags: typeof item.tags === "string" ? JSON.parse(item.tags) : item.tags,
        }));
        setPalettes(parsed);
      }

      setLoading(false);
    };

    fetchNeonPalettes();
  }, []);

  const handleCopy = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopiedColor(color);
      setTimeout(() => setCopiedColor(null), 1500);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const handleAddToCollection = (palette: ColorPalette) => {
    const existing = JSON.parse(localStorage.getItem("my_collection") || "[]");

    const isDuplicate = existing.some(
      (item: ColorPalette) =>
        item.title === palette.title &&
        JSON.stringify(item.colors) === JSON.stringify(palette.colors)
    );

    if (isDuplicate) {
      toast.info("Card already in collection");
      return;
    }

    const updated = [palette, ...existing];
    localStorage.setItem("my_collection", JSON.stringify(updated));
    window.dispatchEvent(new Event("collection_updated"));
    toast.success("Card added!");
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
              style={{ transition: "transform 0.2s", cursor: "pointer" }}
              onClick={() =>
                navigate(`/palette/${palette.id}`, {
                  state: { table: "colors" },
                })
              }
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              {palette.colors.slice(0, 4).map((color, idx) => (
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

export default Neon;
