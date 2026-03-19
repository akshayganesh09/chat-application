import { createConversation, createConversationParticipants, findExistingOneToOne } from "../repositories/conversation.repository";

export const startNewConversation = async (participantIds: string[]) => {
    const conversationId = await createConversation();

    const pushEachUserToConversation = participantIds.map(id => createConversationParticipants(conversationId, id));

    await Promise.all(pushEachUserToConversation);

    return { conversationId, participants: participantIds };
};

// To be learn

export const getOrCreateConversation = async (userAId: string, userBId: string) => {
    let conversationId = await findExistingOneToOne(userAId, userBId);

    console.log("ConversationId:", conversationId);
    console.log(!conversationId);

    if(!conversationId) {
        conversationId = await createConversation();
        console.log("conversationId: ", conversationId);

        await createConversationParticipants(conversationId, userAId);
        await createConversationParticipants(conversationId, userBId);
    }

    return conversationId
};