export const unauthorized = (message: string) => {
    return new IErrorUnauthorized(401,"Unauthorized","Token expired");
}

export const fakeToken = (message: string) => {
    return new IErrorMalformed(401,"Unauthorized","Token not valid");
}

export const genericError = (message: string) => {
    return new IErrorUnknow(422,"Unauthorized","Unknow error");
}


export class IErrorUnauthorized {
    status: number;
    error: string;
    message: string;

    constructor(status:number, error:string, message:string) {
        this.status = status;
        this.error = error;
        this.message = message;
    }
}

export class IErrorMalformed {
    status: number;
    error: string;
    message: string;

    constructor(status:number, error:string, message:string) {
        this.status = status;
        this.error = error;
        this.message = message;
    }
}

export class IErrorUnknow {
    status: number;
    error: string;
    message: string;

    constructor(status:number, error:string, message:string) {
        this.status = status;
        this.error = error;
        this.message = message;
    }
}