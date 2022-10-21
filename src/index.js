import './style.css';
import { movieList } from '../modules/homepage.js';
import Popup from '../modules/popup.js';
// eslint-disable-next-line import/no-named-as-default
import Involvement from '../modules/popupApi.js';

document.addEventListener('DOMContentLoaded', () => {
  movieList();
});

document.addEventListener('click', async (e) => {
  if (!e.target.matches('.commentBtn')) {
    return;
  }
  const { id } = e.target;
  const comList = await Involvement.getComments(id);
  const MoveInfo = await Popup.getInfos(id);
  await Popup.display(MoveInfo, id, comList);
  const overlay = document.querySelector('.overlay');
  const popup = document.querySelector('.popup');
  popup.classList.add('active');
  overlay.classList.add('active');
  Popup.displayCom(comList);
});

document.querySelector('.overlay').addEventListener('click', () => {
  const overlay = document.querySelector('.overlay');
  const popup = document.querySelector('.popup');
  popup.classList.remove('active');
  overlay.classList.remove('active');
});

document.addEventListener('click', async (e) => {
  if (!e.target.matches('.submit')) {
    return;
  }
  e.preventDefault();
  const name = document.getElementById('fname').value;
  const com = document.getElementById('comment').value;
  const { id } = e.target;
  await Involvement.postComments(id, name, com);
  const comList = await Involvement.getComments(id);
  Popup.displayCom(comList);
});
