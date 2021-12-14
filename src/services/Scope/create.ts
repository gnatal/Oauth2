import { getRepository } from "typeorm";
import { ClientScope } from "../../entities/clientScopes";

export default class createScopeService{
    static async execute(name:string){
        const scope = new ClientScope();
        scope.scopeName = name;
        const repository = getRepository(ClientScope);
        await repository.save(scope);
        return scope;
    }
}