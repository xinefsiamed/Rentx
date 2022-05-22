import { Category } from '../../entities/Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) { } //eslint-disable-line

  execute(): Category[] {
    const categories = this.categoriesRepository.list();

    return categories;
  }
}
export { ListCategoriesUseCase };
