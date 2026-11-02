import { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getPlayer, uptie } from "@services/api";
import { usePlayer } from "@context/PlayerContext";
import PlayerBar from "@components/player-bar";
import UptieCutscene from "@components/uptie-cutscene";
import { Button, ButtonText, ErrorText, Screen } from "@components/ui";
import { colors, rarityColor, rarityLabel } from "@/theme";
import * as S from "./style";

const RARITY_ORDER = { TRIPLE: 0, DOUBLE: 1, ZERO: 2 };

const Inventory = () => {
  const navigation = useNavigation();
  const { player, setPlayer } = usePlayer();

  const [tab, setTab] = useState("identities");
  const [selectedId, setSelectedId] = useState(null);
  const [upgrading, setUpgrading] = useState(false);
  const [cutsceneUrl, setCutsceneUrl] = useState(null);
  const [error, setError] = useState("");

  useFocusEffect(
    useCallback(() => {
      getPlayer(player.id).then(setPlayer).catch(() => {});
    }, [player.id, setPlayer]),
  );

  const uptied = useMemo(() => new Set(player.uptiedIdentityIds ?? []), [player.uptiedIdentityIds]);

  const identities = useMemo(
    () => [...player.identities].sort(
      (a, b) => RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity] || a.sinnerName.localeCompare(b.sinnerName),
    ),
    [player.identities],
  );

  const selected = identities.find((i) => i.id === selectedId) ?? null;

  const artOf = (identity) =>
    uptied.has(identity.id) && identity.uptie3ArtUrl ? identity.uptie3ArtUrl : identity.uptie1ArtUrl;

  async function handleUptie() {
    setUpgrading(true);
    setError("");
    try {
      const updated = await uptie(player.id, selected.id);
      setPlayer(updated);
      if (selected.uptieCutscene) setCutsceneUrl(selected.uptieCutscene);
    } catch (e) {
      setError(e.message);
    } finally {
      setUpgrading(false);
    }
  }

  const back = (
    <S.Back onPress={() => navigation.goBack()}>
      <S.BackText>‹ Voltar</S.BackText>
    </S.Back>
  );

  return (
    <Screen>
      <PlayerBar left={back} />

      <S.Tabs>
        <S.Tab $active={tab === "identities"} onPress={() => setTab("identities")}>
          <S.TabText $active={tab === "identities"}>Identities ({player.identities.length})</S.TabText>
        </S.Tab>
        <S.Tab $active={tab === "egos"} onPress={() => setTab("egos")}>
          <S.TabText $active={tab === "egos"}>E.G.O. ({player.egos.length})</S.TabText>
        </S.Tab>
      </S.Tabs>

      {tab === "identities" ? (
        <FlatList
          key="identities"
          data={identities}
          keyExtractor={(i) => String(i.id)}
          numColumns={6}
          contentContainerStyle={{ padding: 12, gap: 10 }}
          columnWrapperStyle={{ gap: 10 }}
          ListEmptyComponent={<S.Empty>Nenhuma identity ainda. Vá girar!</S.Empty>}
          renderItem={({ item }) => (
            <S.Card $r={item.rarity} onPress={() => { setSelectedId(item.id); setError(""); }}>
              <S.CardArt>
                {artOf(item) ? <S.Img source={{ uri: artOf(item) }} resizeMode="cover" /> : null}
                {uptied.has(item.id) ? <S.UptieBadge><S.UptieBadgeText>III</S.UptieBadgeText></S.UptieBadge> : null}
              </S.CardArt>
              <S.CardInfo>
                <S.CardRarity $r={item.rarity}>{rarityLabel[item.rarity]}</S.CardRarity>
                <S.CardSinner numberOfLines={1}>{item.sinnerName}</S.CardSinner>
                <S.CardName numberOfLines={1}>{item.name}</S.CardName>
              </S.CardInfo>
            </S.Card>
          )}
        />
      ) : (
        <FlatList
          key="egos"
          data={player.egos}
          keyExtractor={(e) => String(e.id)}
          numColumns={6}
          contentContainerStyle={{ padding: 12, gap: 10 }}
          columnWrapperStyle={{ gap: 10 }}
          ListEmptyComponent={<S.Empty>Nenhum E.G.O. ainda.</S.Empty>}
          renderItem={({ item }) => (
            <S.Card $r="EGO" disabled>
              <S.EgoArt>
                {item.artUrl ? <S.Img source={{ uri: item.artUrl }} resizeMode="contain" /> : null}
              </S.EgoArt>
              <S.CardInfo>
                <S.CardRarity $r="EGO">E.G.O.</S.CardRarity>
                <S.CardSinner numberOfLines={1}>{item.sinnerName}</S.CardSinner>
                <S.CardName numberOfLines={1}>{item.name}</S.CardName>
              </S.CardInfo>
            </S.Card>
          )}
        />
      )}

      {selected ? (
        <S.Overlay>
          <S.Detail>
            <S.DetailArt>
              {artOf(selected) ? <S.Img source={{ uri: artOf(selected) }} resizeMode="contain" /> : null}
            </S.DetailArt>

            <S.DetailInfo>
              <S.DetailRarity style={{ color: rarityColor[selected.rarity] }}>
                {rarityLabel[selected.rarity]}
              </S.DetailRarity>
              <S.DetailSinner>{selected.sinnerName}</S.DetailSinner>
              <S.DetailName>{selected.name}</S.DetailName>

              <S.UptieRow>
                <S.UptieStep $on>I</S.UptieStep>
                <S.UptieLine $on={uptied.has(selected.id)} />
                <S.UptieStep $on={uptied.has(selected.id)}>III</S.UptieStep>
              </S.UptieRow>

              {selected.quote ? <S.Quote>"{selected.quote}"</S.Quote> : null}

              {error ? <ErrorText>{error}</ErrorText> : null}

              <S.DetailButtons>
                <Button $variant="ghost" onPress={() => setSelectedId(null)} disabled={upgrading}>
                  <ButtonText $variant="ghost">Fechar</ButtonText>
                </Button>
                {!uptied.has(selected.id) ? (
                  <Button onPress={handleUptie} disabled={upgrading}>
                    {upgrading
                      ? <ActivityIndicator color={colors.gold} />
                      : <ButtonText>Uptie III</ButtonText>}
                  </Button>
                ) : null}
              </S.DetailButtons>
            </S.DetailInfo>
          </S.Detail>
        </S.Overlay>
      ) : null}

      {cutsceneUrl ? <UptieCutscene url={cutsceneUrl} onDone={() => setCutsceneUrl(null)} /> : null}
    </Screen>
  );
};

export default Inventory;
