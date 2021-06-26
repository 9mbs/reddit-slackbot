// Giant static object :grimacing:
// https://app.slack.com/block-kit-builder
// import { subreddits } from './subreddits';

// const handleSubReddits = () => {
//   let subs: {
//     text: { type: string; text: string; emoji: boolean };
//     value: string;
//   }[] = [];

//   subreddits.map((sub: string) =>
//     subs.push({
//       text: {
//         type: 'plain_text',
//         text: sub,
//         emoji: true,
//       },
//       value: sub,
//     }),
//   );

//   return subs;
// };

export const homeObject = {
  type: 'home',
  callback_id: 'home_view',
  blocks: [
    // Intro & More Options ...
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: "*Query Reddit* \nI'm open source :wave:",
      },
      accessory: {
        type: 'overflow',
        options: [
          {
            text: {
              type: 'plain_text',
              text: 'Contribute',
              emoji: true,
            },
            value: 'contribute-value-0',
          },
          {
            text: {
              type: 'plain_text',
              text: 'Learn more',
              emoji: true,
            },
            value: 'value-1',
          },
          {
            text: {
              type: 'plain_text',
              text: 'Report an issue',
              emoji: true,
            },
            value: 'value-2',
          },
        ],
        action_id: 'overflow-action',
      },
    },
    // breif intro
    {
      type: 'context',
      elements: [
        {
          type: 'plain_text',
          text: 'Browse through hundreds of the most popular safe-for-work subreddits. This application is licensed under MIT. All 3rd party data is sourced directly from Reddit.',
          emoji: true,
        },
      ],
    },
    {
      type: 'actions',
      elements: [
        // {
        //   type: 'static_select',
        //   placeholder: {
        //     type: 'plain_text',
        //     text: 'r/memes',
        //     emoji: true,
        //   },
        //   options: handleSubReddits(),
        // },
        {
          type: 'static_select',
          placeholder: {
            type: 'plain_text',
            text: 'Hot',
            emoji: true,
          },
          options: [
            {
              text: {
                type: 'plain_text',
                text: 'Hot',
                emoji: true,
              },
              value: 'hot',
            },
            {
              text: {
                type: 'plain_text',
                text: 'New',
                emoji: true,
              },
              value: 'hot',
            },
            {
              text: {
                type: 'plain_text',
                text: 'Controversial',
                emoji: true,
              },
              value: 'controversial',
            },
            {
              text: {
                type: 'plain_text',
                text: 'Rising',
                emoji: true,
              },
              value: 'rising',
            },
            {
              text: {
                type: 'plain_text',
                text: 'Top - all time',
                emoji: true,
              },
              value: 'top-all-time',
            },
            {
              text: {
                type: 'plain_text',
                text: 'Top - past year',
                emoji: true,
              },
              value: 'top-past-year',
            },
            {
              text: {
                type: 'plain_text',
                text: 'Top - past month',
                emoji: true,
              },
              value: 'top-past-month',
            },
            {
              text: {
                type: 'plain_text',
                text: 'Top - past week',
                emoji: true,
              },
              value: 'top-past-week',
            },
            {
              text: {
                type: 'plain_text',
                text: 'Top - past 24 hours',
                emoji: true,
              },
              value: 'top-past-24-hours',
            },
            {
              text: {
                type: 'plain_text',
                text: 'Top - past hour',
                emoji: true,
              },
              value: 'top-past-hour',
            },
          ],
        },
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Refresh :repeat:',
            emoji: true,
          },
          value: 'help',
        },
      ],
    },
    {
      type: 'divider',
    },
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: 'r/memes',
        emoji: true,
      },
    },
    {
      type: 'section',
      block_id: 'section567',
      text: {
        type: 'mrkdwn',
        text: "*You won't believe how cute this cat is*\n_u/cat_fan · 2 Hours ago_ · :thumbsup: 1638 \n The sticky rice also goes wonderfully with the caramelized pork belly, which is absolutely melt-in-your-mouth and so soft.",
      },
      accessory: {
        type: 'image',
        image_url:
          'https://pbs.twimg.com/profile_images/625633822235693056/lNGUneLX_400x400.jpg',
        alt_text: 'cute cat',
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: "*You won't believe how cute this dog is*\n_u/dog_fan · 2 Hours ago_ · :thumbsup: 1638 \n The sticky rice also goes wonderfully with the caramelized pork belly, which is absolutely melt-in-your-mouth and so soft.",
      },
    },
  ],
};
