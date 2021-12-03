import { Request, Response,  } from 'express'

export class ExtractTokenFromHeadersService{

    static execute(req: Request<{},{},{}>){
        const headers = {...req.headers}
        return headers.authorization?.split(" ")[1];
    }

}