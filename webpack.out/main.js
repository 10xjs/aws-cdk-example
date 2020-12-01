(function(e, a) { for(var i in a) e[i] = a[i]; if(a.__esModule) Object.defineProperty(e, "__esModule", { value: true }); }(exports,
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 967:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "handler": () => /* binding */ handler
});

// CONCATENATED MODULE: external "aws-sdk"
const external_aws_sdk_namespaceObject = require("aws-sdk");;
// CONCATENATED MODULE: ./src/rest-api/get-one.ts
var _a, _b;

const TABLE_NAME = (_a = process.env.TABLE_NAME) !== null && _a !== void 0 ? _a : '';
const PRIMARY_KEY = (_b = process.env.PRIMARY_KEY) !== null && _b !== void 0 ? _b : '';
const db = new external_aws_sdk_namespaceObject.DynamoDB.DocumentClient();
const handler = async (event) => {
    try {
        const response = await db
            .get({
            TableName: TABLE_NAME,
            Key: {
                [PRIMARY_KEY]: event.pathParameters.id,
            },
        })
            .promise();
        return {
            statusCode: 200,
            body: JSON.stringify(response.Item),
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error),
        };
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LW9uZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldC1vbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sS0FBSyxHQUFHLE1BQU0sU0FBUyxDQUFDO0FBRS9CLE1BQU0sVUFBVSxTQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxtQ0FBSSxFQUFFLENBQUM7QUFDaEQsTUFBTSxXQUFXLFNBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLG1DQUFJLEVBQUUsQ0FBQztBQUVsRCxNQUFNLEVBQUUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7QUFFN0MsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUEyQixLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDN0QsSUFBSTtRQUNGLE1BQU0sUUFBUSxHQUFHLE1BQU0sRUFBRTthQUN0QixHQUFHLENBQUM7WUFDSCxTQUFTLEVBQUUsVUFBVTtZQUNyQixHQUFHLEVBQUU7Z0JBQ0gsQ0FBQyxXQUFXLENBQUMsRUFBRSxLQUFLLENBQUMsY0FBZSxDQUFDLEVBQUU7YUFDeEM7U0FDRixDQUFDO2FBQ0QsT0FBTyxFQUFFLENBQUM7UUFFYixPQUFPO1lBQ0wsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1NBQ3BDLENBQUM7S0FDSDtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsT0FBTztZQUNMLFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1NBQzVCLENBQUM7S0FDSDtBQUNILENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgQVBJR2F0ZXdheVByb3h5SGFuZGxlciB9IGZyb20gJ2F3cy1sYW1iZGEnO1xuaW1wb3J0ICogYXMgQVdTIGZyb20gJ2F3cy1zZGsnO1xuXG5jb25zdCBUQUJMRV9OQU1FID0gcHJvY2Vzcy5lbnYuVEFCTEVfTkFNRSA/PyAnJztcbmNvbnN0IFBSSU1BUllfS0VZID0gcHJvY2Vzcy5lbnYuUFJJTUFSWV9LRVkgPz8gJyc7XG5cbmNvbnN0IGRiID0gbmV3IEFXUy5EeW5hbW9EQi5Eb2N1bWVudENsaWVudCgpO1xuXG5leHBvcnQgY29uc3QgaGFuZGxlcjogQVBJR2F0ZXdheVByb3h5SGFuZGxlciA9IGFzeW5jIChldmVudCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGJcbiAgICAgIC5nZXQoe1xuICAgICAgICBUYWJsZU5hbWU6IFRBQkxFX05BTUUsXG4gICAgICAgIEtleToge1xuICAgICAgICAgIFtQUklNQVJZX0tFWV06IGV2ZW50LnBhdGhQYXJhbWV0ZXJzIS5pZCxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgICAucHJvbWlzZSgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlLkl0ZW0pLFxuICAgIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1c0NvZGU6IDUwMCxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGVycm9yKSxcbiAgICB9O1xuICB9XG59O1xuIl19

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
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
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(967);
/******/ })()

));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hd3MtY2RrLWV4YW1wbGUvZXh0ZXJuYWwgXCJhd3Mtc2RrXCIiLCJ3ZWJwYWNrOi8vYXdzLWNkay1leGFtcGxlLy4vc3JjL3Jlc3QtYXBpL2dldC1vbmUudHMiLCJ3ZWJwYWNrOi8vYXdzLWNkay1leGFtcGxlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2F3cy1jZGstZXhhbXBsZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYXdzLWNkay1leGFtcGxlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYXdzLWNkay1leGFtcGxlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYXdzLWNkay1leGFtcGxlL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQU0sZ0NBQTRCLHVCOztBQ0FsQztBQUMrQjtBQUMvQjtBQUNBO0FBQ0EsZUFBZSx3REFBMkI7QUFDbkM7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLCsrRDs7Ozs7O1VDM0IzQztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0NyQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHNGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7O1VDTkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IF9fV0VCUEFDS19OQU1FU1BBQ0VfT0JKRUNUX18gPSByZXF1aXJlKFwiYXdzLXNka1wiKTs7IiwidmFyIF9hLCBfYjtcbmltcG9ydCAqIGFzIEFXUyBmcm9tICdhd3Mtc2RrJztcbmNvbnN0IFRBQkxFX05BTUUgPSAoX2EgPSBwcm9jZXNzLmVudi5UQUJMRV9OQU1FKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnJztcbmNvbnN0IFBSSU1BUllfS0VZID0gKF9iID0gcHJvY2Vzcy5lbnYuUFJJTUFSWV9LRVkpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6ICcnO1xuY29uc3QgZGIgPSBuZXcgQVdTLkR5bmFtb0RCLkRvY3VtZW50Q2xpZW50KCk7XG5leHBvcnQgY29uc3QgaGFuZGxlciA9IGFzeW5jIChldmVudCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGJcbiAgICAgICAgICAgIC5nZXQoe1xuICAgICAgICAgICAgVGFibGVOYW1lOiBUQUJMRV9OQU1FLFxuICAgICAgICAgICAgS2V5OiB7XG4gICAgICAgICAgICAgICAgW1BSSU1BUllfS0VZXTogZXZlbnQucGF0aFBhcmFtZXRlcnMuaWQsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgICAgICAgLnByb21pc2UoKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlLkl0ZW0pLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXR1c0NvZGU6IDUwMCxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGVycm9yKSxcbiAgICAgICAgfTtcbiAgICB9XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pWjJWMExXOXVaUzVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6SWpwYkltZGxkQzF2Ym1VdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqdEJRVU5CTEU5QlFVOHNTMEZCU3l4SFFVRkhMRTFCUVUwc1UwRkJVeXhEUVVGRE8wRkJSUzlDTEUxQlFVMHNWVUZCVlN4VFFVRkhMRTlCUVU4c1EwRkJReXhIUVVGSExFTkJRVU1zVlVGQlZTeHRRMEZCU1N4RlFVRkZMRU5CUVVNN1FVRkRhRVFzVFVGQlRTeFhRVUZYTEZOQlFVY3NUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXhYUVVGWExHMURRVUZKTEVWQlFVVXNRMEZCUXp0QlFVVnNSQ3hOUVVGTkxFVkJRVVVzUjBGQlJ5eEpRVUZKTEVkQlFVY3NRMEZCUXl4UlFVRlJMRU5CUVVNc1kwRkJZeXhGUVVGRkxFTkJRVU03UVVGRk4wTXNUVUZCVFN4RFFVRkRMRTFCUVUwc1QwRkJUeXhIUVVFeVFpeExRVUZMTEVWQlFVVXNTMEZCU3l4RlFVRkZMRVZCUVVVN1NVRkROMFFzU1VGQlNUdFJRVU5HTEUxQlFVMHNVVUZCVVN4SFFVRkhMRTFCUVUwc1JVRkJSVHRoUVVOMFFpeEhRVUZITEVOQlFVTTdXVUZEU0N4VFFVRlRMRVZCUVVVc1ZVRkJWVHRaUVVOeVFpeEhRVUZITEVWQlFVVTdaMEpCUTBnc1EwRkJReXhYUVVGWExFTkJRVU1zUlVGQlJTeExRVUZMTEVOQlFVTXNZMEZCWlN4RFFVRkRMRVZCUVVVN1lVRkRlRU03VTBGRFJpeERRVUZETzJGQlEwUXNUMEZCVHl4RlFVRkZMRU5CUVVNN1VVRkZZaXhQUVVGUE8xbEJRMHdzVlVGQlZTeEZRVUZGTEVkQlFVYzdXVUZEWml4SlFVRkpMRVZCUVVVc1NVRkJTU3hEUVVGRExGTkJRVk1zUTBGQlF5eFJRVUZSTEVOQlFVTXNTVUZCU1N4RFFVRkRPMU5CUTNCRExFTkJRVU03UzBGRFNEdEpRVUZETEU5QlFVOHNTMEZCU3l4RlFVRkZPMUZCUTJRc1QwRkJUenRaUVVOTUxGVkJRVlVzUlVGQlJTeEhRVUZITzFsQlEyWXNTVUZCU1N4RlFVRkZMRWxCUVVrc1EwRkJReXhUUVVGVExFTkJRVU1zUzBGQlN5eERRVUZETzFOQlF6VkNMRU5CUVVNN1MwRkRTRHRCUVVOSUxFTkJRVU1zUTBGQlF5SXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJbWx0Y0c5eWRDQjBlWEJsSUhzZ1FWQkpSMkYwWlhkaGVWQnliM2g1U0dGdVpHeGxjaUI5SUdaeWIyMGdKMkYzY3kxc1lXMWlaR0VuTzF4dWFXMXdiM0owSUNvZ1lYTWdRVmRUSUdaeWIyMGdKMkYzY3kxelpHc25PMXh1WEc1amIyNXpkQ0JVUVVKTVJWOU9RVTFGSUQwZ2NISnZZMlZ6Y3k1bGJuWXVWRUZDVEVWZlRrRk5SU0EvUHlBbkp6dGNibU52Ym5OMElGQlNTVTFCVWxsZlMwVlpJRDBnY0hKdlkyVnpjeTVsYm5ZdVVGSkpUVUZTV1Y5TFJWa2dQejhnSnljN1hHNWNibU52Ym5OMElHUmlJRDBnYm1WM0lFRlhVeTVFZVc1aGJXOUVRaTVFYjJOMWJXVnVkRU5zYVdWdWRDZ3BPMXh1WEc1bGVIQnZjblFnWTI5dWMzUWdhR0Z1Wkd4bGNqb2dRVkJKUjJGMFpYZGhlVkJ5YjNoNVNHRnVaR3hsY2lBOUlHRnplVzVqSUNobGRtVnVkQ2tnUFQ0Z2UxeHVJQ0IwY25rZ2UxeHVJQ0FnSUdOdmJuTjBJSEpsYzNCdmJuTmxJRDBnWVhkaGFYUWdaR0pjYmlBZ0lDQWdJQzVuWlhRb2UxeHVJQ0FnSUNBZ0lDQlVZV0pzWlU1aGJXVTZJRlJCUWt4RlgwNUJUVVVzWEc0Z0lDQWdJQ0FnSUV0bGVUb2dlMXh1SUNBZ0lDQWdJQ0FnSUZ0UVVrbE5RVkpaWDB0RldWMDZJR1YyWlc1MExuQmhkR2hRWVhKaGJXVjBaWEp6SVM1cFpDeGNiaUFnSUNBZ0lDQWdmU3hjYmlBZ0lDQWdJSDBwWEc0Z0lDQWdJQ0F1Y0hKdmJXbHpaU2dwTzF4dVhHNGdJQ0FnY21WMGRYSnVJSHRjYmlBZ0lDQWdJSE4wWVhSMWMwTnZaR1U2SURJd01DeGNiaUFnSUNBZ0lHSnZaSGs2SUVwVFQwNHVjM1J5YVc1bmFXWjVLSEpsYzNCdmJuTmxMa2wwWlcwcExGeHVJQ0FnSUgwN1hHNGdJSDBnWTJGMFkyZ2dLR1Z5Y205eUtTQjdYRzRnSUNBZ2NtVjBkWEp1SUh0Y2JpQWdJQ0FnSUhOMFlYUjFjME52WkdVNklEVXdNQ3hjYmlBZ0lDQWdJR0p2WkhrNklFcFRUMDR1YzNSeWFXNW5hV1o1S0dWeWNtOXlLU3hjYmlBZ0lDQjlPMXh1SUNCOVhHNTlPMXh1SWwxOSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBtb2R1bGUgZXhwb3J0cyBtdXN0IGJlIHJldHVybmVkIGZyb20gcnVudGltZSBzbyBlbnRyeSBpbmxpbmluZyBpcyBkaXNhYmxlZFxuLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG5yZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyg5NjcpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==