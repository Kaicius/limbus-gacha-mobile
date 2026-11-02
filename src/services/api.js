import { API_URL } from "@config";

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch {
    throw new Error(`Não foi possível conectar na API (${API_URL}). Confira o IP no config.js e se a gacha-api está rodando.`);
  }

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(body?.error ?? `Erro ${response.status}`);
  }
  return body;
}

export function login(username) {
  return request("/players/login", {
    method: "POST",
    body: JSON.stringify({ username }),
  });
}

export function getPlayer(playerId) {
  return request(`/players/${playerId}`);
}

export function addCurrency(playerId) {
  return request(`/players/${playerId}/currency`, { method: "POST" });
}

export function getPity(playerId, bannerId) {
  return request(`/players/${playerId}/banners/${bannerId}/pity`);
}

export function getBanners() {
  return request("/banners");
}

export function getBanner(bannerId) {
  return request(`/banners/${bannerId}`);
}

export function extract(playerId, bannerId, amount) {
  return request(`/players/${playerId}/banners/${bannerId}/extractions?amount=${amount}`, {
    method: "POST",
  });
}

export function uptie(playerId, identityId) {
  return request(`/players/${playerId}/identities/${identityId}/uptie`, { method: "POST" });
}
