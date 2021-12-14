import { Client } from '../entities/client'
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { v4 as uuid} from 'uuid'
import { generateRandomString } from '../utils/randomStringGenerator';
import { ClientScope } from '../entities/clientScopes';

interface CreateClientRequest {
  isSpa: boolean;
  name: string;
  redirectUrl: string;
}

export default class ClientController {
    async create(req:Request<{},{},CreateClientRequest>, res:Response){
      const {isSpa, name, redirectUrl} = req.body;
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
      return res.status(201).json(client);
    }
}
