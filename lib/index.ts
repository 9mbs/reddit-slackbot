const { App, ExpressReceiver } = require('@slack/bolt');

// Configures local environment
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

import fetch from 'node-fetch';

// local imports
import {
  buildHomeScreen,
  buildingBlocks,
  buildQuery,
  database as db,
} from '../utils';
import { BlockInterface } from './types';

// init database instance
const database = db('slack_reviews');

// Heroku will use this to assign unique port
// hardcode should match ngrok server
// https://github.com/hi-matbub/reddit-slackbot#start-ngrok-server
const port = process.env.PORT || 3009;

// create express receiver
// const receiver = new ExpressReceiver({
//   signingSecret: process.env.SLACK_SIGNING_SECRET
// });

// create slack app
const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_USER_OAUTH_TOKEN,
});

// receiver.app.get('/slack/install', (req: any, res: any) => {
//   receiver.installer.generateInstallUrl()
//   res.status(200).send("Hello world");
// });

// listener for app homepage
app.event('app_home_opened', async ({ event, context }: any) => {
  try {
    // send reddit slackbot homepage back
    await app.client.views.publish({
      token: context.botToken,
      user_id: event.user,
      view: buildHomeScreen,
    });
  } catch (error) {
    console.error(error);
  }
});

app.command('/reddit', async ({ command, ack, say, context, payload }: any) => {
  // let url = "https://www.reddit.com"
  // looks for `r/sub`
  // const subreddit = /r\/[a-zA-Z\d_]+/
  // if(!subreddit.test(command.text)){
  //   url += "/hot.json";
  // } else if (subreddit.test(command.text)) {
  //   const match = command.text.match(subreddit);
  //   url += `/${match[0]}.json`;
  // } else {
  //   url += "/hot.json";
  // }
  const url = buildQuery(command);

  const getData = await fetch(url);
  const { data } = await getData.json();

  let blocks: BlockInterface[] = [
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
    // covert reddit data to slack blocks
    const formattedBlocks = buildingBlocks({
      introBlocks: blocks,
      data,
    });

    // send to app
    await app.client.chat.postMessage({
      token: context.botToken,
      channel: payload.channel_id,
      blocks: formattedBlocks,
      text: "Here's what I found",
    });
  } catch (error: any) {
    say("Whoops. :rotating_light: Something wen't wrong.");
  }

  // Acknowledge command request
  await ack();
});

app.action('help', async ({ ack }: any) => {
  console.log('Helo help');
  await ack();
  // Update the message to reflect the action
});

// start bolt app
(async () => (await app.start(port)) && console.log(`Hello world!`))();
