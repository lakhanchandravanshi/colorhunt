import { supabase } from "../../supabase/Client";
import React, { useEffect, useState } from "react";
import {
  Card,
  SimpleGrid,
  Box,
  Center,
  Loader,
  Button,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { toast } from "react-toastify";

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
        const parsedData = (data || []).map((item: any) => ({
          ...item,
          colors: typeof item.colors === "string" ? JSON.parse(item.colors) : item.colors,
          names: typeof item.names === "string" ? JSON.parse(item.names) : item.names,
        }));
        setPalettes(parsedData);
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

  const handleAddToCollection = (palette: PaletteData) => {
    const existing = JSON.parse(localStorage.getItem("my_collection") || "[]");

    const isAlreadyAdded = existing.some((p: PaletteData) => p.id === palette.id);

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
              style={{ transition: "transform 0.2s" }}
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
                <Button
                  fullWidth
                  mt="sm"
                  variant="light"
                  color="blue"
                  onClick={() => handleAddToCollection(palette)}
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

export default Retro;
