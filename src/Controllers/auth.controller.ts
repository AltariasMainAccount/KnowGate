import { Get, Route, Tags, Post, Body, Path, Put, Delete } from "tsoa";
import { DeleteResult } from "typeorm";
import { Profile } from "../Models/ModelLoader";
import { loginUser, registerNewUser, IAuthenticationPayload, IAuthResponseObject, ITokenCarrier } from "../Repositories/auth.repository";

@Route("auth")
@Tags("Auth")
export default class AuthController {
    @Post("/login")
    public async login(@Body() body: IAuthenticationPayload): Promise<IAuthResponseObject> {
        return loginUser(body);
    }

    @Post("/register")
    public async register(@Body() body: IAuthenticationPayload): Promise<IAuthResponseObject> {
        return registerNewUser(body);
    }
}