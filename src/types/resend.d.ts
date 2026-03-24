declare module 'resend' {
  export type ResendSendEmailResult = {
    data?: unknown;
    error?: {
      message?: string;
    } | null;
  };

  export class Resend {
    constructor(apiKey?: string);

    emails: {
      send(payload: {
        from: string;
        to: string | string[];
        replyTo?: string;
        subject: string;
        html?: string;
        text?: string;
      }): Promise<ResendSendEmailResult>;
    };
  }
}
