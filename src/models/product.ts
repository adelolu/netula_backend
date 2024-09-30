import { model, Schema } from "mongoose";
import {
  CapSize,
  Category,
  HairGrade,
  HairTexture,
  HairType,
  IProduct,
  LaceType,
  PartingStyle,
} from "../types/product";

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    brand: { type: String, default: "netula" },
    description: { type: String, required: true },
    sku: { type: String, unique: true, required: true },

    images: [{ type: String, required: true }],
    displayImage: { type: String, required: true },

    hairType: { type: String, enum: Object.values(HairType), required: true },
    hairGrade: { type: String, enum: Object.values(HairGrade), required: true },
    density: { type: Number, required: true },
    texture: { type: String, enum: Object.values(HairTexture), required: true },
    color: { type: String, required: true },
    capSize: { type: String, enum: Object.values(CapSize), required: true },
    laceType: { type: String, enum: Object.values(LaceType), required: true },
    category: { type: String, enum: Object.values(Category), required: true },
    priceOptions: [
      {
        length: { type: Number, required: true },
        price: { type: Number, required: true },
        stockQuantity: { type: Number, required: true },
      },
    ],

    heatResistance: { type: Boolean },
    adjustableStraps: { type: Boolean },
    partingStyle: {
      type: String,
      enum: Object.values(PartingStyle),
      required: true,
    },
    babyHairs: { type: Boolean },
    glueless: { type: Boolean },

    discount: { type: Number, default: 0 },
    rating: { type: Number, min: 0, max: 5 },
    reviews: [{ type: String }],
    tags: [{ type: String }],

    visibility: { type: Boolean, default: true },
    flashsale: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default model<IProduct>("product", productSchema);

// const exampleProduct: IProduct = {
//   name: "Curly Lace Front Wig",
//   description: "High-quality curly lace front wig with natural hairline.",
//   category: "lace front",
//   sku: "CUR123",
//   stockQuantity: 15,
//   images: ["image1.jpg", "image2.jpg"],
//   hairType: "human",
//   texture: "curly",
//   color: "natural black",
//   priceOptions: [
//     { length: 10, price: 150 },
//     { length: 12, price: 175 },
//     { length: 14, price: 200 }
//   ],
//   dateAdded: new Date(),
//   lastUpdated: new Date(),
//   visibility: true
// };
