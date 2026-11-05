# Portfolio Professionnel — Diarra Dabo

Portfolio moderne pour **Diarra Dabo**, Étudiante en Génie Informatique & Développeuse Web.
Architecture Full-Stack complète associant un **Frontend React + TypeScript + Tailwind CSS (Vite)** et un **Backend NestJS + TypeScript + TypeORM (MySQL)** avec gestion d'administration sécurisée par JWT.

---

## 🚀 Fonctionnalités & Spécifications

### 🎨 Frontend (React + TypeScript + Tailwind CSS)
- **Thème sombre immersif** : Bleu nuit, accents cyan, indigo et violet, effets lumineux et glassmorphism discret.
- **Présentation de l'ingénieure** :
  - **Hero Section** : Nom, statut étudiant génie informatique, badges techniques, terminal interactif de code, boutons d'action (*Voir mes projets*, *Me contacter*, *Télécharger mon CV*).
  - **À propos** : Parcours académique, qualités d'ingénierie, coordonnées directes.
  - **Compétences (Stack maîtrisée)** : HTML, CSS, Tailwind CSS, JavaScript, TypeScript, React, PHP, Python, jQuery, XML, MySQL, Git, GitHub avec filtrage par catégorie et jauges de niveau.
  - **Formation** : Timeline des études en génie informatique et cursus scientifique.
  - **Expériences** : Stages et projets d'équipe avec tags techniques.
  - **Projets** : Cartes modernes avec filtrage par tag, démos et liens GitHub.
  - **Avis & Recommandations** : Avis de mentors et pairs.
  - **Contact** : Formulaire fonctionnel connecté à l'API backend avec retour de chargement, succès et erreur.
  - **Footer** : Réseaux sociaux, copyright et lien direct vers l'administration.
- **Espace Administration intégré** :
  - Modal moderne d'administration accessible via le cadenas/clé dans le header ou footer.
  - Authentification JWT (identifiants par défaut : `admin` / `admin123`).
  - Gestion CRUD complète : Projets, Compétences, Expériences et Consultation des Messages reçus.
  - Système de fallback résilient : l'interface fonctionne même si le serveur MySQL n'est pas encore lancé.

---

### ⚙️ Backend (NestJS + TypeScript + MySQL + TypeORM)
Dossier séparé : `backend/`
- **Modules NestJS** :
  - `projects` : CRUD projets (avec image, description, technologies, githubUrl, demoUrl, featured).
  - `skills` : CRUD compétences (nom, catégorie, niveau, icône).
  - `experiences` : CRUD expériences (titre, entreprise, description, dateDebut, dateFin, technologies).
  - `contact` : Réception des messages de contact et boîte de réception admin.
  - `auth` : Authentification JWT pour les administrateurs, mots de passe hashés avec bcrypt.
- **Seeding automatique** : Dès que MySQL est connecté, le serveur peuple automatiquement les tables avec les projets et compétences de Diarra Dabo.

---

## 📁 Architecture du Projet

```text
portfolio/
├── backend/                        # Backend NestJS
│   ├── src/
│   │   ├── database/               # Seeding automatique des données
│   │   ├── modules/
│   │   │   ├── auth/               # Authentification JWT, Guards, Users
│   │   │   ├── contact/            # Formulaire & messages
│   │   │   ├── experiences/        # CRUD expériences
│   │   │   ├── projects/           # CRUD projets
│   │   │   └── skills/             # CRUD compétences
│   │   ├── app.module.ts           # Module principal NestJS
│   │   └── main.ts                 # Point d'entrée, CORS & Validation
│   ├── .env.example                # Variables d'environnement pour MySQL
│   ├── .env                        # Configuration active
│   ├── package.json
│   └── tsconfig.json
├── src/                            # Frontend React + TypeScript
│   ├── assets/                     # Images et SVG
│   ├── components/                 # Composants React modulaires
│   │   ├── About.tsx
│   │   ├── AdminModal.tsx
│   │   ├── Contact.tsx
│   │   ├── Education.tsx
│   │   ├── Experience.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── SocialIcons.tsx
│   │   └── Testimonials.tsx
│   ├── data/
│   │   └── portfolioData.ts        # Données de référence de Diarra Dabo
│   ├── services/
│   │   ├── api.ts                  # Client HTTP fetch avec JWT
│   │   ├── authService.ts
│   │   ├── contactService.ts
│   │   ├── experienceService.ts
│   │   ├── projectService.ts
│   │   └── skillService.ts
│   ├── types/
│   │   └── index.ts                # Types TypeScript
│   ├── App.tsx
│   ├── index.css                   # Styles Tailwind & glassmorphism
│   └── main.tsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.ts
```

---

## 🛠️ Instructions de Lancement

### 1. Démarrer le Frontend (React)

Dans le dossier racine `portfolio` :
```bash
# Lancer le serveur de développement Vite
npm run dev
```
Le site sera accessible sur : `http://localhost:5173`

Pour builder pour la production :
```bash
npm run build
```

---

### 2. Configuration & Démarrage du Backend (NestJS)

#### Prérequis MySQL :
1. Démarrez votre serveur MySQL (via **XAMPP**, **WampServer**, ou service MySQL natif).
2. Créez une base de données nommée `portfolio_db` :
```sql
CREATE DATABASE IF NOT EXISTS portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
3. Vérifiez les informations dans `backend/.env` :
```env
PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=portfolio_db
JWT_SECRET=super_secret_jwt_key_diarra_dabo_portfolio
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

#### Lancer le Backend :
Dans un nouveau terminal, placez-vous dans le dossier `backend` :
```bash
cd backend
npm run start:dev
```
Le backend sera actif sur : `http://localhost:3001`

---

## 📡 Endpoints de l'API REST

| Méthode | Route | Description | Accès |
|---|---|---|---|
| `GET` | `/projects` | Récupérer tous les projets | Public |
| `GET` | `/projects/:id` | Récupérer un projet par son ID | Public |
| `POST` | `/projects` | Créer un nouveau projet | Protégé JWT (Admin) |
| `PATCH` | `/projects/:id` | Modifier un projet existant | Protégé JWT (Admin) |
| `DELETE` | `/projects/:id` | Supprimer un projet | Protégé JWT (Admin) |
| `GET` | `/skills` | Récupérer la liste des compétences | Public |
| `POST` | `/skills` | Ajouter une compétence | Protégé JWT (Admin) |
| `PATCH` | `/skills/:id` | Modifier une compétence | Protégé JWT (Admin) |
| `DELETE` | `/skills/:id` | Supprimer une compétence | Protégé JWT (Admin) |
| `GET` | `/experiences` | Récupérer les expériences | Public |
| `POST` | `/experiences` | Ajouter une expérience | Protégé JWT (Admin) |
| `PATCH` | `/experiences/:id` | Modifier une expérience | Protégé JWT (Admin) |
| `DELETE` | `/experiences/:id` | Supprimer une expérience | Protégé JWT (Admin) |
| `POST` | `/contact` | Envoyer un message depuis le portfolio | Public |
| `GET` | `/contact/messages` | Consulter les messages reçus | Protégé JWT (Admin) |
| `PATCH` | `/contact/messages/:id` | Changer le statut (LU / ARCHIVÉ) | Protégé JWT (Admin) |
| `DELETE` | `/contact/messages/:id` | Supprimer un message | Protégé JWT (Admin) |
| `POST` | `/auth/login` | Connexion admin (génère le JWT) | Public |
| `GET` | `/auth/profile` | Profil de l'administrateur connecté | Protégé JWT (Admin) |

---

## 🔐 Identifiants Administrateur par Défaut

- **Identifiant** : `admin`
- **Mot de passe** : `admin123`

Accès depuis le portfolio via l'icône **Admin** en haut à droite du Header ou en bas de page dans le Footer.
