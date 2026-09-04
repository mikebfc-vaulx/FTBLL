(() => {
  const storageKey = "futbidderLanguage";
  const supportedLanguages = new Set(["it", "en"]);
  const storedLanguage = localStorage.getItem(storageKey);
  let currentLanguage = supportedLanguages.has(storedLanguage) ? storedLanguage : "it";

  const translations = {
    "Fasi della partita": "Match phases",
    "Asta": "Auction",
    "Rosa": "Squad",
    "Campionato": "League",
    "Risultati": "Results",
    "Statistiche": "Statistics",
    "Non connesso": "Not signed in",
    "Modifica profilo": "Edit profile",
    "Modifica profilo dalla home": "Edit your profile from the home screen",
    "Accedi con Google": "Sign in with Google",
    "Esci": "Sign out",
    "Nuova partita": "New game",
    "Il mercato apre ora": "The market opens now",
    "Costruisci la tua squadra. Sfida tutti.": "Build your squad. Challenge everyone.",
    "Asta flash, gestione della rosa e un'intera stagione da vivere con gli amici o contro l'intelligenza artificiale.": "Flash auctions, squad management and a full season to play with friends or against artificial intelligence.",
    "Asta contro IA": "Auction against AI",
    "Inizia subito": "Start now",
    "Lobby amici": "Friends lobby",
    "Crea o entra": "Create or join",
    "Crea lobby": "Create lobby",
    "Nome host": "Host name",
    "Crea lobby host": "Create host lobby",
    "Entra": "Join",
    "Unisciti a una lobby": "Join a lobby",
    "Codice lobby": "Lobby code",
    "Se non sei connesso riceverai automaticamente un nome Manager-#### libero.": "If you are not signed in, you will automatically receive an available Manager-#### name.",
    "Entra in lobby": "Join lobby",
    "Avvia server.js per usare il multiplayer.": "Start server.js to use multiplayer.",
    "Lobby multiplayer": "Multiplayer lobby",
    "Codice:": "Code:",
    "Link non disponibile": "Link unavailable",
    "Copia link": "Copy link",
    "Colore": "Colour",
    "Cambia colore": "Change colour",
    "Tua formazione": "Your formation",
    "Pronto": "Ready",
    "Non pronto": "Not ready",
    "Avvia asta host": "Start host auction",
    "Settaggi host": "Host settings",
    "Partita": "Match",
    "Crediti": "Credits",
    "Giocatori in asta": "Players at auction",
    "Bot simulazione": "Simulation bots",
    "Difficolta bot": "Bot difficulty",
    "Facile": "Easy",
    "Media": "Medium",
    "Normale": "Normal",
    "Difficile": "Hard",
    "Esperto": "Expert",
    "Salva settaggi": "Save settings",
    "Imposta la partita": "Set up the match",
    "Difficolta": "Difficulty",
    "Modulo": "Formation",
    "Crediti iniziali": "Starting credits",
    "IA in asta": "Auction AI",
    "Avvia asta": "Start auction",
    "Regole rapide": "Quick rules",
    "Budget iniziale e numero giocatori personalizzabili.": "Customisable starting budget and player count.",
    "Ogni giocatore resta 10 secondi in asta.": "Each player stays at auction for 10 seconds.",
    "Ogni rilancio negli ultimi secondi riporta il timer a 5.": "Every late bid resets the timer to 5 seconds.",
    "Vince chi chiude con rosa piu forte ed equilibrata.": "The strongest and most balanced squad wins.",
    "La tua squadra": "Your team",
    "Valutazione": "Rating",
    "Anteprima modulo": "Formation preview",
    "In attesa del prossimo giocatore.": "Waiting for the next player.",
    "Nome giocatore": "Player name",
    "anni": "years old",
    "Offerta attuale": "Current bid",
    "Nessuna offerta": "No bids",
    "Skip: assegna alla CPU": "Skip: assign to CPU",
    "Preparati al primo nome.": "Get ready for the first player.",
    "Avversari AI": "AI opponents",
    "Giocatori lobby": "Lobby players",
    "Log asta": "Auction log",
    "Gestione rosa": "Squad management",
    "Schiera i titolari": "Choose your starters",
    "Genera posti vacanti": "Fill vacant slots",
    "Simula stagione": "Simulate season",
    "Piano partita": "Match plan",
    "Tattica avanzata": "Advanced tactics",
    "Compatibilita": "Compatibility",
    "Mentalita": "Mentality",
    "Prudente": "Cautious",
    "Equilibrata": "Balanced",
    "Offensiva": "Attacking",
    "Costruzione": "Build-up",
    "Mista": "Mixed",
    "Possesso": "Possession",
    "Verticale": "Direct",
    "Fasce": "Wide",
    "Pressing": "Pressing",
    "Basso": "Low",
    "Medio": "Medium",
    "Alto": "High",
    "Linea difensiva": "Defensive line",
    "Bassa": "Low",
    "Alta": "High",
    "Capitano": "Captain",
    "Dettaglio bonus e malus tattici": "Tactical bonus and penalty details",
    "Impostazione": "Setting",
    "Scelta": "Choice",
    "Pro": "Pros",
    "Contro": "Cons",
    "Panchina": "Bench",
    "Disponibili": "Available",
    "Stagione simulata": "Simulated season",
    "Classifica finale": "Final standings",
    "Gioca ancora": "Play again",
    "Statistiche giocatori": "Player statistics",
    "Gol e assist": "Goals and assists",
    "Top 10 campionato": "League top 10",
    "Rendimento rosa": "Squad performance",
    "I tuoi giocatori": "Your players",
    "Simulazione live": "Live simulation",
    "Vota skip": "Vote to skip",
    "Vai alla classifica finale": "Go to final standings",
    "Classifica live": "Live standings",
    "Informazioni legali": "Legal information",
    "Gestisci cookie": "Manage cookies",
    "Chiudi statistiche": "Close statistics",
    "Profilo partita": "Match profile",
    "Accedi con Google per salvare le statistiche.": "Sign in with Google to save your statistics.",
    "Rendimento account": "Account performance",
    "Le tue stagioni": "Your seasons",
    "Storico": "History",
    "Ultime partite": "Recent matches",
    "Chiudi modifica profilo": "Close profile editor",
    "Profilo visibile": "Public profile",
    "Nome visualizzato": "Display name",
    "Immagine profilo": "Profile picture",
    "Salva profilo": "Save profile",
    "Chiudi Privacy Policy": "Close Privacy Policy",
    "Informativa sul trattamento dei dati": "Information on personal data processing",
    "Ultimo aggiornamento: 4 settembre 2026": "Last updated: 4 September 2026",
    "1. Titolare del trattamento": "1. Data controller",
    "Il titolare è il gestore del servizio FutBidder. I dati identificativi completi e un recapito dedicato alle richieste privacy devono essere inseriti dal gestore prima della pubblicazione definitiva del servizio.": "The data controller is the operator of the FutBidder service. The operator must add their full identification details and a dedicated privacy contact before the service is finally published.",
    "2. Dati trattati": "2. Data processed",
    "FutBidder tratta i dati tecnici necessari al funzionamento, il nome pubblico e l’avatar scelti, i dati delle lobby e delle partite, le rose, i risultati e le statistiche. Con l’accesso Google riceve l’identificativo tecnico dell’account, che viene trasformato in un hash unidirezionale prima dell’archiviazione; non richiede la password Google.": "FutBidder processes technical data needed for operation, the selected public name and avatar, lobby and match data, squads, results and statistics. With Google sign-in it receives the account's technical identifier, which is converted into a one-way hash before storage; it does not request your Google password.",
    "3. Finalità e basi del trattamento": "3. Purposes and legal bases",
    "I dati sono utilizzati per autenticare l’utente, creare e gestire partite, sincronizzare lobby, salvare profilo e statistiche, prevenire errori o abusi e mantenere il servizio sicuro. I trattamenti necessari all’uso del gioco si basano sull’esecuzione del servizio richiesto; il caricamento di Google Identity e delle relative tecnologie funzionali avviene solo dopo una scelta dell’utente.": "Data is used to authenticate users, create and manage matches, synchronise lobbies, save profiles and statistics, prevent errors or abuse and keep the service secure. Processing required to use the game is based on delivering the requested service; Google Identity and its functional technologies are loaded only after the user makes a choice.",
    "4. Conservazione e destinatari": "4. Retention and recipients",
    "Le sessioni sono temporanee; le lobby inattive vengono eliminate automaticamente. Le statistiche dell’account restano conservate finché sono necessarie al servizio o fino a una richiesta di cancellazione. Una copia di recupero può restare nel browser finché l’utente non esegue il logout o cancella i dati del sito. I dati possono essere trattati dai fornitori tecnici di hosting e, se autorizzato, da Google per l’accesso.": "Sessions are temporary and inactive lobbies are deleted automatically. Account statistics are kept while needed for the service or until deletion is requested. A recovery copy may remain in the browser until the user signs out or clears site data. Data may be processed by technical hosting providers and, when authorised, by Google for sign-in.",
    "5. Trasferimenti e sicurezza": "5. Transfers and security",
    "Alcuni fornitori possono trattare dati fuori dallo Spazio Economico Europeo applicando i meccanismi di garanzia previsti dalla normativa. FutBidder limita i dati raccolti e usa token temporanei e identificativi hashati, ma nessun sistema online può garantire sicurezza assoluta.": "Some providers may process data outside the European Economic Area using the safeguards required by law. FutBidder limits the data collected and uses temporary tokens and hashed identifiers, but no online system can guarantee absolute security.",
    "6. Diritti dell’utente": "6. User rights",
    "L’utente può chiedere accesso, rettifica, cancellazione, limitazione, portabilità o opposizione nei casi previsti, revocare il consenso senza pregiudicare i trattamenti precedenti e proporre reclamo al Garante per la protezione dei dati personali. Per esercitare tali diritti dovrà usare il recapito privacy indicato dal titolare.": "Users may request access, correction, deletion, restriction, portability or objection where applicable, withdraw consent without affecting prior processing, and lodge a complaint with the relevant data protection authority. To exercise these rights, use the privacy contact provided by the data controller.",
    "7. Minori e aggiornamenti": "7. Children and updates",
    "I minori devono usare il servizio con l’autorizzazione di chi esercita la responsabilità genitoriale quando richiesta dalla legge. Questa informativa può essere aggiornata se cambiano funzioni, fornitori o modalità di trattamento.": "Children must use the service with permission from a parent or guardian where required by law. This notice may be updated when features, providers or processing methods change.",
    "Chiudi Cookie Policy": "Close Cookie Policy",
    "Preferenze del browser": "Browser preferences",
    "FutBidder usa tecnologie di archiviazione locale assimilabili ai cookie. Al momento non utilizza cookie pubblicitari, di profilazione o strumenti analytics.": "FutBidder uses local storage technologies similar to cookies. It currently does not use advertising or profiling cookies or analytics tools.",
    "Tecnologie utilizzate": "Technologies used",
    "Categoria": "Category",
    "Uso": "Use",
    "Durata": "Duration",
    "Necessari": "Necessary",
    "Preferenza cookie e lingua, sessione, profilo locale e copia di recupero delle statistiche.": "Cookie and language preferences, session, local profile and statistics recovery copy.",
    "Sessione o fino alla cancellazione; consenso cookie per massimo 6 mesi.": "Session or until deletion; cookie consent for up to 6 months.",
    "Funzionali Google": "Google functional",
    "Caricamento di Google Identity per effettuare l’accesso. Possono essere usate tecnologie di terze parti Google.": "Loading Google Identity for sign-in. Google third-party technologies may be used.",
    "Secondo le impostazioni e l’informativa di Google.": "According to Google's settings and privacy notice.",
    "Come modificare la scelta": "How to change your choice",
    "Puoi riaprire in qualsiasi momento il pannello tramite “Gestisci cookie” nel piè di pagina. Se scegli “Solo necessari”, Google Identity non viene caricato e il gioco resta utilizzabile senza accesso Google.": "You can reopen this panel at any time through “Manage cookies” in the footer. If you choose “Necessary only”, Google Identity is not loaded and the game remains playable without Google sign-in.",
    "Gestisci preferenze": "Manage preferences",
    "Continua solo con i cookie necessari": "Continue with necessary cookies only",
    "Le tue preferenze": "Your preferences",
    "Cookie e accesso Google": "Cookies and Google sign-in",
    "Usiamo solo l’archiviazione necessaria al gioco. Con il tuo consenso carichiamo anche Google Identity per permetterti di accedere e sincronizzare le statistiche.": "We only use storage necessary for the game. With your consent, we also load Google Identity so you can sign in and synchronise your statistics.",
    "Solo necessari": "Necessary only",
    "Accetta tutti": "Accept all",
    "Lingua interfaccia": "Interface language",
    "Abilita accesso Google": "Enable Google sign-in",
    "Google non configurato": "Google not configured",
    "Config Google errata": "Incorrect Google setup",
    "Google non disponibile": "Google unavailable",
    "Stats offline": "Offline stats",
    "La rosa e vuota.": "The squad is empty.",
    "La rosa e vuota. Entra nell'asta quando trovi il profilo giusto.": "The squad is empty. Join the auction when you find the right player.",
    "Completa tutti i valori numerici per avviare la partita": "Complete all numeric values to start the match",
    "Partite giocate": "Matches played",
    "Vittorie": "Wins",
    "Podi": "Podiums",
    "Punti medi": "Average points",
    "Gol fatti/subiti": "Goals for/against",
    "Miglior piazzamento": "Best finish",
    "Accedi con Google per salvare progressi single player e online.": "Sign in with Google to save single-player and online progress.",
    "Nessuna partita registrata.": "No matches recorded.",
    "Salvataggio profilo...": "Saving profile...",
    "Profilo guest aggiornato su questo browser.": "Guest profile updated in this browser.",
    "Profilo salvato.": "Profile saved.",
    "Aggiornamento statistiche...": "Updating statistics...",
    "La sessione era scaduta. Accedi nuovamente con Google.": "Your session expired. Sign in with Google again.",
    "Partenza asta": "Auction starting",
    "Preparati": "Get ready",
    "Countdown iniziale": "Starting countdown",
    "L'asta iniziera appena finisce il countdown.": "The auction will start when the countdown ends.",
    "Avvio...": "Starting...",
    "Sei gia in vantaggio su questa asta.": "You are already leading this auction.",
    "Crediti insufficienti per questo rilancio.": "Not enough credits for this bid.",
    "Invio...": "Sending...",
    "Nuovo giocatore sul mercato. Scegli se entrare nell'asta.": "A new player is on the market. Choose whether to join the auction.",
    "In attesa dell'host": "Waiting for the host",
    "In attesa degli altri": "Waiting for the others",
    "Posto vacante": "Vacant slot",
    "Serve giocatore": "Player needed",
    "Nessun giocatore in panchina. Trascina qui chi vuoi togliere dal campo.": "No players on the bench. Drag here anyone you want to remove from the pitch.",
    "Completa la formazione": "Complete the formation",
    "Attacco": "Attack",
    "Centrocampo": "Midfield",
    "Difesa": "Defence",
    "Tiri": "Shots",
    "Intesa": "Chemistry",
    "Media 11": "Starting XI average",
    "Completa gli 11 titolari per calcolare l'intesa.": "Complete the starting XI to calculate chemistry.",
    "Simulazione neutra": "Neutral simulation",
    "pericolosita offensiva": "attacking threat",
    "controllo della gara": "match control",
    "protezione della porta": "goal protection",
    "volume delle conclusioni": "shot volume",
    "0% neutro": "0% neutral",
    "piu occasioni, maggiore esposizione": "more chances, greater exposure",
    "difesa protetta, meno presenza offensiva": "protected defence, less attacking presence",
    "recuperi alti, maggiore spazio alle spalle": "high recoveries, more space in behind",
    "campo corto, rischio contropiede": "compact pitch, counterattack risk",
    "blocco compatto, uscita piu lenta": "compact block, slower build-up",
    "Assetto equilibrato senza rischi tattici marcati.": "Balanced setup with no major tactical risks.",
    "Scegli un capitano tra i titolari.": "Choose a captain from the starters.",
    "Vuoto": "Empty",
    "Titolari": "Starters",
    "Acq.": "Bought",
    "Nessun gol": "No goals",
    "Rosa non disponibile.": "Squad unavailable.",
    "Nessun gol o assist registrato.": "No goals or assists recorded.",
    "Titolare": "Starter",
    "Campione": "Champion",
    "Risultati giornata": "Matchday results",
    "Calendario": "Schedule",
    "Navigazione giornate": "Matchday navigation",
    "Vai alla giornata successiva": "Go to the next matchday",
    "Vai alla giornata precedente": "Go to the previous matchday",
    "Squadra": "Team",
    "TU": "YOU",
    "Belgio": "Belgium",
    "Brasile": "Brazil",
    "Corea del Sud": "South Korea",
    "Costa d'Avorio": "Ivory Coast",
    "Danimarca": "Denmark",
    "Francia": "France",
    "Germania": "Germany",
    "Giappone": "Japan",
    "Inghilterra": "England",
    "Irlanda": "Ireland",
    "Italia": "Italy",
    "Norvegia": "Norway",
    "Paesi Bassi": "Netherlands",
    "Portogallo": "Portugal",
    "Slovenia": "Slovenia",
    "Spagna": "Spain",
    "Stati Uniti": "United States",
    "Ungheria": "Hungary",
    "Aggiungi GOOGLE_CLIENT_ID nelle variabili Environment di Render per attivare questo pulsante.": "Add GOOGLE_CLIENT_ID to Render's Environment variables to enable this button.",
    "Accetta i cookie funzionali per caricare Google Identity.": "Accept functional cookies to load Google Identity.",
    "Modifica nome e immagine": "Edit name and picture",
    "Il profilo si modifica solo dalla home, fuori dalla partita": "You can only edit your profile from the home screen, outside a match",
    "Skip non disponibile: hai gia effettuato un'offerta per questo giocatore.": "Skip unavailable: you have already bid for this player.",
    "Simula subito le offerte delle CPU.": "Simulate CPU bids immediately.",
    "Comandante": "Commander",
    "Motivatore": "Motivator",
    "Stratega": "Strategist",
    "Trascinatore": "Driving force",
    "Leader calmo": "Calm leader"
  };

  const reverseTranslations = new Map(Object.entries(translations).map(([italian, english]) => [english, italian]));
  const sourceTexts = new WeakMap();
  const renderedTexts = new WeakMap();
  const sourceAttributes = new WeakMap();
  const renderedAttributes = new WeakMap();
  const translatedAttributes = ["title", "aria-label", "placeholder"];

  const dynamicTranslations = [
    [/^Entrerai nella lobby come (.+)\.$/, (m) => `You will join the lobby as ${m[1]}.`],
    [/^Budget (\d+) cr - (\d+) giocatori in asta - (\d+) IA asta - campionato a 20 squadre$/, (m) => `Budget ${m[1]} cr - ${m[2]} players at auction - ${m[3]} auction AI - 20-team league`],
    [/^(\d+) crediti - (\d+) giocatori in asta - (\d+) bot - CPU (.+)$/, (m) => `${m[1]} credits - ${m[2]} players at auction - ${m[3]} bots - CPU ${translations[m[4]] || m[4]}`],
    [/^Profilo (.+)\. Salviamo solo un id hashato e questo nome pubblico\.$/, (m) => `Profile ${m[1]}. We only save a hashed ID and this public name.`],
    [/^(\d+) posto$/, (m) => `${m[1]} place`],
    [/^Campione: (.+)$/, (m) => `Champion: ${m[1]}`],
    [/^Giornata (\d+) di (\d+)$/, (m) => `Matchday ${m[1]} of ${m[2]}`],
    [/^Giornata (\d+)$/, (m) => `Matchday ${m[1]}`],
    [/^Asta (\d+)\/(\d+)$/, (m) => `Auction ${m[1]}/${m[2]}`],
    [/^Chiamati (\d+)\/(\d+)$/, (m) => `Called ${m[1]}/${m[2]}`],
    [/^(\d+) anni - bonus reparto \+3%$/, (m) => `${m[1]} years old - unit bonus +3%`],
    [/^(\d+) anni$/, (m) => `${m[1]} years old`],
    [/^In vantaggio: (.+)$/, (m) => `Leading: ${m[1]}`],
    [/^(.+) venduto a (.+)\.$/, (m) => `${m[1]} sold to ${m[2]}.`],
    [/^(.+) non ha ricevuto offerte\.$/, (m) => `${m[1]} received no bids.`],
    [/^(.+): asta simulata tra le CPU\.$/, (m) => `${m[1]}: auction simulated between CPU teams.`],
    [/^Invio offerta \+(\d+)\.\.\.$/, (m) => `Sending bid +${m[1]}...`],
    [/^Si parte tra (\d+)$/, (m) => `Starting in ${m[1]}`],
    [/^(.+) utile: entrerebbe subito nel modulo\.$/, (m) => `${m[1]} needed: would immediately fit the formation.`],
    [/^(.+) non prioritario: finirebbe in panchina\.$/, (m) => `${m[1]} not a priority: would go to the bench.`],
    [/^Panchina: ruolo (.+) gia coperto$/, (m) => `Bench: ${m[1]} role already covered`],
    [/^(.+) - giocatore selezionato: clicca uno slot o la panchina per spostarlo\.$/, (m) => `${m[1]} - player selected: click a slot or the bench to move them.`],
    [/^(.+) - (\d+)\/11 titolari pronti\. Giocatori generati: (\d+)\.$/, (m) => `${m[1]} - ${m[2]}/11 starters ready. Generated players: ${m[3]}.`],
    [/^Generati (\d+) giocatori per completare l'undici\.$/, (m) => `${m[1]} players generated to complete the starting XI.`],
    [/^La formazione e gia completa\.$/, () => "The formation is already complete."],
    [/^Coppa a (.+)$/, (m) => `Cup winner: ${m[1]}`],
    [/^Difficolta (.+), modulo (.+)\. Calendario andata e ritorno contro (\d+) rivali\.$/, (m) => `Difficulty ${translations[m[1]] || m[1]}, formation ${m[2]}. Home-and-away schedule against ${m[3]} rivals.`],
    [/^(\d+) punti, (\d+) gol fatti$/, (m) => `${m[1]} points, ${m[2]} goals scored`],
    [/^(Titolare|Panchina) - (.+) - OVR (\d+)$/, (m) => `${m[1] === "Titolare" ? "Starter" : "Bench"} - ${m[2]} - OVR ${m[3]}`],
    [/^Ruoli -(\d+) · Nazioni \+(\d+) · Simulazione (.+)$/, (m) => `Roles -${m[1]} · Nations +${m[2]} · Simulation ${m[3]}`],
    [/^Tattica totale ([^·]+)(.*)$/, (m) => `Total tactics ${m[1]}${m[2].replace("Star", "Star").replace("Applicato", "Applied")}`],
    [/^(.+): Leadership (\d+), (.+)\. Rafforza l'organizzazione difensiva\.$/, (m) => `${m[1]}: Leadership ${m[2]}, ${m[3]}. Strengthens defensive organisation.`],
    [/^(.+): Leadership (\d+), (.+)\. Migliora la compatibilita tattica\.$/, (m) => `${m[1]}: Leadership ${m[2]}, ${m[3]}. Improves tactical compatibility.`],
    [/^(.+): Leadership (\d+), (.+)\. Rende la squadra piu stabile nei momenti delicati\.$/, (m) => `${m[1]}: Leadership ${m[2]}, ${m[3]}. Makes the team more stable in difficult moments.`],
    [/^(.+): Leadership (\d+), (.+)\. Aumenta la risposta offensiva\.$/, (m) => `${m[1]}: Leadership ${m[2]}, ${m[3]}. Improves the attacking response.`],
    [/^(.+) - L (\d+) - (Comandante|Motivatore|Stratega|Trascinatore|Leader calmo)$/, (m) => `${m[1]} - L ${m[2]} - ${translations[m[3]]}`]
  ];

  function translateTrimmedText(text) {
    if (currentLanguage === "it" || !text) return text;
    if (translations[text]) return translations[text];
    for (const [pattern, replacer] of dynamicTranslations) {
      const match = text.match(pattern);
      if (match) return replacer(match);
    }
    return text;
  }

  function withOriginalSpacing(original, translated) {
    if (original.trim() === translated) return original;
    const leading = original.match(/^\s*/)?.[0] || "";
    const trailing = original.match(/\s*$/)?.[0] || "";
    return `${leading}${translated}${trailing}`;
  }

  function normalizePossibleSource(value) {
    const trimmed = value.trim();
    const reversed = reverseTranslations.get(trimmed);
    return reversed ? withOriginalSpacing(value, reversed) : value;
  }

  function shouldSkipTextNode(node) {
    const parent = node.parentElement;
    return !parent || Boolean(parent.closest("script, style, noscript, svg"));
  }

  function localizeTextNode(node) {
    if (shouldSkipTextNode(node) || !node.nodeValue?.trim()) return;
    const current = node.nodeValue;
    const previousRendered = renderedTexts.get(node);
    if (!sourceTexts.has(node) || current !== previousRendered) {
      sourceTexts.set(node, normalizePossibleSource(current));
    }
    const source = sourceTexts.get(node);
    const translated = translateTrimmedText(source.trim());
    const rendered = withOriginalSpacing(source, translated);
    renderedTexts.set(node, rendered);
    if (current !== rendered) node.nodeValue = rendered;
  }

  function localizeAttributes(element) {
    if (!(element instanceof Element) || element.matches("script, style, svg, svg *")) return;
    let sources = sourceAttributes.get(element);
    let rendered = renderedAttributes.get(element);
    if (!sources) {
      sources = new Map();
      sourceAttributes.set(element, sources);
    }
    if (!rendered) {
      rendered = new Map();
      renderedAttributes.set(element, rendered);
    }
    translatedAttributes.forEach((attribute) => {
      if (!element.hasAttribute(attribute)) return;
      const current = element.getAttribute(attribute) || "";
      if (!sources.has(attribute) || current !== rendered.get(attribute)) {
        sources.set(attribute, normalizePossibleSource(current));
      }
      const source = sources.get(attribute);
      const next = translateTrimmedText(source.trim());
      rendered.set(attribute, next);
      if (current !== next) element.setAttribute(attribute, next);
    });
  }

  function localizeTree(root) {
    if (root.nodeType === Node.TEXT_NODE) {
      localizeTextNode(root);
      return;
    }
    if (!(root instanceof Element || root instanceof Document || root instanceof DocumentFragment)) return;
    if (root instanceof Element) localizeAttributes(root);
    root.querySelectorAll?.("*").forEach(localizeAttributes);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node) {
      localizeTextNode(node);
      node = walker.nextNode();
    }
  }

  function updateLanguageControls() {
    document.querySelectorAll("[data-language]").forEach((button) => {
      const active = button.dataset.language === currentLanguage;
      button.setAttribute("aria-pressed", String(active));
      button.classList.toggle("active", active);
    });
  }

  function setLanguage(language) {
    if (!supportedLanguages.has(language)) return;
    currentLanguage = language;
    window.futbidderLanguage = language;
    localStorage.setItem(storageKey, language);
    document.documentElement.lang = language;
    document.querySelector('meta[name="description"]')?.setAttribute("content", language === "en"
      ? "FutBidder: football auctions, squad management and a league against friends or artificial intelligence."
      : "FutBidder: asta calcistica, gestione della rosa e campionato contro amici o intelligenza artificiale.");
    updateLanguageControls();
    localizeTree(document.body);
  }

  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.language));
  });

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "characterData") localizeTextNode(mutation.target);
      if (mutation.type === "attributes") localizeAttributes(mutation.target);
      mutation.addedNodes?.forEach(localizeTree);
    });
  });

  window.futbidderLanguage = currentLanguage;
  localizeTree(document.body);
  setLanguage(currentLanguage);
  observer.observe(document.body, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: translatedAttributes
  });
})();
