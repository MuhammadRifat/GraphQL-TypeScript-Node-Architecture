import { Date, ObjectId, QueryWithHelpers } from "mongoose";

// interface for common audit_trails
interface IAuditTrail {
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
    created_by?: string;
    updated_by?: string;
    deleted_by?: string;
    created_detail?: string;
    updated_detail?: string;
    deleted_detail?: string;
    admin_note?: string;
}

interface ICounter {
    _id: ObjectId,
    uniqueId: string;
    seq_value: number;
    created_at: Date;
}

// interface of query helper for soft deleting
interface IQueryHelpers {
    notDeleted(): QueryWithHelpers<
        {},
        {},
        IQueryHelpers
    >;
}


export { IAuditTrail, IQueryHelpers, ICounter };
