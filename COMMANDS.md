# 🛠️ Commandes Utiles - MIA Platform

## 📦 Installation & Configuration

```bash
# Installation des dépendances
npm install

# Installation propre (si problèmes)
rm -rf node_modules package-lock.json
npm install

# Créer fichier .env
cp .env.example .env

# Éditer .env
nano .env
# ou
code .env
```

## 🚀 Développement

```bash
# Démarrer le serveur de développement
npm run dev

# Démarrer sur un port spécifique
npm run dev -- --port 3000

# Démarrer avec accès réseau (pour mobile)
npm run dev -- --host

# Mode debug
npm run dev -- --debug
```

## 🏗️ Build

```bash
# Build de production
npm run build

# Preview du build
npm run preview

# Build + Preview
npm run build && npm run preview
```

## 🧹 Nettoyage

```bash
# Nettoyer node_modules et réinstaller
rm -rf node_modules package-lock.json && npm install

# Nettoyer le cache
npm cache clean --force

# Nettoyer dist
rm -rf dist
```

## 🔍 Analyse & Qualité

```bash
# Linter
npm run lint

# Linter avec fix automatique
npm run lint -- --fix

# TypeScript check
npx tsc --noEmit

# Afficher la taille du bundle
npm run build -- --report
```

## 📝 Git Commands

```bash
# Status
git status

# Ajouter tous les fichiers
git add .

# Commit
git commit -m "feat: description de la fonctionnalité"

# Push
git push origin main

# Voir l'historique
git log --oneline --graph --decorate

# Créer une nouvelle branche
git checkout -b feature/nom-feature

# Revenir à main
git checkout main
```

## 🔧 Maintenance & Debug

```bash
# Vérifier les dépendances obsolètes
npm outdated

# Mettre à jour les dépendances
npm update

# Audit de sécurité
npm audit

# Fix automatique des vulnérabilités
npm audit fix

# Voir l'arbre des dépendances
npm list

# Voir une dépendance spécifique
npm list react
```

## 📱 PWA

```bash
# Générer des icônes PWA (avec un outil)
npx pwa-asset-generator public/logo.svg public/icons

# Tester service worker localement
npm run build && npm run preview

# Valider le manifest
# Ouvrir Chrome DevTools > Application > Manifest
```

## 🧪 Tests (à configurer)

```bash
# Installer Jest et React Testing Library
npm install -D @testing-library/react @testing-library/jest-dom jest

# Lancer les tests
npm run test

# Tests en mode watch
npm run test:watch

# Coverage
npm run test:coverage
```

## 📊 Analyse du Code

```bash
# Compter les lignes de code
find src -name "*.tsx" -o -name "*.ts" | xargs wc -l

# Compter les fichiers
find src -type f | wc -l

# Voir la structure
tree src -L 3

# Ou avec ls
ls -R src/
```

## 🐳 Docker (optionnel)

```bash
# Build l'image
docker build -t mia-platform .

# Lancer le container
docker run -p 3000:80 mia-platform

# Docker compose
docker-compose up -d
```

## 🌐 Déploiement

### Vercel
```bash
# Installer Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

### Netlify
```bash
# Installer Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy

# Production deploy
netlify deploy --prod
```

### Build manuel
```bash
# Build
npm run build

# Le dossier dist/ contient les fichiers à déployer
# Uploader sur votre hébergeur
```

## 🔑 Variables d'Environnement

```bash
# Afficher les variables (sans valeurs sensibles)
echo $VITE_GEMINI_API_KEY

# Tester avec une variable temporaire
VITE_GEMINI_API_KEY=test_key npm run dev
```

## 🎨 Tailwind

```bash
# Générer le CSS complet
npx tailwindcss -i ./src/index.css -o ./dist/output.css

# Mode watch
npx tailwindcss -i ./src/index.css -o ./dist/output.css --watch

# Voir les classes disponibles
npx tailwindcss --help
```

## 📦 Package Management

```bash
# Ajouter une dépendance
npm install package-name

# Ajouter en dev
npm install -D package-name

# Désinstaller
npm uninstall package-name

# Installer une version spécifique
npm install package-name@version

# Lister les scripts disponibles
npm run
```

## 🔍 Debugging

```bash
# Lancer en mode verbose
npm run dev -- --verbose

# Voir les variables d'environnement
npm run dev -- --debug

# Ouvrir avec l'inspecteur Chrome
node --inspect npm run dev
```

## 📱 Mobile Testing

```bash
# Voir l'adresse IP locale
# Linux/Mac
ifconfig | grep inet

# Windows
ipconfig

# Démarrer avec accès réseau
npm run dev -- --host

# L'application sera accessible sur:
# http://[VOTRE-IP]:5173
```

## 🎯 Shortcuts VSCode

```bash
# Formatter tout le projet
npx prettier --write "src/**/*.{ts,tsx}"

# Linter tout le projet
npx eslint "src/**/*.{ts,tsx}" --fix

# Organiser les imports
# (Nécessite extension TypeScript Importer)
```

## 📊 Performance

```bash
# Analyser le bundle
npm run build -- --mode analyze

# Lighthouse CI
npm install -g @lhci/cli
lhci autorun

# Webpack bundle analyzer
npm install -D webpack-bundle-analyzer
```

## 🔐 Sécurité

```bash
# Audit complet
npm audit

# Audit avec fix
npm audit fix

# Audit en mode force (attention!)
npm audit fix --force

# Vérifier les licences
npx license-checker --summary
```

## 🌍 Internationalization (i18n)

```bash
# Installer react-i18next
npm install react-i18next i18next

# Extraire les textes
# (À configurer selon votre setup)
```

## 🎨 Icônes & Assets

```bash
# Générer des favicons
# Utiliser https://realfavicongenerator.net/

# Optimiser les images
npm install -D imagemin imagemin-webp

# Générer des icônes PWA
npx pwa-asset-generator input.svg output/
```

## 📚 Documentation

```bash
# Générer la doc TypeScript
npm install -D typedoc
npx typedoc src/

# Générer un changelog
npm install -D conventional-changelog-cli
npx conventional-changelog -p angular -i CHANGELOG.md -s
```

## 🎯 Scripts Personnalisés Utiles

Ajouter dans `package.json`:

```json
{
  "scripts": {
    "clean": "rm -rf dist node_modules",
    "fresh": "npm run clean && npm install",
    "type-check": "tsc --noEmit",
    "format": "prettier --write \"src/**/*.{ts,tsx}\"",
    "analyze": "npm run build -- --mode analyze"
  }
}
```

## 🚨 Troubleshooting

```bash
# Port déjà utilisé
lsof -ti:5173 | xargs kill -9

# Permissions problématiques
sudo chown -R $USER:$USER .

# Cache corrompu
rm -rf node_modules/.vite

# Problème de dépendances
npm dedupe
```

## 💡 Commandes Rapides

```bash
# Setup complet
npm install && cp .env.example .env && npm run dev

# Reset complet
rm -rf node_modules dist .env && npm install

# Check santé du projet
npm run lint && npm run type-check && npm run build

# Deploy rapide (Vercel)
npm run build && vercel --prod
```

## 🎉 One-Liner Pratiques

```bash
# Compter les TODO dans le code
grep -r "TODO" src/ | wc -l

# Trouver les console.log oubliés
grep -r "console.log" src/

# Lister les fichiers les plus gros
find src -type f -exec ls -lh {} \; | sort -k 5 -rh | head -10

# Voir les imports inutilisés (nécessite eslint)
npm run lint 2>&1 | grep "is defined but never used"
```

---

## 📖 Aide

- **Vite**: https://vitejs.dev/
- **React**: https://react.dev/
- **Tailwind**: https://tailwindcss.com/
- **TypeScript**: https://www.typescriptlang.org/

**🆘 Besoin d'aide ?** Consultez le README.md ou QUICKSTART.md
