// import upload input from dom and textarea
import { textArea, fileNameOutput } from './domcache';

const readFile = (file, callback) => {
  const reader = new FileReader();
  reader.onload = callback;
  reader.readAsText(file, 'UTF-8');
};

const setTextareaContent = ({ target }, name) => {
  textArea.value = target.result;
  fileNameOutput.innerHTML = `<span class="highlight">${name}</span> uploaded`;
};

const handleFileInput = file => {
  readFile(file, e => {
    setTextareaContent(e, file.name);
  });
};

export default handleFileInput;
