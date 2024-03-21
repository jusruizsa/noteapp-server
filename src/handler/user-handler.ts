import { UserDefault } from "../service/user-service";
import { Request, Response } from 'express';


class UserHandler {

    sv: UserDefault;
    constructor(sv: UserDefault) {
        this.sv = sv;
    }

    public async createUser(req: Request, res: Response) {
        this.sv.save(req.body).then((user) => {
            res.send(user);
        }
        ).catch((error) => {
            res.send(error);
        });
    }

    public async getUser(req: Request, res: Response) {

        const id = req.params.id;
        const intId = parseInt(id);

        if (isNaN(intId)) {
            res.send('Invalid id');
            return;
        }

        this.sv.findById(intId).then((user) => {
            res.send(user);
        }
        ).catch((error) => {
            res.send(error);
        });
    }

    public async getUsers(req: Request, res: Response) {
        this.sv.findAll().then((users) => {
            res.send(users);
        }
        ).catch((error) => {
            res.send(error);
        });
        
    }

    public async getUserByEmail(req: Request, res: Response) {
        this.sv.findByEmail(req.params.email).then((user) => {
            res.send(user);
        }
        ).catch((error) => {
            res.send(error);
        });
    }

    public async updateUser(req: Request, res: Response) {
        this.sv.update(parseInt(req.params.id), req.body).then((user) => {
            res.send(user);
        }
        ).catch((error) => {
            res.send(error);
        });
    }

    public async deleteUser(req: Request, res: Response) {
        this.sv.delete(parseInt(req.params.id)).then((user) => {
            res.send(user);
        }
        ).catch((error) => {
            res.send(error);
        });
    }


}

export { UserHandler };