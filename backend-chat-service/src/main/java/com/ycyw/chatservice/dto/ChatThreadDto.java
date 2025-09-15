package com.ycyw.chatservice.dto;

import java.time.LocalDateTime;
import java.util.List;

public class ChatThreadDto {
    public Long id;
    public Long userId;
    public LocalDateTime createdAt;
    public List<ChatMessageDto> messages;
}