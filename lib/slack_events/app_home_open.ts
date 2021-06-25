import { homeObject } from "../utils/homeObject";

const { WebClient } = require('@slack/web-api');

export const handleAppHomeOpen = async (event: any, body: any) => {
  try {
    const web = new WebClient(process.env.SLACK_BOT_USER_OAUTH_TOKEN );
    await web.views.publish({
      user_id: event.user,
      view: homeObject
    });
  }
  catch (error) {
    console.error(error);
  }
};
