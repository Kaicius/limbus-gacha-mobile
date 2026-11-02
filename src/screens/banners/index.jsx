import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getBanners } from "@services/api";
import PlayerBar from "@components/player-bar";
import { Button, ButtonText, ErrorText, Gold, Screen, Title } from "@components/ui";
import { colors } from "@/theme";
import * as S from "./style";

const Banners = () => {
  const navigation = useNavigation();

  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setBanners(await getBanners());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <Screen>
      <PlayerBar
        left={
          <>
            <Title style={{ fontSize: 22 }}>LIMBUS <Gold>EXTRACTION</Gold></Title>
            <S.MenuButton onPress={() => navigation.navigate("Inventory")}>
              <S.MenuText>Identities / E.G.O.</S.MenuText>
            </S.MenuButton>
          </>
        }
      />

      {loading ? (
        <S.Center><ActivityIndicator size="large" color={colors.gold} /></S.Center>
      ) : error ? (
        <S.Center>
          <ErrorText>{error}</ErrorText>
          <Button $variant="ghost" onPress={load}><ButtonText $variant="ghost">Tentar de novo</ButtonText></Button>
        </S.Center>
      ) : (
        <FlatList
          data={banners}
          keyExtractor={(b) => String(b.id)}
          horizontal
          contentContainerStyle={{ padding: 20, gap: 20 }}
          ListEmptyComponent={<S.Empty>Nenhum banner ativo. Crie um pelo painel admin.</S.Empty>}
          renderItem={({ item }) => (
            <S.Card onPress={() => navigation.navigate("Banner", { bannerId: item.id })}>
              <S.Thumb>
                {item.thumbnailUrl
                  ? <S.ThumbImage source={{ uri: item.thumbnailUrl }} resizeMode="cover" />
                  : <S.NoThumb>{item.name}</S.NoThumb>}
              </S.Thumb>
              <S.CardInfo>
                <S.CardName numberOfLines={1}>{item.name}</S.CardName>
                <S.CardSub>
                  {item.identities.length} identities · {item.egos.length} E.G.O.
                </S.CardSub>
              </S.CardInfo>
            </S.Card>
          )}
        />
      )}
    </Screen>
  );
};

export default Banners;
