import Joi from "joi";

export const createReview = Joi.object({
  body: Joi.object({
    review: Joi.string().required(),
  }),
});
