import mongoose from 'mongoose';
const NotesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description: {
        type: String,
    },
    bg_color: {
        type: Number
    },
})

export default mongoose.models.Notes || mongoose.model('Notes', NotesSchema)