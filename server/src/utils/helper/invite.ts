import { Op } from "sequelize";

//* models
import Invite from "../../models/invite";
import Notification from "../../models/notification";
import JoinClassroom from "../../models/joinClassroom";

const invite = {
  start: (minutes: number) => {
    //* Calculating the minutes from the argument and converting it into millisecond
    const milliSecond = minutes * 60000;

    const intervalTime = setInterval(async () => {
      try {
        //* getting the expired invites record from the database
        const expiredInvites = await Invite.findAll({
          where: {
            expire_at: {
              [Op.lt]: new Date(),
            },
          },
        });

        //* Deleting all expired invite record
        const destroyInvite = await Invite.destroy({
          where: {
            expire_at: {
              [Op.lt]: new Date(),
            },
          },
        });

        if (destroyInvite) {
          //* destroying the notification record
          try {
            const notification = Notification.destroy({
              where: {
                expire_at: {
                  [Op.lt]: new Date(),
                },
              },
            });

            JoinClassroom.destroy({
              where: {
                expire_at: {
                  [Op.lt]: new Date(),
                },
              },
            });
          } catch (err) {
            console.log(err);
          }
        }

        //! logging the deleted invites
        console.log(
          `\nDeleted ${expiredInvites.length} expired invite records\n`
        );
      } catch (err) {
        console.log(err);
      }
    }, milliSecond);
  },
};

export default invite;
