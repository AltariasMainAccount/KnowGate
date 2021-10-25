import { Profile, connection, Post } from "../Server";
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';

async function authenticate(un: string, pw: string): Promise<boolean> {
    let end: boolean = false;
    await connection.then(async connection => {
        const profile: Profile | String = await connection.manager.createQueryBuilder(Profile, "profile")
            .select(["profile.name"])
            .addSelect("profile.password")     
            .where("profile.name = :name", { name: un })
            .getOne() || '';
        if (profile instanceof String) { end = false; }
        else {
            if( bcrypt.compare(pw, profile.password).then(function(result) {return result}) ) {
                end = true;
            } else {
                end = false;
            }
        }
    })
    return end;
}

export const findAll = async (req: Request, res: Response) => {
    connection.then(async connection => {
        const profiles: Profile[] = await connection.manager.find(Profile);
        res.json(profiles);
    }).catch(error => {
        console.error("Error ", error);
        res.json(error);
    })
};

export const find = async (req: Request, res: Response) => {
    connection.then(async connection => {
        const gotProfile: Profile | String = await connection.manager.findOne(Profile, req.params.profileId) || '';
        if (gotProfile instanceof String) { res.json("{ 'Error': 'Element not found' }") }
        else { res.json(gotProfile); }
    }).catch(error => {
        console.error("Error ", error);
        res.json(error);        
    })
};

export const create = async (req: Request, res: Response) => {
    connection.then(async connection => {
        let requestProfile = req.body;             
        let profile = new Profile();
        profile.name = requestProfile.name;
        bcrypt.hash(requestProfile.pass, 10, (err, enc) => {
            profile.password = enc;
        });
        profile.description = requestProfile.desc; 
        await connection.manager.save(profile);
        res.json({message: "Successfully Saved."})
    }).catch(error => {
        console.error("Error ", error);
        res.json(error);
    });
};

export const update = async (req: Request, res: Response) => {
    connection.then(async connection => {                
        let profile: Profile | String = await connection.manager.findOne(Profile, req.params.profileId) || '';
        if (profile instanceof String) { res.json("{ 'Error': 'Element not found' }") }
        else {
            let requestprofile = req.body;
            if (authenticate(requestprofile.un, requestprofile.pw)) {
                // Change the profile           
                profile!.name = requestprofile.name;
                profile!.description = requestprofile.desc; 
                await connection.manager.save(profile);
                res.json({message: "Successfully Updated."});
            } else {
                res.json({message: "Unauthenticated."});
            }
        }
    }).catch(error => {
        console.error("Error ", error);
        res.json(error);
    });
};

export const remove = async (req: Request, res: Response) => {
    connection.then(async connection => {
        let profile: Profile | String = await connection.manager.findOne(Profile, req.params.profileId) || '';
        let requestprofile = req.body;
        if (profile instanceof String) { res.json("{ 'Error': 'Element not found' }") }
        else {
            if (authenticate(requestprofile.un, requestprofile.pw)) {
                profile.posts!.forEach(async post => {
                    await connection.manager.remove(post);
                });
                await connection.manager.remove(profile);                
                res.json({message: "Successfully Removed."});
            } else {
                res.json({message: "Unauthenticated."});
            }
        }
        
    })
    .catch(error => {
        console.error("Error ", error);
        res.json(error);
    });
};