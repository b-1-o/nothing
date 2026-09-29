'use client';

import { useMemo, useState } from 'react';
import MicroSlats from '../components/MicroSlats';

const BASE = process.env.NEXT_PUBLIC_BASE || '/nothing';

const variants = [
  { name: 'Silver', code: '#dfe1e4', price: '$499' },
  { name: 'Black', code: '#15171a', price: '$499' },
  { name: 'Pink', code: '#e6bfc5', price: '$499' }
];

const tiers = ['8 + 128 GB', '8 + 256 GB', '12 + 256 GB'];

const gallery = [
  { src: `${BASE}/assets/81kw6cCXt8L._AC_SL1500_.jpg`, alt: 'Phone (4a) Pro front' },
  { src: `${BASE}/assets/71MayknvFUL._AC_SL1500_.jpg`, alt: 'Phone (4a) Pro back Silver' },
  { src: `${BASE}/assets/71SCj2dl0aL._AC_SL1500_.jpg`, alt: 'Phone (4a) Pro camera system' },
  { src: `${BASE}/assets/71n5DFT6MnL._AC_SL1500_.jpg`, alt: 'Phone (4a) Pro side profile' },
  { src: `${BASE}/assets/81wZGJM0zEL._AC_SL1500_.jpg`, alt: 'Phone (4a) Pro in hand' },
  { src: `${BASE}/assets/71c-VHZLtrL._AC_SL1500_.jpg`, alt: 'Phone (4a) Pro detail' }
];

const specs = [
  ['Display', '6.83” flexible AMOLED', '1260 × 2800 · 450 PPI · 10-bit · 144 Hz · Gorilla Glass 7i'],
  ['Brightness', '5000 nits peak', '1600 outdoor · 800 typical · 2160 Hz PWM'],
  ['Processor', 'Snapdragon 7 Gen 4', '4 nm · Kryo 8-core up to 2.8 GHz · Adreno 722 · Hexagon NPU'],
  ['Main camera', '50 MP · f/1.88 · OIS & EIS', '1/1.56” · 2×2 OCL PDAF · 2× in-sensor zoom · ISR'],
  ['Periscope', '50 MP · f/2.88 · 3.5× optical', '7× in-sensor · 140× ultra zoom · OIS & EIS'],
  ['Ultra-wide', 'f/2.2 · 120° FOV', '1/4” sensor'],
  ['Front', '32 MP · f/2.2 · 89°', '1/3.44” sensor'],
  ['Battery', '5,080 mAh', '50 W · 7.5 W reverse · PPS / PD / QC'],
  ['Audio', 'Dual stereo speakers', '2 high-definition mics'],
  ['Connectivity', 'Wi‑Fi 6 · BT 5.4 · NFC · eSIM', '5G · Dual Nano-SIM'],
  ['Build', 'IP65 · 210 g', '163.6 × 76.6 × 7.9 mm · aluminium unibody'],
  ['Software', 'Nothing OS 4.1 · Android 16', '3 OS updates · 6 years security']
];

const box = [
  'Nothing Phone (4a) Pro',
  'Nothing Cable (C-C) 100 cm',
  'Screen protector (pre-applied)',
  'Phone (4a) Pro Case',
  'SIM tray ejector tool',
  'Safety information & warranty card'
];

function PhoneVisual({ color }: { color: string }) {
  return (
    <div className="phone-wrap" style={{ ['--device' as string]: color }}>
      <div className="phone-shadow" />
      <div className="phone">
        <div className="camera-rail">
          <span className="lens" />
          <span className="lens" />
          <span className="lens" />
          <span className="camera-led" />
        </div>
        <div className="glyph glyph-top" />
        <div className="glyph glyph-mid" />
        <div className="glyph glyph-bottom" />
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
        <a className="logo" href="#top">
          NOTHING<span>°</span>
        </a>
        <nav>
          <a href="#features">Features</a>
          <a href="#gallery">Gallery</a>
          <a href="#specs">Specs</a>
          <a href="#buy">Buy</a>
        </nav>
        <a className="menu" href="#buy">
          01
        </a>
      </header>

      <section id="top" className="hero">
        <div className="hero-slats">
          <MicroSlats
            color="#9a9a9a"
            glintColor="#f5f5f5"
            backgroundColor="#050506"
            interactive
          />
        </div>
        <div className="hero-copy shell">
          <p className="eyebrow">PHONE (4a) PRO</p>
          <h1>
            Built
            <br />
            <em>different.</em>
          </h1>
          <p className="lede">
            World’s first 140× ultra zoom*. Metal unibody. Pro 3 camera system with Sony sensor.
            Nothing OS 4.1 with Essential AI tools.
          </p>
          <div className="hero-actions">
            <a className="button button-light" href="#buy">
              Buy Phone (4a) Pro
            </a>
            <a className="text-link" href="#specs">
              Explore specs ↗
            </a>
          </div>
        </div>
        <div className="hero-product shell">
          <PhoneVisual color={selected.code} />
          <div className="hero-meta">
            <span>03 / 03 camera system</span>
            <span>140× ultra zoom*</span>
          </div>
        </div>
      </section>

      <section id="features" className="intro shell section-pad">
        <div>
          <span className="section-kicker">01 — Photography</span>
          <h2>
            Zoom further.
            <br />
            See more.
          </h2>
        </div>
        <div className="feature-copy">
          <p>
            Three cameras. Sony sensor. TrueLens Engine 4. Ultra XDR. From street shots to long-range
            frames, detail stays intact. 3.5× optical, 7× in-sensor, 140× ultra zoom.
          </p>
          <div className="stat-row">
            <div>
              <strong>50 MP</strong>
              <span>Main + periscope</span>
            </div>
            <div>
              <strong>3.5×</strong>
              <span>Optical zoom</span>
            </div>
            <div>
              <strong>140×</strong>
              <span>Ultra zoom</span>
            </div>
          </div>
        </div>
      </section>

      <section className="camera-band">
        <div className="shell camera-grid">
          <div className="camera-orbit">
            <div className="orbit-line orbit-one" />
            <div className="orbit-line orbit-two" />
            <div className="camera-core">
              <span>4a</span>
            </div>
          </div>
          <div>
            <span className="section-kicker">02 — Pro 3 camera system</span>
            <h2>
              Rapid shutter.
              <br />
              Steady detail.
            </h2>
            <p>
              OIS + EIS, PDAF, 2× in-sensor zoom, Night Mode and AI Semantic Segmentation (12 layers)
              built into the default experience. 4K Ultra XDR video at 30 fps.
            </p>
          </div>
        </div>
      </section>

      <section id="gallery" className="gallery-section section-pad">
        <div className="shell">
          <div className="gallery-head">
            <span className="section-kicker">03 — Gallery</span>
            <h2>
              It’s metal
              <br />
              now.
            </h2>
          </div>
          <div className="gallery-grid">
            {gallery.map((img, i) => (
              <figure key={img.src} className={`gallery-item item-${i % 3}`}>
                <img src={img.src} alt={img.alt} loading={i < 2 ? 'eager' : 'lazy'} decoding="async" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="display-section section-pad">
        <div className="shell display-inner">
          <div className="display-copy">
            <span className="section-kicker">04 — Display</span>
            <h2>
              144 Hz.
              <br />
              No dead weight.
            </h2>
            <p>
              6.83” flexible AMOLED, 10-bit colour, 1.07 billion colours, up to 2,500 Hz touch
              sampling and 5,000 nits peak. Adaptive 144 Hz. Corning® Gorilla® Glass 7i.
            </p>
          </div>
          <div className="display-frame">
            <div className="display-screen">
              <div className="display-orb" />
              <div className="display-grid" />
              <span>144</span>
            </div>
          </div>
        </div>
      </section>

      <section id="specs" className="specs shell section-pad">
        <div className="specs-head">
          <div>
            <span className="section-kicker">05 — Specs</span>
            <h2>The numbers.</h2>
          </div>
          <p>Everything the Phone (4a) Pro ships with, laid out without the noise.</p>
        </div>
        <div className="spec-table">
          {specs.map(([label, main, detail]) => (
            <div className="spec-row" key={label}>
              <span>{label}</span>
              <strong>{main}</strong>
              <small>{detail}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="inbox shell section-pad">
        <span className="section-kicker">06 — In the box</span>
        <h2>Everything you need.</h2>
        <ul className="box-list">
          {box.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section id="buy" className="buy-section">
        <div className="shell buy-grid">
          <div>
            <span className="section-kicker">07 — Choose yours</span>
            <h2>
              Make it
              <br />
              <em>yours.</em>
            </h2>
            <p>Phone (4a) Pro. Available in Silver, Black and Pink. From $499.</p>
            <div className="swatches">
              {variants.map((v, i) => (
                <button
                  key={v.name}
                  type="button"
                  className={i === variant ? 'swatch active' : 'swatch'}
                  onClick={() => setVariant(i)}
                  aria-label={v.name}
                >
                  <span style={{ background: v.code }} />
                  {v.name}
                </button>
              ))}
            </div>
          </div>
          <div className="buy-card">
            <div className="mini-phone">
              <PhoneVisual color={selected.code} />
            </div>
            <div className="buy-title">
              <span>PHONE (4a) PRO</span>
              <strong>{selected.name}</strong>
            </div>
            <div className="tier-tabs">
              {tiers.map((t, i) => (
                <button
                  key={t}
                  type="button"
                  className={i === tier ? 'active' : ''}
                  onClick={() => setTier(i)}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="buy-bottom">
              <div>
                <span>Selected</span>
                <strong>
                  {selected.name} · {capacity}
                </strong>
              </div>
              <b>{selected.price}</b>
            </div>
            <a
              className="cart"
              href="https://us.nothing.tech/products/phone-4a-pro"
              target="_blank"
              rel="noopener noreferrer"
            >
              Add to bag <span>↗</span>
            </a>
          </div>
        </div>
      </section>

      <footer className="footer shell">
        <span>Nothing — Phone (4a) Pro</span>
        <span>Built different.</span>
        <span>© 2026</span>
      </footer>
    </main>
  );
}
