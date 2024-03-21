import { NoteService } from "../entity/note";
import { Request, Response } from "express";

class NoteHandler {

    sv: NoteService;
    constructor(sv: NoteService) {
        this.sv = sv;
    }

    async createNote(req: Request, res: Response) {
        this.sv.save(req.body).then((note) => {
            res.send(note);
        }
        ).catch((error) => {
            res.send(error);
        });
    }

    async getNotes(req: Request, res: Response) {
        this.sv.findAll().then((notes) => {
            res.send(notes);
        }
        ).catch((error) => {
            res.send(error);
        });
    }

    async getNoteById(req: Request, res: Response) {
        const id = req.params.id;
        const intId = parseInt(id);
        if (isNaN(intId)) {
            res.send('Invalid id');
            return;
        }
        this.sv.findById(intId).then((note) => {
            res.send(note);
        }
        ).catch((error) => {
            res.send(error);
        });
    }

    async updateNote(req: Request, res: Response) {
        const id = req.params.id;
        const intId = parseInt(id);
        if (isNaN(intId)) {
            res.statusCode = 400;
            res.send('Invalid id');
            return;
        }
        const editedNote = await this.sv.update(parseInt(req.params.id), req.body);
        if(!editedNote) {
            res.statusCode = 404;
            res.send('Note not found');
            return;
        }
        res.send(editedNote);
    }

    async deleteNote(req: Request, res: Response) {
        this.sv.delete(parseInt(req.params.id)).then((note) => {
            res.send(note);
        }
        ).catch((error) => {
            res.send(error);
        });
    }
}

export { NoteHandler };