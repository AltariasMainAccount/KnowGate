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
exports.PostCommentController = void 0;
var Server_1 = require("../Server");
var PostCommentController = /** @class */ (function () {
    function PostCommentController() {
    }
    PostCommentController.prototype.findAll = function (req, res) {
        var _this = this;
        Server_1.connection.then(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var comments;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection.manager.find(Server_1.PostComment)];
                    case 1:
                        comments = _a.sent();
                        res.json(comments);
                        return [2 /*return*/];
                }
            });
        }); }).catch(function (error) {
            console.error("Error ", error);
            res.json(error);
        });
    };
    ;
    PostCommentController.prototype.find = function (req, res) {
        var _this = this;
        Server_1.connection.then(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var gotComment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection.manager.findOne(Server_1.PostComment, req.params.commentId)];
                    case 1:
                        gotComment = (_a.sent()) || '';
                        if (gotComment instanceof String) {
                            res.json("{ 'Error': 'Element not found' }");
                        }
                        else {
                            res.json(gotComment);
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
    PostCommentController.prototype.create = function (req, res) {
        var _this = this;
        Server_1.connection.then(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var requestComment, assocPost, comment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestComment = req.body;
                        return [4 /*yield*/, connection.manager.findOne(Server_1.Post, req.params.postId)];
                    case 1:
                        assocPost = (_a.sent()) || '';
                        if (!(assocPost instanceof String)) return [3 /*break*/, 2];
                        res.json("{ 'Error': 'Element 'assocPost' not found' }");
                        return [3 /*break*/, 4];
                    case 2:
                        comment = new Server_1.PostComment();
                        comment.content = requestComment.content;
                        comment.rating = requestComment.rating;
                        comment.belongsToPost = assocPost.id;
                        return [4 /*yield*/, connection.manager.save(comment)];
                    case 3:
                        _a.sent();
                        res.json({ message: "Successfully Saved." });
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); }).catch(function (error) {
            console.error("Error ", error);
            res.json(error);
        });
    };
    ;
    PostCommentController.prototype.update = function (req, res) {
        var _this = this;
        Server_1.connection.then(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var comment, requestComment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection.manager.findOne(Server_1.PostComment, req.params.commentId)];
                    case 1:
                        comment = (_a.sent()) || '';
                        if (!(comment instanceof String)) return [3 /*break*/, 2];
                        res.json("{ 'Error': 'Element not found' }");
                        return [3 /*break*/, 4];
                    case 2:
                        requestComment = req.body;
                        // Change the comment           
                        comment.content = requestComment.content;
                        comment.rating = requestComment.rating;
                        return [4 /*yield*/, connection.manager.save(comment)];
                    case 3:
                        _a.sent();
                        res.json({ message: "Successfully Updated." });
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); }).catch(function (error) {
            console.error("Error ", error);
            res.json(error);
        });
    };
    ;
    PostCommentController.prototype.remove = function (req, res) {
        var _this = this;
        Server_1.connection.then(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var comment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection.manager.findOne(Server_1.PostComment, req.params.commentId)];
                    case 1:
                        comment = (_a.sent()) || '';
                        if (!(comment instanceof String)) return [3 /*break*/, 2];
                        res.json("{ 'Error': 'Element 'comment' not found' }");
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, connection.manager.remove(comment)];
                    case 3:
                        _a.sent();
                        res.json({ message: "Successfully Removed." });
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); })
            .catch(function (error) {
            console.error("Error ", error);
            res.json(error);
        });
    };
    ;
    return PostCommentController;
}());
exports.PostCommentController = PostCommentController;
