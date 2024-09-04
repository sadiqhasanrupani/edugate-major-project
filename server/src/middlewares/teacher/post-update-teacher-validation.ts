import { body } from "express-validator";

import Teacher from "../../models/teacher";

const expressValidations = [
  body("updatedFirstName", "Enter valid first name").not().isEmpty(),
  body("updatedLastName", "Enter valid last name").notEmpty(),
  body("updatedDOB", "Enter valid DOB").notEmpty(),
  body("updatedPhoneNumber", "Enter valid Phone number").isLength({
    min: 10,
    max: 10,
  }),
  body("updatedEmailId", "Enter valid email ID").isEmail(),
];

export default expressValidations;
