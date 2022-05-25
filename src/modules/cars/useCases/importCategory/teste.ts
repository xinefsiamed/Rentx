import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { parse as csvParse } from 'csv-parse';
// modulo nativo do NodeJS => File System
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) { }

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = [];

      const stream = fs.createReadStream(file.path);

      const parseFile = csvParse();

      // pegar os pedaços que foram lidos do arquivo csv e faz alguma coisa
      stream.pipe(parseFile);

      parseFile
        .on('data', async (line) => {
          // ["name", "description"] => destruturação
          const [name, description] = line;
          categories.push({
            name,
            description,
          });
        })
        .on('end', () => {
          // deletar o arquivo.csv na pasta "tmp" após o upload
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }

  // recebe o request da Controller e faz alguma coisa
  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async (category) => {
      const { name, description } = category;

      const existCategory = await this.categoriesRepository.findByName(name);

      if (!existCategory) {
        await this.categoriesRepository.create({
          name,
          description,
        });
      }
    });
  }
}

export { ImportCategoryUseCase };
