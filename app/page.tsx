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

function Reveal({ children, className = '', delay = 0, id }: { children: ReactNode; className?: string; delay?: number; id?: string }) {
  return (
    <div id={id} data-reveal className={className} style={{ ['--reveal-delay' as string]: delay + 'ms' }}>
      {children}
    </div>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return <span className="pill">{children}</span>;
}

const scrollToBuy = (event: React.MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault();
  const target = document.getElementById('buy-config');
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.scrollY - 138;
  window.history.replaceState(null, '', '#buy-config');
  window.scrollTo({ top, behavior: 'smooth' });
};

export default function Home() {
  useReveal();

  useEffect(() => {
    const createPool = (src: string) =>
      Array.from({ length: 2 }, () => {
        const audio = new Audio(src);
        audio.preload = 'auto';
        audio.volume = 0.32;
        return audio;
      });

    const coughPool = createPool('/nothing/assets/Cough_Nothing_Phone_2_Stock_Notification-649463-mobiles24.mp3');
    const squigglePool = createPool('/nothing/assets/Squiggle_Nothing_Phone_1_Stock_Notification-645458-mobiles24.mp3');
    const playFrom = (pool: HTMLAudioElement[], cursorRef: { value: number }) => {
      const audio = pool[cursorRef.value % pool.length];
      cursorRef.value += 1;
      audio.currentTime = 0;
      void audio.play().catch(() => undefined);
    };

    const coughIndex = { value: 0 };
    const squiggleIndex = { value: 0 };
    const onDocumentClick = (event: MouseEvent) => {
      if ((event.target as Element | null)?.closest('[data-buy-sound-zone]')) return;
      playFrom(squigglePool, squiggleIndex);
    };
    const buyZone = document.querySelector<HTMLElement>('[data-buy-sound-zone]');
    const onBuyClick = () => playFrom(coughPool, coughIndex);

    document.addEventListener('click', onDocumentClick, true);
    buyZone?.addEventListener('click', onBuyClick);

    return () => {
      document.removeEventListener('click', onDocumentClick, true);
      buyZone?.removeEventListener('click', onBuyClick);
      [...coughPool, ...squigglePool].forEach((audio) => {
        audio.pause();
        audio.src = '';
      });
    };
  }, []);

  const [variant, setVariant] = useState(0);
  const [capacity, setCapacity] = useState(0);
  const [activeSpec, setActiveSpec] = useState(0);
  const selected = variants[variant];
  const activeSpecData = specs[activeSpec];
  const carouselStartX = useRef<number | null>(null);

  const changeVariant = (direction: number) => {
    setVariant((current) => (current + direction + variants.length) % variants.length);
  };

  const handleCarouselPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    carouselStartX.current = event.clientX;
  };

  const handleCarouselPointerCancel = () => {
    carouselStartX.current = null;
  };

  const handleCarouselPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (carouselStartX.current === null) return;
    const delta = event.clientX - carouselStartX.current;
    carouselStartX.current = null;
    if (Math.abs(delta) > 48) changeVariant(delta < 0 ? 1 : -1);
  };

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
          <a className="nav-buy" href="#buy-config" onClick={scrollToBuy}>Buy</a>
        </div>
      </header>

      <section id="top" className="hero">
        <div className="shell hero-content">
          <Reveal className="hero-copy">
            <div className="hero-kicker"><span>PHONE (4a) PRO</span><span>01 / 09</span></div>
            <h1>Built<br /><span>different.</span></h1>
            <p className="hero-lede">Metal. 140× ultra zoom. A 6.83” 144 Hz AMOLED display. Nothing OS 4.1 with Essential AI tools.</p>
            <div className="hero-actions">
              <a className="button button-light" href="#buy-config" onClick={scrollToBuy}>Shop Phone (4a) Pro</a>
              <a className="button button-ghost" href="#camera">Explore the system <span>↘</span></a>
            </div>
          </Reveal>

          <Reveal delay={130} className="hero-product">
            <div className="hero-product-glow" />
            <Image
              src="/nothing/assets/base pic rm bg.png"
              alt="Nothing Phone (4a) Pro hero product render"
              fill
              priority
              sizes="(max-width: 560px) 96vw, (max-width: 820px) 92vw, 52vw"
              className="hero-base-image"
            />
            <div className="hero-product-label"><span>SILVER / 8 + 128 GB</span><strong>$499</strong></div>
          </Reveal>
        </div>

        <div className="hero-bottom shell">
          <span>Scroll to explore</span>
          <span>MicroSlats · Global field</span>
        </div>
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
            <div className="display-art">
              <Image
                src="/nothing/assets/screenhz.png"
                alt="Nothing Phone (4a) Pro display showing 144 Hz"
                fill
                sizes="(max-width: 820px) 88vw, 48vw"
                className="display-art-image"
                loading="lazy"
              />
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
            <div>
              <p className="section-index">07 — Specs</p>
              <h2>The numbers<br /><em>behind the object.</em></h2>
            </div>
            <p className="muted-copy">A compact technical view of the Phone (4a) Pro, using the supplied product specification.</p>
          </Reveal>

          <Reveal className="spec-hero" delay={50}>
            <div className="spec-orbit" aria-hidden="true">
              <span /><span /><span />
            </div>
            <div className="spec-hero-number">
              <span>DISPLAY</span>
              <strong>6.83</strong>
              <em>″ AMOLED</em>
            </div>
            <div className="spec-hero-side">
              <div><span>REFRESH</span><strong>144 Hz</strong></div>
              <div><span>PEAK</span><strong>5000 nits</strong></div>
              <div><span>BATTERY</span><strong>5080 mAh</strong></div>
            </div>
          </Reveal>

          <Reveal className="spec-selector" delay={100}>
            <div className="spec-selector-top">
              <div>
                <span>TECHNICAL OVERVIEW</span>
                <strong>PHONE (4a) PRO / 2026</strong>
              </div>
              <div className="spec-live-index"><span>SELECTED</span><strong>{String(activeSpec + 1).padStart(2,'0')} / 14</strong></div>
            </div>

            <div className="spec-focus">
              <span>{activeSpecData[0]}</span>
              <strong>{activeSpecData[1]}</strong>
              <p>{activeSpecData[2]}</p>
            </div>

            <div className="spec-nav" role="tablist" aria-label="Phone specifications">
              {specs.map(([label], index) => (
                <button
                  key={label}
                  type="button"
                  role="tab"
                  aria-selected={activeSpec === index}
                  className={'spec-nav-item ' + (activeSpec === index ? 'active' : '')}
                  onClick={() => setActiveSpec(index)}
                >
                  <span>{String(index + 1).padStart(2,'0')}</span>
                  <strong>{label}</strong>
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal className="spec-gallery" delay={90}>
            <div className="spec-gallery-card">
              <Image src="/nothing/assets/specs.jpg" alt="Phone (4a) Pro specifications" fill sizes="(max-width: 720px) 100vw, 50vw" className="original-image" loading="lazy" />
              <div className="spec-gallery-overlay" aria-hidden="true" />
              <div className="spec-gallery-meta"><span>SPEC / 01</span><small>FULL TECHNICAL SHEET</small></div>
            </div>
            <div className="spec-gallery-card">
              <Image src="/nothing/assets/specs1.jpg" alt="Phone (4a) Pro specification detail" fill sizes="(max-width: 720px) 100vw, 50vw" className="original-image" loading="lazy" />
              <div className="spec-gallery-overlay" aria-hidden="true" />
              <div className="spec-gallery-meta"><span>SPEC / 02</span><small>DETAIL / HARDWARE</small></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section box-section">
        <div className="shell">
          <Reveal className="box-header">
            <p className="section-index">08 — In the box</p>
            <h2>Nothing extra.<br /><em>Nothing missing.</em></h2>
          </Reveal>

          <div className="box-showcase">
            <div className="box-showcase-line" aria-hidden="true" />
            <div className="box-items">
              {box.map((item, index) => (
                <Reveal className="box-card" key={item} delay={index * 55}>
                  <div className="box-card-index">0{index + 1}</div>
                  <div className="box-card-body">
                    <span>INCLUDED</span>
                    <strong>{item}</strong>
                  </div>
                  <div className="box-card-mark" aria-hidden="true">+</div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="box-footer-note" delay={260}>
            <span>PHONE (4a) PRO / RETAIL PACKAGE</span>
            <span>6 ITEMS · READY OUT OF THE BOX</span>
          </Reveal>
        </div>
      </section>

      <section id="buy" className="buy-section" data-buy-sound-zone>
        <div className="shell buy-shell">
          <Reveal className="buy-heading">
            <p className="section-index">09 — Choose yours</p>
            <h2>Make it<br /><em>yours.</em></h2>
            <p>Phone (4a) Pro starts at $499. Swipe through the finishes, then configure the memory below.</p>
          </Reveal>

          <Reveal className="phone-carousel" delay={90}>
            <div
              className="phone-carousel-stage"
              tabIndex={0}
              role="region"
              aria-label="Phone (4a) Pro colour carousel"
              onPointerDown={handleCarouselPointerDown}
              onPointerUp={handleCarouselPointerUp}
              onPointerCancel={handleCarouselPointerCancel}
              onPointerLeave={handleCarouselPointerCancel}
              onKeyDown={(event) => {
                if (event.key === 'ArrowLeft') changeVariant(-1);
                if (event.key === 'ArrowRight') changeVariant(1);
              }}
            >
              {variants.map((item, index) => {
                const offset = (index - variant + variants.length) % variants.length;
                const position = offset === 0 ? 'current' : offset === 1 ? 'next' : 'prev';
                return (
                  <div
                    key={item.name}
                    className={'phone-slide ' + position}
                    aria-hidden={offset !== 0}
                  >
                    <Image
                      src={item.image}
                      alt={item.name + ' Phone (4a) Pro front and back'}
                      fill
                      sizes="(max-width: 760px) 88vw, 58vw"
                      className="phone-carousel-image"
                    />
                  </div>
                );
              })}

              <button
                type="button"
                className="carousel-arrow carousel-prev"
                aria-label="Previous colour"
                onClick={() => changeVariant(-1)}
              >←</button>
              <button
                type="button"
                className="carousel-arrow carousel-next"
                aria-label="Next colour"
                onClick={() => changeVariant(1)}
              >→</button>

              <div className="carousel-index"><span>COLOUR</span><strong>0{variant + 1} / 03</strong></div>
              <div className="carousel-hint">DRAG OR USE ARROWS</div>
            </div>

            <div className="colour-rail" role="tablist" aria-label="Phone colours">
              {variants.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  role="tab"
                  aria-selected={variant === index}
                  className={'colour-tab ' + (variant === index ? 'active' : '')}
                  onClick={() => setVariant(index)}
                >
                  <span className={'swatch-dot swatch-' + item.name.toLowerCase()} />
                  <span>{item.name}</span>
                  <small>{item.note.replace(' finish', '')}</small>
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal id="buy-config" className="config-panel" delay={140}>
            <div className="config-panel-top">
              <div>
                <span className="config-eyebrow">PHONE (4a) PRO</span>
                <strong>{selected.name}</strong>
              </div>
              <div className="config-price">{selected.price}</div>
            </div>

            <div className="config-divider" />

            <div className="config-row">
              <div className="config-label">
                <span>FINISH</span>
                <strong>{selected.name}</strong>
              </div>
              <div className="config-value finish-value">
                <span className={'swatch-dot swatch-' + selected.name.toLowerCase()} />
                <span>{selected.note}</span>
              </div>
            </div>

            <div className="config-row config-storage-row">
              <div className="config-label">
                <span>MEMORY</span>
                <strong>Choose configuration</strong>
              </div>
              <div className="config-storage">
                {capacities.map((item, index) => (
                  <button
                    key={item}
                    type="button"
                    className={capacity === index ? 'selected' : ''}
                    onClick={() => setCapacity(index)}
                    aria-pressed={capacity === index}
                  >
                    <span>{item.split(' + ')[0]}</span>
                    <small>{item.split(' + ')[1]}</small>
                  </button>
                ))}
              </div>
            </div>

            <div className="config-bottom">
              <div className="config-summary">
                <span>{selected.name} · {capacities[capacity]}</span>
                <strong>{selected.price}</strong>
              </div>
              <a className="buy-cta" href="https://us.nothing.tech/products/phone-4a-pro" target="_blank" rel="noopener noreferrer">
                Add to bag <span>↗</span>
              </a>
              <small className="buy-disclaimer">External purchase link · pricing and availability may change.</small>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="footer">
        <div className="shell footer-inner"><span>NOTHING • PHONE (4a) PRO</span><span>Metal. Light. Motion.</span><span>© 2026</span></div>
      </footer>
    </main>
  );
}
