import { Document } from "mongoose";
export interface IUser extends Document {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  date_of_birth: Date;
  phoneNumber?: string;
  dateOfBirth?: Date;
  gender: string;

  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };

  role: string;
  profileImage: string;
  emailVerified: Boolean;
  recoveryCode: string | undefined;
  recoveryCodeExpiry: Date | undefined;
  verificationCode: string | undefined;
  verificationCodeExpiry: Date | undefined;
  active: boolean;
  onboarded: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const UserRoles = {
  admin: "admin",
  customer: "customer",
} as const;

export interface IUserUpdate extends IUser {
  oldPassword: string;
  newPassword: string;
}
