import React, { useEffect } from "react";
import { json, redirect, useLoaderData } from "react-router-dom";
import { gsap } from "gsap";

//* component
import EditProfileForm from "../../../../components/teacher/subroot/settings/setting-subroot/EditProfileForm.jsx";

//* utils
import { getAuthToken, verifyToken } from "../../../../utils/auth.js";

const EditProfile = () => {
  const { teacher } = useLoaderData();

  useEffect(() => {
    gsap.fromTo(
      ".edit-profile-form-section",
      { x: 1000 },
      { x: 0, ease: "power4" }
    );
  }, []);

  return (
    <section className={`edit-profile-form-section`}>
    <EditProfileForm teacher={teacher} />
    </section>
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

export const action = async ({ request, params }) => {
  const data = await request.formData();

  const updatedTeacherData = {
    updatedImg: data.get("teacher-updated-img"),
    updatedFirstName: data.get("teacher-updated-first-name"),
    updatedLastName: data.get("teacher-updated-last-name"),
    updatedDOB: data.get("teacher-updated-dob"),
    updatedPhoneNumber: data.get("teacher-updated-phone-number"),
    updatedEmailId: data.get("teacher-updated-email"),
    updatedBio:
      data.get("teacher-updated-bio") === "Tell the student about yourself..."
        ? null
        : data.get("teacher-updated-bio"),
  };

  const formData = new FormData();

  //* appending the data to the multipart/form-data
  formData.append("updatedImg", updatedTeacherData.updatedImg);
  formData.append("updatedFirstName", updatedTeacherData.updatedFirstName);
  formData.append("updatedLastName", updatedTeacherData.updatedLastName);
  formData.append("updatedDOB", updatedTeacherData.updatedDOB);
  formData.append("updatedPhoneNumber", updatedTeacherData.updatedPhoneNumber);
  formData.append("updatedEmailId", updatedTeacherData.updatedEmailId);
  formData.append("updatedBio", updatedTeacherData.updatedBio);

  const response = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/teacher/update-profile`,
    {
      method: request.method,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: formData,
    }
  );

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Something went wrong" }).status(500);
  }

  return redirect("/teacher/dashboard");
};

export default EditProfile;
