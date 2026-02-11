import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Edges } from '@react-three/drei';
import * as THREE from 'three';

export default function HolographicTerminal({ position = [0, 0, 0], data = [] }) {
    const boxRef = useRef();
    const glowRef = useRef();

    useFrame((state) => {
        if (!boxRef.current) return;

        const time = state.clock.getElapsedTime();

        // Gentle floating
        boxRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.1;

        // Subtle rotation
        boxRef.current.rotation.y = Math.sin(time * 0.3) * 0.1;

        // Pulsing glow
        if (glowRef.current) {
            glowRef.current.material.opacity = 0.15 + Math.sin(time * 2) * 0.05;
        }
    });

    return (
        <group position={position}>
            {/* Main holographic box */}
            <group ref={boxRef}>
                <RoundedBox args={[2, 1.5, 0.1]} radius={0.05}>
                    <meshStandardMaterial
                        color="#0d1117"
                        transparent
                        opacity={0.3}
                        metalness={0.8}
                        roughness={0.2}
                    />
                    <Edges
                        threshold={15}
                        color="#3fb950"
                        linewidth={2}
                    />
                </RoundedBox>

                {/* Holographic scanlines */}
                {[...Array(10)].map((_, i) => (
                    <mesh
                        key={i}
                        position={[0, 0.6 - i * 0.15, 0.06]}
                    >
                        <planeGeometry args={[1.8, 0.02]} />
                        <meshBasicMaterial
                            color="#3fb950"
                            transparent
                            opacity={0.2}
                            blending={THREE.AdditiveBlending}
                        />
                    </mesh>
                ))}
            </group>

            {/* Outer glow */}
            <mesh ref={glowRef} position={[0, 0, -0.2]}>
                <planeGeometry args={[2.5, 2]} />
                <meshBasicMaterial
                    color="#3fb950"
                    transparent
                    opacity={0.15}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
        </group>
    );
}
