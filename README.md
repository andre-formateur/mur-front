# Projet — Le Mur

Vous allez rendre fonctionnel **Le Mur** : un réseau social minimaliste où les utilisateurs connectés peuvent publier des messages, lire ceux des autres, et modifier ou supprimer les leurs.

Le **HTML** et le **CSS** sont fournis et ne doivent pas être modifiés : votre travail consiste à écrire tout le **JavaScript**. Le site est pensé pour un affichage **mobile**.

L'**API** est fournie dans le dossier `api/` : son README décrit toutes les routes, le format des données et les codes d'erreur.

---

## Démarrage

1. Dans le dossier `api/` : `npm install`, puis `npm start`.
2. Ouvrez `front/index.html` avec **Live Server**.
3. Comptes de démonstration : `demo@lemur.fr` / `demo1234` (Camille), `lucas@lemur.fr` / `lucas1234`, `ines@lemur.fr` / `ines1234`.
4. `npm run reset` remet les données de départ si besoin (et déconnecte tout le monde).

Conseil : testez chaque route avec REST Client (`api/requests.http`) **avant** d'écrire le JavaScript correspondant.

---

## Les pages

| Page | Rôle |
|---|---|
| `index.html` | Connexion |
| `inscription.html` | Création d'un compte |
| `mur.html` | Le mur : publier, lire, supprimer |
| `modifier.html?id=…` | Modifier un de ses messages |

---

## Ce qui vous aide

- **Le HTML des éléments dynamiques est écrit en commentaire dans `mur.html`** : un message d'un autre utilisateur, un de vos messages (avec ses boutons), et le mur vide. Reproduisez exactement ce HTML en JavaScript.
- **Les messages d'erreur** (`class="error"`) sont invisibles tant qu'ils sont vides : il suffit d'y écrire un texte pour l'afficher, et de le vider pour le cacher.
- **Le jeton doit survivre au changement de page** : pensez au `localStorage`.
- **L'id du message à modifier** est dans l'adresse de la page : `modifier.html?id=3`.

---

## Contraintes techniques

- Code organisé en **modules** (`type="module"`).
- Appels à l'API avec `fetch` et `async` / `await`.
- Chaque erreur est **affichée à l'utilisateur dans la page** (pas seulement dans la console).
- Les textes venant de l'API sont insérés avec `textContent`.

---

## Fonctionnalités attendues

- [ ] Se connecter
- [ ] Créer un compte
- [ ] Se déconnecter
- [ ] Protéger les pages du mur et de modification (accès réservé aux utilisateurs connectés)
- [ ] Lire tous les messages
- [ ] Publier un message
- [ ] Modifier un de ses messages
- [ ] Supprimer un de ses messages
- [ ] Afficher les messages d'erreur

---

## User stories

Chaque user story décrit un besoin de l'utilisateur, puis les **critères d'acceptation** : ce qui doit se passer pour qu'elle soit considérée comme terminée, cas d'erreur compris.

### US1 — Se connecter

> **En tant que** visiteur, **je veux** me connecter **afin d'**accéder au mur.

**Critères d'acceptation**

- Sur `index.html`, je saisis mon e-mail et mon mot de passe, puis je valide.
- Si la connexion réussit, j'arrive sur `mur.html`.
- Si je suis déjà connecté et que j'ouvre `index.html`, j'arrive directement sur le mur.

**Cas d'erreur**

| Situation | Résultat attendu |
|---|---|
| Mauvais e-mail ou mauvais mot de passe | « E-mail ou mot de passe incorrect. » s'affiche ; je reste sur la page |
| L'API ne répond pas | Un message indique que le serveur est injoignable |
| Je réessaie après une erreur | L'ancien message d'erreur disparaît |

### US2 — Créer un compte

> **En tant que** visiteur, **je veux** m'inscrire **afin de** me créer un compte qui me permettra d'accéder au mur.

**Critères d'acceptation**

- Sur `inscription.html`, je saisis un pseudo, un e-mail et un mot de passe, puis je valide.
- Si l'inscription réussit, je suis **directement connecté** et j'arrive sur `mur.html`.

**Cas d'erreur**

| Situation | Résultat attendu |
|---|---|
| E-mail déjà utilisé | « Un compte existe déjà avec cet e-mail. » s'affiche |
| Pseudo déjà utilisé | « Ce pseudo est déjà utilisé. » s'affiche |
| Données refusées par l'API (400) | Le message de l'API s'affiche |
| L'API ne répond pas | Un message indique que le serveur est injoignable |

### US3 — Accéder au mur et se déconnecter

> **En tant qu'**utilisateur, **je veux** que le mur me soit réservé et pouvoir me déconnecter **afin que** personne d'autre n'utilise mon compte.

**Critères d'acceptation**

- Sur le mur, mon pseudo est affiché dans l'en-tête.
- Le bouton « Déconnexion » me déconnecte auprès de l'API, oublie mon jeton et me ramène sur `index.html`.
- Si j'ouvre `mur.html` ou `modifier.html` sans être connecté, je suis renvoyé sur `index.html`.

**Cas d'erreur**

| Situation | Résultat attendu |
|---|---|
| Mon jeton n'est plus valable (réponse 401) | Je suis renvoyé sur `index.html` |
| L'API ne répond pas au moment de la déconnexion | Je suis quand même déconnecté |

**Pour tester le 401 :** connectez-vous, lancez `npm run reset` dans le terminal de l'API, puis rechargez le mur.

### US4 — Voir les messages

> **En tant qu'**utilisateur, **je veux** voir tous les messages des autres utilisateurs **afin de** suivre les échanges.

**Critères d'acceptation**

- Tous les messages s'affichent, du plus récent au plus ancien.
- Chaque message affiche l'initiale de son auteur, son pseudo, sa date et son contenu.
- Un message modifié affiche « · modifié » après sa date.
- **Mes** messages sont mis en évidence et sont les seuls à avoir les boutons « Modifier » et « Supprimer ».
- S'il n'y a aucun message, un message l'indique.

**Cas d'erreur**

| Situation | Résultat attendu |
|---|---|
| L'API ne répond pas | Un message d'erreur s'affiche sur le mur |

### US5 — Publier un message

> **En tant qu'**utilisateur, **je veux** poster un message sur le mur **afin de** m'exprimer.

**Critères d'acceptation**

- Je saisis mon message (280 caractères maximum), puis je clique sur « Publier ».
- Mon message apparaît en haut du mur, mis en évidence comme étant le mien.
- Le champ est vidé.

**Cas d'erreur**

| Situation | Résultat attendu |
|---|---|
| Message composé uniquement d'espaces | « Le message ne peut pas être vide. » s'affiche ; rien n'est publié |
| L'API ne répond pas | Un message indique que le serveur est injoignable |

### US6 — Modifier un de mes messages

> **En tant qu'**utilisateur, **je veux** modifier mes messages, et uniquement les miens, **afin de** corriger ce que j'ai écrit.

**Critères d'acceptation**

- Le bouton « Modifier » de mon message m'amène sur `modifier.html?id=…`.
- Le texte actuel du message est déjà dans le champ.
- Après « Enregistrer », je reviens sur le mur et le message est modifié (avec « · modifié » après sa date).
- « Annuler » me ramène sur le mur sans rien changer.

**Cas d'erreur**

| Situation | Résultat attendu |
|---|---|
| Message vide | « Le message ne peut pas être vide. » s'affiche ; je reste sur la page |
| L'URL désigne le message de quelqu'un d'autre | « Vous ne pouvez modifier que vos propres messages. » s'affiche ; l'API refuse aussi l'enregistrement (403) |
| L'URL désigne un message inexistant | Le message de l'API s'affiche (404) |
| L'API ne répond pas | Un message indique que le serveur est injoignable |

### US7 — Supprimer un de mes messages

> **En tant qu'**utilisateur, **je veux** supprimer mes messages, et uniquement les miens, **afin de** retirer ce que je ne souhaite plus partager.

**Critères d'acceptation**

- Le bouton « Supprimer » de mon message le supprime de l'API, puis du mur.

**Cas d'erreur**

| Situation | Résultat attendu |
|---|---|
| Le message a déjà été supprimé (depuis un autre onglet : 404) | Le message de l'API s'affiche et le mur est rechargé |
| Message de quelqu'un d'autre | Impossible depuis la page (pas de bouton) ; l'API refuse de toute façon (403) |
| L'API ne répond pas | Un message d'erreur s'affiche ; le message reste affiché |

---
