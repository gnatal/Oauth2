import { Session } from "../../entities/session";
import { generateRandomString } from "../../utils/randomStringGenerator";
import { getRepository } from 'typeorm'

export class SessionCreateService{

    static async execute(pkce_hash:string){
        const session = new Session();
        const sessionRepository = getRepository(Session);
        session.auth_code = generateRandomString(20)
        session.pkce_hash = pkce_hash;
        session.auth_code_used = false;
        await sessionRepository.save(session)
        return  session;
    }
}