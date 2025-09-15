# Chat Service

Service de messagerie en temps réel basé sur Spring Boot et WebSocket.

## Fonctionnalités

- Communication en temps réel via WebSocket
- Persistance des messages
- Support des conversations par thread
- API REST pour la compatibilité

## Configuration

```properties
server.port=8082
spring.datasource.url=jdbc:postgresql://localhost:5432/pocp13
spring.datasource.username=postgres
spring.datasource.password=your_password
```

## Endpoints WebSocket

- `/ws` - Point de connexion WebSocket
- `/topic/thread/{threadId}` - Canal de messages par thread
- `/app/send/user` - Envoi de message utilisateur
- `/app/send/support` - Envoi de message support

## API REST

- `GET /api/chat/threads` - Liste des threads
- `GET /api/chat/user/{userId}/threads` - Threads d'un utilisateur
- `GET /api/chat/threads/{threadId}/messages` - Messages d'un thread
- `POST /api/chat/user/{userId}/message` - Envoi message utilisateur
- `POST /api/chat/threads/{threadId}/support-message` - Envoi message support