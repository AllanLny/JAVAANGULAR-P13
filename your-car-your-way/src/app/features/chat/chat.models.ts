export interface ChatMessage {
    id?: number;
    content?: string;
    message?: string;
    timestamp?: string;
    sentAt?: string;
    senderId?: number;
    threadId?: number;
    senderType?: string;
}

export interface ChatThread {
    id: number;
    userId: number;
    createdAt: string;
    lastMessage?: string;
    status?: string;
}