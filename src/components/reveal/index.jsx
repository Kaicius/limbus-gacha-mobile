import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";
import { useEventListener } from "expo";
import { VideoView, useVideoPlayer } from "expo-video";
import { LinearGradient } from "expo-linear-gradient";
import GlowSweep from "@components/glow-sweep";
import { rarityColor, rarityLabel } from "@/theme";
import * as S from "./style";

const EGO_REVEAL_AT = 11.6;

const MIN_TIME_BEFORE_SKIP = 3;

const Reveal = ({ result, onDone }) => {
  const isEgo = result.rarity === "EGO";
  const item = result.identity ?? result.ego;
  const videoUrl = item.obtainmentVideoUrl;
  const art = result.identity
    ? result.identity.uptie3ArtUrl ?? result.identity.uptie1ArtUrl
    : result.ego.artUrl;

  const revealAt = isEgo ? EGO_REVEAL_AT : result.identity?.revealAt ?? null;

  const [useImage, setUseImage] = useState(!videoUrl);
  const [revealed, setRevealed] = useState(false);
  const revealedRef = useRef(false);
  const timeRef = useRef(0);
  const mountedAt = useRef(Date.now());

  const player = useVideoPlayer(videoUrl ?? null, (p) => {
    p.timeUpdateEventInterval = 0.1;
    p.loop = false;
    p.play();
  });

  const reveal = useCallback(() => {
    revealedRef.current = true;
    setRevealed(true);
  }, []);

  useEventListener(player, "timeUpdate", ({ currentTime }) => {
    timeRef.current = currentTime;
    if (!revealedRef.current && revealAt !== null && currentTime >= revealAt) {
      reveal();
    }
  });

  useEventListener(player, "playToEnd", () => {
    if (!revealedRef.current) reveal();
  });

  useEventListener(player, "statusChange", ({ status }) => {
    if (status === "error") setUseImage(true);
  });

  useEffect(() => {
    if (!useImage) return;
    player.pause();
    const t = setTimeout(reveal, 700);
    return () => clearTimeout(t);
  }, [useImage, player, reveal]);

  function handlePress() {
    if (revealedRef.current) {
      onDone();
      return;
    }
    if (useImage) {
      reveal();
      return;
    }
    if ((Date.now() - mountedAt.current) / 1000 < MIN_TIME_BEFORE_SKIP) return;

    if (revealAt !== null) {
      player.currentTime = revealAt;
    } else if (player.duration > 0) {
      player.currentTime = Math.max(player.duration - 0.2, 0);
    }
    reveal();
  }

  return (
    <S.Stage>
      {useImage ? (
        art ? <ArtImage uri={art} /> : null
      ) : (
        <VideoView
          player={player}
          style={StyleSheet.absoluteFill}
          contentFit="contain"
          nativeControls={false}
          pointerEvents="none"
        />
      )}

      {revealed && !isEgo ? <RevealOverlay result={result} /> : null}

      {revealed ? <S.Continue>Toque para continuar</S.Continue> : null}

      <Pressable style={StyleSheet.absoluteFill} onPress={handlePress} />
    </S.Stage>
  );
};

const ArtImage = ({ uri }) => {
  const zoom = useRef(new Animated.Value(1.08)).current;

  useEffect(() => {
    Animated.timing(zoom, { toValue: 1, duration: 2500, useNativeDriver: true }).start();
  }, [zoom]);

  return (
    <Animated.Image
      source={{ uri }}
      resizeMode="contain"
      style={[StyleSheet.absoluteFill, { transform: [{ scale: zoom }] }]}
    />
  );
};

const RevealOverlay = ({ result }) => {
  const identity = result.identity;
  const color = rarityColor[result.rarity];

  const cardIn = useRef(new Animated.Value(0)).current;
  const quoteIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(200),
      Animated.parallel([
        Animated.spring(cardIn, { toValue: 1, friction: 7, tension: 70, useNativeDriver: true }),
        Animated.timing(quoteIn, { toValue: 1, duration: 500, delay: 150, useNativeDriver: true }),
      ]),
    ]).start();
  }, [cardIn, quoteIn]);

  const cardStyle = {
    opacity: cardIn,
    transform: [{ translateX: cardIn.interpolate({ inputRange: [0, 1], outputRange: [80, 0] }) }],
  };

  return (
    <>
      <GlowSweep />

      {identity.quote ? (
        <Animated.View style={[styles.quoteWrap, { opacity: quoteIn }]} pointerEvents="none">
          <S.Quote>{identity.quote}</S.Quote>
        </Animated.View>
      ) : null}

      <Animated.View style={[styles.cardWrap, cardStyle]} pointerEvents="none">
        <S.IdentityTag>
          <S.IdentityName numberOfLines={2}>{identity.name}</S.IdentityName>
        </S.IdentityTag>

        <S.PlateRow>
          <S.Plate>
            <LinearGradient
              colors={["#22245e", "#4a3fae", "#2b2d7a"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
            <S.SinnerName>{identity.sinnerName}</S.SinnerName>
          </S.Plate>
          <S.RarityTag style={{ color, textShadowColor: color }}>
            {rarityLabel[result.rarity]}
          </S.RarityTag>
        </S.PlateRow>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  quoteWrap: {
    position: "absolute",
    left: "12%",
    right: "12%",
    bottom: 22,
    alignItems: "center",
  },
  cardWrap: {
    position: "absolute",
    right: 28,
    bottom: 64,
    alignItems: "flex-start",
  },
});

export default Reveal;
