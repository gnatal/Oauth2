import { Session } from "../../entities/session";
import { generateRandomString } from "../../utils/randomStringGenerator";
import { getRepository } from 'typeorm'

export class SessionDestroiService{

    static async execute(refreshToken:string){
        try{
            const sessionRepository = getRepository(Session);
            const session = await sessionRepository.findOne({
                where:{
                    refreshToken
                }
            })
            if(session){
                await sessionRepository.remove(session)
            }
            return  true;
        }catch(e){
            return e;
        }
    }
}