import { IProduct } from "../types/product";
import * as repositry from "../repository/product";
import { makeResponse } from "../helpers/response";

export const create = async (payload: IProduct) => {
  console.log(payload);
  let product = await repositry.createProduct(payload);
  console.log(product);
  if (!product) {
    return makeResponse(false, "Product not created", {}, 400);
  }
  return makeResponse(true, "Product created successfully", {}, 200);
};


// {
//   "name": "Curly Lace Front Wig",
//   "brand": "Luxury Wigs",
//   "description": "A high-quality curly lace front wig with a natural hairline. Made from 100% human hair, offering a realistic look and versatile styling options.",
//   "category": "lace front",
//   "sku": "CUR123",
//   "images": [
//     "https://example.com/images/curly_lace_front_wig_1.jpg",
//     "https://example.com/images/curly_lace_front_wig_2.jpg"
//   ],
//   "hairType": "human",
//   "hairGrade": "10A",
//   "density": 150,
//   "texture": "curly",
//   "variants": [
//     {
//       "length": 10,
//       "color": "natural black",
//       "price": 150.00,
//       "stockQuantity": 5
//     },
//     {
//       "length": 12,
//       "color": "natural black",
//       "price": 170.00,
//       "stockQuantity": 3
//     },
//     {
//       "length": 12,
//       "color": "chocolate brown",
//       "price": 175.00,
//       "stockQuantity": 4
//     },
//     {
//       "length": 14,
//       "color": "platinum blonde",
//       "price": 200.00,
//       "stockQuantity": 2
//     }
//   ],
//   "heatResistance": true,
//   "adjustableStraps": true,
//   "partingStyle": "free",
//   "babyHairs": true,
//   "glueless": true,
//   "discount": 10,  // 10% discount
//   "rating": 4.7,
//   "reviews": [
//     "Excellent quality, very natural!",
//     "Great fit and comfortable to wear."
//   ],
//   "tags": ["curly", "lace front", "human hair", "natural look"],
//   "dateAdded": "2024-09-26T00:00:00Z",
//   "lastUpdated": "2024-09-26T00:00:00Z",
//   "visibility": true,
//   "featured": true
// }
