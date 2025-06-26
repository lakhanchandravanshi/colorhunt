import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Center,
  Loader,
  SimpleGrid,
  Text,
  Button,
  Group,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { toast } from "react-toastify";

interface CollectionPalette {
  id?: string;
  title: string;
  colors: string[];
  created_at?: string;
  creator?: string;
}

const Collection: React.FC = () => {
  const [collection, setCollection] = useState<CollectionPalette[]>([]);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const isXs = useMediaQuery("(max-width: 576px)");
  const isSm = useMediaQuery("(max-width: 768px)");
  const isMd = useMediaQuery("(max-width: 992px)");

  const getCols = () => {
    if (isXs) return 1;
    if (isSm) return 2;
    if (isMd) return 3;
    return 4;
  };

  const loadCollection = () => {
    const saved = JSON.parse(localStorage.getItem("my_collection") || "[]");
    setCollection(saved);
    setLoading(false);
  };

  useEffect(() => {
    loadCollection();
    window.addEventListener("collection_updated", loadCollection);
    return () => {
      window.removeEventListener("collection_updated", loadCollection);
    };
  }, []);

  const handleCopy = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopiedColor(color);
      setTimeout(() => setCopiedColor(null), 1500);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const handleRemove = (index: number) => {
    const updated = [...collection];
    updated.splice(index, 1);
    localStorage.setItem("my_collection", JSON.stringify(updated));
    setCollection(updated);
    toast.success("Card removed");
  };

  return (
    <Box p="md">
      {loading ? (
        <Center mt="xl">
          <Loader size="lg" />
        </Center>
      ) : collection.length === 0 ? (
        <Center mt="lg">
          <Text size="lg" c="dimmed">
            No cards added yet.
          </Text>
        </Center>
      ) : (
        <SimpleGrid cols={getCols()} spacing="lg" mt="md">
          {collection.map((palette, idx) => (
            <Card
              key={idx}
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
              {palette.colors.slice(0, 4).map((color, i) => (
                <Box
                  key={i}
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
                  {palette.created_at
                    ? new Date(palette.created_at).toLocaleDateString()
                    : ""}
                </Text>
              </Box>

              <Group mt="sm" justify="space-between">
                <Button
                  color="red"
                  variant="light"
                  fullWidth
                  onClick={() => handleRemove(idx)}
                >
                  Remove
                </Button>
              </Group>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default Collection;

