import './style.css';
import './modules/commentPopup.css';
import { movieList } from './modules/displayPage.js';
import { module } from './../node_modules/@webassemblyjs/ast/esm/nodes';

document.addEventListener('DOMContentLoaded', () => {
  movieList();
});
