import { Request as Req, Response as Res, NextFunction as Next } from "express";

//* interface
import { CustomRequest } from "../middlewares/is-auth";

//* models
import Teacher, { TeacherData as TeacherField } from "../models/teacher";
import Classroom from "../models/classroom";
import Invite, { InviteFields } from "../models/invite";
import JoinClassroom, {
  JoinClassroomData as JoinClassroomField,
} from "../models/joinClassroom";
import Notification from "../models/notification";

export const getInvitations = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  const userId = (req as CustomRequest).userId;

  try {
    const teacher: TeacherField | unknown = await Teacher.findOne({
      attributes: ["teacher_id", "teacher_email"],
      where: {
        teacher_id: userId,
      },
    });

    const teacherData = teacher as TeacherField;

    //* getting all record related to the admin.
    const invites = await Invite.findAll({
      attributes: { exclude: ["createdAt", "expire_at"] },
      where: {
        invite_to: teacherData.teacher_email,
      },
      order: [["createdAt", "ASC"]],
      include: [
        {
          model: Classroom,
          attributes: ["classroom_name", "classroom_profile_img"],
        },
        {
          model: Teacher,
          as: "inviteTo",
          attributes: ["teacher_img"],
        },
        { model: Teacher, as: "inviteFrom", attributes: ["teacher_img"] },
      ],
    });

    return res.status(200).json({ invites });
  } catch (err) {
    return res
      .status(500)
      .json({ errorMessage: "Something went wrong", error: err });
  }
};

//^ Accept Invitation controller for the admin-request.
export const patchAdminRequestAcceptedInvitation = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  const inviteToken = (req as Req).query.token;
  const userId = (req as CustomRequest).userId;

  try {
    const invite: InviteFields | unknown = await Invite.findOne({
      where: {
        invite_token: inviteToken,
        invite_to_id: userId,
      },
    });

    if (!invite) {
      return res
        .status(401)
        .json({ errorMessage: "Cannot find the invite record" });
    }

    const inviteData = invite as InviteFields;

    if (inviteData.invite_token !== inviteToken) {
      return res
        .status(403)
        .json({ errorMessage: "Cannot find the token in the invite record" });
    }

    //^ If all ok then the below line will execute
    const joinClassroom = await JoinClassroom.findOne({
      where: {
        teacher_id: userId,
      },
    });

    if (!joinClassroom) {
      return res.status(401).json({ errorMessage: "Unauthorized permission" });
    }

    //^ if there is a data in joinClassroom record then this below line will execute

    const updateJoinClassroomRecord = await JoinClassroom.update(
      {
        expire_at: null,
        join_request: true,
      },
      {
        where: {
          teacher_id: userId,
        },
      }
    );

    if (updateJoinClassroomRecord) {
      //^ If the join classroom record is updated then we will delete the data from the invite, notification record.

      //* Deleting invite record
      await Invite.destroy({
        where: {
          invite_to_id: userId,
        },
      });

      //* Deleting notification record
      await Invite.destroy({
        where: {
          receiver_teacher_id: userId,
        },
      });

      return res
        .status(200)
        .json({ message: "teacher join the classroom successfully." });
    } else {
      return res
        .status(401)
        .json({ errorMessage: "Cannot update the joinClassroomRecord record" });
    }
  } catch (err: Error | unknown) {
    res.status(500).json({ error: (err as Error).message });
  }

  res.status(200).json("accept invitation");
};

//^ Accept Invitation controller for the join-request.
export const patchJoinRequestAcceptedInvitation = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  const userId = (req as CustomRequest).userId;

  const inviteId = (req as Req).query.inviteId;
  const inviteToken = (req as Req).query.token;
  const inviteFromId = (req as Req).query.inviteFromId;
  const classroomId = (req as Req).query.classId;

  console.log(`\n ${userId} \n ${inviteToken} ${inviteFromId} ${classroomId}\n`);
  try {
    const invite: InviteFields | unknown = await Invite.findOne({
      where: {
        invite_token: inviteToken,
        invite_from_id: inviteFromId,
        invite_id: inviteId,
      },
    });

    if (!invite) {
      return res
        .status(401)
        .json({ errorMessage: "Cannot find the invite record" });
    }

    const inviteData = invite as InviteFields;

    if (inviteData.invite_token !== inviteToken) {
      return res
        .status(403)
        .json({ errorMessage: "Cannot find the token in the invite record" });
    }

    //^ If all ok then the below line will execute
    const joinClassroom: JoinClassroomField | unknown =
      await JoinClassroom.findOne({
        where: {
          teacher_id: inviteFromId,
          admin_teacher_id: null,
          student_id: null,
          join_request: false,
          classroom_id: classroomId,
        },
      });

    if (!joinClassroom) {
      return res.status(401).json({
        errorMessage: "Unauthorized permission",
        inviteFromId,
        classroomId,
      });
    }

    const joinClassroomData = joinClassroom as JoinClassroomField;

    //^ if there is a data in joinClassroom record then this below line will execute

    const updateJoinClassroomRecord = await JoinClassroom.update(
      {
        expire_at: null,
        join_request: true,
      },
      {
        where: {
          teacher_id: inviteFromId,
          admin_teacher_id: null,
          student_id: null,
          join_request: false,
          classroom_id: classroomId,
        },
      }
    );

    if (updateJoinClassroomRecord) {
      //^ If the join classroom record is updated then we will delete the data from the invite, notification record.

      //* Deleting invite record
      await Invite.destroy({
        where: {
          invite_from_id: inviteFromId,
        },
      });

      //* Deleting notification record
      await Notification.destroy({
        where: {
          sender_teacher_id: inviteFromId,
        },
      });

      return res.status(200).json({
        message: "teacher join the classroom successfully.",
        joinClassroomId: joinClassroomData.join_classroom_id,
      });
    } else {
      return res
        .status(401)
        .json({ errorMessage: "Cannot update the joinClassroomRecord record" });
    }
  } catch (err: Error | unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
};
