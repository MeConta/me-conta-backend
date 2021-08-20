export interface IEmail {
  to: string;
  from?: string;
  subject: string;
  template: string;
}

export enum Emails {
  CONTATO,
}
export function getEmailInfo(email: Emails): IEmail {
  switch (email) {
    case Emails.CONTATO:
      return {
        to: process.env.EMAIL_CONTACT_TO,
        from: null,
        subject: 'E-mail de contato Me Conta?',
        template: './contact',
      };
  }
}
