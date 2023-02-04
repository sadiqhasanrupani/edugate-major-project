import { Response as Res } from "express"

const loginController = {
  root: (res: Res) => {
    res.send("Hii from login");
  },
};

export default loginController;
