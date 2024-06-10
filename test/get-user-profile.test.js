import { it, expect, describe, beforeEach, vitest } from 'vitest'
import { GetUserProfileUseCase } from '../src/services/get-user-profile.ts'
import { InMemoryUserRepository } from '../src/repositories/in-memory/in-memory-users-repository.ts'
import { ResourceNotFoundError } from '../src/services/errors/resource-not-exists-error.ts'


describe('#GetUserProfile Suite', () => {
  describe('#getUserProfile', () => {
    let _getUserProfile
    let _inMemory

    beforeEach(() => {
      _inMemory = new InMemoryUserRepository()
      _getUserProfile = new GetUserProfileUseCase(_inMemory) 
    })

    it('should get user profile', async () => {
      // Arrange
      const MOCKED_USER_ID = '9d8ac7bc-af09-43f5-924b-f083037e6cc4'

      const mockUserInMemory = { 
        name: 'cicada', 
        email: 'anselmo@gmail.com',
        password: '123456'
      }
 
      await _inMemory.create(mockUserInMemory)   

      const expectedCreatedAt = new Date()
      vitest.spyOn(
        global, 
        'Date'
      ).mockReturnValue(expectedCreatedAt)
 
      // Act  
      const result = await _getUserProfile.execute({ userId: MOCKED_USER_ID })   

      // Assert  

      expect(result.user.id).toStrictEqual(expect.any(String))
    })

    it('should throw if userId is invalid', async () => {
      // Arrange
      const mockUserId = 'invalid-userId'

      // Act / Assert  

      await expect(_getUserProfile.execute({userId: mockUserId})).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
  })
})
