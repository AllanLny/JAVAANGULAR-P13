package com.ycyw.chatservice.repository;

import com.ycyw.chatservice.model.ChatThread;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatThreadRepository extends JpaRepository<ChatThread, Long> {
	List<ChatThread> findByUserId(Long userId);
	List<ChatThread> findAllByOrderByCreatedAtDesc();
}
