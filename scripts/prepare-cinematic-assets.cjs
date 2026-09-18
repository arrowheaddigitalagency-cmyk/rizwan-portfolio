const fs=require('fs/promises');const sharp=require('sharp');
const assets=[
 ['pakistan','https://upload.wikimedia.org/wikipedia/commons/a/a9/Sunset_at_Badshahi_Mosque_Lahore.jpg'],
 ['qatar','https://upload.wikimedia.org/wikipedia/commons/f/f3/Doha_West_Bay_Skyline_Qatar_Jan_2020.jpg'],
 ['united-states','https://upload.wikimedia.org/wikipedia/commons/a/a0/Liberty_enlightening_the_world.JPG'],
 ['tourism','https://images.unsplash.com/photo-1778090887585-b27fae5b6f03?auto=format&fit=crop&w=2000&q=85'],
 ['earth','https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg'],
];
(async()=>{await fs.mkdir('public/cinematic',{recursive:true});await Promise.all(assets.map(async([name,url])=>{try{const res=await fetch(url,{headers:{'User-Agent':'PortfolioAssetReview/1.0'},signal:AbortSignal.timeout(45000)});if(!res.ok)throw Error(res.status);const data=Buffer.from(await res.arrayBuffer());await sharp(data).resize({width:name==='earth'?2048:1920,withoutEnlargement:true}).webp({quality:85}).toFile(`public/cinematic/${name}.webp`);console.log('Saved',name)}catch(e){console.log('FAILED',name,e.message)}}));await sharp('public/brands/yalaride-scene.svg').resize(2200,749).webp({quality:90}).toFile('public/cinematic/automotive-intro.webp');})();
