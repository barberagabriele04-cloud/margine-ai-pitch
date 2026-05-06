/* Panoramica screen — KPIs + chart + weekday bars + holidays + drift */

function Panoramica() {
  const [range, setRange] = React.useState("Mese");

  return (
    <>
      {/* KPIs */}
      <section className="kpis">
        <div className="kpi kpi--brand">
          <span className="kpi__chip">Maggio</span>
          <span className="kpi__label">Margine</span>
          <span className="kpi__value">€5.860</span>
          <span className="kpi__delta"><Icon name="arrow-up" size={12}/> <strong>+1,2 pt</strong> vs aprile · 24,9%</span>
        </div>
        <div className="kpi">
          <span className="kpi__label">Ricavi del mese</span>
          <span className="kpi__value">€23.480</span>
          <span className="kpi__delta"><Icon name="arrow-up" size={12}/> <strong>+8,2%</strong> vs aprile</span>
        </div>
        <div className="kpi">
          <span className="kpi__label">Costi del mese</span>
          <span className="kpi__value">€17.620</span>
          <span className="kpi__delta neg"><Icon name="arrow-up" size={12}/> <strong>+3,1%</strong> vs aprile</span>
        </div>
        <div className="kpi">
          <span className="kpi__label">Cassa proiettata 30gg</span>
          <span className="kpi__value">+€2.140</span>
          <span className="kpi__delta">in salute · niente da segnalare</span>
        </div>
      </section>

      {/* Notification feed */}
      <section className="card">
        <div className="card__head">
          <div>
            <h2 className="card__title">Aggiornamenti del giorno</h2>
            <div className="card__sub">7 nuovi · ultimo 2 minuti fa</div>
          </div>
          <button className="card__action">Vedi tutto →</button>
        </div>

        <div className="feed">
          <FeedRow tone="danger" pill="DOMANI" title="Macelleria Ferri — fattura €1.240"
            body="Pagamento entro il 6 maggio. Saldo cassa proiettato: ok." time="2 min fa" />
          <FeedRow tone="warn" title="Sabato cena: serve un cameriere extra"
            body="64 coperti previsti, hai 3 in sala. Soglia di stress superata: aggiungi Tommaso 19—24." time="15 min fa" />
          <FeedRow tone="warn" title="Olio EVO Frantoio Rinaldi: prezzo +22%"
            body="In 6 settimane il prezzo è passato da €5,80 a €7,08/lt. Volume tuo 18 lt/mese → impatto €78/mese." time="1 ora fa" />
          <FeedRow tone="info" title="Nuova prenotazione confermata"
            body="Famiglia Russo · 4 coperti · oggi 20:30 · ⚠ 1 celiaco segnalato" time="3 ore fa" />
          <FeedRow tone="brand" title="Report del lunedì inviato"
            body="Settimana 18 · 3 azioni consegnate su WhatsApp alle 7:30. Risparmio stimato: €212/mese." time="ieri" />
        </div>
      </section>

      {/* Chart + weekday bars */}
      <section className="card">
        <div className="card__head">
          <div>
            <h2 className="card__title">Ricavi, costi e margine</h2>
            <div className="card__sub">Maggio 2026 · al 5 del mese</div>
          </div>
          <div className="tabs">
            {["Settimana","Mese","3 mesi","Anno","Tutto"].map(t => (
              <button key={t} aria-pressed={range === t} onClick={() => setRange(t)}>{t}</button>
            ))}
          </div>
        </div>

        <div className="chart__legend">
          <span><i style={{background:"var(--brand)"}}/> Ricavi</span>
          <span><i style={{background:"var(--warn)"}}/> Costi</span>
          <span><i style={{background:"var(--brand-deep)", borderRadius:"50%"}}/> Margine</span>
        </div>

        <RevenueChart />
      </section>

      <section className="card">
        <div className="card__head">
          <div>
            <h2 className="card__title">Media incassi per giorno</h2>
            <div className="card__sub">Ultimo anno · Sabato è il giorno di punta</div>
          </div>
          <div className="tabs">
            <button>1m</button>
            <button>3m</button>
            <button aria-pressed="true">1a</button>
            <button>Tutto</button>
          </div>
        </div>

        <div className="weekbars">
          {[
            ["LUN", 580, "low"], ["MAR", 720, ""], ["MER", 690, ""], ["GIO", 840, ""],
            ["VEN", 1220, ""], ["SAB", 1560, "peak"], ["DOM", 1180, ""],
          ].map(([d, v, k]) => {
            const h = (v / 1560) * 100;
            return (
              <div key={d} className="weekbar">
                <span className="weekbar__val">€{v.toLocaleString("it-IT")}</span>
                <span className={"weekbar__bar" + (k ? " weekbar__bar--" + k : "")} style={{height: h + "%"}} />
                <span className="weekbar__day">{d}</span>
              </div>
            );
          })}
        </div>

        <p className="muted" style={{fontSize:"13px", marginTop:"14px", maxWidth:"720px"}}>
          Sabato è il tuo giorno di punta (€1.560 medio). Il martedì è sotto la media settoriale del 12% — c'è margine di crescita con eventi infrasettimanali.
        </p>
      </section>

      {/* Festività + drift */}
      <div style={{display:"grid", gridTemplateColumns:"1.4fr 1fr", gap:"22px"}} className="grid-2">
        <section className="card">
          <div className="card__head">
            <div>
              <h2 className="card__title">Festività in arrivo</h2>
              <div className="card__sub">Previsione · prossimi 60 giorni</div>
            </div>
          </div>
          <div className="holidays">
            <Holiday day="2" m="Giu" name="Festa della Repubblica" sub="Martedì · ponte 1-2 giugno" forecast="€1.180" delta="-12% vs 2025" neg />
            <Holiday day="15" m="Giu" name="Ultima del Giro" sub="Domenica · eventi sportivi" forecast="€1.860" delta="+18% vs media dom." />
            <Holiday day="29" m="Giu" name="San Pietro · weekend" sub="Lunedì festivo a Bologna" forecast="€1.420" delta="+9% vs lun. medio" />
            <Holiday day="15" m="Ago" name="Ferragosto" sub="Sabato · città semivuota" forecast="€640" delta="-58% vs sab. medio" neg />
          </div>
        </section>

        <section className="card">
          <div className="card__head">
            <div>
              <h2 className="card__title">Avvisi sulla deriva costi</h2>
              <div className="card__sub">3 nuovi questa settimana</div>
            </div>
            <span className="chip chip--warn"><Icon name="alert" size={12}/> 3</span>
          </div>
          <div className="drift">
            <DriftRow title="Burrata 250g — La Sorgente" pill="+18%" tone="warn"
              body={<>+18% in 6 settimane · volume mensile <strong>12 kg</strong> · impatto <strong>+94 €/mese</strong></>}
              cta="Vedi alternativa" />
            <DriftRow title="Olio EVO Frantoio Rinaldi" pill="+22%" tone="warn"
              body={<>+22% in 8 settimane · volume <strong>18 lt/mese</strong> · impatto <strong>+78 €/mese</strong></>}
              cta="Confronta fornitori" />
            <DriftRow title="Software dimenticati" pill="2 idle" tone="info"
              body={<>2 abbonamenti senza attività da 4 mesi · risparmio totale <strong>+118 €/mese</strong></>}
              cta="Disdici" />
          </div>
        </section>
      </div>

      <style>{`
        @media (max-width: 1180px) { .grid-2 { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}

function FeedRow({ tone, pill, title, body, time }) {
  return (
    <div className="feed__row">
      <span className={"feed__bullet feed__bullet--" + tone} />
      <div>
        <div className="feed__title">
          {title}
          {pill ? <span className="pill">{pill}</span> : null}
        </div>
        <div className="feed__body">{body}</div>
      </div>
      <div className="feed__time">{time}</div>
    </div>
  );
}

function Holiday({ day, m, name, sub, forecast, delta, neg }) {
  return (
    <div className="holiday">
      <div className="holiday__date">
        <div className="holiday__day">{day}</div>
        <div className="holiday__month">{m}</div>
      </div>
      <div>
        <div className="holiday__name">{name}</div>
        <div className="holiday__sub">{sub}</div>
        <div className="holiday__forecast">{forecast}</div>
        <div className={"holiday__delta" + (neg ? " neg" : "")}>{delta}</div>
      </div>
    </div>
  );
}

function DriftRow({ title, pill, tone, body, cta }) {
  return (
    <div className="drift__row">
      <div>
        <div className="drift__title">
          {title}
          <span className={"chip chip--" + tone}>{pill}</span>
        </div>
        <div className="drift__body">{body}</div>
      </div>
      <button className="btn btn--small">{cta} →</button>
    </div>
  );
}

/* Smooth area chart */
function RevenueChart() {
  const months = ["Mag '25","Giu","Lug","Ago","Set","Ott","Nov","Dic","Gen '26","Feb","Mar","Apr","Mag"];
  const ricavi = [16.4, 18.2, 21.0, 24.8, 19.6, 18.4, 17.8, 22.4, 19.2, 18.6, 20.1, 21.7, 23.5];
  const costi  = [12.1, 13.4, 15.2, 17.0, 14.8, 13.9, 13.4, 16.4, 14.2, 13.8, 14.6, 15.7, 17.6];

  const W = 1000, H = 260, P = { l: 50, r: 16, t: 16, b: 30 };
  const max = 30, min = 0;
  const x = i => P.l + (i * (W - P.l - P.r)) / (months.length - 1);
  const y = v => P.t + (1 - (v - min) / (max - min)) * (H - P.t - P.b);

  const path = arr => arr.map((v, i) => (i ? "L" : "M") + x(i) + "," + y(v)).join(" ");
  const area = arr => path(arr) + ` L ${x(arr.length-1)},${y(0)} L ${x(0)},${y(0)} Z`;

  const margine = ricavi.map((r,i) => r - costi[i]);

  return (
    <div className="chart">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="gricavi" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.22"/>
            <stop offset="100%" stopColor="var(--brand)" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="gcosti" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--warn)" stopOpacity="0.16"/>
            <stop offset="100%" stopColor="var(--warn)" stopOpacity="0"/>
          </linearGradient>
        </defs>
        {[8, 15, 22, 30].map(g => (
          <g key={g}>
            <line x1={P.l} x2={W - P.r} y1={y(g)} y2={y(g)} stroke="var(--line)" strokeDasharray="2 4"/>
            <text x={P.l - 8} y={y(g) + 4} textAnchor="end" fontSize="10" fill="var(--ink-3)" fontFamily="var(--font-mono)">{g}k</text>
          </g>
        ))}
        <path d={area(ricavi)} fill="url(#gricavi)" />
        <path d={path(ricavi)} stroke="var(--brand)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <path d={area(costi)} fill="url(#gcosti)" />
        <path d={path(costi)} stroke="var(--warn)" strokeWidth="2" fill="none" strokeDasharray="4 3" strokeLinecap="round"/>
        {margine.map((v, i) => (
          <circle key={i} cx={x(i)} cy={y(v + costi[i])} r="3" fill="var(--brand-deep)"/>
        ))}
        {months.map((m, i) => (
          <text key={i} x={x(i)} y={H - 8} textAnchor="middle" fontSize="10" fill="var(--ink-3)">{m}</text>
        ))}
      </svg>
    </div>
  );
}

window.Panoramica = Panoramica;
