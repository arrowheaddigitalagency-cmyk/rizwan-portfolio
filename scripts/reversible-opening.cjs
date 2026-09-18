const fs=require('fs');const p='components/cinematic/CinematicPortfolio.tsx';let s=fs.readFileSync(p,'utf8');const a=s.indexOf('        const hero = gsap.timeline(');const b=s.indexOf("        gsap.utils.toArray<HTMLElement>('.journey-scene')",a);s=s.slice(0,a)+s.slice(b);const insert=`      mm.add('(prefers-reduced-motion: no-preference)', () => {
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
`;
s=s.replace("    const ctx = gsap.context(() => {\n","    const ctx = gsap.context(() => {\n"+insert);s=s.replace('<main ref={main} id="main">','<main ref={main} id="main">\n      <div className="opening-sequence">');s=s.replace('      <div id="journey"','      </div>\n      <div id="journey"');fs.writeFileSync(p,s);
const sp='components/SmoothScrollProvider.tsx';let t=fs.readFileSync(sp,'utf8');t=t.replace('// Use a numeric destination so CSS scroll-margin is not applied twice.',`// Hero lives behind the opening; its anchor must finish the reveal first.
      const openingReveal=ScrollTrigger.getById('opening-reveal');
      const destination=hash==='#hero'&&openingReveal ? openingReveal.end+1 : hash==='#opening'&&openingReveal ? openingReveal.start : target.getBoundingClientRect().top+scrollY-offset-16;`);t=t.replaceAll('target.getBoundingClientRect().top + scrollY - offset - 16','destination');fs.writeFileSync(sp,t);
