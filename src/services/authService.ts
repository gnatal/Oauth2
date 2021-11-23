export class authenticationService{

    async execute({email, password}:{email:string, password:string}){
        const user = await this.authService.login(email, password)
        if (!user) {
            return res.status(401).json({ message: 'Login failed' })
        }
        return res.json(user)
    }

    }
}