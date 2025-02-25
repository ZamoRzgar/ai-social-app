import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema(
    {
        userMessage: { type: String, required: true },
        botMessage: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    },
    { 
        timestamps: true
    }
);

// Define the static method properly
ChatSchema.statics.findLatest = function(limit = 10) {
    return this.find().sort({ createdAt: -1 }).limit(limit);
};

// Using a function to handle model creation correctly across Hot Module Reloading in development
const Chat = mongoose.models.Chat || mongoose.model('Chat', ChatSchema);

export default Chat;