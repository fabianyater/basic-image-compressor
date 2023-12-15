import * as React from "react";
const SVGComponent = (props) => (
  <svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 32 32"
    xmlSpace="preserve"
    {...props}
  >
    <line
      style={{
        fill: "none",
        stroke: "#fff",
        strokeWidth: 2,
        strokeMiterlimit: 10,
      }}
      x1={3}
      y1={29}
      x2={13.926}
      y2={18.074}
    />
    <polyline
      style={{
        fill: "none",
        stroke: "#fff",
        strokeWidth: 2,
        strokeMiterlimit: 10,
      }}
      points="29,14 18,14 18,3 "
    />
    <polyline
      style={{
        fill: "none",
        stroke: "#fff",
        strokeWidth: 2,
        strokeMiterlimit: 10,
      }}
      points="3,18 14,18 14,29 "
    />
    <line
      style={{
        fill: "none",
        stroke: "#fff",
        strokeWidth: 2,
        strokeMiterlimit: 10,
      }}
      x1={18.085}
      y1={13.915}
      x2={29}
      y2={3}
    />
  </svg>
);
export default SVGComponent;
