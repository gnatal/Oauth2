import { Session } from "../../entities/session";
import { generateRandomString } from "../../utils/randomStringGenerator";
import { getRepository } from 'typeorm'
import { decode } from "jsonwebtoken";
import { encode, IJwtPayload } from "../../utils/jwt";

export class SessionRefreshTokenService{

    static async execute(refreshToken:string){
        try{
            const sessionRepository = getRepository(Session);
            const session = await sessionRepository.findOneOrFail({
                where:{
                    refreshToken
                }
            })
            const payload = (decode(refreshToken) as IJwtPayload);
            if(payload){
                const token = encode({clientId:payload.clientId,userId:payload.userId}, Number(process.env.TOKEN_DURATION_SECONDS));
                session.token = token;
                await sessionRepository.save(session)
                return session;
            } else {
                throw "error refresh token invalid";
            }
        }catch(e){
            return e;
        }
    }
}