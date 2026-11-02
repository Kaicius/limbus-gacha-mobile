import styled from "styled-components/native";
import { colors } from "@/theme";

const Stage = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
  overflow: hidden;
`;

const Quote = styled.Text`
  color: #ffffff;
  font-size: 15px;
  text-align: center;
  text-shadow-color: rgba(0, 0, 0, 0.9);
  text-shadow-offset: 0px 1px;
  text-shadow-radius: 4px;
`;

const IdentityTag = styled.View`
  margin-left: 18px;
  margin-bottom: -2px;
  padding: 3px 10px;
  max-width: 260px;
  background-color: rgba(10, 8, 20, 0.85);
  border-width: 1px;
  border-color: #4a3fae;
  transform: skewX(-12deg);
`;

const IdentityName = styled.Text`
  color: ${colors.cream};
  font-size: 12px;
  font-weight: 700;
`;

const PlateRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const Plate = styled.View`
  padding: 6px 26px;
  overflow: hidden;
  border-width: 2px;
  border-color: #b9b4ff;
  transform: skewX(-12deg);
`;

const SinnerName = styled.Text`
  color: #ffffff;
  font-size: 30px;
  font-weight: 900;
  letter-spacing: 1px;
  text-shadow-color: rgba(0, 0, 0, 0.7);
  text-shadow-offset: 0px 2px;
  text-shadow-radius: 3px;
`;

const RarityTag = styled.Text`
  font-size: 30px;
  font-weight: 900;
  text-shadow-offset: 0px 0px;
  text-shadow-radius: 10px;
`;

const Continue = styled.Text`
  position: absolute;
  top: 14px;
  left: 0;
  right: 0;
  text-align: center;
  color: rgba(241, 227, 204, 0.6);
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

export { Continue, IdentityName, IdentityTag, Plate, PlateRow, Quote, RarityTag, SinnerName, Stage };
