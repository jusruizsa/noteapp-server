class Note {
  id: number;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;

  constructor(id: number, title: string, content: string, created_at: Date, updated_at: Date) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

interface NoteRepository {
  save(note: Note): Promise<Note>;
  findById(id: number): Promise<Note | null>;
  findAll(): Promise<Note[]>;
  update(id: number, note: Note): Promise<Note | null>;
  delete(id: number): Promise<boolean>;
}

interface NoteService {
  save(note: Note): Promise<Note>;
  findById(id: number): Promise<Note | null>;
  findAll(): Promise<Note[]>;
  update(id: number, note: Note): Promise<Note | null>;
  delete(id: number): Promise<boolean>;
}

export { Note, NoteRepository, NoteService };