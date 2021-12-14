import { getRepository } from "typeorm";
import { Client } from "../../entities/client";

export default class CheckClientIdentityService{

    static async execute(clientId:string, clientSecret:string){
        const repository = getRepository(Client);
        const client = await repository.findOneOrFail({clientId, clientSecret})
        return client;
    }
}