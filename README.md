# Limbus Gacha Mobile

App (Expo 58 / React Native) do gacha de Limbus Company. Consome a `limbus-gacha-api`.

## Fluxo

1. **Login**: só o username. Se o player não existir, ele é criado com 13000 Lunacy.
2. **Banners**: lista os banners ativos e dá acesso ao inventário.
3. **Banner**: mostra o pity e as opções de 1x ou 10x extrações (130 Lunacy cada), com confirmação antes de girar.
4. **Extração**: animação dos nós e correntes. A cor final indica a maior raridade obtida.
5. **Reveal**: vídeo de obtenção para 000 e E.G.O. sempre, e para 00 só quando for **novo**. Toque para pular.
6. **Resultados**: cards de tudo o que saiu, com marcação de NEW.
7. **Inventário**: abas de Identities e E.G.O. Dá para fazer o **Uptie I → III**, que é grátis e toca a cutscene.

## Rodando local

```bash
npm install
npx expo start
```

Configure a URL da API em `src/config.js`:

```js
export const API_URL = "https://limbus-gacha-api.onrender.com";
// local: "http://<IP-do-PC>:8081"
```

O Expo Go baixa o bundle do seu PC, então o celular precisa estar **no mesmo Wi-Fi**. Fora da rede, use `npx expo start --tunnel` ou instale o APK.

## Gerar APK (EAS)

```bash
npm install -g eas-cli
eas login
eas build -p android --profile preview
```

O perfil `preview` do `eas.json` gera um `.apk` instalável direto no Android.

## Bibliotecas

React Navigation (native-stack), styled-components, expo-video e expo-linear-gradient.

## Estrutura

```
App.js                 rotas (Stack)
src/
├── config.js          URL da API
├── theme.js           cores e raridades
├── services/api.js    chamadas HTTP
├── context/           PlayerContext (player logado)
├── components/        ui, player-bar, reveal, glow-sweep, uptie-cutscene
└── screens/           login, banners, banner, extraction, results, inventory
assets/extraction/     sprites da cena de extração
```

Aliases (`@screens`, `@components`, `@services`, `@context` e `@/`) estão definidos no `jsconfig.json`.
