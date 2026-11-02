import styled from "styled-components/native";
import { colors } from "@/theme";

const Label = styled.Text`
  position: absolute;
  top: 14px;
  left: 20px;
  color: ${colors.gold};
  font-size: 16px;
  font-weight: 900;
  letter-spacing: 4px;
  text-shadow-color: rgba(0, 0, 0, 0.8);
  text-shadow-offset: 0px 1px;
  text-shadow-radius: 4px;
`;

export { Label };
