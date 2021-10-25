"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.ProfileController = void 0;
var Server_1 = require("../Server");
var bcrypt = __importStar(require("bcrypt"));
var ProfileController = /** @class */ (function () {
    function ProfileController() {
    }
    ProfileController.prototype.authenticate = function (un, pw) {
        return __awaiter(this, void 0, void 0, function () {
            var end;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        end = false;
                        return [4 /*yield*/, connection.then(function (connection) { return __awaiter(_this, void 0, void 0, function () {
                                var profile;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, connection.manager.createQueryBuilder(Server_1.Profile, "profile")
                                                .select(["profile.name"])
                                                .addSelect("profile.password")
                                                .where("profile.name = :name", { name: un })
                                                .getOne()];
                                        case 1:
                                            profile = (_a.sent()) || '';
                                            if (!(profile instanceof String)) return [3 /*break*/, 2];
                                            end = false;
                                            return [3 /*break*/, 4];
                                        case 2: return [4 /*yield*/, bcrypt.compare(pw, profile.password).then(function (result) { return result; })];
                                        case 3:
                                            if (_a.sent()) {
                                                end = true;
                                            }
                                            else {
                                                end = false;
                                            }
                                            _a.label = 4;
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, end];
                }
            });
        });
    };
    ProfileController.prototype.findAll = function (req, res) {
        var _this = this;
        connection.then(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var profiles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection.manager.find(Server_1.Profile)];
                    case 1:
                        profiles = _a.sent();
                        res.json(profiles);
                        return [2 /*return*/];
                }
            });
        }); }).catch(function (error) {
            console.error("Error ", error);
            res.json(error);
        });
    };
    ProfileController.prototype.find = function (req, res) {
        var _this = this;
        connection.then(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var gotProfile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection.manager.findOne(Server_1.Profile, req.params.profileId)];
                    case 1:
                        gotProfile = (_a.sent()) || '';
                        if (gotProfile instanceof String) {
                            res.json("{ 'Error': 'Element not found' }");
                        }
                        else {
                            res.json(gotProfile);
                        }
                        return [2 /*return*/];
                }
            });
        }); }).catch(function (error) {
            console.error("Error ", error);
            res.json(error);
        });
    };
    ;
    ProfileController.prototype.create = function (req, res) {
        var _this = this;
        connection.then(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var requestProfile, profile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestProfile = req.body;
                        profile = new Server_1.Profile();
                        profile.name = requestProfile.name;
                        bcrypt.hash(requestProfile.pass, 10, function (err, enc) {
                            profile.password = enc;
                        });
                        profile.description = requestProfile.desc;
                        return [4 /*yield*/, connection.manager.save(profile)];
                    case 1:
                        _a.sent();
                        res.json({ message: "Successfully Saved." });
                        return [2 /*return*/];
                }
            });
        }); }).catch(function (error) {
            console.error("Error ", error);
            res.json(error);
        });
    };
    ;
    ProfileController.prototype.update = function (req, res) {
        var _this = this;
        connection.then(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var profile, requestprofile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection.manager.findOne(Server_1.Profile, req.params.profileId)];
                    case 1:
                        profile = (_a.sent()) || '';
                        if (!(profile instanceof String)) return [3 /*break*/, 2];
                        res.json("{ 'Error': 'Element not found' }");
                        return [3 /*break*/, 6];
                    case 2:
                        requestprofile = req.body;
                        return [4 /*yield*/, this.authenticate(requestprofile.un, requestprofile.pw)];
                    case 3:
                        if (!_a.sent()) return [3 /*break*/, 5];
                        // Change the profile           
                        profile.name = requestprofile.name;
                        profile.description = requestprofile.desc;
                        return [4 /*yield*/, connection.manager.save(profile)];
                    case 4:
                        _a.sent();
                        res.json({ message: "Successfully Updated." });
                        return [3 /*break*/, 6];
                    case 5:
                        res.json({ message: "Unauthenticated." });
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); }).catch(function (error) {
            console.error("Error ", error);
            res.json(error);
        });
    };
    ;
    ProfileController.prototype.remove = function (req, res) {
        var _this = this;
        connection.then(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var profile, requestprofile;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection.manager.findOne(Server_1.Profile, req.params.profileId)];
                    case 1:
                        profile = (_a.sent()) || '';
                        requestprofile = req.body;
                        if (!(profile instanceof String)) return [3 /*break*/, 2];
                        res.json("{ 'Error': 'Element not found' }");
                        return [3 /*break*/, 6];
                    case 2: return [4 /*yield*/, this.authenticate(requestprofile.un, requestprofile.pw)];
                    case 3:
                        if (!_a.sent()) return [3 /*break*/, 5];
                        profile.posts.forEach(function (post) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, connection.manager.remove(post)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, connection.manager.remove(profile)];
                    case 4:
                        _a.sent();
                        res.json({ message: "Successfully Removed." });
                        return [3 /*break*/, 6];
                    case 5:
                        res.json({ message: "Unauthenticated." });
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); })
            .catch(function (error) {
            console.error("Error ", error);
            res.json(error);
        });
    };
    ;
    return ProfileController;
}());
exports.ProfileController = ProfileController;
