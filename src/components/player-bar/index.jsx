import { useState } from "react";
import { ActivityIndicator } from "react-native";
import { addCurrency } from "@services/api";
import { usePlayer } from "@context/PlayerContext";
import { colors } from "@/theme";
import * as S from "./style";

const PlayerBar = ({ left }) => {
  const { player, setPlayer } = usePlayer();
  const [loading, setLoading] = useState(false);

  async function handleAddCurrency() {
    setLoading(true);
    try {
      const updated = await addCurrency(player.id);
      setPlayer(updated);
    } catch {
    } finally {
      setLoading(false);
    }
  }

  if (!player) return null;

  return (
    <S.Bar>
      <S.Left>{left}</S.Left>

      <S.Right>
        <S.Name>{player.username}</S.Name>
        <S.Lunacy>
          <S.LunacyIcon>◆</S.LunacyIcon>
          <S.LunacyValue>{player.currency.toLocaleString("pt-BR")}</S.LunacyValue>
          <S.AddButton onPress={handleAddCurrency} disabled={loading}>
            {loading
              ? <ActivityIndicator size="small" color={colors.gold} />
              : <S.AddText>+</S.AddText>}
          </S.AddButton>
        </S.Lunacy>
      </S.Right>
    </S.Bar>
  );
};

export default PlayerBar;
