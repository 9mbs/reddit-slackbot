const express = require('express');

// Slack API 
const { createEventAdapter } = require('@slack/events-api');

// Configures local environment
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, "../.env.local")})

// local imports
import { handleSlackInstall, handleOAuth, handleNgrokTestConnection, handleHome } from "./routes"
import { handleAppHomeOpen } from "./slack_events";

// create express app
const app = express();

// Heroku will use this to assign unique port
// hardcode should match ngrok server 
// https://github.com/hi-matbub/reddit-slackbot#start-ngrok-server
const port = process.env.PORT || 3009;

// Initialize slack events adapter
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET, {
  includeBody: true,
});

// Set path to receive events
app.use('/slack/events', slackEvents.requestListener());

// base route
app.get('/', handleHome);

// [slash command] test connection 
app.post('/ngrok', handleNgrokTestConnection);

// Slack oauth
app.get('/slack/install', handleSlackInstall);

// use default success and failure handlers
app.get('/oauth', handleOAuth);

// When a user navigates to the app home, grab the token from our database and publish a view
slackEvents.on('app_home_opened', handleAppHomeOpen);

app.listen(port, () => console.log(`App listening on http://localhost:${port}`))