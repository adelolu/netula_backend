// export const Roles = {
//     Admin: "admin",
//     Technician: "technician",
//     ServiceCenter: "service center",
//     Customer: "customer",
//     Business: "business",
//   } as const;

//   export const { Admin, ...UserRoles } = Roles;

export const Page = {
  Limit: 20,
  Page: 1,
  Skip: 0,
  SortOrder: "asc",
  SortBy: "updatedAt",
} as const;

export interface Paging {
  limit?: number;
  page?: number;
  skip?: number;
  sortOrder?: "asc" | "desc";
  sort?: 1 | -1;
  sortBy?: string;
}

export interface MakeResponse<T = Record<string, any>> {
  status: boolean;
  message: string;
  data?: T;
  statusCode?: number;
}

export interface Search extends Paging {
  keyword: string;
}
export interface IContactUs {
  email: string;
  name: string;
  phone: string;
  message: string;
}
