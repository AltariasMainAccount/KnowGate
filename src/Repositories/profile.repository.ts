import { getRepository } from "typeorm";
import { Profile } from '../Models/ModelLoader';

export interface IProfilePayload {
    name: string;
    password: string;
}

export const getProfiles = async (): Promise<Array<Profile>> => {
    const profileRepository = getRepository(Profile);
    return profileRepository.find();
};
  
export const createProfile = async (payload: IProfilePayload): Promise<Profile> => {
    const profileRepository = getRepository(Profile);
    const profile = new Profile();
    return profileRepository.save({
      ...profile,
      ...payload,
    });
};
  
export const getProfile = async (id: number): Promise<Profile | undefined | null> => {
    const profileRepository = getRepository(Profile);
    const profile = await profileRepository.findOne({ id: id });
    if (!profile) return null;
    return profile;
};