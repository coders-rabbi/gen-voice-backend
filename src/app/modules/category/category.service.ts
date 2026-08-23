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

const updateSingleCategoryIntoDB = async (
  id: string,
  payload: Partial<TCategory>,
) => {
  const result = await Category.findByIdAndUpdate(
    id,
    { $set: payload },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!result) {
    throw new Error("Category not found"); // চাইলে AppError দিয়ে প্রপার error handling করুন
  }

  return result;
};

const deleteSingleCategoryFromBD = async (id: string) => {
  const result = await Category.findByIdAndUpdate(
    id,
    { $set: { isDeleted: true } },
    { returnDocument: "after" },
  );

  if (!result) {
    throw new Error("Category not found");
  }

  return result;
};

export const CategoriesServic = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
  updateSingleCategoryIntoDB,
  deleteSingleCategoryFromBD,
};
