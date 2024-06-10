import { describe, beforeEach, it, expect } from 'vitest'
import { FetchPharmaciesUseCase } from '../src/services/fetch-phamacies.ts'
import { InMemoryPharmacyRepository } from '../src/repositories/in-memory/in-memory-pharmacy-repository.ts'

describe('#FetchPharmacies Suite', () => {
  describe('#fetchPharmacy', () => {
    let sut
    let _inMemory

    beforeEach(() => {
      _inMemory = new InMemoryPharmacyRepository()
      sut = new FetchPharmaciesUseCase(_inMemory) 
    })

    it('should to be able fetch pharmacies', async () => {
      // Arrange
      await _inMemory.create({
        id: 'pharmacy-01',
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
      })

      await _inMemory.create({
        id: 'pharmacy-02',
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
      })
      // Act

      const { pharmacies } = await sut.execute({page: 1,})
      // Assert
      expect(pharmacies).toHaveLength(2)
      expect(pharmacies).toEqual([
        expect.objectContaining({id: 'pharmacy-01'}),
        expect.objectContaining({id: 'pharmacy-02'})
      ])
    })

    it('should to be able fetch pagination pharmacies', async () => {
      // Arrange
      for(let i = 1; i <= 22; i++) {
        await _inMemory.create({
          id: `pharmacy-${i}`,
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
        })
      }
      // Act

      const { pharmacies } = await sut.execute({ page: 2, }) 
      // Assert
      expect(pharmacies).toHaveLength(2) 
      expect(pharmacies).toEqual([
        expect.objectContaining({id: 'pharmacy-21'}),
        expect.objectContaining({id: 'pharmacy-22'})
      ])
    })
  })
})