import expressJwt from 'express-jwt';
import 'dotenv/config'
const SECRET = process.env.SECRET;

export function jwt() {
    return expressJwt({ 
        secret: `${SECRET}`, 
        algorithms: ['HS256'],
        getToken: function fromCookieOrHeader (req) {
            //get cookie token from request
            const token: string = req.cookies.access_token;
            
            if (token) {
                return token;
            } else if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                return req.headers.authorization.split(' ')[1];
            }
            return null;
        }
    }).unless({
        path: [
            // public routes that don't require authentication
            '/',
            "/login",
            "/register",
            "/about",
            "/contact",
            "/news",
            "/api/auth/register",
            "/api/auth/login"
        ]
    });
}