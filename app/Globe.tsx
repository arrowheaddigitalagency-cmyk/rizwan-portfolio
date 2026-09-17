'use client';
import { Suspense, useEffect, useRef, useState, Component, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Network() {
  const group = useRef<THREE.Group>(null);
  const [geometry] = useState(() => {
    const points: number[] = [];
    const count = 1700;
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = Math.PI * (3 - Math.sqrt(5)) * i;
      points.push(Math.cos(theta) * radius * 2, y * 2, Math.sin(theta) * radius * 2);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    return g;
  });
  const [routes] = useState(() => {
    const coordinates = [[69,30], [51,25], [-84,34]];
    const vectors = coordinates.map(([lon,lat]) => new THREE.Vector3(Math.cos(lat*Math.PI/180)*Math.sin(lon*Math.PI/180),Math.sin(lat*Math.PI/180),Math.cos(lat*Math.PI/180)*Math.cos(lon*Math.PI/180)).multiplyScalar(2));
    return [[0,1],[1,2],[2,0]].map(([a,b]) => {
      const mid = vectors[a].clone().add(vectors[b]).normalize().multiplyScalar(3.5);
      return new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(vectors[a],mid,vectors[b]),64,.012,6,false);
    });
  });
  useEffect(() => () => { geometry.dispose(); routes.forEach(r => r.dispose()); }, [geometry,routes]);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * .07;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, state.pointer.y * .12, .025);
  });
  return <group ref={group} rotation={[.12,-.5,.08]}>
    <points geometry={geometry}><pointsMaterial color="#4a6758" size={.022} transparent opacity={.62} sizeAttenuation /></points>
    <mesh><sphereGeometry args={[1.99,40,40]} /><meshBasicMaterial color="#e8ede4" transparent opacity={.95} /></mesh>
    {routes.map((g,i) => <mesh key={i} geometry={g}><meshBasicMaterial color={i===0?'#bf7149':'#748673'} transparent opacity={.85} /></mesh>)}
  </group>;
}
class Fallback extends Component<{children:ReactNode},{failed:boolean}> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <div className="globe-fallback">Pakistan → Qatar → United States<br/><em>A vision without borders.</em></div> : this.props.children; }
}
export default function Globe() {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible,setVisible] = useState(false);
  const [reduced,setReduced] = useState(true);
  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);
    const change = () => setReduced(query.matches);
    query.addEventListener('change',change);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {rootMargin:'150px'});
    if(wrap.current) observer.observe(wrap.current);
    return () => { observer.disconnect(); query.removeEventListener('change',change); };
  },[]);
  return <div ref={wrap} className="globe-canvas" role="img" aria-label="A conceptual globe connecting Pakistan, Qatar and the United States, representing the journey behind YalaRide. Routes illustrate the founder’s story, not service availability.">
    <Fallback><Suspense fallback={null}><Canvas dpr={[1,1.5]} frameloop={visible&&!reduced?'always':'demand'} camera={{position:[0,0,6.8],fov:45}} gl={{antialias:true,alpha:true,powerPreference:'low-power'}}><Network /></Canvas></Suspense></Fallback>
  </div>;
}
