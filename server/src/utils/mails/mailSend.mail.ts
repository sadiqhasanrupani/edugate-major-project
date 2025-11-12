import mail from "./mail.config";

interface Message {
  to?: string;
  subject?: string;
  htmlMessage?: string;
  from?: string;
}

const mailSend = (message: Message) => {
  return mail.sendMail({
    from: message.from ? message.from : `"${process.env.ORGANIZATION_NAME}" <${process.env.EMAIL}>`,
    to: message.to,
    subject: message.subject,
    html: message.htmlMessage,
  });
};

export default mailSend;
