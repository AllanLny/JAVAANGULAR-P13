package com.ycyw.chatservice.dto;

import java.time.LocalDateTime;

public class ChatMessageDto {
    public Long id;
    public String senderType;
    public String message;
    public LocalDateTime sentAt;
    public Long threadId;
}