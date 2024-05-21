import { it, expect, describe, vitest, beforeEach } from 'vitest'
import { RegisterUseCase } from '../src/services/resgister.ts'
import { InMemoryUserRepository } from '../src/repositories/in-memory/in-memory-users-repository.ts'
import bcrypt from 'bcryptjs'
import { prototype } from 'events'
import { UserAlreadyExistsError } from '../src/services/errors/user-already-exists.error.ts'


describe('#Resgiter Use Case', () => {
  describe('#create', () => {
    let _resgiter
    let _inMemory
    const MOCKED_HASH_PASSWORD = 'hashedpassworduser'

    beforeEach(() => {
      vitest.spyOn( 
        bcrypt,
        'hash'
      ).mockReturnValue(MOCKED_HASH_PASSWORD)

      _inMemory = new InMemoryUserRepository()
      _resgiter = new RegisterUseCase(_inMemory) 
    })

    it('should create user with sucess', async () => {
      // Arrange
      const mockUser = {
        name: 'cicada',
        email: 'anselmo@gmail.com',
        password: '12345'
      }

      const expectedCreatedAt = new Date()
      vitest.spyOn(
        global,
        'Date'
      ).mockReturnValue(expectedCreatedAt)

      // Act 
      await _resgiter.execute(mockUser)  
      const result = _inMemory.users.find(user => user.email === mockUser.email)
      // Assert
      const expected = {
        id: '9d8ac7bc-af09-43f5-924b-f083037e6cc4',
        name: mockUser.name,
        email: mockUser.email,
        password: MOCKED_HASH_PASSWORD,
        created_at: expectedCreatedAt
      }

      expect(result).toStrictEqual(expected)
    })

    it('should return throw if user email exists', async () => {
      // Arrange
      const mockUser = {
        name: 'cicada',
        email: 'anselmo@gmail.com',
        password: '12345'
      }

      // Act 
      await _resgiter.execute(mockUser)  

      // Assert
        
      await expect(() => _resgiter.execute(mockUser)).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })

    it('should return user password in hashed', async () => {
      // Arrange
      const mockUser = {
        name: 'cicada',
        email: 'anselmo@gmail.com',
        password: '12345'
      }

      // Act
      await _resgiter.execute(mockUser)  
      const result = _inMemory.users.find((user) => user.email === mockUser.email)
      
      // Assert 
      const expected = MOCKED_HASH_PASSWORD
      expect(result.password).toBe(expected) 
    })

    it('should call function this hashed password with right params', async () => {
      // Arrange
      const mockInput = {
        name: 'cicada',
        email: 'cicada@gmail.com',
        password: '12345'
      }

      // Act
      await _resgiter.execute(mockInput)

      // Assert
      expect(bcrypt.hash).toHaveBeenCalledTimes(1)
      expect(bcrypt.hash).toHaveBeenCalledWith(mockInput.password, 6)
    })
  })
})
