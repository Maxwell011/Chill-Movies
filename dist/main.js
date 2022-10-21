/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./modules/PopupApi.js":
/*!*****************************!*\
  !*** ./modules/PopupApi.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Involvement\": () => (/* binding */ Involvement),\n/* harmony export */   \"default\": () => (/* binding */ Involvement)\n/* harmony export */ });\n// eslint-disable-next-line import/prefer-default-export\r\nclass Involvement {\r\n  static postApp = async () => {\r\n    const response = await fetch(\r\n      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/',\r\n      {\r\n        method: 'POST',\r\n        headers: {\r\n          'Content-type': 'application/json; charset=UTF-8',\r\n        },\r\n      }\r\n    );\r\n    const data = await response.json();\r\n    return data;\r\n  };\r\n\r\n  static postComments = async (id, name, com) => {\r\n    await fetch(\r\n      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/HW8Zns3g7hE8XehtHEw6/comments',\r\n      {\r\n        method: 'POST',\r\n        body: JSON.stringify({\r\n          item_id: id,\r\n          username: name,\r\n          comment: com,\r\n        }),\r\n        headers: {\r\n          'Content-type': 'application/json; charset=UTF-8',\r\n        },\r\n      }\r\n    );\r\n  };\r\n\r\n  static getComments = async (id) => {\r\n    const response = await fetch(\r\n      `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/HW8Zns3g7hE8XehtHEw6/comments?item_id=${id}`\r\n    ).then((res) => res.json());\r\n    return response;\r\n  };\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://Kaban-Board/./modules/PopupApi.js?");

/***/ }),

/***/ "./modules/homepage.js":
/*!*****************************!*\
  !*** ./modules/homepage.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"movieApi\": () => (/* binding */ movieApi),\n/* harmony export */   \"movieList\": () => (/* binding */ movieList)\n/* harmony export */ });\n/* harmony import */ var _modules_likes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/likes.js */ \"./modules/likes.js\");\n\r\n\r\nconst movieApi = async () => {\r\n  const fetchResult = await fetch('https://api.tvmaze.com/shows');\r\n  const ShowResult = await fetchResult.json();\r\n  return ShowResult.slice(0, 10);\r\n};\r\n\r\nmovieApi();\r\n\r\nconst movieList = async () => {\r\n  const allMovies = await movieApi();\r\n  const likesApi = await (0,_modules_likes_js__WEBPACK_IMPORTED_MODULE_0__.LikeApi)();\r\n  allMovies.forEach((movie) => {\r\n    let cardLikes = likesApi.find((like) => like.item_id === movie.id);\r\n    const id = movie.id;\r\n    let liveCount = +cardLikes?.likes;\r\n\r\n    const moviesContainer = document.querySelector('.movies-container');\r\n    const movieUL = document.createElement('ul');\r\n    const movieLI = document.createElement('li');\r\n    movieLI.className = 'movie-cards';\r\n    movieLI.innerHTML = `<div>\r\n      <img src=${movie.image.original} alt=${movie.name}>\r\n      </div>\r\n      <a href=\"${movie.officialSite}\" class=\"movie-title\">${movie.name}</a>\r\n      <div class=\"movie-info\">\r\n        <p<i class=\"fa-solid fa-star\" id='rating'></i>${movie.rating.average}</p>\r\n        </div>\r\n        <i class=\"fa fa-heart\" aria-hidden=\"true\"></i>\r\n        <p class = \"totalLikes\">${liveCount} likes</p>\r\n        <button id = ${id} class = \"commentBtn\">Comments</button>`;\r\n\r\n    movieUL.appendChild(movieLI);\r\n    moviesContainer.appendChild(movieUL);\r\n\r\n    const likeButton = movieLI.getElementsByClassName('fa-heart')[0];\r\n    likeButton.addEventListener(\r\n      'click',\r\n      async (btn) => {\r\n        const liveCountElement =\r\n          movieLI.getElementsByClassName('totalLikes')[0];\r\n        liveCount += 1;\r\n        liveCountElement.innerHTML = `${liveCount} likes`;\r\n        (0,_modules_likes_js__WEBPACK_IMPORTED_MODULE_0__.NewLike)(id);\r\n        btn.disabled = true;\r\n        likeButton.style.color = 'red';\r\n      },\r\n      { once: true }\r\n    );\r\n  });\r\n};\r\n\r\n\r\n\n\n//# sourceURL=webpack://Kaban-Board/./modules/homepage.js?");

/***/ }),

/***/ "./modules/likes.js":
/*!**************************!*\
  !*** ./modules/likes.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"LikeApi\": () => (/* binding */ LikeApi),\n/* harmony export */   \"NewLike\": () => (/* binding */ NewLike)\n/* harmony export */ });\nconst tvId = 'HW8Zns3g7hE8XehtHEw6';\r\n\r\nconst LikeApi = async () => {\r\n  const getLike = await fetch(\r\n    `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${tvId}/likes`\r\n  ).then((res) => res.json());\r\n  return getLike;\r\n};\r\nLikeApi();\r\n\r\nconst NewLike = async (id) => {\r\n  const res = await fetch(\r\n    `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${tvId}/likes`,\r\n    {\r\n      method: 'POST',\r\n      body: JSON.stringify({\r\n        item_id: id,\r\n      }),\r\n      headers: {\r\n        'Content-type': 'application/json; charset=UTF-8',\r\n      },\r\n    }\r\n  );\r\n};\r\n\r\n\r\n\n\n//# sourceURL=webpack://Kaban-Board/./modules/likes.js?");

/***/ }),

/***/ "./modules/popup.js":
/*!**************************!*\
  !*** ./modules/popup.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Popup)\n/* harmony export */ });\nclass Popup {\r\n  static getInfos = async (id) => {\r\n    const movieInfo = await fetch(`https://api.tvmaze.com/shows/${id}`).then(\r\n      (result) => result.json()\r\n    );\r\n    return movieInfo;\r\n  };\r\n\r\n  static countComments = (len) => len.length;\r\n\r\n  static display = async (movieInfo, id, comList) => {\r\n    const mi = await movieInfo;\r\n    const arr = await comList;\r\n    const popup = document.querySelector('.popup');\r\n    popup.innerHTML = `  \r\n      <div class=\"description\">\r\n        <div class=\"D-description\">\r\n          <a href=\"${mi.network.officialSite}\"><img src=\"${\r\n          mi.image.medium }\" class = \"image\" id = \"movie-img\" alt=\"\"></a>\r\n          <div class = \"comments\">\r\n            <div class = \"form\" >\r\n              <label for=\"fname\">Name:</label><br>\r\n              <input type=\"text\" id=\"fname\" name=\"fname\" placeholder = \"Enter your name\"><br><br>\r\n              <label for=\"comment\">Comment:</label><br>\r\n              <textarea name=\"comment\" id=\"comment\" cols=\"20\" rows=\"3\" placeholder = \"Enter comment\"></textarea>\r\n              <input id = ${id} class= \"submit\" type=\"submit\" value=\"Submit\">\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class = \"summary-tag\">\r\n          <h1>${mi.name}</h1>\r\n          ${mi.summary}\r\n        </div>\r\n      </div>\r\n      <ul class = \"mInfo\">\r\n        <h1 class = \"remove tv_show\"> TV SHOW INFO</h1>\r\n        <li class = \"remove text_d\">\r\n        <a class=\"official_site\" href=\"${mi.network.officialSite}\"> \r\n        ${mi.network.name} <br>\r\n        </a> (${mi.premiered} - ${mi.ended})</li>\r\n        <li class = \"remove\"><b>Schedule</b>: ${mi.schedule.days[0]} at ${\r\n        mi.schedule.time} \r\n        (${mi.runtime}min)</li>\r\n        <li class = \"remove\"><b>Status</b>: ${mi.status}</li>\r\n        <li class = \"remove\"><b>Show Type:</b> ${mi.type}</li>\r\n        <li><b>Genres</b>: ${mi.genres}</li>\r\n        <li class = \"remove\"><b>Episodes Ordered</b> </li>\r\n        <li><b>language:</b>: ${mi.language}</li>\r\n        <li><b>Rating:</b>: ${mi.rating.average}</li>\r\n        <div class='show-comment'>\r\n          <h3 class = \"class-heading all-comments\"> All Comments (${this.countComments(\r\n            arr\r\n          )})</h3>\r\n          <ul class =\"D-comments\">\r\n          </ul>\r\n          \r\n        </div>\r\n      </ul>`;\r\n  };\r\n\r\n  static displayCom = async (MoveInfo) => {\r\n    const commentList = document.querySelector('.D-comments');\r\n    commentList.innerHTML = '';\r\n    const arr = await MoveInfo;\r\n    arr.forEach((item) => {\r\n      commentList.innerHTML += `<li class = \"listCom\">${item.username}: ${\r\n        item.comment\r\n      } <br> :${item.creation_date.slice(-5, -1)}</li>`;\r\n    });\r\n  };\r\n}\r\n\n\n//# sourceURL=webpack://Kaban-Board/./modules/popup.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n___CSS_LOADER_EXPORT___.push([module.id, \"@import url(https://fonts.googleapis.com/css2?family=Crete+Round&family=Inter:wght@400;500;600;700;800&family=Poppins&family=Roboto:wght@700&display=swap);\"]);\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"* {\\r\\n  margin: 0;\\r\\n  padding: 0;\\r\\n  box-sizing: border-box;\\r\\n}\\r\\n\\r\\nli {\\r\\n  list-style: none;\\r\\n}\\r\\n\\r\\na {\\r\\n  text-decoration: none;\\r\\n  color: #fff;\\r\\n}\\r\\n\\r\\n.nav {\\r\\n  display: flex;\\r\\n  flex-direction: row;\\r\\n  align-items: center;\\r\\n  justify-content: space-between;\\r\\n  padding: 0 20px;\\r\\n  background: #22242f;\\r\\n  height: 100px;\\r\\n}\\r\\n\\r\\nbody {\\r\\n  /* background-color: #27293d; */\\r\\n  color: #fff;\\r\\n  margin: 0;\\r\\n  padding: 0;\\r\\n  font-family: 'Poppins', sans-serif;\\r\\n}\\r\\n\\r\\n@media screen and (min-width: 768px) {\\r\\n  .mobile {\\r\\n    display: none;\\r\\n  }\\r\\n}\\r\\n\\r\\n.movie-title {\\r\\n  color: #fff;\\r\\n}\\r\\n\\r\\n.lists {\\r\\n  display: flex;\\r\\n  text-decoration: none;\\r\\n  font-size: 1.2rem;\\r\\n  padding-right: 20px;\\r\\n  gap: 30px;\\r\\n  color: rgb(255, 255, 255);\\r\\n}\\r\\n\\r\\n/* stylings for the display items */\\r\\n.movies-container {\\r\\n  display: flex;\\r\\n  flex-direction: row;\\r\\n  justify-content: center;\\r\\n  align-items: center;\\r\\n  flex-wrap: wrap;\\r\\n  width: 100%;\\r\\n  max-width: 2000px;\\r\\n  gap: 10px;\\r\\n  background: rgb(233, 233, 233);\\r\\n  padding: 20px;\\r\\n}\\r\\n\\r\\nh2 {\\r\\n  text-align: center;\\r\\n}\\r\\n\\r\\nimg {\\r\\n  width: 300px;\\r\\n  height: 350px;\\r\\n  border-radius: 5px;\\r\\n}\\r\\n\\r\\n.movie-cards {\\r\\n  padding: 10px;\\r\\n  border-radius: 5px;\\r\\n  margin: 0;\\r\\n  display: flex;\\r\\n  flex-direction: column;\\r\\n  align-items: center;\\r\\n  background-color: #22242f;\\r\\n  width: fit-content;\\r\\n  gap: 10px;\\r\\n}\\r\\n\\r\\n.movie-cards:hover {\\r\\n  box-shadow: 0 0 4px #747474ab;\\r\\n  cursor: pointer;\\r\\n}\\r\\n\\r\\n.movie-title {\\r\\n  text-align: center;\\r\\n  color: #464646;\\r\\n  font-weight: 700;\\r\\n  text-decoration: none;\\r\\n  font-size: 1.5rem;\\r\\n}\\r\\n\\r\\n.movie-info {\\r\\n  display: flex;\\r\\n  font-size: 12px;\\r\\n  justify-content: space-between;\\r\\n  flex-direction: column;\\r\\n}\\r\\n\\r\\n#rating {\\r\\n  color: #ffcd1b;\\r\\n  padding: 0.5em;\\r\\n  border: 1px solid #ffcd1b;\\r\\n  border-radius: 4px;\\r\\n}\\r\\n\\r\\n/* For mobile screens */\\r\\n@media screen and (max-width: 768px) {\\r\\n  .mobile {\\r\\n    /* color: wheat; */\\r\\n    color: white;\\r\\n    display: flex;\\r\\n    justify-content: space-between;\\r\\n    align-items: center;\\r\\n    margin-top: 10px;\\r\\n    margin-left: 30px;\\r\\n  }\\r\\n\\r\\n  .movies-container {\\r\\n    display: flex;\\r\\n    flex-direction: row;\\r\\n    flex-wrap: wrap;\\r\\n    width: 100%;\\r\\n    max-width: 1500px;\\r\\n  }\\r\\n\\r\\n  .nav-items {\\r\\n    display: none;\\r\\n  }\\r\\n\\r\\n  img {\\r\\n    width: 300px;\\r\\n    height: 400px;\\r\\n  }\\r\\n}\\r\\n\\r\\n@media screen and (min-width: 768px) {\\r\\n  .mobile {\\r\\n    display: none;\\r\\n  }\\r\\n}\\r\\n\\r\\nh1 {\\r\\n  color: wheat;\\r\\n}\\r\\n\\r\\nspan {\\r\\n  color: #000;\\r\\n}\\r\\n\\r\\nli {\\r\\n  list-style: none;\\r\\n}\\r\\n\\r\\na {\\r\\n  text-decoration: none;\\r\\n}\\r\\n\\r\\n.nav-items a {\\r\\n  color: wheat;\\r\\n  text-decoration: none;\\r\\n  font-size: 1.2rem;\\r\\n  padding-right: 20px;\\r\\n}\\r\\n\\r\\n/* stylings for the display items */\\r\\n.movies-container {\\r\\n  display: grid;\\r\\n  grid-template-columns: repeat(3, 1fr);\\r\\n  /* padding: 20px 0; */\\r\\n  /* padding-right: 20px; */\\r\\n\\r\\n  /* align-content: center; */\\r\\n  margin: auto;\\r\\n\\r\\n}\\r\\n\\r\\nh2 {\\r\\n  text-align: center;\\r\\n}\\r\\n\\r\\nimg {\\r\\n  width: 370px;\\r\\n  height: 500px;\\r\\n}\\r\\n\\r\\n.movie-title {\\r\\n  text-align: center;\\r\\n  color: #464646;\\r\\n  font-weight: 700;\\r\\n  text-decoration: none;\\r\\n  font-size: 1.5rem;\\r\\n}\\r\\n\\r\\n.movie-info {\\r\\n  display: flex;\\r\\n  align-items: center;\\r\\n  gap: 20px;\\r\\n}\\r\\n\\r\\nbutton {\\r\\n  padding: 8px;\\r\\n  background-color: beige;\\r\\n  border: 1px solid #ffcd1b;\\r\\n  border-radius: 6px;\\r\\n  font-size: 1.2rem;\\r\\n  cursor: pointer;\\r\\n}\\r\\n\\r\\nbutton:hover {\\r\\n  background-color: wheat;\\r\\n}\\r\\n\\r\\nbutton:active {\\r\\n  background-color: brown;\\r\\n  color: #fff;\\r\\n}\\r\\n\\r\\n.fa {\\r\\n  cursor: pointer;\\r\\n}\\r\\n\\r\\n.fa:hover {\\r\\n  color: red;\\r\\n}\\r\\n\\r\\n.description {\\r\\n  display: flex;\\r\\n  flex-direction: row;\\r\\n  flex: 2;\\r\\n  gap: 30px;\\r\\n}\\r\\n\\r\\n.comments {\\r\\n  display: flex;\\r\\n  gap: 25px;\\r\\n}\\r\\n\\r\\n.mInfo {\\r\\n  flex: 1;\\r\\n  display: flex;\\r\\n  flex-direction: column;\\r\\n  background-color: #f7f7f7;\\r\\n  border-style: solid;\\r\\n  border-width: 1px;\\r\\n  padding: 10px;\\r\\n  border-color: #22242f;\\r\\n  /* align-items: center; */\\r\\n}\\r\\n\\r\\n.D-description {\\r\\n  display: block;\\r\\n  gap: 20px;\\r\\n}\\r\\n\\r\\n.all-comments {\\r\\n  text-align: center;\\r\\n}\\r\\n\\r\\n.official_site {\\r\\n  color: #000;\\r\\n  font-weight: 700;\\r\\n}\\r\\n\\r\\n#comment {\\r\\n  display: block;\\r\\n  outline: 0;\\r\\n  width: 15rem;\\r\\n  padding: 10px;\\r\\n  border: 1px solid brown;\\r\\n  border-radius: 4px;\\r\\n}\\r\\n\\r\\n.popup {\\r\\n  transition: 200ms ease-in-out;\\r\\n  position: fixed;\\r\\n  left: 50%;\\r\\n  top: 50%;\\r\\n  transform: translate(-50%, -50%) scale(0);\\r\\n  width: 80%;\\r\\n  height: 99%;\\r\\n  padding: 2%;\\r\\n  display: flex;\\r\\n  background-color: white;\\r\\n  z-index: 10;\\r\\n  color: #000;\\r\\n  border-radius: 5px;\\r\\n}\\r\\n\\r\\n.summary-tag h1 {\\r\\n  color: brown;\\r\\n  padding: 0;\\r\\n  margin: 0;\\r\\n}\\r\\n\\r\\n.summary-tag {\\r\\n  margin-right: 20px;\\r\\n  text-align: justify;\\r\\n}\\r\\n\\r\\n.image {\\r\\n  width: 250px;\\r\\n  height: 370px;\\r\\n}\\r\\n\\r\\n.popup.active {\\r\\n  transform: translate(-50%, -50%) scale(1);\\r\\n}\\r\\n\\r\\n.overlay {\\r\\n  transition: 200ms ease-in-out;\\r\\n  position: fixed;\\r\\n  opacity: 0;\\r\\n  left: 0;\\r\\n  top: 0;\\r\\n  right: 0;\\r\\n  bottom: 0;\\r\\n  background-color: rgba(0, 0, 0, 0.6);\\r\\n  pointer-events: none;\\r\\n}\\r\\n\\r\\n.overlay.active {\\r\\n  opacity: 1;\\r\\n  pointer-events: all;\\r\\n}\\r\\n\\r\\n#fname {\\r\\n  outline: 0;\\r\\n  width: 15rem;\\r\\n  padding: 10px;\\r\\n  border: 1px solid brown;\\r\\n  border-radius: 4px;\\r\\n}\\r\\n\\r\\nh3 {\\r\\n  margin-left: 33px;\\r\\n}\\r\\n\\r\\n.summary {\\r\\n  height: 200px;\\r\\n  overflow-x: scroll;\\r\\n}\\r\\n\\r\\n.submit {\\r\\n  width: 100%;\\r\\n  padding: 7px;\\r\\n  background-color: beige;\\r\\n  border: 1px solid brown;\\r\\n  border-radius: 5px;\\r\\n  font-size: 1rem;\\r\\n  cursor: pointer;\\r\\n  margin-top: 10px;\\r\\n}\\r\\n\\r\\n.submit:hover {\\r\\n  background-color: bisque;\\r\\n}\\r\\n\\r\\n.submit:active {\\r\\n  background-color: brown;\\r\\n  color: #fff;\\r\\n}\\r\\n\\r\\n.text_d {\\r\\n  color: rgb(0, 0, 0);\\r\\n  text-align: center;\\r\\n  margin-bottom: 5px;\\r\\n}\\r\\n\\r\\n.D-comments {\\r\\n  height: 250px;\\r\\n  gap: 10px;\\r\\n  overflow: scroll;\\r\\n}\\r\\n\\r\\n.tv_show {\\r\\n  color: brown;\\r\\n  text-align: center;\\r\\n}\\r\\n\\r\\n/* For mobile screens */\\r\\n@media screen and (max-width: 768px) {\\r\\n  .mobile {\\r\\n    color: wheat;\\r\\n    display: flex;\\r\\n    justify-content: space-between;\\r\\n    align-items: center;\\r\\n    margin-top: 10px;\\r\\n    margin-left: 30px;\\r\\n  }\\r\\n\\r\\n  .card-container {\\r\\n    display: block;\\r\\n    margin: auto;\\r\\n  }\\r\\n\\r\\n  .nav-items {\\r\\n    display: none;\\r\\n  }\\r\\n\\r\\n  img {\\r\\n    width: 300px;\\r\\n    height: 400px;\\r\\n  }\\r\\n\\r\\n  #movie-img {\\r\\n    width: 130px;\\r\\n    height: 200px;\\r\\n  }\\r\\n\\r\\n  .summary-tag {\\r\\n    display: none;\\r\\n  }\\r\\n\\r\\n  #fname {\\r\\n    outline: 0;\\r\\n    width: 8rem;\\r\\n    border: 1px solid brown;\\r\\n    border-width: 0 0 1px;\\r\\n  }\\r\\n\\r\\n  #comment {\\r\\n    outline: 0;\\r\\n    width: 8rem;\\r\\n    height: 2.5rem;\\r\\n    padding-bottom: 0;\\r\\n    border-width: 0 0 1px;\\r\\n    transition: all 0.5s ease-in-out;\\r\\n  }\\r\\n\\r\\n  #comment::placeholder {\\r\\n    padding: 0;\\r\\n    font-family: 'Inter', sans-serif;\\r\\n  }\\r\\n\\r\\n  .remove {\\r\\n    display: none;\\r\\n    color: black;\\r\\n  }\\r\\n\\r\\n  .mInfo {\\r\\n    padding: 0;\\r\\n    margin-left: 10px;\\r\\n    display: flex;\\r\\n    flex-direction: column;\\r\\n  }\\r\\n\\r\\n  .description {\\r\\n    flex: none;\\r\\n  }\\r\\n\\r\\n  .D-comments {\\r\\n    overflow-y: scroll;\\r\\n    max-height: 250px;\\r\\n    max-width: 300px;\\r\\n    margin: 0;\\r\\n    padding: 10px;\\r\\n    transform: translateX(0);\\r\\n    cursor: grab;\\r\\n    font-size: 0.7rem;\\r\\n  }\\r\\n\\r\\n  .class-heading {\\r\\n    font-size: 0.8rem;\\r\\n    margin: 0;\\r\\n    padding: 10px;\\r\\n    text-align: center;\\r\\n  }\\r\\n\\r\\n  .D-comments > li:nth-child(odd) {\\r\\n    background-color: grey;\\r\\n    color: #fff;\\r\\n  }\\r\\n\\r\\n  .listCom {\\r\\n    padding: 3px 10px;\\r\\n    display: flex;\\r\\n    flex-direction: column;\\r\\n    justify-content: space-evenly;\\r\\n  }\\r\\n}\\r\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://Kaban-Board/./src/style.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n\n      content += cssWithMappingToString(item);\n\n      if (needLayer) {\n        content += \"}\";\n      }\n\n      if (item[2]) {\n        content += \"}\";\n      }\n\n      if (item[4]) {\n        content += \"}\";\n      }\n\n      return content;\n    }).join(\"\");\n  }; // import a list of modules into the list\n\n\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://Kaban-Board/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://Kaban-Board/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ \"./node_modules/css-loader/dist/cjs.js!./src/style.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://Kaban-Board/./src/style.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n\n  return updater;\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://Kaban-Board/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n/* istanbul ignore next  */\n\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n\n    memo[target] = styleTarget;\n  }\n\n  return memo[target];\n}\n/* istanbul ignore next  */\n\n\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n\n  target.appendChild(style);\n}\n\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://Kaban-Board/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\n\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://Kaban-Board/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\n\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://Kaban-Board/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n\n  var needLayer = typeof obj.layer !== \"undefined\";\n\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n\n  css += obj.css;\n\n  if (needLayer) {\n    css += \"}\";\n  }\n\n  if (obj.media) {\n    css += \"}\";\n  }\n\n  if (obj.supports) {\n    css += \"}\";\n  }\n\n  var sourceMap = obj.sourceMap;\n\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  options.styleTagTransform(css, styleElement, options.options);\n}\n\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n\n  styleElement.parentNode.removeChild(styleElement);\n}\n/* istanbul ignore next  */\n\n\nfunction domAPI(options) {\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\n\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://Kaban-Board/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\n\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://Kaban-Board/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n/* harmony import */ var _modules_homepage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/homepage.js */ \"./modules/homepage.js\");\n/* harmony import */ var _modules_popup_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/popup.js */ \"./modules/popup.js\");\n/* harmony import */ var _modules_PopupApi_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modules/PopupApi.js */ \"./modules/PopupApi.js\");\n\r\n\r\n\r\n\r\n\r\ndocument.addEventListener('DOMContentLoaded', () => {\r\n  (0,_modules_homepage_js__WEBPACK_IMPORTED_MODULE_1__.movieList)();\r\n});\r\n\r\ndocument.addEventListener('click', async (e) => {\r\n  if (!e.target.matches('.commentBtn')) {\r\n    return;\r\n  }\r\n  const { id } = e.target;\r\n  const comList = await _modules_PopupApi_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getComments(id);\r\n  const MoveInfo = await _modules_popup_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getInfos(id);\r\n  await _modules_popup_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].display(MoveInfo, id, comList);\r\n  const overlay = document.querySelector('.overlay');\r\n  const popup = document.querySelector('.popup');\r\n  popup.classList.add('active');\r\n  overlay.classList.add('active');\r\n  _modules_popup_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].displayCom(comList);\r\n});\r\n\r\ndocument.querySelector('.overlay').addEventListener('click', () => {\r\n  const overlay = document.querySelector('.overlay');\r\n  const popup = document.querySelector('.popup');\r\n  popup.classList.remove('active');\r\n  overlay.classList.remove('active');\r\n});\r\n\r\ndocument.addEventListener('click', async (e) => {\r\n  if (!e.target.matches('.submit')) {\r\n    return;\r\n  }\r\n  e.preventDefault();\r\n  const name = document.getElementById('fname').value;\r\n  const com = document.getElementById('comment').value;\r\n  const { id } = e.target;\r\n  await _modules_PopupApi_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].postComments(id, name, com);\r\n  const comList = await _modules_PopupApi_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getComments(id);\r\n  _modules_popup_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].displayCom(comList);\r\n});\r\n\n\n//# sourceURL=webpack://Kaban-Board/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;