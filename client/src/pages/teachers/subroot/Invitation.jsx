import React, { Fragment, useEffect } from "react";
import { json, useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { gsap } from "gsap";

//* stylesheets
import styles from "../../../scss/pages/teacher/subroot/Invitation.module.scss";

//* utils
import { getAuthToken, verifyToken } from "../../../utils/auth";

//* components
import InviteCard from "../../../components/teacher/subroot/invitation/InviteCard";
import EmptyInvites from "../../../components/UI/Icons/Notification/EmptyNotification";
import DarkEmptyInvites from "../../../components/UI/Icons/Notification/dark/EmptyNotification.jsx";

const Invitation = () => {
  const { invites } = useLoaderData();

  useEffect(() => {
    gsap.fromTo(
      ".teacher-invitation-section",
      { x: 1000 },
      { x: 0, ease: "power4" }
    );
  }, []);

  //* redux hooks
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  return (
    <>
      <section
        className={`teacher-invitation-section ${styles["section"]} ${
          themeMode && styles["dark"]
        }`}
      >
        <h2>Invitations</h2>
        <hr />

        {invites.length !== 0 ? (
          invites.map((invite) => {
            return (
              <Fragment key={invite.invite_id}>
                <InviteCard inviteData={invite} themeMode={themeMode} />
              </Fragment>
            );
          })
        ) : (
          <div className={styles["empty-invites"]}>
            {themeMode ? <DarkEmptyInvites /> : <EmptyInvites />}
          </div>
        )}
      </section>
    </>
  );
};

export const loader = async ({ request, params }) => {
  verifyToken();

  const response = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/invite/get-invitations`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (!response.ok) {
    throw json({ message: response.statusText }).status(500);
  }

  return response;
};

export default Invitation;
