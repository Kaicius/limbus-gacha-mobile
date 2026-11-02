import styled from "styled-components/native";
import { colors, rarityColor } from "@/theme";

const Back = styled.TouchableOpacity`
  padding: 6px 4px;
`;

const BackText = styled.Text`
  color: ${colors.cream};
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 1px;
`;

const Tabs = styled.View`
  flex-direction: row;
  gap: 8px;
  padding: 10px 12px 0;
`;

const Tab = styled.TouchableOpacity`
  padding: 6px 16px;
  border-width: 1px;
  border-color: ${(p) => (p.$active ? colors.gold : colors.lineStrong)};
  background-color: ${(p) => (p.$active ? colors.gold : "rgba(0,0,0,0.35)")};
`;

const TabText = styled.Text`
  color: ${(p) => (p.$active ? colors.bg : colors.muted)};
  font-size: 13px;
  font-weight: 900;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const Empty = styled.Text`
  color: ${colors.muted};
  padding: 20px;
`;

const Card = styled.TouchableOpacity`
  flex: 1;
  max-width: 16%;
  background-color: ${colors.panel};
  border-width: 1.5px;
  border-color: ${(p) => rarityColor[p.$r]};
`;

const CardArt = styled.View`
  width: 100%;
  aspect-ratio: 1.3;
  background-color: #000;
`;

const EgoArt = styled.View`
  width: 100%;
  aspect-ratio: 1.3;
  background-color: #000;
  padding: 4px;
`;

const Img = styled.Image`
  width: 100%;
  height: 100%;
`;

const UptieBadge = styled.View`
  position: absolute;
  top: 3px;
  right: 3px;
  padding: 0 5px;
  background-color: ${colors.gold};
`;

const UptieBadgeText = styled.Text`
  color: ${colors.bg};
  font-size: 10px;
  font-weight: 900;
`;

const CardInfo = styled.View`
  padding: 3px 5px 5px;
`;

const CardRarity = styled.Text`
  color: ${(p) => rarityColor[p.$r]};
  font-size: 12px;
  font-weight: 900;
`;

const CardSinner = styled.Text`
  color: ${colors.text};
  font-size: 11px;
  font-weight: 800;
`;

const CardName = styled.Text`
  color: ${colors.muted};
  font-size: 9px;
`;

const Overlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 16px;
`;

const Detail = styled.View`
  flex-direction: row;
  width: 100%;
  max-width: 760px;
  max-height: 100%;
  background-color: ${colors.panel2};
  border-width: 1px;
  border-color: ${colors.lineStrong};
  border-top-width: 2px;
  border-top-color: ${colors.gold};
`;

const DetailArt = styled.View`
  flex: 1.4;
  aspect-ratio: 1.6;
  background-color: #000;
`;

const DetailInfo = styled.View`
  flex: 1;
  padding: 14px;
  gap: 6px;
`;

const DetailRarity = styled.Text`
  font-size: 20px;
  font-weight: 900;
`;

const DetailSinner = styled.Text`
  color: ${colors.text};
  font-size: 20px;
  font-weight: 900;
`;

const DetailName = styled.Text`
  color: ${colors.cream};
  font-size: 13px;
`;

const UptieRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  margin: 4px 0;
`;

const UptieStep = styled.Text`
  color: ${(p) => (p.$on ? colors.bg : colors.muted)};
  background-color: ${(p) => (p.$on ? colors.gold : "transparent")};
  border-width: 1px;
  border-color: ${(p) => (p.$on ? colors.gold : colors.lineStrong)};
  font-size: 12px;
  font-weight: 900;
  padding: 1px 8px;
`;

const UptieLine = styled.View`
  width: 30px;
  height: 2px;
  background-color: ${(p) => (p.$on ? colors.gold : colors.lineStrong)};
`;

const Quote = styled.Text`
  color: ${colors.muted};
  font-size: 12px;
  font-style: italic;
`;

const DetailButtons = styled.View`
  flex-direction: row;
  gap: 8px;
  margin-top: auto;
`;

export {
  Back, BackText, Card, CardArt, CardInfo, CardName, CardRarity, CardSinner, Detail, DetailArt,
  DetailButtons, DetailInfo, DetailName, DetailRarity, DetailSinner, EgoArt, Empty, Img, Overlay,
  Quote, Tab, TabText, Tabs, UptieBadge, UptieBadgeText, UptieLine, UptieRow, UptieStep,
};
