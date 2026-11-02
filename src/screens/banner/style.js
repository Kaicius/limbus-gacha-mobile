import styled from "styled-components/native";
import { colors, rarityColor } from "@/theme";

const Center = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Body = styled.View`
  flex: 1;
  flex-direction: row;
  gap: 16px;
  padding: 16px 20px;
`;

const Art = styled.View`
  flex: 1.5;
  background-color: #000;
  border-width: 1px;
  border-color: ${colors.line};
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ArtImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const NoArt = styled.Text`
  color: ${colors.lineStrong};
  font-size: 28px;
  font-weight: 900;
`;

const Side = styled.View`
  flex: 1;
  gap: 14px;
  padding: 16px;
  background-color: ${colors.panel};
  border-width: 1px;
  border-color: ${colors.line};
  border-top-width: 2px;
  border-top-color: ${colors.gold};
`;

const BannerName = styled.Text`
  color: ${colors.text};
  font-size: 22px;
  font-weight: 900;
  letter-spacing: 1px;
`;

const Section = styled.View`
  gap: 6px;
`;

const Label = styled.Text`
  color: ${colors.muted};
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.5px;
  text-transform: uppercase;
`;

const PityRow = styled.View`
  flex-direction: row;
  gap: 4px;
`;

const PityCell = styled.View`
  flex: 1;
  height: 10px;
  background-color: ${(p) => (p.$filled ? colors.red : "rgba(0,0,0,0.5)")};
  border-width: 1px;
  border-color: ${(p) => (p.$filled ? colors.red : colors.lineStrong)};
`;

const Hint = styled.Text`
  color: ${colors.cream};
  font-size: 13px;
`;

const HintStrong = styled.Text`
  color: ${colors.gold};
  font-weight: 900;
`;

const Rates = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
`;

const Rate = styled.Text`
  color: ${(p) => rarityColor[p.$r]};
  font-size: 13px;
  font-weight: 800;
`;

const Buttons = styled.View`
  margin-top: auto;
  flex-direction: row;
  gap: 10px;
`;

const PullButton = styled.TouchableOpacity`
  flex: 1;
  padding: 10px;
  align-items: center;
  border-width: 1.5px;
  border-color: ${(p) => (p.$main ? colors.gold : colors.lineStrong)};
  background-color: ${(p) => (p.$main ? "rgba(248,180,0,0.12)" : "rgba(0,0,0,0.4)")};
  opacity: ${(p) => (p.disabled ? 0.4 : 1)};
`;

const PullTitle = styled.Text`
  color: ${(p) => (p.$main ? colors.gold : colors.cream)};
  font-size: 16px;
  font-weight: 900;
  letter-spacing: 1.5px;
  text-transform: uppercase;
`;

const PullCost = styled.Text`
  color: ${(p) => (p.$main ? colors.hot : colors.muted)};
  font-size: 13px;
  font-weight: 700;
`;

const Back = styled.TouchableOpacity`
  padding: 6px 4px;
`;

const BackText = styled.Text`
  color: ${colors.cream};
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 1px;
`;

const Overlay = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.75);
`;

const Dialog = styled.View`
  width: 420px;
  max-width: 90%;
  gap: 10px;
  padding: 22px;
  background-color: ${colors.panel2};
  border-width: 1px;
  border-color: ${colors.lineStrong};
  border-top-width: 2px;
  border-top-color: ${colors.gold};
`;

const DialogTitle = styled.Text`
  color: ${colors.text};
  font-size: 20px;
  font-weight: 900;
  letter-spacing: 1px;
`;

const DialogText = styled.Text`
  color: ${colors.cream};
  font-size: 14px;
`;

const DialogButtons = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 8px;
`;

export {
  Art, ArtImage, Back, BackText, BannerName, Body, Buttons, Center, Dialog, DialogButtons,
  DialogText, DialogTitle, Hint, HintStrong, Label, NoArt, Overlay, PityCell, PityRow,
  PullButton, PullCost, PullTitle, Rate, Rates, Section, Side,
};
