import styled from "styled-components/native";
import { colors } from "@/theme";

const Center = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const Card = styled.View`
  width: 100%;
  max-width: 440px;
  gap: 14px;
  padding: 28px;
  background-color: ${colors.panel};
  border-width: 1px;
  border-color: ${colors.line};
  border-top-width: 2px;
  border-top-color: ${colors.gold};
`;

const Subtitle = styled.Text`
  color: ${colors.muted};
  font-size: 13px;
`;

const Input = styled.TextInput`
  padding: 12px 14px;
  color: ${colors.text};
  font-size: 16px;
  background-color: rgba(0, 0, 0, 0.5);
  border-width: 1px;
  border-color: ${colors.lineStrong};
`;

export { Card, Center, Input, Subtitle };
