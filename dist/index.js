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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { App } = require('@slack/bolt');
// Configures local environment
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
const node_fetch_1 = __importDefault(require("node-fetch"));
// local imports
const utils_1 = require("./utils");
// Heroku will use this to assign unique port
// hardcode should match ngrok server
// https://github.com/hi-matbub/reddit-slackbot#start-ngrok-server
const port = process.env.PORT || 3009;
// create slack app
const app = new App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_USER_OAUTH_TOKEN,
});
// listener for app homepage
app.event('app_home_opened', ({ event, context }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // send reddit slackbot homepage back
        yield app.client.views.publish({
            token: context.botToken,
            user_id: event.user,
            view: utils_1.buildHomeScreen,
        });
    }
    catch (error) {
        console.error(error);
    }
}));
app.command('/memes', ({ command, ack, say, context, payload }) => __awaiter(void 0, void 0, void 0, function* () {
    const getData = yield node_fetch_1.default('https://www.reddit.com/r/memes.json');
    const { data } = yield getData.json();
    let blocks = [
        // heading content
        {
            type: 'context',
            elements: [
                {
                    type: 'plain_text',
                    text: 'Browse through hundreds of the most popular safe-for-work subreddits. This application is licensed under MIT. All 3rd party data is sourced directly from Reddit.',
                    emoji: true,
                },
            ],
        },
        {
            type: 'header',
            text: {
                type: 'plain_text',
                text: `r/${data.children[0].data.subreddit}`,
                emoji: true,
            },
        },
    ];
    try {
        const formattedBlocks = utils_1.buildingBlocks({
            introBlocks: blocks,
            data,
        });
        // send to app
        yield app.client.chat.postMessage({
            token: context.botToken,
            channel: payload.channel_id,
            blocks: formattedBlocks,
            text: "Here's what I found",
        });
    }
    catch (error) {
        console.error({ error, data });
    }
    // Acknowledge command request
    yield ack();
}));
app.command('/reddit', ({ command, ack, say, context, payload }) => __awaiter(void 0, void 0, void 0, function* () {
    let url = "https://www.reddit.com";
    // looks for `r/sub` 
    const subreddit = /r\/[a-zA-Z\d_]+/;
    if (!subreddit.test(command.text)) {
        url += "/hot.json";
    }
    else if (subreddit.test(command.text)) {
        const match = command.text.match(subreddit);
        url += `/${match[0]}.json`;
    }
    else {
        url += "/hot.json";
    }
    // console.log({
    //   url,
    //   string: command.text,
    //   test: subreddit.test(command.text),
    //   match: command.text.match(subreddit)
    // })
    const getData = yield node_fetch_1.default(url);
    const { data } = yield getData.json();
    let blocks = [
        // heading content
        {
            type: 'context',
            elements: [
                {
                    type: 'plain_text',
                    text: 'Browse through hundreds of the most popular safe-for-work subreddits. This application is licensed under MIT. All 3rd party data is sourced directly from Reddit.',
                    emoji: true,
                },
            ],
        },
        {
            type: 'header',
            text: {
                type: 'plain_text',
                text: `r/${data.children[0].data.subreddit}`,
                emoji: true,
            },
        },
    ];
    try {
        const formattedBlocks = utils_1.buildingBlocks({
            introBlocks: blocks,
            data,
        });
        // send to app
        yield app.client.chat.postMessage({
            token: context.botToken,
            channel: payload.channel_id,
            blocks: formattedBlocks,
            text: "Here's what I found",
        });
    }
    catch (error) {
        say("Whoops. :rotating_light: Something wen't wrong, try again.");
    }
    // Acknowledge command request
    yield ack();
}));
// start bolt app
(() => __awaiter(void 0, void 0, void 0, function* () { return (yield app.start(port)) && console.log(`Hello world!`); }))();
//# sourceMappingURL=index.js.map