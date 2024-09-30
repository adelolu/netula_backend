import path from "path";
import { Page, Paging } from "../types/custom";

export function validateEmail(email: string): boolean {
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function firstCharToUpperCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function convertToSentenceCase(str: string): string {
  return str
    .split(" ")
    .map((word) => firstCharToUpperCase(word))
    .join(" ");
}

export function convertToSnakeCase(str: string): string {
  return str
    .split(" ")
    .map((word) => word.toLowerCase())
    .join("_");
}

export function sortDirection(direction: string) {
  return direction?.toLowerCase() === "asc"
    ? 1
    : direction?.toLowerCase() === "desc"
    ? -1
    : -1;
}

export function setPaging(payload: Paging, sortBy?: string) {
  const paging: Paging = {};

  paging.page = payload.page || 1;
  paging.limit = payload.limit || 20;
  paging.sortBy = payload.sortBy || sortBy || Page.SortBy;
  paging.sortOrder = payload.sortOrder;

  paging.skip = (paging.page - 1) * paging.limit;
  paging.sort = sortDirection(paging.sortOrder! || Page.SortOrder);
  return paging;
}

export function renderTemplateString(
  template: string,
  data: Record<string, any>
): string {
  return template.replace(/{{([^}]+)}}/g, (_, key: string) => data[key]);
}

export function extractAttachments(attachments: Array<string>): Array<{
  filename: string;
  path: string;
}> {
  return attachments.map((attachment) => {
    return {
      filename: path.basename(attachment),
      path: attachment,
    };
  });
}

export function parseNigerianPhoneNumber(phone: string): string {
  return phone.replace(/[^0-9]/g, "").slice(0, 11);
}

export function generateRandomString(length: number): string {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

export function handleFilename(filename: string) {
  let oldName =
    filename.split(".") && filename.split(".").length
      ? filename
          .split(".")
          .slice(0, filename.split(".").length - 1)
          .join("_")
      : filename;
  const name = oldName.replace(/ /g, "-") + "_" + Date.now().toString();
  return { name, ext: filename.split(".").pop() };
}
