import { ObjectId } from "mongoose";
import { IAuditTrail } from "../common/common.interface";

interface IUser {
    _id: ObjectId;
    name: string;
    email: string;
    role: string;
    password: string;
    audit_trails: IAuditTrail;
    is_deleted: boolean;
}

export { IUser };