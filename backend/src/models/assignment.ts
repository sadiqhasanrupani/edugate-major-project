import { STRING, INTEGER, DATE } from "sequelize";

import sequelize from "../utils/database.config";

const Assignment = sequelize.define("assignments", {
  assignment_id: {
    type: STRING,
    allowNull: false,
    primaryKey: true,
  },
  assignment_name: STRING(100),
  grade: INTEGER,
  assignment_description: STRING(500),
  start_date: DATE,
  end_date: DATE,
})

export default Assignment;