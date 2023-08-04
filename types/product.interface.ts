import { Category } from "./category.interface";
import { Discount } from "./discount.interface";
import {Image}from "./image.interface";


export interface Product {
  product_id: number;
  product_name: string;
  vote: number;
  price: number;
  unit_price: number;
  quantity: number;
  status: boolean;
  description: string;
  brand: string;
  origin: string;
  warranty_time: number;
  images: Image[];
  __category__: Category;
  __discount__: Discount;
}