import { PublicClientApplication } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "c45ec126-fcb0-43c1-a089-7257d77d56b9",
    authority: "https://login.microsoftonline.com/088e9b00-ffd0-458e-bfa1-acf4c596d3cb",
    redirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

// Scope pour accéder à l'API backend RED_THREAD
export const loginRequest = {
  scopes: [
    "openid",
    "profile",
    "email",
    "api://73078777-c7b2-4568-8680-b02e26d9c913/access_as_user",
  ],
};

// Scope pour Microsoft Graph (profil utilisateur)
export const graphRequest = {
  scopes: ["User.Read"],
};

export const msalInstance = new PublicClientApplication(msalConfig);