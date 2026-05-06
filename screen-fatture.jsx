/* Fatture screen — urgent / upcoming table / paid */

function Fatture() {
  const [tab, setTab] = React.useState("Tutte");

  return (
    <>
      <section className="kpis">
        <div className="kpi kpi--brand">
          <span className="kpi__chip">Settimana</span>
          <span className="kpi__label">Da pagare questa sett.</span>
          <span className="kpi__value">€1.620</span>
          <span className="kpi__delta">2 in scadenza nei prossimi 5gg</span>
        </div>
        <div className="kpi">
          <span className="kpi__label">Da pagare totale</span>
          <span className="kpi__value">€8.430</span>
          <span className="kpi__delta">14 fatture · scadenza media 22gg</span>
        </div>
        <div className="kpi">
          <span className="kpi__label">Pagate questo mese</span>
          <span className="kpi__value">€12.180</span>
          <span className="kpi__delta">22 fatture · tutte in tempo</span>
        </div>
        <div className="kpi">
          <span className="kpi__label">Insoluti</span>
          <span className="kpi__value">€0</span>
          <span className="kpi__delta">tutto in regola</span>
        </div>
      </section>

      <div className="row row--between">
        <div className="tabs">
          {["Tutte","Da pagare","Pagate","In contestazione"].map(t => (
            <button key={t} aria-pressed={tab === t} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>
        <div className="row">
          <button className="btn btn--small"><Icon name="filter" size={14}/> Filtri</button>
          <button className="btn btn--small"><Icon name="download" size={14}/> Esporta</button>
        </div>
      </div>

      <section className="card inv-urgent">
        <div className="card__head">
          <div>
            <h2 className="card__title" style={{display:"inline-flex", alignItems:"center", gap:"10px"}}>
              <Icon name="alert" size={18}/> Urgenze · entro 5 giorni
            </h2>
            <div className="card__sub">2 fatture · totale €1.620</div>
          </div>
        </div>

        <div className="reslist">
          <div className="invrow">
            <div>
              <div className="invrow__name">Macelleria Ferri Bologna</div>
              <div className="invrow__sub">FT 2026-04-187 · sett. 17 · Carne fresca · 18 kg manzo, 4 kg vitello</div>
            </div>
            <div className="invrow__amt">€1.240,00</div>
            <div className="invrow__due">
              <span className="invrow__due__lbl">Scade</span>
              <span className="invrow__due__val urgent">domani · 6 mag</span>
            </div>
            <button className="btn btn--primary btn--small"><Icon name="check" size={14}/> Segna pagata</button>
          </div>
          <div className="invrow">
            <div>
              <div className="invrow__name">Centrale del Latte di Modena</div>
              <div className="invrow__sub">FT 2026-04-44 · sett. 17-18 · Latte intero, panna, mascarpone</div>
            </div>
            <div className="invrow__amt">€380,00</div>
            <div className="invrow__due">
              <span className="invrow__due__lbl">Scade</span>
              <span className="invrow__due__val urgent">7 mag · 2 gg</span>
            </div>
            <button className="btn btn--primary btn--small"><Icon name="check" size={14}/> Segna pagata</button>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="card__head">
          <div>
            <h2 className="card__title">In arrivo · prossimi 30 giorni</h2>
            <div className="card__sub">12 fatture · totale €6.810</div>
          </div>
        </div>

        <div style={{overflowX:"auto"}}>
          <table className="itable">
            <thead>
              <tr>
                <th>Fornitore</th>
                <th>Descrizione</th>
                <th style={{textAlign:"right"}}>Importo</th>
                <th>Scadenza</th>
                <th>Stato</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Az. Agricola Bergonzini", "FT 2026-04-92", "Vino sfuso · 60lt Sangiovese, 40lt Chardonnay", "€890", "12 mag · 7 gg", "Pianificata"],
                ["Enel Energia", "FT 2026-04-7712", "Bolletta luce aprile · 1.842 kWh", "€312", "14 mag · 9 gg", "RID"],
                ["Compagnia Olearia Rinaldi", "FT 2026-04-58", "Olio EVO 12 lt · ↑ vedi avviso", "€240", "18 mag · 13 gg", "Pianificata"],
                ["Ortofrutta Bonanni", "FT 2026-05-3", "Frutta e verdura settimana 18", "€420", "19 mag · 14 gg", "Pianificata"],
                ["Hera Gas", "FT 2026-04-2298", "Bolletta gas aprile · cucina + acqua calda", "€198", "22 mag · 17 gg", "RID"],
                ["Caseificio La Sorgente", "FT 2026-04-110", "Burrata, mozzarella, ricotta · ↑ vedi avviso", "€340", "24 mag · 19 gg", "Pianificata"],
                ["Studio Bertoldi", "FT 2026-04-22", "Tenuta contabilità · maggio", "€220", "31 mag · 26 gg", "SDD"],
              ].map((row, i) => (
                <tr key={i}>
                  <td>
                    <div style={{color:"var(--ink)", fontWeight:500}}>{row[0]}</div>
                    <span className="ref">{row[1]}</span>
                  </td>
                  <td>{row[2]}</td>
                  <td className="num">{row[3]}</td>
                  <td>{row[4]}</td>
                  <td><span className={"chip " + (row[5] === "RID" || row[5] === "SDD" ? "chip--info" : "chip--brand")}>{row[5]}</span></td>
                  <td><button className="btn btn--small btn--ghost">Posticipa</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card">
        <div className="card__head">
          <div>
            <h2 className="card__title">Pagate questo mese</h2>
            <div className="card__sub">22 fatture · totale €12.180 · tutte in tempo</div>
          </div>
          <button className="card__action">Vedi tutte →</button>
        </div>
        <div className="reslist">
          {[
            ["Ortofrutta Bonanni", "FT 2026-04-118 · pagata 2 mag", "Frutta e verdura settimana 17", "€420,00", "2 mag · bonifico"],
            ["Macelleria Ferri Bologna", "FT 2026-04-156 · pagata 28 apr", "Carne fresca settimana 16", "€1.180,00", "28 apr · bonifico"],
            ["Iliad Business", "FT 2026-04-44ZX · pagata 26 apr", "Connettività mese di aprile", "€19,99", "26 apr · RID"],
          ].map((r, i) => (
            <div className="invrow" key={i}>
              <div>
                <div className="invrow__name">{r[0]}</div>
                <div className="invrow__sub">{r[1]} · {r[2]}</div>
              </div>
              <div className="invrow__amt">{r[3]}</div>
              <div className="invrow__due">
                <span className="invrow__due__lbl">Pagata</span>
                <span className="invrow__due__val">{r[4]}</span>
              </div>
              <span className="chip chip--good"><Icon name="check" size={12}/> Pagata</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

window.Fatture = Fatture;
