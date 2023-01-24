import React from "react";
import "./header.css";

import { RxEraser } from "react-icons/rx";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
type props = {
  penColor: string;
  setPenColor: React.Dispatch<React.SetStateAction<string>>;
  setDrawingMode: () => void;
  setEraserMode: () => void;
  setPenWidth: React.Dispatch<React.SetStateAction<number>>;
  setEraserWidth: React.Dispatch<React.SetStateAction<number>>;
};

export default function Header({
  penColor,
  setPenColor,
  setDrawingMode,
  setEraserMode,
  setPenWidth,
  setEraserWidth,
}: props) {
  const chnagePenColor = (color: string) => {
    setPenColor(color);
  };
  const chnagePenWith = (e: Event, newValue: number | number[]) => {
    setPenWidth(newValue as number);
  };
  const chnageEraserWith = (e: Event, newValue: number | number[]) => {
    setEraserWidth(newValue as number);
  };
  return (
    <Stack
      direction="row"
      padding={4}
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Stack
        spacing={4}
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Button onClick={setDrawingMode}>
          <div className="circle" style={{ backgroundColor: `${penColor}` }}>
            <EditIcon style={{ color: "white" }} />
          </div>
        </Button>
        <Slider
          aria-label="Volume"
          min={2}
          defaultValue={4}
          max={10}
          onChange={chnagePenWith}
          sx={{
            width: 100,
            color: "black",
          }}
        />
        <Stack direction="row">
          {["black", "red", "yellow"].map((ele) => {
            return (
              <Button
                key={ele}
                onClick={() => {
                  chnagePenColor(ele);
                }}
              >
                <div className="circle" style={{ backgroundColor: `${ele}` }}>
                  <CheckIcon
                    style={{ color: `${ele === penColor ? "white" : ele}` }}
                  />
                </div>
              </Button>
            );
          })}
        </Stack>
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        <button onClick={setEraserMode}>
          <div className="eraser">
            <RxEraser color="black" />
          </div>
        </button>
        <Slider
          aria-label="Volume"
          onChange={chnageEraserWith}
          min={2}
          defaultValue={4}
          max={10}
          sx={{
            width: 100,
            color: "black",
          }}
        />
      </Stack>
    </Stack>
  );
}
