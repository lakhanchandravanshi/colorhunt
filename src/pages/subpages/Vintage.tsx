


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
import { useNavigate } from "react-router-dom"; // ✅ added

interface ColorPalette {
  id: string;
  colors: string[];
  title: string;
  likes: number;
  created_at: string;
  creator: string;
}

const Vintage: React.FC = () => {
  const [palettes, setPalettes] = useState<ColorPalette[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const navigate = useNavigate(); // ✅ added

  const isXs = useMediaQuery("(max-width: 576px)");
  const isSm = useMediaQuery("(max-width: 768px)");
  const isMd = useMediaQuery("(max-width: 992px)");

  const getCols = (): number => {
    if (isXs) return 1;
    if (isSm) return 2;
    if (isMd) return 3;
    return 4;
  };

  useEffect(() => {
    const fetchPalettes = async () => {
      const { data, error } = await supabase
        .from("Vintage")
        .select("id, colors, title, likes, created_at, creator")
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
      setTimeout(() => setCopiedColor(null), 1500);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const handleAddToCollection = (palette: ColorPalette) => {
    const existing = JSON.parse(localStorage.getItem("my_collection") || "[]");

    const isAlreadyAdded = existing.some(
      (p: ColorPalette) =>
        p.title === palette.title && p.created_at === palette.created_at
    );
    if (isAlreadyAdded) {
      toast.info("Already in collection", {
        toastId: `exists-${palette.title}-${palette.created_at}`,
      });
      return;
    }

    const updated = [palette, ...existing];
    localStorage.setItem("my_collection", JSON.stringify(updated));
    window.dispatchEvent(new Event("collection_updated"));

    toast.success("Added to collection", {
      toastId: `added-${palette.title}-${palette.created_at}`,
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
          {palettes.map((palette, paletteIndex) => (
            <Card
              key={`${palette.id}`}
              shadow="sm"
              radius="md"
              withBorder
              style={{ transition: "transform 0.2s", cursor: "pointer" }}
              onClick={() =>
                navigate(`/palette/${palette.id}`, {
                  state: { table: "Vintage" },
                })
              }
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              {palette.colors.slice(0, 4).map((color, colorIndex) => {
                const trimmedColor = color.trim();
                const uniqueKey = `${paletteIndex}-${colorIndex}`;

                return (
                  <Box
                    key={uniqueKey}
                    h={50}
                    onMouseEnter={() => setHoveredKey(uniqueKey)}
                    onMouseLeave={() => setHoveredKey(null)}
                    style={{
                      backgroundColor: trimmedColor,
                      position: "relative",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {hoveredKey === uniqueKey && (
                      <Box
                        onClick={(e) => {
                          e.stopPropagation(); // prevent card click
                          handleCopy(trimmedColor);
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
                        {copiedColor === trimmedColor
                          ? "Copied!"
                          : trimmedColor}
                      </Box>
                    )}
                  </Box>
                );
              })}

              <Box mt="sm">
                <Text fw={600}>{palette.title}</Text>
                <Button
                  fullWidth
                  mt="sm"
                  variant="light"
                  color="blue"
                  onClick={(e) => {
                    e.stopPropagation(); // ✅ prevent navigate
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

export default Vintage;