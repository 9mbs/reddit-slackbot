"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildHomeScreen = void 0;
exports.buildHomeScreen = {
    "type": "home",
    "blocks": [
        {
            "type": "header",
            "text": {
                "type": "plain_text",
                "text": "Reddit Slackbot"
            }
        },
        {
            "type": "actions",
            "elements": [
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "View on Github",
                        "emoji": true
                    },
                    "value": "view_on_github",
                    "url": "https://github.com/hi-matbub/reddit-slackbot",
                    "action_id": "view_on_github"
                },
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Report an issue",
                        "emoji": true
                    },
                    "value": "report_an_issue",
                    "url": "https://github.com/hi-matbub/reddit-slackbot/issues/new",
                    "action_id": "report_an_issue"
                }
            ]
        },
        {
            "type": "context",
            "elements": [
                {
                    "type": "plain_text",
                    "text": "Browse through hundreds of the most popular safe-for-work subreddits. This application is licensed under MIT. All 3rd party data is sourced directly from Reddit.",
                    "emoji": true
                }
            ]
        },
        {
            "type": "divider"
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "*Slash command*"
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "The Reddit Slackbot is a Slash command based app. To query the Reddit directory, open the messages tab and begin with the command `/reddit` and follow as prompted. Here's a few examples to help get you going. \n\n-`/reddit r/worldnews` will return the worldnews subreddit \n-`/reddit r/awww` will return the awww subreddit \n-`/reddit r/MadeMeSmile` will return the MadeMeSmile subreddit \n\nThese are just a few of today's Top Growing Communities. Go ahead and try it out. Also, I'd love your feedback on your experience here."
            }
        }
    ]
};
//# sourceMappingURL=buildHomeScreen.js.map