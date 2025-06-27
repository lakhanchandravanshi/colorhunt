



import { useState, useRef, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { supabase } from "../supabase/Client";
import namer from "color-namer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Convert hex to color name
const getColorName = (hex: string): string => {
  const result = namer(hex);
  return result.html[0]?.name || "Unknown";
};

export default function PaletteForm() {
  const initialColors = ["#BBBBBB", "#CCCCCC", "#DDDDDD", "#EEEEEE"];
  const [colors, setColors] = useState(initialColors);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hasUserPicked, setHasUserPicked] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const handleColorPick = (hex: string) => {
    if (activeIndex === null) return;
    const updated = [...colors];
    updated[activeIndex] = hex;
    setColors(updated);
    if (!hasUserPicked && hex !== "") {
      setHasUserPicked(true);
    }
  };

  // Detect clicks outside picker/box area
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        boxRef.current &&
        !pickerRef.current.contains(event.target as Node) &&
        !boxRef.current.contains(event.target as Node)
      ) {
        setActiveIndex(null); // hide picker
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async () => {
    const reversedColors = [...colors].reverse();
    const reversedNames = reversedColors.map(getColorName);

    const { error } = await supabase.from("create").insert([
      {
        names: reversedNames,
        colors: reversedColors,
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error.message);
      toast.error("failed to submit");
    } else {
      toast.success("successfully submited!");
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "40px" }}>
      <ToastContainer position="top-right" autoClose={3000} />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "50px",
          minHeight: "60vh",
        }}
      >
        {/* Color Boxes */}
        <div
          ref={boxRef}
          style={{
            display: "flex",
            flexDirection: "column",
            height: 300,
            width: 300,
            borderRadius: 10,
            overflow: "hidden",
            boxShadow: "0 0 8px rgba(0,0,0,0.15)",
          }}
        >
          {colors.map((c, i) => (
            <div
              key={i}
              onClick={() => setActiveIndex(i)}
              style={{
                flex: 1,
                backgroundColor: c || "#f0f0f0",
                cursor: "pointer",
                border:
                  i === activeIndex ? "3px solid #000" : "2px solid transparent",
                transition: "0.3s",
              }}
            />
          ))}
        </div>

        {/* Color Picker */}
        {activeIndex !== null && (
          <div ref={pickerRef} style={{ textAlign: "center" }}>
            <HexColorPicker
              color={colors[activeIndex] || "#ffffff"}
              onChange={handleColorPick}
            />
            {colors[activeIndex] && (
              <p style={{ marginTop: 10, fontWeight: "bold", fontSize: 16 }}>
                {getColorName(colors[activeIndex])} — {colors[activeIndex]}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Submit Button */}
      {hasUserPicked && (
        <div style={{ textAlign: "center", marginTop: 30 }}>
          <button
            onClick={handleSubmit}
            style={{
              backgroundColor: "#000",
              color: "#fff",
              border: "none",
              padding: "10px 25px",
              borderRadius: "25px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Submit Palette
          </button>
        </div>
      )}
    </div>
  );
}


