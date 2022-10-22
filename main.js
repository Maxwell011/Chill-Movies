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

/***/ "./modules/homepage.js":
/*!*****************************!*\
  !*** ./modules/homepage.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"contCount\": () => (/* binding */ contCount),\n/* harmony export */   \"movieApi\": () => (/* binding */ movieApi),\n/* harmony export */   \"movieList\": () => (/* binding */ movieList)\n/* harmony export */ });\n/* harmony import */ var _likes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./likes.js */ \"./modules/likes.js\");\n\n\nconst movieApi = async () => {\n  const fetchResult = await fetch('https://api.tvmaze.com/shows');\n  const ShowResult = await fetchResult.json();\n  return ShowResult.slice(0, 16);\n};\n\nwindow.onload = movieApi();\n\nconst contCount = (arr) => arr.length;\n\nconst movieList = async () => {\n  const allMovies = await movieApi();\n  const likesApi = await (0,_likes_js__WEBPACK_IMPORTED_MODULE_0__.LikeApi)();\n  const movieLength = document.querySelector('.movielength');\n  movieLength.innerText = `(${contCount(allMovies)})`;\n  allMovies.forEach((movie) => {\n    const cardLikes = likesApi.find((like) => like.item_id === movie.id);\n    const { id } = movie;\n    let liveCount = +cardLikes?.likes;\n\n    const moviesContainer = document.querySelector('.movies-container');\n    const movieUL = document.createElement('ul');\n    const movieLI = document.createElement('li');\n    movieLI.className = 'movie-cards';\n    movieLI.innerHTML = `<div>\n      <img src=${movie.image.original} alt=${movie.name}>\n      </div>\n      <a href=\"${movie.officialSite}\" class=\"movie-title\">${movie.name}</a>\n      <div class=\"movie-info\">\n        <p<i class=\"fa-solid fa-star\" id='rating'></i>${movie.rating.average}</p>\n        </div>\n        <i class=\"fa fa-heart\" aria-hidden=\"true\"></i>\n        <p class = \"totalLikes\">${liveCount} likes</p>\n        <button id = ${id} class = \"commentBtn\">Comments</button>`;\n\n    movieUL.appendChild(movieLI);\n    moviesContainer.appendChild(movieUL);\n\n    const likeButton = movieLI.getElementsByClassName('fa-heart')[0];\n    likeButton.addEventListener(\n      'click',\n      async (btn) => {\n        const liveCountElement = movieLI.getElementsByClassName('totalLikes')[0];\n        liveCount += 1;\n        liveCountElement.innerHTML = `${liveCount} likes`;\n        (0,_likes_js__WEBPACK_IMPORTED_MODULE_0__.NewLike)(id);\n        btn.disabled = true;\n        likeButton.style.color = 'red';\n      },\n      { once: true },\n    );\n  });\n};\n\n\n\n\n//# sourceURL=webpack://kabanboard/./modules/homepage.js?");

/***/ }),

/***/ "./modules/likes.js":
/*!**************************!*\
  !*** ./modules/likes.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"LikeApi\": () => (/* binding */ LikeApi),\n/* harmony export */   \"NewLike\": () => (/* binding */ NewLike)\n/* harmony export */ });\nconst tvId = 'HW8Zns3g7hE8XehtHEw6';\n\nconst LikeApi = async () => {\n  const getLike = await fetch(\n    `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${tvId}/likes`,\n  ).then((res) => res.json());\n  return getLike;\n};\nLikeApi();\n\nconst NewLike = async (id) => {\n  // eslint-disable-next-line no-unused-vars\n  const res = await fetch(\n    `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${tvId}/likes`,\n    {\n      method: 'POST',\n      body: JSON.stringify({\n        item_id: id,\n      }),\n      headers: {\n        'Content-type': 'application/json; charset=UTF-8',\n      },\n    },\n  );\n};\n\n\n\n\n//# sourceURL=webpack://kabanboard/./modules/likes.js?");

/***/ }),

/***/ "./modules/popup.js":
/*!**************************!*\
  !*** ./modules/popup.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Popup)\n/* harmony export */ });\nclass Popup {\n  static getInfos = async (id) => {\n    const movieInfo = await fetch(`https://api.tvmaze.com/shows/${id}`).then(\n      (result) => result.json(),\n    );\n    return movieInfo;\n  };\n\n  static countComments = (len) => {\n    const commentLength = len?.length;\n    const element = document.getElementById('comments-length');\n    if (element) {\n      element.innerHTML = `All comments ${commentLength}`;\n    }\n  };\n\n  static display = async (movieInfo, id, comList) => {\n    const mi = await movieInfo;\n    const arr = await comList;\n\n    const popup = document.querySelector('.popup');\n    popup.innerHTML = `  \n      <div class=\"description\">\n        <div class=\"D-description\">\n          <img src=\"${\n            movieInfo.image.medium\n          }\" class = \"image\" id = \"movie-img\" alt=\"\">\n          <div class = \"comments\">\n            <div class = \"form\" >\n              <label for=\"fname\">Name:</label><br>\n              <input type=\"text\" id=\"fname\" name=\"fname\" placeholder = \"Enter your name\"><br><br>\n              <label for=\"comment\">Comment:</label><br>\n              <textarea name=\"comment\" id=\"comment\" cols=\"20\" rows=\"3\" placeholder = \"Enter comment\"></textarea>\n              <input id = ${id} class= \"submit\" type=\"submit\" value=\"Submit\">\n            </div>\n          </div>\n        </div>\n        <div class = \"summary-tag\">\n          <h1>${mi.name}</h1>\n          ${mi.summary}\n        </div>\n      </div>\n      <ul class = \"mInfo\">\n        <h1 class = \"remove tv_show\"> TV SHOW INFO</h1>\n        <li class = \"remove text_d\">\n        <a class=\"official_site\" href=\"${mi.network.officialSite}\"> \n        ${mi.network.name} <br>\n        </a> (${mi.premiered} - ${mi.ended})</li>\n        <li class = \"remove\"><b>Schedule</b>: ${mi.schedule.days[0]} at ${\n            mi.schedule.time\n          } \n        (${mi.runtime}min)</li>\n        <li class = \"remove\"><b>Status</b>: ${mi.status}</li>\n        <li class = \"remove\"><b>Show Type:</b> ${mi.type}</li>\n        <li><b>Genres</b>: ${mi.genres}</li>\n        <li class = \"remove\"><b>Episodes Ordered</b> </li>\n        <li><b>language:</b>: ${mi.language}</li>\n        <li><b>Rating:</b>: ${mi.rating.average}</li>\n        <div class='show-comment'>\n          <div>\n          <h3 class = \"class-heading\" id=\"comments-length\"> All Comments (${\n            arr.length || 0\n          })</h3>\n          <ul class =\"D-comments\">\n          </ul>\n        </div>\n      </ul>`;\n  };\n\n  static displayCom = async (MoveInfo) => {\n    const commentList = document.querySelector('.D-comments');\n    commentList.innerHTML = '';\n    const arr = await MoveInfo;\n    arr.forEach((item) => {\n      commentList.innerHTML += `<li class = \"listCom\">${item.username}: ${\n        item.comment\n      } <br> :${item.creation_date.slice(-5, -1)}</li>`;\n    });\n  };\n}\n\n\n//# sourceURL=webpack://kabanboard/./modules/popup.js?");

/***/ }),

/***/ "./modules/popupApi.js":
/*!*****************************!*\
  !*** ./modules/popupApi.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Involvement)\n/* harmony export */ });\nclass Involvement {\n  static postApp = async () => {\n    const response = await fetch(\n      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/',\n      {\n        method: 'POST',\n        headers: {\n          'Content-type': 'application/json; charset=UTF-8',\n        },\n      },\n    );\n    const data = await response.json();\n    return data;\n  };\n\n  static postComments = async (id, name, com) => {\n    await fetch(\n      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/HW8Zns3g7hE8XehtHEw6/comments',\n      {\n        method: 'POST',\n        body: JSON.stringify({\n          item_id: id,\n          username: name,\n          comment: com,\n        }),\n        headers: {\n          'Content-type': 'application/json; charset=UTF-8',\n        },\n      },\n    );\n  };\n\n  static getComments = async (id) => {\n    const response = await fetch(\n      `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/HW8Zns3g7hE8XehtHEw6/comments?item_id=${id}`,\n    ).then((res) => res.json());\n    if (response.error) {\n      return [];\n    }\n    return response;\n  };\n}\n\n\n//# sourceURL=webpack://kabanboard/./modules/popupApi.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n___CSS_LOADER_EXPORT___.push([module.id, \"@import url(https://fonts.googleapis.com/css2?family=Crete+Round&family=Inter:wght@400;500;600;700;800&family=Poppins&family=Roboto:wght@700&display=swap);\"]);\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"* {\\n  margin: 0;\\n  padding: 0;\\n  box-sizing: border-box;\\n}\\n\\nli {\\n  list-style: none;\\n}\\n\\na {\\n  text-decoration: none;\\n  color: #fff;\\n}\\n\\n.nav {\\n  display: flex;\\n  flex-direction: row;\\n  align-items: center;\\n  justify-content: space-between;\\n  padding: 0 20px;\\n  background: #22242f;\\n  height: 100px;\\n}\\n\\nbody {\\n  color: #fff;\\n  margin: 0;\\n  padding: 0;\\n  font-family: 'Poppins', sans-serif;\\n}\\n\\n@media screen and (min-width: 768px) {\\n  .mobile {\\n    display: none;\\n  }\\n}\\n\\n.movie-title {\\n  text-align: center;\\n  color: #fff;\\n  font-weight: 700;\\n  text-decoration: none;\\n  font-size: 1.5rem;\\n}\\n\\n.lists {\\n  display: flex;\\n  text-decoration: none;\\n  font-size: 1.2rem;\\n  padding-right: 20px;\\n  gap: 30px;\\n  color: rgb(255, 255, 255);\\n}\\n\\n/* stylings for the display items */\\n.movies-container {\\n  justify-content: center;\\n  align-items: center;\\n  flex-wrap: wrap;\\n  height: auto;\\n  background: rgb(233, 233, 233);\\n  padding: 20px;\\n  display: grid;\\n  grid-template-columns: repeat(4, 1fr);\\n  margin: auto;\\n  gap: 20px;\\n}\\n\\nimg {\\n  width: 300px;\\n  height: 350px;\\n  border-radius: 5px;\\n}\\n\\n.movie-cards {\\n  padding: 10px;\\n  border-radius: 5px;\\n  margin: 0;\\n  display: flex;\\n  flex-direction: column;\\n  align-items: center;\\n  background-color: #22242f;\\n  width: fit-content;\\n  gap: 10px;\\n}\\n\\n.movie-cards:hover {\\n  box-shadow: 0 0 4px #747474ab;\\n  cursor: pointer;\\n}\\n\\n.movie-info {\\n  display: flex;\\n  font-size: 12px;\\n  justify-content: space-between;\\n  flex-direction: column;\\n  align-items: center;\\n  gap: 20px;\\n}\\n\\n.movielength {\\n  color: black;\\n}\\n\\n#rating {\\n  color: #ffcd1b;\\n  padding: 0.5em;\\n  border: 1px solid #ffcd1b;\\n  border-radius: 4px;\\n}\\n\\nfooter {\\n  display: flex;\\n  flex-direction: column;\\n  justify-content: center;\\n  align-items: center;\\n  background: #22242f;\\n  width: 100%;\\n  height: 100px;\\n}\\n\\n/* For mobile screens */\\n@media screen and (max-width: 768px) {\\n  .mobile {\\n    color: white;\\n    display: flex;\\n    justify-content: space-between;\\n    align-items: center;\\n    margin-top: 10px;\\n    margin-left: 30px;\\n  }\\n\\n  .movies-container {\\n    display: flex;\\n    flex-direction: row;\\n    flex-wrap: wrap;\\n    width: 100%;\\n    max-width: 1500px;\\n  }\\n\\n  .nav-items {\\n    display: none;\\n  }\\n\\n  img {\\n    width: 300px;\\n    height: 400px;\\n  }\\n}\\n\\n@media screen and (min-width: 768px) {\\n  .mobile {\\n    display: none;\\n  }\\n}\\n\\nh1 {\\n  color: wheat;\\n}\\n\\nspan {\\n  color: #000;\\n}\\n\\n.nav-items a {\\n  color: wheat;\\n  text-decoration: none;\\n  font-size: 1.2rem;\\n  padding-right: 20px;\\n}\\n\\n/* stylings for the display items */\\nh2 {\\n  text-align: center;\\n  color: #000;\\n}\\n\\nbutton {\\n  padding: 8px;\\n  background-color: beige;\\n  border: 1px solid #ffcd1b;\\n  border-radius: 6px;\\n  font-size: 1.2rem;\\n  cursor: pointer;\\n}\\n\\nbutton:hover {\\n  background-color: wheat;\\n}\\n\\nbutton:active {\\n  background-color: brown;\\n  color: #fff;\\n}\\n\\n.fa {\\n  cursor: pointer;\\n}\\n\\n.fa:hover {\\n  color: red;\\n}\\n\\n.description {\\n  display: flex;\\n  flex-direction: row;\\n  flex: 2;\\n  gap: 30px;\\n}\\n\\n.comments {\\n  display: flex;\\n  gap: 25px;\\n}\\n\\n.mInfo {\\n  flex: 1;\\n  display: flex;\\n  flex-direction: column;\\n  background-color: #f7f7f7;\\n  border-style: solid;\\n  border-width: 1px;\\n  padding: 10px;\\n  border-color: #22242f;\\n}\\n\\n.D-description {\\n  display: block;\\n  gap: 20px;\\n}\\n\\n.all-comments {\\n  text-align: center;\\n}\\n\\n.official_site {\\n  color: #000;\\n  font-weight: 700;\\n}\\n\\n#comment {\\n  display: block;\\n  outline: 0;\\n  width: 15rem;\\n  padding: 10px;\\n  border: 1px solid brown;\\n  border-radius: 4px;\\n}\\n\\n.popup {\\n  transition: 200ms ease-in-out;\\n  position: fixed;\\n  left: 50%;\\n  top: 50%;\\n  transform: translate(-50%, -50%) scale(0);\\n  width: 80%;\\n  height: 99%;\\n  padding: 2%;\\n  display: flex;\\n  background-color: white;\\n  z-index: 10;\\n  color: #000;\\n  border-radius: 5px;\\n}\\n\\n.summary-tag h1 {\\n  color: brown;\\n  padding: 0;\\n  margin: 0;\\n}\\n\\n.summary-tag {\\n  margin-right: 20px;\\n  text-align: justify;\\n}\\n\\n.image {\\n  width: 250px;\\n  height: 370px;\\n}\\n\\n.popup.active {\\n  transform: translate(-50%, -50%) scale(1);\\n}\\n\\n.overlay {\\n  transition: 200ms ease-in-out;\\n  position: fixed;\\n  opacity: 0;\\n  left: 0;\\n  top: 0;\\n  right: 0;\\n  bottom: 0;\\n  background-color: rgba(0, 0, 0, 0.6);\\n  pointer-events: none;\\n}\\n\\n.overlay.active {\\n  opacity: 1;\\n  pointer-events: all;\\n}\\n\\n#fname {\\n  outline: 0;\\n  width: 15rem;\\n  padding: 10px;\\n  border: 1px solid brown;\\n  border-radius: 4px;\\n}\\n\\nh3 {\\n  margin-left: 33px;\\n}\\n\\n.summary {\\n  height: 200px;\\n  overflow-x: scroll;\\n}\\n\\n.submit {\\n  width: 100%;\\n  padding: 7px;\\n  background-color: beige;\\n  border: 1px solid brown;\\n  border-radius: 5px;\\n  font-size: 1rem;\\n  cursor: pointer;\\n  margin-top: 10px;\\n}\\n\\n.submit:hover {\\n  background-color: bisque;\\n}\\n\\n.submit:active {\\n  background-color: brown;\\n  color: #fff;\\n}\\n\\n.text_d {\\n  color: rgb(0, 0, 0);\\n  text-align: center;\\n  margin-bottom: 5px;\\n}\\n\\n.D-comments {\\n  height: 250px;\\n  gap: 10px;\\n  overflow: scroll;\\n}\\n\\n.tv_show {\\n  color: brown;\\n  text-align: center;\\n}\\n\\n/* For mobile screens */\\n@media screen and (max-width: 768px) {\\n  .mobile {\\n    color: wheat;\\n    display: flex;\\n    justify-content: space-between;\\n    align-items: center;\\n    margin-top: 10px;\\n    margin-left: 30px;\\n  }\\n\\n  .card-container {\\n    display: block;\\n    margin: auto;\\n  }\\n\\n  .nav-items {\\n    display: none;\\n  }\\n\\n  img {\\n    width: 300px;\\n    height: 400px;\\n  }\\n\\n  #movie-img {\\n    width: 130px;\\n    height: 200px;\\n  }\\n\\n  .summary-tag {\\n    display: none;\\n  }\\n\\n  #fname {\\n    outline: 0;\\n    width: 8rem;\\n    border: 1px solid brown;\\n    border-width: 0 0 1px;\\n  }\\n\\n  #comment {\\n    outline: 0;\\n    width: 8rem;\\n    height: 2.5rem;\\n    padding-bottom: 0;\\n    border-width: 0 0 1px;\\n    transition: all 0.5s ease-in-out;\\n  }\\n\\n  #comment::placeholder {\\n    padding: 0;\\n    font-family: 'Inter', sans-serif;\\n  }\\n\\n  .remove {\\n    display: none;\\n    color: black;\\n  }\\n\\n  .mInfo {\\n    padding: 0;\\n    margin-left: 10px;\\n    display: flex;\\n    flex-direction: column;\\n  }\\n\\n  .description {\\n    flex: none;\\n  }\\n\\n  .D-comments {\\n    overflow-y: scroll;\\n    max-height: 250px;\\n    max-width: 300px;\\n    margin: 0;\\n    padding: 10px;\\n    transform: translateX(0);\\n    cursor: grab;\\n    font-size: 0.7rem;\\n  }\\n\\n  .class-heading {\\n    font-size: 0.8rem;\\n    margin: 0;\\n    padding: 10px;\\n    text-align: center;\\n  }\\n\\n  .D-comments > li:nth-child(odd) {\\n    background-color: grey;\\n    color: #fff;\\n  }\\n\\n  .listCom {\\n    padding: 3px 10px;\\n    display: flex;\\n    flex-direction: column;\\n    justify-content: space-evenly;\\n  }\\n}\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://kabanboard/./src/style.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n\n      content += cssWithMappingToString(item);\n\n      if (needLayer) {\n        content += \"}\";\n      }\n\n      if (item[2]) {\n        content += \"}\";\n      }\n\n      if (item[4]) {\n        content += \"}\";\n      }\n\n      return content;\n    }).join(\"\");\n  }; // import a list of modules into the list\n\n\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://kabanboard/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://kabanboard/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ \"./node_modules/css-loader/dist/cjs.js!./src/style.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://kabanboard/./src/style.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n\n  return updater;\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://kabanboard/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n/* istanbul ignore next  */\n\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n\n    memo[target] = styleTarget;\n  }\n\n  return memo[target];\n}\n/* istanbul ignore next  */\n\n\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n\n  target.appendChild(style);\n}\n\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://kabanboard/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\n\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://kabanboard/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\n\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://kabanboard/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n\n  var needLayer = typeof obj.layer !== \"undefined\";\n\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n\n  css += obj.css;\n\n  if (needLayer) {\n    css += \"}\";\n  }\n\n  if (obj.media) {\n    css += \"}\";\n  }\n\n  if (obj.supports) {\n    css += \"}\";\n  }\n\n  var sourceMap = obj.sourceMap;\n\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  options.styleTagTransform(css, styleElement, options.options);\n}\n\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n\n  styleElement.parentNode.removeChild(styleElement);\n}\n/* istanbul ignore next  */\n\n\nfunction domAPI(options) {\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\n\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://kabanboard/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\n\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://kabanboard/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n/* harmony import */ var _modules_homepage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/homepage.js */ \"./modules/homepage.js\");\n/* harmony import */ var _modules_popup_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/popup.js */ \"./modules/popup.js\");\n/* harmony import */ var _modules_popupApi_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modules/popupApi.js */ \"./modules/popupApi.js\");\n\n\n\n// eslint-disable-next-line import/no-named-as-default\n\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  (0,_modules_homepage_js__WEBPACK_IMPORTED_MODULE_1__.movieList)();\n});\n\ndocument.addEventListener('click', async (e) => {\n  if (!e.target.matches('.commentBtn')) {\n    return;\n  }\n  const { id } = e.target;\n\n  const comList = await _modules_popupApi_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getComments(id);\n\n  const MoveInfo = await _modules_popup_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getInfos(id);\n  await _modules_popup_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].display(MoveInfo, id, comList);\n  const overlay = document.querySelector('.overlay');\n  const popup = document.querySelector('.popup');\n  popup.classList.add('active');\n  overlay.classList.add('active');\n  _modules_popup_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].displayCom(comList);\n});\n\ndocument.querySelector('.overlay').addEventListener('click', () => {\n  const overlay = document.querySelector('.overlay');\n  const popup = document.querySelector('.popup');\n  popup.classList.remove('active');\n  overlay.classList.remove('active');\n});\n\ndocument.addEventListener('click', async (e) => {\n  if (!e.target.matches('.submit')) {\n    return;\n  }\n  e.preventDefault();\n  const name = document.getElementById('fname').value;\n  const com = document.getElementById('comment').value;\n  const { id } = e.target;\n  await _modules_popupApi_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].postComments(id, name, com);\n  const comList = await _modules_popupApi_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getComments(id);\n  _modules_popup_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].displayCom(comList);\n  _modules_popup_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].countComments(comList);\n});\n\n\n//# sourceURL=webpack://kabanboard/./src/index.js?");

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