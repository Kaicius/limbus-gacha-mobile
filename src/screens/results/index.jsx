import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import PlayerBar from "@components/player-bar";
import { Button, ButtonText, Screen } from "@components/ui";
import { rarityLabel } from "@/theme";
import * as S from "./style";

const Results = () => {
  const navigation = useNavigation();
  const { results } = useRoute().params;

  return (
    <Screen>
      <PlayerBar left={<S.Heading>Resultado da extração</S.Heading>} />

      <S.Grid>
        {results.map((r, index) => (
          <ResultCard key={r.position} result={r} index={index} single={results.length === 1} />
        ))}
      </S.Grid>

      <S.Footer>
        <Button onPress={() => navigation.goBack()}>
          <ButtonText>Voltar ao banner</ButtonText>
        </Button>
      </S.Footer>
    </Screen>
  );
};

const ResultCard = ({ result, index, single }) => {
  const appear = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(appear, {
      toValue: 1,
      duration: 260,
      delay: index * 90,
      useNativeDriver: true,
    }).start();
  }, [appear, index]);

  const item = result.identity ?? result.ego;
  const art = result.identity?.uptie1ArtUrl ?? result.ego?.artUrl;

  return (
    <Animated.View
      style={{
        width: single ? "30%" : "18.5%",
        opacity: appear,
        transform: [{ translateY: appear.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) }],
      }}
    >
      <S.Card $r={result.rarity}>
        <S.Art>
          {art ? <S.ArtImage source={{ uri: art }} resizeMode="cover" /> : null}
          {result.isNew ? <S.NewTag><S.NewText>NEW</S.NewText></S.NewTag> : null}
        </S.Art>
        <S.Info>
          <S.Rarity $r={result.rarity}>{rarityLabel[result.rarity]}</S.Rarity>
          <S.Sinner numberOfLines={1}>{item.sinnerName}</S.Sinner>
          <S.Name numberOfLines={1}>{item.name}</S.Name>
        </S.Info>
      </S.Card>
    </Animated.View>
  );
};

export default Results;
