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
import { toast } from "react-toastify";

// Tables to search dynamically
const KNOWN_TABLES = ["colors", "popular", "random", "create"];
// Tags to exclude from display
const EXCLUDED_TAGS = ["Pastel", "Vintage", "Retro", "Neon"];

const PaletteDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const passedTable = location.state?.table || null;

  const [palette, setPalette] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  useEffect(() => {
    const fetchPalette = async () => {
      const tablesToSearch = passedTable
        ? [passedTable, ...KNOWN_TABLES.filter((t) => t !== passedTable)]
        : KNOWN_TABLES;

      for (const tableName of tablesToSearch) {
        const { data } = await supabase
          .from(tableName)
          .select("*")
          .eq("id", id)
          .single();

        if (data) {
          data.colors = typeof data.colors === "string" ? JSON.parse(data.colors) : data.colors;
          data.tags = typeof data.tags === "string" ? JSON.parse(data.tags) : data.tags;
          setPalette(data);
          break;
        }
      }

      setLoading(false);
    };

    fetchPalette();
  }, [id, passedTable]);

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

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  };

  const handleDownloadImage = async () => {
    const node = document.getElementById("palette-box");
    if (!node) return;

    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(node);
      const dataUrl = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${palette.title || "palette"}.png`;
      link.click();
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  if (loading) {
    return (
      <Center mt="xl">
        <Loader />
      </Center>
    );
  }

  if (!palette) {
    return (
      <Center mt="xl">
        <Text size="lg" c="dimmed">Palette not found.</Text>
      </Center>
    );
  }

  return (
    <Box p="xl">
      <Flex direction="column" align="center" mx="auto" w="100%">
        <Box
          id="palette-box"
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
          <Button
            variant="default"
            leftSection={<IconDownload size={16} />}
            onClick={handleDownloadImage}
          >
            Image
          </Button>
          <Button
            variant="default"
            leftSection={<IconLink size={16} />}
            onClick={handleCopyLink}
          >
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
          {palette.tags
            ?.filter((tag: string) => !EXCLUDED_TAGS.includes(tag))
            .map((tag: string, i: number) => (
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
