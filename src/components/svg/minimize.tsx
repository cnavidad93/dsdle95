import React from "react";

export default function Minimize(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 16 16"
      {...props}
    >
      <path d="M14 8v1H3V8h11z" />
    </svg>
  );
}
