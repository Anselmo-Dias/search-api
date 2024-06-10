import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { Decimal } from '@prisma/client/runtime/library'

export class InMemoryUserRepository implements UsersRepository {
  public users: User[] = []

  public async update(data: User) {
    // eslint-disable-next-line
    const { id, email, password, created_at, ...dataUser } = data

    const user = this.users.find((item) => item.id === id)

    if (!user) {
      throw new Error('User not found')
    }

    Object.assign(user, dataUser)

    return user
  }

  public async findById(id: string) {
    const user = await this.users.find((user) => user.id === id)

    if (!user) return null

    return user
  }

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
      cep: data.cep ?? null,
      created_at: new Date(),
      latitude: new Decimal(-10.5482245),
      longitude: new Decimal(-37.540287),
    }

    this.users.push(user)

    return user
  }
}
