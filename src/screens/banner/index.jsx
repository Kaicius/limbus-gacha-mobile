import { useEffect, useState } from "react";
import { ActivityIndicator, Modal } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { extract, getBanner, getPity, getPlayer } from "@services/api";
import { usePlayer } from "@context/PlayerContext";
import PlayerBar from "@components/player-bar";
import { Button, ButtonText, ErrorText, Screen } from "@components/ui";
import { COST_PER_PULL, colors } from "@/theme";
import LunacyIcon from "@components/lunacy-icon";
import * as S from "./style";

const PITY_LIMIT = 10;

const Banner = () => {
  const navigation = useNavigation();
  const { bannerId } = useRoute().params;
  const { player, setPlayer } = usePlayer();

  const [banner, setBanner] = useState(null);
  const [pity, setPity] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [confirmAmount, setConfirmAmount] = useState(null);
  const [pulling, setPulling] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const [b, p] = await Promise.all([getBanner(bannerId), getPity(player.id, bannerId)]);
        setBanner(b);
        setPity(p.pity);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [bannerId, player.id]);

  async function handleConfirm() {
    const amount = confirmAmount;
    setPulling(true);
    setError("");
    try {
      const result = await extract(player.id, bannerId, amount);
      setPity(result.pity);
      setPlayer({ ...player, currency: result.currency });
      setConfirmAmount(null);

      navigation.navigate("Extraction", { results: result.results });

      getPlayer(player.id).then(setPlayer).catch(() => {});
    } catch (e) {
      setError(e.message);
      setConfirmAmount(null);
    } finally {
      setPulling(false);
    }
  }

  if (loading) {
    return (
      <Screen>
        <S.Center><ActivityIndicator size="large" color={colors.gold} /></S.Center>
      </Screen>
    );
  }

  if (!banner) {
    return (
      <Screen>
        <PlayerBar left={<BackButton onPress={() => navigation.goBack()} />} />
        <S.Center><ErrorText>{error || "Banner não encontrado"}</ErrorText></S.Center>
      </Screen>
    );
  }

  const cost = confirmAmount ? confirmAmount * COST_PER_PULL : 0;
  const canAfford = (amount) => player.currency >= amount * COST_PER_PULL;

  return (
    <Screen>
      <PlayerBar left={<BackButton onPress={() => navigation.goBack()} />} />

      <S.Body>
        <S.Art>
          {banner.thumbnailUrl
            ? <S.ArtImage source={{ uri: banner.thumbnailUrl }} resizeMode="cover" />
            : <S.NoArt>{banner.name}</S.NoArt>}
        </S.Art>

        <S.Side>
          <S.BannerName numberOfLines={2}>{banner.name}</S.BannerName>

          <S.Section>
            <S.Label>Garantia 00 ou superior</S.Label>
            <S.PityRow>
              {Array.from({ length: PITY_LIMIT }).map((_, i) => (
                <S.PityCell key={i} $filled={i < pity} />
              ))}
            </S.PityRow>
            <S.Hint>
              Faltam <S.HintStrong>{PITY_LIMIT - pity}</S.HintStrong> giros pro garantido
            </S.Hint>
          </S.Section>

          <S.Section>
            <S.Label>Taxas</S.Label>
            <S.Rates>
              <S.Rate $r="EGO">EGO 1,3%</S.Rate>
              <S.Rate $r="TRIPLE">000 2,9%</S.Rate>
              <S.Rate $r="DOUBLE">00 12,8%</S.Rate>
              <S.Rate $r="ZERO">0 83%</S.Rate>
            </S.Rates>
          </S.Section>

          {error ? <ErrorText>{error}</ErrorText> : null}

          <S.Buttons>
            <S.PullButton onPress={() => setConfirmAmount(1)} disabled={!canAfford(1)}>
              <S.PullTitle>1x</S.PullTitle>
              <S.PullCost><LunacyIcon size={14} /> {COST_PER_PULL}</S.PullCost>
            </S.PullButton>
            <S.PullButton $main onPress={() => setConfirmAmount(10)} disabled={!canAfford(10)}>
              <S.PullTitle $main>10x</S.PullTitle>
              <S.PullCost $main><LunacyIcon size={14} /> {COST_PER_PULL * 10}</S.PullCost>
            </S.PullButton>
          </S.Buttons>
        </S.Side>
      </S.Body>

      <Modal
        visible={confirmAmount !== null}
        transparent
        animationType="fade"
        supportedOrientations={["landscape"]}
        onRequestClose={() => !pulling && setConfirmAmount(null)}
      >
        <S.Overlay>
          <S.Dialog>
            <S.DialogTitle>Confirmar extração</S.DialogTitle>
            <S.DialogText>
              Gastar <S.HintStrong><LunacyIcon size={14} /> {cost}</S.HintStrong> Lunacy em {confirmAmount}x extração
              {confirmAmount > 1 ? "s" : ""}?
            </S.DialogText>
            <S.DialogText>
              Saldo depois: <LunacyIcon size={14} /> {player.currency - cost}
            </S.DialogText>

            <S.DialogButtons>
              <Button $variant="ghost" onPress={() => setConfirmAmount(null)} disabled={pulling}>
                <ButtonText $variant="ghost">Cancelar</ButtonText>
              </Button>
              <Button onPress={handleConfirm} disabled={pulling}>
                {pulling
                  ? <ActivityIndicator color={colors.gold} />
                  : <ButtonText>Confirmar</ButtonText>}
              </Button>
            </S.DialogButtons>
          </S.Dialog>
        </S.Overlay>
      </Modal>
    </Screen>
  );
};

const BackButton = ({ onPress }) => (
  <S.Back onPress={onPress}>
    <S.BackText>‹ Banners</S.BackText>
  </S.Back>
);

export default Banner;
