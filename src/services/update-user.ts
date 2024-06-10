import { UsersRepository } from '@/repositories/users-repository'
import { UserNotFoundError } from './errors/user-not-found.error'
import { Prisma, User } from '@prisma/client'

interface UpdateUserUseCaseRequest {
  dataUser: User
}

interface UpdateUserUseCaseResponse {
  user: Prisma.UserUpdateInput
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    dataUser,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const { id } = dataUser
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new UserNotFoundError()
    }

    // eslint-disable-next-line
    const { password, ...userUpdated } =
      await this.usersRepository.update(dataUser)

    return { user: userUpdated }
  }
}
