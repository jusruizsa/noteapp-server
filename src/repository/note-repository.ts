import { Note, NoteRepository } from "../entity/note";
import notes from "../../db/note-db";
import conn from "../../db/conn";
import { ResultSetHeader, RowDataPacket } from "mysql2";


class NoteMysql implements NoteRepository {
    save(note: Note): Promise<Note> {
        note.created_at = new Date();
        note.updated_at = new Date();
        conn.query<ResultSetHeader>("INSERT INTO notes (title, content, created_at, updated_at) VALUES (?, ?, ?, ?)", [note.title, note.content, note.created_at, note.updated_at])
        .then((result) => {
            note.id = result[0].insertId;
        })
        .catch((err) => {
            console.error(err);
        });
        return Promise.resolve(note);
    }
    async findById(id: number): Promise<Note | null> {
        const [result, _] = await conn.query<RowDataPacket[]>("SELECT * FROM notes WHERE id = ?", [id]);
        if (result.length > 0) {
            const row = result[0];
            return Promise.resolve({
                id: row.id,
                title: row.title,
                content: row.content,
                created_at: row.created_at,
                updated_at: row.updated_at
            });
        }
        return Promise.resolve(null);
        
    
    }
    async findAll(): Promise<Note[]> {
        const notes: Note[] = [];
        const [result, _] = await conn.query<RowDataPacket[]>("SELECT * FROM notes")
        for (const row of result) {
            notes.push({
                id: row.id,
                title: row.title,
                content: row.content,
                created_at: row.created_at,
                updated_at: row.updated_at
            
            });
        }
        return Promise.resolve(notes);


    }
    async update(id: number, note: Note): Promise<Note | null> {
        const findNote = await this.findById(id);
        if (!findNote) {
            return Promise.resolve(null);
        }
        Object.assign(findNote, note);
        note.updated_at = new Date();
        const result = conn.query<ResultSetHeader>("UPDATE notes SET title = ?, content = ?, updated_at = ? WHERE id = ?", [note.title, note.content, note.updated_at, id]);
        return Promise.resolve(note);
        
    }
    async delete(id: number): Promise<boolean> {
        const result = await conn.query<ResultSetHeader>("DELETE FROM notes WHERE id = ?", [id]);
        if (result[0].affectedRows > 0) {
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }
}

export { NoteMysql };