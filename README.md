# MIA - Mercato Interim Agency

Une plateforme web progressive de notation mutuelle pour les entreprises et les travailleurs intérimaires, développée avec React, TypeScript, et Tailwind CSS.

## 🚀 Fonctionnalités

### Fonctionnalités Générales
- ✨ Interface moderne avec effet glassmorphism
- 🌓 Mode clair/sombre
- 📱 Progressive Web App (PWA) - Installable sur mobile
- 🤖 Intégration IA avec Gemini
- 🎙️ Support vocal en temps réel
- 🔍 Recherche sémantique intelligente

### Pour les Entreprises
- 📊 Tableau de bord avec statistiques
- 👥 Gestion des intérimaires
- 💼 Suivi des missions (actives, à venir, terminées)
- ⭐ Système d'évaluation
- 📈 Analyses de performance avec IA
- 📋 Rapports détaillés

### Pour les Intérimaires
- 📊 Profil personnel avec statistiques
- 🔎 Recherche de missions
- 🏢 Consultation des entreprises
- ⭐ Historique des évaluations
- 💬 Évaluation des entreprises

## 🛠️ Technologies Utilisées

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v7
- **Charts**: Chart.js + React-Chartjs-2
- **Icons**: Lucide React
- **IA**: Google Gemini API
- **PWA**: Service Worker + Manifest
- **QR Code**: qrcode.react

## 📦 Installation

1. Cloner le repository
```bash
cd mia-platform
```

2. Installer les dépendances
```bash
npm install
```

3. Configurer l'API Gemini
```bash
cp .env.example .env
# Éditer .env et ajouter votre clé API Gemini
```

4. Lancer le serveur de développement
```bash
npm run dev
```

5. Ouvrir [http://localhost:5173](http://localhost:5173)

## 🔑 Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine du projet :

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

Pour obtenir une clé API Gemini :
1. Rendez-vous sur [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Créez une nouvelle clé API
3. Copiez-la dans votre fichier `.env`

## 📱 Fonctionnalités PWA

L'application peut être installée sur mobile et desktop :

### Installation iOS
1. Ouvrir Safari
2. Accéder à l'application
3. Toucher "Partager"
4. Sélectionner "Sur l'écran d'accueil"

### Installation Android
1. Ouvrir Chrome
2. Accéder à l'application
3. Menu (⋮)
4. "Installer l'application"

## 🤖 Intégration IA

### Recherche Sémantique
Utilisez des requêtes en langage naturel :
- "meilleurs intérimaires en marketing actifs"
- "développeurs React disponibles avec plus de 4 étoiles"

### Génération de Commentaires
L'IA génère automatiquement des commentaires d'évaluation professionnels basés sur la note et le contexte.

### Analyse de Performance
Obtenez des insights détaillés sur les tendances et performances grâce à l'analyse IA.

### Support Vocal
Utilisez le bouton flottant pour démarrer une conversation vocale avec l'assistant IA.

## 📁 Structure du Projet

```
mia-platform/
├── public/
│   ├── manifest.json          # PWA manifest
│   └── service-worker.js      # Service worker pour le cache
├── src/
│   ├── components/
│   │   ├── layout/           # Layout components (Sidebar, Header)
│   │   ├── modals/           # Modal components
│   │   └── ui/               # UI components réutilisables
│   ├── contexts/             # React contexts (Auth, Theme)
│   ├── data/                 # Données simulées
│   ├── pages/                # Pages de l'application
│   ├── services/             # Services (Gemini API)
│   ├── types/                # TypeScript types
│   ├── App.tsx               # Composant principal
│   ├── main.tsx              # Point d'entrée
│   └── index.css             # Styles globaux
├── .env.example              # Template des variables d'environnement
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🎨 Thème et Design

### Mode Clair/Sombre
Le thème peut être changé depuis les paramètres. La préférence est sauvegardée dans le localStorage.

### Glassmorphism
L'interface utilise un effet de verre translucide moderne pour les cartes et panneaux.

## 🚀 Déploiement

### Build de production
```bash
npm run build
```

### Preview du build
```bash
npm run preview
```

## 📄 Licence

Ce projet est sous licence MIT.

---

Développé avec ❤️ par l'équipe MIA
