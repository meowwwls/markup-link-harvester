// need to import els from dom: tabs and tab content
import {
  tabsList,
  markupTab,
  markupContent,
  resultsTab,
  resultsContent
} from './domcache';
import { toggleClasses } from './domhelpers';

// markup by default
let currentTab = markupTab;
let currentContent = markupContent;

// set up tab state when JS loads
const setInitialState = ((tabs, content) => {
  tabsList.setAttribute('role', 'tablist');

  tabs.forEach((tab, i) => {
    const index = i;

    tab.parentNode.setAttribute('role', 'presentation');
    tab.setAttribute('role', 'tab');

    content[i].setAttribute('role', 'tabpanel');
    content[i].setAttribute('aria-labelledby', tabs[i].id);

    if (i === 0) {
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      content[0].classList.add('active');
    } else {
      tab.setAttribute('tabindex', '-1');
      content[i].hidden = true;
    }

    tab.addEventListener('click', e => {
      const hash = e.currentTarget.id;

      e.preventDefault();

      if (currentTab !== e.currentTarget) {
        switchTab(e.currentTarget, content[index]);
        window.location.hash = hash;
      }
    });

    tab.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight' && index === 0) {
        switchTab(tabs[1], content[1]);
      } else if (e.key === 'ArrowLeft' && index === 1) {
        switchTab(tabs[0], content[0]);
      } else if (e.key === 'ArrowDown') {
        content[index].setAttribute('tabindex', '0');
        content[index].focus();
      }
    });
  });
})([markupTab, resultsTab], [markupContent, resultsContent]);

const toggleTabA11y = (newTab, newContent) => {
  currentTab.setAttribute('tabindex', '-1');
  currentTab.removeAttribute('aria-selected');
  currentContent.hidden = true;
  currentContent.hasAttribute('tabindex') &&
    currentContent.removeAttribute('tabindex');

  newContent.removeAttribute('hidden');
  newTab.removeAttribute('tabindex');
  newTab.setAttribute('aria-selected', 'true');
  newTab.focus();
};

const switchTab = (...args) => {
  const [newTab, newContent] = args;
  toggleClasses([newTab, newContent, currentTab, currentContent], 'active');
  toggleTabA11y(newTab, newContent);

  currentTab = newTab;
  currentContent = newContent;
};

export default switchTab;
