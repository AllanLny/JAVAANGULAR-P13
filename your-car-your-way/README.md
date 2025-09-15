# Your Car Your Way Frontend

Application Angular avec fonctionnalités de chat en temps réel pour la plateforme Your Car Your Way.

## Fonctionnalités

- Interface de chat en temps réel avec WebSocket
- Vue support/client distincte
- Historique des conversations
- Notifications temps réel
- Interface responsive
- Authentification utilisateur

## Prérequis

- Node.js 18+
- NPM 9+
- Services backend en cours d'exécution (Gateway, Chat, User)

## Installation

```bash
# Installation des dépendances
npm install
```

## Configuration

Le fichier `proxy.conf.json` est configuré pour rediriger les requêtes API vers le Gateway :
```json
{
  "/api": {
    "target": "http://localhost:8080",
    "secure": false
  }
}
```

## Structure du Projet

- `src/app/features/`
  - `chat/` - Composants et services de chat
  - `auth/` - Authentification et gestion utilisateur
- `src/app/shared/` - Composants et services partagés
- `src/app/core/` - Services core de l'application

## Démarrage

```bash
# Démarrage en mode développement
ng serve

# Construction pour production
ng build --configuration production
```

L'application sera disponible sur `http://localhost:4200/`

## Technologies Utilisées

- Angular
- SCSS pour le styling
- WebSocket (STOMP/SockJS) pour le chat temps réel
- RxJS pour la gestion des flux asynchrones

## Commandes Angular CLI

- `ng generate component component-name` - Créer un nouveau composant
- `ng generate service service-name` - Créer un nouveau service
- `ng test` - Exécuter les tests unitaires avec Karma
- `ng e2e` - Exécuter les tests end-to-end
- `ng build` - Construire le projet

## Aide Supplémentaire

Pour plus d'aide sur Angular CLI :
- Exécuter `ng help`
- Consulter la [Documentation Angular CLI](https://angular.dev/tools/cli)
