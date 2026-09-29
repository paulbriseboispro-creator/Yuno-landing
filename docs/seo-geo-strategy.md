# Yuno — Stratégie SEO & GEO (septembre 2026, mise à jour du 29/09)

> **Mise à jour du 29/09/2026** : Search Console est en place. Les §9 à §13 en bas décrivent la
> stratégie « petit contre gros » et ce qui a été mis en ligne ce jour-là (17 pages en plus).

Objectif : que les clubs, organisateurs et promoteurs qui cherchent une billetterie ou un outil
pour gérer leur soirée tombent sur Yuno, sur Google comme dans les réponses de ChatGPT,
Perplexity, Gemini ou Google AI Overviews (GEO = Generative Engine Optimization).

> **Limites de la recherche.** Le proxy de l'environnement bloquait Google Autocomplete et les
> sites concurrents. Les mots-clés viennent donc d'environ 90 recherches (titres et extraits des
> pages classées). Les volumes et difficultés sont des **estimations relatives**, pas des chiffres
> d'outil. À valider dans Google Keyword Planner, Semrush ou Ahrefs (FR, ES, GB/US) avant
> d'investir.

---

## 1. Ce qui a été fait sur la landing (`/`, `/fr`, `/es`)

**Correctifs techniques qui bloquaient le référencement**
- **FAQ.** Seule la première réponse était dans le HTML ; les autres n'apparaissaient qu'au clic.
  Google ne lisait donc qu'une réponse sur sept, et les crawlers IA (qui n'exécutent pas le
  JavaScript) aussi. Toutes les réponses sont maintenant dans le HTML serveur. Accordéon
  accessible (h3 > button, aria-controls).
- **Solutions.** Seul l'onglet « Clubs » était rendu. Le texte Organisateurs et Promoteurs était
  invisible pour les crawlers. Les trois panneaux sont maintenant dans le HTML.
- **Comparatif concurrents.** Passé en vrai `<table>` (th/scope/caption). Les moteurs et les IA
  extraient très bien les tableaux. L'affichage en cartes sur mobile est conservé.
- **Images OG.** L'ancienne était en français seulement, dans l'ancienne charte, avec un texte
  fantôme (« ipeplatye »). Il y a maintenant trois images 1200×630 (EN/FR/ES) avec alt,
  dimensions et `twitter:image`.
- **Images.** Les captures du back-office ont un `alt` descriptif.

**Données structurées (JSON-LD `@graph`, une par langue)**
- **`Organization`** : logo, fondateur, zone FR/ES, langues, contact, `sameAs`,
  `disambiguatingDescription`. Voir §5 : « Yuno » est aussi une fintech de paiement.
- **`WebSite`** et **`WebPage`**, avec `dateModified`.
- **`SoftwareApplication`** : `BusinessApplication`, Web et iOS, `featureList`, `Offer` à 0 € et
  détail des frais.
- **`FAQPage`** : 12 questions, générée depuis la FAQ visible, donc toujours identique à la page.

**Contenu on-page (mots-clés intégrés sans casser le ton)**

| | EN | FR | ES |
|---|---|---|---|
| `<title>` | Nightclub ticketing, VIP tables & guest list software \| Yuno | Billetterie soirée, tables VIP & logiciel boîte de nuit \| Yuno | Software para discotecas: entradas, reservados y RRPP \| Yuno |
| Début du H1 (ligne visible) | Nightclub ticketing & management software for clubs, organizers and promoters | Billetterie & logiciel de gestion pour boîtes de nuit, organisateurs et promoteurs | Software para discotecas, organizadores y RRPP: venta de entradas sin comisiones |

- **H2.** Le produit, les solutions et le comparatif portent maintenant les mots-clés. Le H2 du
  comparatif est « Yuno face à Shotgun, Weezevent, Eventbrite, Xceed et DICE », pour la
  recherche « alternative à … ».
- **H3 des piliers** : réservation de tables VIP, commande au bar par QR code, contrôle d'accès,
  répartition des recettes.
- **Espagnol** : vocabulaire local, soit **RRPP** (et non « promotores »), **reservados** et
  **listas**.
- **Cinq nouvelles questions FAQ** pensées pour les réponses IA :
  - Qu'est-ce que Yuno ?
  - Yuno est-il une alternative à Shotgun, Weezevent… ?
  - Tables VIP avec acompte
  - Suivi et rémunération des promoteurs
  - Où Yuno est-il disponible ?
- **Correction factuelle.** La phrase « aucune ne vend vos tables VIP… » était fausse : Xceed
  vend des tables et Shotgun a un portail promoteurs. Elle devient « aucune ne réunit billets,
  tables, bar, commissions et répartition dans le même compte ». Une IA qui détecte une
  affirmation fausse cesse de citer la source.

**Fichiers pour les crawlers**
- **`robots.txt`** : autorise explicitement GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot,
  Claude-SearchBot, PerplexityBot, Google-Extended, Applebot-Extended, Bingbot, etc.
- **`/llms.txt`** (résumé) et **`/llms-full.txt`** (toute la landing en markdown, EN/FR/ES) :
  générés depuis `src/content/landing.ts`, donc jamais désynchronisés. L'ancien `llms.txt`
  décrivait des plans payants qui n'existent plus.
- **`sitemap.xml`** : `<lastmod>` ajouté. La date se met à jour via `LANDING_UPDATED` dans
  `src/i18n/landing-seo.ts`.

---

## 2. Marché

| | France | Espagne |
|---|---|---|
| Discothèques | ~1 500–1 600 (consensus pro) ; IRMA/CNM ~2 000 ; 4 000–5 000 dans les années 80 | 1 904 actives (mai 2025, source faible) |
| Chiffre d'affaires | ~1 Md€/an pour les discothèques (estimation) | Ocio nocturno ~20 Md€/an (España de Noche, périmètre large) |
| Repère | Billetterie de concerts : 1,6 Md€ HT en 2024, +13 % (CNM) | Madrid : 18 790 emplois dans la nuit, ~42 salariés par discothèque |

**Tendances qui servent Yuno**
1. **Les clubs doivent gagner plus par client**, avec moins de clubs et une Gen Z qui boit
   moins. Tables, précommandes et fidélisation deviennent centrales, et ce sont les piliers de
   Yuno.
2. **Propriété de la donnée et relation directe avec le public.** La presse pro française
   parle d'un passage « de locataire de marketplace à propriétaire de sa donnée ». C'est
   exactement le slogan de Yuno.
3. **Consolidation.** Fever a racheté DICE (2025). Fourvenues a levé 6,5 M€ et part aux
   États-Unis.
4. **Course à la gratuité pour l'organisateur** (Billettera, Yurplan, OnParticipe). « 0 € »
   ne suffit plus à se différencier seul.

---

## 3. Concurrence

| Acteur | Pays | Modèle | Prix public | Point fort SEO/GEO | Faille exploitable |
|---|---|---|---|---|---|
| **Fourvenues** | ES → US | Logiciel complet pour la nuit : billets, listes, carte VIP, RRPP, caisse. ~600 clubs | Sur devis | N°1 sur « software para discotecas », pages VIP et RRPP | Prix opaques, pas de contrat club × organisateur, marketplace grand public à côté |
| **Shotgun** | FR | Marketplace, scène électro | Frais acheteur 2,75 % (plafond 15 €), commission organisateur négociée | Marque forte, page `/solution/collectif` | Garde le public, prix non publics, pas de tables ni de bar |
| **Weezevent** | FR | Billetterie généraliste + cashless | 2,5 % min 0,99 € TTC, virements tous les 15 jours | Domaine énorme, page `/clubs-soirees` | Pas de tables, de promoteurs ni de répartition ; garde les fonds |
| **Xceed** | ES | Marketplace + Pro (billets, tables, CRM) | 3 % + 15 % marketplace + abonnement | Page Wikipedia, blog | 15 % sur les ventes marketplace |
| **DICE (Fever)** | UK/ES | Marketplace de fans | Sur devis (~10–15 % selon des tiers) | Audience de Fever | Garde la donnée, pas de tables ni de bar |
| **Eventbrite** | US | Marketplace généraliste | 3,5 % + 0,49 € à 5,5 % + 0,99 € | Autorité de domaine | Pas spécialisé nuit, recommande d'autres événements |
| **Billettera / OnParticipe** | FR | Billetterie gratuite pour l'organisateur | 0 € organisateur | Pages verticales programmatiques | Billets seulement |
| **ResaFlow** | FR | Tables VIP | 49,99 €/soir ou 350–500 €/mois | « Seul logiciel français » | Tables seulement, cher |
| **CoverManager** | ES | Réservations resto étendues aux discothèques | Sur devis | Page `/sectores/discotecas` | Pensé resto d'abord |
| **TablelistPro / SevenRooms / UrVenue / Mr. Black** | US | Tables, CRM | Sur devis, ou ~499 $/mois | Dominent « nightclub software » en anglais | US, anglais, pas de billetterie à 0 % |

---

## 4. Mots-clés — quoi viser, et où

Règle : **un groupe de mots-clés = une page.** La landing vise les requêtes « tête de
catégorie ». Les autres doivent avoir leur propre page (roadmap §7).

### Français (priorité 1 = marché principal)

| Groupe | Mots-clés (exemples) | Intention | Vol. estimé | Difficulté | Prio | Page |
|---|---|---|---|---|---|---|
| Billetterie soirée / club | billetterie soirée, billetterie en ligne soirée, billetterie club, vendre des billets en ligne | Transac. | Moyen–élevé | Élevée sur la tête, moyenne sur « soirée » | P1 | **Landing** ✅ |
| Logiciel boîte de nuit | logiciel boîte de nuit, logiciel gestion discothèque, application boîte de nuit | Commercial | Moyen | Moyenne (SERP éclatée, des forums classent) | P1 | **Landing** ✅ + /clubs |
| Tables VIP / carré | réservation table VIP discothèque, carré VIP réservation, bottle service, acompte table | Commercial | Moyen (beaucoup de B2C) | Faible–moyenne | P1 | Page dédiée à créer |
| Sans commission / frais | billetterie sans commission, billetterie gratuite, frais Shotgun, commission Weezevent | Commercial | Moyen | Moyenne | P1 | Landing ✅ + page tarifs |
| Alternatives | alternative Shotgun, alternative Weezevent, comparatif billetterie 2026 | Commercial | Moyen | Shotgun : **faible** ; Weezevent : élevée | P1 | Pages « Yuno vs » à créer |
| Promoteurs | commission promoteur soirée, lien de suivi promoteur, rémunération promoteur | Mixte | Faible–moyen | **Faible** (fermes de contenu) | P1 | Page + article |
| Guest list | guest list soirée, liste d'invités QR code, application guest list | Commercial | Faible–moyen | Faible | P2 | Page |
| Bar QR | commande au bar QR code, commander boisson sans attendre | Commercial | Faible–moyen | Faible | P2 | Page |
| Contrôle d'accès | application scanner billets, contrôle d'accès soirée | Commercial | Moyen | Moyenne | P2 | Page |
| Répartition club × orga | contrat discothèque organisateur, partage recettes soirée | Info | Faible | **Quasi nulle** | P2 | Article + page |
| CRM / emailing | CRM discothèque, fidéliser clients boîte de nuit | Mixte | Faible | Faible | P3 | Article |
| Guides | organiser une soirée en boîte, remplir sa boîte de nuit, devenir organisateur | Info | Moyen–élevé | Moyenne | P3 | Blog |

### Espagnol

| Groupe | Mots-clés | Prio | Page |
|---|---|---|---|
| Software discotecas | software para discotecas, software de gestión de discotecas, plataforma para discotecas | P1 | **/es** ✅ |
| Sin comisiones | venta de entradas sin comisiones, ticketera sin comisiones, cuánto cobra una ticketera | P1 | /es ✅ + precios |
| RRPP | app para RRPP, gestión de RRPP discoteca, comisiones RRPP | P1 | Page RRPP |
| Reservados | software reservados discoteca, mapa interactivo de reservados, consumo mínimo | P1 | Page reservados |
| Alternatives | **alternativa a Fourvenues** (SERP vide !), Fourvenues precio, alternativa Xceed | P1 | Pages « vs » |
| Listas | listas discoteca, lista de invitados discoteca | P2 | Page |
| Local | software discotecas Madrid | P2 | **/es/madrid** (Amoris + 22 clubs) |

### Anglais

| Groupe | Mots-clés | Prio | Page |
|---|---|---|---|
| Nightclub software | nightclub management software, nightclub ticketing software | P1 | **/** ✅ |
| VIP / bottle | VIP table booking software, bottle service software, table deposits, minimum spend | P1 | Page |
| Promoters | promoter tracking software, club promoter app, promoter commission tracking | P1 | Page |
| Guest list | nightclub guest list app | P1 | Page |
| Alternatives | DICE alternative, Shotgun alternative, Fatsoma alternative (UK), Fourvenues alternative | P1 | Pages « vs » |
| Fees | free ticketing platform, ticketing no fees | P2 (très concurrentiel) | Tarifs |

**À éviter comme cible principale.** « Nightclub POS » et « TPV discoteca » relèvent de
l'intention caisse enregistreuse. « Guest list », « bottle service » et « reservados
Madrid » seuls attirent des fêtards, pas des pros : il faut toujours y ajouter un
modificateur B2B (logiciel, software, app pour…).

---

## 5. GEO — être cité par les IA

**Comment les IA choisissent leurs sources (études 2025-26)**
- ChatGPT s'appuie beaucoup sur les sources encyclopédiques (Wikipedia).
- Perplexity s'appuie sur **Reddit**.
- Google AI Overviews s'appuie sur YouTube.
- En SaaS B2B, les sources les plus citées sont **G2, Capterra**, Reddit et les listicles
  « meilleurs logiciels ».
- Les réponses IA reprennent des **phrases factuelles courtes**, des **tableaux** et des
  **chiffres sourcés**. La landing en a maintenant : FAQ en réponse directe, tableau
  comparatif daté, « 5 832 € nets sur 300 billets à 20 € », statistiques d'envoi de l'emailing.

**⚠️ Problème d'entité**
- Une recherche sur « Yuno » renvoie surtout **y.uno**, une fintech de paiement très financée
  (série B de 45 M$ en 2026). Comme Yuno parle aussi de paiements et de Stripe, les IA risquent
  de **fusionner les deux marques**.
- Déjà en place : `disambiguatingDescription`, `alternateName` et la mention « not the payments
  company y.uno » dans `llms.txt`.
- À faire :
  1. Toujours dire « Yuno, la plateforme de la nuit » / « Yuno nightlife platform ».
  2. Créer un élément **Wikidata** (« nightlife software company, Paris/Madrid »).
  3. Ouvrir LinkedIn et Crunchbase, puis les ajouter à `SAME_AS` dans `src/i18n/landing-seo.ts`.
  4. Ajouter aussi le lien App Store à `SAME_AS`.

**Où apparaître (par ordre de priorité)**
1. **Capterra** (une fiche alimente aussi GetApp et Software Advice) et **G2**. Faire laisser
   10 avis ou plus par Amoris, les clubs de Madrid et l'organisateur parisien.
2. **Comparateurs FR** : lafabriquedunet.fr (« alternatives à Weezevent »), quelle-billetterie.fr,
   comparatif-billetterie.com, guide-billetterie.com, Appvizer.
3. **ES/EN** : Nevent.ai (« Fourvenues : opiniones y alternativas »), AlternativeTo (en
   alternative à Shotgun, Fourvenues, Xceed, DICE), les listicles « best nightclub software »
   (Guideflow, zipdo, gitnux…) — demander à y être ajouté.
4. **Stripe Partner Directory** : preuve crédible de « Stripe Connect, on ne garde jamais les
   fonds ».
5. **Crunchbase, Dealroom, EU-Startups, La French Tech, Maddyness, Product Hunt.**
6. **Syndicats pro** : UMIH Nuit, España de Noche, **Noche Madrid** (pages partenaires).
7. **Reddit** (r/nightlife, r/Promoters, r/madrid) et une **démo YouTube** de 2–3 min.
8. **Google Business Profile** Paris et Madrid, **Trustpilot**.
9. **App Store** : sous-titre et mots-clés de l'app alignés sur « billetterie soirée / tables VIP ».

**Donnée propriétaire à publier** (les IA citent les chiffres originaux)
- « Baromètre de la nuit Paris / Madrid » : panier moyen table, taux de no-show avec vs sans
  acompte, part des ventes par promoteur, heure d'achat. Anonymisé, publié chaque trimestre.

---

## 6. Positionnement — ce qu'on martèle, ce qu'on évite

**À marteler** (aucun contre-exemple trouvé)
1. **La seule plateforme où le club et l'organisateur signent leur répartition dans l'outil**
   et valident le décompte ensemble. C'est l'argument le plus distinctif.
2. **Billets + tables VIP + bar + commissions promoteurs dans un seul compte**, à 0 €
   d'abonnement, 0 % de commission, **avec des prix publics**. Fourvenues et TablelistPro sont
   sur devis.
3. **Votre argent sur votre compte** (Stripe Connect), sans attendre, contre 15 jours chez
   Weezevent et le 1er/16 du mois chez Eventbrite.
4. **Vos clients restent les vôtres** : CRM, 9 automatisations, 15 000 emails/mois, avec les
   chiffres réels de l'envoi parisien.
5. **Pensé pour Paris et Madrid, en FR/EN/ES.**

**À éviter**
- « La moins chère » : au-delà de ~25 € le billet, les 4 % coûtent plus que les 0,99 € de
  Weezevent.
- « La seule gratuite » : Billettera et OnParticipe le sont aussi.
- « Personne d'autre ne fait les tables » : Xceed, Fourvenues et ResaFlow le font.

---

## 7. Roadmap

### Cette semaine (moins de 2 h chacun)
- [ ] **Google Search Console + Bing Webmaster Tools** : soumettre `sitemap.xml`, demander
  l'indexation de `/`, `/fr` et `/es`. Bing alimente ChatGPT Search et Copilot.
- [ ] **Cloudflare** : vérifier que « Block AI bots » / « AI Scrapers and Crawlers » est
  **désactivé** et que le « Managed robots.txt » ne réécrit pas le nôtre. Sinon toute la partie
  GEO est annulée.
- [ ] **Corriger `/pricing`**. Il affiche encore Essential 49 €/Pro 99 €/Elite 199 €, ce qui
  contredit la landing, et une IA peut citer ce faux prix. Une tâche a été suggérée dans la
  session.
- [ ] **Valider les données structurées** : Rich Results Test et validator.schema.org sur les
  trois URL.
- [ ] Créer Wikidata, LinkedIn et Crunchbase, puis les ajouter à `SAME_AS`.
- [ ] **Vérifier que le dépôt GitHub `paulbriseboispro-creator/yuno` doit bien être public** :
  il est indexé.

### 30 jours — pages qui captent le trafic que la landing ne peut pas prendre
- [ ] **Pages comparatives** (tableau de frais daté et sourcé) :
  - FR : « Yuno vs Shotgun », « Alternative à Weezevent »
  - ES : « Alternativa a Fourvenues » (SERP vide), « Alternativa a Xceed »
  - EN : « DICE alternative »
- [ ] **Pages fonctionnalités** :
  - FR : tables VIP (« réservation table VIP discothèque / carré VIP avec acompte »),
    promoteurs (« commission promoteur »)
  - ES : reservados, RRPP
- [ ] **/es/madrid** : Amoris + 22 clubs, cible « software discotecas Madrid ».
- [ ] **Calculateur de frais** en page autonome (« combien coûte une billetterie »).
- [ ] Fiches Capterra, G2, Appvizer et AlternativeTo, et récolte d'avis.

### 90 jours
- [ ] **Blog** (un article = un groupe de mots-clés informationnel) :
  - « Contrat club / organisateur : comment partager les recettes » (concurrence nulle)
  - « Comment rémunérer ses promoteurs »
  - « Cómo se pagan las comisiones de los RRPP »
  - « Carré VIP : acompte et no-shows »
  - « Comment remplir sa boîte de nuit »
- [ ] Premier « Baromètre de la nuit » (donnée propriétaire) et diffusion presse (Maddyness,
  Hosteltur, evenement.com).
- [ ] Mesure GEO mensuelle : poser 20 questions types à ChatGPT, Perplexity, Gemini et Claude,
  noter si Yuno est cité, à quelle position, et avec des faits justes.
- [ ] **Domaine** : à terme, servir la landing sur `yunoapp.eu` (domaine de marque, déjà lié
  depuis Instagram) plutôt que sur un sous-domaine, et regrouper l'autorité.

---

## Sources principales
- **Concurrents** :
  - Weezevent : weezevent.com/fr/clubs-soirees, grille PDF
  - Xceed : xceed.me/en/pricing
  - Eventbrite : aide Eventbrite FR
  - Shotgun : support Shotgun (« Comprendre les frais de services »)
  - Fourvenues : fourvenues.com/es/software-para-discotecas
  - Autres : ResaFlow, Billettera, OnParticipe
- **Marché** :
  - CNM (chiffres 2024 de la diffusion)
  - IRMA (nombre de discothèques)
  - Hosteltur / España de Noche (ocio nocturno)
  - Gaceta del Turismo (Madrid)
  - Variety (Fever × DICE)
  - El Español (levée Fourvenues)
  - JDN (billetterie 2026)
- **GEO** : études de citations Averi et Profound (2026).
- **Méthode** : skills SearchFit SEO (ai-visibility, schema-markup, technical-seo, on-page-seo,
  keyword-clustering) et Anthropic marketing/seo-audit.

---

## 8. Pages comparatives (en ligne depuis le 24/09/2026)

| URL | Requêtes visées |
|---|---|
| `/fr/alternative-shotgun` | shotgun pro, shotgun billetterie, alternative (à) shotgun, shotgun frais, shotgun commission organisateur, shotgun avis organisateur |
| `/alternative-shotgun` | shotgun alternative, shotgun pro fees, shotgun vs |
| `/es/alternativa-fourvenues` | alternativa a fourvenues, fourvenues precio, fourvenues comisión, fourvenues opiniones, discocil |

**Structure de chaque page** (réponse d'abord, pensée pour Google et les IA) :
1. « En bref »
2. Tableau sourcé point par point, avec les avantages réels du concurrent
3. « C'est quoi Shotgun Pro / Fourvenues »
4. Lequel choisir
5. Comment migrer
6. FAQ (qui reprend les questions « Les gens demandent aussi »)
7. Sources datées et mention légale

**Réalisme sur les requêtes de marque.** Sur « shotgun pro » ou « fourvenues », les pages
officielles occuperont presque toujours les premières places, qu'il y ait des Google Ads ou
non : c'est de la navigation vers la marque. L'objectif réaliste est la **première page juste
sous leurs propres pages**, puis la 1ʳᵉ place sur les requêtes de choix : alternative, frais,
commission, avis, vs.
- Sur « alternative à shotgun », les résultats parlent surtout d'Autodesk ShotGrid (l'ancien
  logiciel « Shotgun »).
- Sur « alternativa a fourvenues », aucune page ne cible la nuit.

Ces deux requêtes sont donc réellement ouvertes. Enchérir en Google Ads sur ces noms de
marque est aussi possible et peu cher quand la marque n'enchérit pas elle-même. En revanche,
la marque ne doit pas figurer dans le texte de l'annonce.

**Maintenance** :
- Revérifier chaque fait tous les 3 mois, depuis un navigateur normal, en gardant des captures
  d'écran datées. Mettre à jour `updated` et les libellés « relevé le » dans
  `src/content/compare.ts`.
- Corriger sous 48 h toute erreur signalée par un concurrent.

**Prochaines pages** : « Yuno vs Xceed » (ES/FR), « Alternative à Weezevent » (FR),
« DICE alternative » (EN), « Fourvenues alternative » (EN).


---

## 9. Stratégie « petit contre gros » (29/09/2026)

**Le constat.** Shotgun, Weezevent, Xceed, Fourvenues, DICE et Eventbrite ont des domaines
énormes et des budgets. Yuno ne les battra pas sur « billetterie » ni « logiciel boîte de nuit »
en quelques mois. Elle peut gagner ailleurs, par cinq leviers, dans cet ordre :

| # | Levier | Pourquoi ça marche pour Yuno | Où |
|---|---|---|---|
| 1 | **Posséder des catégories sans concurrent** | Sur « commission promoteur », « contrat club organisateur », « app RRPP », la SERP est faite d'offres d'emploi, de forums et de blogs. Aucun logiciel n'y répond. Une bonne page peut être 1re en quelques semaines. | pages promoteurs, répartition club × organisateur |
| 2 | **Les pages « alternative à X » et « X vs Yuno »** | L'intention est déjà « je cherche autre chose ». Le concurrent ne peut pas les occuper. Elles convertissent le mieux. | Shotgun, Weezevent, Xceed, DICE, Fourvenues |
| 3 | **Un modificateur B2B sur chaque terme large** | « Tables VIP », « guest list », « RRPP » seuls attirent des fêtards. Avec « logiciel », « software », « app pour », on ne garde que les pros. | pages VIP, guest list |
| 4 | **Le local, où Yuno a de vrais faits** | Madrid : Amoris + 22 clubs. Aucun gros ne fait de page locale sincère. | `/es/software-discotecas-madrid` |
| 5 | **Être citée par les IA sans avoir l'autorité de domaine** | Les IA reprennent des tableaux datés, sourcés, honnêtes. Une page qui admet où le concurrent est meilleur est plus citée qu'une page de pub. | tous les tableaux, `/pricing`, `llms-full.txt` |

**Ce qu'on ne fait pas** : viser « billetterie en ligne » (Weezevent, Eventbrite), acheter des
liens, publier du contenu générique en volume, dire « la moins chère » ou « la seule ».

## 10. Ce que la SERP du 29/09 apprend (recherches réelles, index US)

Les volumes restent des estimations : aucun outil de mots-clés n'était accessible (Autocomplete et
sites concurrents bloqués par le proxy). À confirmer dans Search Console d'ici 2 à 4 semaines.

| Requête | Qui occupe la SERP | Lecture |
|---|---|---|
| logiciel gestion boîte de nuit billetterie tables VIP promoteurs (FR) | Fourvenues (pages EN), Ticketor, ResaFlow, Disco2app, Clubbable, TablelistPro | **Aucun éditeur franco-français complet.** ResaFlow = tables seulement. Ouvert. |
| alternative Weezevent billetterie soirée (FR) | lafabriquedunet, Appvizer, codeur.com, AssoConnect, comparatif-billetterie.com, evenement.com, Oniva | **Les comparateurs dominent.** Il faut la page ET être listé chez eux (§12). |
| réservation table VIP discothèque logiciel acompte (FR) | pages de clubs (B2C), Qamarero (caisse), Fourvenues (EN), Disco2app | SERP mélangée B2C/B2B, peu de vrais logiciels. Ouvert avec le modificateur « logiciel ». |
| comment rémunérer les promoteurs de soirée (FR) | Cairn, Commentouvrir, Ventesactives, Clubbable | **Zéro éditeur.** Un guide répondant à la vraie question gagne. |
| software para discotecas reservados RRPP Madrid (ES) | Fourvenues (x3), Cocotea, Eatkers, Intranyx, Premiumguest, Loomis | **Plus disputé que prévu** : au moins 5 petits éditeurs ES que le doc ne listait pas. |
| alternativa Xceed / Fourvenues ticketera comisiones (ES) | dodmagazine, Nevent, Woutick, Soundtix, **Wave (« sin comisiones »)** | Wave tient déjà la promesse « sin comisiones » : Yuno ne peut pas s'en contenter, il faut y ajouter tout le reste de la nuit. |
| promoter commission tracking software (EN) | TablelistPro, GuestlistOnline, GuestQueue, nightclub-technology.com | Marché US. Les blogs « best venue software » (GuestlistOnline) sont des cibles de listing. |
| DICE alternative (EN) | Hi.Events, tickts, ticketingfees.co.uk, Outsavvy, FIXR, Fatsoma, Ticket Fairy | UK saturé de petits acteurs. Angle utile : **frais publiés + toute la nuit**. |

**Concurrents à ajouter à la veille** (absents de la §3) : Cocotea, Intranyx, Premiumguest,
Eatkers, Wave (ES) ; Disco2app, Clubbable, ResaFlow (FR/EU) ; GuestlistOnline, GuestQueue,
Ticketor (EN).

## 11. Ce qui a été mis en ligne le 29/09/2026

**Un gabarit unique « page solution »** (`src/pages/topic.tsx`, contenu dans `src/content/topics/*`,
JSON-LD dans `src/i18n/topic-seo.ts`) : réponse directe d'abord, grille de fonctions, tableau,
étapes, chiffres réels, FAQ, liens associés, CTA d'inscription. Tout est dans le HTML serveur.
Chaque page émet WebPage + BreadcrumbList + SoftwareApplication + FAQPage.

| Sujet | EN | FR | ES |
|---|---|---|---|
| Tables VIP | `/vip-table-booking-software` | `/fr/reservation-table-vip-discotheque` | `/es/software-reservados-discoteca` |
| Promoteurs / RRPP | `/promoter-tracking-software` | `/fr/logiciel-promoteurs-soiree` | `/es/software-rrpp-discoteca` |
| Répartition club × organisateur | `/club-organizer-revenue-split` | `/fr/contrat-club-organisateur` | `/es/reparto-ingresos-discoteca-organizador` |
| Guest list & accès | `/nightclub-guest-list-software` | `/fr/guest-list-soiree-logiciel` | `/es/lista-invitados-discoteca-software` |
| Tarifs | `/pricing` | `/fr/pricing` | `/es/precios` |
| Madrid | — | — | `/es/software-discotecas-madrid` |
| Alternative à … | `/dice-alternative` | `/fr/alternative-weezevent` | `/es/alternativa-xceed` |

Le site passe de 26 à 43 URLs dans le sitemap. Les pages sont reliées entre elles (bloc « pour aller
plus loin »), depuis le pied de page de toutes les pages landing, et depuis les cartes « produit » de la landing.

**Corrections de fond (elles comptaient plus que les nouvelles pages)**
- `/pricing` et `/fr/pricing` affichaient encore les anciens plans (Core, Essential 49 €, Pro 99 €,
  Elite 199 €). Ils sont remplacés par la vraie grille : 0 € d'abonnement, 0 % de commission,
  frais acheteur, exemple chiffré. Une IA ne peut plus citer un faux prix.
- `/clubs` et `/organizers` (EN/FR) vantaient une « offre fondateur : 3 mois offerts, tarif verrouillé à vie »
  et un « plan Core ». Réécrits sur le modèle actuel ; titres et descriptions passent sur les mots-clés
  (« logiciel de gestion de boîte de nuit », « billetterie pour organisateurs de soirées »).
- Bandeau global « Offre Club Fondateur » remplacé.
- `llms.txt` / `llms-full.txt` incluent maintenant toutes les nouvelles pages ; `LANDING_UPDATED` est au 29/09.

**Limite à connaître** : les sites Weezevent, Xceed et DICE étaient bloqués depuis l'environnement.
Les faits des trois nouvelles pages « alternative » viennent de `yuno-context.md` (relevés de Paul, juin à
septembre) et de recoupements par recherche (tarifs Weezevent 2,5 % min 0,99 € et versements tous les 15
jours ; Xceed 3 % sur ses propres canaux, 15 % marketplace, Pro 29–59 €/mois ; DICE : tarifs négociés, non
publiés). **À revérifier depuis un navigateur normal avant la fin d'octobre**, avec captures datées.

## 12. Actions hors site (là où se joue le GEO) — pour Paul

Les IA citent surtout des comparateurs, des annuaires et des forums. Les pages ci-dessus n'y suffisent pas.

**Cette semaine (moins de 30 min chacune)**
1. **Search Console** : Inspection d'URL → « Demander une indexation » sur les URL neuves, dans cet
   ordre : `/fr/pricing`, `/fr/reservation-table-vip-discotheque`, `/fr/logiciel-promoteurs-soiree`,
   `/fr/contrat-club-organisateur`, `/fr/alternative-weezevent`, `/es/software-discotecas-madrid`,
   `/es/software-rrpp-discoteca`, `/es/alternativa-xceed`, `/dice-alternative`, puis le reste. Ajouter
   une annotation « 29/09 : 17 pages » pour lire l'effet ensuite.
2. **Demander à Amoris et aux 22 clubs de Madrid de faire un lien** vers leur page Yuno (« Entradas vía Yuno »)
   depuis leur site ou leur bio Instagram. Ce sont les seuls vrais backlinks qu'on peut obtenir vite, et
   ils alimentent la page Madrid.
3. **Bing Webmaster Tools** : `sitemap-pages.xml` (IndexNow part déjà à chaque `bun run deploy`).
4. **Fiches d'entité** : LinkedIn (page entreprise), Crunchbase, Wikidata. Puis les ajouter à `SAME_AS`
   dans `src/i18n/landing-seo.ts` (c'est ce qui sépare Yuno de la fintech y.uno pour les IA).
5. **Cloudflare** : vérifier que « Block AI bots » est désactivé (sinon le GEO est annulé).

**Sous 30 jours**
6. **Comparateurs FR** qui classent « alternative Weezevent » : écrire à lafabriquedunet.fr,
   Appvizer, comparatif-billetterie.com, evenement.com pour être ajouté avec un lien vers
   `/fr/pricing`. Proposer les faits (0 €/0 %, prix publics) : ils reprennent volontiers.
7. **Fiches d'avis** : Capterra (alimente GetApp et Software Advice), G2, AlternativeTo (en alternative à
   Shotgun, Weezevent, Xceed, DICE, Fourvenues). Objectif : 10 avis d'organisateurs et de clubs.
8. **Blogs « best venue / nightclub software »** (GuestlistOnline, nightclub-technology.com, Nevent, Woutick, Soundtix) :
   demander l'ajout. Ce sont les pages que Perplexity et ChatGPT citent.
9. **Google Business Profile** Paris et Madrid, **Product Hunt**, une **démo YouTube** de 2–3 minutes
   (« Comment vendre des carrés VIP avec acompte »), reprise sur la page VIP (Google AI Overviews cite YouTube).
10. **Instagram** : mettre `/fr/start` ou `/es/start` en lien de bio ; les pages solutions en story « à la une ».

**Sous 90 jours** : « Baromètre de la nuit » (panier moyen par table, no-show avec ou sans acompte, part
des ventes par promoteur), publié chaque trimestre. C'est la seule donnée originale que les IA
peuvent citer et que personne d'autre n'a. Diffusion : Maddyness, Hosteltur, evenement.com.

## 13. Boucle de pilotage (Search Console + GEO)

**Chaque semaine, 20 minutes, dans Search Console :**
1. *Performances → Requêtes*, filtre par page. Repérer les requêtes en positions 8–20 : ce sont les
   pages à renforcer en premier (titre, H2, FAQ), pas de nouvelles pages.
2. *Pages* : lister « Détectée, non indexée » et « Explorée, non indexée ». Sur une page neuve, cela signifie
   souvent trop peu de liens internes : en ajouter depuis la landing et les pages voisines.
3. Noter dans `docs/seo-rank-log.md` la position des 12 requêtes suivies.
4. Quand une requête a des impressions mais un CTR < 2 %, réécrire le titre (verbe + bénéfice + mot-clé).

**Chaque mois, mesure GEO** : poser ces 20 questions à ChatGPT, Perplexity, Gemini et Claude. Noter si
Yuno est citée, à quelle place, et si les faits sont justes (surtout le prix).
- FR : « meilleur logiciel de billetterie pour boîte de nuit » · « alternative à Weezevent pour organiser une soirée » ·
  « comment rémunérer des promoteurs de soirée » · « logiciel de réservation de carrés VIP avec acompte » ·
  « comment se partagent les recettes entre un club et un organisateur » · « Yuno billetterie soirée ».
- ES : « mejor software para discotecas en Madrid » · « alternativa a Fourvenues » · « alternativa a Xceed » ·
  « app para RRPP de discoteca » · « cómo se reparten los ingresos entre discoteca y organizador » · « Yuno software discotecas ».
- EN : « best nightclub ticketing software » · « DICE alternative for club nights » · « VIP table booking software for nightclubs » ·
  « promoter commission tracking software » · « how to split revenue between a club and an event organizer » · « Yuno nightlife platform ».
- Marque : « qu'est-ce que Yuno ? » (FR, EN) · « Yuno est-il gratuit ? » : vérifier qu'aucune IA ne mélange avec y.uno et qu'aucune
  ne cite les anciens plans à 49/99/199 €.

**Objectifs réalistes (à confirmer avec les vraies données GSC)**
- 30 jours : les 17 pages indexées ; Yuno 1re sur « alternative à Shotgun » (FR) ; premières impressions sur promoteurs et répartition.
- 60 jours : 1re page sur 3 à 5 requêtes « promoteur / RRPP / contrat club » ; premières citations IA sur ces sujets ; 5 avis Capterra ou G2.
- 90 jours : pages « alternative » sous les pages officielles des concurrents sur leurs requêtes de marque ; Baromètre publié.

**Conversion** : chaque page a un bouton « Créer mon compte gratuit » (ouvre l'inscription) et « Parler
au fondateur » (WhatsApp) ; PostHog classe déjà les clics (`landing_cta_clicked` avec la section
`topic_hero`, `topic_features`, `topic_table`, `topic_steps`, `topic_proof`). Lire dans PostHog quelles pages
apportent des inscriptions, pas seulement du trafic.
