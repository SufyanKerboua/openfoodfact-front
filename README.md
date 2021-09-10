# openfoodfact-front
Création d'une web application permettant de communiquer avec l'API Openfoodfact-API

## Description
Développer une application en mode webApp permettant à un utilisateur de se connecter, ainsi que de rajouter/supprimer de produits le tout via leurs codes barres.

`Les informations concerant ces produits sont généré via l'API OpenFoodFact`

L'application comporte 3 pages principales.
- La première permet à un utilisateur de se créer/connecter via un nom d'utilisateur ainsi que d'un mot de passe.
- La seconde page, permet à un utilisateur connecté de consulter un dashboard de tout les produits que celui-ci à deja pu consulter. Avec la possibilité de rajouter un produit via un code barre.
- Enfin la dernière, permet à l'utilisateur de modifier les informations de son profil, de supprimer son compte, ou encore de supprimer tous les produits consultés.

## Language de programmation

Utilisation d'un framework JS, `ReactJS`.

### Dépendences
- Axios
- material-ui/core
- material-ui/icons

## Installation

```bash
$ npm install
# installation des packets manquants
```

A noter que toutes les configurations concernant l'API permettant de communiquer avec la webApp sont situées dans le fichier **src/config/apiConfig.js**.

## Scripts disponibles

Dans le dossier du projet, vous pouvez lancer:

### `yarn start`

Lancant l'application en mode développement.\
Ouvrez [http://localhost:3000](http://localhost:3000) pour lancer l'application sur votre navigateur.

### `yarn build`

Construit l'application pour la production dans le dossier `build`.\

La compilation est minifiée et les noms de fichiers incluent les hachages.\
Votre application est prête à être déployée!

## Auteur

- Sufyan Kerboua