# Yuno — Stratégie SEO & GEO (septembre 2026)

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
