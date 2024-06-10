import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-exists-error'

interface GetUseProfileUseCaseRequest {
  userId: string
}
interface GetUseProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private useRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUseProfileUseCaseRequest): Promise<GetUseProfileUseCaseResponse> {
    const user = await this.useRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}
