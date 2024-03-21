class User {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: number, name: string, email: string, password: string, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.name = name
        this.email = email
        this.password = password
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}

interface UserRepository {
    save(user: User): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    findAll(): Promise<User[]>;
    update(id: number, user: User): Promise<User> | Promise<null>;
    delete(id: number): Promise<boolean>;
}

interface UserService {
    save(user: User): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    findAll(): Promise<User[]>;
    update(id: number, user: User): Promise<User> | Promise<null>;
    delete(id: number): Promise<boolean>;
}

export { User, UserRepository, UserService };