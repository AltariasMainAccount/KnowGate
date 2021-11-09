import { Get, Route, Tags, Post, Body, Path, Put, Delete } from "tsoa";
import { DeleteResult } from "typeorm";
import { Profile } from "../Models/ModelLoader";
import { getProfiles, createProfile, IProfilePayload, getProfile, updateProfile, deleteProfile } from "../Repositories/profile.repository";

@Route("profiles")
@Tags("Profile")
export default class ProfileController {
  @Get("/")
  public async getProfiles(): Promise<Array<Profile>> {
    return getProfiles();
  }

  @Post("/")
  public async createProfile(@Body() body: IProfilePayload): Promise<Profile> {
    return createProfile(body);
  }

  @Get("/:id")
  public async getProfile(@Path() id: string): Promise<Profile | null | undefined> {
    return getProfile(Number(id));
  }

  @Put("/:id")
  public async updateProfile(@Path() id: string, @Body() body: IProfilePayload): Promise<Profile | null | undefined> {
    return updateProfile(Number(id), body);
  }

  @Delete("/:id")
  public async deleteProfile(@Path() id: string): Promise<DeleteResult | null | undefined> {
    return deleteProfile(Number(id));
  }
}