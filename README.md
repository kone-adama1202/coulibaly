# WorldDigital — Site vitrine

Site vitrine React (Vite + Tailwind v4) pour WorldDigital, avec formulaire de contact
dynamique prêt pour Netlify Forms.

## Développement local

```bash
npm install
npm run dev
```

## Déploiement gratuit sur Netlify (recommandé)

### Option A — Sans ligne de commande (le plus simple)
1. Créez un compte gratuit sur https://netlify.com
2. Faites `npm run build` en local (ou laissez Netlify le faire, voir Option B)
3. Glissez-déposez le dossier `dist/` généré sur la page "Deploys" de Netlify

### Option B — Via GitHub (recommandé pour les mises à jour futures)
1. Poussez ce projet sur un dépôt GitHub
2. Sur Netlify : "Add new site" → "Import an existing project" → connectez le dépôt
3. Netlify détecte automatiquement `netlify.toml` (build command: `npm run build`,
   publish directory: `dist`)
4. Déployez — le formulaire de contact fonctionnera automatiquement (Netlify Forms
   détecte le formulaire caché dans `index.html` au moment du build)

### Recevoir les emails du formulaire
Une fois déployé, allez dans **Site settings → Forms → Form notifications** sur
Netlify et ajoutez votre adresse email pour recevoir chaque soumission.
Gratuit jusqu'à 100 soumissions/mois.

## À personnaliser avant mise en ligne
- `src/components/Team.jsx` — vos vrais noms, rôles, photos
- `src/components/Portfolio.jsx` — vos vrais projets une fois réalisés
- Coordonnées de contact réelles (téléphone, WhatsApp, adresse) à ajouter dans `Footer.jsx` / `Contact.jsx`
- Nom "WorldDigital" — à confirmer définitivement + vérifier la disponibilité du nom de domaine
# coulibaly
