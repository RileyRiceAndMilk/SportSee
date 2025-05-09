SportSee
SportSee est une application React construite avec Vite. Elle permet d'afficher les données d'activité physique d'un utilisateur à travers des tableaux de bord interactifs et des graphiques dynamiques.

Technologies utilisées
React – Bibliothèque JavaScript pour construire des interfaces utilisateur

Vite – Outil de construction rapide pour les projets web modernes

Recharts – Bibliothèque de graphiques pour visualiser les données

ESLint – Linter pour maintenir la qualité du code

Docker – Environnement de développement containerisé

Node.js / Express – Serveur backend pour l'API

Fichier JSON – Pour gérer les données utilisateurs localement ou via l'API

Démarrer
Prérequis
Avant de commencer, assurez-vous d'avoir installé :

Node.js (version recommandée : 16.x ou supérieure)

npm (ou yarn si vous préférez)

Docker (optionnel, si vous souhaitez utiliser Docker)

Installation
Cloner le dépôt

bash
Copier
Modifier
git clone https://github.com/RileyRiceAndMilk/SportSee
cd SportSee
Installer les dépendances

bash
Copier
Modifier
npm install
Configuration : API ou données locales
L'application peut fonctionner soit avec une API Express (en local ou déployée), soit avec un fichier local data.json.

Configurer cela dans le fichier config.js.

js
Copier
Modifier
// config.js
export default {
  useApi: true, // ou false pour utiliser data.json
};
useApi: true → L’application fera des requêtes à http://localhost:3000 (backend Express).

useApi: false → L’application utilisera les données locales dans public/data.json.

Si vous choisissez d'utiliser data.json, placez-le dans le dossier public/ à la racine du projet. Un exemple de structure du fichier JSON est fourni dans le projet.

Démarrer le serveur de développement
Démarrer le serveur backend Express (si vous utilisez l'API) :

bash
Copier
Modifier
npm run server
Cela démarrera l'API sur http://localhost:3000.

Démarrer l'application frontend avec Vite :

bash
Copier
Modifier
npm run dev
Cela lancera Vite, et l'application sera accessible sur : http://localhost:5173.

Utilisation de Docker (optionnel)
Si vous souhaitez utiliser Docker pour conteneuriser l'application :

Construire l’image Docker :

bash
Copier
Modifier
docker build -t sportsee .
Lancer le conteneur Docker :

bash
Copier
Modifier
docker run -p 5173:5173 sportsee
L'application sera accessible via http://localhost:5173.

Notes supplémentaires :
Assurez-vous que le serveur Express est bien en marche si vous avez opté pour l'option API.

Si vous utilisez data.json, assurez-vous que le fichier est correctement placé dans le dossier public/ et que config.js est bien configuré pour le mode local.

docker build -t sportsee .

 
 
