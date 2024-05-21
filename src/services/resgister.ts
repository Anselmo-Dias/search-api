import bcrypt from 'bcryptjs'
import { UsersRepository } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists.error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const passwordHash = await bcrypt.hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    // eslint-disable-next-line
    const { password: userPassword, ...rest } =
      await this.usersRepository.create({
        name,
        email,
        password: passwordHash,
      })

    return { rest }
  }
}
