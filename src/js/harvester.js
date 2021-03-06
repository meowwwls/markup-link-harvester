// matches external links in markup and their link text, if any
const linkPattern = /(?:href=['"])(http[s]?:\/\/(?:w{3}.)?[^-]?(?:[a-z\d-]{2,67})\.[a-z]{2,}(?:\.\w{2,})?[^"']*)(["'][^>]*>)([^<]+(?=<\/a>))/gi;
// matches email addresses linked to in markup
const emailPattern = /\b(?:mailto:)?([^@\."'><]+@[a-z0-9]{2,67}\.[a-z]{2,}(\.[a-z]{2,})?)\b/gi;

// returns an array of matches or an empty array
const getMatches = (input, pattern) => {
  if (typeof input !== 'string' || !pattern) return [];

  const matches = [];
  let match;

  while ((match = pattern.exec(input)) !== null) {
    if (pattern === emailPattern) {
      if (!matches.includes(match[1])) {
        matches.push(match[1]);
      }
    } else {
      // filter out duplicate links and text (duplicate URLS are fine but not with the same text)
      if (
        matches.findIndex(
          item =>
            item[1].toLowerCase() === match[1].toLowerCase() &&
            item[3].toLowerCase() === match[3].toLowerCase()
        ) === -1
      ) {
        matches.push(match);
      }
    }
  }

  return matches;
};

const getLinks = input => {
  const rawLinks = getMatches(input, linkPattern);

  return rawLinks.map(link => ({
    url: link[1],
    text: link[3] || ''
  }));
};

const getHarvest = input => {
  const links = getLinks(input);
  const email = getMatches(input, emailPattern);

  return {
    links,
    email
  };
};

export default getHarvest;
