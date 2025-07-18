



import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  TextInput,
  Text,
  Menu,
  Divider,
  Popover,
  ScrollArea,
  Group,
  Badge,
  Stack,
  InputWrapper,
} from "@mantine/core";
import {
  IconSearch,
  IconDotsVertical,
  IconBrandChrome,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useFocusWithin } from "@mantine/hooks";

const colorTags = [
  "Blue", "Teal", "Mint", "Green", "Sage", "Yellow", "Beige", "Brown", "Orange",
  "Peach", "Red", "Maroon", "Pink", "Purple", "Navy", "Black", "Grey", "White",
];

const collectionTags = [
  "Pastel", "Vintage", "Retro", "Neon", "Gold", "Light", "Dark", "Warm", "Cold",
  "Summer", "Fall", "Winter", "Spring", "Happy", "Nature", "Earth",
];

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { ref, focused } = useFocusWithin();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleAddTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags((prev) => [...prev, tag]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tag));
  };

  return (
    <Box
      px="md"
      py={2} // reduced padding
      style={{
        borderBottom: "1px solid #eee",
        backgroundColor: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Flex align="center" justify="space-between">
        {/* Left: Logo */}
        <Flex align="center" gap="xs">
        <Image
            src="data:image/png;base64,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"
            alt="Color Hunt"
            style={{ width: "15%" }}
            onClick={() => navigate("/palettes/new")}
          />
          <Text fw={700} size="md">
            Color Hunt
          </Text>
        </Flex>

        {/* Middle: Search Bar */}
        <Flex justify="center" style={{ flex: 1 }} ref={ref}>
          <Popover opened={focused} width="target" position="bottom" shadow="md">
            <Popover.Target>
            <InputWrapper
  style={{
    width: "75%",         // wider
    minWidth: 350,        // slightly wider min
    maxWidth: 700,        // wider max
    height: 36,           // fixed height
    border: "1px solid #ced4da",
    borderRadius: 50,
    padding: "2px 12px",  // reduced padding = smaller height
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    cursor: "text",
  }}
>

                <Group gap="xs" wrap="wrap" mr="xs">
                  {selectedTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="filled"
                      color="gray"
                      rightSection={
                        <Box
                          component="span"
                          style={{ cursor: "pointer", marginLeft: 4 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveTag(tag);
                          }}
                        >
                          ×
                        </Box>
                      }
                    >
                      {tag}
                    </Badge>
                  ))}
                </Group>
                <TextInput
                  variant="unstyled"
                  placeholder={selectedTags.length === 0 ? "Search palettes" : ""}
                  style={{ flex: 1 }}
                  rightSection={<IconSearch size={16} />}
                />
              </InputWrapper>
            </Popover.Target>

            <Popover.Dropdown p="sm">
              <ScrollArea h={250}>
                <Stack gap="sm">
                  <Text fw={600} size="sm">
                    Colors
                  </Text>
                  <Group gap="xs" wrap="wrap">
                    {colorTags.map((color) => (
                      <Badge
                        key={color}
                        variant="light"
                        color="gray"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleAddTag(color)}
                      >
                        {color}
                      </Badge>
                    ))}
                  </Group>

                  <Text fw={600} size="sm" mt="sm">
                    Collections
                  </Text>
                  <Group gap="xs" wrap="wrap">
                    {collectionTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        color="gray"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          handleAddTag(tag);
                          navigate(`/palettes/${tag.toLowerCase()}`);
                        }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </Group>
                </Stack>
              </ScrollArea>
            </Popover.Dropdown>
          </Popover>
        </Flex>

        {/* Right: Chrome Button & Menu */}
        <Flex align="center" gap="sm">
          <Button
            onClick={() =>
              window.open(
                "https://chromewebstore.google.com/detail/color-tab/hchlgfaicmddilenlflajnmomalehbom",
                "_blank"
              )
            }
            variant="default"
            size="xs"
            radius="xl"
            leftSection={<IconBrandChrome size={14} />}
          >
            Add to Chrome
          </Button>

          <Menu
            shadow="md"
            width={200}
            position="bottom-end"
            withArrow
            offset={10}
            onOpen={() => setMenuOpen(true)}
            onClose={() => setMenuOpen(false)}
          >
            <Menu.Target>
              <IconDotsVertical
                style={{
                  cursor: "pointer",
                  backgroundColor: menuOpen ? "#f1f3f5" : "transparent",
                  borderRadius: "50%",
                  padding: "3px",
                }}
              />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={() => navigate("/palettes/new")}>Palettes</Menu.Item>
              <Menu.Item onClick={() => navigate("/create")}>Create</Menu.Item>
              <Menu.Item onClick={() => navigate("/palettes/collection")}>Collection</Menu.Item>
              <Divider />
              <Menu.Item onClick={() => navigate("/about")}>About</Menu.Item>
              <Menu.Item
                onClick={() =>
                  window.open("https://www.instagram.com/color.hunt/", "_blank")
                }
              >
                Instagram
              </Menu.Item>
              <Divider />
              <Menu.Item onClick={() => navigate("/terms")}>Terms of Service</Menu.Item>
              <Menu.Item onClick={() => navigate("/privacy")}>Privacy Policy</Menu.Item>
              <Divider />
              <Text size="xs" c="dimmed" ta="center" py={4}>
                Made by Gal Shir
              </Text>
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
