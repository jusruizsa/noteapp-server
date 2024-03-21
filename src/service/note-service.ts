import {Note,  NoteService } from "../entity/note";
import { NoteMysql } from "../repository/note-repository";

class NoteDefault implements NoteService {

    rp: NoteMysql;
    constructor(rp: NoteMysql) {
        this.rp = rp;
    }

    save(note: Note): Promise<Note> {
        return this.rp.save(note); 
    }
    findById(id: number): Promise<Note | null> {
        return this.rp.findById(id);
    }
    findAll(): Promise<Note[]> {
        return this.rp.findAll();
    }
    update(id: number, note: Note): Promise<Note | null> {
        return this.rp.update(id, note);
    }
    delete(id: number): Promise<boolean> {
        return this.rp.delete(id);
    }
}

export { NoteDefault };