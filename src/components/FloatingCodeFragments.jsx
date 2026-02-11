import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// Code snippets that will float in 3D space
const codeSnippets = [
    'devcli init',
    'npm run dev',
    'git commit -m',
    'docker build',
    'go build -o',
    'make test',
    'const app = ()',
    'func main()',
    'import React',
    'export default',
];

function FloatingCode({ text, position, speed, rotationSpeed }) {
    const meshRef = useRef();
    const targetRotation = useRef({ x: 0, y: 0, z: 0 });

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.getElapsedTime();

        // Floating animation
        meshRef.current.position.y = position[1] + Math.sin(time * speed + position[0]) * 0.3;
        meshRef.current.position.x = position[0] + Math.cos(time * speed * 0.5) * 0.2;

        // Gentle rotation
        targetRotation.current.y += rotationSpeed;
        targetRotation.current.x = Math.sin(time * 0.3) * 0.2;

        meshRef.current.rotation.y = THREE.MathUtils.lerp(
            meshRef.current.rotation.y,
            targetRotation.current.y,
            0.05
        );
        meshRef.current.rotation.x = THREE.MathUtils.lerp(
            meshRef.current.rotation.x,
            targetRotation.current.x,
            0.05
        );

        // Fade based on distance from camera
        const distance = meshRef.current.position.distanceTo(state.camera.position);
        const opacity = THREE.MathUtils.clamp(1 - distance / 15, 0.1, 0.8);
        if (meshRef.current.material) {
            meshRef.current.material.opacity = opacity;
        }
    });

    return (
        <group ref={meshRef} position={position}>
            <Text
                fontSize={0.3}
                color="#3fb950"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.02}
                outlineColor="#000000"
                transparent
                opacity={0.6}
                font="/fonts/RobotoMono-Regular.ttf"
            >
                {text}
            </Text>
        </group>
    );
}

export default function FloatingCodeFragments() {
    const particles = useMemo(() => {
        return codeSnippets.map((snippet, i) => {
            const angle = (i / codeSnippets.length) * Math.PI * 2;
            const radius = 4 + Math.random() * 3;
            const height = (Math.random() - 0.5) * 4;

            return {
                text: snippet,
                position: [
                    Math.cos(angle) * radius,
                    height,
                    Math.sin(angle) * radius,
                ],
                speed: 0.3 + Math.random() * 0.5,
                rotationSpeed: (Math.random() - 0.5) * 0.02,
            };
        });
    }, []);

    return (
        <>
            {particles.map((particle, i) => (
                <FloatingCode key={i} {...particle} />
            ))}
        </>
    );
}
