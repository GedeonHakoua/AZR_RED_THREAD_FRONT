import { loginRequest } from "@/utils/msalConfig";

/**
 * Retourne les headers Authorization pour les appels API backend.
 * Tente d'abord une acquisition silencieuse du token,
 * puis fallback sur le sessionStorage si disponible.
 */
export const getAuthHeaders = async (
  instance: any,
  accounts: any
): Promise<Record<string, string>> => {
  try {
    const response = await instance.acquireTokenSilent({
      account: accounts[0],
      scopes: loginRequest.scopes,
    });

    // Met à jour le sessionStorage avec le token frais
    sessionStorage.setItem("accessToken", response.accessToken);

    return {
      Authorization: `Bearer ${response.accessToken}`,
      "Content-Type": "application/json",
    };
  } catch {
    // Fallback sur le token stocké si acquireTokenSilent échoue
    const stored = sessionStorage.getItem("accessToken");
    if (stored) {
      return {
        Authorization: `Bearer ${stored}`,
        "Content-Type": "application/json",
      };
    }

    throw new Error("Token introuvable. L'utilisateur doit se reconnecter.");
  }
};