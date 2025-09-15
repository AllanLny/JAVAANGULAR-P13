package com.ycyw.userservice.service;

import com.ycyw.userservice.dto.LoginRequest;
import com.ycyw.userservice.dto.UserDto;
import com.ycyw.userservice.model.User;
import com.ycyw.userservice.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public UserDto authenticate(LoginRequest req) {
    User user = userRepository.findByEmail(req.getUsername());
    System.out.println("Login attempt for: " + req.getUsername());
    if (user != null) {
        System.out.println("User found, checking password");
        if (user.getPasswordHash().equals(req.getPassword())) {
            System.out.println("Password matches");
            return new UserDto(user.getId(), user.getEmail(), "user");
        }
        System.out.println("Password doesn't match");
    }
    System.out.println("User not found");
    return null;
}
}