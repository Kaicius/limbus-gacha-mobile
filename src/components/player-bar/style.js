import styled from "styled-components/native";
import { colors } from "@/theme";

const Bar = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.line};
  background-color: rgba(0, 0, 0, 0.4);
`;

const Left = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const Right = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

const Name = styled.Text`
  color: ${colors.muted};
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 1px;
`;

const Lunacy = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  padding: 4px 4px 4px 12px;
  border-width: 1px;
  border-color: ${colors.lineStrong};
  background-color: rgba(0, 0, 0, 0.5);
`;

const LunacyIcon = styled.Text`
  color: ${colors.hot};
  font-size: 14px;
`;

const LunacyValue = styled.Text`
  color: ${colors.text};
  font-size: 16px;
  font-weight: 800;
  min-width: 60px;
`;

const AddButton = styled.TouchableOpacity`
  width: 28px;
  height: 28px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.gold};
`;

const AddText = styled.Text`
  color: ${colors.bg};
  font-size: 20px;
  font-weight: 900;
  line-height: 22px;
`;

export { AddButton, AddText, Bar, Left, Lunacy, LunacyIcon, LunacyValue, Name, Right };
