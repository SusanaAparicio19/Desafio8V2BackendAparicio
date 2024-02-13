import { UserDAO } from '../dao/user.dao.js';

export class UserService {
    static async createUser(userData) {
        try {
            const user = await UserDAO.createUser(userData);
            return user.toPOJO(); 
        } catch (error) {
            throw error;
        }
    }

    static async findUserByEmail(email) {
        try {
            const user = await UserDAO.findUserByEmail(email);
            return user.toPOJO();
        } catch (error) {
            throw error;
        }
    }

    static async getAllUsers() {
        try {
            const users = await UserDAO.getAllUsers();
            return users.map(user => user.toPOJO());
        } catch (error) {
            throw error;
        }
    }

    static async getUsersByRoles(roles) {
        try {
            const users = await UserDAO.getUsersByRoles(roles);
            return users.map(user => user.toPOJO());
        } catch (error) {
            throw error;
        }
    }
}

