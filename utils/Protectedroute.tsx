'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./msalConfig";
import { usePathname, useRouter } from "next/navigation";

interface AuthContextType {
  user: any;
  accessToken: string | null;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  accessToken: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { instance, accounts, inProgress } = useMsal();
  const [user, setUser] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    const initializeMsal = async () => {
      console.log("[AuthProvider] Initialisation MSAL...");
      try {
        await instance.initialize();
        console.log("[AuthProvider] MSAL Initialisé avec succès.");
        if (!cancelled) {
          setIsReady(true);
        }
      } catch (error) {
        console.error("[AuthProvider] Erreur d'initialisation MSAL :", error);
        if (!cancelled) {
          setIsReady(true);
        }
      }
    };

    initializeMsal();

    return () => {
      cancelled = true;
    };
  }, [instance]);

  // Rediriger vers le dashboard si l'utilisateur est déjà connecté et essaie d'aller sur /login
  useEffect(() => {
    if (!isReady || inProgress !== "none") return;
    console.log(`[AuthProvider] Check login redirect: pathname=${pathname}, accounts=${accounts.length}`);
    if (pathname === "/login" && accounts.length > 0) {
      console.log("[AuthProvider] Déjà connecté, redirection vers /dashboard depuis /login");
      router.push("/dashboard");
    }
  }, [accounts, isReady, pathname, router, inProgress]);

  // Exposer l'état d'authentification dans la console pour le débogage devtools
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).getAuthState = () => {
        console.log("[getAuthState] État actuel de l'authentification :");
        return {
          isReady,
          inProgress,
          msalAccounts: accounts,
          backendUser: user,
          accessToken: accessToken,
          sessionStorageToken: sessionStorage.getItem("accessToken")
        };
      };

      (window as any).decodeToken = () => {
        const token = sessionStorage.getItem("accessToken") || accessToken;
        if (!token) {
          console.warn("[decodeToken] Aucun token disponible.");
          return null;
        }
        try {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          console.log("[decodeToken] Contenu décodé du token JWT :");
          return JSON.parse(jsonPayload);
        } catch (e: any) {
          console.error("[decodeToken] Erreur de décodage :", e.message);
          return null;
        }
      };
    }
  }, [accounts, inProgress, isReady, user, accessToken]);

  useEffect(() => {
    if (!isReady || inProgress !== "none") {
      console.log(`[AuthProvider] En attente d'initialisation ou d'interaction MSAL (isReady=${isReady}, inProgress=${inProgress})`);
      return;
    }

    console.log(`[AuthProvider] Route-check: pathname=${pathname}, accounts=${accounts.length}`);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    console.log("URL : " + apiUrl);
    if (pathname === "/login") {
      return;
    }

    if (accounts.length === 0) {
      console.log("[AuthProvider] Non connecté sur page protégée. Redirection locale vers /login");
      router.push("/login");
      return;
    }

    const resolveUser = async () => {
      try {
        console.log("[AuthProvider] Tentative de récupération silencieuse du token pour:", accounts[0].username);
        const response = await instance.acquireTokenSilent({
          account: accounts[0],
          scopes: loginRequest.scopes,
        });

        const token = response.accessToken;
        console.log("[AuthProvider] Token récupéré avec succès.");

        sessionStorage.setItem("accessToken", token);
        setAccessToken(token);

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        // const apiUrl = "https://localhost:3000";
        console.log(`[AuthProvider] Appel API backend de connexion: ${apiUrl}/api/auth/login`);

        const loginResponse = await fetch(
          `${apiUrl}/api/auth/login`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("[AuthProvider] Statut de réponse API backend:", loginResponse.status);

        if (!loginResponse.ok) {
          console.error("[AuthProvider] Compte non provisionné ou accès refusé par le backend.");
          return;
        }

        const userProfile = await loginResponse.json();
        console.log("[AuthProvider] Profil utilisateur backend récupéré:", userProfile);
        setUser(userProfile);
      } catch (error) {
        console.error("[AuthProvider] Échec acquireTokenSilent ou API backend :", error);
        // Au lieu de rediriger directement sur MSAL, redirigeons sur /login si on perd la session
        router.push("/login");
      }
    };

    void resolveUser();
  }, [accounts, instance, isReady, pathname, inProgress, router]);

  // Ne pas rendre les pages protégées si l'utilisateur n'est pas connecté ou si MSAL est en cours de traitement
  if (pathname !== "/login" && (!isReady || inProgress !== "none" || accounts.length === 0)) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'Figtree, sans-serif',
        background: '#F5F5F5',
        color: '#1a1a1a'
      }}>
        <p style={{ fontWeight: 600 }}>Redirection vers la page de connexion...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const withAuth = (Component: any) => {
  return function ProtectedComponent(props: any) {
    const { accounts } = useMsal();

    if (accounts.length === 0) {
      return <p>Redirection vers la page de connexion</p>;
    }

    return <Component {...props} />;
  };
};