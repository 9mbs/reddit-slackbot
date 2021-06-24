// Express app
// ts only likes import here 😩
import { RequestHandler, Request, Response, NextFunction } from "express"; 

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
  enterprise: { id: string; };
  team: { id: string; };
}

export type InstallInterface = {
  isEnterpriseInstall: boolean;
  enterpriseId: string;
  teamId: string;
}