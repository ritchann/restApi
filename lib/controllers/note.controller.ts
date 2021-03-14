import { Request, Response } from "express";
import { UpdateOptions, DestroyOptions } from "sequelize";
import { Note, NoteInterface } from "../models/site.model";

export class NoteController {
  public index(req: Request, res: Response) {
    Note.findAll<Note>({})
      .then((notes: Array<Note>) => res.json(notes))
      .catch((err: Error) => res.status(500).json(err));
  }

  public create(req: Request, res?: Response) {
    const params: NoteInterface = req.body;

    Note.create<Note>(params)
      .then((notes: Note) => res.status(201).json(notes))
      .catch((err: Error) => res.status(500).json(err));
  }

  public show(req: Request, res: Response) {
    const noteId: number = parseInt(req.params.id);

    Note.findByPk<Note>(noteId)
      .then((note: Note | null) => {
        if (note) res.json(note);
        else res.status(404).json({ errors: ["Note not found"] });
      })
      .catch((err: Error) => res.status(500).json(err));
  }

  public update(req: Request, res: Response) {
    const noteId: number = parseInt(req.params.id);
    const params: NoteInterface = req.body;

    const update: UpdateOptions = {
      where: { id: noteId },
      limit: 1,
    };

    Note.update(params, update)
      .then(() => res.status(202).json({ data: "success" }))
      .catch((err: Error) => res.status(500).json(err));
  }

  public delete(req: Request, res: Response) {
    const noteId: number = parseInt(req.params.id);
    const options: DestroyOptions = {
      where: { id: noteId },
      limit: 1,
    };

    Note.destroy(options)
      .then(() => res.status(204).json({ data: "success" }))
      .catch((err: Error) => res.status(500).json(err));
  }

  public get(req: Request, res: Response) {
    let whereQ = {};
    if (req.params.title != null && req.params.title != "")
      whereQ = { ...whereQ, title: req.params.title };
    if (req.params.content != null && req.params.content != "")
      whereQ = { ...whereQ, title: req.params.content };

    Note.findAll<Note>({ where: whereQ })
      .then((notes: Array<Note>) => res.json(notes))
      .catch((err: Error) => res.status(500).json(err));
  }
}
