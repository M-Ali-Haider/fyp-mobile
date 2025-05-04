import Svg, { Path } from "react-native-svg";
const ChevronLeftIcon = ({ className, color }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke={color}
    className={className}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5 8.25 12l7.5-7.5"
    />
  </Svg>
);
export default ChevronLeftIcon;
