import { getAuthToken } from "../../../utils/auth";

export const getSubmittedAssignmentById = async (submittedAssignmentId) => {
  const res = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/assignment/get-submitted-assignment-by-submit-id/${submittedAssignmentId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch assignment");
  }

  return res.json();
};

export const assignSubmittedAssignment = async (data) => {
  const res = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/assignment/assign-submitted-assignment`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to assign");
  }

  return res.json();
};
