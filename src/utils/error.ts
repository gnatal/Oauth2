export const unauthorized = (message: string) => {
    return new IErrorUnauthorized(401,"Unauthorized","Token expired");
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