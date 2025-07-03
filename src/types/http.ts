import type { Promisable } from ".";
import type { Account } from "../util/db";

export type HandlerType = ((req: Request) => Promisable<Response>) | Response;
export type AuthedHandlerType =
    | ((req: Request, user: Account) => Promisable<Response>)
    | Response;
