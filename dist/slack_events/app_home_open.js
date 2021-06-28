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
exports.handleAppHomeOpen = void 0;
const homeObject_1 = require("../utils/homeObject");
const { WebClient } = require('@slack/web-api');
const handleAppHomeOpen = (event, body) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("LOG6:::::", event.user);
    try {
        const web = new WebClient(process.env.SLACK_BOT_USER_OAUTH_TOKEN);
        yield web.views.publish({
            user_id: event.user,
            view: homeObject_1.homeObject
        });
    }
    catch (error) {
        console.error(error);
    }
});
exports.handleAppHomeOpen = handleAppHomeOpen;
//# sourceMappingURL=app_home_open.js.map