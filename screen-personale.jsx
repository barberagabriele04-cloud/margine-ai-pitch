/* Personale screen — week planner + system suggestions */

const PEOPLE = [
  { id: "L", name: "Luca Bianchi", role: "Cuoco · €13/h",
    shifts: ["19—23","19—23","off","19—23","12—15 / 19—23","12—15 / 19—24","12—15"] },
  { id: "M", name: "Maria Conti", role: "Aiuto cucina · €10/h",
    shifts: ["off","19—23","19—23","19—23","18—24","18—24","12—15"] },
  { id: "S", name: "Sara De Luca", role: "Sala · €11/h",
    shifts: ["19—23","19—23","19—23","19—23","19—24","19—24","off"] },
  { id: "P", name: "Paolo Riva", role: "Sala · €11/h",
    shifts: ["off","19—23","19—23","19—23","19—24","19—24","12—15"] },
  { id: "T", name: "Tommaso Greco", role: "Runner · €9/h",
    shifts: ["—","—","—","—","19—24","19—24","—"] },
];

const DAYS = [
  { lbl: "LUN", n: 5, cov: 22 },
  { lbl: "MAR", n: 6, cov: 28 },
  { lbl: "MER", n: 7, cov: 26 },
  { lbl: "GIO", n: 8, cov: 34 },
  { lbl: "VEN", n: 9, cov: 58, peak: true },
  { lbl: "SAB", n: 10, cov: 64, peak: true },
  { lbl: "DOM", n: 11, cov: 52, peak: true },
];

function Personale() {
  return (
    <>
      <section className="kpis">
        <div className="kpi kpi--brand">
          <span className="kpi__chip">5 → 11 mag</span>
          <span className="kpi__label">Coperti previsti</span>
          <span className="kpi__value">312 <span style={{fontSize:"22px", opacity:.7}}>/405</span></span>
          <span className="kpi__delta">77% di occupazione attesa</span>
        </div>
        <div className="kpi">
          <span className="kpi__label">Costo lavoro previsto</span>
          <span className="kpi__value">€2.420</span>
          <span className="kpi__delta neg">31% sui ricavi · target 28%</span>
        </div>
        <div className="kpi">
          <span className="kpi__label">Risparmio se applichi</span>
          <span className="kpi__value">€176</span>
          <span className="kpi__delta">porta il costo lavoro al 28,8%</span>
        </div>
        <div className="kpi">
          <span className="kpi__label">Ore totali pianificate</span>
          <span className="kpi__value">186 h</span>
          <span className="kpi__delta">su 6 collaboratori attivi</span>
        </div>
      </section>

      <section className="card">
        <div className="card__head">
          <div>
            <h2 className="card__title">Pianificazione della settimana</h2>
            <div className="card__sub">Trascina i turni per modificare · clicca un giorno per i dettagli</div>
          </div>
          <button className="btn btn--small"><Icon name="download" size={14}/> Esporta</button>
          <button className="btn btn--small"><Icon name="share" size={14}/> Condividi</button>
        </div>

        <div className="schedule">
          <div className="schedule__head">
            <div>Personale</div>
            {DAYS.map(d => (
              <div key={d.lbl} className={"day" + (d.peak ? " day--peak" : "")}>
                <span className="day__label">{d.lbl}</span>
                <span className="day__num">{d.n}</span>
                <span className="day__cov">{d.cov} cop.</span>
              </div>
            ))}
          </div>

          {PEOPLE.map(p => (
            <div className="schedule__row" key={p.id}>
              <div className="schedule__person">
                <div className="schedule__avatar">{p.id}</div>
                <div>
                  <div className="schedule__name">{p.name}</div>
                  <div className="schedule__role">{p.role}</div>
                </div>
              </div>
              {p.shifts.map((s, i) => (
                <div className="schedule__cell" key={i}>
                  {s === "off" ? <span className="shift shift--off">riposo</span>
                    : s === "—" ? <span className="shift shift--off">—</span>
                    : s.includes("/") ? s.split(" / ").map((x,j) => <span key={j} className="shift shift--double">{x}</span>)
                    : <span className="shift">{s}</span>}
                </div>
              ))}
            </div>
          ))}
        </div>

        <p className="muted" style={{fontSize:"12.5px", marginTop:"14px"}}>
          Il sistema calcola il fabbisogno incrociando coperti previsti, prenotazioni confermate e produttività media (1 cameriere ogni 14-16 coperti, 1 cuoco ogni 25 coperti).
        </p>
      </section>

      <section className="card">
        <div className="card__head">
          <div>
            <h2 className="card__title">Suggerimenti del sistema</h2>
            <div className="card__sub">Basati su prenotazioni confermate al 5 maggio 18:30</div>
          </div>
          <span className="chip chip--brand"><Icon name="sparkles" size={12}/> AI</span>
        </div>

        <div className="suggestions">
          <Suggestion d="6" l="MAR" body={<>Solo <strong>11 prenotazioni confermate</strong> e media storica martedì = 24 cop. Hai <strong>2 in sala</strong>: ok, lascia così.</>}
            costLbl="Nessuna azione" cta="—" />
          <Suggestion d="7" l="MER" body={<>Hai schedulato <strong>2 in sala</strong> (Sara + Paolo) ma le prenotazioni sono ancora a 8 e media storica = 19 cop. Una basta.</>}
            cost="€44" save costLbl="Risparmio" cta="Applica" />
          <Suggestion d="10" l="SAB" body={<>Prenotazioni già a <strong>52 su 64 cop. previsti</strong>. Considera di rinforzare con Tommaso anche al pranzo (12-15).</>}
            cost="€27" costLbl="Costo aggiuntivo" cta="Applica" />
          <Suggestion d="11" l="DOM" body={<>52 coperti al pranzo, hai solo <strong>1 cuoco e 1 sala</strong>. È sopra la soglia di stress per la coppia. Aggiungi Maria al pranzo.</>}
            cost="€33" costLbl="Costo aggiuntivo" cta="Applica" />
        </div>
      </section>
    </>
  );
}

function Suggestion({ d, l, body, cost, costLbl, cta, save }) {
  return (
    <div className="suggestion">
      <div className="suggestion__date">
        <div className="d">{d}</div>
        <div className="l">{l}</div>
      </div>
      <div className="suggestion__body">{body}</div>
      <div className={"suggestion__cost" + (save ? " suggestion__cost--save" : cost ? " suggestion__cost--add" : "")}>
        <span className="suggestion__cost__lbl">{costLbl}</span>
        {cost || "—"}
      </div>
      {cta === "—" ? <span className="muted" style={{fontSize:"12.5px"}}>—</span> : <button className="btn btn--small btn--primary">{cta}</button>}
    </div>
  );
}

window.Personale = Personale;
