import getHarvest from './harvester';
import * as els from './domcache';
import switchTab from './tabs';
import handleFileInput from './fileupload';
import '../scss/main.scss';

const createEmailMarkup = emailMatches =>
  emailMatches.map(email => `<li class="match">${email}</li>`).join('');

const createLinkMarkup = linkMatches =>
  linkMatches
    .map(
      link =>
        `<li class="match"><dl>
          <dt>Text</dt><dd>${link.text}</dd>
          <dt>URL</dt><dd>${link.url}</dd>
          </dl></li>`
    )
    .join('');

const displayMatches = ({ email, links }) => {
  if (email.length) {
    els.emailsOutput.innerHTML = createEmailMarkup(email);
  }

  if (links.length) {
    els.linksOutput.innerHTML = createLinkMarkup(links);
  }
};

const resetForm = () => {
  const msgs = createHeaderMsgs(true);

  els.linksOutput.innerHTML = '';
  els.emailsOutput.innerHTML = '';
  els.fileNameOutput.textContent = 'no file selected';

  updateResultsHeaders(msgs);
};

window.addEventListener('hashchange', e => {
  const hash = window.location.hash;

  if (hash.includes('markup')) {
    switchTab(els.markupTab, els.markupContent);
  } else if (hash.includes('results')) {
    switchTab(els.resultsTab, els.resultsContent);
  }
});

els.uploadBtn.addEventListener('click', () => {
  els.uploadInput.click();
});

els.uploadInput.addEventListener('change', e => {
  handleFileInput(e.target.files[0]);
});

const createHeaderMsgs = (reset, emails = 0, links = 0) => {
  const msgs = { email: '', link: '', noMk: '' };

  if (reset) {
    msgs.noMk = 'No Markup to Harvest';
  } else {
    msgs.email = `${emails} Harvested E-mail Links`;
    msgs.link = `${links} Harvested External Links`;
  }

  return msgs;
};

const updateResultsHeaders = ({ email, link, noMk }) => {
  els.emailHeader.textContent = email;
  els.linksHeader.textContent = link;
  els.noMarkupHeader.textContent = noMk;

  if (noMk === '') {
    els.noMarkupMsg.innerHTML = '';
  } else {
    els.noMarkupMsg.innerHTML = `To harvest markup for external links and linked e-mail addresses, go to the
        <a href="#markup-tab">markup tab</a> and upload a file or paste markup in the text field.`;
  }
};

els.form.addEventListener('submit', e => {
  e.preventDefault();

  const harvest = getHarvest(els.textArea.value.trim());
  const headerMsgs = createHeaderMsgs(
    false,
    harvest.email.length,
    harvest.links.length
  );

  updateResultsHeaders(headerMsgs);
  displayMatches(harvest);

  switchTab(els.resultsTab, els.resultsContent);
});

els.form.addEventListener('reset', resetForm);
