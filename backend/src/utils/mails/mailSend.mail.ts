import mail from "./mail.config";

interface Message {
  to?: string;
  subject?: string;
  htmlMessage?: string;
}

const mailSend = (message: Message) => {
  return mail.sendMail({
    from: `"Edugate" <edugate110@gmail.com>`,
    to: message.to,
    subject: message.subject,
    html: message.htmlMessage,
  })
};

export default mailSend;
