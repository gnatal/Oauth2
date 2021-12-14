import jwt from 'jsonwebtoken';

export const encode = (payload:string):string =>{
    return jwt.sign(payload, 's3cret');
}

export const decode = (token:string): string | jwt.JwtPayload =>{
    return jwt.verify(token,'s3cret');
}