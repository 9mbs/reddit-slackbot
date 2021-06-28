"use strict";
// // const path = require('path');
// const { App, LogLevel, ExpressReceiver } = require('@slack/bolt');
// const { WebClient } = require('@slack/web-api');
// // Create a Bolt Receiver
// const receiver = new ExpressReceiver({ signingSecret: process.env.SLACK_SIGNING_SECRET });
// // Import local environmental variables 
// require('dotenv').config({path: path.resolve(__dirname, "../.env.local")})
// // Initializes your app with your bot token and signing secret
// const app = new App({
//   token: process.env.SLACK_BOT_USER_OAUTH_TOKEN,
//   signingSecret: process.env.SLACK_SIGNING_SECRET,
//   receiver,
//   logLevel: LogLevel.DEBUG,
// });
// // Friendly reminder to be a good person :)
// receiver.router.get('/', (req: any, res: any) => {
//   res.send("The highest human act is to inspire. - Ermias Asghedom")
// });
// // Handle oauth when user clicks "Sign into Slack" 
// // https://slack.com/oauth/v2/authorize?client_id=client.id&user_scope=identity.basic
// receiver.router.get('/oauth', async (req: any, res: any) => {
//   try { 
//     const result = await (new WebClient(process.env.SLACK_BOT_USER_OAUTH_TOKEN)).oauth.v2.access({
//       client_id: process.env.SLACK_CLIENT_ID,
//       client_secret: process.env.SLACK_CLIENT_SECRET,
//       code: req.query.code
//     });
//     res.json(result);
//   } catch (error) {
//     console.log({error, data: error.data})
//   }
// });
// // Route the endpoint that our slash command will point to 
// // and send back a simple response to indicate that ngrok is working
// receiver.router.post('/ngrok', async (req: any, res: any) => {
//   res.send('ngrok tunnel is up and running! :rocket:');
// });
// // Listens to incoming messages that contain "hello"
// app.message('hello', async ({ message, say }: any) => {
//   console.log("hi")
//   // say() sends a message to the channel where the event was triggered
//   await say(`Hey there <@${message.user}>!`);
// });
// (async () => {
//   // Start your app
//   await app.start(process.env.PORT || 3009);
//   console.log(`⚡️ Bolt app is running on http://localhost:${process.env.PORT || 3009}!`);
// })();
//# sourceMappingURL=staleindex%20copy.js.map