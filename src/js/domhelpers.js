const toggleClasses = (els, toggleClass) => {
  els.forEach(el => el.classList.toggle(toggleClass));
};

export { toggleClasses };
