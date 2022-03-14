import { getRepository } from "typeorm";
import { Client } from "../../entities/client";

export default class clientWithScopesService{

    static async execute(clientId:string){
        const repository = getRepository(Client);
        const client = await repository.findOne({id: 1, relations: ['scope']});
        return client;
    }
}