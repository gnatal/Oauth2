import { getRepository } from "typeorm";
import { Client } from "../../entities/client";
import { v4 as uuid} from 'uuid'
import { generateRandomString } from "../../utils/randomStringGenerator";
import { ClientScope } from "../../entities/clientScopes";

export default class createClientService{
    //By default all clients are created with the same scope scope changing will be feature for later
    static async execute(name:string, redirectUrl:string, isSpa: boolean){
        const client = new Client();
        client.isSpa = isSpa;
        client.name = name;
        client.redirectUrl = redirectUrl;
        client.clientId = uuid();
        client.secret = generateRandomString(32);
        const scopeRepo = getRepository(ClientScope);
        const scope = await scopeRepo.findOne({scopeName: 'default'}); 
        if(scope)
          client.scope = scope;
        const repository = getRepository(Client);
        await repository.save(client);
        return client;
    }
}