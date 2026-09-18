'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
  site,
  hero,
  origins,
  businesses,
  yala,
  principles,
  leadership,
  finale,
  quotes,
} from '../content';

const nav = [
  ['journey', 'Journey'],
  ['ventures', 'Experience'],
  ['yalaride', 'YalaRide'],
  ['leadership', 'Leadership'],
  ['vision', 'Vision'],
  ['contact', 'Contact'],
] as const;

function Arrow({ up = false }: { up?: boolean }) {
  return <span aria-hidden="true">{up ? '↗' : '→'}</span>;
}

export default function Experience() {
  const root = useRef<HTMLDivElement>(null);
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [sent, setSent] = useState(false);
  const [journeyCopy, setJourneyCopy] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    let lenis: Lenis | undefined;
    let tick: ((t: number) => void) | undefined;

    const preferMotion = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

    if (preferMotion) {
      lenis = new Lenis({ duration: 1.25, smoothWheel: true, touchMultiplier: 1.3, anchors: { offset: -64 } });
      lenis.on('scroll', ScrollTrigger.update);
      tick = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    const onScrollChrome = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScrollChrome, { passive: true });
    onScrollChrome();

    const sectionObs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-42% 0px -45% 0px' },
    );
    el.querySelectorAll('section[id]').forEach((s) => sectionObs.observe(s));

    // Quiet hover lift on CTAs
    if (preferMotion) {
      el.querySelectorAll('.btn, .chrome-cta').forEach((btn) => {
        const node = btn as HTMLElement;
        const enter = () => gsap.to(node, { y: -2, duration: 0.35, ease: 'power2.out' });
        const leave = () => gsap.to(node, { y: 0, duration: 0.45, ease: 'power2.out' });
        node.addEventListener('mouseenter', enter);
        node.addEventListener('mouseleave', leave);
      });
    }

    // ——— HERO: quiet entrance + restrained pin ———
    if (preferMotion) {
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro
        .from('.hero-photo', { clipPath: 'inset(0 0 0 100%)', duration: 1.4 }, 0)
        .from('.hero-film span, .hero-name .line span, .hero-role span', { yPercent: 110, stagger: 0.08, duration: 1.05 }, 0.15)
        .from('.hero-sub, .hero-actions, .scroll-cue', { opacity: 0, y: 16, stagger: 0.06, duration: 0.8 }, 0.55);

      mm.add('(min-width: 981px) and (prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: '+=85%',
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
          },
        });
        tl.to('.hero-photo img', { scale: 1.12, ease: 'none' }, 0)
          .to('.hero-name .line span', { yPercent: -20, opacity: 0.35, stagger: 0.04, ease: 'none' }, 0)
          .to('.hero-sub, .hero-actions, .hero-role, .hero-film, .scroll-cue', { opacity: 0, y: -12, ease: 'none' }, 0)
          .to('.hero-veil', { opacity: 0.4, ease: 'none' }, 0);
        return () => { tl.scrollTrigger?.kill(); tl.kill(); };
      });
    }

    // ——— JOURNEY: documentary chapters ———
    mm.add('(min-width: 981px) and (prefers-reduced-motion: no-preference)', () => {
      const places = gsap.utils.toArray<HTMLElement>('.journey-place');
      const copies = gsap.utils.toArray<HTMLElement>('.journey-copy');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.journey-pin',
          start: 'top top',
          end: '+=380%',
          pin: true,
          scrub: 1.15,
          anticipatePin: 1,
          onUpdate: (self) => {
            const ix = Math.min(2, Math.floor(self.progress * 3));
            setJourneyCopy(ix);
          },
        },
      });

      // Pakistan: scale + place name rises
      tl.fromTo('.journey-layer.pk img', { scale: 1.05 }, { scale: 1.2, ease: 'none', duration: 0.28 }, 0)
        .fromTo(places[0], { opacity: 0 }, { opacity: 1, duration: 0.06, ease: 'none' }, 0.02)
        .fromTo(places[0].querySelector('span'), { yPercent: 105 }, { yPercent: -30, ease: 'none', duration: 0.28 }, 0.02)
        .fromTo(copies[0], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.08, ease: 'none' }, 0.12)
        .to(copies[0], { opacity: 0, duration: 0.06, ease: 'none' }, 0.26)
        .to(places[0], { opacity: 0, duration: 0.06, ease: 'none' }, 0.28);

      // Qatar expands from right (vertical crop wipe)
      tl.fromTo('.journey-layer.qa', { clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0 0 0%)', ease: 'none', duration: 0.22 }, 0.28)
        .to('.journey-layer.pk', { clipPath: 'inset(0 78% 0 0)', filter: 'blur(2px)', ease: 'none', duration: 0.22 }, 0.28)
        .fromTo('.journey-layer.qa img', { scale: 1.15 }, { scale: 1.05, ease: 'none', duration: 0.28 }, 0.3)
        .fromTo(places[1], { opacity: 0 }, { opacity: 1, duration: 0.05, ease: 'none' }, 0.36)
        .fromTo(places[1].querySelector('span'), { yPercent: 100 }, { yPercent: -25, ease: 'none', duration: 0.26 }, 0.36)
        .fromTo(copies[1], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.08, ease: 'none' }, 0.44)
        .to(copies[1], { opacity: 0, duration: 0.06, ease: 'none' }, 0.56)
        .to(places[1], { opacity: 0, duration: 0.06, ease: 'none' }, 0.58);

      // United States — different composition: rise from bottom
      tl.fromTo('.journey-layer.us', { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', ease: 'none', duration: 0.22 }, 0.58)
        .to('.journey-layer.qa', { scale: 1.06, filter: 'blur(3px)', ease: 'none', duration: 0.22 }, 0.58)
        .fromTo('.journey-layer.us img', { scale: 1.18 }, { scale: 1.06, ease: 'none', duration: 0.3 }, 0.6)
        .fromTo(places[2], { opacity: 0 }, { opacity: 1, duration: 0.05, ease: 'none' }, 0.66)
        .fromTo(places[2].querySelector('span'), { yPercent: 90 }, { yPercent: 0, ease: 'none', duration: 0.2 }, 0.66)
        .fromTo(copies[2], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.1, ease: 'none' }, 0.76);

      return () => { tl.scrollTrigger?.kill(); tl.kill(); };
    });

    mm.add('(max-width: 980px), (prefers-reduced-motion: reduce)', () => {
      el.querySelectorAll('.journey-place, .journey-copy').forEach((n) => {
        (n as HTMLElement).style.opacity = '1';
      });
    });

    // ——— GALLERY horizontal ———
    mm.add('(min-width: 981px) and (prefers-reduced-motion: no-preference)', () => {
      const track = el.querySelector('.gallery-track') as HTMLElement | null;
      const wrap = el.querySelector('.gallery-track-wrap') as HTMLElement | null;
      if (!track || !wrap) return;
      const getDist = () => Math.max(0, track.scrollWidth - wrap.clientWidth);

      const tween = gsap.to(track, {
        x: () => -getDist(),
        ease: 'none',
        scrollTrigger: {
          trigger: '.gallery-pin',
          start: 'top top',
          end: () => `+=${Math.max(2000, getDist() * 1.15)}`,
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Dual images move at different rates while pinned gallery scrolls
      gsap.to('.g-dual .photo-a img', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: '.gallery-pin', scrub: true, start: 'top top', end: 'bottom bottom' },
      });
      gsap.to('.g-dual .photo-b img', {
        yPercent: -16,
        ease: 'none',
        scrollTrigger: { trigger: '.gallery-pin', scrub: true, start: 'top top', end: 'bottom bottom' },
      });
      gsap.to('.g-bleed .photo img, .g-portal .photo img', {
        scale: 1.08,
        ease: 'none',
        scrollTrigger: { trigger: '.gallery-pin', scrub: true, start: 'top top', end: 'bottom bottom' },
      });

      return () => { tween.scrollTrigger?.kill(); tween.kill(); };
    });

    // ——— YALARIDE match-cut ———
    mm.add('(min-width: 981px) and (prefers-reduced-motion: no-preference)', () => {
      const pin = el.querySelector('.yala-pin');
      const content = el.querySelector('.yala-content');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.yala-pin',
          start: 'top top',
          end: '+=360%',
          pin: true,
          scrub: 1.15,
          anticipatePin: 1,
          onUpdate: (self) => {
            const tech = self.progress > 0.28;
            document.body.classList.toggle('is-yala', tech);
            content?.classList.toggle('ready', self.progress > 0.35);
          },
          onLeaveBack: () => {
            document.body.classList.remove('is-yala');
            content?.classList.remove('ready');
          },
        },
      });

      tl.fromTo('.yala-match .frame', {
        width: 'min(48vw, 520px)',
        borderRadius: '0px',
        scale: 1,
      }, {
        width: '100vw',
        height: '100vh',
        aspectRatio: 'auto',
        borderRadius: '0px',
        ease: 'none',
        duration: 0.28,
      }, 0)
        .to('.yala-match .frame img', { scale: 1.15, filter: 'blur(6px)', opacity: 0.2, ease: 'none', duration: 0.22 }, 0.08)
        .to('.yala-match .under', { opacity: 1, ease: 'none', duration: 0.18 }, 0.18)
        .to('.yala-match', { opacity: 0, ease: 'none', duration: 0.1 }, 0.32)
        .to('.yala-content', { opacity: 1, ease: 'none', duration: 0.08 }, 0.3)
        .fromTo('.yala-content h2 .l1 span', { yPercent: 110 }, { yPercent: 0, ease: 'none', duration: 0.12 }, 0.32)
        .fromTo('.yala-content h2 .l2 span', { yPercent: 110 }, { yPercent: 0, ease: 'none', duration: 0.14 }, 0.48)
        .fromTo('.yala-body', { opacity: 0, y: 28 }, { opacity: 1, y: 0, ease: 'none', duration: 0.16 }, 0.62);

      return () => {
        document.body.classList.remove('is-yala');
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    mm.add('(max-width: 980px), (prefers-reduced-motion: reduce)', () => {
      document.body.classList.add('is-yala');
      const content = el.querySelector('.yala-content') as HTMLElement | null;
      const body = el.querySelector('.yala-body') as HTMLElement | null;
      if (content) content.style.opacity = '1';
      if (body) body.style.opacity = '1';
    });

    // ——— LEADERSHIP: one word at a time ———
    mm.add('(min-width: 981px) and (prefers-reduced-motion: no-preference)', () => {
      const words = gsap.utils.toArray<HTMLElement>('.lead-word');
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.lead-pin',
          start: 'top top',
          end: `+=${words.length * 80}%`,
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
        },
      });

      words.forEach((word, i) => {
        const t = i / words.length;
        const inner = word.querySelector('span');
        tl.set(word, { opacity: 1 }, t)
          .fromTo(inner, { yPercent: 110 }, { yPercent: 0, duration: 0.12, ease: 'none' }, t);
        if (i < words.length - 1) {
          tl.to(inner, { yPercent: -110, duration: 0.12, ease: 'none' }, t + 0.14)
            .set(word, { opacity: 0 }, t + 0.26);
        }
      });

      tl.fromTo('.lead-note', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.15, ease: 'none' }, 0.72);
      tl.to('.lead-portrait img', { scale: 1.04, ease: 'none', duration: 1 }, 0);

      return () => { tl.scrollTrigger?.kill(); tl.kill(); };
    });

    // Global — almost static, soft fade in
    if (preferMotion) {
      gsap.from('.global-in', {
        opacity: 0,
        y: 24,
        stagger: 0.08,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.global-pin', start: 'top 70%', once: true },
      });
      gsap.from('.finale-in', {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.finale', start: 'top 70%', once: true },
      });
    }

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    window.addEventListener('resize', refresh);
    const t = window.setTimeout(refresh, 300);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener('load', refresh);
      window.removeEventListener('resize', refresh);
      window.removeEventListener('scroll', onScrollChrome);
      sectionObs.disconnect();
      mm.revert();
      ScrollTrigger.getAll().forEach((tr) => tr.kill());
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      document.body.classList.remove('is-yala');
    };
  }, []);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menu]);

  function onContact(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') || '');
    const email = String(data.get('email') || '');
    const phone = String(data.get('phone') || '');
    const company = String(data.get('company') || '');
    const type = String(data.get('type') || '');
    const message = String(data.get('message') || '');
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : '',
      company ? `Company: ${company}` : '',
      `Enquiry: ${type}`,
      '',
      message,
    ].filter(Boolean).join('\n');
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Enquiry — ${type || 'General'} — ${name}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <div ref={root}>
      <a className="skip" href="#main">Skip to content</a>

      <header className={`chrome${scrolled ? ' scrolled' : ''}`}>
        <a className="brand" href="#" aria-label={`${site.name} home`}>
          <span className="brand-film">{site.film}</span>
          <span className="brand-name">{site.name}</span>
        </a>
        <nav className="nav" aria-label="Primary">
          {nav.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? 'on' : ''}>{label}</a>
          ))}
        </nav>
        <a className="chrome-cta" href={site.yala} target="_blank" rel="noreferrer">YalaRide <Arrow up /></a>
        <button className="menu-btn" type="button" aria-expanded={menu} onClick={() => setMenu(!menu)}>
          {menu ? 'Close' : 'Menu'}
        </button>
      </header>

      <nav className={`drawer${menu ? ' open' : ''}`} aria-label="Mobile">
        {nav.map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>{label}<Arrow /></a>
        ))}
        <a href={site.yala} target="_blank" rel="noreferrer" onClick={() => setMenu(false)}>YalaRide <Arrow up /></a>
      </nav>

      <main id="main">
        {/* HERO */}
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-photo">
            <Image src="/portrait.jpg" alt="" fill priority sizes="70vw" />
          </div>
          <div className="hero-veil" aria-hidden="true" />
          <div className="hero-copy">
            <p className="hero-film"><span>{hero.film}</span></p>
            <h1 id="hero-title" className="hero-name">
              <span className="line"><span>Mohammed</span></span>
              <span className="line"><span>Rizwan</span></span>
            </h1>
            <p className="hero-role"><span>{hero.role}</span></p>
            <p className="hero-sub">{hero.sub}</p>
            <div className="hero-actions">
              <a className="btn btn-ink" href="#journey">Enter the journey <Arrow /></a>
              <a className="btn btn-ghost" href={site.yala} target="_blank" rel="noreferrer">YalaRide.com <Arrow up /></a>
            </div>
          </div>
          <p className="scroll-cue">Scroll</p>
        </section>

        {/* JOURNEY */}
        <section id="journey" className="journey" aria-labelledby="journey-title">
          <h2 id="journey-title" className="sr-only">The journey: Pakistan, Qatar, United States</h2>
          <div className="journey-pin">
            {origins.map((o) => (
              <div key={o.id} className={`journey-layer ${o.id === 'pakistan' ? 'pk' : o.id === 'qatar' ? 'qa' : 'us'}`}>
                <Image src={o.image} alt="" fill sizes="100vw" style={{ objectPosition: o.crop }} priority={o.id === 'pakistan'} />
                <div className="shade" />
              </div>
            ))}
            <div className="journey-type" aria-hidden="true">
              {origins.map((o) => (
                <div className="journey-place" key={`place-${o.id}`}><span>{o.place}</span></div>
              ))}
            </div>
            {origins.map((o, i) => (
              <div className="journey-copy" key={`copy-${o.id}`} aria-hidden={journeyCopy !== i}>
                <div className="meta">{o.label}</div>
                <h3>{o.title}</h3>
                <p>{o.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* GALLERY */}
        <section id="ventures" className="gallery" aria-labelledby="ventures-title">
          <div className="gallery-pin">
            <div className="gallery-intro">
              <div className="kicker">Built through experience</div>
              <h2 id="ventures-title">A life of operating reality</h2>
            </div>
            <div className="gallery-track-wrap">
              <div className="gallery-track">
                {businesses.map((b) => (
                  <article className={`g-slide g-${b.layout}`} key={b.name}>
                    {b.layout === 'bleed' && (
                      <>
                        <div className="photo"><Image src={b.image} alt={b.name} fill sizes="100vw" /></div>
                        <div className="shade" />
                        <div className="info g-info">
                          <div className="num">{b.num}</div>
                          <h3>{b.name}</h3>
                          <div className="tag">{b.tag}</div>
                          <p>{b.body}</p>
                          {b.url && <a href={b.url} target="_blank" rel="noreferrer">Visit <Arrow up /></a>}
                        </div>
                      </>
                    )}
                    {b.layout === 'behind' && (
                      <>
                        <div className="giant" aria-hidden="true">{b.name}</div>
                        <div className="photo"><Image src={b.image} alt={b.name} fill sizes="65vw" /></div>
                        <div className="info g-info">
                          <div className="num">{b.num}</div>
                          <h3>{b.name}</h3>
                          <div className="tag">{b.tag}</div>
                          <p>{b.body}</p>
                          {b.url && <a href={b.url} target="_blank" rel="noreferrer">Visit <Arrow up /></a>}
                        </div>
                      </>
                    )}
                    {b.layout === 'dual' && (
                      <>
                        <div className="photo-a"><Image src={b.image} alt={b.name} fill sizes="60vw" /></div>
                        <div className="photo-b"><Image src={b.image2 || b.image} alt="" fill sizes="40vw" /></div>
                        <div className="info g-info">
                          <div className="num">{b.num}</div>
                          <h3>{b.name}</h3>
                          <div className="tag">{b.tag}</div>
                          <p>{b.body}</p>
                          {b.url && <a href={b.url} target="_blank" rel="noreferrer">Visit <Arrow up /></a>}
                        </div>
                      </>
                    )}
                    {b.layout === 'type' && (
                      <>
                        <div className="giant" aria-hidden="true">{b.name}</div>
                        <div className="photo"><Image src={b.image} alt={b.name} fill sizes="45vw" /></div>
                        <div className="info g-info">
                          <div className="num">{b.num}</div>
                          <div className="tag">{b.tag}</div>
                          <p>{b.body}</p>
                        </div>
                      </>
                    )}
                    {b.layout === 'portal' && (
                      <>
                        <div className="photo"><Image src={b.image} alt={b.name} fill sizes="100vw" /></div>
                        <div className="shade" />
                        <div className="focus" aria-hidden="true">
                          <Image src={b.image} alt="" fill sizes="50vw" />
                        </div>
                        <div className="info g-info">
                          <div className="num">{b.num}</div>
                          <h3>{b.name}</h3>
                          <div className="tag">{b.tag}</div>
                          <p>{b.body}</p>
                        </div>
                      </>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* YALARIDE */}
        <section id="yalaride" className="yala-act" aria-labelledby="yala-title">
          <div className="yala-pin">
            <div className="yala-match" aria-hidden="true">
              <div className="frame">
                <Image src="/brands/yalaride-car.webp" alt="" fill sizes="60vw" />
                <div className="under" />
              </div>
            </div>
            <div className="yala-content">
              <div className="kicker">YalaRide</div>
              <h2 id="yala-title">
                <span className="l1"><span>{yala.headline[0]}</span></span>
                <span className="l2"><span>{yala.headline[1]}</span></span>
              </h2>
              <div className="yala-body">
                <div className="shot">
                  <Image src={yala.visuals[0].src} alt={yala.visuals[0].alt} fill sizes="50vw" />
                </div>
                <div className="copy">
                  <p>{yala.lead}</p>
                  <p>{yala.built}</p>
                  <div className="yala-bridge" aria-label="Marketplace model">
                    <span>Renters</span>
                    <em>YalaRide</em>
                    <span>Rental businesses</span>
                  </div>
                  <div className="yala-actions">
                    <a className="btn btn-yala" href={site.yala} target="_blank" rel="noreferrer">Visit YalaRide.com <Arrow up /></a>
                    <a className="btn btn-ghost" href="#leadership">Leadership <Arrow /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LEADERSHIP */}
        <section id="leadership" className="lead-act" aria-labelledby="lead-title">
          <div className="lead-pin">
            <div className="lead-portrait">
              <Image src="/portrait.jpg" alt={site.name} fill sizes="40vw" />
            </div>
            <div className="lead-editorial">
              <h2 id="lead-title" className="sr-only">{leadership.heading}</h2>
              {principles.map((p) => (
                <div className="lead-word" key={p}><span>{p}</span></div>
              ))}
              <div className="lead-note">
                <p>{leadership.body}</p>
                <blockquote>“{leadership.quote}”</blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* GLOBAL — typography, no cartoon map */}
        <section id="vision" className="global-act" aria-labelledby="vision-title">
          <div className="global-pin">
            <div className="kicker global-in">Global vision</div>
            <h2 id="vision-title" className="global-in">A path already travelled — a world still opening</h2>
            <div className="global-places global-in">
              {origins.map((o) => (
                <article key={o.id}>
                  <div className="label">{o.label}</div>
                  <h3>{o.place}</h3>
                </article>
              ))}
            </div>
            <p className="global-note global-in">
              The next chapter is the worldwide growth of YalaRide — building partnerships and improving the experience for renters and car-rental businesses across international markets, without claiming destinations before they are earned.
            </p>
          </div>
        </section>

        {/* FINALE */}
        <section id="contact" className="finale" aria-labelledby="finale-title">
          <div>
            <h2 id="finale-title" className="finale-in">
              {finale.line1}
              <span className="soft">{finale.line2}</span>
            </h2>
            <p className="finale-note finale-in">{finale.note}</p>
            <div className="finale-actions finale-in">
              <a className="btn btn-ink" href={`mailto:${site.email}`}>Email Mohammed <Arrow /></a>
              <a className="btn btn-yala" href={site.yala} target="_blank" rel="noreferrer">YalaRide.com <Arrow up /></a>
            </div>
            <div className="contact-sheet finale-in">
              <div className="contact-links">
                <a href={`mailto:${site.email}`}>{site.email} <Arrow up /></a>
                <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phoneDisplay}</a>
                <a href={site.yala} target="_blank" rel="noreferrer">YalaRide.com <Arrow up /></a>
                <p style={{ marginTop: 20, fontFamily: 'var(--display)', fontSize: 20, fontStyle: 'italic', maxWidth: '28ch' }}>
                  “{quotes.primary}”
                </p>
              </div>
              <form className="form" onSubmit={onContact} noValidate>
                <div className="form-row">
                  <label>Full name<input name="name" required autoComplete="name" /></label>
                  <label>Email<input name="email" type="email" required autoComplete="email" /></label>
                </div>
                <div className="form-row">
                  <label>Phone<input name="phone" type="tel" autoComplete="tel" /></label>
                  <label>Company<input name="company" autoComplete="organization" /></label>
                </div>
                <label>
                  Enquiry type
                  <select name="type" defaultValue="Business">
                    <option>Business</option>
                    <option>Partnership</option>
                    <option>Media</option>
                    <option>Speaking</option>
                    <option>Other</option>
                  </select>
                </label>
                <label>Message<textarea name="message" required /></label>
                <p className="form-note">Opens your email client to {site.email}. Nothing stored on this static site.</p>
                {sent && <div className="form-ok" role="status">Your email draft is ready — send it to complete the enquiry.</div>}
                <button className="btn btn-ink" type="submit">Send enquiry <Arrow /></button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-foot">
        <div>
          <strong style={{ color: 'var(--ink)' }}>{site.film}</strong>
          <div>© {new Date().getFullYear()} {site.name}. All rights reserved.</div>
        </div>
        <nav aria-label="Footer">
          <a href="#journey">Journey</a>
          <a href="#ventures">Experience</a>
          <a href="#yalaride">YalaRide</a>
          <a href="#contact">Contact</a>
          <a href={site.yala} target="_blank" rel="noreferrer">YalaRide.com</a>
        </nav>
      </footer>
    </div>
  );
}
