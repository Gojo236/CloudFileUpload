import { Document, Schema, model, Types, models } from "mongoose";
export interface IDoc extends Document {
  name: string;
  parentFolder?: Types.ObjectId | null;
  userEmail: string;
  downloadURL: string;
  docSize: number;
  deletedAt: Date | null;
  extension: string;
}

const docSchema = new Schema<IDoc>(
  {
    name: { type: String, required: true },
    parentFolder: { type: Schema.Types.ObjectId, ref: "Folder", default: null },
    userEmail: { type: String, required: true },
    downloadURL: { type: String, required: true },
    docSize: { type: Number, required: true },
    deletedAt: { type: Date, default: null },
    extension: { type: String, default: "" },
  },
  {
    timestamps: true,
  },
);

const Doc = models.Doc || model<IDoc>("Doc", docSchema);

export default Doc;
