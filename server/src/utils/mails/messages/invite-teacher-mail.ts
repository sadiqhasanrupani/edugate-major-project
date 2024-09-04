export interface InviteData {
  classroom_name?: string;
  teacher_name?: string;
  invite_link?: string;
  admin_teacher_name?: string;
}

export const inviteTeacherMail = (inviteData: InviteData) => {
  return `
    <h1>Dear ${inviteData.teacher_name},</h1>

    <p>
      I hope this email finds you well. I am writing to extend an invitation for you to join our ${inviteData.classroom_name}
      classroom as a co-teacher on Edugate. Our online platform is dedicated to providing
      high-quality education to students around the world, and we believe that your expertise as an educator would make
      a valuable addition to our team.

    </p>

    <p>
      As a co-teacher, you would have the opportunity to create and deliver engaging and effective online courses in
      your areas of expertise, while collaborating with other experienced educators on our platform. You would also have
      access to our cutting-edge teaching tools and resources, which are designed to help you create a dynamic and
      interactive learning experience for your students.

    </p>

    <p>
      Our classroom is committed to fostering a supportive and inclusive learning environment, where every student is
      encouraged to reach their full potential. We believe that by working together, we can create an atmosphere that
      promotes academic excellence and personal growth for all of our students.

    </p>

    <p>
      We understand that you are a busy educator, but we would be honored if you would consider joining our classroom as
      a co-teacher on Edugate. If you have any questions or would like to learn more about our
      platform, please do not hesitate to contact us.

    </p>

    <p>
    We appreciate your time and thought, and we hope to hear from you soon. The invitation URL to our ${inviteData.classroom_name} classroom is <a href="${inviteData.invite_link}">here</a>. The time required to enrol in this session is one day.
    </p>

    <p>
      Sincerely,
      <br />
      ${inviteData.admin_teacher_name}
      <br />
      Edugate Team
    </p>
  `;
};

export const InviteText = (inviteData: InviteData) => {
  return `
    Dear ${inviteData.teacher_name},
  `;
};

export default inviteTeacherMail;
