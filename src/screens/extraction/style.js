import styled from "styled-components/native";
import { colors } from "@/theme";

const Screen = styled.View`
  flex: 1;
  background-color: #000;
`;

const Hint = styled.Text`
  position: absolute;
  bottom: 12px;
  left: 0;
  right: 0;
  text-align: center;
  color: rgba(241, 227, 204, 0.45);
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const Skip = styled.TouchableOpacity`
  position: absolute;
  top: 14px;
  right: 18px;
  padding: 6px 14px;
  border-width: 1px;
  border-color: ${colors.cream};
  background-color: rgba(0, 0, 0, 0.55);
`;

const SkipText = styled.Text`
  color: ${colors.cream};
  font-size: 13px;
  font-weight: 900;
  letter-spacing: 2px;
`;

export { Hint, Screen, Skip, SkipText };
