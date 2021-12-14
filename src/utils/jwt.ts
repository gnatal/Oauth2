import jwt from 'jsonwebtoken';

interface IJwtPayload {
    userId:string;
    clientId:string;
}

export const encode = (payload:IJwtPayload):string =>{
    return jwt.sign(payload, 's3cret');
}

export const decode = (token:string): string | jwt.JwtPayload =>{
    return jwt.verify(token,'s3cret');
}