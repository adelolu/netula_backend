import { Router } from "express";

import product from "./product"; 
import auth from "./auth";
import post from "./post";
import user from "./user";
import upload from "./upload";

export default (router: Router) => {
  auth(router);
  product(router);
  // like(router);
  // user(router);
  // comment(router);
  // upload(router);
};
