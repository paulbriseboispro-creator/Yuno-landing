# Audit de la landing Yuno + plan de vente

*Compte rendu pour Paul — le DA a raison, mais à moitié. Voici quoi changer, dans l'ordre.*

## Le verdict

Le DA a raison sur le symptôme, pas sur la cause. Le problème n'est pas que tu montres tout : c'est que tu montres **tout, à tout le monde, sans jamais foncer sur LA douleur** qui a amené ce gérant-là sur la page. La porte d'entrée « / » demande au visiteur de se ranger dans une case (club ou orga) *avant* de lui avoir montré une seule preuve ou un seul chiffre. Puis chaque page de rôle déroule **14 sections identiques**, quelle que soit la douleur. Tu convaincs tard, et tu fais agir encore plus tard. Bonne nouvelle : le meilleur modèle existe déjà chez toi, c'est ta page **/bde**. Le travail, c'est surtout d'y copier sa discipline.

## Le vrai problème

Tu captes déjà le besoin du client (« qu'est-ce que vous voulez régler en premier ? »)… mais tout en bas du tunnel, dans le formulaire de contact. Ce signal sert ton appel de vente, jamais la page. Résultat : la page parle de Yuno (toutes ses fonctions), pas du problème du visiteur. Or un gérant pressé ne lit pas un catalogue : il cherche **5 secondes la phrase qui dit « ça, c'est mon problème »**, sinon il part.

## Le plan de vente : une douleur, une preuve, un bouton

Pour chaque rôle, on mène avec **une seule douleur** (dans les mots du métier), suivie d'**une seule preuve**, et d'**un seul bouton**.

| Rôle | La douleur (le titre) | La preuve unique | Le bouton |
|------|----------------------|------------------|-----------|
| **Club** | « Tu gères ta soirée sur un cahier des tables, un WhatsApp et un tiroir-caisse — et à la fermeture, personne ne sait vraiment combien est rentré. » | Tableau comparatif réduit à ~5 lignes (résa, bar, accès staff, vue live de la salle, mise en route : *des semaines vs un après-midi*) + « plus de comptage de caisse en fin de soirée. » | **« Parlez à Paul, le fondateur — 20 min sur VOTRE club »** |
| **Organisateur** | « La billetterie classique te prend 8 à 18 % par event — et tu partages encore la caisse avec la salle à la main, en fin de mois. » | « 200 billets à 20 € : une plateforme classique prend 320 €, Yuno 160 € (payés par l'acheteur), et la répartition avec la salle se règle seule à **J+2** » + le lien de l'event démo live. | **« Réserve un call de 15 min — on regarde TON event »** (pas « Crée ton premier événement » : le self-service n'existe pas encore) |

Remonte **haut** les deux différenciateurs que personne d'autre n'a : pour le club, le **contrôle du cash en direct** ; pour l'orga, la **répartition automatique à J+2** (aujourd'hui enterrée en position 8). Et **supprime** le mur d'écrans animé sur /organisateurs : il affiche aujourd'hui des tableaux de bord de **club** en remplacement — tu montres le produit du mauvais client à ton prospect.

## Le questionnaire : faut-il en mettre un ?

**Oui — mais surtout pas une barrière avant le contenu.** Un quiz qui bloque l'accès fabrique exactement la friction que le DA redoute, pour résoudre un tri que ton **clic de rôle règle déjà**. La qualification doit vivre à deux endroits, tous deux **après** la valeur :

1. **Le clic de rôle sur « / »** : zéro question, le clic *est* la réponse. C'est ça, « ouvrir les portes intelligemment ».
2. **Le formulaire /contact**, une fois que le visiteur a décidé de réserver.

Sois honnête sur un point que j'ai vérifié dans ton code : aujourd'hui « qu'est-ce que vous voulez régler ? » est un **champ de texte libre**. Un gérant pressé n'écrit rien, ou un mot vague — et tu arrives à l'appel à l'aveugle. Le vrai gain, c'est de le transformer en **menu déroulant de 5 choix**. C'est du travail neuf (pas un simple branchement), mais c'est le changement qui exécute le plus directement l'ordre du DA : ouvrir l'appel en fonçant sur LA douleur.

Les questions, dans le formulaire (pas avant) :

- **Tu gères… ?** Club / Organisateur / Promoteur / Autre — *prérempli selon la page d'où tu viens*
- **Ton principal casse-tête ?** Caisse & cash / Frais de billetterie / Être payé & répartir avec la salle / Trop d'outils / Autre
- **Combien de soirées par mois ?** 1-2 / 3-8 / 8+ *(optionnel)*
- **Ton outil actuel ?** HelloAsso / Shotgun / Weezevent / DICE / papier-WhatsApp / autre *(optionnel)*

Attention : la friction n'est **pas** ce menu. C'est que ton formulaire affiche aujourd'hui **6 champs** (segment, nom, e-mail, société, téléphone, message) et que *société* et *téléphone* ne sont **pas marqués « optionnel »**. Un gérant compte 6 cases et lit « interrogatoire de commercial ». Réduis à **nom + e-mail + segment + le menu casse-tête**, marque le reste optionnel, ou enlève le téléphone d'ici le lancement. **Couper un champ vaut mieux que n'importe quelle reformulation.**

## Ce qu'on copie de ceux qui vendent bien

- **Ta propre page /bde** : un acheteur, une douleur, un différenciateur, une preuve, un bouton, contre le vrai concurrent (HelloAsso). Recopie ce séquençage sur /clubs et /organisateurs.
- **Intercom** : la page d'accueil = un aiguillage en un clic. Le clic qualifie, pas de quiz.
- **Copyhackers (Jobs-to-be-Done)** : le titre s'ouvre sur la douleur du client, dans SES mots — tirés de vrais appels (ton appel avec le DA est de l'or).
- **Unbounce** : un seul bouton dominant par page, pas de boutons concurrents (les pages à un seul bouton convertissent nettement mieux).
- **ScoreApp / Interact** : qualifier *après* la valeur, jamais un quiz qui bloque. C'est la réponse à ta tension.
- **« Do Things That Don't Scale » (Y Combinator)** : recrute tes 15 premières salles **à la main**, et traite chaque appel comme une recherche qui réécrit le titre suivant.

## Par quoi commencer (lundi matin)

1. **Réécris les 2 cartes de « / »** pour mener avec UNE douleur + UN chiffre (au-dessus des puces existantes — elles ne sont pas vides, ne sur-corrige pas). *Copie seule, ~30 min.*
2. **Le formulaire /contact — c'est LE levier.** Réduis à 4 champs, ajoute le menu « casse-tête » à 5 options, et préremplis le segment selon la page d'origine (aujourd'hui il est figé sur « club »). *Contenu EN + FR, ~1-2 h.*
3. **Reformule le bouton partout** : de « Réserver une démo » vers **« Parlez à Paul, le fondateur — 20 min »**. Ça joue ta vraie force (tu n'es pas commercial, n'en joue pas le rôle) et ça répond au « ne me fais pas perdre mon temps ». *Plusieurs fichiers, EN + FR, ~1 h.*
4. **Supprime** (pas seulement déplace) le mur d'écrans animé de /organisateurs : il montre de faux écrans de club.
5. **Réordonne** chaque page de rôle : douleur → preuve → différenciateur → offre fondateur → FAQ. Pousse la grille « premium » et Yuno Collab dans la FAQ. *Réorganisation, ~2 h.*
6. **Construis ta liste de 50 à 80 clubs & orga français** et envoie chaque message avec un **lien direct vers /clubs ou /organisateurs** (en sautant la porte). **C'est ça, ta vraie croissance d'avant-lancement** : la landing ne fait que soutenir ton démarchage.

## Ce qui est déjà bon (n'y touche pas)

- La **séparation par rôle** (club / orga) est juste — on la garde, on la rend plus tranchante.
- Les **titres de hero** sont déjà bons : « Gérez la salle, pas le tableur », « La billetterie sans la commission ».
- Tes **boutons vers /contact existent déjà partout** (hero, header collant, bas de page) — *ne perds pas de temps à les rajouter*. Le seul ajout utile : **un bouton au milieu de page, juste après la preuve.**
- Détail de crédibilité, vite réglé : l'e-mail de contact affiché est une adresse Gmail personnelle. Mets une adresse **@yunoapp.eu** — ça rassure un pro.
