Application listant les 10 artistes en top tendances en france, ainsi que leurs discographies.
Les informations sur les artistes sont récupérées depuis [Musixmatch](https://www.musixmatch.com/fr) par le biais d'une api.

Le login fait un appel à une fonction [lambda](https://github.com/AdrienCasta/matierenoire-authentification) authentifiant l'utilisateur.

Les statuts et les éventuelles données et erreurs retournées par les requêtes sont prise en charge dans un store `redux`. Les effets de bord causés par l'asynchronisme des données est géré via des `sagas` ([Redux Saga](https://github.com/redux-saga/redux-saga)).

TODO
* Afficher les messages d'erreurs
* Loader sur l'écran d'artistes et des discographies
* Gérer la navigation dans les sagas
