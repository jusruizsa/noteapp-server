import users from "../../db/user-db";
import { User, UserRepository } from "../entity/user";

class UserMySql implements UserRepository {
    save(user: User): Promise<User> {
        users.push(user);
        return Promise.resolve(user);
    }
    findByEmail(email: string): Promise<User | null> {
        const u = users.find((user) => user.email === email);
        if (u) {
            return Promise.resolve({
                id: u.id,
                name: u.name,
                email: u.email,
                password: u.password,
                createdAt: u.createdAt,
                updatedAt: u.updatedAt
            });
        }
        return Promise.resolve(null);
    }
    findById(id: number): Promise<User | null> {
        const u = users.find((user) => user.id === id);
        if (u) {
            return Promise.resolve({
                id: u.id,
                name: u.name,
                email: u.email,
                password: u.password,
                createdAt: u.createdAt,
                updatedAt: u.updatedAt
            });
        }
        return Promise.resolve(null);
    }
    findAll(): Promise<User[]> {
        const u = users.map((user) => {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        }
        )
        return Promise.resolve(u);
    }
    update(id: number, user: User): Promise<User> | Promise<null>{
        const index = users.findIndex((user) => user.id === id);
        if (index > -1) {
            users[index] = user;
            return Promise.resolve(user);
        }
        return Promise.resolve(null);
    }
    delete(id: number): Promise<boolean> {
        const index = users.findIndex((user) => user.id === id);
        if (index > -1) {
            users.splice(index, 1);
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }
}

export { UserMySql };
