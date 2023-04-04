import React, { useState, useEffect } from "react";
import { setHours, setMinutes } from "date-fns";

import SimpleInput from "../UI/Input/SimpleInput";

//* styles
import styles from "../../scss/components/student/CreateAssignment.module.scss";

//* custom hooks
import useInput from "../../hooks/user-input";
import useDateInput from "../../hooks/use-date-input";

//* utils
import { isEmpty } from "../../utils/validation";

//* components
import DateInput from "../UI/Input/DateInput";

const CreateAssignment = () => {
  useEffect(() => {
    setStartDate("");
  }, []);

  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 16)
  );

  const includeTimes = [
    setHours(setMinutes(new Date(), 0), 17),
    setHours(setMinutes(new Date(), 30), 18),
    setHours(setMinutes(new Date(), 30), 19),
    setHours(setMinutes(new Date(), 30), 17),
  ];

  const changeHandler = (date) => {
    setStartDate(date);
  };

  // console.log(startDate);

  return (
    <>
      <article className={styles["article"]}>
        <div className={`${styles["assignment-input-div"]}`}>
          <SimpleInput
            name={"assignment-topic"}
            placeholder={"Topic"}
            inputmessage={"Enter valid Topic"}
            className={styles["topic"]}
            type="text"
          />
          <SimpleInput
            name={"assignment-total-marks"}
            placeholder={"Total Marks"}
            inputmessage={"Enter valid total marks"}
            className={styles["total-marks"]}
            type="number"
          />
          <div className={styles["flex-2"]}>
            <div>
              <DateInput
                value={startDate}
                onChange={changeHandler}
                showTimeSelect={true}
                timeFormat="hh:mm aa"
                // timeIntervals={30}
                // includeTimes={includeTimes}
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholder={"Start Time"}
              />
            </div>
            <div>
              <DateInput placeholder={"Enter bruh"} inputmessage={"Bruh"} />
            </div>
          </div>
          <div className={styles["description-div"]}>
            <textarea
              name={"assignment-description"}
              placeholder={"Description"}
              inputmessage={"Enter valid start time"}
              className={styles["description"]}
            />
            <h6>Enter valid Description</h6>
          </div>
          <SimpleInput
            name={"assignment-topic"}
            placeholder={"End time"}
            inputmessage={"Enter valid end time"}
            className={styles["end-time"]}
          />
        </div>
      </article>
    </>
  );
};

export default CreateAssignment;
