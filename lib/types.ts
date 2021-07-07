import { RequestHandler, Request, Response, NextFunction } from 'express';

export type BlockInterface = {
  type: string;
  block_id?: string;
  text?: {
    type: string;
    text: string;
    emoji?: boolean;
  };
  accessory?: {
    type: string;
    image_url?: any;
    alt_text?: any;
    options?: {
      text: {
        type: string;
        text: string;
        emoji: boolean;
      };
      url?: string;
      value: string;
    }[];
  };
  elements?: {
    type: string;
    text:
      | {
          type: string;
          text: string;
          emoji?: boolean;
        }
      | string;
    value?: string;
    action_id?: string;
    emoji?: boolean;
  }[];
};

export type Method =
  | 'get'
  | 'head'
  | 'post'
  | 'put'
  | 'delete'
  | 'connect'
  | 'options'
  | 'trace'
  | 'patch';

export type Handler = (req: Request, res: Response, next?: NextFunction) => any;

export type Route = {
  method: Method;
  path: string;
  middleware: RequestHandler[];
  handler: Handler;
};

export type StoreInstallInterface = {
  isEnterpriseInstall: boolean;
  enterprise: { id: string };
  team: { id: string };
};

export type InstallInterface = {
  isEnterpriseInstall: boolean;
  enterpriseId: string;
  teamId: string;
};
