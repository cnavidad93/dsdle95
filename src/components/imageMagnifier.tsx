"use client";
import { cn } from "@/lib";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

const magnifierHeight = 100;
const magnifieWidth = 100;
const zoomLevel = 1.5;

export default function ImageMagnifier({
  height,
  width,
  src,
  alt,
  ...props
}: ImageProps) {
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        height: height,
        width: width,
      }}
    >
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        {...props}
        onMouseEnter={(e) => {
          const elem = e.currentTarget;
          const { width, height } = elem.getBoundingClientRect();
          setSize([width, height]);
          setShowMagnifier(true);
        }}
        onMouseMove={(e) => {
          const elem = e.currentTarget;
          const { top, left } = elem.getBoundingClientRect();
          const x = e.pageX - left - window.scrollX;
          const y = e.pageY - top - window.scrollY;
          setXY([x, y]);
        }}
        onMouseLeave={() => {
          setShowMagnifier(false);
        }}
      />

      <div
        className={cn(
          "pointer-events-none absolute border-2 border-gray-500 bg-transparent bg-no-repeat",
          showMagnifier ? "block" : "hidden",
        )}
        style={{
          height: `${magnifierHeight}px`,
          width: `${magnifieWidth}px`,
          top: `${y - magnifierHeight / 2}px`,
          left: `${x - magnifieWidth / 2}px`,
          backgroundImage: `url('${src}')`,
          backgroundSize: `${imgWidth * zoomLevel}px ${
            imgHeight * zoomLevel
          }px`,
          backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
        }}
      ></div>
    </div>
  );
}
