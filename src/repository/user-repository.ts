import { User, UserRepository } from "../entity/user";
import mysql, { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import conn from "../../db/conn";

class UserMySql implements UserRepository {
    async save(user: User): Promise<User> {
        user.createdAt = new Date();
        user.updatedAt = new Date();
        const result = await conn.query<ResultSetHeader>('INSERT INTO users (name, email, password, created_at, updated_at) VALUES (?, ?, ?, ?, ?)', [user.name, user.email, user.password, user.createdAt, user.updatedAt]);
        user.id = result[0].insertId;
        return Promise.resolve(user);
    }
    async findByEmail(email: string): Promise<User | null> {
        const [result, _] = await conn.query<RowDataPacket[]>('SELECT * FROM users WHERE email = ?', [email]);
        if (result.length === 0) {
            return null;
        }
        const user = result[0];
        return Promise.resolve(user as User);


    }
    async findById(id: number): Promise<User | null> {
        const [result, _] = await conn.query<RowDataPacket[]>('SELECT * FROM users WHERE id = ?', [id]);
        if (result.length === 0) {
            return null;
        }
        const user = result[0];
        return Promise.resolve(user as User);
    }

    async findAll(): Promise<User[]> {
        const users: User[] = [];
        const [result, _] = await conn.query<RowDataPacket[]>('SELECT * FROM users');
        for (const row of result) {
            users.push(row as User);
        }
        return Promise.resolve(users);
    }
    async update(id: number, user: User): Promise<User | null>{
        const findUser = await this.findById(id);
        if (!findUser) {
            return Promise.resolve(null);
        }
        Object.assign(user, findUser);
        user.updatedAt = new Date();
        conn.query('UPDATE users SET name = ?, email = ?, password = ?, updated_at = ? WHERE id = ?', [user.name, user.email, user.password, user.updatedAt, id]);
        return Promise.resolve(user);

            
    }
    async delete(id: number): Promise<boolean> {
        const result = await conn.query<ResultSetHeader>('DELETE FROM users WHERE id = ?', [id]);
        
        //validate rows affected
        if (result[0].affectedRows === 0) {
            return Promise.resolve(false);
        }
        return Promise.resolve(true);

    }
}

export { UserMySql };
