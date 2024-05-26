import { Document, Schema, model, Types, models } from 'mongoose';

export interface IFolder extends Document {
  name: string;
  parentFolder?: Types.ObjectId | null;
  userEmail: string;
}

const folderSchema = new Schema<IFolder>({
  name: { type: String, required: true },
  parentFolder: { type: Schema.Types.ObjectId, ref: 'Folder', default: null },
  userEmail: { type: String, required: true }
},
  {
    timestamps: true
  }
);

const Folder = models.Folder || model<IFolder>('Folder', folderSchema);

export default Folder;
