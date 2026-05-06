/* Shell + navigation. Renders sidebar (desktop) and topbar + bottom nav (mobile). */

const NAV = [
  { id: "panoramica", label: "Panoramica", icon: "home" },
  { id: "personale",  label: "Personale",  icon: "users" },
  { id: "prenotazioni", label: "Prenotazioni", icon: "calendar", badge: 14 },
  { id: "fatture", label: "Fatture", icon: "receipt", badge: 2, badgeKind: "warn" },
];

function Sidebar({ active, onChange }) {
  return (
    <aside className="sidebar">
      <div className="brand">mar<em>gine</em>.ai<sup>demo</sup></div>

      <div className="locale-card">
        <span className="locale-card__label">Locale</span>
        <span className="locale-card__name">Trattoria del Borgo</span>
        <span className="locale-card__meta">Bologna · 42 coperti · attivo da 41 mesi</span>
      </div>

      <nav className="nav">
        <span className="nav__label">Gestione</span>
        {NAV.map(n => (
          <button
            key={n.id}
            className="nav__item"
            aria-current={active === n.id ? "page" : undefined}
            onClick={() => onChange(n.id)}
          >
            <span className="nav__icon"><Icon name={n.icon} size={18} /></span>
            <span>{n.label}</span>
            {n.badge ? (
              <span className={"nav__badge" + (n.badgeKind === "warn" ? " nav__badge--warn" : "")}>{n.badge}</span>
            ) : null}
          </button>
        ))}
      </nav>

      <div className="user">
        <div className="user__avatar">G</div>
        <div>
          <div className="user__name">Gabriele Russo</div>
          <div className="user__role">Proprietario</div>
        </div>
        <a className="user__exit" href="index.html" title="Esci dalla demo" aria-label="Esci dalla demo"><Icon name="log-out" size={14} /></a>
      </div>
    </aside>
  );
}

function Topbar({ active, title, sub }) {
  return (
    <header className="topbar">
      <div>
        <div className="topbar__title">{title}</div>
        <div className="topbar__sub">{sub}</div>
      </div>
      <div className="topbar__actions">
        <div className="search desktop-only">
          <Icon name="search" size={16} />
          <input placeholder="Cerca fattura, fornitore, prenotazione…" />
          <span className="kbd">⌘K</span>
        </div>
        <button className="icon-btn" title="Notifiche"><Icon name="bell" size={16} /><span className="dot"/></button>
        <button className="icon-btn desktop-only" title="Impostazioni"><Icon name="settings" size={16} /></button>
      </div>
    </header>
  );
}

function MobileNav({ active, onChange }) {
  return (
    <nav className="mobnav">
      <div className="mobnav__inner">
        {NAV.map(n => (
          <button
            key={n.id}
            className="mobnav__item"
            aria-current={active === n.id ? "page" : undefined}
            onClick={() => onChange(n.id)}
          >
            <Icon name={n.icon} size={20} />
            <span className="mobnav__item__lbl">{n.label}</span>
            {n.badge ? <span className="mobnav__item__badge">{n.badge}</span> : null}
          </button>
        ))}
      </div>
    </nav>
  );
}

window.Sidebar = Sidebar;
window.Topbar = Topbar;
window.MobileNav = MobileNav;
window.NAV = NAV;
