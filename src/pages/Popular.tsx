
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Center,
  Loader,
  SimpleGrid,
  Text,
  Button,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { supabase } from "../supabase/Client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // ✅ import navigate

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
  const navigate = useNavigate(); // ✅ setup

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
        .order("likes", { ascending: false });

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

  const handleAddToCollection = (palette: PopularItem) => {
    const existing = JSON.parse(localStorage.getItem("my_collection") || "[]");

    const isAlreadyAdded = existing.some((p: PopularItem) => p.id === palette.id);
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
              style={{ transition: "transform 0.2s", cursor: "pointer" }}
              onClick={() =>
                navigate(`/palette/${palette.id}`, {
                  state: { table: "popular" }, // ✅ send table info
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
                    e.stopPropagation(); // ✅ prevents triggering card navigation
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

export default Popular;

