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
exports.PostComment = void 0;
var typeorm_1 = require("typeorm");
var Profile_1 = require("./Profile");
var Post_1 = require("./Post");
var PostComment = /** @class */ (function () {
    function PostComment() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], PostComment.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "text",
        }),
        __metadata("design:type", String)
    ], PostComment.prototype, "content", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", Number)
    ], PostComment.prototype, "profileId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function (_type) { return Profile_1.Profile; }, function (prof) { return prof.comments; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", Profile_1.Profile)
    ], PostComment.prototype, "profile", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", Number)
    ], PostComment.prototype, "postId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function (_type) { return Post_1.Post; }, function (post) { return post.comments; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", Post_1.Post)
    ], PostComment.prototype, "post", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], PostComment.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], PostComment.prototype, "updatedAt", void 0);
    PostComment = __decorate([
        (0, typeorm_1.Entity)()
    ], PostComment);
    return PostComment;
}());
exports.PostComment = PostComment;
