import { Router } from "express";

import product from "./product";
import auth from "./auth";
import post from "./post";
import user from "./user";
import upload from "./upload";
import review from "./review";

export default (router: Router) => {
  auth(router);
  product(router);
  review(router);
  // like(router);
  user(router);
  // comment(router);
  // upload(router);
};
