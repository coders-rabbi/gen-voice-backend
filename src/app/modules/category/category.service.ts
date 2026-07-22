import QueryBuilder from "../../builder/QueryBuilder";
import { TCategory } from "./category.interface";
import { Category } from "./category.model";

const createCategoryIntoDB = async (payload: TCategory) => {
  const result = await Category.create(payload);
  return result;
};

const getAllCategoriesFromDB = async (query: Record<string, unknown>) => {
  const searchAbleFiends = ["categoryName", "slug", "description"];

  const newsQuery = new QueryBuilder(Category.find(), query)
    .search(searchAbleFiends)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await newsQuery.modelQuery;
  return result;
};

export const CategoriesServic = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
};
