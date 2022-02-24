import jwt from 'jsonwebtoken';

const tokenLife = process.env.TOKEN_DURATION_SECONDS as string

interface IJwtPayload {
    userId:string;
    clientId:string;
}

/**
 * encodes a payload into a jwt
 * @param payload the payload to be enconded
 * @param expiresIn how much time this token will be valid 
 * @returns the JWT enconded payload
 */

export const encode = (payload:IJwtPayload, expiresIn: number):string =>{
    return jwt.sign(payload, 's3cret', {
        algorithm: 'ES256',
        expiresIn,
    });
}

/**
 * decodes a jwt into a payload
 * @param token the jwt to be decoded 
 * @returns the decoded payload
 */

export const decode = (token:string): string | jwt.JwtPayload =>{
    return jwt.verify(token,'s3cret',{
        algorithms: ['ES256']
    });
}