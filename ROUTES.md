# 🗺️ Routes et Navigation - Application MIA

## Structure des Routes

```
/                           → Landing Page (Public)
/auth                       → Authentification (Public)
/app/*                      → Application (Protégé - nécessite auth)
  ├── /app/dashboard        → Tableau de bord (dynamique selon rôle)
  ├── /app/mobile           → Installation PWA
  ├── /app/interimaires     → Liste intérimaires (Entreprise uniquement) [À CRÉER]
  ├── /app/missions         → Missions (adapté au rôle) [À CRÉER]
  ├── /app/entreprises      → Liste entreprises (Intérimaire uniquement) [À CRÉER]
  ├── /app/performances     → Analyses performances (Entreprise) [À CRÉER]
  ├── /app/evaluations      → Évaluations (adapté au rôle) [À CRÉER]
  ├── /app/rapports         → Rapports (Entreprise) [À CRÉER]
  ├── /app/profil           → Profil utilisateur (Intérimaire) [À CRÉER]
  ├── /app/settings         → Paramètres [À CRÉER]
  ├── /app/security         → Sécurité [À CRÉER]
  └── /app/help             → Aide [À CRÉER]
```

## Pages Créées (✅)

### 1. Landing Page (`/`)
**Fichier:** `src/pages/LandingPage.tsx`

**Sections:**
- Header avec logo et bouton connexion
- Hero section avec titre et CTA
- Section "Le problème" (3 cartes)
- Section "Notre solution" (4 features)
- CTA finale
- Footer

**Actions:**
- Bouton "Connexion" → Redirige vers `/auth`
- Bouton "Commencer maintenant" → Redirige vers `/auth`

---

### 2. Auth Page (`/auth`)
**Fichier:** `src/pages/AuthPage.tsx`

**Fonctionnalités:**
- Choix du rôle : Entreprise ou Intérimaire
- 2 cartes interactives
- Liste des fonctionnalités par rôle
- Bouton retour vers landing

**Actions:**
- Clic sur "Entreprise" → Login + Redirect `/app/dashboard`
- Clic sur "Intérimaire" → Login + Redirect `/app/dashboard`
- Bouton "Retour" → Redirect `/`

---

### 3. Dashboard Page (`/app/dashboard`)
**Fichier:** `src/pages/DashboardPage.tsx`

**Version ENTREPRISE:**
- 4 Stats Cards :
  * Total Évaluations
  * Missions Actives
  * Intérimaires Actifs
  * Note Moyenne
- Graphique de performance (Chart.js)
  * Bouton "Analyser avec l'IA" → Ouvre AnalysisModal
- Activité récente (3 dernières)
- Derniers Intérimaires (4)
  * Bouton "Évaluer" → Ouvre RatingModal

**Version INTÉRIMAIRE:**
- 4 Stats Cards :
  * Note Moyenne
  * Missions Réalisées
  * En cours
  * Évaluations Reçues
- Historique des missions
  * Statut (Terminée/Active/À venir)
  * Bouton "Évaluer" sur missions terminées → Ouvre RatingModal

---

### 4. Mobile App Page (`/app/mobile`)
**Fichier:** `src/pages/MobileAppPage.tsx`

**Sections:**
- QR Code pour accès mobile
- Instructions iOS (4 étapes)
- Instructions Android (4 étapes)
- Section avantages PWA (3 features)

---

## Layout Principal (`/app/*`)

**Fichier:** `src/components/layout/AppLayout.tsx`

**Composants:**
- Sidebar (navigation)
- Header (recherche, notifications, profil)
- Main content area (Outlet)
- FAB Support en direct (bouton flottant)

### Sidebar

**Navigation ENTREPRISE:**
1. 📊 Tableau de Bord → `/app/dashboard`
2. 👥 Intérimaires → `/app/interimaires`
3. 💼 Missions → `/app/missions`
4. 📈 Performances → `/app/performances`
5. ⭐ Évaluations → `/app/evaluations`
6. 📋 Rapports → `/app/rapports`

**Navigation INTÉRIMAIRE:**
1. 📊 Tableau de Bord → `/app/dashboard`
2. 🔍 Rechercher Missions → `/app/missions`
3. 🏢 Entreprises → `/app/entreprises`
4. ⭐ Mes Évaluations → `/app/evaluations`
5. 📝 Évaluations Données → `/app/evaluations-donnees`
6. 👤 Mon Profil → `/app/profil`

**Navigation COMMUNE (en bas):**
1. 📱 Application Mobile → `/app/mobile`
2. ⚙️ Paramètres → `/app/settings`
3. 🛡️ Sécurité → `/app/security`
4. ❓ Aide → `/app/help`
5. 🚪 Déconnexion (modal confirmation) → Redirect `/`

---

## Modales (Composants Overlay)

### 1. RatingModal
**Fichier:** `src/components/modals/RatingModal.tsx`

**Déclencheurs:**
- Bouton "Évaluer" sur Dashboard
- Bouton "Évaluer" sur historique missions

**Fonctionnalités:**
- Sélection note (1-5 étoiles)
- Champ commentaire
- Bouton "Générer avec l'IA" (nécessite API Gemini)
- Bouton "Soumettre l'évaluation"

---

### 2. SearchModal
**Fichier:** `src/components/modals/SearchModal.tsx`

**Déclencheurs:**
- Bouton recherche dans Header
- Raccourci clavier (potentiel)

**Fonctionnalités:**
- Input recherche en langage naturel
- Parsing IA (Gemini)
- Exemples de requêtes
- Bouton "Rechercher"

---

### 3. AnalysisModal
**Fichier:** `src/components/modals/AnalysisModal.tsx`

**Déclencheurs:**
- Bouton "Analyser avec l'IA" sur graphique Dashboard

**Fonctionnalités:**
- Affichage des données
- Bouton "Lancer l'analyse IA"
- Résultat de l'analyse textuel
- Icône robot animée

---

### 4. ConfirmModal
**Fichier:** `src/components/modals/ConfirmModal.tsx`

**Déclencheurs:**
- Bouton "Déconnexion" dans Sidebar
- Actions critiques futures

**Types:**
- `danger` (rouge) - Déconnexion
- `warning` (jaune)
- `info` (bleu)

---

### 5. LiveSupportModal
**Fichier:** `src/components/ui/LiveSupportModal.tsx`

**Déclencheurs:**
- FAB (bouton flottant) en bas à droite

**Fonctionnalités:**
- Reconnaissance vocale
- Synthèse vocale
- Transcription en temps réel
- Indicateur "IA parle..."
- Bouton micro on/off

---

## Navigation Guards

### Protection des Routes

**Route protégée:** `/app/*`
- Vérifie `isAuthenticated` du contexte Auth
- Redirect vers `/auth` si non authentifié
- Sauvegarde de la session dans localStorage

---

## États de Navigation

### 1. Non connecté
```
/ → /auth
```

### 2. Connecté (Entreprise)
```
/ → /auth → /app/dashboard (version entreprise)
             ├── /app/interimaires
             ├── /app/missions
             ├── /app/performances
             └── ...
```

### 3. Connecté (Intérimaire)
```
/ → /auth → /app/dashboard (version intérimaire)
             ├── /app/missions
             ├── /app/entreprises
             ├── /app/profil
             └── ...
```

---

## Pages À Créer (❌)

Pour compléter l'application, voici les pages manquantes :

### Pour ENTREPRISE:
1. `/app/interimaires` - Liste et recherche d'intérimaires
2. `/app/missions` - Gestion des missions (onglets: actives/à venir/terminées)
3. `/app/performances` - Visualisations avancées
4. `/app/evaluations` - Historique des évaluations données
5. `/app/rapports` - Génération de rapports PDF

### Pour INTÉRIMAIRE:
1. `/app/missions` - Recherche et candidature aux missions
2. `/app/entreprises` - Annuaire des entreprises avec notes
3. `/app/evaluations` - Évaluations reçues
4. `/app/evaluations-donnees` - Évaluations données aux entreprises
5. `/app/profil` - Édition du profil, CV, compétences

### COMMUNES:
1. `/app/settings` - Paramètres (thème, notifications, langue)
2. `/app/security` - Sécurité (mot de passe, 2FA)
3. `/app/help` - Centre d'aide, FAQ, contact

---

## Flux Utilisateur Complet

```
┌─────────────┐
│ Landing (/) │
└──────┬──────┘
       │ Clic "Connexion"
       ▼
┌─────────────┐
│ Auth /auth  │ Choix rôle
└──────┬──────┘
       │ Select Entreprise/Intérimaire
       ▼
┌──────────────────┐
│ App Layout       │
│ /app/*           │
│                  │
│ ┌──────────────┐ │
│ │  Sidebar     │ │
│ │  (adapté)    │ │
│ └──────────────┘ │
│                  │
│ ┌──────────────┐ │
│ │  Header      │ │
│ └──────────────┘ │
│                  │
│ ┌──────────────┐ │
│ │  Dashboard   │ │
│ │  (dynamique) │ │
│ └──────────────┘ │
│                  │
│ [FAB Support] 💬 │
└──────────────────┘
```

---

## 🎯 Navigation Tips

- **Alt + 1-9**: Raccourcis clavier (à implémenter)
- **Esc**: Fermer modale active
- **Ctrl/Cmd + K**: Recherche globale (à implémenter)
- **Responsive**: Menu hamburger sur mobile

---

## 📊 Statistiques Routes

- ✅ **4 pages créées**
- ❌ **~11 pages à créer**
- ✅ **5 modales créées**
- ✅ **Layout complet**
- ✅ **Navigation dynamique**
- ✅ **Auth guard**

---

**Total Routes:** 15+
**Routes Actives:** 4
**Taux de complétion:** ~27%

L'architecture de navigation est **complète et scalable** ! 🎉
