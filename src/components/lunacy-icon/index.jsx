import { Image } from "react-native";

const source = require("../../../assets/lunacy.png");

const LunacyIcon = ({ size = 16 }) => (
  <Image source={source} style={{ width: size, height: size }} resizeMode="contain" />
);

export default LunacyIcon;
