import mongoose from "mongoose";
import { IAuditTrail } from "./common.interface";
import { Counter } from "./common.model";

/**
 * @objective Common service for handling database
 * @constructor_params Model
 * @returns object or array
 */

class Service {
    private Model;

    constructor(Model: any) {
        this.Model = Model;
    }

    // create a document
    createOne = <T>(body: T): Promise<T> => {
        const newData = new this.Model(body);

        return newData.save();
    };

    // get all documents by query
    findAllByQuery = async <T>(query: object = {}): Promise<T[]> => {
        return await this.Model.find(query).notDeleted();
    };

    // get one document by query
    findOneByQuery = async <T>(query: object): Promise<T> => {
        return await this.Model.findOne(query).notDeleted();
    };

    // get one document by id
    findOneById = async <T>(_id: mongoose.Types.ObjectId): Promise<T> => {
        return await this.Model.findById(_id).notDeleted();
    };


    // update document by id
    updateById = async <T>(
        _id: mongoose.Types.ObjectId,
        updateBody: T,
        auditTrails: IAuditTrail
    ): Promise<T> => {
        const { updated_at, updated_by, updated_detail } = auditTrails;
        return await this.Model.findByIdAndUpdate(
            _id,
            {
                $set: {
                    ...updateBody,
                    "audit_trails.updated_at": updated_at,
                    "audit_trails.updated_by": updated_by,
                    "audit_trails.updated_detail": updated_detail,
                },
            },
            { new: true }
        ).notDeleted();
    };


    // update documents by query
    updateByQuery = async <T>(
        query: Object,
        updateBody: object,
        auditTrails: IAuditTrail
    ): Promise<T> => {
        const { updated_at, updated_by, updated_detail } = auditTrails;
        return await this.Model.findOneAndUpdate(
            query,
            {
                $set: {
                    ...updateBody,
                    "audit_trails.updated_at": updated_at,
                    "audit_trails.updated_by": updated_by,
                    "audit_trails.updated_detail": updated_detail,
                },
            },
            {
                new: true,
            }
        ).notDeleted();
    };


    // delete document by id
    deleteById = async <T>(_id: mongoose.Types.ObjectId, auditTrails: IAuditTrail): Promise<T> => {
        const { deleted_at, deleted_by, deleted_detail } = auditTrails;
        return await this.Model.findByIdAndUpdate(
            _id,
            {
                $set: {
                    is_deleted: true,
                    "audit_trails.deleted_at": deleted_at,
                    "audit_trails.deleted_by": deleted_by,
                    "audit_trails.deleted_detail": deleted_detail,
                },
            },
            { new: true }
        ).notDeleted();
    }


    // push array item by query in the document
    pushArrayItemByQuery = async <T>(query: Object, arrayItem: object): Promise<T> => {
        return await this.Model.findOneAndUpdate(
            query,
            {
                $push: arrayItem,
            },
            {
                new: true,
            }
        ).notDeleted();
    };

    // remove array item by query in the document
    removeArrayItemByQuery = async <T>(query: Object, arrayItemQuery: any): Promise<T> => {
        return await this.Model.findOneAndUpdate(
            query,
            {
                $pull: arrayItemQuery,
            },
            {
                new: true,
            }
        ).notDeleted();
    };

    // counter for auto increment
    autoIncrement = async (uniqueId: string) => {
        const counter = await Counter.findOneAndUpdate(
            { uniqueId: uniqueId },
            { $inc: { seq_value: 1 } },
            { new: true }
        );

        if (!counter) {
            const newCounter = new Counter({ uniqueId: uniqueId, seq_value: 1 });
            return await newCounter.save();
        }

        return counter;
    };
}

export { Service };