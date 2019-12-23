"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 翻译资源目录形如
.
├── values
│   └── zh.json
└── values-zh-rCN
    └── zh.json
 */
var path = require("path");
var utils_1 = require("./utils");
var Translation = /** @class */ (function () {
    function Translation(_a) {
        var rootPath = _a.rootPath, originalDirName = _a.originalDirName, originalFileName = _a.originalFileName;
        this.originalDirName = originalDirName;
        this.originalFileName = originalFileName;
        this.rootPath = rootPath;
    }
    Translation.prototype.resolve = function (_a) {
        var outputNameResolver = _a.outputNameResolver;
        return __awaiter(this, void 0, void 0, function () {
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = this;
                        return [4 /*yield*/, this.readContent()];
                    case 1:
                        _b.content = _c.sent();
                        this.outputName = outputNameResolver(this);
                        return [2 /*return*/];
                }
            });
        });
    };
    Translation.prototype.readContent = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, utils_1.fsPromises.readFile(path.join(this.rootPath, this.originalDirName, this.originalFileName), {
                        encoding: 'utf-8'
                    })];
            });
        });
    };
    return Translation;
}());
var SyncTaskRunner = /** @class */ (function () {
    function SyncTaskRunner(options) {
        this.options = options;
        this.errors = [];
    }
    SyncTaskRunner.prototype.preSync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var translationDirs, i;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.getSubDirNames(this.options.translationsRootPath)];
                    case 1:
                        translationDirs = _a.sent();
                        this.translations = translationDirs.map(function (dirName) { return new Translation({
                            rootPath: _this.options.translationsRootPath,
                            originalDirName: dirName,
                            originalFileName: _this.options.translationFileName
                        }); });
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < this.translations.length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.translations[i].resolve({
                                outputNameResolver: this.outputNameResolver.bind(this)
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SyncTaskRunner.prototype.outputNameResolver = function (t) {
        var outputNameMap = this.options.outputNameMap;
        var filename = '';
        var ext = '.json';
        if (outputNameMap[t.originalDirName]) {
            filename = outputNameMap[t.originalDirName];
        }
        else if (t.originalDirName === 'values') {
            filename = 'en';
        }
        else {
            filename = t.originalDirName.replace('values-', '');
        }
        return "" + filename + ext;
    };
    SyncTaskRunner.prototype.sync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, t;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.translations.length)) return [3 /*break*/, 4];
                        t = this.translations[i];
                        if (t.content == null) {
                            this.errors.push(new Error(t.originalDirName + 'translation content is empty!'));
                        }
                        return [4 /*yield*/, utils_1.fsPromises.writeFile(path.resolve(this.options.outputPath, t.outputName), t.content)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SyncTaskRunner.prototype.postSync = function () {
        if (this.errors.length) {
            this.errors.forEach(function (e) {
                console.log(e);
            });
        }
        else {
            console.log('sync translations successfully!');
        }
    };
    return SyncTaskRunner;
}());
/**
 *
 * @param options
 */
function syncTranslations(options) {
    return __awaiter(this, void 0, void 0, function () {
        var taskRunner;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    taskRunner = new SyncTaskRunner(options);
                    return [4 /*yield*/, taskRunner.preSync()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, taskRunner.sync()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, taskRunner.postSync()];
                case 3:
                    _a.sent();
                    return [2 /*return*/, true];
            }
        });
    });
}
exports.default = syncTranslations;
