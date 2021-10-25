import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { Profile } from "../Models/ModelLoader";
import { getProfiles, createProfile, IProfilePayload, getProfile } from "../Repositories/profile.repository";

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
}