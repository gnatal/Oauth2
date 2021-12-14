import { Session } from "../../entities/session";
import { generateRandomString } from "../../utils/randomStringGenerator";
import { getRepository } from 'typeorm'

export class SessionCreateService{

    static async execute(pkceHash:string){
        const session = new Session();
        const sessionRepository = getRepository(Session);
        session.authCode = generateRandomString(20)
        session.pkceHash = pkceHash;
        session.authCodeUsed = false;
        await sessionRepository.save(session)
        return  session;
    }
}