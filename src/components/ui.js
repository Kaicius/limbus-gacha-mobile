import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/theme";

const Screen = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.bg};
`;

const Title = styled.Text`
  color: ${colors.text};
  font-size: 34px;
  font-weight: 900;
  letter-spacing: 3px;
`;

const Gold = styled.Text`
  color: ${colors.gold};
`;

const Button = styled.TouchableOpacity`
  padding: 12px 22px;
  border-width: 1.5px;
  border-color: ${(p) => (p.$variant === "ghost" ? colors.lineStrong : colors.gold)};
  background-color: ${(p) => (p.$variant === "ghost" ? "rgba(0,0,0,0.35)" : "rgba(248,180,0,0.08)")};
  align-items: center;
  justify-content: center;
  opacity: ${(p) => (p.disabled ? 0.45 : 1)};
`;

const ButtonText = styled.Text`
  color: ${(p) => (p.$variant === "ghost" ? colors.muted : colors.gold)};
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const ErrorText = styled.Text`
  color: #f3b3aa;
  font-size: 13px;
  text-align: center;
`;

export { Button, ButtonText, ErrorText, Gold, Screen, Title };
