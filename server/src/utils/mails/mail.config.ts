import nodemailer from "nodemailer";
import { EMAIL_CONFIG } from "../../common/contracts/mail/configs/email.config";

const transporter = nodemailer.createTransport(EMAIL_CONFIG.CREATE_TRANSPORTER);

export default transporter;
