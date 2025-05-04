import Svg, { Path } from "react-native-svg";
import { useColorScheme } from "../../hooks/useColorScheme";
const UsernameSVG = (props) => {
  const { colorScheme } = useColorScheme();
  return (
    <Svg
      width={19}
      height={19}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M19 21.5V19.5C19 18.4391 18.5786 17.4217 17.8284 16.6716C17.0783 15.9214 16.0609 15.5 15 15.5H9C7.93913 15.5 6.92172 15.9214 6.17157 16.6716C5.42143 17.4217 5 18.4391 5 19.5V21.5"
        stroke={colorScheme === "dark" ? "#757575" : "#A2A2A2"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 11.5C14.2091 11.5 16 9.70914 16 7.5C16 5.29086 14.2091 3.5 12 3.5C9.79086 3.5 8 5.29086 8 7.5C8 9.70914 9.79086 11.5 12 11.5Z"
        stroke={colorScheme === "dark" ? "#757575" : "#A2A2A2"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
export default UsernameSVG;
