import React, { useState } from "react";
import { fabric } from "fabric";
import { useRef } from "react";
import { useEffect } from "react";

type props = {
  onReady: (re: fabric.Canvas) => void;
  image?: string;
};

export default function FabricCanvas({ onReady, image }: props) {
  const canvasEl = useRef(null);
  const canvasElParent = useRef<HTMLDivElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  useEffect(() => {
    const canvas = new fabric.Canvas(canvasEl.current, {
      height: 300,
      width: 300,
      selection: false,
    });
    if (image) {
      canvas.setBackgroundImage(image, () => {
        console.log("set");
      });
    }
    const setCurrentDimensions = () => {
      canvas.setHeight(canvasElParent.current?.clientHeight || 0);
      canvas.setWidth(canvasElParent.current?.clientWidth || 0);
      canvas.renderAll();
    };
    setCanvas(canvas);
    const resizeCanvas = () => {
      setCurrentDimensions();
    };
    setCurrentDimensions();

    window.addEventListener("resize", resizeCanvas, false);

    if (onReady) {
      onReady(canvas);
    }

    return () => {
      canvas.dispose();
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);
  return (
    <div ref={canvasElParent} className="hi" style={canvasStyle}>
      <canvas ref={canvasEl} />
    </div>
  );
}

const canvasStyle = {
  border: "1px solid red",
};
