import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Honda',
      daily_rate: 100,
      description: 'Carro de luxo',
      fine_amount: 10,
      license_plate: 'ABC1234',
      name: 'Civic',
      category_id: 'categoryId',
    });

    const car2 = await carsRepositoryInMemory.create({
      brand: 'Honda',
      daily_rate: 100,
      description: 'Carro de luxo',
      fine_amount: 10,
      license_plate: 'ABC1234',
      name: 'Civic',
      category_id: 'categoryId',
    });
    car2.available = false;

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car2 = await carsRepositoryInMemory.create({
      brand: 'Brand2',
      daily_rate: 100,
      description: 'Carro de luxo',
      fine_amount: 10,
      license_plate: 'ABC1234',
      name: 'Car2',
      category_id: 'categoryId',
    });

    const cars = await listCarsUseCase.execute({
      brand: 'Brand2',
    });

    expect(cars).toEqual([car2]);
  });

  it('should be able to list all available cars by name', async () => {
    const car2 = await carsRepositoryInMemory.create({
      brand: 'Brand2',
      daily_rate: 100,
      description: 'Carro de luxo',
      fine_amount: 10,
      license_plate: 'ABC1234',
      name: 'Car2',
      category_id: 'categoryId',
    });

    const cars = await listCarsUseCase.execute({
      name: 'Car2',
    });

    expect(cars).toEqual([car2]);
  });

  it('should be able to list all available cars by category', async () => {
    const car2 = await carsRepositoryInMemory.create({
      brand: 'Brand2',
      daily_rate: 100,
      description: 'Carro de luxo',
      fine_amount: 10,
      license_plate: 'ABC1234',
      name: 'Car2',
      category_id: '12345',
    });

    const cars = await listCarsUseCase.execute({
      category_id: '123345',
    });

    expect(cars).toEqual([car2]);
  });
});
