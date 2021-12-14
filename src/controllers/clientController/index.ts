import { Client } from '../../entities/client'
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { v4 as uuid} from 'uuid'
import { generateRandomString } from '../../utils/randomStringGenerator';
import { ClientScope } from '../../entities/clientScopes';
import createClientService from '../../services/clientService/create';

interface CreateClientRequest {
  isSpa: boolean;
  name: string;
  redirectUrl: string;
}

export default class ClientController {
    async create(req:Request<{},{},CreateClientRequest>, res:Response){
      try{

        const {isSpa, name, redirectUrl} = req.body;
        const client = await createClientService.execute(name, redirectUrl, isSpa);
        return res.status(201).json(client);
      }catch(e){
        return res.status(400).json(e);
      }
    }
}
