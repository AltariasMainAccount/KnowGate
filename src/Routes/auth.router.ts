import express from "express";
import AuthController from "../Controllers/auth.controller";

const router = express.Router();

router.post("/login", async (req, res) => {
    const controller = new AuthController();
    const response = await controller.login(req.body);
    if (response.res == false) {
        return res.status(401).send({ message: response.error });
    }

    if(response.access_token == null) {
        return res.status(401).send({ message: "Something went wrong." });
    }

    let expireDate = new Date();
    expireDate.setHours(expireDate.getHours()+1);
    
    res.cookie('access_token', response.access_token, {
        expires: expireDate,
        secure: false, // set to true if your using https
        httpOnly: true,
    });

    return res.status(200).send({ 
        message: "Login successful! Cookie created!",
        jwt_access_token: response.access_token 
    });
})

router.post("/register", async (req, res) => {
    const controller = new AuthController();
    const response = await controller.register(req.body);
    if (!response.res) {
        return res.status(401).send({ message: response.error });
    }

    return res.status(200).send({ message: "New user registered" });
})

export default router;