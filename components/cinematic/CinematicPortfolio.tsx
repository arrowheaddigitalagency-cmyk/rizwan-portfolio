'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BRAND, QUOTE_PRIMARY } from '@/lib/data';
import { journeyScenes, businessChapters } from './story';
import './cinematic.css';

const GlobalEarth = dynamic(() => import('./GlobalEarth'), { ssr: false, loading: () => <div className="earth-fallback"/> });
const navItems = [['opening','Home'],['journey','Journey'],['businesses','Businesses'],['yalaride','YalaRide'],['leadership','Leadership'],['contact','Contact']] as const;
const Arrow = () => <span aria-hidden="true">↗</span>;

export default function CinematicPortfolio() {
  const root = useRef<HTMLDivElement>(null);
  const main = useRef<HTMLElement>(null);
  const header = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuPanel = useRef<HTMLElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const activeChapter = useRef<HTMLSpanElement>(null);
  const globe = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [globeReady, setGlobeReady] = useState(false);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const stage=el.querySelector<HTMLElement>('.opening-sequence')!;
        const opening=el.querySelector<HTMLElement>('#opening')!;
        const hero=el.querySelector<HTMLElement>('#hero')!;
        stage.classList.add('has-door-motion');
        hero.inert=true;
        const reveal=gsap.timeline({scrollTrigger:{id:'opening-reveal',trigger:stage,start:'top top',end:()=>'+='+Math.round(innerHeight*.95),pin:true,pinSpacing:true,scrub:.55,anticipatePin:1,invalidateOnRefresh:true,onUpdate:self=>{
          hero.inert=self.progress<.86;
          opening.inert=self.progress>.95;
          if(self.progress<1&&header.current)header.current.dataset.tone=self.progress>.65?'light':'dark';
        }}});
        reveal.to(opening.querySelectorAll('.intro-message,.intro-meta,.skip-intro'),{autoAlpha:0,y:-16,duration:.23,ease:'power1.in'},.03)
          .to(opening.querySelector('.door-left'),{xPercent:-103,rotationY:-8,duration:.74,ease:'power2.inOut'},.16)
          .to(opening.querySelector('.door-right'),{xPercent:103,rotationY:8,duration:.74,ease:'power2.inOut'},.16)
          .to(opening.querySelector('.door-light'),{autoAlpha:0,scaleX:24,duration:.45,ease:'power1.out'},.22)
          .fromTo(hero,{filter:'brightness(.65)'},{filter:'brightness(1)',duration:.65,ease:'none'},.2)
          .to(opening,{autoAlpha:0,duration:.1},.9);
        return()=>{stage.classList.remove('has-door-motion');hero.inert=false;opening.inert=false;};
      });
      mm.add('(min-width: 1000px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('.journey-scene').forEach((scene,i) => {
          const tl=gsap.timeline({scrollTrigger:{trigger:scene,start:'top top',end:'+=45%',pin:true,scrub:.8,anticipatePin:1}});
          tl.fromTo(scene.querySelector('.scene-photo'),{scale:1.12},{scale:1.01,xPercent:i===1?-2:0,duration:1,ease:'none'},0)
            .to(scene.querySelector('.country-name'),{yPercent:-12,duration:1,ease:'none'},0);
        });
        gsap.utils.toArray<HTMLElement>('.business-chapter, .business-overture').forEach((scene,i) => {
          const photo=scene.querySelector('.scene-photo');
          const title=scene.querySelector('.scene-title');
          const tl=gsap.timeline({scrollTrigger:{trigger:scene,start:'top top',end:scene.classList.contains('business-travel')?'+=35%':i===0?'+=45%':'+=60%',pin:true,scrub:.85,anticipatePin:1}});
          tl.fromTo(photo,{scale:i===3?1.025:1.1},{scale:1,duration:1,ease:'none'},0)
            .fromTo(title,{yPercent:5},{yPercent:-6,duration:1,ease:'none'},0);
          if(i===2)tl.to(photo,{xPercent:3,duration:1,ease:'none'},0);
          const frame=scene.querySelector('.business-image');
          if(frame)gsap.fromTo(frame,{clipPath:i%2?'inset(0% 0% 0% 13%)':'inset(9% 0% 9% 0%)'},{clipPath:'inset(0% 0% 0% 0%)',ease:'none',scrollTrigger:{trigger:scene,start:'top 85%',end:'top top',scrub:.7}});
          gsap.fromTo(title,{clipPath:'inset(100% 0% 0% 0%)'},{clipPath:'inset(0% 0% 0% 0%)',ease:'none',scrollTrigger:{trigger:scene,start:'top 85%',end:'top 20%',scrub:.5}});
          if(i===4)tl.fromTo(photo,{clipPath:'inset(8% 0% 8% 0%)'},{clipPath:'inset(0% 0% 0% 0%)',duration:.75,ease:'none'},0);
        });
        const technology=gsap.timeline({scrollTrigger:{trigger:'.technology-scene',start:'top top',end:'+=85%',pin:true,scrub:1,anticipatePin:1}});
        technology.fromTo('.device-composition',{rotateY:-13,rotateZ:6,y:55,scale:.86},{rotateY:0,rotateZ:-6,y:-10,scale:1,duration:.75,ease:'none'},0)
          .fromTo('.technology-wordmark',{xPercent:5},{xPercent:0,opacity:1,duration:.8},0)
          .fromTo('.marketplace-relation',{y:25},{y:0,opacity:1,duration:.4},.45);
        gsap.fromTo('.global-earth',{scale:1.12,rotate:-7},{scale:1,rotate:0,ease:'none',scrollTrigger:{trigger:'.global-scene',start:'top bottom',end:'bottom top',scrub:1}});
        gsap.to('.leadership-portrait',{yPercent:-4,ease:'none',scrollTrigger:{trigger:'.leadership-scene',start:'top bottom',end:'bottom top',scrub:1}});
      });
      mm.add('(max-width: 999px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('.scene-copy, .journey-copy, .global-copy').forEach(copy=>{
          gsap.fromTo(copy,{y:20},{y:0,opacity:1,duration:.7,ease:'power2.out',scrollTrigger:{trigger:copy,start:'top 94%',once:true}});
        });
      });
    },el);
    let active=true;
    document.fonts.ready.then(()=>{if(active)ScrollTrigger.refresh();});
    const images=Array.from(el.querySelectorAll('img'));
    const refresh=()=>ScrollTrigger.refresh();
    images.forEach(img=>img.addEventListener('load',refresh,{once:true}));
    return()=>{active=false;images.forEach(img=>img.removeEventListener('load',refresh));mm.revert();ctx.revert();};
  },[]);

  useEffect(()=>{
    let raf=0;
    const update=()=>{raf=0;const max=document.documentElement.scrollHeight-innerHeight;if(progress.current)progress.current.style.transform=`scaleX(${max>0?scrollY/max:0})`;};
    const schedule=()=>{if(!raf)raf=requestAnimationFrame(update);};
    const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){const scene=entry.target as HTMLElement;if(header.current)header.current.dataset.tone=scene.dataset.tone||'light';if(activeChapter.current)activeChapter.current.textContent=scene.dataset.chapter||'A life in motion';}});},{rootMargin:'-15% 0px -70% 0px'});
    document.querySelectorAll('[data-chapter]').forEach(scene=>observer.observe(scene));
    const globeObserver=new IntersectionObserver(entries=>{if(entries.some(x=>x.isIntersecting)){setGlobeReady(true);globeObserver.disconnect();}},{rootMargin:'1400px'});
    if(globe.current)globeObserver.observe(globe.current);
    addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);update();
    return()=>{cancelAnimationFrame(raf);removeEventListener('scroll',schedule);removeEventListener('resize',schedule);observer.disconnect();globeObserver.disconnect();};
  },[]);

  useEffect(()=>{
    if(!menuOpen)return;
    menuPanel.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const key=(e:KeyboardEvent)=>{
      if(e.key==='Escape'){setMenuOpen(false);menuButton.current?.focus();}
      if(e.key==='Tab'){const items=[menuButton.current,...Array.from(menuPanel.current?.querySelectorAll<HTMLAnchorElement>('a')??[])].filter(Boolean) as HTMLElement[];if(e.shiftKey&&document.activeElement===items[0]){e.preventDefault();items.at(-1)?.focus();}else if(!e.shiftKey&&document.activeElement===items.at(-1)){e.preventDefault();items[0].focus();}}
    };
    const resize=()=>{if(innerWidth>=1000)setMenuOpen(false);};
    addEventListener('keydown',key);addEventListener('resize',resize);return()=>{removeEventListener('keydown',key);removeEventListener('resize',resize);};
  },[menuOpen]);

  return <div ref={root} className="cinematic-site">
    <svg className="mask-definitions" aria-hidden="true"><defs><clipPath id="portrait-silhouette" clipPathUnits="objectBoundingBox"><path d="M.185 1 L.183 .92 Q.159 .89 .153 .85 L.13 .805 Q.105 .785 .10 .76 L.097 .704 Q.096 .68 .103 .655 L.113 .567 L.137 .496 L.149 .458 L.166 .396 Q.188 .384 .255 .363 L.390 .320 L.397 .302 Q.369 .282 .36 .252 Q.343 .249 .34 .223 L.337 .204 Q.334 .194 .347 .197 L.349 .176 Q.344 .15 .36 .122 Q.385 .093 .423 .084 Q.46 .071 .483 .082 Q.507 .072 .537 .089 Q.571 .093 .589 .133 Q.601 .16 .595 .196 Q.615 .191 .614 .211 Q.612 .237 .601 .25 L.59 .288 L.588 .302 L.64 .323 Q.695 .34 .764 .356 L.834 .375 Q.846 .401 .86 .45 L.887 .515 Q.915 .588 .935 .643 Q.95 .66 .95 .70 L.932 .778 L.909 .839 L.889 .906 L.892 1 Z"/></clipPath></defs></svg>
    <a className="film-skip" href="#main">Skip to content</a>
    <header ref={header} className="film-header" data-tone="dark">
      <a href="#opening" className="film-brand" aria-label="Mohammed Rizwan home"><Image src="/brand-mark.svg" width={45} height={34} alt=""/><span>MOHAMMED RIZWAN</span></a>
      <nav aria-label="Main navigation" className="film-desktop-nav">{navItems.slice(0,5).map(([id,label])=><a key={id} href={`#${id}`}>{label}</a>)}</nav>
      <a href="#contact" className="film-header-cta">Let’s connect <Arrow/></a>
      <button ref={menuButton} className="film-menu-toggle" aria-expanded={menuOpen} aria-controls="film-menu" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?'Close −':'Menu +'}</button>
      <nav ref={menuPanel} id="film-menu" className="film-mobile-nav" aria-label="Mobile navigation" hidden={!menuOpen}>{navItems.map(([id,label],i)=><a key={id} href={`#${id}`} onClick={()=>setMenuOpen(false)}><span>0{i+1}</span>{label}<Arrow/></a>)}</nav>
      <span ref={progress} className="film-progress" aria-hidden="true"/>
    </header>
    <main ref={main} id="main">
      <div className="opening-sequence">
      <section id="opening" className="opening-scene" data-tone="dark" data-chapter="00 — Every journey begins" aria-labelledby="opening-title">
        <div className="door-panel door-left" aria-hidden="true"/><div className="door-panel door-right" aria-hidden="true"/><div className="door-light" aria-hidden="true"/>
        <div className="intro-meta"><span>MOHAMMED RIZWAN</span><span>A LIFE IN MOTION / 01</span></div>
        <div className="intro-message"><span className="intro-rule"/><h2 id="opening-title">Every journey<br/>starts with<br/><em>a decision.</em></h2><span>OPENING A BIGGER TOMORROW</span></div>
        <a className="skip-intro" href="#hero">Begin the journey <span aria-hidden="true">↓</span></a>
      </section>
      <section id="hero" className="film-hero film-scene" data-tone="light" data-chapter="01 — A life in motion">
        <div className="hero-background"><Image src="/cinematic/qatar.webp" fill priority sizes="100vw" alt=""/></div>
        <div className="hero-editorial"><p className="film-kicker">ENTREPRENEUR · AUTOMOTIVE LEADER · GLOBAL VISIONARY</p><h1 id="hero-title" tabIndex={-1} className="hero-name"><span>Mohammed</span><span>Rizwan</span></h1><div className="hero-bottom"><p>Building businesses. Solving real problems.<br/>Creating global impact.</p><div className="film-actions"><a href="#journey" className="film-button">Explore the journey <Arrow/></a><a href="#yalaride" className="film-text-button">Discover YalaRide <Arrow/></a></div><div className="hero-facts"><div><strong>30<span>+</span></strong><small>Years in the USA</small></div><div><strong>6</strong><small>Business chapters</small></div><div><strong>1</strong><small>Global vision</small></div></div></div></div>
        <div className="hero-portrait"><Image src="/portrait.png" width={1024} height={1536} alt="Mohammed Rizwan, CEO and Founder of YalaRide" priority sizes="(min-width: 1000px) 57vw, 100vw"/></div>
        <p className="hero-margin-note">People.<br/>Mobility.<br/><em>A better<br/>tomorrow.</em></p>
        <a className="film-scroll" href="#journey"><span className="scroll-line"/>Scroll to explore</a>
        <span className="hero-caption">A LIFE IN MOTION — THE MOHAMMED RIZWAN STORY</span>
      </section>
      </div>
      <div id="journey" className="journey-film">
        {journeyScenes.map((scene,i)=><section key={scene.id} id={scene.id} className={`journey-scene film-scene journey-${scene.id}`} data-tone={i===1?'dark':'light'} data-chapter={`02.${scene.number} — ${scene.country}`}>
          <div className="journey-image"><Image className="scene-photo" src={scene.image} fill sizes="(min-width: 1000px) 75vw, 100vw" alt={scene.alt}/></div><div className="journey-shade"/>
          <div className="journey-copy"><p className="film-kicker country-label"><Image src={`/flags/${scene.id}.svg`} width={36} height={24} alt={`${scene.country} flag`}/><span>{scene.number} / {scene.note}</span></p>{i===0&&<p className="journey-prologue">From Pakistan<br/>to a global vision.</p>}<h2 className="country-name">{scene.country}</h2><h3>{scene.title}</h3><p className="scene-body">{scene.copy}</p><div className="journey-coordinate"><span>{i===0?'PAKISTAN → QATAR':i===1?'QATAR → UNITED STATES':'EXPERIENCE → ENTERPRISE'}</span><span aria-hidden="true">↗</span></div></div>
          <span className="photo-credit">{scene.credit}</span><span className="journey-order">0{i+1} <span>/ 03</span></span>
        </section>)}
      </div>
      <section id="businesses" className="business-overture film-scene" data-tone="dark" data-chapter="03 — Built through experience">
        <div className="overture-image"><Image src="/cinematic/automotive-intro.webp" fill sizes="100vw" className="scene-photo" alt="Automotive travel scene from YalaRide’s supplied visual assets"/></div><div className="overture-shade"/>
        <div className="overture-content"><p className="film-kicker">03 / A LIFE OF BUILDING</p><h2 className="scene-title">Built<br/>through<br/><em>experience.</em></h2><p>From the workshop floor to a global marketplace.<br/>Every business, a lesson. Every lesson, a step forward.</p><a className="film-text-button" href="#cars-compound">Enter the business chapters <span aria-hidden="true">↓</span></a></div><span className="overture-side">AUTOMOTIVE / RENTALS / ENTERPRISE / MOBILITY</span>
      </section>
      {businessChapters.map((chapter,chapterIndex)=><section key={chapter.id} id={chapter.id} className={`business-chapter film-scene business-${chapter.style}${chapterIndex%2===1?' business-flip':''}`} data-tone={chapter.style==='travel'?'light':'dark'} data-chapter={`03.${chapter.number} — ${chapter.title.join(' ')}`}>
        <div className="business-image"><Image src={chapter.image} fill className="scene-photo" sizes="(min-width: 1000px) 90vw, 100vw" alt={chapter.alt}/></div><div className="business-shade"/>
        <div className="business-topline"><span>BUSINESS CHAPTER / {chapter.number}</span><span>{chapter.location}</span></div>
        <div className="scene-copy"><p className="business-category"><span>{chapter.number}</span><i/>{chapter.category}</p><h2 className="scene-title">{chapter.title.map(line=><span key={line}>{line}</span>)}</h2><p className="business-lead">{chapter.lead}</p><p className="scene-body">{chapter.copy}</p><details className="chapter-story" onToggle={()=>ScrollTrigger.refresh()}><summary>Explore the story <span aria-hidden="true">+</span></summary><div data-lenis-prevent><p>{chapter.detail}</p><p><strong>His connection</strong><br/>{chapter.role}</p>{'url' in chapter&&<a href={chapter.url} target="_blank" rel="noreferrer">Visit {chapter.title.join(' ')} <Arrow/></a>}</div></details></div>
        <div className="business-signature" aria-hidden="true">{chapter.signature.map(line=><span key={line}>{line}</span>)}</div><div className="business-footline">{chapter.highlights.map(text=><span key={text}>{text}</span>)}</div>
      </section>)}
      <section id="yalaride" className="technology-scene film-scene" data-tone="light" data-chapter="04 — YalaRide">
        <div className="technology-map" aria-hidden="true"/><div className="technology-topline"><span className="film-kicker">06 / THE SIGNATURE CHAPTER</span><span>EXPERIENCE, REIMAGINED.</span></div>
        <div className="technology-copy scene-copy"><p className="business-category"><span>06</span><i/>A GLOBAL CAR-RENTAL MARKETPLACE</p><h2 className="technology-wordmark">YalaRide</h2><h3>Decades of experience.<br/><em>One global vision.</em></h3><p className="scene-body">YalaRide brings together renters and rental businesses through one marketplace — turning first-hand industry knowledge into more accessible, convenient mobility.</p><p className="technology-build">Approximately eighteen months of focused development. Decades of experience behind it.</p><a href={BRAND.yala} target="_blank" rel="noreferrer" className="film-button">Explore YalaRide <Arrow/></a></div>
        <div className="device-stage"><div className="device-composition device-composition--photo"><Image src="/cinematic/yalaride-mobile.png" width={356} height={698} alt="YalaRide mobile website" sizes="(min-width: 1000px) 30vw, 70vw" priority/></div><p className="device-caption">THE REAL PLATFORM / YALARIDE.COM</p></div>
        <div className="marketplace-relation"><div><span>01</span><strong>Renters</strong><small>Choice & convenience</small></div><i aria-hidden="true">↔</i><div><span>THE CONNECTION</span><strong>YalaRide</strong></div><i aria-hidden="true">↔</i><div><span>02</span><strong>Rental businesses</strong><small>Visibility & opportunity</small></div></div>
      </section>
      <section id="leadership" className="leadership-scene film-scene" data-tone="light" data-chapter="05 — The principles">
        <p className="film-kicker leadership-label">05 / THE PERSON BEHIND THE VISION</p><div className="leadership-values"><h2>Hard work<br/><em>Trust</em><br/>Accountability<br/>Innovation<br/>Adaptability</h2></div><div className="leadership-portrait"><Image src="/portrait.png" width={1024} height={1536} alt="Mohammed Rizwan" sizes="(min-width: 1000px) 50vw, 85vw"/></div><div className="leadership-quote"><blockquote>“{QUOTE_PRIMARY}”</blockquote><p>— MOHAMMED RIZWAN</p><span>Staying close to the customer,<br/>the team and the work itself.</span></div><span className="leadership-signature">People.<br/>Purpose.<br/>Progress.</span>
      </section>
      <section id="vision" className="global-scene film-scene" data-tone="dark" data-chapter="06 — The global ambition">
        <div ref={globe} className="global-earth" aria-hidden="true">{globeReady?<GlobalEarth/>:<div className="earth-fallback"/>}</div><div className="global-copy"><p className="film-kicker">06 / THE NEXT HORIZON</p><h2>A more<br/><em>connected</em><br/>world.</h2><p>From local operations to a global platform. The ambition is to make mobility more accessible and create better opportunities for rental businesses worldwide.</p><a href={BRAND.yala} target="_blank" rel="noreferrer" className="film-button film-button-outline">Explore the vision <Arrow/></a></div><div className="global-baseline"><span>GROUNDED IN EXPERIENCE.</span><span>LOOKING TOWARD POSSIBILITY.</span></div>
      </section>
      <section id="contact" className="finale-scene" data-tone="light" data-chapter="07 — The journey continues">
        <p className="film-kicker">07 / ALWAYS MOVING FORWARD</p><h2>The journey<br/><em>continues.</em></h2><p className="finale-invitation">Let’s build what’s next.</p><a href={`mailto:${BRAND.email}`} className="film-button">Get in touch <Arrow/></a><div className="finale-contacts"><div><small>EMAIL</small><a href={`mailto:${BRAND.email}`}>{BRAND.email}</a></div><div><small>PHONE</small><a href="tel:+14075906100">{BRAND.phone}</a></div><div><small>OPEN FOR</small><p>Business, partnerships & media enquiries</p></div></div>
      </section>
    </main>
    <footer className="film-footer"><a href="#hero" className="film-brand"><Image src="/brand-mark.svg" alt="Mohammed Rizwan" width={46} height={34}/><span>A LIFE IN MOTION.</span></a><p>© {BRAND.year} Mohammed Rizwan</p><details className="image-credits"><summary>Image credits</summary><div><p>Country and travel images are editorial illustrations, not personal archival photographs.</p><a href="https://commons.wikimedia.org/wiki/File:Sunset_at_Badshahi_Mosque_Lahore.jpg" target="_blank" rel="noreferrer">Pakistan — MuhammadYassal</a><a href="https://commons.wikimedia.org/wiki/File:Doha_West_Bay_Skyline_Qatar_Jan_2020.jpg" target="_blank" rel="noreferrer">Qatar — Thameur Belghith</a><a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer">Both CC BY-SA 4.0; resized and visually cropped.</a><a href="https://commons.wikimedia.org/wiki/File:Liberty_enlightening_the_world.JPG" target="_blank" rel="noreferrer">United States — Ypsilonatshared / Public domain</a><a href="https://unsplash.com/photos/fV_qtB_sTV8" target="_blank" rel="noreferrer">Travel — Marcreation / Unsplash</a><p>Earth texture: Three.js example asset. Business imagery and portrait: supplied project assets. Product screen: YalaRide.com.</p></div></details><a href="#opening">Return to opening ↑</a></footer>
    <div className="film-chapter-indicator" aria-hidden="true"><span ref={activeChapter}>01 — A life in motion</span></div>
  </div>;
}
