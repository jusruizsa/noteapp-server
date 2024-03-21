import { UserHandler} from "../src/handler/user-handler";
import { UserDefault } from "../src/service/user-service";
import { UserMySql } from "../src/repository/user-repository";
import express, {Express, Request, Response} from 'express';

const rp = new UserMySql();
const sv = new UserDefault(rp);
const handler = new UserHandler(sv);

const usersRouter = require('express').Router();


usersRouter.get('/', (req: Request, res: Response) => {
    handler.getUsers(req, res);
});

usersRouter.post('/', (req: Request, res: Response) => {
    handler.createUser(req, res);
});

usersRouter.get('/:id', (req: Request, res: Response) => {
    handler.getUser(req, res);
});

usersRouter.patch('/:id', (req: Request, res: Response) => {
    handler.updateUser(req, res);
});

usersRouter.delete('/:id', (req: Request, res: Response) => {
    handler.deleteUser(req, res);
});

export default usersRouter;