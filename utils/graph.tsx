import { Client } from "@microsoft/microsoft-graph-client";

export const callGraphAPI = async (accessToken: string) => {
  const client = Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    },
  });

  const user = await client.api("/me").get();
  return user;
};