import { ClientScope } from "../../entities/clientScopes";
import { Request, Response } from 'express'
import { getRepository } from "typeorm";
import createScopeService from "../../services/Scope/create";

interface ClienteScopeRequest{
    name:string;
}

export default class ClientScopeController{
    async create(req:Request<{},{},ClienteScopeRequest>, res:Response){
        try{

            const {name} = req.body;
            const scope = await createScopeService.execute(name);
            return res.status(201).json(scope);
        }catch(e){
            return res.status(400).json(e);
        }
    }
}