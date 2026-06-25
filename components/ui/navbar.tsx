import { useMsal } from "@azure/msal-react";
import { useAuth } from "@/utils/Protectedroute";

export default function Navbar() {
  const { instance } = useMsal();
  const { user } = useAuth();

  const logout = async () => {
    // Appel symbolique au backend pour nettoyer la session côté API
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    // Nettoyage local
    sessionStorage.removeItem("accessToken");

    // Déconnexion Azure AD + redirection
    await instance.logoutRedirect({
      postLogoutRedirectUri: "http://localhost:3000",
    });
  };

  return (
    <div>
      <p>{user?.firstName} {user?.lastName}</p>
      <p>{user?.email}</p>
      <p>{user?.roleName}</p>
      <button onClick={logout}>Se déconnecter</button>
    </div>
  );
}