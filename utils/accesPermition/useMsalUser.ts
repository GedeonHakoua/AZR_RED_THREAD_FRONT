import { useMsal } from "@azure/msal-react";

export const useMsalUser = () => {
  const { accounts } = useMsal();

  if (!accounts || accounts.length === 0) {
    return null;
  }

  const account = accounts[0];

  return {
    email: account.username,
    name: account.name,
    username: account.username,
  };
};