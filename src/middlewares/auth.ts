import { ExtractTokenFromHeadersService } from "../services/Auth/extractToken"
import { Request, NextFunction, Response } from 'express'
import { decode } from "../utils/jwt";

export const authenticateUser = async (req: Request<{}, {}, {}>, res: Response, next: NextFunction) => {
    const token = ExtractTokenFromHeadersService.execute(req);
    if (!token) {
        const error = new Error('No token provided');
        const status = 401;
        return res.status(status).json({ error: error.message });
    }
    else {
        try {
            decode(token)        
            return next();    
        }catch(e){
            const error = new Error('Invalid token');
            const status = 401;
            return res.status(status).json({ error: error.message });
        }
    }
}