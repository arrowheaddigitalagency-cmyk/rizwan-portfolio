'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line } from '@react-three/drei';
import { useMemo, useRef, type MutableRefObject } from 'react';
import * as THREE from 'three';

function Arc({ a, b, color }: { a: THREE.Vector3; b: THREE.Vector3; color: string }) {
  const points = useMemo(() => {
    const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(1.38);
    return new THREE.QuadraticBezierCurve3(a, mid, b).getPoints(56);
  }, [a, b]);
  return <Line points={points} color={color} lineWidth={1.4} transparent opacity={0.9} />;
}

function GlobeMesh({ pointer }: { pointer: MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    const latLon = (lat: number, lon: number, r = 1.02) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta),
      );
    };
    return { pk: latLon(30, 69), qa: latLon(25, 51), us: latLon(33, -84) };
  }, []);

  useFrame((_, dt) => {
    if (!group.current) return;
    group.current.rotation.y += dt * 0.08;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.current.y * 0.25, 0.06);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -pointer.current.x * 0.15, 0.06);
  });

  return (
    <Float speed={0.6} rotationIntensity={0.12} floatIntensity={0.2}>
      <group ref={group} rotation={[0.15, -0.5, 0]}>
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial color="#dbe6f8" roughness={0.78} metalness={0.08} />
        </mesh>
        <mesh>
          <sphereGeometry args={[1.012, 40, 40]} />
          <meshBasicMaterial color="#1b4fd8" wireframe transparent opacity={0.1} />
        </mesh>
        {Object.values(nodes).map((p, i) => (
          <mesh key={i} position={p}>
            <sphereGeometry args={[0.032, 16, 16]} />
            <meshBasicMaterial color="#b8956c" />
          </mesh>
        ))}
        <Arc a={nodes.pk} b={nodes.qa} color="#c9a87a" />
        <Arc a={nodes.qa} b={nodes.us} color="#c9a87a" />
        {[1.18, 1.32, 1.48].map((r, i) => (
          <mesh key={r} rotation={[Math.PI / (2.2 + i * 0.2), 0.15 * i, 0.1 * i]}>
            <ringGeometry args={[r, r + 0.012, 72]} />
            <meshBasicMaterial color="#1b4fd8" transparent opacity={0.18 - i * 0.04} side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

export default function Globe({ active = true }: { active?: boolean }) {
  const pointer = useRef({ x: 0, y: 0 });

  return (
    <div
      style={{ width: '100%', height: '100%' }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        pointer.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
        pointer.current.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
    >
      <Canvas
        camera={{ position: [0, 0.15, 3.05], fov: 36 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={active ? 'always' : 'demand'}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 3, 2]} intensity={1.15} />
        <GlobeMesh pointer={pointer} />
      </Canvas>
    </div>
  );
}
