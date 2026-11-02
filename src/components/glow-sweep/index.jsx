import { useEffect, useRef } from "react";
import { Animated, StyleSheet, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const GlowSweep = ({ color = "rgba(255, 240, 200, 0.9)", onEnd }) => {
  const { width } = useWindowDimensions();
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 450,
      useNativeDriver: true,
    }).start(() => onEnd?.());
  }, [progress, onEnd]);

  const bandWidth = width * 0.4;

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [width, -bandWidth * 1.6],
  });

  const flash = progress.interpolate({
    inputRange: [0, 0.35, 1],
    outputRange: [0, 0.35, 0],
  });

  return (
    <>
      <Animated.View
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, { backgroundColor: "#fff", opacity: flash }]}
      />
      <Animated.View
        pointerEvents="none"
        style={[
          styles.band,
          { width: bandWidth, transform: [{ translateX }, { rotate: "14deg" }] },
        ]}
      >
        <LinearGradient
          colors={["transparent", color, "transparent"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  band: {
    position: "absolute",
    top: "-30%",
    bottom: "-30%",
    left: 0,
  },
});

export default GlowSweep;
