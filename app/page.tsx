'use client';

import Image from 'next/image';
import { useEffect, useState, useRef, type ReactNode } from 'react';
import MicroSlats from '../components/MicroSlats';

const variants = [
  { name: 'Silver', price: '$499', note: 'White / silver finish', image: '/nothing/assets/white_back_and_front.png' },
  { name: 'Black', price: '$499', note: 'Deep black finish', image: '/nothing/assets/black_front_and_back.png' },
  { name: 'Pink', price: '$499', note: 'Soft pink finish', image: '/nothing/assets/pink_front_and_back.png' }
];

const capacities = ['8GB + 128GB', '8GB + 256GB', '12GB + 256GB'];

const specs = [
  ['Dimensions', '163.6 × 76.6 × 7.9 mm', '210 g'],
  ['Display', '6.83” flexible AMOLED', '1260 × 2800 · 450 PPI · 10-bit'],
  ['Refresh', 'Adaptive 144 Hz', 'Up to 2,500 Hz touch sampling · 2160 Hz PWM'],
  ['Brightness', '5000 nits peak', '1600 nits outdoor · 800 nits typical'],
  ['Processor', 'Snapdragon 7 Gen 4', '4 nm TSMC · Kryo 8-core · up to 2.8 GHz'],
  ['Memory', 'LPDDR5x + UFS 3.1', '8GB / 12GB RAM · 128GB / 256GB storage'],
  ['Main camera', '50 MP · f/1.88', '1/1.56” · OIS + EIS · 2× in-sensor zoom'],
  ['Periscope', '50 MP · f/2.88', '3.5× optical · 7× in-sensor · 140× ultra zoom'],
  ['Ultra-wide', '120° field of view', 'f/2.2 · 1/4” sensor'],
  ['Front camera', '32 MP · f/2.2', '89° field of view · 1/3.44” sensor'],
  ['Battery', '5,080 mAh', '50 W wired · 7.5 W reverse wired'],
  ['Connectivity', 'Wi‑Fi 6 · Bluetooth 5.4', '5G · NFC · eSIM · Dual Nano-SIM'],
  ['Durability', 'IP65', '25 cm immersion up to 20 minutes'],
  ['Software', 'Nothing OS 4.1 · Android 16', '3 Android updates · 6 years security patches']
];

const box = [
  'Nothing Phone (4a) Pro',
  'Nothing Cable (C-C) 100 cm',
  'Screen protector — pre-applied',
  'Phone (4a) Pro Case',
  'SIM tray ejector tool',
  'Safety information & warranty card'
];

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <div data-reveal className={className} style={{ ['--reveal-delay' as string]: delay + 'ms' }}>
      {children}
    </div>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return <span className="pill">{children}</span>;
}

export default function Home() {
  useReveal();

  useEffect(() => {
    const src = '/nothing/assets/Cough_Nothing_Phone_2_Stock_Notification-649463-mobiles24.mp3';
    const pool = Array.from({ length: 5 }, () => {
      const audio = new Audio(src);
      audio.preload = 'auto';
      audio.volume = 0.32;
      return audio;
    });
    let cursor = 0;
    const playClick = () => {
      const audio = pool[cursor % pool.length];
      cursor += 1;
      audio.currentTime = 0;
      void audio.play().catch(() => undefined);
    };

    document.addEventListener('click', playClick, true);
    return () => {
      document.removeEventListener('click', playClick, true);
      pool.forEach((audio) => {
        audio.pause();
        audio.src = '';
      });
    };
  }, []);

  const [variant, setVariant] = useState(0);
  const [capacity, setCapacity] = useState(0);
  const selected = variants[variant];

  return (
    <main>
      <div className="global-micro-bg" aria-hidden="true">
        <MicroSlats
          preset="swell"
          color="#9f9898"
          glintColor="#ffffff"
          backgroundColor="#090909"
          slatWidth={10}
          slatHeight={15}
          gap={1}
          roundness={1}
          interactive
          cursorStrength={1}
          cursorSize={40}
          swirl={0}
          trail={1.2}
          lean={0}
          intro={false}
          direction={129}
          chop={0}
          fog={0.7}
          introDuration={0.6}
        />
      </div>
      <header className="site-nav">
        <div className="nav-inner">
          <a className="wordmark" href="#top" aria-label="Nothing Phone (4a) Pro">NOTHING<span>•</span></a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            <a href="#camera">Camera</a>
            <a href="#display">Display</a>
            <a href="#performance">Performance</a>
            <a href="#specs">Specs</a>
          </nav>
          <a className="nav-buy" href="#buy">Buy</a>
        </div>
      </header>

      <section id="top" className="hero">
      </section>

      <section className="marquee" aria-label="Key specifications">
        <div className="marquee-track">
          <span>03 cameras</span><i>·</i><span>Sony sensor</span><i>·</i><span>140× zoom</span><i>·</i>
          <span>144 Hz AMOLED</span><i>·</i><span>5000 nits</span><i>·</i><span>50 W charging</span><i>·</i>
          <span>Nothing OS 4.1</span><i>·</i><span>03 cameras</span><i>·</i>
        </div>
      </section>

      <section id="camera" className="section section-dark">
        <div className="shell">
          <Reveal className="section-intro">
            <div>
              <p className="section-index">02 — Camera</p>
              <h2>Get closer.<br /><em>Go further.</em></h2>
            </div>
            <div className="section-intro-copy">
              <p>Three cameras tuned around a Sony sensor, with computational imaging doing the work between the lens and the final frame.</p>
              <div className="chip-row"><Pill>50 MP main</Pill><Pill>50 MP periscope</Pill><Pill>120° ultra-wide</Pill></div>
            </div>
          </Reveal>

          <div className="camera-feature-grid">
            <Reveal className="visual-card camera-image-card">
              <Image src="/nothing/assets/camera.jpg" alt="Phone (4a) Pro camera hardware" fill sizes="(max-width: 900px) 100vw, 55vw" className="original-image" loading="lazy" />
              <div className="image-overlay" />
              <div className="visual-caption"><span>PRO 3 CAMERA SYSTEM</span><span>01</span></div>
            </Reveal>

            <div className="camera-stats">
              <Reveal className="big-stat" delay={80}><strong>140×</strong><span>ultra zoom</span></Reveal>
              <Reveal className="camera-detail" delay={130}><span>PERISCOPE</span><strong>3.5× optical</strong><p>7× in-sensor zoom, OIS + EIS, PDAF and up to 140× ultra zoom.</p></Reveal>
              <Reveal className="camera-detail" delay={180}><span>ENGINE</span><strong>TrueLens Engine 4</strong><p>Ultra XDR, motion photo, Portrait Optimiser, Night Mode and 12-layer AI Semantic Segmentation.</p></Reveal>
            </div>
          </div>

          <Reveal className="camera-anatomy" delay={70}>
            <div className="camera-anatomy-head">
              <div><p className="section-index">02.1 — Hardware anatomy</p><h3>Inside the camera.</h3></div>
              <p>Three views of the physical camera architecture and rear assembly, kept in their original proportions.</p>
            </div>
            <div className="camera-anatomy-grid">
              <div className="anatomy-card anatomy-top">
                <Image src="/nothing/assets/cama.png" alt="Upper rear camera assembly without background" fill sizes="(max-width: 900px) 100vw, 33vw" className="original-image" loading="lazy" />
                <span>UPPER CAMERA ASSEMBLY</span>
              </div>
              <div className="anatomy-card">
                <Image src="/nothing/assets/cameraview.jpeg" alt="Nothing Phone camera assembly exploded view" fill sizes="(max-width: 900px) 100vw, 33vw" className="original-image" loading="lazy" />
                <span>CAMERA / EXPLODED VIEW</span>
              </div>
              <div className="anatomy-card">
                <Image src="/nothing/assets/back phone.jpeg" alt="Nothing Phone rear assembly with battery visible" fill sizes="(max-width: 900px) 100vw, 33vw" className="original-image" loading="lazy" />
                <span>REAR ASSEMBLY / BATTERY</span>
              </div>
            </div>
          </Reveal>

          <Reveal className="camera-bottom-card" delay={80}>
            <div><span>VIDEO</span><strong>4K Ultra XDR</strong></div>
            <div><span>FRAME RATE</span><strong>30 FPS</strong></div>
            <div><span>SLO‑MO</span><strong>1080p · 120 FPS</strong></div>
            <div><span>FRONT</span><strong>32 MP</strong></div>
          </Reveal>
        </div>
      </section>

      <section className="section slats-section">
        <div className="shell slats-layout">
          <Reveal className="slats-copy">
            <p className="section-index">03 — Interface</p>
            <h2>Nothing<br /><em>stays quiet.</em></h2>
            <p className="muted-copy">The same MicroSlats surface continues through the dark parts of the page, so the field remains a real background system rather than a demo card.</p>
            <div className="slats-note"><span>MICROSLATS / GLOBAL FIELD</span><span>MOVE · CLICK · EXPLORE</span></div>
          </Reveal>

          <Reveal className="slats-callout" delay={100}>
            <span className="slats-callout-index">03 / 09</span>
            <strong>One field.<br />Every dark surface.</strong>
            <p>There is no second isolated canvas here. The page shares one live MicroSlats field behind its dark surfaces.</p>
          </Reveal>
        </div>
      </section>

      <section id="display" className="section display-section">
        <div className="shell display-layout">
          <Reveal className="display-copy">
            <p className="section-index">04 — Display</p>
            <h2>Big, bright,<br /><em>effortless.</em></h2>
            <p className="muted-copy">6.83” flexible AMOLED. 10-bit colour. Adaptive 144 Hz. High touch response built for scroll, games and everyday motion.</p>
            <div className="display-metrics">
              <div><strong>5000</strong><span>nits peak</span></div>
              <div><strong>144</strong><span>Hz adaptive</span></div>
              <div><strong>10-bit</strong><span>1.07B colours</span></div>
            </div>
          </Reveal>
          <Reveal className="display-visual" delay={120}>
            <div className="screen-shell">
              <div className="screen-reflection" />
              <div className="screen-core">
                <span className="screen-number">144</span>
                <span className="screen-unit">HZ</span>
                <span className="screen-sub">ADAPTIVE REFRESH</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section lifestyle-section">
        <div className="shell lifestyle-grid">
          <Reveal className="lifestyle-visual">
            <Image src="/nothing/assets/girl with a phone.jpg" alt="Woman using a Nothing Phone (4a) Pro" fill sizes="(max-width: 820px) 100vw, 52vw" className="original-image" loading="lazy" />
            <div className="lifestyle-label"><span>04.5 — LIFESTYLE</span><span>NOTHING, IN MOTION.</span></div>
          </Reveal>
          <Reveal className="lifestyle-copy" delay={100}>
            <p className="section-index">04.5 — In use</p>
            <h2>Designed<br /><em>to move.</em></h2>
            <p className="muted-copy">Product photography stays in its supplied proportions, outside the hero, as part of the real-world product story.</p>
          </Reveal>
        </div>
      </section>

      <section id="performance" className="section performance-section">
        <div className="shell">
          <Reveal className="section-intro performance-intro">
            <div><p className="section-index">05 — Performance</p><h2>Fast where<br /><em>it counts.</em></h2></div>
            <div className="section-intro-copy"><p>Snapdragon 7 Gen 4, LPDDR5x and UFS 3.1 keep the everyday stack responsive without turning the interface into noise.</p></div>
          </Reveal>

          <div className="performance-grid">
            <Reveal className="performance-image">
              <Image src="/nothing/assets/matrix.jpg" alt="Nothing Phone (4a) Pro system visual" fill sizes="(max-width: 900px) 100vw, 52vw" className="original-image" loading="lazy" />
              <div className="image-overlay dark-overlay" />
              <div className="image-label"><span>QUALCOMM SNAPDRAGON 7 GEN 4</span><span>4 NM</span></div>
            </Reveal>

            <div className="performance-list">
              <Reveal className="perf-row"><span>CPU</span><strong>8-core Kryo</strong><small>Up to 2.8 GHz</small></Reveal>
              <Reveal className="perf-row" delay={60}><span>GPU</span><strong>Adreno 722</strong><small>Qualcomm graphics</small></Reveal>
              <Reveal className="perf-row" delay={110}><span>NPU</span><strong>Hexagon NPU</strong><small>Qualcomm AI Engine</small></Reveal>
              <Reveal className="perf-row" delay={160}><span>STORAGE</span><strong>UFS 3.1</strong><small>Up to 256 GB</small></Reveal>
              <Reveal className="perf-row" delay={210}><span>MEMORY</span><strong>LPDDR5x</strong><small>Up to 12 GB RAM</small></Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section battery-section">
        <div className="shell">
          <Reveal className="battery-header"><p className="section-index">06 — Battery</p><h2>Power that<br /><em>keeps moving.</em></h2></Reveal>
          <div className="battery-grid">
            <Reveal className="battery-image">
              <Image src="/nothing/assets/battery.jpg" alt="Nothing Phone (4a) Pro battery" fill sizes="(max-width: 900px) 100vw, 50vw" className="original-image" loading="lazy" />
              <div className="image-overlay" />
              <span className="image-label single">50 W FAST CHARGING</span>
            </Reveal>
            <div className="battery-facts">
              <Reveal className="battery-number"><strong>5,080</strong><span>mAh</span></Reveal>
              <Reveal className="battery-rule" delay={70}><span>CHARGING</span><strong>50 W</strong><small>PPS / PD / QC / UFCS</small></Reveal>
              <Reveal className="battery-rule" delay={120}><span>REVERSE</span><strong>7.5 W</strong><small>Reverse wired charging</small></Reveal>
              <Reveal className="battery-rule" delay={170}><span>INDIA</span><strong>5,400 mAh</strong><small>India-only configuration</small></Reveal>
            </div>
          </div>
        </div>
      </section>

      <section id="specs" className="section specs-section">
        <div className="shell">
          <Reveal className="specs-header">
            <div><p className="section-index">07 — Specs</p><h2>The numbers<br /><em>behind the object.</em></h2></div>
            <p className="muted-copy">A compact technical view of the Phone (4a) Pro, using the supplied product specification.</p>
          </Reveal>

          <div className="specs-table">
            {specs.map(([label, main, detail], index) => (
              <Reveal className="spec-row" key={label} delay={Math.min(index * 25, 250)}>
                <span>{label}</span><strong>{main}</strong><small>{detail}</small>
              </Reveal>
            ))}
          </div>

          <Reveal className="spec-gallery" delay={70}>
            <div className="spec-gallery-card"><Image src="/nothing/assets/specs.jpg" alt="Phone (4a) Pro specifications" fill sizes="(max-width: 720px) 100vw, 50vw" className="original-image" loading="lazy" /></div>
            <div className="spec-gallery-card"><Image src="/nothing/assets/specs1.jpg" alt="Phone (4a) Pro specification detail" fill sizes="(max-width: 720px) 100vw, 50vw" className="original-image" loading="lazy" /></div>
          </Reveal>
        </div>
      </section>

      <section className="section box-section">
        <div className="shell">
          <Reveal className="box-header"><p className="section-index">08 — In the box</p><h2>Nothing extra.<br /><em>Nothing missing.</em></h2></Reveal>
          <div className="box-layout">
            <div className="box-list">
              {box.map((item, index) => (
                <Reveal className="box-item" key={item} delay={index * 35}><span>0{index + 1}</span><strong>{item}</strong></Reveal>
              ))}
            </div>
            <Reveal className="box-visual" delay={100}>
              <Image src="/nothing/assets/white_back_and_front.png" alt="Nothing Phone (4a) Pro" fill sizes="(max-width: 900px) 100vw, 44vw" className="product-image contain-image" loading="lazy" />
            </Reveal>
          </div>
        </div>
      </section>

      <section id="buy" className="buy-section">
        <div className="shell buy-layout">
          <Reveal className="buy-copy">
            <p className="section-index">09 — Choose yours</p>
            <h2>Make it<br /><em>yours.</em></h2>
            <p>Phone (4a) Pro starts at $499. Choose a finish, then choose the memory configuration.</p>
            <div className="swatches" role="radiogroup" aria-label="Colours">
              {variants.map((item, index) => (
                <button key={item.name} type="button" className={'swatch ' + (variant === index ? 'active' : '')} onClick={() => setVariant(index)} aria-pressed={variant === index}>
                  <span className={'swatch-dot swatch-' + item.name.toLowerCase()} />{item.name}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal className="buy-card" delay={100}>
            <div className="buy-image">
              <Image
                key={selected.image}
                src={selected.image}
                alt={selected.name + ' Phone (4a) Pro front and back'}
                fill
                sizes="(max-width: 900px) 72vw, 30vw"
                className="product-image contain-image product-switch"
                loading="lazy"
              />
            </div>
            <div className="buy-product-title">
              <div><span>PHONE (4a) PRO</span><strong>{selected.name}</strong></div>
              <span className="buy-price">{selected.price}</span>
            </div>
            <p className="buy-note">{selected.note}</p>
            <div className="capacity-grid" role="radiogroup" aria-label="Storage">
              {capacities.map((item, index) => (
                <button key={item} type="button" className={capacity === index ? 'selected' : ''} onClick={() => setCapacity(index)} aria-pressed={capacity === index}>{item}</button>
              ))}
            </div>
            <div className="buy-summary"><span>{selected.name} · {capacities[capacity]}</span><strong>{selected.price}</strong></div>
            <a className="buy-cta" href="https://us.nothing.tech/products/phone-4a-pro" target="_blank" rel="noopener noreferrer">Add to bag <span>↗</span></a>
            <small className="buy-disclaimer">External purchase link · pricing and availability may change.</small>
          </Reveal>
        </div>
      </section>

      <footer className="footer">
        <div className="shell footer-inner"><span>NOTHING • PHONE (4a) PRO</span><span>Metal. Light. Motion.</span><span>© 2026</span></div>
      </footer>
    </main>
  );
}
