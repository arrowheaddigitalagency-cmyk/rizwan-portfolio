const fs=require('fs');const file='components/cinematic/CinematicPortfolio.tsx';let s=fs.readFileSync(file,'utf8');s=s.replace("if(i===2)tl.to(photo,{xPercent:3,duration:1,ease:'none'},0);",`if(i===2)tl.to(photo,{xPercent:3,duration:1,ease:'none'},0);
          const frame=scene.querySelector('.business-image');
          if(frame)gsap.fromTo(frame,{clipPath:i%2?'inset(0% 0% 0% 13%)':'inset(9% 0% 9% 0%)'},{clipPath:'inset(0% 0% 0% 0%)',ease:'none',scrollTrigger:{trigger:scene,start:'top 85%',end:'top top',scrub:.7}});
          gsap.fromTo(title,{clipPath:'inset(100% 0% 0% 0%)'},{clipPath:'inset(0% 0% 0% 0%)',ease:'none',scrollTrigger:{trigger:scene,start:'top 85%',end:'top 20%',scrub:.5}});
          if(scene.classList.contains('business-travel')){
            tl.to(scene.querySelector('.travel-whiteout'),{opacity:1,duration:.4,ease:'power1.inOut'},.8)
              .to(scene.querySelectorAll('.scene-copy, .business-signature, .business-footline, .business-topline'),{opacity:0,duration:.3},.8);
          }`);
s=s.replace('<div className="business-shade"/>','<div className="business-shade"/>{chapter.style===\'travel\'&&<div className="travel-whiteout" aria-hidden="true"/>}');
s=s.replace('<summary>Explore the story <span aria-hidden="true">+</span></summary><div>','<summary>Explore the story <span aria-hidden="true">+</span></summary><div data-lenis-prevent>');
s=s.replace("{rootMargin:'500px'}", "{rootMargin:'1400px'}");
fs.writeFileSync(file,s);
