# 📷 Fisheye

## 🎯 À propos du projet

FishEye est une refonte complète d'une plateforme existante pour photographes freelance. Ce projet met l'accent sur l'accessibilité, les performances et l'expérience utilisateur multilingue.

## ✨ Fonctionnalités principales

- **Page d'accueil** : Galerie de tous les photographes avec leurs informations clés
- **Pages photographes individuelles** :
  - Présentation détaillée du photographe
  - Galerie de médias (photos et vidéos) avec tri dynamique
  - Système de likes pour chaque média
  - Lightbox pour visualisation pleine page
  - Formulaire de contact modal
- **Internationalisation** : Support français et anglais
- **Accessibilité** : Navigation clavier complète, lecteurs d'écran, ARIA
- **Responsive** : Adapté à tous les écrans

## 🛠️ Technologies utilisées

- **Framework** : [Next.js 16](https://nextjs.org/) avec App Router
- **Langage** : TypeScript
- **Base de données** : [Prisma](https://www.prisma.io/) avec SQLite
- **Internationalisation** : [next-intl](https://next-intl-docs.vercel.app/)
- **UI Components** : [Radix UI](https://www.radix-ui.com/)
- **Styling** : CSS Modules + [Tailwind CSS v4](https://tailwindcss.com/)
- **Tests** : [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/)
- **Qualité du code** : ESLint, Biome
- **Gestion de packages** : pnpm

## 📋 Prérequis

- Node.js 18+
- pnpm 8+

## 🚀 Installation

```bash
# Cloner le repository
git clone [URL_DU_REPO]
cd fisheye

# Installer les dépendances
pnpm install

# Configurer la base de données
pnpm prisma:migrate
pnpm prisma:seed

# Lancer le serveur de développement
pnpm dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📜 Scripts disponibles

```bash
# Développement
pnpm dev              # Démarre le serveur de développement

# Build et production
pnpm build            # Crée une version optimisée
pnpm start            # Lance la version de production

# Base de données
pnpm prisma:migrate   # Applique les migrations
pnpm prisma:seed      # Peuple la base de données
pnpm prisma:studio    # Interface graphique Prisma

# Tests et qualité
pnpm test             # Lance les tests Vitest
pnpm lint             # Vérifie le code avec ESLint
pnpm format           # Formate le code avec Biome
```

## 📁 Structure du projet

```
fisheye/
├── src/
│   ├── app/                    # Pages Next.js (App Router)
│   │   └── [locale]/          # Routes internationalisées
│   │       ├── photographer/  # Pages photographes
│   │       └── globals.css    # Styles globaux
│   ├── components/            # Composants réutilisables
│   │   ├── Button/
│   │   ├── DropDown/
│   │   ├── Form/
│   │   ├── Grid/
│   │   ├── Header/
│   │   ├── Minia/
│   │   └── components/ui/     # Composants UI Radix
│   ├── actions/               # Server Actions
│   ├── services/              # Services (Prisma)
│   ├── lib/                   # Utilitaires
│   ├── i18n/                  # Configuration i18n
│   ├── hooks/                 # Hooks React personnalisés
│   ├── types/                 # Types TypeScript
│   └── __tests__/             # Tests unitaires
├── prisma/
│   ├── schema.prisma          # Schéma de base de données
│   └── seed.ts                # Script de peuplement
├── public/
│   └── assets/                # Images et vidéos
├── messages/                  # Fichiers de traduction
│   ├── en.json
│   └── fr.json
└── data/                      # Données JSON sources
```

## 🌐 Internationalisation

Le site supporte 2 langues :
- Français (`fr`) - langue par défaut
- Anglais (`en`)

Les URLs sont préfixées par le code langue : `/fr/...` ou `/en/...`

## ♿ Accessibilité

- Navigation complète au clavier (Tab, Shift+Tab, Entrée, Échap, flèches)
- Focus trap dans les modales
- Attributs ARIA appropriés
- Messages de navigation pour lecteurs d'écran
- Contraste des couleurs respecté
- Labels descriptifs sur tous les éléments interactifs

## 🗃️ Modèle de données

### Photographer
- id, name, city, country
- tagline, price, portrait

### Media
- id, photographerId
- title, image, video
- likes, date, price

## 🎨 Design System

**Couleurs principales :**
- Primary Dark: `#901c1c`
- Primary Light: `#D3573C`
- Secondary: `#DB8876`

**Typographie :**
- Font principale : DM Sans

## 🔒 Sécurité

- Sanitization des données de formulaire avec DOMPurify
- Validation avec Zod
- Server Actions pour les mutations
- Protection CSRF native Next.js

## 📱 Responsive Design

Le site s'adapte aux différentes tailles d'écran :
- Mobile : < 768px
- Tablette : 768px - 1024px
- Desktop : > 1024px

## 🧪 Tests

```bash
# Lancer tous les tests
pnpm test

# Mode watch
pnpm test:watch

# Coverage
pnpm test:coverage
```

## 📄 Licence

Ce projet est réalisé dans le cadre d'une formation OpenClassrooms.

## 👥 Auteur

Développé par William Derue - Formation OpenClassrooms