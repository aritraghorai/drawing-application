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
  // const [press, setPressed] = useState<boolean>(false);
  const [penColor, setpenColor] = useState<string>("yellow");
  const [mode, setMode] = useState<modes>(modes.none);
  // const [image, setImage] = useState<string>(
  //   "https://cdn.pixabay.com/photo/2016/11/18/23/41/sun-1837376_960_720.png"
  // );
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
      // const mouseEvnent = e.e;
      // const delta = new fabric.Point(
      //   mouseEvnent.movementX,
      //   mouseEvnent.movementY
      // );
      // canvas.relativePan(delta);
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
  // canvas?.on("mouse:down", (e) => {
  //   if (mode == modes.select) {
  //     canvas.setCursor("grab");
  //     canvas.renderAll();
  //   }
  //   setPressed(true);
  // });
  // canvas?.on("mouse:up", (e) => {
  //   setPressed(false);
  //   canvas.off("mouse:move");
  //   canvas.setCursor("default");
  //   canvas.renderAll();
  // });
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
        setEraserWidth={setEraserWidth}
      />
      <button
        onClick={() => {
          setMode(mode === modes.select ? modes.none : modes.select);
        }}
      >
        SELECT MODE
      </button>
      <FabricCanvas onReady={onReady} />
    </div>
  );
}
export default Main;
