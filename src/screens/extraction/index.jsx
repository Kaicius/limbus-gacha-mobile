import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, Image, Pressable, StyleSheet, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import Reveal from "@components/reveal";
import * as S from "./style";

const IMG = {
  background: require("../../../assets/extraction/background.jpg"),
  core: require("../../../assets/extraction/core.png"),
  coreGold: require("../../../assets/extraction/core_gold.png"),
  orb: require("../../../assets/extraction/orb.png"),
  chain: require("../../../assets/extraction/chain.png"),
  node: {
    ZERO: require("../../../assets/extraction/node_white.png"),
    DOUBLE: require("../../../assets/extraction/node_red.png"),
    TRIPLE: require("../../../assets/extraction/node_gold.png"),
    EGO: require("../../../assets/extraction/node_ego.png"),
  },
  chainColor: {
    DOUBLE: require("../../../assets/extraction/chain_red.png"),
    TRIPLE: require("../../../assets/extraction/chain_gold.png"),
    EGO: require("../../../assets/extraction/chain_red.png"),
  },
};

const STAGE_W = 1280;
const STAGE_H = 720;
const CORE = { x: 634, y: 332, size: 206 };
const NODE_SIZE = 152;
const SLOTS_10 = [
  { x: 318, y: 112 }, { x: 540, y: 105 }, { x: 750, y: 105 }, { x: 968, y: 112 },
  { x: 1150, y: 330 },
  { x: 970, y: 545 }, { x: 680, y: 540 }, { x: 478, y: 553 }, { x: 262, y: 530 },
  { x: 112, y: 345 },
];
const SLOTS_1 = [{ x: 1150, y: 330 }];

const timing = (value, toValue, duration, extra = {}) =>
  Animated.timing(value, { toValue, duration, useNativeDriver: true, ...extra });


const Extraction = () => {
  const navigation = useNavigation();
  const { results } = useRoute().params;
  const { width, height } = useWindowDimensions();

  const highlights = useMemo(
    () => results
      .map((r, index) => ({ ...r, index }))
      .filter((r) => r.rarity === "TRIPLE" || r.rarity === "EGO" || (r.rarity === "DOUBLE" && r.isNew)),
    [results],
  );
  const hasTriple = results.some((r) => r.rarity === "TRIPLE");

  const [phase, setPhase] = useState("intro");
  const [step, setStep] = useState(0);
  const [beamTarget, setBeamTarget] = useState(null);

  const k = Math.min(width / STAGE_W, height / STAGE_H) * 0.9;
  const offsetX = (width - STAGE_W * k) / 2;
  const offsetY = (height - STAGE_H * k) / 2;
  const toScreen = useCallback((p) => ({ x: offsetX + p.x * k, y: offsetY + p.y * k }), [k, offsetX, offsetY]);

  const core = toScreen(CORE);
  const slots = (results.length === 1 ? SLOTS_1 : SLOTS_10).map(toScreen);

  const bgIn = useRef(new Animated.Value(0)).current;
  const coreZoom = useRef(new Animated.Value(0)).current;
  const corePulse = useRef(new Animated.Value(0)).current;
  const coreGold = useRef(new Animated.Value(0)).current;
  const chainGlow = useRef(new Animated.Value(0)).current;
  const chainGrow = useRef(results.map(() => new Animated.Value(0))).current;
  const orbs = useRef(results.map(() => new Animated.Value(0))).current;
  const bursts = useRef(results.map(() => new Animated.Value(0))).current;
  const beam = useRef(new Animated.Value(0)).current;
  const flash = useRef(new Animated.Value(0)).current;

  const introRef = useRef(null);
  const introDone = useRef(false);

  const goToResults = useCallback(() => {
    navigation.replace("Results", { results });
  }, [navigation, results]);

  const whiteFlash = useCallback((onPeak) => {
    Animated.sequence([timing(flash, 1, 200)]).start(() => {
      onPeak?.();
      timing(flash, 0, 400).start();
    });
  }, [flash]);

  const playHighlight = useCallback((n) => {
    if (n >= highlights.length) {
      whiteFlash(goToResults);
      return;
    }
    const target = highlights[n].index;
    setBeamTarget(target);
    beam.setValue(0);
    orbs[target].setValue(0);

    Animated.sequence([
      Animated.delay(450),
      Animated.parallel([
        timing(orbs[target], 1, 250),
        timing(beam, 1, 380, { easing: Easing.out(Easing.quad) }),
      ]),
      Animated.delay(250),
    ]).start(() => {
      whiteFlash(() => {
        setBeamTarget(null);
        orbs[target].setValue(0);
        setStep(n);
        setPhase("reveal");
      });
    });
  }, [highlights, beam, orbs, whiteFlash, goToResults]);

  const finishIntro = useCallback(() => {
    if (introDone.current) return;
    introDone.current = true;
    introRef.current?.stop();

    bgIn.setValue(1);
    coreZoom.setValue(1);
    chainGlow.setValue(0);
    chainGrow.forEach((a) => a.setValue(1));
    orbs.forEach((a) => a.setValue(0));
    bursts.forEach((a) => a.setValue(1));
    if (hasTriple) coreGold.setValue(1);

    setPhase("scene");
    playHighlight(0);
  }, [bgIn, coreZoom, chainGlow, chainGrow, orbs, bursts, coreGold, hasTriple, playHighlight]);

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        timing(corePulse, 1, 900, { easing: Easing.inOut(Easing.sin) }),
        timing(corePulse, 0, 900, { easing: Easing.inOut(Easing.sin) }),
      ]),
    );
    pulse.start();

    const intro = Animated.sequence([
      Animated.parallel([
        timing(bgIn, 1, 600),
        timing(coreZoom, 1, 900, { easing: Easing.out(Easing.cubic) }),
      ]),
      Animated.parallel([
        timing(chainGlow, 1, 120),
        Animated.stagger(25, chainGrow.map((a) => timing(a, 1, 260, { easing: Easing.out(Easing.quad) }))),
      ]),
      Animated.parallel(orbs.map((a) => timing(a, 1, 180))),
      Animated.parallel([timing(chainGlow, 0, 300), Animated.delay(250)]),
      Animated.parallel([
        ...orbs.map((a) => timing(a, 0, 260)),
        ...bursts.map((a) => Animated.spring(a, { toValue: 1, friction: 6, tension: 90, useNativeDriver: true })),
      ]),
      Animated.delay(500),
      hasTriple ? timing(coreGold, 1, 500) : Animated.delay(0),
      Animated.delay(700),
    ]);
    introRef.current = intro;
    intro.start(({ finished }) => {
      if (finished) finishIntro();
    });

    return () => {
      pulse.stop();
      intro.stop();
    };
  }, []);

  const handleRevealDone = useCallback(() => {
    setPhase("scene");
    playHighlight(step + 1);
  }, [playHighlight, step]);

  const coreSize = CORE.size * k;
  const nodeSize = NODE_SIZE * k;
  const coreScale = Animated.add(
    coreZoom.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] }),
    corePulse.interpolate({ inputRange: [0, 1], outputRange: [0, 0.03] }),
  );

  return (
    <S.Screen>
      <Pressable style={StyleSheet.absoluteFill} onPress={phase === "intro" ? finishIntro : undefined}>
        <Animated.Image
          source={IMG.background}
          resizeMode="cover"
          style={[styles.img, { opacity: bgIn }]}
        />

        {results.map((r, i) => (
          <Chain
            key={`chain-${r.position}`}
            from={core}
            to={slots[i]}
            k={k}
            grow={chainGrow[i]}
            glow={chainGlow}
            colorSource={IMG.chainColor[r.rarity]}
            colorIn={bursts[i]}
          />
        ))}

        {beamTarget !== null ? (
          <Beam from={core} to={slots[beamTarget]} k={k} progress={beam} />
        ) : null}

        <Animated.View
          style={{
            position: "absolute",
            left: core.x - coreSize / 2,
            top: core.y - coreSize / 2,
            width: coreSize,
            height: coreSize,
            transform: [{ scale: coreScale }],
          }}
        >
          <Image source={IMG.core} style={styles.img} />
          <Animated.Image source={IMG.coreGold} style={[styles.img, { opacity: coreGold }]} />
        </Animated.View>

        {results.map((r, i) => (
          <Node
            key={`node-${r.position}`}
            center={slots[i]}
            size={nodeSize}
            source={IMG.node[r.rarity]}
            orb={orbs[i]}
            burst={bursts[i]}
            big={r.rarity !== "ZERO"}
          />
        ))}

        {phase === "intro" ? <S.Hint>Toque para pular</S.Hint> : null}
      </Pressable>

      {phase === "reveal" ? (
        <Reveal key={highlights[step].position} result={highlights[step]} onDone={handleRevealDone} />
      ) : null}

      <Animated.View
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, { backgroundColor: "#fff", opacity: flash }]}
      />

      <S.Skip onPress={goToResults}>
        <S.SkipText>SKIP ▸▸</S.SkipText>
      </S.Skip>
    </S.Screen>
  );
};

function line(from, to) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  return { length: Math.sqrt(dx * dx + dy * dy), angle: Math.atan2(dy, dx) };
}

const Chain = ({ from, to, k, grow, glow, colorSource, colorIn }) => {
  const { length, angle } = line(from, to);
  const h = 14;

  return (
    <Animated.View
      style={{
        position: "absolute",
        left: from.x,
        top: from.y - h / 2,
        width: length,
        height: h,
        transformOrigin: "left center",
        transform: [{ rotate: `${angle}rad` }, { scaleX: grow }],
      }}
    >
      <Image source={IMG.chain} resizeMode="repeat" style={styles.img} />
      {colorSource ? (
        <Animated.Image
          source={colorSource}
          resizeMode="repeat"
          style={[styles.img, { opacity: colorIn }]}
        />
      ) : null}
      <Animated.View style={[styles.chainGlow, { opacity: glow }]} />
    </Animated.View>
  );
};

const Beam = ({ from, to, k, progress }) => {
  const { length, angle } = line(from, to);
  const h = 14 * k;

  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: "absolute",
        left: from.x,
        top: from.y - h / 2,
        width: length,
        height: h,
        transformOrigin: "left center",
        transform: [{ rotate: `${angle}rad` }, { scaleX: progress }],
      }}
    >
      <LinearGradient
        colors={["#ffffff", "#8fc8ff", "#b58cff", "#ffffff"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={[StyleSheet.absoluteFill, { borderRadius: h }]}
      />
    </Animated.View>
  );
};

const Node = ({ center, size, source, orb, burst, big }) => {
  const burstScale = burst.interpolate({ inputRange: [0, 1], outputRange: [0.5, big ? 1.12 : 1] });
  const orbScale = orb.interpolate({ inputRange: [0, 1], outputRange: [0.4, 1] });

  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: "absolute",
        left: center.x - size / 2,
        top: center.y - size / 2,
        width: size,
        height: size,
      }}
    >
      <Animated.Image
        source={source}
        style={[styles.img, { opacity: burst, transform: [{ scale: burstScale }] }]}
      />
      <Animated.Image
        source={IMG.orb}
        style={[styles.img, { opacity: orb, transform: [{ scale: orbScale }] }]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  img: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  chainGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#7cc4ff",
    borderRadius: 8,
  },
});

export default Extraction;
