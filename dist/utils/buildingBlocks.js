"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildingBlocks = void 0;
const timeSince_1 = require("./timeSince");
const buildingBlocks = ({ introBlocks, data }) => {
    // init with incoming data
    let blocks = [...introBlocks];
    // limited to 50 blocks
    // we send 2 blocks per item
    const limit = data.children.splice(0, 10);
    // building dynamic blocks
    limit.forEach(({ data }) => {
        // Keeping it PG
        if (!data.over_18) {
            // Create a new JavaScript Date object based on the timestamp
            // multiplied by 1000 so that the argument is in milliseconds, not seconds.
            const currentDate = new Date();
            const dateCreated = new Date(data.created_utc * 1000);
            const viewOnReddit = `https://reddit.com/r/${data.subreddit}/comments/${data.name.slice(3)}/${data.title
                .replace('-', '')
                .replace(/\s+/g, '_')
                .toLowerCase()}`;
            const cardAuthor = `https://reddit.com/user/${data.author}`;
            let text = "";
            // slack limits to 3001 chars
            // if description is longer than 268 chars truncate
            if (data.selftext.length > 268) {
                const truncate = data.selftext.slice(0, 268);
                text += truncate + "...";
            }
            else {
                text += data.selftext;
            }
            ;
            // base card
            const cardInfo = {
                type: 'section',
                block_id: `${data.subreddit}-${data.name}-${data.title.replace(/\s+/g, '_').toLowerCase().slice(0, 20) || ''}`,
                text: {
                    type: 'mrkdwn',
                    text: `*${data.title.replace(/[\d\w]{25}/, '...')}*\nu/${data.author.replace(/[\d\w]{25}/, '...')} · ${timeSince_1.timeSince(currentDate, dateCreated)} · :thumbsup: ${data.score}`,
                },
                "accessory": {
                    "type": "overflow",
                    "options": [
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "View Post on Reddit",
                                "emoji": true
                            },
                            "value": "view_on_reddit",
                            "url": viewOnReddit,
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "View Author on Reddit",
                                "emoji": true
                            },
                            "value": "change_response",
                            "url": cardAuthor,
                        },
                    ]
                }
            };
            const card = {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `${data.url_overridden_by_dest === undefined
                        ? '\n\n' + text
                        : '\n\n' + data.url_overridden_by_dest}`
                },
            };
            // optional thumbnail
            const thumbnail = {
                type: 'image',
                image_url: data.thumbnail,
                alt_text: data.title.length < 25
                    ? data.title.replace(/[\d\w\W]{25}/, '...')
                    : data.title,
            };
            // if thumbnail exists set card with image
            // else send text only
            data.thumbnail === "" ? card : (card.accessory = thumbnail);
            blocks.push(cardInfo);
            // push UI component
            blocks.push(card);
            // push divider
            blocks.push({
                type: 'divider',
            });
        }
    });
    return blocks;
};
exports.buildingBlocks = buildingBlocks;
// {
//   "type": "section",
//   "text": {
//     "type": "mrkdwn",
//     "text": "*Team Lunch (Internal)*\nCost: *$85.50USD*\nDate: *10/16/2019*\nService Provider: *Honest Sandwiches*  \nExpense no. *<fakelink.toUrl.com|#1797PD>*"
//   },
//   "accessory": {
//     "type": "image",
//     "image_url": "https://api.slack.com/img/blocks/bkb_template_images/creditcard.png",
//     "alt_text": "credit card"
//   }
// },
// `\n${cardAuthor} · ${timeSince(
//   currentDate,
//   dateCreated,
// )} · :thumbsup: ${data.score}
// // ${
//   data.url_overridden_by_dest === undefined
//     ? '\n\n' + text
//     : '\n\n' + data.url_overridden_by_dest
//   // ? '\n' + data.selftext.replace(/[\d\w]{25}/, '...')
// }`
//# sourceMappingURL=buildingBlocks.js.map