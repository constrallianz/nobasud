# NOBASUD (Next.js + MongoDB)

## Prérequis
- Node.js 18+
- MongoDB (local ou Atlas)

## Démarrage
1. Copier `.env.example` en `.env.local` et renseigner MONGODB_URI
2. Installer les dépendances
3. Lancer le serveur de dev

## Pages
- `/` Accueil (vidéo de fond optionnelle)
- `/a-propos` À propos
- `/notre-approche` Notre approche
- `/realisations` Réalisations
- `/carriere` Carrières (formulaire candidature spontanée)
- `/contact` Contact (formulaire + carte)
- `/feedback` Feedback citoyen (anonyme possible + photo)
- `/media` Blog/Actualités
- `/mentions-legales` Mentions légales
- `/admin` Mini CMS (squelettes)

## API
- `POST /api/applications` Candidature (multipart)
- `POST /api/feedback` Feedback (multipart)
- `POST /api/contact` Contact

## Styles
- TailwindCSS, palette NOBASUD (bleu, orange, gris)

## Notes
- Les uploads sont stockés sous `public/uploads`.
- Sécuriser l’admin (auth) à prévoir.
