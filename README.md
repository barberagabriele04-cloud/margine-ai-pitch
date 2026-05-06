# Margine.ai — pitch + demo gestionale

Sito statico per la presentazione di **Margine.ai** ai ristoratori prospect, con demo navigabile dell'interfaccia. Vanilla HTML/CSS/JS, nessun build step, nessuna dipendenza esterna oltre ai font Google e ad Anthropic/OpenAI side (non runtime).

## Struttura attuale

```
margine.ai/
├── index.html             # ⭐ pitch principale (1-pager con piani, ROI, FAQ)
├── dati.html              # pagina di approfondimento "quali dati ci servono"
├── gestionale.html        # demo navigabile dell'interfaccia (4 dashboard)
├── old-prototype.html     # vecchio one-pager (backup, può essere eliminato)
├── assets/                # CSS/JS/icone usati solo dal vecchio prototype
├── README.md
├── .nojekyll              # disattiva Jekyll su GitHub Pages
└── .gitignore
```

I tre file principali sono **single-file con CSS/JS inline** (l'unica dipendenza sono i font da Google Fonts via `<link>`).

## Anteprima locale

```bash
# Python 3
python -m http.server 5173

# oppure Node (npx)
npx serve . -p 5173
```

Poi apri `http://localhost:5173`. Il root URL serve `index.html` (il pitch).

Flusso navigabile:
- `/` → pitch principale
- `/dati.html` → approfondimento dati richiesti (cliccabile dalla nav e da link interni al pitch)
- `/gestionale.html` → demo gestionale (cliccabile dalla nav e dalla sezione "Anteprima · L'interfaccia")

## Pubblicazione su GitHub Pages — passo passo

### 1. Crea un repo su GitHub
Vai su [github.com/new](https://github.com/new), crea un repo (es. `margine-ai-pitch`). Lascialo **pubblico** (GitHub Pages gratuito richiede repo pubblico).

### 2. Inizializza git e pusha
Da terminale, dentro la cartella del progetto:

```bash
cd "C:/Users/barbe/Desktop/margine.ai"

git init
git add .
git commit -m "Pitch + demo gestionale per ristoratori"
git branch -M main
git remote add origin https://github.com/<TUO_UTENTE>/<NOME_REPO>.git
git push -u origin main
```

Sostituisci `<TUO_UTENTE>` e `<NOME_REPO>` con i tuoi.

### 3. Attiva GitHub Pages
- Sul repo GitHub → tab **Settings** → menu laterale **Pages**
- Sezione *Build and deployment* → *Source*: scegli **Deploy from a branch**
- *Branch*: `main` / cartella `/ (root)` → **Save**
- Dopo 1-3 minuti il sito è live a:
  ```
  https://<TUO_UTENTE>.github.io/<NOME_REPO>/
  ```

### 4. Verifica e condividi
Apri il link sopra. Dovresti vedere il pitch ("Il tuo analista personale, su WhatsApp"). Quel link è quello da girare.

### Aggiornamenti successivi
Ogni volta che modifichi un file:
```bash
git add .
git commit -m "descrizione modifica"
git push
```
GitHub Pages ricostruisce automaticamente in 1-2 minuti.

## (Opzionale) Custom domain `margine.ai`

Quando hai il dominio:

1. Crea un file `CNAME` nella root con dentro solo: `margine.ai`
2. Nel pannello DNS del dominio aggiungi:
   - 4 record `A` agli IP di GitHub Pages:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - 1 record `CNAME` da `www` a `<TUO_UTENTE>.github.io`
3. Su GitHub Pages → spunta **Enforce HTTPS**

Dopo 5-30 minuti il dominio risolve a https://margine.ai.

## Personalizzazione veloce

| Cosa cambiare | Dove |
| --- | --- |
| Testi del pitch | `index.html` (CSS è inline nel `<head>`, copy nel `<body>`) |
| Prezzi dei 4 piani | `index.html`, sezione `#piani` |
| Esempio messaggio WhatsApp | `index.html`, sezione hero (`.wa-bubble`) |
| Mock dashboard | `gestionale.html` (dati hard-coded, modifica i numeri inline) |
| Email contatto | sostituisci `mailto:hello@margine.ai` (cerca con grep) |
| Numero WhatsApp | sostituisci `https://wa.me/` con `https://wa.me/+39…` |

## Compatibilità mobile

Tutte e 3 le pagine principali sono testate a 390px (iPhone Pro):
- ✅ `index.html`: hero, problema, funziona, anteprima interfaccia, ROI, confronto, testimonials, piani, FAQ, CTA — tutto stack su 1 colonna
- ✅ `dati.html`: page-hero, auto-grid, req-grid, weekly-grid, opt-grid, timeline, privacy, CTA — tutto responsive
- ✅ `gestionale.html`: sidebar collassa in nav orizzontale, KPI grid 1 col, charts e tabelle scrollano

Niente overflow orizzontale.

## Note

- Il claim ROI (€400-900/mese, 6× ritorno) è basato sulla nostra analisi costi reali post-ricerca SDI/WhatsApp/LLM 2026.
- Il piano Brand è strutturato come "AI-driven social automation", non agenzia umana — coerente coi margini sostenibili a €250.
- Margine.ai non promette **menu engineering classico** (richiede dati POS oggi non standardizzati in Italia). Il pitch è esplicito su questo lato `dati.html`.
