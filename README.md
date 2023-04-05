# Projet RDV Garage

Prise de rdv pour des prestations dans un garage

## Equipe Adf

* Aurélien Larivière 
* Jean-Philippe Coquet
* Olivier Dufour
* William Mouton

## Base de données

Le schéma entité-association se trouve dans le wiki gitlab

## Démarrer le site en local

### Pour démarrer le site, vous aurez besoin de 3 terminaux

* Terminal 1 : cd front et npm run start
* Terminal 2 : cd back et npm run start
* Terminal 3 : cd back/data et sqlite3 -init items.sql items.db pour initialiser la base de données à partir du script si elle n'est pas à jour

__Ne pas oublier de faire un npm install dans le dossier front et le dossier back pour installer les packages__