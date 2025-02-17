import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema(
    {
        userMessage: { type: String, required: true },
        botMessage: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default mongoose.models.Chat || mongoose.model('Chat', ChatSchema);
