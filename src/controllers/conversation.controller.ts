import { Request, Response } from "express";
import { getOrCreateConversation } from "../services/conversation.service";

export const handleGetConversation = async (req: Request, res: Response) => {
    try {
        const { receiverId } = req.body;
        const senderId = (req as any).userId; // From your JWT middleware

        console.log("SenderId: ", senderId);
        console.log("ReciverId: ", receiverId);

        const conversationId = await getOrCreateConversation(senderId, receiverId);

        res.status(200).json({ message: "Conversation id created successfully", conversationId });
    } catch (error) {
        res.status(500).json({ error: "Failed to initialize conversation" });
    }
};