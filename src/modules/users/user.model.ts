import mongoose, { HydratedDocument, Model, model, QueryWithHelpers } from "mongoose";
import { IQueryHelpers } from "../common/common.interface";
import { IUser } from "./user.interface";

// user schema
const userSchema = new mongoose.Schema<
    IUser,
    Model<IUser, IQueryHelpers>,
    {},
    IQueryHelpers
>
    ({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        role: {
            type: String,
            default: "author"
        },
        password: {
            type: String,
            required: true
        },
        audit_trails: {
            created_at: Date,
            updated_at: Date,
            deleted_at: Date,
            created_by: String,
            updated_by: String,
            deleted_by: String,
            created_detail: String,
            updated_detail: String,
            deleted_detail: String,
            admin_note: String,
        },
        is_deleted: {
            type: Boolean,
            default: false
        }
    });

// query helper for soft deleting
userSchema.query.notDeleted = function notDeleted(
    this: QueryWithHelpers<any, HydratedDocument<IUser>, IQueryHelpers>
) {
    return this.where({ is_deleted: false });
};

// created user model
const User = model("User", userSchema);

export { User };