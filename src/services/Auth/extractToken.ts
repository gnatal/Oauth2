import { Request, Response,  } from 'express'

export class ExtractTokenFromHeadersService{

    /**
     * the token is extracted from the headers token is in the form of: Bearar <token>
     * @param req => request
     * @returns the token from the request headers
     */
    static execute(req: Request<{},{},{}>): string{
        const headers = {...req.headers}
        if(headers.authorization)
            return headers.authorization?.split(" ")[1];
        return "";
    }

}