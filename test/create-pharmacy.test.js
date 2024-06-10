import { it, expect, describe, vitest, beforeEach, afterEach, vi } from 'vitest'
import { CreatePharmacyUseCase } from '../src/services/create-pharmacy.ts'
import { InMemoryPharmacyRepository } from '../src/repositories/in-memory/in-memory-pharmacy-repository.ts'

describe('#CreatePharmacy Suite', () => {
  describe('#createPharmacy', () => {
    let _createPharmacy
    let _inMemory

    beforeEach(() => {
      _inMemory = new InMemoryPharmacyRepository()
      _createPharmacy = new CreatePharmacyUseCase(_inMemory) 
    })

    afterEach(() => {
      vi.resetAllMocks()
    })

    it('should br able to create pharmacy', async () => {
      // Arrange
      const mockPharmacy = {
        brand: 'FEMINIS NF (EUF)',
        presentation: 'FEMINIS NF CAPS GEL X 30',
        flag: '5M DROGARIA',
        pvd: '5M DROGARIA COMERCIO E DISTRIBUICAO - 51082740000155',
        brick: '0164008 - S B DO CAMPO-H C BRANCO-3679',
        cep: 9851000,
        cnpj: 51082740000155,
        address: 'HUMBERTO ALENCAR CASTELO BRANCO,3120',
        state: 'SAO PAULO',
        latitude:  -11.1462539,
        longitude: -37.6185966,
      }
      
      // Act 

      const { pharmacy } = await _createPharmacy.execute(mockPharmacy)

      expect(pharmacy.id).toEqual(expect.any(String))
      // Assert
    })
  })
})
