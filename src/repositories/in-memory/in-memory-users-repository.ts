import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUserRepository implements UsersRepository {
  public users: User[] = []

  public async findByEmail(email: string) {
    const user = await this.users.find((user) => user.email === email)

    if (!user) return null

    return user
  }

  public async create(data: Prisma.UserCreateInput) {
    const user = {
      id: '9d8ac7bc-af09-43f5-924b-f083037e6cc4',
      name: data.name,
      email: data.email,
      password: data.password,
      created_at: new Date(),
    }

    this.users.push(user)

    return user
  }
}
