

import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabase/Client";
import {
  Box,
  Text,
  Flex,
  Loader,
  Center,
  Badge,
  Button,
  Group,
} from "@mantine/core";
import { IconDownload, IconLink } from "@tabler/icons-react";

const PaletteDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const table = location.state?.table || "colors"; // fallback if state not passed

  const [palette, setPalette] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  useEffect(() => {
    const fetchPalette = async () => {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching palette:", error);
      }

      if (data) {
        data.colors = typeof data.colors === "string" ? JSON.parse(data.colors) : data.colors;
        data.tags = typeof data.tags === "string" ? JSON.parse(data.tags) : data.tags;
        setPalette(data);
      }

      setLoading(false);
    };

    fetchPalette();
  }, [id, table]);

  const hexToRgb = (hex: string): [number, number, number] | null => {
    const value = hex.replace("#", "");
    const bigint = parseInt(value, 16);
    if (value.length !== 6 || isNaN(bigint)) return null;
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  };

  const handleCopy = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopiedColor(color);
      setTimeout(() => setCopiedColor(null), 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  if (loading) {
    return (
      <Center mt="xl">
        <Loader />
      </Center>
    );
  }

  if (!palette) return <Text ta="center">Palette not found</Text>;

  return (
    <Box p="xl">
      <Flex direction="column" align="center" mx="auto" w="100%">
        <Box
          w={300}
          style={{
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 3px 12px rgba(0,0,0,0.15)",
          }}
        >
          {palette.colors.map((color: string, i: number) => (
            <Box
              key={i}
              h={70}
              onMouseEnter={() => setHoveredColor(color)}
              onMouseLeave={() => setHoveredColor(null)}
              style={{
                backgroundColor: color,
                position: "relative",
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
                    bottom: 6,
                    left: 6,
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: 600,
                    padding: "2px 6px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  {copiedColor === color ? "Copied!" : color}
                </Box>
              )}
            </Box>
          ))}
        </Box>

        <Group mt="md" gap="md">
          <Button variant="default" leftSection={<IconDownload size={16} />}>
            Image
          </Button>
          <Button variant="default" leftSection={<IconLink size={16} />}>
            Link
          </Button>
        </Group>

        <Flex mt="xl" gap="lg" justify="center" wrap="wrap">
          {palette.colors.map((hex: string, i: number) => {
            const rgb = hexToRgb(hex);
            return (
              <Flex key={i} direction="column" align="center">
                <Box
                  w={22}
                  h={22}
                  style={{
                    borderRadius: "50%",
                    backgroundColor: hex,
                    border: "1px solid #ccc",
                    marginBottom: 4,
                  }}
                />
                <Text
                  size="sm"
                  fw={600}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleCopy(hex)}
                >
                  {copiedColor === hex ? "Copied!" : hex.toUpperCase()}
                </Text>
                <Text size="xs" c="dimmed">
                  rgb({rgb?.join(", ")})
                </Text>
              </Flex>
            );
          })}
        </Flex>

        <Flex mt="lg" gap="sm" wrap="wrap" justify="center">
          {palette.tags?.map((tag: string, i: number) => (
            <Badge key={i} variant="light" size="lg" color="gray">
              {tag}
            </Badge>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default PaletteDetail;

