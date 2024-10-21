'use strict';

var fs = require('fs-extra');
var path = require('path');
var Hexo = require('hexo');
var yaml = require('yaml');
var cheerio = require('cheerio');
var hutil = require('hexo-util');
var nunjucks = require('nunjucks');
var utility = require('sbg-utility');
var hpp = require('hexo-post-parser');
var _ = require('lodash');

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

var cheerio__namespace = /*#__PURE__*/_interopNamespaceDefault(cheerio);

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

var searchFiles = [
    path.join(hexo.base_dir, hexo.config.source_dir, "hexo-search.json"),
    path.join(hexo.base_dir, hexo.config.public_dir, "hexo-search.json")
];
// Queue to hold the save operations
var saveQueue = [];
var isProcessing$1 = false;
/**
 * Initializes the search files if they don't exist.
 */
function initializeSearchFiles() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, searchFiles_1, file;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _i = 0, searchFiles_1 = searchFiles;
                    _a.label = 1;
                case 1:
                    if (!(_i < searchFiles_1.length)) return [3 /*break*/, 5];
                    file = searchFiles_1[_i];
                    if (!!fs.existsSync(file)) return [3 /*break*/, 4];
                    return [4 /*yield*/, fs.ensureDir(path.dirname(file))];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, fs.writeJSON(file, [])];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    });
}
/**
 * Saves data as search in JSON files, processing requests in a queue.
 *
 * @param data - The object containing url, title, and description to save.
 */
function saveAsSearch(data) {
    return __awaiter(this, void 0, void 0, function () {
        var saveOperation;
        var _this = this;
        return __generator(this, function (_a) {
            saveOperation = function () { return __awaiter(_this, void 0, void 0, function () {
                var existingDataPromises, existingDataArray, writePromises;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, initializeSearchFiles()];
                        case 1:
                            _a.sent(); // Ensure the files are initialized
                            existingDataPromises = searchFiles.map(function (file) { return fs.readJSON(file); });
                            return [4 /*yield*/, Promise.all(existingDataPromises)];
                        case 2:
                            existingDataArray = _a.sent();
                            existingDataArray.forEach(function (existingData) {
                                appendOrReplace(existingData, data); // Append or replace data in each existing data array
                            });
                            writePromises = searchFiles.map(function (file, index) { return fs.writeJSON(file, existingDataArray[index]); });
                            return [4 /*yield*/, Promise.all(writePromises)];
                        case 3:
                            _a.sent(); // Wait for all write operations to complete
                            return [2 /*return*/];
                    }
                });
            }); };
            // Add the save operation to the queue
            saveQueue.push(saveOperation);
            // Process the queue if not already processing
            scheduleProcessing$1();
            return [2 /*return*/];
        });
    });
}
/**
 * Processes the save queue one operation at a time.
 */
function scheduleProcessing$1() {
    return __awaiter(this, void 0, void 0, function () {
        var currentOperation, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (isProcessing$1 || saveQueue.length === 0) {
                        return [2 /*return*/]; // If already processing or no items in the queue, exit
                    }
                    isProcessing$1 = true;
                    currentOperation = saveQueue.shift();
                    if (!currentOperation) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, currentOperation()];
                case 2:
                    _a.sent(); // Execute the operation
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    hexo.log.error("Error saving search data:", error_1.message);
                    return [3 /*break*/, 5];
                case 4:
                    isProcessing$1 = false; // Mark processing as complete
                    scheduleProcessing$1(); // Continue to the next item in the queue
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
/**
 * Appends a new object to the array or replaces an existing object
 * based on the 'url' property, after validating that the 'url' is not empty.
 *
 * @param array - The array of objects to update.
 * @param newObj - The new object to add or replace.
 */
function appendOrReplace(array, newObj) {
    // Validate that the url is not empty
    if (!newObj.url || typeof newObj.url !== "string") {
        hexo.log.warn("Invalid URL: The 'url' property must be a non-empty string.");
        return; // Exit the function if the URL is invalid
    }
    var index = array.findIndex(function (item) { return item.url === newObj.url; });
    if (index !== -1) {
        // Replace the existing object
        array[index] = newObj;
    }
    else {
        // Append the new object
        array.push(newObj);
    }
}

// clean build and temp folder on `hexo clean`
hexo.extend.filter.register("after_clean", function () {
    // remove some other temporary files
    hexo.log.debug("cleaning build and temp folder");
    var folders = [
        path.join(hexo.base_dir, "tmp/hexo-theme-flowbite"),
        path.join(hexo.base_dir, "tmp/hexo-theme-claudia"),
        path.join(hexo.base_dir, "tmp/hexo-theme-butterfly"),
        path.join(hexo.base_dir, "tmp/hexo-themes")
    ]
        .concat(searchFiles)
        .flat();
    for (var i = 0; i < folders.length; i++) {
        var folder = folders[i];
        try {
            if (fs.existsSync(folder))
                fs.rmSync(folder, { recursive: true, force: true });
        }
        catch (error) {
            hexo.log.warn("fail delete " + folder, error.message);
        }
    }
});

/**
 * Special values that tell deepmerge to perform a certain action.
 */
const actions = {
    defaultMerge: Symbol("deepmerge-ts: default merge"),
    skip: Symbol("deepmerge-ts: skip"),
};
/**
 * Special values that tell deepmergeInto to perform a certain action.
 */
({
    defaultMerge: actions.defaultMerge,
});

/**
 * The default function to update meta data.
 *
 * It doesn't update the meta data.
 */
function defaultMetaDataUpdater(previousMeta, metaMeta) {
    return metaMeta;
}
/**
 * The default function to filter values.
 *
 * It filters out undefined values.
 */
function defaultFilterValues(values, meta) {
    return values.filter((value) => value !== undefined);
}

/**
 * The different types of objects deepmerge-ts support.
 */
var ObjectType;
(function (ObjectType) {
    ObjectType[ObjectType["NOT"] = 0] = "NOT";
    ObjectType[ObjectType["RECORD"] = 1] = "RECORD";
    ObjectType[ObjectType["ARRAY"] = 2] = "ARRAY";
    ObjectType[ObjectType["SET"] = 3] = "SET";
    ObjectType[ObjectType["MAP"] = 4] = "MAP";
    ObjectType[ObjectType["OTHER"] = 5] = "OTHER";
})(ObjectType || (ObjectType = {}));
/**
 * Get the type of the given object.
 *
 * @param object - The object to get the type of.
 * @returns The type of the given object.
 */
function getObjectType(object) {
    if (typeof object !== "object" || object === null) {
        return 0 /* ObjectType.NOT */;
    }
    if (Array.isArray(object)) {
        return 2 /* ObjectType.ARRAY */;
    }
    if (isRecord(object)) {
        return 1 /* ObjectType.RECORD */;
    }
    if (object instanceof Set) {
        return 3 /* ObjectType.SET */;
    }
    if (object instanceof Map) {
        return 4 /* ObjectType.MAP */;
    }
    return 5 /* ObjectType.OTHER */;
}
/**
 * Get the keys of the given objects including symbol keys.
 *
 * Note: Only keys to enumerable properties are returned.
 *
 * @param objects - An array of objects to get the keys of.
 * @returns A set containing all the keys of all the given objects.
 */
function getKeys(objects) {
    const keys = new Set();
    for (const object of objects) {
        for (const key of [...Object.keys(object), ...Object.getOwnPropertySymbols(object)]) {
            keys.add(key);
        }
    }
    return keys;
}
/**
 * Does the given object have the given property.
 *
 * @param object - The object to test.
 * @param property - The property to test.
 * @returns Whether the object has the property.
 */
function objectHasProperty(object, property) {
    return typeof object === "object" && Object.prototype.propertyIsEnumerable.call(object, property);
}
/**
 * Get an iterable object that iterates over the given iterables.
 */
function getIterableOfIterables(iterables) {
    return {
        *[Symbol.iterator]() {
            for (const iterable of iterables) {
                for (const value of iterable) {
                    yield value;
                }
            }
        },
    };
}
const validRecordToStringValues = new Set(["[object Object]", "[object Module]"]);
/**
 * Does the given object appear to be a record.
 */
function isRecord(value) {
    // All records are objects.
    if (!validRecordToStringValues.has(Object.prototype.toString.call(value))) {
        return false;
    }
    const { constructor } = value;
    // If has modified constructor.
    // eslint-disable-next-line ts/no-unnecessary-condition
    if (constructor === undefined) {
        return true;
    }
    const prototype = constructor.prototype;
    // If has modified prototype.
    if (prototype === null ||
        typeof prototype !== "object" ||
        !validRecordToStringValues.has(Object.prototype.toString.call(prototype))) {
        return false;
    }
    // If constructor does not have an Object-specific method.
    // eslint-disable-next-line sonar/prefer-single-boolean-return, no-prototype-builtins
    if (!prototype.hasOwnProperty("isPrototypeOf")) {
        return false;
    }
    // Most likely a record.
    return true;
}

/**
 * The default strategy to merge records.
 *
 * @param values - The records.
 */
function mergeRecords$1(values, utils, meta) {
    const result = {};
    for (const key of getKeys(values)) {
        const propValues = [];
        for (const value of values) {
            if (objectHasProperty(value, key)) {
                propValues.push(value[key]);
            }
        }
        if (propValues.length === 0) {
            continue;
        }
        const updatedMeta = utils.metaDataUpdater(meta, {
            key,
            parents: values,
        });
        const propertyResult = mergeUnknowns(propValues, utils, updatedMeta);
        if (propertyResult === actions.skip) {
            continue;
        }
        if (key === "__proto__") {
            Object.defineProperty(result, key, {
                value: propertyResult,
                configurable: true,
                enumerable: true,
                writable: true,
            });
        }
        else {
            result[key] = propertyResult;
        }
    }
    return result;
}
/**
 * The default strategy to merge arrays.
 *
 * @param values - The arrays.
 */
function mergeArrays$1(values) {
    return values.flat();
}
/**
 * The default strategy to merge sets.
 *
 * @param values - The sets.
 */
function mergeSets$1(values) {
    return new Set(getIterableOfIterables(values));
}
/**
 * The default strategy to merge maps.
 *
 * @param values - The maps.
 */
function mergeMaps$1(values) {
    return new Map(getIterableOfIterables(values));
}
/**
 * Get the last non-undefined value in the given array.
 */
function mergeOthers$1(values) {
    return values.at(-1);
}
/**
 * The merge functions.
 */
const mergeFunctions = {
    mergeRecords: mergeRecords$1,
    mergeArrays: mergeArrays$1,
    mergeSets: mergeSets$1,
    mergeMaps: mergeMaps$1,
    mergeOthers: mergeOthers$1,
};

/**
 * Deeply merge objects.
 *
 * @param objects - The objects to merge.
 */
function deepmerge(...objects) {
    return deepmergeCustom({})(...objects);
}
function deepmergeCustom(options, rootMetaData) {
    const utils = getUtils(options, customizedDeepmerge);
    /**
     * The customized deepmerge function.
     */
    function customizedDeepmerge(...objects) {
        return mergeUnknowns(objects, utils, rootMetaData);
    }
    return customizedDeepmerge;
}
/**
 * The the utils that are available to the merge functions.
 *
 * @param options - The options the user specified
 */
function getUtils(options, customizedDeepmerge) {
    return {
        defaultMergeFunctions: mergeFunctions,
        mergeFunctions: {
            ...mergeFunctions,
            ...Object.fromEntries(Object.entries(options)
                .filter(([key, option]) => Object.hasOwn(mergeFunctions, key))
                .map(([key, option]) => (option === false ? [key, mergeFunctions.mergeOthers] : [key, option]))),
        },
        metaDataUpdater: (options.metaDataUpdater ?? defaultMetaDataUpdater),
        deepmerge: customizedDeepmerge,
        useImplicitDefaultMerging: options.enableImplicitDefaultMerging ?? false,
        filterValues: options.filterValues === false ? undefined : (options.filterValues ?? defaultFilterValues),
        actions,
    };
}
/**
 * Merge unknown things.
 *
 * @param values - The values.
 */
function mergeUnknowns(values, utils, meta) {
    const filteredValues = utils.filterValues?.(values, meta) ?? values;
    if (filteredValues.length === 0) {
        return undefined;
    }
    if (filteredValues.length === 1) {
        return mergeOthers(filteredValues, utils, meta);
    }
    const type = getObjectType(filteredValues[0]);
    if (type !== 0 /* ObjectType.NOT */ && type !== 5 /* ObjectType.OTHER */) {
        for (let m_index = 1; m_index < filteredValues.length; m_index++) {
            if (getObjectType(filteredValues[m_index]) === type) {
                continue;
            }
            return mergeOthers(filteredValues, utils, meta);
        }
    }
    switch (type) {
        case 1 /* ObjectType.RECORD */: {
            return mergeRecords(filteredValues, utils, meta);
        }
        case 2 /* ObjectType.ARRAY */: {
            return mergeArrays(filteredValues, utils, meta);
        }
        case 3 /* ObjectType.SET */: {
            return mergeSets(filteredValues, utils, meta);
        }
        case 4 /* ObjectType.MAP */: {
            return mergeMaps(filteredValues, utils, meta);
        }
        default: {
            return mergeOthers(filteredValues, utils, meta);
        }
    }
}
/**
 * Merge records.
 *
 * @param values - The records.
 */
function mergeRecords(values, utils, meta) {
    const result = utils.mergeFunctions.mergeRecords(values, utils, meta);
    if (result === actions.defaultMerge ||
        (utils.useImplicitDefaultMerging &&
            result === undefined &&
            utils.mergeFunctions.mergeRecords !== utils.defaultMergeFunctions.mergeRecords)) {
        return utils.defaultMergeFunctions.mergeRecords(values, utils, meta);
    }
    return result;
}
/**
 * Merge arrays.
 *
 * @param values - The arrays.
 */
function mergeArrays(values, utils, meta) {
    const result = utils.mergeFunctions.mergeArrays(values, utils, meta);
    if (result === actions.defaultMerge ||
        (utils.useImplicitDefaultMerging &&
            result === undefined &&
            utils.mergeFunctions.mergeArrays !== utils.defaultMergeFunctions.mergeArrays)) {
        return utils.defaultMergeFunctions.mergeArrays(values);
    }
    return result;
}
/**
 * Merge sets.
 *
 * @param values - The sets.
 */
function mergeSets(values, utils, meta) {
    const result = utils.mergeFunctions.mergeSets(values, utils, meta);
    if (result === actions.defaultMerge ||
        (utils.useImplicitDefaultMerging &&
            result === undefined &&
            utils.mergeFunctions.mergeSets !== utils.defaultMergeFunctions.mergeSets)) {
        return utils.defaultMergeFunctions.mergeSets(values);
    }
    return result;
}
/**
 * Merge maps.
 *
 * @param values - The maps.
 */
function mergeMaps(values, utils, meta) {
    const result = utils.mergeFunctions.mergeMaps(values, utils, meta);
    if (result === actions.defaultMerge ||
        (utils.useImplicitDefaultMerging &&
            result === undefined &&
            utils.mergeFunctions.mergeMaps !== utils.defaultMergeFunctions.mergeMaps)) {
        return utils.defaultMergeFunctions.mergeMaps(values);
    }
    return result;
}
/**
 * Merge other things.
 *
 * @param values - The other things.
 */
function mergeOthers(values, utils, meta) {
    const result = utils.mergeFunctions.mergeOthers(values, utils, meta);
    if (result === actions.defaultMerge ||
        (utils.useImplicitDefaultMerging &&
            result === undefined &&
            utils.mergeFunctions.mergeOthers !== utils.defaultMergeFunctions.mergeOthers)) {
        return utils.defaultMergeFunctions.mergeOthers(values);
    }
    return result;
}

// themes/<your_theme>/scripts/example.js
function themeConfig() {
    var instance = this instanceof Hexo ? this : hexo;
    var config = instance.config.theme_config;
    var theme_names = [instance.config.theme, "hexo-theme-" + instance.config.theme];
    var theme_dirs = theme_names
        .map(function (name) {
        return [
            path.join(instance.base_dir, "themes", name),
            path.join(instance.base_dir, "node_modules", name),
            path.join(process.cwd(), "themes", name),
            path.join(process.cwd(), "node_modules", name)
        ];
    })
        .flat()
        .filter(fs.existsSync);
    var theme_config_file = theme_dirs
        .map(function (dir) { return path.join(dir, "_config.yml"); })
        .filter(function (filePath) { return fs.existsSync(filePath); })[0];
    if (theme_config_file) {
        config = yaml.parse(fs.readFileSync(theme_config_file, "utf-8"));
    }
    var user_defined_theme_config_file = theme_names
        .map(function (name) {
        return [
            path.join(instance.base_dir, "_config.".concat(name, ".yml")),
            path.join(instance.base_dir, "_config.hexo-theme-".concat(name, ".yml")),
            path.join(process.cwd(), "_config.".concat(name, ".yml")),
            path.join(process.cwd(), "_config.hexo-theme-".concat(name, ".yml"))
        ];
    })
        .flat()
        .filter(function (filePath) { return fs.existsSync(filePath); })[0];
    if (user_defined_theme_config_file) {
        config = Object.assign(config, yaml.parse(fs.readFileSync(user_defined_theme_config_file, "utf-8")));
        if ("nav" in instance.config.theme_config) {
            delete instance.config.theme_config.nav;
        }
        if ("footer_nav" in instance.config.theme_config) {
            delete instance.config.theme_config.footer_nav;
        }
        config = deepmerge(instance.config.theme_config, config);
    }
    return config;
}
hexo.extend.helper.register("themeConfig", themeConfig);

hexo.extend.helper.register("currentYear", function () {
    return new Date().getFullYear();
});

/* eslint-disable no-useless-escape */
var rUrl = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[.\!\/\\w]*))?)/;
/**
 * Fancybox tag
 *
 * Syntax:
 *   {% fancybox /path/to/image [/path/to/thumbnail] [title] %}
 */
hexo.extend.tag.register("fancybox", function (args) {
    var original = args.shift();
    var thumbnail = "";
    if (args.length && rUrl.test(args[0])) {
        thumbnail = args.shift();
    }
    var title = args.join(" ");
    return "<a data-fancybox=\"gallery\" href=\"".concat(original, "\" data-caption=\"").concat(title, "\">\n    <img src=\"").concat(thumbnail || original, "\" alt=\"").concat(title, "\">\n    </a>\n    ").concat(title ? "<span class=\"caption\">".concat(title, "</span>") : "");
});

var base_dir = process.cwd();
if (typeof hexo !== "undefined") {
    base_dir = hexo.base_dir;
}
var CacheHelper = /** @class */ (function () {
    function CacheHelper(baseFolder) {
        this.cache = new Map();
        this.baseFolder = baseFolder;
    }
    CacheHelper.prototype.getCacheKey = function (key) {
        var result = path.join(this.baseFolder, key);
        fs.ensureDirSync(path.dirname(result));
        return result;
    };
    CacheHelper.prototype.set = function (key, value, options) {
        var expiration = (options === null || options === void 0 ? void 0 : options.expirationTime) ? Date.now() + options.expirationTime : undefined;
        this.cache.set(key, { value: value, expiration: expiration });
        fs.writeFileSync(this.getCacheKey(key), JSON.stringify({ value: value, expiration: expiration }));
    };
    CacheHelper.prototype.get = function (key, fallback) {
        // Check memory cache first
        var cached = this.cache.get(key);
        if (cached) {
            if (cached.expiration === undefined || cached.expiration > Date.now()) {
                return cached.value;
            }
            else {
                this.cache.delete(key); // Remove expired entry
            }
        }
        // Check file cache
        try {
            var data = fs.readFileSync(this.getCacheKey(key), "utf-8");
            var parsed = JSON.parse(data);
            if (parsed.expiration === undefined || parsed.expiration > Date.now()) {
                this.cache.set(key, { value: parsed.value, expiration: parsed.expiration });
                return parsed.value;
            }
        }
        catch (_error) {
            // Ignore file read errors (e.g., file not found)
        }
        // Return fallback if no valid cache is found
        return fallback;
    };
    CacheHelper.prototype.has = function (key) {
        var cached = this.cache.get(key);
        if (cached) {
            return cached.expiration === undefined || cached.expiration > Date.now();
        }
        try {
            var data = fs.readFileSync(this.getCacheKey(key), "utf-8");
            var parsed = JSON.parse(data);
            return parsed.expiration === undefined || parsed.expiration > Date.now();
        }
        catch (_error) {
            return false; // File not found or parse error
        }
    };
    return CacheHelper;
}());
/**
 * Reusable cache instance
 */
var hexoThemesCache = new CacheHelper(path.join(base_dir, "tmp", "hexo-themes"));

// Register helper to get posts from the current page
hexo.extend.helper.register("getPosts", function () {
    var page = this.page;
    return page.posts;
});
// Register helper to get the language setting
hexo.extend.helper.register("getLanguage", function (page) {
    var lang;
    if ("lang" in page) {
        lang = page.lang;
    }
    else if ("language" in page) {
        lang = page.language;
    }
    else if ("lang" in hexo.config) {
        lang = hexo.config.lang;
    }
    else if ("language" in hexo.config) {
        lang = hexo.config.language;
    }
    if (typeof lang === "string") {
        return lang;
    }
    else if (Array.isArray(lang)) {
        return lang[0];
    }
    return "en";
});
// Register helper to get posts by label
hexo.extend.helper.register("getPostByLabel", 
/**
 * Get posts by key with name.
 * @param by - The key to filter by ('tags' or 'categories').
 * @param filternames - Array of filter names.
 * @returns Array of posts matching the filters.
 */
function (by, filternames) {
    var hexo = this;
    var data = hexo.site[by].data;
    return filternames.flatMap(function (filtername) {
        return data
            .filter(function (_a) {
            var name = _a.name;
            return String(name).toLowerCase() === filtername.toLowerCase();
        })
            .flatMap(function (group) {
            return group.posts.map(function (_a) {
                var title = _a.title, permalink = _a.permalink, thumbnail = _a.thumbnail, photos = _a.photos;
                return { title: title, permalink: permalink, thumbnail: thumbnail, photos: photos };
            });
        });
    });
});
// Register JSON stringification helper
hexo.extend.helper.register("json_stringify", function (value, spaces) {
    if (value instanceof nunjucks.runtime.SafeString) {
        value = value.toString();
    }
    var jsonString = JSON.stringify(value, null, spaces).replace(/</g, "\\u003c");
    return new nunjucks.runtime.SafeString(jsonString);
});
// Register helper to get object keys
hexo.extend.helper.register("object_keys", function (obj) {
    return Object.keys(obj);
});
// Register helper to check if an object is an array
hexo.extend.helper.register("is_array", function (obj) {
    return Array.isArray(obj);
});
/**
 * Fix URL by removing double slashes and optionally decoding it.
 * @param url - The URL to fix.
 * @param options - Options for fixing the URL.
 * @returns The fixed URL.
 */
function fixURL(url, options) {
    if (options === void 0) { options = {}; }
    var fixed = url.replace(/([^:]\/)\/+/gm, "$1");
    if (options.decode)
        return decodeURI(fixed);
    return fixed;
}
hexo.extend.helper.register("fixURL", fixURL);
// Register helper for canonical URL
hexo.extend.helper.register("canonical_url", function (lang) {
    var path = this.page.path;
    if (lang && lang !== "en")
        path = lang + "/" + path;
    return hutil.full_url_for(path);
});
// Register helper for URL with language
hexo.extend.helper.register("url_for_lang", function (path) {
    var lang = this.page.lang;
    var url = this.url_for(path);
    if (lang !== "en" && url[0] === "/")
        url = "/" + lang + url;
    return url;
});
// Register helper to get the name of the language
hexo.extend.helper.register("lang_name", function (lang) {
    var data = this.site.data.languages[lang];
    return data.name || data;
});
// Register filter to modify template locals
hexo.extend.filter.register("template_locals", function (locals) {
    var page = locals.page;
    if (page.archive)
        page.title = "Archive";
});
// Register helper to parse table of contents
hexo.extend.helper.register("parseToc", function (content) {
    if (typeof content === "string") {
        var parseTOC = function ($) {
            var toc = [];
            var stack = [];
            $("h1, h2, h3, h4, h5, h6").each(function (_, element) {
                var heading = $(element);
                var title = heading.text().trim();
                var link = "#".concat(title.toLowerCase().replace(/\s+/g, "-"));
                var level = parseInt(heading.prop("tagName").charAt(1), 10);
                var item = { title: title, link: link, subItems: [] };
                while (stack.length > 0 && level <= stack[stack.length - 1].level) {
                    stack.pop();
                }
                if (stack.length === 0) {
                    toc.push(item);
                }
                else {
                    stack[stack.length - 1].item.subItems.push(item);
                }
                stack.push({ level: level, item: item });
            });
            return toc;
        };
        var cacheKey = "parseToc-" + utility.md5(content);
        var cacheValue = hexoThemesCache.get(cacheKey, []);
        if (cacheValue.length > 0)
            return cacheValue;
        var $_1 = cheerio.load(content);
        var result = parseTOC($_1);
        hexoThemesCache.set(cacheKey, result);
        return result;
    }
    return [{ error: "Cannot parse table of content" }];
});

/**
 * get author name
 * @param author
 * @returns
 */
function getAuthorName(author) {
    if (typeof author === "string")
        return author;
    if (author && typeof author === "object" && !Array.isArray(author)) {
        if (typeof author.name === "string")
            return author.name;
        if (typeof author.nick === "string")
            return author.nick;
        if (typeof author.nickname === "string")
            return author.nickname;
        if (typeof author.author_obj === "object")
            return getAuthorName(author.author_obj);
    }
}
hexo.extend.helper.register("getAuthorName", function (author, fallback) {
    var resultAuthor = getAuthorName(author);
    if (resultAuthor)
        return resultAuthor;
    var resultFallback = getAuthorName(fallback);
    if (resultFallback)
        return resultFallback;
    return getAuthorName(hexo.config) || "Unknown";
});

// re-implementation fixer of hexo-seo
/**
 * fix SEO on anchors
 * @param $ CherrioAPI
 * @returns
 */
function fixAnchor($, data) {
    $("a").each(function () {
        // avoid duplicate rels
        var currentRel = $(this).attr("rel");
        if (currentRel) {
            // Create a Set to store unique rels
            var rels = new Set(currentRel.split(" "));
            // Update the rel attribute with unique values
            $(this).attr("rel", Array.from(rels).join(" "));
        }
        // add anchor title
        if ($(this).attr("title")) {
            $(this).attr("title", data.title ? "".concat(data.title, " ").concat($(this).attr("href")) : $(this).attr("href"));
        }
    });
    return $;
}
function fixImages($, data) {
    $("img").each(function () {
        var src = $(this).attr("src") || $(this).attr("data-src");
        var alt = $(this).attr("alt") || "";
        if (alt.length === 0) {
            $(this).attr("alt", data.title ? "".concat(data.title, " ").concat(src) : src);
        }
        var title = $(this).attr("title") || "";
        if (title.length === 0) {
            $(this).attr("title", data.title ? "".concat(data.title, " ").concat(src) : src);
        }
        var itemprop = $(this).attr("itemprop");
        if (!itemprop || itemprop.trim() === "") {
            $(this).attr("itemprop", "image");
        }
    });
    return $;
}
/**
 * callback for after_render:html
 * @param content rendered html string
 * @param data current page data
 */
function htmlSeoFixer(content, data) {
    var cacheKey = "seo-" + utility.md5(content);
    var cacheValue = hexoThemesCache.get(cacheKey, null);
    if (cacheValue)
        return cacheValue;
    var $ = cheerio__namespace.load(content);
    $ = fixAnchor($, data);
    $ = fixImages($, data);
    var result = $.html();
    hexoThemesCache.set(cacheKey, result);
    return result;
}
hexo.extend.filter.register("after_render:html", htmlSeoFixer);

hexo.extend.helper.register("injectHeadHtml", function () {
    var file = path.join(hexo.base_dir, "source/_data/hexo-theme-flowbite/head.html");
    if (fs.existsSync(file)) {
        return fs.readFileSync(file, "utf-8");
    }
    return "";
});
hexo.extend.helper.register("injectBodyHtml", function () {
    var file = path.join(hexo.base_dir, "source/_data/hexo-theme-flowbite/body.html");
    if (fs.existsSync(file)) {
        return fs.readFileSync(file, "utf-8");
    }
    return "";
});
hexo.extend.helper.register("injectBeforePostHtml", function () {
    var file = path.join(hexo.base_dir, "source/_data/hexo-theme-flowbite/before-post.html");
    if (fs.existsSync(file)) {
        return fs.readFileSync(file, "utf-8");
    }
    return "";
});
hexo.extend.helper.register("injectAfterPostHtml", function () {
    var file = path.join(hexo.base_dir, "source/_data/hexo-theme-flowbite/after-post.html");
    if (fs.existsSync(file)) {
        return fs.readFileSync(file, "utf-8");
    }
    return "";
});
hexo.extend.helper.register("injectAsideHtml", function () {
    var file = path.join(hexo.base_dir, "source/_data/hexo-theme-flowbite/aside.html");
    if (fs.existsSync(file)) {
        return fs.readFileSync(file, "utf-8");
    }
    return "";
});

hexo.extend.helper.register("next_paginator", function () {
    var _a = this, __ = _a.__, hexoPaginator = _a.paginator;
    var prev = __("accessibility.prev_page");
    var next = __("accessibility.next_page");
    var paginator = hexoPaginator({
        prev_text: '<i class="fa-solid fa-angle-left"></i>',
        next_text: '<i class="fa-solid fa-angle-right"></i>',
        mid_size: 1,
        escape: false
    });
    paginator = paginator
        .replace('rel="prev"', "rel=\"prev\" title=\"".concat(prev, "\" aria-label=\"").concat(prev, "\""))
        .replace('rel="next"', "rel=\"next\" title=\"".concat(next, "\" aria-label=\"").concat(next, "\""));
    return paginator;
});

// forked from hexo-theme-butterfly
// do not include this into hexo-theme-butterfly scripts
/**
 * Function to process the content inside the gallery block and return an array of images with captions and URLs.
 * @param content - The content between {% gallery %} and {% endgallery %}
 * @returns An array of objects containing the image URL and caption
 */
function processGalleryContent(content) {
    // Split the content by newlines to get individual image markdown
    var imageLines = content.trim().split("\n");
    // Initialize an array to store image data
    var images = [];
    // Iterate over each image line
    imageLines.forEach(function (line) {
        // Extract the caption and URL from the markdown image format ![caption](URL)
        var match = line.match(/!\[([^\]]*)\]\((.*)\)/);
        if (match) {
            var caption = match[1]; // The image caption
            var url = match[2]; // The image URL
            images.push({
                url: url,
                caption: caption || "" // If no caption, set as an empty string
            });
        }
    });
    return images;
}
hexo.extend.tag.register("gallery", function (_args, content) {
    // Call the processGalleryContent function to get image data
    var images = processGalleryContent(content).map(function (o) {
        o.alt = o.caption;
        return o;
    });
    // Return the JSON array
    return "<div class=\"gallery-container\"><div class=\"gallery-items\">".concat(JSON.stringify(images, null, 2), "</div></div>");
}, { ends: true });
hexo.extend.tag.register("galleryGroup", function (args) {
    var name = args[0], description = args[1], url = args[2], imgUrl = args[3];
    // Return the required HTML structure
    return "\n      <figure class=\"gallery-group\">\n        <img class=\"gallery-group-img\" src=\"".concat(imgUrl, "\" alt=\"Group Image Gallery\" title=\"Group Image Gallery\" itemprop=\"image\">\n        <figcaption>\n          <div class=\"gallery-group-name\">").concat(name, "</div>\n          <p>").concat(description, "</p>\n          <a href=\"").concat(url, "\"></a>\n        </figcaption>\n      </figure>\n    ");
});

function getKeywords(page) {
    var results = [];
    if (page.keywords && Array.isArray(page.keywords))
        return page.keywords;
    if (page.tags) {
        page.tags.each(function (label) {
            results.push(label.name);
        });
    }
    if (page.categories) {
        page.categories.each(function (label) {
            results.push(label.name);
        });
    }
    return results;
}
hexo.extend.helper.register("getKeywords", getKeywords);

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var truncate;
var hasRequiredTruncate;

function requireTruncate () {
	if (hasRequiredTruncate) return truncate;
	hasRequiredTruncate = 1;

	function isHighSurrogate(codePoint) {
	  return codePoint >= 0xd800 && codePoint <= 0xdbff;
	}

	function isLowSurrogate(codePoint) {
	  return codePoint >= 0xdc00 && codePoint <= 0xdfff;
	}

	// Truncate string by size in bytes
	truncate = function truncate(getLength, string, byteLength) {
	  if (typeof string !== "string") {
	    throw new Error("Input must be string");
	  }

	  var charLength = string.length;
	  var curByteLength = 0;
	  var codePoint;
	  var segment;

	  for (var i = 0; i < charLength; i += 1) {
	    codePoint = string.charCodeAt(i);
	    segment = string[i];

	    if (isHighSurrogate(codePoint) && isLowSurrogate(string.charCodeAt(i + 1))) {
	      i += 1;
	      segment += string[i];
	    }

	    curByteLength += getLength(segment);

	    if (curByteLength === byteLength) {
	      return string.slice(0, i + 1);
	    }
	    else if (curByteLength > byteLength) {
	      return string.slice(0, i - segment.length + 1);
	    }
	  }

	  return string;
	};
	return truncate;
}

var truncateUtf8Bytes;
var hasRequiredTruncateUtf8Bytes;

function requireTruncateUtf8Bytes () {
	if (hasRequiredTruncateUtf8Bytes) return truncateUtf8Bytes;
	hasRequiredTruncateUtf8Bytes = 1;

	var truncate = requireTruncate();
	var getLength = Buffer.byteLength.bind(Buffer);
	truncateUtf8Bytes = truncate.bind(null, getLength);
	return truncateUtf8Bytes;
}

/*jshint node:true*/

var sanitizeFilename;
var hasRequiredSanitizeFilename;

function requireSanitizeFilename () {
	if (hasRequiredSanitizeFilename) return sanitizeFilename;
	hasRequiredSanitizeFilename = 1;

	/**
	 * Replaces characters in strings that are illegal/unsafe for filenames.
	 * Unsafe characters are either removed or replaced by a substitute set
	 * in the optional `options` object.
	 *
	 * Illegal Characters on Various Operating Systems
	 * / ? < > \ : * | "
	 * https://kb.acronis.com/content/39790
	 *
	 * Unicode Control codes
	 * C0 0x00-0x1f & C1 (0x80-0x9f)
	 * http://en.wikipedia.org/wiki/C0_and_C1_control_codes
	 *
	 * Reserved filenames on Unix-based systems (".", "..")
	 * Reserved filenames in Windows ("CON", "PRN", "AUX", "NUL", "COM1",
	 * "COM2", "COM3", "COM4", "COM5", "COM6", "COM7", "COM8", "COM9",
	 * "LPT1", "LPT2", "LPT3", "LPT4", "LPT5", "LPT6", "LPT7", "LPT8", and
	 * "LPT9") case-insesitively and with or without filename extensions.
	 *
	 * Capped at 255 characters in length.
	 * http://unix.stackexchange.com/questions/32795/what-is-the-maximum-allowed-filename-and-folder-size-with-ecryptfs
	 *
	 * @param  {String} input   Original filename
	 * @param  {Object} options {replacement: String | Function }
	 * @return {String}         Sanitized filename
	 */

	var truncate = requireTruncateUtf8Bytes();

	var illegalRe = /[\/\?<>\\:\*\|"]/g;
	var controlRe = /[\x00-\x1f\x80-\x9f]/g;
	var reservedRe = /^\.+$/;
	var windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
	var windowsTrailingRe = /[\. ]+$/;

	function sanitize(input, replacement) {
	  if (typeof input !== 'string') {
	    throw new Error('Input must be string');
	  }
	  var sanitized = input
	    .replace(illegalRe, replacement)
	    .replace(controlRe, replacement)
	    .replace(reservedRe, replacement)
	    .replace(windowsReservedRe, replacement)
	    .replace(windowsTrailingRe, replacement);
	  return truncate(sanitized, 255);
	}

	sanitizeFilename = function (input, options) {
	  var replacement = (options && options.replacement) || '';
	  var output = sanitize(input, replacement);
	  if (replacement === '') {
	    return output;
	  }
	  return sanitize(output, '');
	};
	return sanitizeFilename;
}

var sanitizeFilenameExports = requireSanitizeFilename();
var sanitize = /*@__PURE__*/getDefaultExportFromCjs(sanitizeFilenameExports);

hpp.setConfig(hexo.config);
// Queue to hold the pages to be processed
var pageQueue = [];
var isProcessing = false;
function getCachePath(page) {
    var hash = "empty-hash";
    if (page && "full_source" in page && page.full_source)
        utility.md5FileSync(page.full_source);
    if (hash === "empty-hash") {
        if (page.content) {
            hash = utility.md5(page.content);
        }
        else if (page._content) {
            hash = utility.md5(page._content);
        }
    }
    var result = path.join(process.cwd(), "tmp", "metadata", hexo.config.theme, "post-" + sanitize((page.title || new String(page._id)).substring(0, 100) + "-" + hash));
    utility.fs.ensureDirSync(path.dirname(result));
    return result;
}
/**
 * Preprocess a page and save its parsed result to a cache file
 *
 * @param page - The page object to be processed.
 * @param callback - The callback that handles the result or error.
 */
function metadataProcess(page, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var cachePath, cleanMetadata, handleResult, result, parse, html, cacheKey, cacheValue, $_1, imgTags, randomIndex, result, error_1, err_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!page.full_source) {
                        hexo.log.warn("fail parse metadata from", page.title || page.subtitle || page.permalink);
                        return [2 /*return*/];
                    }
                    cachePath = getCachePath(page);
                    if (utility.fs.existsSync(cachePath) /* && getHexoArgs() === "generate"*/) {
                        return [2 /*return*/]; // Skip if already parsed
                    }
                    cleanMetadata = function (metadata) {
                        Object.keys(metadata).forEach(function (key) {
                            if (metadata[key] == null)
                                delete metadata[key];
                        });
                    };
                    handleResult = function (result) { return __awaiter(_this, void 0, void 0, function () {
                        var error_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!result.metadata)
                                        return [2 /*return*/];
                                    cleanMetadata(result.metadata);
                                    if (!result.metadata.permalink && page.permalink) {
                                        result.metadata.permalink = hutil.url_for.bind(hexo)(page.path);
                                    }
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 6]);
                                    return [4 /*yield*/, utility.fs.promises.writeFile(cachePath, utility.jsonStringifyWithCircularRefs(result))];
                                case 2:
                                    _a.sent();
                                    callback(null, { result: result, cachePath: cachePath });
                                    return [3 /*break*/, 6];
                                case 3:
                                    error_2 = _a.sent();
                                    hexo.log.error("fail save post info", error_2.message);
                                    if (!utility.fs.existsSync(cachePath)) return [3 /*break*/, 5];
                                    return [4 /*yield*/, utility.fs.promises.rm(cachePath, { force: true, recursive: true })];
                                case 4:
                                    _a.sent();
                                    _a.label = 5;
                                case 5:
                                    callback(error_2, null);
                                    return [3 /*break*/, 6];
                                case 6: return [2 /*return*/];
                            }
                        });
                    }); };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 15]);
                    return [4 /*yield*/, hpp.parsePost(page.full_source, { fix: true, cache: true })];
                case 2:
                    result = _a.sent();
                    return [4 /*yield*/, handleResult(result)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 15];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 13, , 14]);
                    if (!page.full_source) return [3 /*break*/, 12];
                    return [4 /*yield*/, hpp.parsePost(page.full_source)];
                case 6:
                    parse = _a.sent();
                    if (!parse.metadata) return [3 /*break*/, 12];
                    html = hpp.renderMarked(parse.body);
                    cacheKey = "metadataProcess-" + utility.md5(parse.body);
                    cacheValue = hexoThemesCache.get(cacheKey, {});
                    if (Object.keys(cacheValue).length > 0) ;
                    else {
                        $_1 = cheerio.load(html);
                        if (!cacheValue.metadata)
                            cacheValue.metadata = {};
                        if (!parse.metadata.description) {
                            parse.metadata.description = $_1.text().slice(0, 150);
                            cacheValue.metadata.description = parse.metadata.description;
                        }
                        if (!parse.metadata.thumbnail) {
                            parse.metadata.thumbnail =
                                "https://rawcdn.githack.com/dimaslanjaka/public-source/6a0117ddb2ea327c80dbcc7327cceca1e1b7794e/images/no-image-svgrepo-com.svg";
                            imgTags = $_1("img").filter(function (i, el) { var _a; return ((_a = $_1(el).attr("src")) === null || _a === void 0 ? void 0 : _a.trim()) !== ""; });
                            if (imgTags.length > 0) {
                                randomIndex = Math.floor(Math.random() * imgTags.length);
                                parse.metadata.thumbnail = $_1(imgTags[randomIndex]).attr("src");
                                cacheValue.metadata.thumbnail = parse.metadata.thumbnail;
                            }
                        }
                        hexoThemesCache.set(cacheKey, cacheValue);
                    }
                    if (!parse.metadata.permalink && page.permalink) {
                        parse.metadata.permalink = page.permalink;
                    }
                    result = { metadata: parse.metadata, rawbody: parse.body };
                    cleanMetadata(result.metadata);
                    _a.label = 7;
                case 7:
                    _a.trys.push([7, 9, , 12]);
                    return [4 /*yield*/, utility.fs.promises.writeFile(cachePath, utility.jsonStringifyWithCircularRefs(result))];
                case 8:
                    _a.sent();
                    callback(null, { result: result, cachePath: cachePath });
                    return [3 /*break*/, 12];
                case 9:
                    error_1 = _a.sent();
                    hexo.log.error("fail save post info", error_1.message);
                    if (!utility.fs.existsSync(cachePath)) return [3 /*break*/, 11];
                    return [4 /*yield*/, utility.fs.promises.rm(cachePath, { force: true, recursive: true })];
                case 10:
                    _a.sent();
                    _a.label = 11;
                case 11:
                    callback(error_1, null);
                    return [3 /*break*/, 12];
                case 12: return [3 /*break*/, 14];
                case 13:
                    err_1 = _a.sent();
                    callback(new Error("fallback metadata failed: " + err_1.message), null);
                    return [3 /*break*/, 14];
                case 14: return [3 /*break*/, 15];
                case 15: return [2 /*return*/];
            }
        });
    });
}
/**
 * Schedule the processing of pages one by one.
 */
function scheduleProcessing() {
    if (isProcessing || pageQueue.length === 0) {
        return; // If already processing or no items in the queue, exit
    }
    isProcessing = true;
    var page = pageQueue.shift(); // Get the first item in the queue
    if (page) {
        metadataProcess(page, function (err, data) {
            if (err) {
                hexo.log.error("Error processing page:", err.message);
            }
            else {
                isProcessing = false;
                if ((data === null || data === void 0 ? void 0 : data.result) && data.result.metadata) {
                    if (!data.result.metadata.permalink) {
                        if (typeof hexo !== "undefined") {
                            hexo.log.error("permalink empty for ".concat(data.result.metadata.title));
                        }
                    }
                    else {
                        saveAsSearch({
                            url: data.result.metadata.permalink,
                            title: data.result.metadata.title || "",
                            description: data.result.metadata.description || ""
                        });
                    }
                }
                setTimeout(scheduleProcessing, 500); // Continue to next item after delay (optional)
            }
        });
    }
}
/**
 * Add pages to the queue and start processing.
 *
 * @param page - The page object to be added to the queue.
 */
function addToQueue(page) {
    pageQueue.push(page);
    scheduleProcessing(); // Start processing if not already running
}
var metadataHelper = function (page) {
    addToQueue(page);
    var cachePath = getCachePath(page);
    if (utility.fs.existsSync(cachePath)) {
        try {
            var result = utility.jsonParseWithCircularRefs(utility.fs.readFileSync(cachePath, "utf-8"));
            if (result && result.metadata) {
                // Assign values to the page object if they exist and are not undefined or null
                for (var key in result.metadata) {
                    if (["type"].includes(key))
                        continue;
                    if (Object.hasOwnProperty.call(result.metadata, key)) {
                        var value = result.metadata[key];
                        if (value !== undefined && value !== null && !page[key]) {
                            // fix: thumbnail always undefined
                            if (key === "cover" && value.includes("no-image-svgrepo"))
                                continue;
                            if (key === "thumbnail" && value.includes("no-image-svgrepo"))
                                continue;
                            page[key] = value;
                        }
                    }
                }
            }
        }
        catch (error) {
            hexo.log.error("fail load post info", error.message);
        }
    }
    return page; // Return the original page for now
};
hexo.extend.helper.register("pageInfo", metadataHelper);

/**
 * get all images from page/post
 * @param page
 */
function getImages(page) {
    var results = [];
    if (page && typeof page === "object") {
        if (typeof page.thumbnail === "string")
            results.push(page.thumbnail);
        if (typeof page.cover === "string")
            results.push(page.cover);
        if (Array.isArray(page.photos)) {
            results.push.apply(results, page.photos);
        }
    }
    if (page.content || page._content) {
        var pageContent = page.content || page._content;
        var cacheKey = "getImages-" + utility.md5(pageContent);
        var cacheValue = hexoThemesCache.get(cacheKey, []);
        if (cacheValue.length === 0) {
            // Collect all image URLs from url
            var $_1 = cheerio.load(pageContent);
            $_1("img").each(function (_, img) {
                var element = $_1(img);
                // Collect URLs from 'src', 'data-src', and 'srcset'
                var src = element.attr("src");
                var dataSrc = element.attr("data-src");
                var srcset = element.attr("srcset");
                if (src)
                    results.push(src);
                if (dataSrc)
                    results.push(dataSrc);
                // If 'srcset' exists, split it into individual URLs (ignoring size descriptors)
                if (srcset) {
                    var srcsetUrls = srcset.split(",").map(function (entry) { return entry.trim().split(" ")[0]; });
                    results.push.apply(results, srcsetUrls);
                }
            });
            hexoThemesCache.set(cacheKey, results);
        }
        else {
            results.push.apply(results, cacheValue);
        }
    }
    var final = _.filter(_.uniq(results), _.identity).filter(function (str) { return !str.includes("no-image-svgrepo-com"); });
    return final;
}
hexo.extend.helper.register("getImages", getImages);
/**
 * get thumbnail url
 * @param page
 */
function getThumbnail(page) {
    if (page && typeof page === "object") {
        // priority defined thumbnail in frontmatter
        if (typeof page.thumbnail === "string")
            return page.thumbnail;
        if (typeof page.cover === "string")
            return page.cover;
    }
    return utility.array_random(getImages(page));
}
hexo.extend.helper.register("getThumbnail", function (page) {
    var result = getThumbnail(page);
    if (result)
        return result;
    return "https://rawcdn.githack.com/dimaslanjaka/public-source/6a0117ddb2ea327c80dbcc7327cceca1e1b7794e/images/no-image-svgrepo-com.svg";
});

var assign = Object.assign;
/**
 * Adds a count property to an array of objects based on a search property.
 *
 * @param array - The array of objects to process.
 * @param searchProperty - The property to search for in the objects.
 * @param newProperty - The property to add a count to.
 * @returns A new array with the count property added.
 */
function addCount(array, searchProperty, newProperty) {
    return array.reduce(function (newArray, item) {
        var i = objectArrayIndexOf(newArray, item[searchProperty], searchProperty);
        if (i === -1) {
            item[newProperty] = 1; // Use type assertion to bypass the index error
            newArray.push(item);
        }
        else {
            newArray[i][newProperty] = newArray[i][newProperty] + 1; // Use type assertion here as well
        }
        return newArray;
    }, []);
}
/**
 * Finds the index of an object in an array based on a search term and property.
 *
 * @param array - The array of objects to search.
 * @param searchTerm - The term to search for.
 * @param property - The property to match against.
 * @returns The index of the object, or -1 if not found.
 */
function objectArrayIndexOf(array, searchTerm, property) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][property] === searchTerm) {
            return i;
        }
    }
    return -1;
}
/**
 * Creates a sorting function based on a property and order.
 *
 * @param property - The property to sort by.
 * @param isAscending - Whether to sort in ascending order.
 * @returns A comparison function for sorting.
 */
function dynamicSort(property, isAscending) {
    var sortOrder = isAscending ? 1 : -1;
    return function (a, b) {
        if (a[property] < b[property]) {
            return -1 * sortOrder;
        }
        else if (a[property] > b[property]) {
            return 1 * sortOrder;
        }
        return 0;
    };
}
/**
 * Shuffles an array in place using the Fisher-Yates algorithm.
 *
 * @param array - The array to shuffle.
 * @returns The shuffled array.
 */
function shuffle(array) {
    var currentIndex = array.length;
    var temporaryValue;
    var randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
/**
 * Lists related posts based on the tags of a given post.
 *
 * @param _post - The post for which to find related posts.
 * @param options - Options for listing related posts.
 * @param _hexo - The hexo instance.
 * @returns An array of related posts.
 */
function listRelatedPosts(_post, options, _hexo) {
    if (!options) {
        options = {};
    }
    options = assign({
        maxCount: 5,
        orderBy: "date",
        isAscending: false
    }, options);
    var orderOption = ["date", "random"];
    if (!orderOption.includes(options.orderBy)) {
        options.orderBy = "date";
    }
    var postList = [];
    _post.tags.each(function (tag) {
        tag.posts.each(function (post) {
            postList.push(post);
        });
    });
    postList = addCount(postList, "_id", "count");
    var thisPostPosition = objectArrayIndexOf(postList, _post._id, "_id");
    postList.splice(thisPostPosition, 1);
    if (options.orderBy === "random") {
        shuffle(postList);
    }
    else {
        postList.sort(dynamicSort(options.orderBy, options.isAscending));
    }
    postList.sort(dynamicSort("count", false));
    return postList;
}
hexo.extend.helper.register("list_related_posts", function (post, options, hexo) {
    return listRelatedPosts(post, options);
});

function chunkArray(array, size) {
    var result = [];
    for (var i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}
hexo.extend.helper.register("chunkArray", chunkArray);

function fix_url_for(source) {
    var instance = this instanceof Hexo ? this : hexo;
    var _a = instance.config.root, root = _a === void 0 ? null : _a;
    // skip hash source or global protocol url
    if (source.startsWith("#") || source.startsWith("//"))
        return source;
    // process non url source
    if (!utility.isValidHttpUrl(source) && root) {
        if (!source.startsWith(root))
            return hutil.url_for.bind(instance)(source);
        return source;
    }
    return source;
}
hexo.extend.helper.register("urlFor", fix_url_for);
