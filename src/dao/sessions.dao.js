import { SessionModel } from '../models/sessions.model.js';
import { responseFailed } from '../middlewares/responseFailed.js';

export class SessionsDAO {
    async create(sessionData) {
        try {
            return await SessionModel.create(sessionData);
        } catch (error) {
            responseFailed.failedCreateSession();
        }
    }

    async findOne(criteria) {
        try {
            return await SessionModel.findOne(criteria);
        } catch (error) {
            responseFailed.failedFindSession();
        }
    }

    async deleteOne(criteria) {
        try {
            return await SessionModel.deleteOne(criteria);
        } catch (error) {
            responseFailed.failedDeleteSession();
        }
    }
}
