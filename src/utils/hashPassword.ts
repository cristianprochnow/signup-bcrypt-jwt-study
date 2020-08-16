import * as bcrypt from 'bcrypt'

async function hashPassword (password: string|number) {
  const saltRounds = 12

  const hashedPassword = await bcrypt.hash(
    password,
    saltRounds,
    (error, hash) => {
      if (!error) {
        return hash
      } else {
        throw new Error('Ooops... Something was wrong along the hash.')
      }
    }
  )

  return hashedPassword
}

export { hashPassword }
