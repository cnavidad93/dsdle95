import * as React from "react";

export default function Arrow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
      viewBox="0 0 16 16"
      {...props}
    >
      <path d="M2.38 7h12l-6 7-6-7z" />
      <path d="M10.37 8.11h-4v-6h4z" />
    </svg>
  );
}
