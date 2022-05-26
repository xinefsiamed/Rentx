import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '../modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '../modules/cars/useCases/listCategory/ListCategoriesController';

const categoriesRoutes = Router();
const uploadImport = multer(uploadConfig.upload('./tmp/imported'));

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post(
  '/import',
  uploadImport.single('file'),
  importCategoryController.handle
);

export { categoriesRoutes };
