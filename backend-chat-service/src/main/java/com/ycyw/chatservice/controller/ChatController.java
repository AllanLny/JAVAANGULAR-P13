package com.ycyw.chatservice.controller;

import com.ycyw.chatservice.dto.ChatMessageDto;
import com.ycyw.chatservice.dto.ChatThreadDto;
import com.ycyw.chatservice.service.ChatService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatController {
    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @GetMapping("/threads")
    public List<ChatThreadDto> getAllThreads() {
        return chatService.getAllThreads();
    }

    @GetMapping("/user/{userId}/threads")
    public List<ChatThreadDto> getUserThreads(@PathVariable Long userId) {
        return chatService.getThreadsByUser(userId);
    }

    @GetMapping("/threads/{threadId}/messages")
    public List<ChatMessageDto> getMessages(@PathVariable Long threadId) {
        return chatService.getMessages(threadId);
    }

    @PostMapping("/user/{userId}/message")
    public ChatMessageDto userSendMessage(@PathVariable Long userId, @RequestBody ChatMessageDto msg) {
        return chatService.userSendMessage(userId, msg.message);
    }

    @PostMapping("/threads/{threadId}/support-message")
    public ChatMessageDto supportSendMessage(@PathVariable Long threadId, @RequestBody ChatMessageDto msg) {
        return chatService.supportSendMessage(threadId, msg.message);
    }
}
