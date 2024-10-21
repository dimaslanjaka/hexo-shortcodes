'use strict';

var axios = require('axios');
var fs = require('fs-extra');
var path = require('path');
var tar = require('tar');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var tar__namespace = /*#__PURE__*/_interopNamespaceDefault(tar);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * Extracts a specific subdirectory from a `.tgz` file to an output directory.
 *
 * @param filePath - The path to the `.tgz` file.
 * @param outputDir - The directory where files will be extracted.
 * @param subPath - The subdirectory within the `.tgz` archive to extract (e.g., 'package/').
 * @param strip - Whether to strip the leading subdirectory from the extracted files. If true, the leading subdirectory (e.g., 'package/') will be removed. Defaults to `false`.
 * @returns - A promise that resolves when extraction is complete.
 */
function extractTarGz(filePath_1, outputDir_1, subPath_1) {
    return __awaiter(this, arguments, void 0, function (filePath, outputDir, subPath, strip) {
        var error_1;
        if (strip === void 0) { strip = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    // Ensure the output directory exists
                    return [4 /*yield*/, fs.ensureDir(outputDir)];
                case 1:
                    // Ensure the output directory exists
                    _a.sent();
                    // Extract the contents of the tarball
                    return [4 /*yield*/, tar__namespace.x({
                            file: filePath,
                            C: outputDir,
                            filter: function (file) { return (subPath ? file.startsWith(subPath) : true); }, // Extract only files under subPath, or all files if subPath is not specified
                            strip: strip ? 1 : undefined // Remove the leading subdirectory (e.g., 'package/') if strip is true
                        })];
                case 2:
                    // Extract the contents of the tarball
                    _a.sent();
                    console.log("Extracted ".concat(subPath ? subPath : "all contents", " from ").concat(filePath, " to ").concat(outputDir));
                    return [2 /*return*/, true];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error extracting ".concat(subPath ? subPath : "all contents", " from ").concat(filePath, ":"), error_1);
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/];
            }
        });
    });
}

var url = "https://github.com/dimaslanjaka/hexo-themes/raw/master/releases/hexo-theme-flowbite.tgz";
var filePath = path.join(process.cwd(), "tmp", "hexo-theme-flowbite.tgz");
var outputDir = path.join(process.cwd(), "themes", "hexo-theme-flowbite");
function downloadFile() {
    return __awaiter(this, void 0, void 0, function () {
        var writer, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs.ensureDir(path.dirname(filePath))];
                case 1:
                    _a.sent();
                    writer = fs.createWriteStream(filePath);
                    return [4 /*yield*/, axios({
                            url: url,
                            method: "GET",
                            responseType: "stream"
                        })];
                case 2:
                    response = _a.sent();
                    response.data.pipe(writer);
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            writer.on("finish", resolve);
                            writer.on("error", reject);
                        })];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var err_1, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, downloadFile()];
                case 1:
                    _a.sent();
                    console.log("Download completed!");
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.error("Error downloading file:", err_1);
                    return [3 /*break*/, 3];
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, extractTarGz(filePath, outputDir, "package/", true)];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    err_2 = _a.sent();
                    console.error("Error extracting file:", err_2);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
main();
