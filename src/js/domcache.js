const tabsList = document.getElementById('tabslist');

// markup
const markupTab = document.getElementById('markup-tab');
const markupContent = document.getElementById('markup');
const form = document.getElementById('markup-form');
const textArea = document.getElementById('markup-input');
const uploadBtn = document.getElementById('upload-label');
const uploadInput = document.getElementById('markup-upload');
const fileNameOutput = document.getElementById('current-file');
const validateBtn = document.getElementById('harvest');

// results
const resultsTab = document.getElementById('results-tab');
const resultsContent = document.getElementById('results');
const noMarkupHeader = document.getElementById('nomarkup-h');
const linksHeader = document.getElementById('links-h');
const emailHeader = document.getElementById('email-h');

const linksOutput = document.getElementById('links');
const emailsOutput = document.getElementById('emails');

const noMarkupMsg = document.getElementById('nomarkup-msg');

export {
  tabsList,
  markupTab,
  markupContent,
  resultsTab,
  resultsContent,
  form,
  textArea,
  uploadBtn,
  fileNameOutput,
  uploadInput,
  validateBtn,
  linksOutput,
  emailsOutput,
  linksHeader,
  emailHeader,
  noMarkupHeader,
  noMarkupMsg
};
