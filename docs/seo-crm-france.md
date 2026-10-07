# Yuno CRM — stratégie SEO France (7 octobre 2026)

Page : `crm.yunoapp.eu/fr` (contenu `src/content/crm.ts`, tête `src/i18n/crm.ts`). Marché : France
seulement. Objectif : des prospects qui peuvent devenir clients, pas du volume.

**Méthode.**
- google.fr réel (hl=fr, gl=fr) ouvert dans un navigateur : environ 44 pages de résultats, jusqu'au
  CAPTCHA de Google. C'est un instantané, peut-être légèrement personnalisé.
- Google Autocomplete interrogé sur environ 140 requêtes de départ.
- Centre d'aide Shotgun lu par son API Zendesk publique.
- Environ 60 recherches sur le marché.
- Lighthouse en production avant les correctifs.
- **Aucun volume de recherche :** les connecteurs Ahrefs et Similarweb ne sont pas autorisés. La
  demande est classée selon la présence dans l'autocomplétion. À valider dans Search Console et
  Keyword Planner.

## 1. Ce que le marché dit vraiment

**Les pros de la nuit ne tapent pas « CRM ».**
- « crm boîte de nuit », « crm discothèque », « crm organisateur » et « crm soirée » n'ont
  **aucune suggestion** d'autocomplétion.
- « fidéliser clients boîte de nuit », « remplir sa soirée » et « marketing boîte de nuit » non plus.

**La demande à intention commerciale passe par la billetterie.**
- « shotgun organisateur » : frais, commission, connexion, espace.
- « shotgun crm » : la suggestion existe.
- Autres : « shotgun newsletter », « shotgun smartboard », « export shotgun », « utm shotgun »,
  « shotgun liste d'attente ».

**Leur vocabulaire.** Remplir, prévente, communauté, fans, habitués, faire revenir, newsletter,
fichier clients. « CRM » n'est qu'un qualificatif.

**Shotgun revendique le mot CRM.**
- Page pro : « de la billetterie au CRM ».
- Contacts dédoublonnés, segments (« Grands dépensiers », « Fans inactifs »), newsletters, push,
  liens de tracking.
- Synchro Brevo et Mailchimp depuis septembre 2025.
- Jeton API pour les « outils externes ».

Conséquences :
- « Shotgun ne vous donne pas vos données » est **faux** : ne jamais le dire.
- Ce qui défend Yuno CRM :
  - les bilans par soirée comparés à la précédente ;
  - les habitués qui décrochent, repérés pour le pro ;
  - le SMS ;
  - l'attribution story / bio jusqu'à la vente ;
  - l'analyse de la guest list ;
  - plusieurs billetteries ou fichiers réunis dans une même base ;
  - l'IA par MCP.

**Concurrence sur la niche « CRM boîte de nuit » : quasi nulle.**
- Environ 70 % de la page de résultats parle de clubs de sport, de Club Med ou de CRM génériques.
- Seuls Nevent (`nevent.ai/fr/industries/venues-clubs`, origine espagnole) et Fourvenues (logiciel
  de caisse et de billetterie) sont dans le sujet.

**Analogues directs** (aucun en français) :
- **Cymbal** (US) : connecteur Shotgun documenté, e-mail, SMS, DM Instagram, à partir de 20 $/mois.
- **Laylo** (25 $/mois).
- **Audience Republic.**
- Les CRM culture français (Arenametrix, Delight Data) coûtent de 10 à 100 fois plus cher et
  visent les institutions.

**Le marché, avec ses dates.**
- 1 600 discothèques en 2020 (SNDLL), « moins de 1 500 » en 2021 (UMIH), estimation 2025 entre
  1 200 et 1 500 (non auditée).
- Dépense moyenne de 30,25 € par visite en discothèque (NielsenIQ, 2023).
- Les collectifs « amènent leur public » aux clubs (Tsugi) : la relation au public est chez eux.
  Ce sont la cible n° 1 du CRM.

## 2. Comment ils cherchent : intentions à viser

| Priorité | Intention | Requêtes (exemples) | Page |
|---|---|---|---|
| P1 | Catégorie, niche vide | crm boîte de nuit, crm discothèque, crm club de nuit, crm organisateur de soirée, crm collectif | `crm.yunoapp.eu/fr` (fait), puis pages par profil |
| P1 | Shotgun + CRM | shotgun crm, crm shotgun, crm pour organisateurs shotgun, complément shotgun | page « Yuno CRM pour Shotgun » |
| P1 | Tâches Shotgun (chaque lecteur est un client cible) | exporter les acheteurs shotgun, shotgun brevo / mailchimp, liens de tracking shotgun, associer instagram et shotgun, jeton API shotgun, newsletter shotgun | guides qui citent la doc Shotgun et vont un cran plus loin |
| P2 | Attribution Instagram | lien tracké story instagram billetterie, quelle story a vendu, mesurer ventes billets instagram | guide + générateur de liens gratuit |
| P2 | Fidélisation | fidéliser clientèle boîte de nuit, programme fidélité boîte de nuit, attirer plus de monde en boîte | article de fond relié à la page |
| P2 | SMS | sms marketing discothèque / boîte de nuit / soirée | « SMS pour soirées : règles 2026 (21 h 30 – 8 h, STOP), coût, exemples » |
| P3 | Informationnel large | marketing boîte de nuit, remplir sa boîte de nuit | article pilier (les pages qui classent datent de 2003 à 2013) |

**À éviter :**
- « crm événementiel » : agences et séminaires, résultats saturés.
- « logiciel gestion boîte de nuit » : intention caisse enregistreuse.
- « emailing / fichier client boîte de nuit » : ce sont des vendeurs de fichiers de clubs.
- « shotgun pro » (siège vélo), « shotgun api » (Autodesk ShotGrid), « crm club » (sport).

## 3. Shotgun dans la stratégie

- Shotgun est le **support de la demande**, pas l'ennemi : on « s'accroche » à ses requêtes de
  tâche (export, Brevo, liens, API) avec des pages honnêtes et complémentaires.
- Jamais de dénigrement.
- Ne jamais miser sur le seul mot de marque : il est pollué (fusil, siège vélo, ShotGrid).
- La page « Alternative à Shotgun » de la Suite (`landing.yunoapp.eu/fr/alternative-shotgun`) dit
  « quittez Shotgun » ; le CRM dit « gardez Shotgun ». Les deux coexistent seulement si chacune
  renvoie vers l'autre. À ajouter : un bloc « Vous gardez Shotgun ? » vers le CRM sur la page
  alternative.

## 4. Fait le 7 octobre (branche `claude/crm-seo-fr`)

**Contenu FR**
- `<title>` : « Yuno CRM : le CRM des boîtes de nuit et organisateurs de soirées ».
- Les partages gardent le titre éditorial (`meta.ogTitle`).
- Meta description (158 caractères) : « Gardez Shotgun, ajoutez un CRM : … ».
- Le sous-titre du héros commence par « Le CRM des boîtes de nuit et des organisateurs de
  soirées. » La page contenait **zéro** fois « boîte de nuit » ou « discothèque ».
- Signature du pied de page réécrite.

**FAQ FR : 5 questions de vraie intention**
- garder Shotgun ;
- ce que Shotgun donne déjà, et ce que Yuno ajoute ;
- Brevo / Mailchimp ;
- boîte de nuit ou collectif ;
- quelle story a vendu.

**Technique**
- **FAQ :** seule la réponse ouverte était dans le HTML. Les autres n'existaient que dans le
  JSON-LD, ce qui va contre les consignes de Google, et les IA ne les voyaient pas. Toutes sont
  maintenant rendues, repliées en CSS (`grid-rows`).
- **Haut de page :** nav, accroche, titre, sous-titre, bouton et ligne de confiance étaient servis
  en `opacity:0` jusqu'à l'hydratation. Mesure en production mobile : **LCP 9,5 s, dont 92 % de
  « render delay »**, FCP 6,5 s. Mêmes animations, jouées en CSS dès le premier affichage
  (`.yc-rise`, `.yc-pop` dans `crm.css`).
- Feuille Inter + Newsreader (bloquante, inutile ici) retirée des routes CRM.
- Images sous la ligne de flottaison en `loading="lazy"` : React les préchargeait toutes, dont
  111 Ko de téléphone.
- `http://` → `https://` en 301 sur `*.yunoapp.eu`. La zone servait les deux en 200.
- Slash final en 301 au lieu du 307 du routeur.
- Écrans de l'app relayés sur crm.yunoapp.eu (`/login`, `/crm`, `/admin`…) servis en
  `X-Robots-Tag: noindex`. Ils portaient la tête publique de la billetterie (« Event Tickets & VIP
  Tables »).
- **JSON-LD :** `applicationSubCategory`, `featureList`, `audience`, `url`, `image`, et
  `mentions` Shotgun sur la WebPage.
- **Maillage :** la landing (43 pages, pied de page commun) ne faisait **aucun lien** vers
  crm.yunoapp.eu. Lien « Yuno CRM, branché à Shotgun » ajouté en EN, FR et ES.

## 5. Reste à faire (par ordre d'impact)

1. **Search Console.**
   - Propriété `crm.yunoapp.eu` ou domaine `yunoapp.eu`.
   - Sitemap = `https://crm.yunoapp.eu/sitemap-crm.xml`, **pas** `/sitemap.xml`. Celui-ci est le
     sitemap de la landing, servi en statique sur les deux hôtes.
   - Inspection d'URL sur `/fr` puis « Demander l'indexation ». Au 7 octobre, Google n'avait
     indexé que l'EN et l'ES.
2. **Cloudflare** : activer « Always Use HTTPS » et HSTS (le 301 du Worker ne couvre que le HTML).
3. **Vérité des promesses** (corrigé le 7 octobre : entonnoir = parcours e-mail, comparatif,
   automatisations vitrines = recettes en ligne). Reste : la page dit « 10 000 Yunits offerts chaque
   mois » et « 5 000 pendant l'essai », l'app dit 2 000 pendant l'essai et 10 000 une fois à
   l'abonnement. À aligner avec la refonte des prix en cours.
   Détail d'origine :
   - Le comparatif (« Les visites avant l'achat, et d'où elles viennent », « Le funnel de
     conversion ») et l'entonnoir « 11 655 visites de la page du club » montrent ce que la Console
     affiche « Bientôt » (Shotgun ne rend pas les visites).
   - La colonne « votre billetterie » (« le même e-mail pour tout le monde ») est fausse face à
     Shotgun, qui a des segments.
   - Les « 15 min » de synchro sont à réaligner sur le vrai rythme.
   - Une IA ou un concurrent qui relève une promesse fausse cesse de citer la source. À trancher
     par Paul.
4. **H1.** Il ne contient aucun terme de catégorie. On le garde pour la marque, mais une ligne
   d'accroche visible dans le H1 (ex. « CRM pour boîtes de nuit et organisateurs ») reste
   l'amélioration on-page la plus forte non faite. C'est un choix de design.
5. Page CRM en EN et ES : hors périmètre France, titres inchangés.

## 6. Pages de contenu (en ligne depuis le 7 octobre)

Neuf pages françaises sur crm.yunoapp.eu, une intention de recherche chacune :

| Page | Intention visée |
|---|---|
| `/fr/crm-boite-de-nuit` | crm boîte de nuit, crm discothèque, crm club de nuit |
| `/fr/crm-organisateur-soiree` | crm organisateur de soirée, collectifs |
| `/fr/shotgun-crm` | shotgun crm, crm shotgun, jeton API Shotgun |
| `/fr/yuno-crm-ou-brevo` | shotgun brevo, newsletter soirée (comparatif honnête : Brevo reste moins cher pour l'e-mail seul) |
| `/fr/guides` | page qui regroupe les guides |
| `/fr/guides/lien-story-instagram-shotgun` | lien story Instagram billetterie, associer Instagram et Shotgun (+ générateur de liens gratuit) |
| `/fr/guides/exporter-acheteurs-shotgun` | exporter les participants Shotgun, export acheteurs, Shotgun Brevo |
| `/fr/guides/sms-soiree` | sms boîte de nuit, sms marketing discothèque (règles AF2M 2026, Arcep, CNIL) |
| `/fr/guides/fideliser-public-boite-de-nuit` | fidéliser clientèle boîte de nuit, remplir sa boîte de nuit |

**Architecture**
- Chemins dans `src/i18n/crm-pages.ts`, contenu dans `src/content/crm-pages/*`, gabarit
  `src/pages/crm-page.tsx` (design de la page CRM), tête et JSON-LD dans `src/i18n/crm-page-seo.ts`.
- JSON-LD : WebPage, Article pour un guide, CollectionPage pour le hub, plus BreadcrumbList,
  FAQPage et une référence au SoftwareApplication.
- Une page ajoutée = un chemin, un fichier de contenu, une ligne au registre et une route. Le
  sitemap CRM, `llms.txt`, `llms-full.txt` et l'hôte la prennent d'eux-mêmes.
- Reliées depuis la colonne « Ressources » du pied de page CRM, le pied de page de la landing et
  la page « Alternative à Shotgun ».

**Règle de contenu**
- Tout fait sur Shotgun, Brevo ou une loi a sa source datée.
- « Non vu dans le centre d'aide » plutôt que « n'existe pas ».
- Pas de statistique de marché inventée.
- Prix des envois en Yunits seulement (les Yunits offerts sont en cours de révision).

**À venir** (si les données GSC le justifient) :
- « Yuno CRM vs Cymbal » ;
- une page « CRM pour association étudiante » (« crm association » a de la demande) ;
- l'article de données anonymisées.

## 7. Hors site

- Fiche Capterra / GetApp / Appvizer catégorie CRM événementiel.
- Fiche AlternativeTo en alternative à Cymbal, Laylo, Nevent.
- Demander à Shotgun d'être listé comme intégration (liste partenaires, centre d'aide). C'est le
  lien le plus qualifié possible.
- Cymbal le fait déjà côté américain.
- LinkedIn, Wikidata et `SAME_AS`.
- **Collision de marque.** « yuno crm » est réécrit par Google en « youno crm » (youno.fr, agence
  CRM à Paris). Yuno HR existe aussi (Lyon). Toujours écrire « Yuno CRM pour Shotgun » ou « Yuno
  CRM, le CRM des soirées ». Vérifier le risque de marque avec Youno.

## 8. Search Console : quoi lire

Chaque semaine, filtre page `crm.yunoapp.eu/fr` :
- requêtes avec impressions (s'attendre à de la longue traîne Shotgun) ;
- CTR des requêtes « crm … » ;
- pages « Détectée / Explorée, non indexée » ;
- Core Web Vitals mobile (le LCP doit passer sous 2,5 s) ;
- la page canonique choisie par Google (pas l'EN pour une requête FR).

Positions à relever dans `docs/seo-rank-log.md` :
- crm boîte de nuit ;
- crm discothèque ;
- crm organisateur de soirée ;
- shotgun crm ;
- crm shotgun ;
- yuno crm ;
- yuno crm shotgun ;
- lien story instagram shotgun ;
- sms boîte de nuit.
