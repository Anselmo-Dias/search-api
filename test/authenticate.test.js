import { it, expect, describe, vitest, beforeEach } from 'vitest'
import { AuthenticateUseCase } from '../src/services/authenticate.ts'
import { InMemoryUserRepository } from '../src/repositories/in-memory/in-memory-users-repository.ts'
import bcrypt from 'bcryptjs'
import { InvalidCredentialsError } from '../src/services/errors/invalid-credentials.error.ts'


describe('#Authenticate Use Case', () => {
  describe('#authenticate', () => {
    let _authenticate
    let _inMemory
    const MOCKED_HASH_PASSWORD = 'hashedpassworduser'

    beforeEach(() => {
      vitest.spyOn( 
        bcrypt,
        'hash'
      ).mockReturnValue(MOCKED_HASH_PASSWORD)

      _inMemory = new InMemoryUserRepository()
      _authenticate = new AuthenticateUseCase(_inMemory) 
    })

    it('should authenticate user', async () => {
      // Arrange
      const mockUser = {
        name: 'cicada',
        email: 'anselmo@gmail.com',
        password: '123456'
      }

      const mockUserInMemory = {
        name: 'cicada', 
        email: 'anselmo@gmail.com',
        password: MOCKED_HASH_PASSWORD
      }

      const expectedCreatedAt = new Date()
      vitest.spyOn(
        global,
        'Date'
      ).mockReturnValue(expectedCreatedAt)

      await _inMemory.create(mockUserInMemory)

      vitest.spyOn(
        bcrypt,
        "compare" 
      ).mockReturnValue(true)

      // Act 
      const result = await _authenticate.execute(mockUser)   

      // // Assert
      const expected = {
        id: '9d8ac7bc-af09-43f5-924b-f083037e6cc4',
        name: mockUser.name,
        email: mockUser.email,
        password: MOCKED_HASH_PASSWORD,
        created_at: expectedCreatedAt
      }

      expect(result.user).toStrictEqual(expected)
    })

    it('should throw if authenticate user with invalid email', async () => {
      // Arrange
      const mockUser = {
        name: 'cicada',
        email: 'anselmo@gmail.com',
        password: '123456'
      } 

      // Act / Assert

      await expect(_authenticate.execute(mockUser)).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should throw if authenticate user with invalid password', async () => {
      // Arrange
      const mockUser = {
        name: 'cicada',
        email: 'anselmo@gmail.com',
        password: '123456'
      } 

      const mockUserInMemory = {
        name: 'cicada', 
        email: 'anselmo@gmail.com', 
        password: MOCKED_HASH_PASSWORD
      }

      await _inMemory.create(mockUserInMemory)

      vitest.spyOn(
        bcrypt,
        "compare" 
      ).mockReturnValue(false)

      // Act / Assert

      await expect(_authenticate.execute(mockUser)).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
  })
})
