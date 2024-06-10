import { it, expect, describe, beforeEach, vitest } from 'vitest'
import { UpdateUserUseCase } from '../src/services/update-user.ts'
import { InMemoryUserRepository } from '../src/repositories/in-memory/in-memory-users-repository.ts'
import { UserNotFoundError } from '../src/services/errors/user-not-found.error.ts'


describe('#UpdateUser Suite', () => {
  describe('#updateUser', () => {
    let _updateUser
    let _inMemory

    beforeEach(() => {
      _inMemory = new InMemoryUserRepository()
      _updateUser = new UpdateUserUseCase(_inMemory)  
    })

    it('should to be able update username', async () => {
      // Arrange
      const mockUserInMemory = { 
        name: 'cicada', 
        email: 'anselmo@gmail.com',
        password: '123456',
      }

      const mockUserUpdated = { 
        id: '9d8ac7bc-af09-43f5-924b-f083037e6cc4',
        name: 'cicada dias', 
        email: 'anselmo@gmail.com',
        password: '123456',
      }

      const expectedCreatedAt = new Date()
      vitest.spyOn(
        global, 
        'Date'
      ).mockReturnValue(expectedCreatedAt)
 
      await _inMemory.create(mockUserInMemory)   
 
      // Act  
      const result = await _updateUser.execute({ dataUser: mockUserUpdated })   

      // Assert 

      expect(result.user.id).toStrictEqual(expect.any(String))
    })

    it('should to be able update user cep', async () => {
      // Arrange
      const mockUserInMemory = { 
        name: 'cicada', 
        email: 'anselmo@gmail.com',
        password: '123456',
      }

      const mockUserUpdated = { 
        id: '9d8ac7bc-af09-43f5-924b-f083037e6cc4',
        name: 'cicada dias', 
        email: 'anselmo@gmail.com',
        cep: '49580-000',
      }

      const expectedCreatedAt = new Date()
      vitest.spyOn(
        global, 
        'Date'
      ).mockReturnValue(expectedCreatedAt)
 
      await _inMemory.create(mockUserInMemory)   
 
      // Act  
      const result = await _updateUser.execute({ dataUser: mockUserUpdated })   

      // Assert 

      expect(result.user).toStrictEqual(expect.objectContaining({id: mockUserUpdated.id}))
    })

    it('should throw if update user with userId invalid', async () => {
      // Arrange
      const mockUserUpdated = { 
        id: 'invalid-userId',
        name: 'cicada dias', 
        email: 'anselmo@gmail.com',
        cep: '49580-000',
      }
 
      // Act / Assert  

      await expect(_updateUser.execute({dataUser: mockUserUpdated})).rejects.toBeInstanceOf(UserNotFoundError)
    })
  })
})
