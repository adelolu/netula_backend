import { FilterQuery, HydratedDocument, Types } from "mongoose";
import Product from "../models/product";
import { IProduct } from "../types/product";
import { Paging } from "../types/custom";

export const createProduct = async (
  product: IProduct
): Promise<HydratedDocument<IProduct>> => {
  return await new Product(product).save();
};

export const findProductById = async (id: Types.ObjectId | string) => {
  return await Product.findById(id);
};

export const findProductByMatch = async (data: FilterQuery<IProduct>) => {
  return await Product.findOne(data);
};

export const findProductsByMatch = async (
  data: FilterQuery<IProduct>,
  paging: Paging
) => {
  return await Product.find(data)
    .sort({ [paging.sortBy!]: paging.sort! })
    .skip(paging.skip!)
    .limit(paging.limit!);
};

export const findProductByIdAndUpdate = async (
  productId: string | Types.ObjectId,
  data: Partial<IProduct>
) => {
  return await Product.findByIdAndUpdate(productId, data, { new: true });
};
