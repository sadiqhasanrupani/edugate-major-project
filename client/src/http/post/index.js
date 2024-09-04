import { getAuthToken } from "../../utils/auth";

const baseUrl = process.env.REACT_APP_HOSTED_URL;
const bearerToken = `Bearer ${getAuthToken()}`;

export async function postUpdateQuizHandler({ data }) {
  const response = await fetch(`${baseUrl}/quiz/update-quiz`, {
    method: "POST",
    headers: {
      Authorization: bearerToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let errorStatus = response.status || 500;
    if (typeof errorStatus === "string") {
      parseInt(errorStatus);
    }

    const errorData = await response.json();
    const error = new Error(errorData.message);
    error.info = errorData;
    error.status = errorStatus;
    throw error;
  }

  return await response.json();
}
