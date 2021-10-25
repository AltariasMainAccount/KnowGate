"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
var typeorm_1 = require("typeorm");
var Post_1 = require("./Post");
var PostComment_1 = require("./PostComment");
var Profile = /** @class */ (function () {
    function Profile() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Profile.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            length: 32
        }),
        __metadata("design:type", String)
    ], Profile.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            length: 64,
            select: false
        }),
        __metadata("design:type", String)
    ], Profile.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.Column)("text"),
        __metadata("design:type", String)
    ], Profile.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function (_type) { return Post_1.Post; }, function (post) { return post.profile; }),
        __metadata("design:type", Array)
    ], Profile.prototype, "posts", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function (_type) { return PostComment_1.PostComment; }, function (comment) { return comment.profile; }),
        __metadata("design:type", Array)
    ], Profile.prototype, "comments", void 0);
    Profile = __decorate([
        (0, typeorm_1.Entity)('Profile'),
        (0, typeorm_1.Unique)(['id', 'name'])
    ], Profile);
    return Profile;
}());
exports.Profile = Profile;
