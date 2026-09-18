'use client';

import { Canvas, useLoader } from '@react-three/fiber';
import { Suspense, Component, useState, useCallback, useEffect, type ReactNode } from 'react';
import * as THREE from 'three';

function Earth({onReady}:{onReady:()=>void}) {
  const map = useLoader(THREE.TextureLoader, '/cinematic/earth.webp');
  map.colorSpace = THREE.SRGBColorSpace;
  useEffect(()=>{onReady();},[map,onReady]);
  return <group rotation={[.08, 2.8, -.16]}>
    <mesh><sphereGeometry args={[1, 64, 48]}/><meshStandardMaterial map={map} roughness={.9} metalness={.05}/></mesh>
    <mesh scale={1.015}><sphereGeometry args={[1, 48, 32]}/><meshBasicMaterial color="#93b3cc" transparent opacity={.055} side={THREE.BackSide}/></mesh>
  </group>;
}
class GlobeBoundary extends Component<{children:ReactNode},{failed:boolean}> {
  state={failed:false};
  static getDerivedStateFromError(){return {failed:true};}
  render(){return this.state.failed ? <div className="earth-fallback"/> : this.props.children;}
}
export default function GlobalEarth() {
  const [ready,setReady]=useState(false);
  const onReady=useCallback(()=>setReady(true),[]);
  return <GlobeBoundary><div className="earth-renderer">{!ready&&<div className="earth-fallback"/>}<div className="earth-canvas" style={{opacity:ready?1:0}}><Canvas camera={{position:[0,0,3.1],fov:42}} dpr={[1,1.5]} frameloop="demand" gl={{alpha:true,antialias:true,powerPreference:'low-power'}} fallback={<div className="earth-fallback"/>}>
    <ambientLight intensity={.55}/><directionalLight position={[-3,2,4]} intensity={2.5} color="#f0d5a6"/>
    <Suspense fallback={null}><Earth onReady={onReady}/></Suspense>
  </Canvas></div></div></GlobeBoundary>;
}
