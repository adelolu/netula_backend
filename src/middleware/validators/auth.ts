import Joi from "joi";
import { IUser, UserRoles } from "../../types/user";

export const register = Joi.object({
  body: Joi.object<IUser>({
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string()
      .min(8)
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]{8,20}$/
      )
      .required()
      .messages({
        "string.pattern.base":
          "Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character",
        "string.min": "Password must be at least 8 characters long",
      }),
    role: Joi.string().valid(...Object.values(UserRoles)),
  }),
}).required();

export const profileImage = Joi.object({
  body: Joi.object({
    profileImage: Joi.string().required(),
  }),
}).required();

// export const otpOnlySchema = Joi.object({
//   body: Joi.object({
//     otp: Joi.string().required(),
//   }).required(),
// });

export const login = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}).required();

export const forgotPassword = Joi.object({
  body: Joi.object({ email: Joi.string().email().required() }),
}).required();

export const resetPassword = Joi.object({
  body: Joi.object({
    password: Joi.string()
      .min(8)
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]{8,20}$/
      )
      .required()
      .messages({
        "string.pattern.base":
          "Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character",
        "string.min": "Password must be at least 8 characters long",
      }),
    token: Joi.string().required(),
  }),
}).required();

export const changePassword = Joi.object({
  body: Joi.object({
    newPassword: Joi.string()
      .min(8)
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]{8,20}$/
      )
      .required()
      .messages({
        "string.pattern.base":
          "Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character",
        "string.min": "Password must be at least 8 characters long",
      }),

    oldPassword: Joi.string().required(),
  }),
}).required();
