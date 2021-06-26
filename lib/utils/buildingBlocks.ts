import { BlockInterface } from '../_types';
import { timeSince } from './timeSince';

export const buildingBlocks = ({ introBlocks, data }: any) => {
  // init with incoming data
  let blocks = [...introBlocks];

  // limited to 50 blocks
  // we send 2 blocks per item
  const limit = data.children.splice(0, 10);

  // building dynamic blocks
  limit.forEach(({ data }: any) => {
    // Keeping it PG
    if (!data.over_18) {
      // Create a new JavaScript Date object based on the timestamp
      // multiplied by 1000 so that the argument is in milliseconds, not seconds.
      const currentDate = new Date();
      const dateCreated = new Date(data.created_utc * 1000);
      const cardTitle = `<https://reddit.com/r/${
        data.subreddit
      }/comments/${data.name.slice(3)}/${data.title
        .replace('-', '')
        .replace(/\s+/g, '_')
        .toLowerCase()}|*${data.title.replace(/[\d\w]{25}/, '...')}*>`;
      const cardAuthor = `<https://reddit.com/user/${
        data.author
      }|u/${data.author.replace(/[\d\w]{25}/, '...')}>`;
      // base card
      const card: BlockInterface = {
        type: 'section',
        block_id: `${data.subreddit}-${data.name}-${
          data.title.replace(/\s+/g, '_').toLowerCase() || ''
        }`,

        text: {
          type: 'mrkdwn',
          text: `${cardTitle}\n${cardAuthor} · ${timeSince(
            currentDate,
            dateCreated,
          )} · :thumbsup: ${data.score}${
            data.description != undefined
              ? '\n' + data.description.replace(/[\d\w]{25}/, '...')
              : ''
          }`,
        },
      };
      // optional thumbnail
      const thumbnail: {
        type: string;
        image_url: any;
        alt_text: any;
      } = {
        type: 'image',
        image_url: data.thumbnail,
        alt_text:
          data.title.length < 25
            ? data.title.replace(/[\d\w\W]{25}/, '...')
            : data.title,
      };

      // if thumbnail exists set card with image
      // else send text only
      data.thumbnail != undefined ? (card.accessory = thumbnail) : card;

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
