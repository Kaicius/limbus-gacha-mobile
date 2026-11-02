import { useRef } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useEventListener } from "expo";
import { VideoView, useVideoPlayer } from "expo-video";
import * as S from "./style";

const UptieCutscene = ({ url, onDone }) => {
  const mountedAt = useRef(Date.now());
  const doneRef = useRef(false);

  const player = useVideoPlayer(url, (p) => {
    p.loop = false;
    p.play();
  });

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    player.pause();
    onDone();
  };

  useEventListener(player, "playToEnd", finish);
  useEventListener(player, "statusChange", ({ status }) => {
    if (status === "error") finish();
  });

  return (
    <View style={styles.fill}>
      <VideoView
        player={player}
        style={StyleSheet.absoluteFill}
        contentFit="contain"
        nativeControls={false}
        pointerEvents="none"
      />
      <S.Label>UPTIE III</S.Label>
      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={() => {
          if (Date.now() - mountedAt.current > 1000) finish();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fill: { ...StyleSheet.absoluteFillObject, backgroundColor: "#000" },
});

export default UptieCutscene;
