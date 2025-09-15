# Gateway Service

Service de routage basé sur Spring Cloud Gateway.

## Configuration

```yml
spring:
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: http://localhost:8081
          predicates:
            - Path=/api/users/**
        - id: chat-service
          uri: http://localhost:8082
          predicates:
            - Path=/api/chat/**
```

## Routes

- `/api/users/**` -> User Service (8081)
- `/api/chat/**` -> Chat Service (8082)

## CORS

Configuration CORS incluse pour le développement frontend.