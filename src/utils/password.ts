import bcrypt from 'bcrypt'

const saltRounds = 10

export const hashIt = (password: string) => {
  return bcrypt.hash(password, saltRounds, (err, hash) => {
    console.log('hash done', hash)
  })
}
