import fs from "fs";
import path from "path";
import nodemailer, { Transporter } from "nodemailer";
import { compile } from "handlebars";
import { convert } from "html-to-text";
import { log } from "console";
import { IUser } from "../types/user";

class Email {
  private user: string;
  private from: string;
  private password: string;

  constructor() {
    this.user = process.env.USER_EMAIL!;
    this.password = process.env.USER_PASSWORD!;
    this.from = `Blog <${process.env.USER_EMAIL}>`;
  }

  private newTransport(): Transporter {
    return nodemailer.createTransport({
      service: "gmail",
      port: 567,
      secure: false,
      auth: {
        user: this.user,
        pass: this.password,
      },
    });
  }

  private async sendHtml(
    to: string,
    template: string,
    subject: string,
    data: Record<string, any>
  ) {
    const htmlTemplate = fs.readFileSync(
      path.join(__dirname, `../templates/${template}.html`),
      "utf-8"
    );
    const html = compile(htmlTemplate)(data);

    const mailOptions = {
      from: this.from,
      to,
      subject,
      html,
      text: convert(html),
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome(user: Pick<IUser, "firstName" | "lastName" | "email">) {
    await this.sendHtml(user.email, "welcome", `Welcome to my Blog`, {
      firstName: user.firstName,
      lastName: user.lastName,
    });
  }

  async sendPasswordReset(
    user: Pick<IUser, "firstName" | "lastName" | "email">,
    resetLink: string
  ) {
    await this.sendHtml(user.email, "resetpassword", "Password Reset Request", {
      firstName: user.firstName,
      lastName: user.lastName,
      resetLink,
    });
  }
  async sendVerifyEmail(
    user: Pick<IUser, "firstName" | "lastName" | "email">,
    verifyLink: string
  ) {
    await this.sendHtml(user.email, "verifyemail", "Verify Email", {
      firstName: user.firstName,
      lastName: user.lastName,
      verifyLink,
    });
  }
}

export default Email;
