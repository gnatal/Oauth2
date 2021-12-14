import { Session } from "../../entities/session";
import { generateRandomString } from "../../utils/randomStringGenerator";
import { getRepository } from 'typeorm'
import  {secondsToTimestamp} from '../../utils/timestampToSeconds'

const tokenLife = process.env.TOKEN_DURATION_SECONDS as string
const DAY_IN_SECONDS = process.env.DAY_IN_SECONDS as string
const refreshTokenLife = Number(DAY_IN_SECONDS)*7;

export class SessionCreateTokenService{

    static async execute(session: Session){
        session.token = generateRandomString(20);
        session.tokenExpirationDate = (new Date()).getTime() + secondsToTimestamp(Number(tokenLife));
        session.refreshToken = generateRandomString(32);
        session.refreshTokenExpirationDate = (new Date()).getTime() + secondsToTimestamp(refreshTokenLife); // a week
        const sessionRepository = getRepository(Session);
        await sessionRepository.save(session)
        session.authCodeUsed = true;
        return  session;
    }
}