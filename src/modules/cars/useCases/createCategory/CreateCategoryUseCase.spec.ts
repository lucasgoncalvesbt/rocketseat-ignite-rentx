import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create Category', () => {
  beforeEach(async () => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory,
    );
  });

  it('should be able to create a new category', async () => {
    const category = {
      name: 'Category 1',
      description: 'Category 1 description',
    };
    await createCategoryUseCase.execute(category);

    const CategoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name,
    );

    expect(CategoryCreated).toHaveProperty('id');
  });

  it('should not be able to create a new category  with name exists', async () => {
    const category = {
      name: 'Category 1',
      description: 'Category 1 description',
    };
    await createCategoryUseCase.execute(category);

    await expect(createCategoryUseCase.execute(category)).rejects.toEqual(
      new AppError('Category already exists'),
    );
  });
});
