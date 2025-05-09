import { Request } from "express";


declare global {
    namespace Express {

        interface Request {
            user: {
                id: any;
                name: string;
                email: string;
                verified: boolean;
                avatar?: string;
                followers: number;
                followings: number;
            }
        }
    }
}


export interface CreateUser extends Request {
    body: {
        name: string;
        email: string;
        password: string;
    }
}
export interface VerifyEmailReqeuest extends Request {
    body: {
        userId: string;
        token: string;
    }
}

