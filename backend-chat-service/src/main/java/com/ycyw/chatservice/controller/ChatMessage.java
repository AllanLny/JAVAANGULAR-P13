package com.ycyw.chatservice.controller;

public record ChatMessage(String sender, String role, String content, String timestamp) {}
