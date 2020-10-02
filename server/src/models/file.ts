import { IFile } from '../interfaces/IFile'
import mongoose from 'mongoose'
const File = new mongoose.Schema({
    file_path: {
        type: String,
        trim: true,
        unique: true,
        index: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        trim: true
    },
    extention: {
        type: String,
        trim: true
    },
},
    {
        timestamps: true
    }
);

export default mongoose.model<IFile & mongoose.Document>('File', File)