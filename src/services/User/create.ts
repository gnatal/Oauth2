import { getRepository } from 'typeorm'
import { User } from '../../entities/user'
import { hashIt } from '../../utils/password';
import { SessionCreateService } from '../Session/create'


export default class CreateUserService {

    static async execute(email: string, password: string) {
        const user = new User();
        const userRepository = getRepository(User);
        user.email = email;
        user.password = hashIt(password);
        const session = await SessionCreateService.execute('213');
        user.sessions = [session];
        await userRepository.save(user);
        return user;
    }
}