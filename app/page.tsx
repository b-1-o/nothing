'use client';

import { useMemo, useState } from 'react';
import MicroSlats from '../components/MicroSlats';

const variants = [
  { name: 'Silver', code: '#dfe1e4', price: '$499' },
  { name: 'Black', code: '#15171a', price: '$499' },
  { name: 'Pink', code: '#e6bfc5', price: '$499' }
];

const tiers = ['8 + 128 GB', '8 + 256 GB', '12 + 256 GB'];

const specs = [
  ['Display', '6.83” flexible AMOLED', '1260 × 2800 · 450 PPI · 10-bit · 144 Hz'],
  ['Peak brightness', '5000 nits', '1600 nits outdoor · 800 nits typical'],
  ['Processor', 'Snapdragon 7 Gen 4', '4 nm · Kryo 8-core · up to 2.8 GHz · Adreno 722'],
  ['Main camera', '50 MP · f/1.88 · OIS/EIS', '1/1.56” sensor · 2× in-sensor zoom'],
  ['Periscope', '50 MP · f/2.88 · 3.5× optical', '7× in-sensor zoom · 140× ultra zoom'],
  ['Battery', '5,080 mAh', '50 W charging · 7.5 W reverse wired'],
  ['Connectivity', 'Wi‑Fi 6 · Bluetooth 5.4 · NFC', '5G bands include n1/n2/n3/n5/n7/n12/n25/n28/n41/n48/n66/n71/n77/n78'],
  ['Protection', 'IP65', 'Water/dust resistance; tested to 25 cm for up to 20 min'],
  ['Software', 'Nothing OS 4.1 · Android 16', '3 Android updates · 6 years security patches']
];

function PhoneVisual({ color }: { color: string }) {
  return (
    <div className="phone-wrap" style={{ ['--device' as string]: color }}>
      <div className="phone-shadow" />
      <div className="phone">
        <div className="camera-rail">
          <span className="lens" /><span className="lens" /><span className="lens" />
          <span className="camera-led" />
        </div>
        <div className="glyph glyph-top" /><div className="glyph glyph-mid" /><div className="glyph glyph-bottom" />
        <div className="brand">nothing</div>
      </div>
    </div>
  );
}

export default function Home() {
  const [variant, setVariant] = useState(0);
  const [tier, setTier] = useState(0);
  const selected = variants[variant];
  const capacity = useMemo(() => tiers[tier], [tier]);

  return (
    <main>
      <header className="nav shell">
        <a className="logo" href="#top">NOTHING<span>°</span></a>
        <nav><a href="#features">Features</a><a href="#specs">Specs</a><a href="#gallery">Gallery</a><a href="#buy">Buy</a></nav>
        <a className="menu" href="#buy">01</a>
      </header>

      <section id="top" className="hero">
        <div className="hero-slats"><MicroSlats /></div>
        <div className="hero-copy shell">
          <p className="eyebrow">PHONE (4a) PRO</p>
          <h1>Built<br /><em>different.</em></h1>
          <p className="lede">A pro camera system, a 144 Hz AMOLED display and Nothing OS with Essential AI tools — stripped back, sharpened up.</p>
          <div className="hero-actions">
            <a className="button button-light" href="#buy">Buy Phone (4a) Pro</a>
            <a className="text-link" href="#specs">Explore specs ↗</a>
          </div>
        </div>
        <div className="hero-product shell">
          <PhoneVisual color={selected.code} />
          <div className="hero-meta"><span>03 / 03 camera system</span><span>140× ultra zoom*</span></div>
        </div>
      </section>

      <section id="features" className="intro shell section-pad">
        <div><span className="section-kicker">01 — Photography</span><h2>Zoom further.<br />See more.</h2></div>
        <div className="feature-copy">
          <p>Three cameras. Sony sensor. TrueLens Engine 4. Ultra XDR. The setup is made to keep detail intact when you move from street shots to long-range frames.</p>
          <div className="stat-row">
            <div><strong>50 MP</strong><span>Main + periscope</span></div>
            <div><strong>3.5×</strong><span>Optical zoom</span></div>
            <div><strong>140×</strong><span>Ultra zoom</span></div>
          </div>
        </div>
      </section>

      <section className="camera-band">
        <div className="shell camera-grid">
          <div className="camera-orbit"><div className="orbit-line orbit-one" /><div className="orbit-line orbit-two" /><div className="camera-core"><span>4a</span></div></div>
          <div><span className="section-kicker">02 — Pro 3 camera system</span><h2>Rapid shutter.<br />Steady detail.</h2><p>OIS + EIS, autofocus with PDAF, 2× in-sensor zoom and Night Mode are built into the default camera experience.</p></div>
        </div>
      </section>

      <section id="gallery" className="display-section section-pad">
        <div className="shell">
          <div className="display-copy"><span className="section-kicker">03 — Display</span><h2>144 Hz.<br />No dead weight.</h2><p>A 6.83” flexible AMOLED with 10-bit colour, 1.07 billion colours, 2,500 Hz touch sampling and up to 5,000 nits peak brightness.</p></div>
          <div className="display-frame"><div className="display-screen"><div className="display-orb" /><div className="display-grid" /><span>144</span></div></div>
        </div>
      </section>

      <section id="specs" className="specs shell section-pad">
        <div className="specs-head"><div><span className="section-kicker">04 — Specs</span><h2>The numbers.</h2></div><p>Everything the Phone (4a) Pro ships with, laid out without the noise.</p></div>
        <div className="spec-table">{specs.map(([label, main, detail]) => <div className="spec-row" key={label}><span>{label}</span><strong>{main}</strong><small>{detail}</small></div>)}</div>
      </section>

      <section id="buy" className="buy-section">
        <div className="shell buy-grid">
          <div>
            <span className="section-kicker">05 — Choose yours</span>
            <h2>Make it<br /><em>yours.</em></h2>
            <p>Phone (4a) Pro. Available in Silver, Black and Pink.</p>
            <div className="swatches">{variants.map((v, i) => <button key={v.name} className={i === variant ? 'swatch active' : 'swatch'} onClick={() => setVariant(i)} aria-label={v.name}><span style={{ background: v.code }} />{v.name}</button>)}</div>
          </div>
          <div className="buy-card">
            <div className="mini-phone"><PhoneVisual color={selected.code} /></div>
            <div className="buy-title"><span>PHONE (4a) PRO</span><strong>{selected.name}</strong></div>
            <div className="tier-tabs">{tiers.map((t, i) => <button key={t} className={i === tier ? 'active' : ''} onClick={() => setTier(i)}>{t}</button>)}</div>
            <div className="buy-bottom"><div><span>Selected</span><strong>{selected.name} · {capacity}</strong></div><b>{selected.price}</b></div>
            <button className="cart">Add to bag <span>↗</span></button>
          </div>
        </div>
      </section>

      <footer className="footer shell"><span>Nothing — Phone (4a) Pro</span><span>Built different.</span><span>© 2026</span></footer>
    </main>
  );
}
