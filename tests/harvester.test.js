import getHarvest from '../src/js/harvester';

describe('getHarvest', () => {
  describe('given an empty string', () => {
    test('returns two empty arrays', () => {
      expect(getHarvest('').email).toEqual([]);
      expect(getHarvest('').links).toEqual([]);
    });
  });

  describe('given a string with no external links and some email links', () => {
    test('returns empty links array and email array with matches', () => {
      const str = '<a href="mailto:me@me.com">email me</a>';
      expect(getHarvest(str).email).toEqual(['me@me.com']);
      expect(getHarvest(str).links).toEqual([]);
    });
  });

  describe('given a string with duplicate url/text matches', () => {
    test('returns only one of the matches', () => {
      const str = `<a href="https://mysite.com/about">About Me</a>
                   <div>some other stuff</div>
                   <a href="https://mysite.com/about">About Me</a>`;

      const str2 = `<a href="https://mysite.com/about">About Me</a>
                   <div>some other stuff</div>
                   <a href="https://mysite.com/ABOUT">ABOUT ME</a>`;

      expect(getHarvest(str).links).toEqual([
        { url: 'https://mysite.com/about', text: 'About Me' }
      ]);
      expect(getHarvest(str2).links).toEqual([
        { url: 'https://mysite.com/about', text: 'About Me' }
      ]);
    });
  });
});
