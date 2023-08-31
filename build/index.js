/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_CollectionForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/CollectionForm */ "./src/components/CollectionForm.jsx");



const App = () => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_CollectionForm__WEBPACK_IMPORTED_MODULE_2__["default"], null));
};
/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./src/components/CollectionForm.jsx":
/*!*******************************************!*\
  !*** ./src/components/CollectionForm.jsx ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const CollectionForm = () => {
  const empty_client_obj = {
    name: null,
    statusVat: null,
    regon: null,
    krs: null,
    workingAddress: null,
    registrationLegalDate: null
  };
  const [client_nip, setClientNip] = react__WEBPACK_IMPORTED_MODULE_1___default().useState('');
  const [client_data, setClientData] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(empty_client_obj);
  const [client_message, setClientMessage] = react__WEBPACK_IMPORTED_MODULE_1___default().useState('');
  const [debtor_nip, setDebtorNip] = react__WEBPACK_IMPORTED_MODULE_1___default().useState('');
  const [debtor_data, setDebtorData] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(empty_client_obj);
  const [debtor_message, setDebtorMessage] = react__WEBPACK_IMPORTED_MODULE_1___default().useState('');
  function getNipDetail(nip) {
    return fetch(`https://wl-api.mf.gov.pl/api/search/nip/${nip}?date=2023-08-29`).then(async response => {
      return await response;
    });
  }
  async function checkResponse(response) {
    const response_json = await response.json();
    if (!response.ok) {
      return [empty_client_obj, response_json.message];
    } else {
      return [response_json.result.subject, ''];
    }
  }
  function checkNip(nip) {
    const nip_length = nip.length;
    switch (nip_length) {
      case 0:
        return [false, "Pole 'NIP' nie może być puste."];
      case 10:
        return [true, ""];
      default:
        return [false, "Pole 'NIP' ma nieprawidłową długość. Wymagane 10 znaków."];
    }
  }
  async function getClientNipDetail(nip) {
    const [is_valid_nip, nip_message] = checkNip(nip);
    if (is_valid_nip) {
      const [subject, message] = await getNipDetail(nip).then(response => checkResponse(response));
      setClientData(subject);
    } else {
      setClientData(empty_client_obj);
    }
    setClientMessage(nip_message);
  }
  async function getDebtorNipDetail(nip) {
    const [subject, message] = await getNipDetail(nip).then(response => checkResponse(response));
    setDebtorData(subject);
    setDebtorMessage(message);
  }
  react__WEBPACK_IMPORTED_MODULE_1___default().useEffect(() => {
    getClientNipDetail(client_nip);
  }, [client_nip]);
  react__WEBPACK_IMPORTED_MODULE_1___default().useEffect(() => {
    getDebtorNipDetail(debtor_nip);
  }, [debtor_nip]);
  function detailView(obj) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, obj.name), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "REGON: ", obj.regon), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "KRS: ", obj.krs), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Adres: ", obj.workingAddress), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Data rozpocz\u0119cia dzia\u0142alno\u015Bci ", obj.registrationLegalDate));
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "row"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "col"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, "Tw\xF3j NIP"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    value: client_nip,
    onChange: e => setClientNip(e.target.value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, client_message !== '' ? client_message : client_data !== null ? detailView(client_data) : `Nie znaleziono nip: ${client_nip}`)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "col"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, "NIP D\u0142u\u017Cnika"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    value: debtor_nip,
    onChange: e => setDebtorNip(e.target.value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, debtor_message !== '' ? debtor_message : debtor_data !== null ? detailView(debtor_data) : `Nie znaleziono nip: ${debtor_nip}`)));
};
/* harmony default export */ __webpack_exports__["default"] = (CollectionForm);

/***/ }),

/***/ "./node_modules/bootstrap/dist/css/bootstrap.css":
/*!*******************************************************!*\
  !*** ./node_modules/bootstrap/dist/css/bootstrap.css ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style/main.scss":
/*!*****************************!*\
  !*** ./src/style/main.scss ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module) {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

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
/******/ 			// no module.id needed
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
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App */ "./src/App.js");
/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.css */ "./node_modules/bootstrap/dist/css/bootstrap.css");
/* harmony import */ var _style_main_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style/main.scss */ "./src/style/main.scss");





/**
 * Import the stylesheet for the plugin.
 */


// Render the App component into the DOM
(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.render)((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_App__WEBPACK_IMPORTED_MODULE_1__["default"], null), document.getElementById('collection-form'));
}();
/******/ })()
;
//# sourceMappingURL=index.js.map