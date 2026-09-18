// Rebuild raster icons from the source vector. The cinematic OG is captured
// separately by capture-cinematic-og.cjs against the local preview.
const sharp = require('sharp');
Promise.all([
  sharp('public/icon.svg').resize(32,32).png().toFile('public/favicon-32.png'),
  sharp('public/icon.svg').resize(180,180).png().toFile('public/apple-touch-icon.png'),
]).then(()=>console.log('Raster icons generated. Run capture-cinematic-og.cjs with the preview running to rebuild the OG image.')).catch(error=>{console.error(error);process.exitCode=1});
