package com.ycyw.chatservice.service;

import com.ycyw.chatservice.dto.ChatMessageDto;
import com.ycyw.chatservice.dto.ChatThreadDto;
import java.util.List;

public interface ChatService {
    ChatThreadDto getOrCreateThreadForUser(Long userId);
    List<ChatThreadDto> getAllThreads();
    List<ChatThreadDto> getThreadsByUser(Long userId);
    List<ChatMessageDto> getMessages(Long threadId);
    ChatMessageDto userSendMessage(Long userId, String message);
    ChatMessageDto supportSendMessage(Long threadId, String message);
}
