import React from "react";

export default function Restore(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 16 16"
      {...props}
    >
      <path d="M3 5v9h9V5H3zm8 8H4V6h7v7z" />
      <path
        fillRule="evenodd"
        d="M5 5h1V4h7v7h-1v1h2V3H5v2z"
        clipRule="evenodd"
      />
    </svg>
  );
}
