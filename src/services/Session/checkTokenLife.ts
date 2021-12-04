import { Session } from "../../entities/session";
import { generateRandomString } from "../../utils/randomStringGenerator";
import { getRepository } from 'typeorm'

export class SessionTokenService{

    static async execute(session:Session){
        const now = (new Date()).getTime();
        const hasExpired = (Number(session.token) - now) > 0
        return  hasExpired;
    }
}