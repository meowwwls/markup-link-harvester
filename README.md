# Markup Link Harvester

**[Demo Page](https://markuplinkharvester.netlify.com/)**

Extracts external links and e-email addresses from markup.

## Features

- Paste markup into a textarea or upload an HTML file to use as the source
- Tabbed layout where markup is in one tab and the results are in another
- When the form is submitted and the links are harvested, the view is automatically changed to the results tab

## Accessibility

- Keyboard accessible
- Uses `aria-live` so screenreader users can be updated when:
  - a file has been uploaded
  - the links have been harvested (whether there are results or not)
- Obvious focus styles to aid users navigating with their keyboard

## Uses

- Vanilla JavaScript (ES6)
- SCSS
- Jest for unit tests
- Parcel Bundler


