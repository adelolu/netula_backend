import { Schema, model } from "mongoose";
import { IUser, UserRoles } from "../types/user";

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    dateOfBirth: { type: Date },
    gender: { type: String },

    // Address Information
    shippingAddress: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      country: { type: String },
    },

    role: { type: String, enum: Object.values(UserRoles), default: "customer" },
    emailVerified: { type: Boolean, default: false },
    recoveryCode: String,
    recoveryCodeExpiry: Date,
    verificationCode: String,
    verificationCodeExpiry: Date,

    // wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.recoveryCode;
        delete ret.verificationCode;
        delete ret.__v;
      },
    },
  }
);

export default model<IUser>("user", userSchema);
