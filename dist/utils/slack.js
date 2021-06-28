"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slackInteractions = exports.slackEvents = void 0;
// Slack API 
const { createEventAdapter } = require('@slack/events-api');
const { createMessageAdapter } = require('@slack/interactive-messages');
exports.slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET, {
    includeBody: true,
});
exports.slackInteractions = createMessageAdapter(process.env.SLACK_SIGNING_SECRET);
//# sourceMappingURL=slack.js.map