"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Stars } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function Earth() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <Sphere ref={meshRef} args={[2, 64, 64]}>
        <meshStandardMaterial
          color="#0a1929"
          emissive="#00d9ff"
          emissiveIntensity={0.2}
          wireframe={false}
          transparent
          opacity={0.6}
        />
      </Sphere>
      <Sphere ref={wireframeRef} args={[2.05, 32, 32]}>
        <meshBasicMaterial
          color="#00d9ff"
          wireframe={true}
          transparent
          opacity={0.3}
        />
      </Sphere>
    </group>
  );
}

function Eye() {
  const groupRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = 5 + Math.sin(time * 0.5) * 0.3;
      groupRef.current.scale.setScalar(1 + Math.sin(time * 0.8) * 0.05);
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = time * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[0, 5, -2]}>
      {/* Outer ring */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[1.5, 0.05, 16, 100]} />
        <meshStandardMaterial
          color="#00fff9"
          emissive="#00fff9"
          emissiveIntensity={2}
        />
      </mesh>

      {/* Eye sphere */}
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial
          color="#00d9ff"
          emissive="#00d9ff"
          emissiveIntensity={1.5}
          transparent
          opacity={0.8}
        />
      </Sphere>

      {/* Pupil */}
      <Sphere args={[0.4, 32, 32]} position={[0, 0, 0.6]}>
        <meshStandardMaterial
          color="#000033"
          emissive="#0000ff"
          emissiveIntensity={0.5}
        />
      </Sphere>

      {/* Light rays */}
      <pointLight position={[0, 0, 0]} intensity={2} color="#00fff9" distance={20} />
    </group>
  );
}

function DataStreams() {
  const particlesRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 2000; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const radius = 3 + Math.random() * 5;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + i) * 0.01;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00d9ff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function NeuralConnections() {
  const linesRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const points = [];
    const numConnections = 100;

    for (let i = 0; i < numConnections; i++) {
      const theta1 = Math.random() * Math.PI * 2;
      const phi1 = Math.random() * Math.PI;
      const theta2 = Math.random() * Math.PI * 2;
      const phi2 = Math.random() * Math.PI;

      const radius = 2.2;

      const x1 = radius * Math.sin(phi1) * Math.cos(theta1);
      const y1 = radius * Math.sin(phi1) * Math.sin(theta1);
      const z1 = radius * Math.cos(phi1);

      const x2 = radius * Math.sin(phi2) * Math.cos(theta2);
      const y2 = radius * Math.sin(phi2) * Math.sin(theta2);
      const z2 = radius * Math.cos(phi2);

      points.push(x1, y1, z1, x2, y2, z2);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    return geo;
  }, []);

  useFrame(() => {
    if (linesRef.current) {
      linesRef.current.rotation.y += 0.001;
    }
  });

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial
        color="#00fff9"
        transparent
        opacity={0.15}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

function GlitchParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 500; i++) {
      temp.push(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
    }
    return new Float32Array(temp);
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        if (Math.random() > 0.98) {
          positions[i] += (Math.random() - 0.5) * 0.5;
          positions[i + 1] += (Math.random() - 0.5) * 0.5;
          positions[i + 2] += (Math.random() - 0.5) * 0.5;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#00fff9"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 2, 10], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'radial-gradient(circle, #001a2e 0%, #000000 100%)' }}
    >
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 5, 25]} />

      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={1} color="#00d9ff" />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#00fff9" />

      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      <Earth />
      <Eye />
      <DataStreams />
      <NeuralConnections />
      <GlitchParticles />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2.5}
      />
    </Canvas>
  );
}
