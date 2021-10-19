export type EmailOptions = {
  to?: string;
  from?: string;
  subject?: string;
  template?: string;
  context?: any;
};

export interface ISendEmailService {
  send(options: EmailOptions): Promise<void>;
}
