// Create with https://react-svgr.com/playground/?native=true

import Svg, { Path } from "react-native-svg";


export default SvgCar = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    viewBox="0 0 512 512"
    {...props}
  >
    <Path d="M42.022 429.484c0 12.953 10.5 23.469 23.484 23.469h32.188c12.984 0 23.484-10.516 23.484-23.469v-33.578H42.022v33.578zM390.85 429.484c0 12.953 10.5 23.469 23.469 23.469h32.188c12.984 0 23.484-10.516 23.484-23.469v-33.578H390.85v33.578zM510.257 261.563c-.688-19.891-13.828-37.172-32.797-43.172l-21.734-12.094-31-112.734c-5.625-20.391-24.156-34.516-45.281-34.516H132.585c-21.156 0-39.688 14.125-45.297 34.516l-31 112.734-21.734 12.094c-18.969 6-32.109 23.281-32.797 43.172l-1.75 87.531a31.483 31.483 0 0 0 8.891 22.641 31.321 31.321 0 0 0 22.422 9.438h449.39a31.285 31.285 0 0 0 22.406-9.438c5.875-6.047 9.094-14.203 8.875-22.641l-1.734-87.531zm-414.86-72.532 23.828-86.688c1.672-5.984 7.141-10.172 13.359-10.172h246.859c6.203 0 11.688 4.188 13.328 10.172l23.828 86.688a7.855 7.855 0 0 1-1.313 6.828 7.837 7.837 0 0 1-6.219 3.078H102.959a7.822 7.822 0 0 1-6.234-3.078 7.812 7.812 0 0 1-1.328-6.828zM74.694 342.516c-21.344 0-38.656-17.297-38.656-38.656 0-21.344 17.313-38.656 38.656-38.656s38.656 17.313 38.656 38.656c0 21.359-17.312 38.656-38.656 38.656zm240.203-3.688H197.116v-38.641h117.781v38.641zm122.422 3.688c-21.344 0-38.672-17.297-38.672-38.656 0-21.344 17.328-38.656 38.672-38.656 21.359 0 38.656 17.313 38.656 38.656.001 21.359-17.296 38.656-38.656 38.656z" />
  </Svg>
);