import { Response as Res } from "express";

const signupController = {
  root: ( res: Res) => {
    res.send("Hii from signup");
  },
};

export default signupController;