import Joi from "joi";
import * as type from "../../types/product";

export const create = Joi.object({
  body: Joi.object<type.IProduct>({
    name: Joi.string().required(),
    brand: Joi.string().optional(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    sku: Joi.string().required(),
    color: Joi.string().required(),
    displayImage: Joi.string().required(),
    visibility: Joi.boolean().required(),
    priceOptions: Joi.array()
      .items(
        Joi.object({
          price: Joi.number().required(),
          length: Joi.number().required(),
          stockQuantity: Joi.number().required(),
        })
      )
      .required(),
    images: Joi.array().items(Joi.string()).optional(),
    hairType: Joi.string()
      .valid(...Object.values(type.HairType))
      .required(),
    hairGrade: Joi.string()
      .valid(...Object.values(type.HairGrade))
      .required(),
    density: Joi.string()
      .valid(...Object.values(type.HairDensity))
      .required(),
    texture: Joi.string()
      .valid(...Object.values(type.HairTexture))
      .required(),
    capSize: Joi.string()
      .valid(...Object.values(type.CapSize))
      .required(),
    laceType: Joi.string()
      .valid(...Object.values(type.LaceType))
      .required(),
    partingStyle: Joi.string()
      .valid(...Object.values(type.PartingStyle))
      .required(),
    heatResistance: Joi.boolean().optional(),
    adjustableStraps: Joi.boolean().optional(),
    babyHairs: Joi.boolean().optional(),
    glueless: Joi.boolean().optional(),
    discount: Joi.number().optional(),
    rating: Joi.number().optional(),
    reviews: Joi.array().items(Joi.string()).optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    flashsale: Joi.boolean().optional(),
  }),
}).required();
