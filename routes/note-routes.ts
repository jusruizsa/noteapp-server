import { Request, Response } from "express";

const noteRoutes = require('express').Router();
import { NoteHandler } from '../src/handler/note-handler';
import { NoteDefault } from '../src/service/note-service';
import { NoteMysql } from '../src/repository/note-repository';
const logger = require('morgan');

const rp = new NoteMysql();
const sv = new NoteDefault(rp);
const handler = new NoteHandler(sv);

noteRoutes.use(logger('dev'));
noteRoutes.use(require('express').json());

noteRoutes.get('/', (req: Request, res: Response) => {
    handler.getNotes(req, res);
});

noteRoutes.post('/', (req: Request, res: Response) => {
    handler.createNote(req, res);
});

noteRoutes.get('/:id', (req: Request, res: Response) => {
    handler.getNoteById(req, res);
});

noteRoutes.patch('/:id', (req: Request, res: Response) => {
    handler.updateNote(req, res);
});

noteRoutes.delete('/:id', (req: Request, res: Response) => {
    handler.deleteNote(req, res);
});

export default noteRoutes;
