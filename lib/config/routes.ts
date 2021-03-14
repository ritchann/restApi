import { NoteController } from "../controllers/note.controller";
import * as cors from "cors";

const corsOptions: cors.CorsOptions = {
  origin: "*",
  methods: "*",
  allowedHeaders: "*",
};

export class Routes {
  public noteController: NoteController = new NoteController();

  public routes(app): void {
    app
      .route("/notes")
      .get(this.noteController.index, cors(corsOptions))
      .post(this.noteController.create, cors(corsOptions));

    app
      .route("/notes/:id")
      .get(this.noteController.show, cors(corsOptions))
      .put(this.noteController.update, cors(corsOptions))
      .delete(this.noteController.delete, cors(corsOptions));

      app
      .route("/notes/:content:title")
      .get(this.noteController.get, cors(corsOptions))
  }
}
