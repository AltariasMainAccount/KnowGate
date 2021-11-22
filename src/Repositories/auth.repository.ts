import { DeleteResult, getRepository } from "typeorm";
import { Profile } from '../Models/ModelLoader';
import { validate } from "class-validator";
import * as bcrypt from 'bcrypt';

export interface IAuthenticationPayload {
    name: string;
    password: string;
}

export interface IAuthResponseObject {
    res: boolean;
    error?: string;
    access_token?: string;
}

export interface ITokenCarrier {
    access_token: string;
}

const verifyPassword = (password: string, hash: string) => {  
    return bcrypt.compareSync(password, hash);
}

export const loginUser = async (payload: IAuthenticationPayload): Promise<IAuthResponseObject> => {
    const profileRepository = getRepository(Profile);

    // Split the values of the payload into useable things
    const username: string = payload.name;
    const password: string = payload.password;

    // try to get the user with that name
    
    try {
        const profile: Profile | undefined = await profileRepository.createQueryBuilder("profile").where("profile.name = :name", { name: username }).addSelect("profile.password").getOne();
        if (profile && !verifyPassword(password, profile.password)) {
           return { res: false, error: "Password invalid" };
        }
        return { res: true, access_token: profile?.generateJWT() };
    } catch (e) {
        console.log(e);
        return { res: false, error: "Something went wrong! Contact System Administrator!" };
    }
}

export const registerNewUser = async (payload: IAuthenticationPayload): Promise<IAuthResponseObject> => {
    const profileRepository = getRepository(Profile);

    // Split the values of the payload into useable things
    const username: string = payload.name;
    const password: string = payload.password;

    // Create a new profile
    const profile = new Profile();

    // Set the name and the password of that profile to what is offered in the payload
    profile.name = username;
    profile.password = await profile.setPassword(password);

    // Validate the profile as legitimate
    const errors = await validate(profile);
    // errors is an array of validation errors
    if (errors.length > 0) {
        console.log('validation failed. errors: ', errors);
        return { res: false, error: "Something went wrong during validation! Make sure everything is in working order!" }
    }
    
    // Try to save the profile
    try {
        await profileRepository.save(profile);
    } catch (e) {
        console.log("[ERROR] - Something went wrong at the register path");
        console.log(e);
        return { res: false, error: "Something went wrong! Contact System Administrator!" }
    }

    return { res: true }
}