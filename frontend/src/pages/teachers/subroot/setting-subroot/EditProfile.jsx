import React from "react";
import { json, useLoaderData } from "react-router-dom";

//* component
import EditProfileForm from "../../../../components/teacher/subroot/settings/setting-subroot/EditProfileForm.jsx";

//* utils
import { getAuthToken, verifyToken } from "../../../../utils/auth.js";

const EditProfile = () => {
  const { teacher } = useLoaderData();

  return (
    <>
      <EditProfileForm teacher={teacher} />
    </>
  );
};

export const loader = async ({ request, param }) => {
  verifyToken();

  //* url
  const url = `${process.env.REACT_APP_HOSTED_URL}/teacher`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  if (!response.ok) {
    throw json({ message: "Something went wrong" }, { status: 500 });
  }

  return response;
};

export default EditProfile;
