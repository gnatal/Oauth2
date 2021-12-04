import sha256 from 'crypto-js/sha256';

export const authenticatePKCE = (pkce_key:string, hash: string) => {
    if(sha256(pkce_key).toString() == hash)
        return true;
    return false;
}