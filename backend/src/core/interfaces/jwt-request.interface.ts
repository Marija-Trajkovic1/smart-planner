import { JwtPayload } from "./jwt-payload.interface";

export interface JwtRequest extends Request{
    user: JwtPayload;
}