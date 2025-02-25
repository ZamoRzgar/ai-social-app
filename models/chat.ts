import mongoose, { Document, Model } from 'mongoose';

// Define the interface for Chat document
interface IChat extends Document {
    userMessage: string;
    botMessage: string;
    createdAt: Date;
    updatedAt: Date;
}

// Define interface for Chat model with static methods
interface ChatModel extends Model<IChat> {
    findLatest(limit: number): Promise<IChat[]>;
}

const chatSchema = new mongoose.Schema({
    userMessage: {
        type: String,
        required: true,
    },
    botMessage: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

// Add the static method to the schema
chatSchema.statics.findLatest = function (limit: number) {
    return this.find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .exec();
};

// Use type assertion when creating the model
const Chat = (mongoose.models.Chat || mongoose.model<IChat, ChatModel>('Chat', chatSchema)) as ChatModel;

export default Chat;