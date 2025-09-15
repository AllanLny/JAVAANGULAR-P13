package com.ycyw.chatservice.service;

import com.ycyw.chatservice.dto.ChatMessageDto;
import com.ycyw.chatservice.dto.ChatThreadDto;
import com.ycyw.chatservice.model.ChatMessage;
import com.ycyw.chatservice.model.ChatThread;
import com.ycyw.chatservice.repository.ChatMessageRepository;
import com.ycyw.chatservice.repository.ChatThreadRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatServiceImpl implements ChatService {
    private final ChatThreadRepository threadRepo;
    private final ChatMessageRepository messageRepo;

    public ChatServiceImpl(ChatThreadRepository threadRepo, ChatMessageRepository messageRepo) {
        this.threadRepo = threadRepo;
        this.messageRepo = messageRepo;
    }

    @Override
    public ChatThreadDto getOrCreateThreadForUser(Long userId) {
        List<ChatThread> threads = threadRepo.findByUserId(userId);
        ChatThread thread;
        if (threads.isEmpty()) {
            thread = new ChatThread();
            thread.setUserId(userId);
            thread.setCreatedAt(LocalDateTime.now());
            thread = threadRepo.save(thread);
        } else {
            thread = threads.get(0);
        }
        return toThreadDto(thread, true);
    }

    @Override
    public List<ChatThreadDto> getAllThreads() {
        return threadRepo.findAllByOrderByCreatedAtDesc().stream()
                .map(t -> toThreadDto(t, false)).collect(Collectors.toList());
    }

    @Override
    public List<ChatThreadDto> getThreadsByUser(Long userId) {
        return threadRepo.findByUserId(userId).stream()
                .map(t -> toThreadDto(t, false)).collect(Collectors.toList());
    }

    @Override
    public List<ChatMessageDto> getMessages(Long threadId) {
        return messageRepo.findByThreadId(threadId).stream()
                .map(this::toMessageDto).collect(Collectors.toList());
    }

    @Override
    public ChatMessageDto userSendMessage(Long userId, String message) {
        ChatThreadDto threadDto = getOrCreateThreadForUser(userId);
        ChatThread thread = threadRepo.findById(threadDto.id).orElseThrow();
        ChatMessage msg = new ChatMessage();
        msg.setThread(thread);
        msg.setSenderType("user");
        msg.setMessage(message);
        msg.setSentAt(LocalDateTime.now());
        return toMessageDto(messageRepo.save(msg));
    }

    @Override
    public ChatMessageDto supportSendMessage(Long threadId, String message) {
        ChatThread thread = threadRepo.findById(threadId).orElseThrow();
        ChatMessage msg = new ChatMessage();
        msg.setThread(thread);
        msg.setSenderType("support");
        msg.setMessage(message);
        msg.setSentAt(LocalDateTime.now());
        return toMessageDto(messageRepo.save(msg));
    }

    private ChatThreadDto toThreadDto(ChatThread thread, boolean withMessages) {
        ChatThreadDto dto = new ChatThreadDto();
        dto.id = thread.getId();
        dto.userId = thread.getUserId();
        dto.createdAt = thread.getCreatedAt();
        if (withMessages) {
            dto.messages = thread.getMessages() != null ? thread.getMessages().stream().map(this::toMessageDto).collect(Collectors.toList()) : null;
        }
        return dto;
    }

    private ChatMessageDto toMessageDto(ChatMessage msg) {
        ChatMessageDto dto = new ChatMessageDto();
        dto.id = msg.getId();
        dto.senderType = msg.getSenderType();
        dto.message = msg.getMessage();
        dto.sentAt = msg.getSentAt();
        dto.threadId = msg.getThread() != null ? msg.getThread().getId() : null;
        return dto;
    }
}
