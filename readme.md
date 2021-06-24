# Reddit Slackbot

![MIT License](https://img.shields.io/badge/License-MIT-green.svg)

## Start here :wave:

Sounded like a fun project and proof of concept. **Currently headed towards MVP** 🎆 

## Local Setup

This app runs locally on [ngrok](https://ngrok.com/download). Let's summarize what we will need to do to get started.

- [Set environmental variables](#set-environmental-variables)
- [Start ngrok server](#start-ngrok-server)
- [Start express app](#start-express-app)
- [Frequent reasons this process might fail](#frequent-reasons-this-process-might-fail)

### Set environmental variables

Create the `.env.local` file. We can start by renaming the `.env.example` to match the dotenv declaration. 

```sh
# rename .env.example to .env.local
mv .env.example .env.local
```

### Start ngrok server

```sh
~/ngrok http 3009
```

Once the ngrok server is online we will need to update the following URLs via https://api.slack.com/apps. _We are going to refer to `https://e6829b5713d5.ngrok.io` as the base URL for this example. Keep in mind you will be assigned a unique temporary ngrok URL when running the above command_

- [ ] **Features > OAuth & Permissions**
  - `https://e6829b5713d5.ngrok.io/oauth`
- [ ] **Features > Slash Commands**
  - `https://e6829b5713d5.ngrok.io/ngrok`
- [ ] **Features > Event Subscriptions > Request URL**
  - `https://e6829b5713d5.ngrok.io/slack/events`

### Start express app 

Now we are ready to set up our source code. Assuming we have **set our environmental variables** this should be a quick and painless process. 

```sh
# install project dependecies
npm install

# we ignore /dist by default
# let's build that
npm run build 

# start the express app
npm run start
```

At this point we should be presented with the standard `app listening on http://localhost:3009` message in the terminal. This is a great point to begin testing your Slack connections.

### Frequent reasons this process might fail

- **Your environmental variables aren't being read by dotenv.**  

Check out the [./lib/index.ts](./lib/index.ts) file and verify that your `.env.local` file matches the absolute pathing specificed in the `dotenv.config()` method.

```ts
const path = require('path');
// ...
// Configures local environment
require('dotenv').config({path: path.resolve(__dirname, "../.env.local")});

// DEBUGGING
console.log(path.resolve(__dirname, "../.env.local"));
```

- **Slack App is does not have required permissions**
- **Ngrok server shut down and needs to be restarted** 
By default the ngrok URL is active for 2 hours at which point it will automatically timeout. When we reset the ngrok server we will need to update the base URL as defined in the [Start ngrok server](#start-ngrok-server) section. 

This can be easily identify as the root issue to most unexpected errors. Be sure to keep an eye on your ngrok server throughout development.

## Contributing & more questions

Let's continue the conversation over on [Slack]() :)
