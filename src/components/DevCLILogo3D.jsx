import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const asciiLogo = [
    '██████╗ ███████╗██╗   ██╗ ██████╗██╗     ██╗',
    '██╔══██╗██╔════╝██║   ██║██╔════╝██║     ██║',
    '██║  ██║█████╗  ██║   ██║██║     ██║     ██║',
    '██║  ██║██╔══╝  ╚██╗ ██╔╝██║     ██║     ██║',
    '██████╔╝███████╗ ╚████╔╝ ╚██████╗███████╗██║',
    '╚═════╝ ╚══════╝  ╚═══╝   ╚═════╝╚══════╝╚═╝',
];

export default function DevCLILogo3D({ position = [0, 0, 0], scale = 1 }) {
    const groupRef = useRef();

    useFrame((state) => {
        if (!groupRef.current) return;

        const time = state.clock.getElapsedTime();

        // Gentle rotation
        groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.15;
        groupRef.current.rotation.x = Math.cos(time * 0.2) * 0.05;

        // Floating animation
        groupRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.1;
    });

    return (
        <group ref={groupRef} position={position} scale={scale}>
            {asciiLogo.map((line, index) => (
                <Text
                    key={index}
                    position={[0, (asciiLogo.length / 2 - index) * 0.25, 0]}
                    fontSize={0.15}
                    color="#3fb950"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.015}
                    outlineColor="#1a1a1a"
                    transparent
                    opacity={0.7}
                    font="/fonts/RobotoMono-Regular.ttf"
                >
                    {line}
                </Text>
            ))}

            {/* Glow effect background */}
            <mesh position={[0, 0, -0.2]}>
                <planeGeometry args={[6, 2]} />
                <meshBasicMaterial
                    color="#3fb950"
                    transparent
                    opacity={0.05}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
        </group>
    );
}
