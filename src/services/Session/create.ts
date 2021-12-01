import { Session } from "../../entities/session";
import { generateRandomString } from "../../utils/randomStringGenerator";
import { getRepository } from 'typeorm'

const tokenLife = process.env.TOKEN_DURATION_SECONDS as string

export class SessionCreateService{

    static async execute(){
        const session = new Session();
        session.token = generateRandomString(20);
        session.tokenExpirationDate = (new Date()).getTime() + 3600*1000;
        session.refreshToken = generateRandomString(32);
        session.refreshTokenExpirationDate = (new Date()).getTime() + 24*7*60*60*1000; // a week
        console.log("expiration refresh", new Date(session.refreshTokenExpirationDate))
        console.log("expiration token", new Date(session.tokenExpirationDate))
        const sessionRepository = getRepository(Session);
        await sessionRepository.save(session)
        return  session;
    }
}