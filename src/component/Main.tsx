import React, { useReducer, useState } from "react";
import { fabric } from "fabric";
import FabricCanvas from "./Canvas";
import Header from "./Header/Header";

enum modes {
  none = "",
  select = "SELECT",
  drawing = "DRAWING",
  eraser = "ERASER",
}

function Main() {
  const [canvas, setCanvas] = useState<null | fabric.Canvas>(null);
  const [penColor, setpenColor] = useState<string>("yellow");
  const [mode, setMode] = useState<modes>(modes.none);

  const [penWidth, setPenWidth] = useState(2);
  const [eraserWidth, setEraserWidth] = useState(2);

  const onReady = (re: fabric.Canvas) => {
    setCanvas(re);
  };
  canvas?.on("mouse:move", (e) => {
    if (mode === modes.select) {
      canvas.setCursor("grab");
      canvas.isDrawingMode = false;
      canvas.requestRenderAll();
    } else if (mode == modes.drawing) {
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.color = penColor;
      canvas.freeDrawingBrush.width = penWidth;
      canvas.requestRenderAll();
    } else if (mode === modes.eraser) {
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.color = "white";
      canvas.freeDrawingBrush.width = eraserWidth;
      canvas.requestRenderAll();
    }
  });

  const setDrawingMode = () => {
    setMode(modes.drawing);
    if (canvas) canvas.isDrawingMode = true;
  };
  const setSelectMode = () => {
    setMode(modes.select);
    if (canvas) canvas.isDrawingMode = false;
  };
  const setEraserMode = () => {
    setMode(modes.eraser);
    if (canvas) canvas.isDrawingMode = true;
  };

  return (
    <div>
      <Header
        setEraserMode={setEraserMode}
        penColor={penColor}
        setPenColor={setpenColor}
        setDrawingMode={setDrawingMode}
        setPenWidth={setPenWidth}
        setSelectMode={setSelectMode}
        setEraserWidth={setEraserWidth}
      />
      <FabricCanvas onReady={onReady} />
    </div>
  );
}
export default Main;
