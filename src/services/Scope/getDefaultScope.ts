import { getRepository } from "typeorm";
import { ClientScope } from "../../entities/clientScopes";

export default class defaultScopeService{
    static async execute(): Promise<ClientScope>{
        try{
            const scopeRepository = getRepository(ClientScope);
            const scope = await scopeRepository.findOne({scopeName: 'default'});
            if(!scope){
                const scope = new ClientScope();
                scope.scopeName = 'default';
                await scopeRepository.save(scope);
                return scope;
            }
            return scope;
        } catch(e){
            console.log(e);
            return e;
        }
    }
}