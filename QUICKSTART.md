# 🚀 Démarrage Rapide - MIA

## Installation Express

```bash
cd mia-platform
npm install
```

## Configuration Minimale

1. **Créer le fichier .env**
```bash
echo "VITE_GEMINI_API_KEY=votre_cle_api_ici" > .env
```

2. **Obtenir une clé API Gemini (optionnel pour tester)**
   - Aller sur https://makersuite.google.com/app/apikey
   - Créer une clé gratuite
   - La copier dans `.env`

## Lancer l'Application

```bash
npm run dev
```

L'application sera accessible sur **http://localhost:5173**

## 🎯 Tester les Fonctionnalités

### 1. Page d'Accueil
- Ouvrir http://localhost:5173
- Explorer le design moderne
- Cliquer sur "Connexion"

### 2. Authentification
- Choisir un rôle : **Entreprise** ou **Intérimaire**
- Voir comment l'interface s'adapte

### 3. Tableau de Bord

**En tant qu'Entreprise:**
- Voir les statistiques
- Explorer le graphique de performance
- Tester le bouton "Analyser avec l'IA" (nécessite clé API)
- Cliquer sur "Évaluer" un intérimaire

**En tant qu'Intérimaire:**
- Consulter ses statistiques personnelles
- Voir l'historique des missions
- Évaluer une entreprise

### 4. Navigation
- Tester la sidebar (menu latéral)
- Ouvrir sur mobile (responsive)
- Chercher avec la barre de recherche

### 5. Fonctionnalités IA (avec clé API)
- 🔍 **Recherche** : "meilleurs intérimaires en marketing"
- ✨ **Génération** : Bouton "Générer avec l'IA" dans évaluation
- 📊 **Analyse** : Bouton "Analyser avec l'IA" sur le graphique
- 🎙️ **Support** : Bouton flottant en bas à droite

### 6. Mode Sombre
- Aller dans Paramètres (sidebar)
- Activer le mode sombre
- Observer les transitions

### 7. PWA
- Aller sur /app/mobile
- Scanner le QR code avec votre téléphone
- Suivre les instructions d'installation

## 🐛 Problèmes Connus

### Build Production
Le build peut échouer avec l'erreur Tailwind. Solutions:

**Option 1: Utiliser en mode dev seulement**
```bash
npm run dev
```

**Option 2: Downgrade Tailwind (si nécessaire)**
```bash
npm install -D tailwindcss@3
```

### Reconnaissance Vocale
Le support vocal nécessite :
- Un navigateur compatible (Chrome/Edge)
- HTTPS en production (OK en local)
- Permission microphone

## 📱 Tester en PWA

### Sur Mobile (même réseau WiFi)
1. Noter l'IP affichée dans le terminal
2. Sur votre téléphone : http://[IP]:5173
3. Suivre instructions d'installation

### Sur Desktop
- Chrome: Icône "Installer" dans la barre d'adresse
- Edge: Même chose

## 🎨 Personnalisation Rapide

### Changer les couleurs
Éditer `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      primary: '#votre-couleur',
    }
  }
}
```

### Ajouter des données
Éditer `src/data/constants.ts`:
- Ajouter des intérimaires
- Ajouter des entreprises
- Ajouter des missions

### Modifier le logo
Remplacer les icônes dans `/public`

## 📚 Documentation Complète

Voir `README.md` pour la documentation détaillée.
Voir `CONSTRUCTION_SUMMARY.md` pour l'architecture complète.

## 🆘 Aide

**Erreur de compilation?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Port déjà utilisé?**
```bash
npm run dev -- --port 3000
```

**Problème avec Tailwind?**
- Vérifier que `@tailwindcss/postcss` est installé
- Vérifier `postcss.config.js`

## 🎯 Workflow Recommandé

1. ✅ Installer et lancer en dev
2. ✅ Tester les 2 rôles (entreprise + intérimaire)
3. ✅ Explorer toutes les pages
4. ✅ Tester sur mobile
5. ✅ Configurer l'API Gemini
6. ✅ Tester les fonctionnalités IA
7. ⚠️ Ne pas builder en prod avant de résoudre Tailwind

## 🎉 Bon développement !

L'application est **100% fonctionnelle en mode dev** !

```
┌─────────────────────────────────────────┐
│                                         │
│   🚀 MIA - Mercato Interim Agency      │
│                                         │
│   ✅ Structure complète                 │
│   ✅ 25 fichiers créés                  │
│   ✅ Design moderne                     │
│   ✅ Mode sombre                        │
│   ✅ PWA ready                          │
│   ✅ IA intégrée                        │
│                                         │
│   Prêt à être utilisé ! 🎊             │
│                                         │
└─────────────────────────────────────────┘
```
