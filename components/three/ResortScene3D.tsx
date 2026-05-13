'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Environment, ContactShadows, Float } from '@react-three/drei';
import { Suspense, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Room, RoomStatus } from '@/data/rooms';

const COLORS: Record<RoomStatus, string> = {
  available: '#3fbf6f',
  booked: '#c43d3d',
  selected: '#e6c878',
  maintenance: '#7a7a7a',
};

function Ground() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#1a2a22" roughness={0.95} />
      </mesh>
      {/* sand path */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 0]}>
        <ringGeometry args={[2, 2.4, 64]} />
        <meshStandardMaterial color="#c8a96a" opacity={0.35} transparent />
      </mesh>
      {/* water */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.045, -7]}>
        <planeGeometry args={[30, 8]} />
        <meshStandardMaterial color="#1a3a4a" metalness={0.6} roughness={0.2} />
      </mesh>
    </>
  );
}

function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.07, 0.8]} />
        <meshStandardMaterial color="#4a3520" />
      </mesh>
      <mesh position={[0, 1.1, 0]} castShadow>
        <coneGeometry args={[0.4, 1.2, 8]} />
        <meshStandardMaterial color="#2f5a3a" />
      </mesh>
    </group>
  );
}

function RoomBuilding({ room, onSelect, isSelected }: { room: Room; onSelect: (r: Room) => void; isSelected: boolean }) {
  const status = isSelected ? 'selected' : room.status;
  const color = COLORS[status];
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  useFrame((_, dt) => {
    if (ref.current && (hovered || isSelected)) {
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, 0.55, dt * 4);
    } else if (ref.current) {
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, 0.4, dt * 4);
    }
  });
  const heightByType = { Cottage: 0.6, Suite: 0.8, Villa: 1.0, Pavilion: 0.7 }[room.type];
  const widthByType = { Cottage: 0.9, Suite: 1.0, Villa: 1.3, Pavilion: 1.5 }[room.type];

  const clickable = room.status !== 'booked' && room.status !== 'maintenance';

  return (
    <group position={[room.position[0], 0, room.position[1]]}>
      {/* base */}
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[widthByType + 0.2, 0.1, widthByType * 0.9 + 0.2]} />
        <meshStandardMaterial color="#2a2520" />
      </mesh>
      {/* building */}
      <mesh ref={ref} position={[0, 0.4, 0]} castShadow
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = clickable ? 'pointer' : 'not-allowed'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
        onClick={(e) => { e.stopPropagation(); if (clickable) onSelect(room); }}>
        <boxGeometry args={[widthByType, heightByType, widthByType * 0.85]} />
        <meshStandardMaterial color={hovered || isSelected ? '#f4efe6' : '#e8dcc4'} roughness={0.7} />
      </mesh>
      {/* roof */}
      <mesh position={[0, heightByType + 0.45, 0]} castShadow rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[widthByType * 0.85, 0.4, 4]} />
        <meshStandardMaterial color="#3a2a1f" />
      </mesh>
      {/* status marker */}
      <Float speed={2} rotationIntensity={0} floatIntensity={0.4}>
        <mesh position={[0, heightByType + 1.2, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
        </mesh>
      </Float>
      {/* label */}
      {(hovered || isSelected) && (
        <Html position={[0, heightByType + 1.6, 0]} center distanceFactor={8}>
          <div className="pointer-events-none whitespace-nowrap px-3 py-2 bg-ink/85 backdrop-blur border border-gold/40 text-bone text-[11px] tracking-widest uppercase">
            <div className="text-gold">{room.name}</div>
            <div className="text-bone/70 normal-case tracking-normal text-[10px]">₹{room.pricePerNight.toLocaleString('en-IN')} / night</div>
          </div>
        </Html>
      )}
    </group>
  );
}

function Scene({ rooms, selectedId, onSelect }: { rooms: Room[]; selectedId: string | null; onSelect: (r: Room) => void }) {
  const trees = useMemo(() => Array.from({ length: 18 }, (_, i) => {
    const a = (i / 18) * Math.PI * 2;
    const r = 6 + Math.random() * 1.5;
    return [Math.cos(a) * r, 0, Math.sin(a) * r] as [number, number, number];
  }), []);
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-5, 6, -5]} intensity={0.4} color="#c8a96a" />
      <fog attach="fog" args={['#0a0a0c', 12, 30]} />
      <Ground />
      {trees.map((p, i) => <Tree key={i} position={p} />)}
      {rooms.map((r) => (
        <RoomBuilding key={r.id} room={r} onSelect={onSelect} isSelected={selectedId === r.id} />
      ))}
      <ContactShadows position={[0, 0, 0]} opacity={0.5} scale={20} blur={2} far={3} />
      <Environment preset="sunset" />
    </>
  );
}

export default function ResortScene3D({
  rooms, selectedId, onSelect,
}: { rooms: Room[]; selectedId: string | null; onSelect: (r: Room) => void }) {
  return (
    <Canvas shadows camera={{ position: [8, 7, 8], fov: 45 }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <Scene rooms={rooms} selectedId={selectedId} onSelect={onSelect} />
        <OrbitControls
          enablePan={false}
          minDistance={6}
          maxDistance={18}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.2}
          enableDamping
          dampingFactor={0.08}
        />
      </Suspense>
    </Canvas>
  );
}
