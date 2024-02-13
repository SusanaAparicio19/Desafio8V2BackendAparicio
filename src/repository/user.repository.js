import { UserDAO } from '../dao/user.dao.js';
import { UserDTO } from '../dto/user.dto.js';

export class UserRepository {
    async createUser(userData) {
        try {
            const user = await UserDAO.createUser(userData);
            return new UserDTO(user); // Convertimos el usuario a un DTO
        } catch (error) {
            throw error;
        }
    }

    async findUserByEmail(email) {
        try {
            const user = await UserDAO.findUserByEmail(email);
            return user ? new UserDTO(user) : null; // Convertimos el usuario a un DTO si existe
        } catch (error) {
            throw error;
        }
    }

    async findAllUsers() {
        try {
            const users = await UserDAO.getAllUsers();
            return users.map(user => new UserDTO(user)); // Convertimos cada usuario a un DTO
        } catch (error) {
            throw error;
        }
    }

    async findUsersByRoles(roles) {
        try {
            const users = await UserDAO.getUsersByRoles(roles);
            return users.map(user => new UserDTO(user)); // Convertimos cada usuario a un DTO
        } catch (error) {
            throw error;
        }
    }

    async updateUserByEmail(email, newData) {
        try {
            const updatedUser = await UserDAO.updateUserByEmail(email, newData); // Método no implementado en el DAO
            return updatedUser ? new UserDTO(updatedUser) : null; // Convertimos el usuario actualizado a un DTO si existe
        } catch (error) {
            throw error;
        }
    }

    async deleteUserByEmail(email) {
        try {
            const deletedUser = await UserDAO.deleteUserByEmail(email); // Método no implementado en el DAO
            return deletedUser ? new UserDTO(deletedUser) : null; // Convertimos el usuario eliminado a un DTO si existe
        } catch (error) {
            throw error;
        }
    }
}

export const userRepository = new UserRepository();


/*
import { UserDAO } from '../dao/user.dao.js';

export class UserRepository {
    async save(userData) {
        try {
            await UserDAO.createUser(userData);
        } catch (error) {
            throw error;
        }
    }

    async findOneByEmail(email) {
        try {
            const user = await UserDAO.findUserByEmail(email);
            return user ? user.toPOJO() : null;
        } catch (error) {
            throw error;
        }
    }

    async findAll() {
        try {
            const users = await UserDAO.getAllUsers();
            return users.map(user => user.toPOJO());
        } catch (error) {
            throw error;
        }
    }

    async findByRoles(roles) {
        try {
            const users = await UserDAO.getUsersByRoles(roles);
            return users.map(user => user.toPOJO());
        } catch (error) {
            throw error;
        }
    }

    async updateByEmail(email, newData) {
        try {
            const updatedUser = await UserDAO.updateUserByEmail(email, newData);
            return updatedUser ? updatedUser.toPOJO() : null;
        } catch (error) {
            throw error;
        }
    }

    async deleteByEmail(email) {
        try {
            const deletedUser = await UserDAO.deleteUserByEmail(email);
            return deletedUser ? deletedUser.toPOJO() : null;
        } catch (error) {
            throw error;
        }
    }
}

export const userRepository = new UserRepository();
*/
