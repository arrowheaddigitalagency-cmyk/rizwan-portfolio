'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { journey, ventures, values } from './content';
const Globe = dynamic(() => import('./Globe'), { ssr: false, loading: () => <div className="globe-placeholder" /> });
const chapters = [['journey','The journey'],['businesses','The ventures'],['philosophy','The approach'],['yalaride','The next chapter']];
const Arrow = ({ diagonal=false }: { diagonal?:boolean }) => <span aria-hidden="true">{diagonal?'↗':'→'}</span>;

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const [menu,setMenu] = useState(false);
  const [venture,setVenture] = useState(0);
  const [principle,setPrinciple] = useState(0);
  const [chapter,setChapter] = useState('');
  const [journeyStep,setJourneyStep] = useState(0);
  const [emailCopied,setEmailCopied] = useState(false);
  const selected = ventures[venture];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    let lenis: Lenis | undefined;
    let tick: ((time:number)=>void) | undefined;
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      lenis = new Lenis({ duration: 1.12, smoothWheel: true, anchors: { offset: -88 } });
      lenis.on('scroll', ScrollTrigger.update);
      tick = (time:number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.from('.hero-reveal', { y: 35, opacity: 0, stagger: .12, duration: 1.2, ease:'power3.out' });
      gsap.from('.portrait-frame', { clipPath:'inset(12% 0 0 0)', scale:1.04, duration:1.7, ease:'power3.out' });
      gsap.utils.toArray<HTMLElement>('.reveal').forEach(el => gsap.from(el,{y:35,opacity:0,duration:1, ease:'power2.out',scrollTrigger:{trigger:el,start:'top 90%',once:true}}));
      gsap.to('.hero-photo',{yPercent:9,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
      gsap.to('.convergence-word',{scale:.7,opacity:.25, y:-45,ease:'none',scrollTrigger:{trigger:'.convergence',start:'top 65%',end:'bottom 30%',scrub:true}});
      return () => { if(tick)gsap.ticker.remove(tick); lenis?.destroy(); };
    });
    mm.add('(min-width: 1000px) and (prefers-reduced-motion: no-preference)',()=>{
      const track = document.querySelector('.journey-track') as HTMLElement;
      gsap.to(track,{x:()=>-(track.scrollWidth-window.innerWidth), ease:'none',scrollTrigger:{trigger:'.journey-pin',pin:true,start:'top 88px',end:()=>'+='+window.innerWidth*1.8,scrub:1,invalidateOnRefresh:true,onUpdate:self=>setJourneyStep(Math.min(2,Math.round(self.progress*2)))}});
    });
    const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)setChapter(entry.target.id);}),{rootMargin:'-25% 0px -55% 0px'});
    document.querySelectorAll('section[id]').forEach(el=>observer.observe(el));
    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
    window.addEventListener('load',refresh);
    return () => { mm.revert(); observer.disconnect(); window.removeEventListener('load',refresh); };
  },[]);
  useEffect(()=>{
    if(!menu)return;
    const close = (e:KeyboardEvent) => {if(e.key==='Escape'){setMenu(false);document.getElementById('menu-toggle')?.focus();}};
    window.addEventListener('keydown',close);
    return ()=>window.removeEventListener('keydown',close);
  },[menu]);
  useEffect(() => { ScrollTrigger.refresh(); }, [principle, venture]);
  async function copyEmail() { try {await navigator.clipboard.writeText('riz_wizard@yahoo.com');setEmailCopied(true);setTimeout(()=>setEmailCopied(false),2500);}catch {window.location.href='mailto:riz_wizard@yahoo.com';} }

  return <div ref={root}>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <a className="brand" href="#" aria-label="Mohammed Rizwan, home"><span className="monogram">MR<span>.</span></span><span className="brand-name">MOHAMMED<br/>RIZWAN</span></a>
      <nav className="desktop-nav" aria-label="Main navigation">{chapters.map(([id,label])=><a key={id} href={'#'+id} className={chapter===id?'active':''}>{label}</a>)}</nav>
      <a className="header-contact" href="#contact">Let’s connect <Arrow diagonal/></a>
      <button id="menu-toggle" className="menu-toggle" onClick={()=>setMenu(!menu)} aria-expanded={menu} aria-controls="mobile-menu">{menu?'Close −':'Menu +'}</button>
    </header>
    {menu&&<nav id="mobile-menu" className="mobile-menu" aria-label="Mobile navigation">{[...chapters,['contact','Let’s connect']].map(([id,label],i)=><a key={id} href={'#'+id} onClick={()=>setMenu(false)}><small>0{i+1}</small>{label}<Arrow/></a>)}</nav>}
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow hero-reveal"><span className="tiny-cross">✳</span> ENTREPRENEUR. BUILDER. ALWAYS MOVING.</div>
          <h1 id="hero-title" className="hero-reveal">A life<br/>in <em>motion.</em></h1>
          <div className="hero-intro hero-reveal"><span className="short-line"/><div><h2>Mohammed Rizwan</h2><p>From humble beginnings to a global vision.<br/>Building businesses that move people forward.</p></div></div>
          <a className="round-link hero-reveal" href="#journey"><span className="round-icon">↓</span><span>Discover the journey<small>PAKISTAN → QATAR → UNITED STATES</small></span></a>
          <div className="hero-bottom hero-reveal"><span>CEO & FOUNDER, YALARIDE</span><span>SCROLL TO EXPLORE ↓</span></div>
        </div>
        <div className="hero-visual"><div className="portrait-frame"><Image className="hero-photo" src="/portrait.jpg" alt="Mohammed Rizwan, wearing a navy suit, in an automotive showroom" fill priority sizes="(max-width: 760px) 100vw, 48vw"/><div className="portrait-caption"><span>THE PERSON BEHIND THE VISION</span><span>01 / PORTRAIT</span></div></div><span className="image-side-note">GROUNDED IN EXPERIENCE. OPEN TO POSSIBILITY.</span><div className="portrait-seal" aria-hidden="true"><span>A WORLD<br/>OF POSSIBILITY</span><b>↗</b></div></div>
      </section>

      <section className="opening section-pad" aria-labelledby="opening-title">
        <div className="section-kicker"><span>THE CONNECTING THREAD</span><span>01 — ORIGINS</span></div>
        <div className="opening-grid"><div className="reveal"><span className="fine-label">ONE PERSON. MANY CHAPTERS.</span><h2 id="opening-title">Every new beginning.<br/>The same <em>drive.</em></h2></div><div className="opening-body reveal"><p>Some journeys are measured in miles. His is measured in the willingness to begin again.</p><p>From small jobs in Pakistan to work in Qatar and more than three decades in the United States, Mohammed Rizwan has built a life around a simple conviction: understand the problem, earn people’s trust, and do the work.</p><a className="text-link" href="#businesses">Meet the businesses behind the story <Arrow/></a></div></div>
        <div className="route-strip" aria-label="Journey: Pakistan, Qatar, United States, a global vision"><span>PAKISTAN</span><i/><span>QATAR</span><i/><span>UNITED STATES</span><i/><span className="route-future">THE WORLD ↗</span></div>
      </section>

      <section id="journey" className="journey-section" aria-labelledby="journey-title">
        <div className="journey-pin">
          <div className="journey-top"><span className="fine-label" id="journey-title">THE JOURNEY / ACROSS BORDERS</span><div className="chapter-dots" aria-hidden="true">{journey.map((_,i)=><span key={i} className={journeyStep===i?'selected':''}>0{i+1}</span>)}</div><span className="fine-label journey-scroll">SCROLL TO TRAVEL →</span></div>
          <div className="journey-track">{journey.map((item,i)=><article className={'journey-scene scene-'+i} key={item.place}>
            <div className="journey-number" aria-hidden="true">0{i+1}</div><div className="journey-landmark"><span className="place-word">{item.place==='United States'?<>United<br/>States.</>:item.place+'.'}</span><div className="latitude"><span>{i===0?'THE ROOTS':i===1?'THE CROSSING':'THE FOUNDATION'}</span><span>{i===2?'30+ YEARS':'A NEW PERSPECTIVE'}</span></div></div>
            <div className="journey-narrative"><span className="fine-label">{item.label}</span><h3>{item.title.split('\n').map((line,j)=><span key={j}>{line}<br/></span>)}</h3><p>{item.body}</p><span className="journey-note">{item.note}</span></div>
          </article>)}</div>
        </div>
      </section>

      <section id="businesses" className="ecosystem section-pad" aria-labelledby="ventures-title">
        <div className="section-kicker"><span>EXPERIENCE, CONNECTED</span><span>02 — ENTERPRISE</span></div>
        <div className="section-heading reveal"><h2 id="ventures-title">Different ventures.<br/>One <em>entrepreneur.</em></h2><p>A business grows. A new insight emerges.<br/>Each venture adds to the next.</p></div>
        <div className="ecosystem-layout">
          <div className="orbit" aria-label="Explore six connected areas of business experience">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><circle cx="50" cy="49" r="34" className="orbit-ring"/>{ventures.map((v,i)=><line key={v.name} x1="50" y1="49" x2={v.x} y2={v.y} className={venture===i?'orbit-line selected':'orbit-line'}/>)}</svg>
            <div className="orbit-center"><span>MR</span><small>THE COMMON THREAD</small></div>
            {ventures.map((v,i)=><button key={v.name} style={{left:v.x+'%',top:v.y+'%'}} className={'orbit-node '+(venture===i?'selected':'')} aria-pressed={venture===i} aria-controls="venture-detail" onClick={()=>setVenture(i)}><span className="node-dot"/><small>{v.number} / {i===5?'THE NEXT CHAPTER':v.category}</small><strong>{v.name}</strong></button>)}
            <span className="orbit-instruction">SELECT A VENTURE TO EXPLORE ↗</span>
          </div>
          <div className="venture-detail" id="venture-detail" aria-live="polite" aria-atomic="true"><div className="detail-top"><span className="fine-label">{selected.category}</span><span className="venture-count">{selected.number}<span> / 06</span></span></div><span className="venture-subtitle">{selected.short}</span><h3>{selected.name}</h3><p>{selected.body}</p><div className="connection"><span>THE CONNECTION</span><p>{selected.connection}</p></div><div className="detail-bottom"><button className="circle-button" aria-label="Previous venture" onClick={()=>setVenture((venture+5)%6)}>←</button><span>EXPLORE THE ECOSYSTEM</span><button className="circle-button" aria-label="Next venture" onClick={()=>setVenture((venture+1)%6)}>→</button></div>{venture===5&&<a href="https://yalaride.com/" target="_blank" rel="noreferrer" className="text-link">Visit YalaRide <Arrow diagonal/></a>}</div>
        </div>
        <p className="ecosystem-foot">From the workshop to the wider world. <span>Built through direct involvement, customer trust and practical problem-solving.</span></p>
      </section>

      <section id="philosophy" className="philosophy section-pad" aria-labelledby="philosophy-title">
        <div className="section-kicker"><span>THE WAY HE WORKS</span><span>03 — PRINCIPLES</span></div>
        <div className="philosophy-grid"><div className="philosophy-portrait reveal"><div className="small-portrait"><Image src="/portrait.jpg" alt="Mohammed Rizwan in his automotive business environment" fill sizes="(max-width: 760px) 85vw, 35vw"/></div><span className="portrait-label">A HANDS-ON LEADER, AT EVERY STAGE.</span></div><div><h2 id="philosophy-title" className="reveal">Vision is global.<br/>Leadership is <em>personal.</em></h2><div className="principles">{values.map(([title,label,body],i)=><div className={'principle '+(principle===i?'open':'')} key={title}><h3><button aria-expanded={principle===i} aria-controls={'principle-'+i} onClick={()=>setPrinciple(principle===i?-1:i)}><span className="principle-index">0{i+1}</span>{title}<span className="principle-toggle">{principle===i?'−':'+'}</span></button></h3><div id={'principle-'+i} hidden={principle!==i}><span className="fine-label">{label}</span><p>{body}</p></div></div>)}</div></div></div>
        <blockquote className="founder-quote reveal"><span aria-hidden="true">“</span><p>No matter how much a business grows, a leader should never lose touch with the customer, the team or the work itself.</p><cite>MOHAMMED RIZWAN</cite></blockquote>
      </section>

      <div className="convergence" aria-hidden="true"><div className="convergence-word">Experience.</div><div className="convergence-lines"><span>VEHICLES</span><span>PEOPLE</span><span>TRAVEL</span><span>TECHNOLOGY</span></div><div className="convergence-stem"/><span className="convergence-caption">EVERY CHAPTER LEADS HERE</span><span className="convergence-arrow">↓</span></div>

      <section id="yalaride" className="yalaride section-pad" aria-labelledby="yala-title">
        <div className="section-kicker"><span>THE NEXT CHAPTER</span><span>04 — A GLOBAL VISION</span></div>
        <div className="yala-hero"><div className="yala-copy reveal"><span className="yala-wordmark">YalaRide<span>↗</span></span><h2 id="yala-title">A world of experience.<br/>A world <em>in reach.</em></h2><p>Decades on the ground. A new possibility online. YalaRide brings real automotive and rental experience into a marketplace built to make mobility easier.</p><a href="https://yalaride.com/" target="_blank" rel="noreferrer" className="button-dark">Explore YalaRide <Arrow diagonal/></a><span className="platform-note">A GLOBAL CAR-RENTAL MARKETPLACE</span></div><div className="globe-wrap"><Globe/><span className="globe-note">A FOUNDER’S JOURNEY. A WORLDWIDE AMBITION.</span></div></div>
        <div className="yala-context"><div><span className="fine-label">BUILT FROM BOTH SIDES OF THE COUNTER</span><h3>He knew the challenge.<br/>So he built the connection.</h3></div><div><p>Renters wanted accessible choices and better value. Rental businesses needed visibility and new ways to reach customers. Having worked on both sides, Rizwan understood the opportunity to connect them.</p><p>Approximately eighteen months of focused development translated that experience into YalaRide. His earlier ventures continue to operate as he leads this next chapter.</p></div></div>
        <div className="marketplace-bridge"><div><span>FOR RENTERS</span><h3>More choice.<br/>Less friction.</h3><p>Discover options suited to location, needs and budget, with competitive value and easier access to rental providers.</p></div><div className="bridge-symbol" aria-hidden="true">↔</div><div><span>FOR RENTAL BUSINESSES</span><h3>Greater visibility.<br/>Wider opportunity.</h3><p>A digital channel to present vehicles, reach new customers and participate in a broader mobility marketplace.</p></div></div>
        <div className="vision-statement reveal"><span className="fine-label">THE MISSION</span><p>Make car rentals more accessible.<br/>Connect people with possibility.</p><span className="vision-caption">The ambition: a trusted worldwide platform, shaped by industry experience and built to serve travellers and rental businesses of different sizes.</span></div>
      </section>

      <section className="horizons section-pad" aria-labelledby="horizons-title"><div className="section-kicker"><span>ALWAYS LOOKING AHEAD</span><span>05 — HORIZONS</span></div><div className="horizons-grid"><div className="reveal"><h2 id="horizons-title">The next destination<br/>is <em>possibility.</em></h2><p className="horizons-intro">The future of mobility is built through people, partnerships and a willingness to keep learning.</p></div><div className="horizons-stories"><article><span className="fine-label">INTERNATIONAL ENGAGEMENT</span><h3>In conversation with the world.</h3><p>Rizwan participates in international travel and tourism exhibitions, building relationships, studying global trends and introducing his ventures to new markets. His exhibition activity includes dedicated counters for tourism initiatives and YalaRide, with participation in a major travel industry event in Riyadh.</p></article><article><span className="fine-label">CUSTOMERS & COMMUNITY</span><h3>Practical impact. Everyday.</h3><p>From vehicle repairs to rentals and dealership operations, his businesses help individuals, families and travellers make important mobility decisions. YalaRide carries that service mindset into a wider digital space.</p></article><article><span className="fine-label">WHAT COMES NEXT</span><h3>Taking YalaRide to the world.</h3><p>His focus is on expanding across international markets, building meaningful partnerships and improving the experience for renters and rental businesses—while continuing to develop ventures that solve real needs.</p></article></div></div></section>

      <section id="contact" className="contact section-pad" aria-labelledby="contact-title"><div className="section-kicker"><span>THE CONVERSATION CONTINUES</span><span>06 — CONNECT</span></div><div className="contact-main"><h2 id="contact-title">Let’s move<br/><em>forward.</em><a href="mailto:riz_wizard@yahoo.com" aria-label="Email Mohammed Rizwan" className="contact-arrow">↗</a></h2><div className="contact-intro"><p>For partnerships, business opportunities,<br/>media and professional enquiries.</p><a className="contact-email" href="mailto:riz_wizard@yahoo.com">riz_wizard@yahoo.com <Arrow diagonal/></a><button className="copy-email" onClick={copyEmail} aria-live="polite">{emailCopied?'Email copied ✓':'Copy email address'}</button><a className="contact-phone" href="tel:+14075906100">+1 (407) 590-6100</a></div></div><div className="contact-signoff"><span>MOHAMMED RIZWAN</span><p>Entrepreneur. Automotive leader.<br/>CEO & Founder of YalaRide.</p><a href="https://yalaride.com/" target="_blank" rel="noreferrer">YalaRide.com <Arrow diagonal/></a></div></section>
    </main>
    <footer><span>© {new Date().getFullYear()} Mohammed Rizwan</span><span>A LIFE IN MOTION.</span><a href="#">Back to the beginning ↑</a></footer>
  </div>;
}


