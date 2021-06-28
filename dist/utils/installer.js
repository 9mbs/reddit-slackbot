"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installer = void 0;
const { InstallProvider } = require('@slack/oauth');
exports.installer = new InstallProvider({
    clientId: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET,
    authVersion: 'v2',
    stateSecret: 'my-state-secret',
    installationStore: {
        storeInstallation: ({ isEnterpriseInstall, enterprise, team, }) => __awaiter(void 0, void 0, void 0, function* () {
            if (isEnterpriseInstall) {
                // storing org installation
                // console.log("isEnterpriseInstall: ", enterprise.id)
                return;
                // return await keyv.set(installation.enterprise.id, installation);
            }
            else if (team !== null && team.id !== undefined) {
                // storing single team installation
                // console.log("installation.team: ", team.id)
                return;
            }
            throw new Error('Failed saving installation data to installationStore');
        }),
        fetchInstallation: ({ isEnterpriseInstall, enterpriseId, teamId, }) => __awaiter(void 0, void 0, void 0, function* () {
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
        }),
        deleteInstallation: ({ isEnterpriseInstall, enterpriseId, teamId, }) => __awaiter(void 0, void 0, void 0, function* () {
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
        }),
    },
});
//# sourceMappingURL=installer.js.map