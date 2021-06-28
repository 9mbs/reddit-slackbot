export const buildQuery = ({ text }: { text: string }): string => {
  let url = 'https://www.reddit.com';

  // looks for `r/sub`
  const subreddit = /r\/[a-zA-Z\d_]+/;

  // if no match
  if (!subreddit.test(text)) {
    return (url += '/hot.json');
  }
  // if match is found
  else if (subreddit.test(text)) {
    const match = text.match(subreddit);

    // it shouldn't be, but just in case
    if (match === null) {
      return '/hot.json';
    }
    // e.g `/r/worldnews.json`
    return (url += `/${match[0]}.json`);
  }
  return (url += '/hot.json');
};
