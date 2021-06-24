const { InstallProvider } = require('@slack/oauth');
import { StoreInstallInterface, InstallInterface } from "../_types";

export const installer = new InstallProvider({
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  authVersion: 'v2',
  stateSecret: 'my-state-secret',
  installationStore: {
    storeInstallation: async ({ isEnterpriseInstall, enterprise, team }: StoreInstallInterface) => {
      if (isEnterpriseInstall) {
        // storing org installation
        // console.log("isEnterpriseInstall: ", enterprise.id)
        return;
        // return await keyv.set(installation.enterprise.id, installation);
      } else if (team !== null && team.id !== undefined) {
        // storing single team installation
        // console.log("installation.team: ", team.id)
        return;
      }
      throw new Error('Failed saving installation data to installationStore');
    },
    fetchInstallation: async ({ isEnterpriseInstall, enterpriseId, teamId }: InstallInterface) => {
      if (isEnterpriseInstall) {
        if (enterpriseId !== undefined) {       
          // fetching org installation
          // console.log("installQuery.enterpriseId", enterpriseId)
          return;
        }
      }
      if (teamId !== undefined) {
        // fetching single team installation
        // console.log("teamId: ", teamId)
        return;
      }
      throw new Error('Failed fetching installation');
    },
    deleteInstallation: async ({ isEnterpriseInstall, enterpriseId, teamId}: InstallInterface) => {
      if (isEnterpriseInstall) {
        if (enterpriseId !== undefined) {
          // delete org installation
        return;
        }
      }
      if (teamId !== undefined) {
        // delete single team installation
        return;
      }
      throw new Error('Failed to delete installation');
    },
  },
});
