# Projet RDV Garage

Prise de rdv pour des prestations dans un garage

## Equipe Adf

Notre équipe de projet étudiant est composée de membres déterminés et passionnés par la réussite de notre projet. 
Chacun d'entre nous a apporté des compétences et des expériences uniques pour assurer que nous sommes bien équipés pour répondre aux besoins de notre projet.

* Aurélien Larivière 
* Jean-Philippe Coquet
* Olivier Dufour
* William Mouton

## Base de données

Le schéma entité-association se trouve dans le wiki gitlab


# 1)a.Présentation de l'application

ADF Garage, une application de réservation de créneaux pour garage facile à utiliser et pratique pour les automobilistes. Les prestataires de garage peuvent s'inscrire et enregistrer leur garage sur l'application, en précisant les services qu'ils offrent et les créneaux horaires disponibles pour les réservations. Les utilisateurs peuvent ensuite parcourir les différentes offres de garage et choisir un créneau horaire qui convient à leur emploi du temps.

L'interface utilisateur de l'application ADF Garage est conviviale et intuitive, ce qui facilite la recherche et la réservation de créneaux horaires. Les utilisateurs peuvent choisir parmi une liste de services tels que la vidange d'huile, le changement de pneus, le nettoyage et l'entretien général de leur véhicule (par exemple). Ils peuvent également sélectionner la date et l'heure qui conviennent le mieux à leur emploi du temps.

En outre, l'application ADF Garage permet aux utilisateurs de suivre l'état de leur réservation en temps réel. Les utilisateurs peuvent recevoir des notifications de rappel pour leur rendez-vous et sont informés des éventuels changements apportés à leur créneau horaire. Les prestataires de garage peuvent également utiliser l'application pour gérer leur entreprise, afficher les réservations en cours et contacter les clients.

En somme, l'application ADF Garage est un outil pratique pour les automobilistes à la recherche d'un garage fiable et pour les prestataires de garage souhaitant gérer efficacement leur entreprise. Nous sommes convaincus que l'utilisation de cette application améliorera l'expérience des utilisateurs et des prestataires de garage, en offrant une solution simple et rapide pour la réservation de créneaux horaires de garage.

# 1)b.Présentation de l'IDE utilisé par l'équipe et des packages installés dans l'application

L'environnement de développement intégré (IDE) Visual Studio Code est l'outil parfait pour les développeurs utilisant les technologies web modernes telles que React, Express, Axios, et Fullcalendar. 

Avec l'utilisation de packages tels que nodemon, react-select, react-helmet, react-bootstrap et react-cookie, nous avons pu créer une application web de qualité supérieure avec des fonctionnalités de pointe.

Les packages tels que bcrypt, cors, express, jsonwebtoken, morgan, nodemon, passport, passport-jwt, et sqlite3 ont été des outils indispensables pour créer une application backend performante et sécurisée.

# 2.Gestion de projet

La gestion de projet est un aspect crucial pour tout projet de développement de logiciel. Dans ce cas-ci, les outils Trello et Gitlab.univ-artois.fr sont des choix judicieux pour les développeurs souhaitant gérer efficacement leur projet.
Dans le cadre de notre projet, nous avons opté pour une méthode de travail agile, en mettant l'accent sur la collaboration et l'organisation. Chaque membre de l'équipe a été encouragé à travailler sur le front-end, le back-end et les tests, afin de maximiser la polyvalence et de faciliter la communication entre les membres.

Pour assurer une bonne organisation, nous avons régulièrement organisé des points de situation, ainsi que la création de tickets pour les tâches à réaliser ou les problèmes à résoudre, sur Trello. Chaque ticket Trello correspondait à une branche GitLab spécifique, ce qui nous a permis de travailler de manière autonome tout en maintenant une coordination efficace.

Chaque jour, nous avons commencé par un débriefing des tâches accomplies, celles à venir et les problèmes à résoudre. Nous avons ensuite créé des tâches sur Trello pour réaliser ces missions. Dans la journée, nous avons régulièrement fusionné les différentes branches dans la branche principale de développement, "develop", et résolu les conflits éventuels en local.

Dans l'ensemble, cette approche agile a permis une meilleure communication et coordination entre les membres de l'équipe, ainsi qu'une organisation efficace du travail.

# 3.Application

----------------------|-----------------------|------------------------|----------------------|
                      |                                                |                      |                   
  Mode non connecté   |                Mode connecté                   |     prestataires de  |  
                      |                                                |        service       |
----------------------|-----------------------|------------------------|----------------------|
                      |                       |                        |      |        |      |
                      |     prestataire       |  clients/usagers       |   1  |    2   |  3   |
                      |                       |                        |      |        |      |
----------------------|-----------------------|------------------------|----------------------|
                      |                       |                        |                      |
totalement fonctionnel| totalement fonctionnel| totalement fonctionnel |totalement fonctionnel|
                      |                       |                        |                      |
----------------------|-----------------------|------------------------|----------------------|


# 4.Notice technique

Il faudra au préalablie cloner le projet sur votre machine.

Pour démarrer le site, vous aurez besoin de 3 terminaux

* Terminal 1 : cd front et npm run start
* Terminal 2 : cd back et npm run start
* Terminal 3 : cd back/data et sqlite3 -init items.sql items.db pour initialiser la base de données à partir du script si elle n'est pas à jour

__Ne pas oublier de faire un npm install dans le dossier front et le dossier back pour installer les packages__

# 5.Rétrospective

Nous avons fait face à quelques difficultés pour élaborer le calendrier en raison de problèmes avec les bibliothèques. En outre, il était difficile de mettre en œuvre toutes les fonctionnalités nécessaires dans un délai si court, y compris la mise en place des tests.

Nous avons réussi à suivre une méthode agile du début à la fin, ce qui a permis à notre équipe de travailler en harmonie et d'avancer efficacement tout au long du projet. Nous avons également su mettre en avant les compétences individuelles de chaque membre de l'équipe pour atteindre nos objectifs communs.

En utilisant la méthode agile, nous avons pris des mesures pour minimiser les risques et grâce à une bonne gestion de Gitlab (en résolvant les conflits localement avant de pusher, etc.), nous avons régulièrement collaboré pour éviter les risques potentiels.

Il y avait des possibilités d'amélioration pour le site, notamment en termes d'esthétique globale, de refactoring du code, d'amélioration de certaines fonctionnalités, telles que les menus déroulants, et enfin, en ajoutant des commentaires au code pour une meilleure lisibilité.

Pour une meilleure organisation, il aurait été préférable de conserver la méthode actuelle tout en améliorant la granularité des tickets Trello en les détaillant davantage. Il aurait également été plus judicieux de créer plusieurs petits tickets plutôt qu'un seul ticket volumineux pour chaque tâche.
