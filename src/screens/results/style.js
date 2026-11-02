import styled from "styled-components/native";
import { colors, rarityColor } from "@/theme";

const Heading = styled.Text`
  color: ${colors.text};
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const Grid = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  row-gap: 10px;
  column-gap: 8px;
  padding: 12px 20px;
`;

const Card = styled.View`
  background-color: ${colors.panel};
  border-width: 1.5px;
  border-color: ${(p) => rarityColor[p.$r]};
`;

const Art = styled.View`
  width: 100%;
  aspect-ratio: 1.3;
  background-color: #000;
`;

const ArtImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const NewTag = styled.View`
  position: absolute;
  top: 4px;
  left: 4px;
  padding: 1px 6px;
  background-color: ${colors.gold};
`;

const NewText = styled.Text`
  color: ${colors.bg};
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 1px;
`;

const Info = styled.View`
  padding: 4px 6px 6px;
`;

const Rarity = styled.Text`
  color: ${(p) => rarityColor[p.$r]};
  font-size: 14px;
  font-weight: 900;
  letter-spacing: 1px;
`;

const Sinner = styled.Text`
  color: ${colors.text};
  font-size: 12px;
  font-weight: 800;
`;

const Name = styled.Text`
  color: ${colors.muted};
  font-size: 10px;
`;

const Footer = styled.View`
  align-items: center;
  padding: 0 20px 14px;
`;

export { Art, ArtImage, Card, Footer, Grid, Heading, Info, Name, NewTag, NewText, Rarity, Sinner };
