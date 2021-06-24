// Express app
// ts only likes import here 😩
import { RequestHandler, Request, Response, NextFunction } from "express"; 
const express = require('express');
const path = require('path');

// Slack API 
const { InstallProvider } = require('@slack/oauth');
const { createEventAdapter } = require('@slack/events-api');
const { WebClient } = require('@slack/web-api');

// Configures local environment
require('dotenv').config({path: path.resolve(__dirname, "../.env.local")})

// Create Express app
const app = express();
const port = process.env.PORT || 3009;

// Initialize slack events adapter
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET, {
  includeBody: true,
});

// Set path to receive events
app.use('/slack/events', slackEvents.requestListener());

// type declarations 
export type Method =
  | 'get'
  | 'head'
  | 'post'
  | 'put'
  | 'delete'
  | 'connect'
  | 'options'
  | 'trace'
  | 'patch';

export type Handler = (req: Request, res: Response, next?: NextFunction) => any; 

export type Route = {
  method: Method;
  path: string;
  middleware: RequestHandler[];
  handler: Handler;
};

export type StoreInstallInterface = {
  isEnterpriseInstall: boolean;
  enterprise: { id: string; };
  team: { id: string; };
}

export type InstallInterface = {
  isEnterpriseInstall: boolean;
  enterpriseId: string;
  teamId: string;
}

const installer = new InstallProvider({
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  authVersion: 'v2',
  stateSecret: 'my-state-secret',
  installationStore: {
    storeInstallation: async ({ isEnterpriseInstall, enterprise, team }: StoreInstallInterface) => {
      if (isEnterpriseInstall) {
        // storing org installation
        console.log("isEnterpriseInstall: ", enterprise.id)
        return;
        // return await keyv.set(installation.enterprise.id, installation);
      } else if (team !== null && team.id !== undefined) {
        // storing single team installation
        console.log("installation.team: ", team.id)
        return;
      }
      throw new Error('Failed saving installation data to installationStore');
    },
    fetchInstallation: async ({ isEnterpriseInstall, enterpriseId, teamId }: InstallInterface) => {
      if (isEnterpriseInstall) {
        if (enterpriseId !== undefined) {       
          // fetching org installation
          console.log("installQuery.enterpriseId", enterpriseId)
          return;
        }
      }
      if (teamId !== undefined) {
        // fetching single team installation
        console.log("teamId: ", teamId)
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

const handleHome: Handler = (req, res) => res.send('go to /slack/install')
const handleNgrokTestConnection: Handler = (req, res) => {
  res.send('ngrok tunnel is up and running! :rocket:');
}
const handleSlackInstall: Handler = async (req, res, next) => {
  try {
    // feel free to modify the scopes
    const url = await installer.generateInstallUrl({
      scopes: ['channels:read', 'groups:read', 'channels:manage', 'chat:write', 'incoming-webhook'],
      metadata: 'some_metadata',
    })

    res.send(`<a href=${url}><img alt=""Add to Slack"" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>`);
  } catch(error) {
    console.log(error)
  }
}
const handleOAuth: Handler = async(req, res) => await installer.handleCallback(req, res);

app.get('/', handleHome);
app.post('/ngrok', handleNgrokTestConnection);
app.get('/slack/install', handleSlackInstall);
// use default success and failure handlers
app.get('/oauth', handleOAuth);

slackEvents.on('message.channels', async(event: any, body: any) => {
  console.log(event)
})

// When a user navigates to the app home, grab the token from our database and publish a view
slackEvents.on('app_home_opened', async (event: any, body: any) => {
  try {
    const web = new WebClient(process.env.SLACK_BOT_USER_OAUTH_TOKEN );
    await web.views.publish({
      user_id: event.user,
      view: { 
        "type":"home",
        "blocks":[
          {
            "type": "section",
            "block_id": "section678",
            "text": {
              "type": "mrkdwn",
              "text": "Welcome to the App Home!"
            },
          }
        ]
      },
    });
  }
  catch (error) {
    console.error(error);
  }
});

app.listen(port, () => console.log(`app listening on http://localhost:${port}`))