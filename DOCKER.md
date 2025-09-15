# Docker
Les services peuvent être démarrés facilement avec Docker Compose :

```bash
# Construire tous les services
docker-compose build

# Démarrer tous les services
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter tous les services
docker-compose down
```

## Services et Ports

- Frontend : http://localhost:4200
- Gateway : http://localhost:8080
- User Service : http://localhost:8081
- Chat Service : http://localhost:8082
- PostgreSQL : localhost:5432

## Variables d'Environnement

Les variables d'environnement sont définies dans le docker-compose.yml :
- POSTGRES_DB: pocp13
- POSTGRES_USER: postgres
- POSTGRES_PASSWORD: postgres

## Volumes

- postgres_data : Persistance des données PostgreSQL
- Le fichier create_db.sql est automatiquement exécuté à l'initialisation de la base de données

## Dépendances

Les services démarrent dans l'ordre suivant :
1. PostgreSQL
2. Gateway Service
3. User Service et Chat Service (en parallèle)
4. Frontend