const { WebClient } = require('@slack/web-api');

export const handleAppHomeOpen = async (event: any, body: any) => {
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
};
