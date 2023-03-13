import { Op } from "sequelize";
import Invite from "../../models/invite";

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
        Invite.destroy({
          where: {
            expire_at: {
              [Op.lt]: new Date(),
            },
          },
        });

        //! logging the deleted invites
        console.log(`\nDeleted ${expiredInvites.length} expired invite records\n`);
      } catch (err) {
        console.log(err);
      }
    }, milliSecond);
  },
};

export default invite;
