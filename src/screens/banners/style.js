import styled from "styled-components/native";
import { colors } from "@/theme";

const Center = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 20px;
`;

const Card = styled.TouchableOpacity`
  width: 380px;
  background-color: ${colors.panel};
  border-width: 1px;
  border-color: ${colors.line};
  border-top-width: 2px;
  border-top-color: ${colors.gold};
`;

const Thumb = styled.View`
  width: 100%;
  aspect-ratio: 1.78;
  background-color: #000;
  align-items: center;
  justify-content: center;
`;

const ThumbImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const NoThumb = styled.Text`
  color: ${colors.lineStrong};
  font-size: 22px;
  font-weight: 900;
  letter-spacing: 2px;
`;

const CardInfo = styled.View`
  padding: 10px 14px;
  gap: 2px;
`;

const CardName = styled.Text`
  color: ${colors.text};
  font-size: 18px;
  font-weight: 800;
`;

const CardSub = styled.Text`
  color: ${colors.muted};
  font-size: 12px;
`;

const Empty = styled.Text`
  color: ${colors.muted};
  font-size: 14px;
`;

const MenuButton = styled.TouchableOpacity`
  padding: 5px 12px;
  border-width: 1px;
  border-color: ${colors.cream};
  background-color: rgba(0, 0, 0, 0.4);
`;

const MenuText = styled.Text`
  color: ${colors.cream};
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

export { Card, CardInfo, CardName, CardSub, Center, Empty, MenuButton, MenuText, NoThumb, Thumb, ThumbImage };
