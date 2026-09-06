# FutBidder — verifica del 6 settembre 2026

Revisione del codice locale e correzioni con test automatici e prove nel browser. Non è una certificazione di sicurezza né una garanzia di assenza di ulteriori bug. Nessun deploy sul sito pubblico eseguito in questa revisione.

## Correzioni

- CPU single player: il tetto massimo conserva ora il desiderio individuale anziché appiattire molte offerte allo stesso importo; spareggi dello skip casuali, senza assegnazione preferenziale alla CPU con più posti liberi. Nessuna offerta se il budget spendibile è esaurito.
- Timer single player calcolato rispetto a una scadenza reale, non al numero di tick eseguiti. I rilanci tardivi aggiornano anche la scadenza di cinque secondi.
- Uscita e nuova partita cancellano anche la transizione differita tra due aste; il logout che ritorna alla home ferma il gioco. “Gioca ancora” pulisce lo stato precedente.
- Poll multiplayer non sovrapposti; risposte obsolete dopo un'uscita ignorate; errori di accesso/lobby scomparsa fermano il polling. Timeout delle richieste API e messaggi di errore per completamento rosa e impostazioni lobby.
- Completamento rosa riutilizza i giocatori generati disponibili: spostare e ricompletare la formazione non genera riserve illimitate.
- Formazioni server con identificativi canonici: lo stesso calciatore non può essere schierato due volte usando nome e UID. Pronto solo con undici titolari.
- Risultati multiplayer conservati fino alla normale scadenza della lobby, invece di eliminarli appena tutti li hanno ricevuti.
- Input partita normalizzati a interi finiti e limitati anche sul server.
- Pop-up: sfondo non interagibile, navigazione Tab confinata al dialogo, focus restituito al controllo di apertura. Selettori lingua con area touch di 44 pixel.
- JSON non oggetto rifiutato; chiavi ereditate come `constructor` e `__proto__` non accettate come moduli, difficoltà o opzioni tattiche. Avvio asta ripetuto fuori lobby bloccato.
- Header IP inoltrati ignorati salvo proxy esplicitamente fidato/ambiente Render; utilizzato l'ultimo elemento X-Forwarded-For. Le richieste anonime non prolungano più da sole la vita della lobby.
- Un archivio statistiche corrotto o illeggibile produce errore: non viene più sostituito silenziosamente da statistiche vuote.
- Shuffle Fisher-Yates al posto dell'ordinamento con comparatore casuale.

## Verifica eseguita

`npm run check`: controlli sintassi e quattro suite, tutte superate.

- Account: separazione, deduplicazione recente, modifica profilo senza azzeramento, rilettura da file e protezione contro sovrascrittura di archivio corrotto.
- Sicurezza HTTP: file privati 404, header, JSON invalido/non oggetto, tipo contenuto, limite corpo, segreti lobby e autorizzazioni host, moduli/difficoltà anomali.
- Gameplay server: cinque moduli, venti ricompletamenti per modulo senza crescita della rosa, undici giocatori unici, campionato a due squadre, coerenza dei totali e risultati rileggibili.
- Gameplay client: diversità del tetto CPU al variare del desiderio, riserva di crediti, limiti per acquisto e impostazioni numeriche.
- Browser locale: input da tastiera; asta a dodici giocatori con skip; blocco skip dopo offerta; reset durante transizione; completamento rosa; stagione a venti squadre; statistiche a comparsa durante simulazione; risultati, giornata 38 → 37 e nuova partita. Nella build finale osservate anche acquisizioni consecutive della stessa CPU e prezzi differenziati.
- Logo caricato correttamente; controllo di larghezza a 1280 e 390 pixel, senza overflow dell'intero documento nelle schermate controllate; ispezione visiva del menu mobile. Nessun errore console rilevato nel percorso finale.

## Limiti e verifiche necessarie in produzione

1. Login/logout Google reale non provato: la configurazione Google non è presente nel server locale. Serve una prova sul dominio Render dopo il deploy con account reale.
2. Il codice salva su `STATS_FILE` (altrimenti `stats-store.json` nella cartella applicazione). La configurazione `render.yaml` nel progetto non predispone storage persistente. La durata dei dati dopo riavvii o deploy dipende da un disco persistente/database configurato sul servizio effettivo: non è stata verificata la dashboard Render. Non spostare il percorso senza migrare e salvare prima i dati esistenti.
3. Statistiche single player ancora calcolate dal browser: non sono anti-cheat. Una classifica competitiva richiede risultati verificati dal server. La deduplicazione attuale copre lo storico recente, non tutti gli invii di sempre.
4. Sessioni in memoria e token nel browser; rate limiting locale al processo. Più istanze richiedono archivi condivisi; la protezione DDoS di rete richiede supporto della piattaforma. `TRUST_PROXY=1` va usato solo dietro un proxy che aggiunge/sostituisce correttamente X-Forwarded-For e impedisce accesso diretto non fidato.
5. Non eseguiti test di carico distribuiti, matrice completa di dispositivi/browser o prova multiplayer simultanea con due browser e Google reale. Alcune descrizioni tattiche/log composti restano parzialmente in italiano quando si seleziona inglese.

## Consegna

Caricare il contenuto di `FUTBIDDER-CORRETTO-06-09.zip` nella radice del repository usato da Render. Sono inclusi sorgenti, immagini e test; nessun archivio statistiche o credenziale. Conservare le variabili ambiente già configurate. I pacchetti datati precedenti restano invariati come copie precedenti.

Dopo il deploy: verificare login, fine partita e salvataggio, modifica nome, logout e nuovo login; confermare `/server.js` e `/stats-store.json` con risposta 404. Verificare la persistenza con un riavvio controllato solo dopo avere effettuato un backup.
