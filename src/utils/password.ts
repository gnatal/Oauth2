import bcrypt from 'bcrypt'

const saltRounds = 10

export const hashIt = (password: string) => {
  const hash = bcrypt.hashSync(password, saltRounds)
  return hash
}

export const compareIt = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash)
}
