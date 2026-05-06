/* Prenotazioni screen — list + WhatsApp bot conversation */

function Prenotazioni() {
  const [filter, setFilter] = React.useState("Tutte");

  const reservations = [
    { day: "OGGI", time: "20:30", name: "Famiglia Russo", cov: 4, meta: "+39 339 412 5588 · richiesta 5 mag 14:18", warn: "celiaco · ricorrenza compleanno", status: "Confermata", tone: "good" },
    { day: "OGGI", time: "21:00", name: "M. Bianchi", cov: 2, meta: "+39 348 ··· 8214 · richiesta 5 mag 11:42", status: "Confermata", tone: "good" },
    { day: "DOM", time: "13:00", name: "Aliquota S.r.l. — pranzo team", cov: 6, meta: "aliquota.it · fattura richiesta · 5 mag 09:55", warn: "1 vegetariano · menu fisso 28€", status: "Confermata", tone: "good" },
    { day: "VEN", time: "20:00", name: "Studio Conti — cena cliente", cov: 8, meta: "+39 051 ··· 4422 · 4 mag 17:30", warn: "1 intolleranza lattosio · piano sup.", status: "Confermata", tone: "good" },
    { day: "SAB", time: "21:30", name: "A. Verdi", cov: 3, meta: "+39 333 ··· 9087 · cancellata stamattina 08:14", status: "Cancellata", tone: "danger" },
    { day: "SAB", time: "20:30", name: "Eleonora Pasi", cov: 2, meta: "+39 392 ··· 7711 · in attesa carta credito", status: "In attesa", tone: "warn" },
    { day: "DOM", time: "12:30", name: "Famiglia Petrini — battesimo", cov: 14, meta: "+39 340 ··· 5566 · 4 mag 21:02 · acconto €100", status: "Confermata", tone: "good" },
  ];

  return (
    <>
      <section className="kpis">
        <div className="kpi kpi--brand">
          <span className="kpi__chip">Oggi</span>
          <span className="kpi__label">Coperti oggi</span>
          <span className="kpi__value">38 <span style={{fontSize:"22px", opacity:.7}}>/42</span></span>
          <span className="kpi__delta">90% di occupazione · sera quasi piena</span>
        </div>
        <div className="kpi">
          <span className="kpi__label">Coperti settimana</span>
          <span className="kpi__value">312</span>
          <span className="kpi__delta"><Icon name="arrow-up" size={12}/> <strong>+18%</strong> vs settimana scorsa</span>
        </div>
        <div className="kpi">
          <span className="kpi__label">Tasso cancellazione</span>
          <span className="kpi__value">8,2%</span>
          <span className="kpi__delta">media settore Bologna 11%</span>
        </div>
        <div className="kpi">
          <span className="kpi__label">Prenotazioni via bot</span>
          <span className="kpi__value">71%</span>
          <span className="kpi__delta"><Icon name="arrow-up" size={12}/> <strong>+9 pt</strong> vs marzo</span>
        </div>
      </section>

      <div style={{display:"grid", gridTemplateColumns:"1.5fr 1fr", gap:"22px"}} className="grid-2">
        <section className="card">
          <div className="card__head">
            <div>
              <h2 className="card__title">Prenotazioni recenti</h2>
              <div className="card__sub">Ultime 24 ore · live dal bot</div>
            </div>
            <div className="tabs">
              {["Tutte","Oggi","Domani","Settimana"].map(t => (
                <button key={t} aria-pressed={filter === t} onClick={() => setFilter(t)}>{t}</button>
              ))}
            </div>
          </div>

          <div className="reslist">
            {reservations.map((r, i) => (
              <div className="resrow" key={i}>
                <div className="resrow__when">
                  <span className="resrow__day">{r.day}</span>
                  <span className="resrow__time">{r.time}</span>
                </div>
                <div>
                  <div className="resrow__name">{r.name} <span className="cov">×{r.cov}</span></div>
                  <div className="resrow__meta">{r.meta}</div>
                  {r.warn ? <div className="resrow__warn">⚠ {r.warn}</div> : null}
                </div>
                <span className={"chip chip--" + r.tone}>{r.status}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="card" style={{padding:"16px"}}>
          <div className="card__head" style={{marginBottom:"10px", padding:"0 4px"}}>
            <div>
              <h2 className="card__title" style={{fontSize:"19px"}}>Bot Margine · WhatsApp</h2>
              <div className="card__sub">Conversazione live con la Famiglia Russo</div>
            </div>
            <span className="chip chip--good">attivo</span>
          </div>

          <div className="wa">
            <div className="wa__head">
              <div className="wa__head__avatar"><Icon name="whatsapp" size={18}/></div>
              <div>
                <div className="wa__head__name">Margine Bot</div>
                <div className="wa__head__status">Trattoria del Borgo · online</div>
              </div>
            </div>
            <div className="wa__body">
              <div className="wa__date">Oggi</div>
              <div className="wa__msg wa__msg--in">Buonasera, è possibile prenotare per 4 questa sera alle 20:30?<span className="wa__time">14:14</span></div>
              <div className="wa__msg wa__msg--out">Ciao! Tavolo per 4 alle 20:30 disponibile ✓<br/>Mi confermi nome e numero?<span className="wa__time">14:14 ✓✓</span></div>
              <div className="wa__msg wa__msg--in">Famiglia Russo, sono il numero che state vedendo<span className="wa__time">14:16</span></div>
              <div className="wa__msg wa__msg--out">Perfetto Famiglia Russo, prenotazione registrata.<br/>Avete <strong>intolleranze o allergie</strong> da segnalarci?<span className="wa__time">14:16 ✓✓</span></div>
              <div className="wa__msg wa__msg--in">Sì mio figlio è celiaco, c'è qualcosa per lui?<span className="wa__time">14:18</span></div>
              <div className="wa__msg wa__msg--out">Annotato 👍 Abbiamo pasta e dolci dedicati. Lo chef vi dirà al tavolo.<br/>Vi aspettiamo alle 20:30!<span className="wa__time">14:18 ✓✓</span></div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

window.Prenotazioni = Prenotazioni;
