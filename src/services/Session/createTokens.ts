import { Session } from "../../entities/session";
import { generateRandomString } from "../../utils/randomStringGenerator";
import { getRepository } from 'typeorm'
import  {secondsToTimestamp} from '../../utils/timestampToSeconds'
import { encode } from "../../utils/jwt";

const tokenLife = process.env.TOKEN_DURATION_SECONDS as string
const DAY_IN_SECONDS = process.env.DAY_IN_SECONDS as string
const refreshTokenLife = Number(DAY_IN_SECONDS)*7;

export class SessionCreateTokenService{

    static async execute(session: Session, clientId:string, userId:string){
        session.token = encode({clientId,userId}, Number(tokenLife));
        // session.tokenExpirationDate = (new Date()).getTime() + secondsToTimestamp(Number(tokenLife));
        session.refreshToken = encode({clientId,userId}, Number(refreshTokenLife));
        // session.refreshTokenExpirationDate = (new Date()).getTime() + secondsToTimestamp(refreshTokenLife); // a week
        const sessionRepository = getRepository(Session);
        await sessionRepository.save(session)
        session.authCodeUsed = true;
        return  session;
    }
}