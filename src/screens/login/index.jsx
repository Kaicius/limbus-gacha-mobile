import { useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { login } from "@services/api";
import { usePlayer } from "@context/PlayerContext";
import { Button, ButtonText, ErrorText, Gold, Screen, Title } from "@components/ui";
import { colors } from "@/theme";
import * as S from "./style";

const Login = () => {
  const navigation = useNavigation();
  const { setPlayer } = usePlayer();

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    if (username.trim().length < 3) {
      setError("O nome precisa ter pelo menos 3 letras.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const player = await login(username.trim());
      setPlayer(player);
      navigation.replace("Banners");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <S.Center>
          <S.Card>
            <Title>LIMBUS <Gold>EXTRACTION</Gold></Title>
            <S.Subtitle>Digite um nome. Se ele não existir, a conta é criada.</S.Subtitle>

            <S.Input
              value={username}
              onChangeText={setUsername}
              placeholder="Nome do gerente"
              placeholderTextColor={colors.muted}
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={50}
              returnKeyType="go"
              onSubmitEditing={handleLogin}
            />

            <Button onPress={handleLogin} disabled={loading}>
              {loading
                ? <ActivityIndicator color={colors.gold} />
                : <ButtonText>Entrar</ButtonText>}
            </Button>

            {error ? <ErrorText>{error}</ErrorText> : null}
          </S.Card>
        </S.Center>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default Login;
