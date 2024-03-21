import { User, UserService } from "../entity/user";
import { UserMySql } from "../repository/user-repository";

class UserDefault implements UserService {

    rp: UserMySql;
    constructor(rp: UserMySql) {
        this.rp = rp;
    }

    save(user: User): Promise<User> {
        return this.rp.save(user);
    }
    findByEmail(email: string): Promise<User | null> {
        return this.rp.findByEmail(email);
    }
    findById(id: number): Promise<User | null> {
        return this.rp.findById(id);
    }
    update(id: number, user: User): Promise<User | null>{
        return this.rp.update(id, user);
    }
    findAll(): Promise<User[]> {
        return this.rp.findAll();
    }
    delete(id: number): Promise<boolean> {
        return this.rp.delete(id);
    }
}

export { UserDefault };