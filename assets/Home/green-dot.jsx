import * as React from "react";
import Svg, { Rect, Circle } from "react-native-svg";
const GreenDotSVG = (props) => (
  <Svg
    width={16}
    height={17}
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect
      y={0.5}
      width={16}
      height={16}
      rx={8}
      fill="#D0FFE9"
      fillOpacity={0.1}
    />
    <Circle cx={8} cy={8.5} r={3} fill="#41B564" />
  </Svg>
);
export default GreenDotSVG;
