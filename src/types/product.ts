import { Document, Types } from "mongoose";
import { Paging } from "./custom";

export interface IProduct extends Document {
  name: string;
  brand: string;
  description: string;
  category: string;
  priceOptions: Array<{
    price: number;
    length: number;
    stockQuantity: number;
  }>;
  sku: string;
  displayImage: string;
  images: string[];
  visibility: boolean;

  hairType: string;
  hairGrade: string;
  density: number;
  texture: string;
  color: string;
  capSize: string;
  laceType: string;
  
  heatResistance?: boolean;
  adjustableStraps?: boolean;
  partingStyle?: string;
  babyHairs?: boolean;
  glueless?: boolean;

  
  discount?: number; 
  rating?: number;
  reviews?: string[];
  tags?: string[]; 

  flashsale?: boolean;
}


export interface Product extends IProduct, Document {}

export const Category = {
  laceFront: "lace front",
  fullLace: "full Lace",
};
export const HairType = {
  human: "human",
  synthetic: "synthetic",
  blended: "blended",
} as const;

export const HairGrade = {
  5: "5A",
  6: "6A",
  7: "7A",
  8: "8A",
  9: "9A",
  10: "10A",
  12: "12A",
  13: "emmy",
  14: "non-emmy",
  15: "virgin",
} as const;

export const HairDensity = {
  130: 130,
  150: 150,
  180: 180,
  200: 200,
  250: 250,
} as const;
export const HairTexture = {
  straight: "straight",
  wavy: "wavy",
  curly: "curly",
  coily: "coily",
} as const;
export const CapSize = {
  small: "small",
  medium: "medium",
  large: "large",
} as const;

export const PartingStyle = {
  free: "free",
  middle: "middle",
  side: "side",
} as const;

export const LaceType = {
  swiss: "swiss",
  transparent: "transparent",
  hd: "HD",
} as const;

///////////
// export interface FetchByCategory extends Paging {
//   categoryId?: string;
// }
// export interface FetchByTag extends Paging {
//   tagId?: string;
// }

// export interface SearchCriteria extends Paging {
//   title?: string;
//   description?: string;
//   priceMin?: number;
//   priceMax?: number;
//   category?: string;
//   tags?: string;
//   colors?: string;
//   sizes?: string;
//   flashsale?: "true" | "false";
// }
