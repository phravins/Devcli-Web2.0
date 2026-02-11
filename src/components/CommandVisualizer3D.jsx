import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Line } from '@react-three/drei';
import * as THREE from 'three';

const commands = [
    { name: 'init', color: '#8957e5', pos: [-2, 1, 0] },
    { name: 'build', color: '#3fb950', pos: [0, 1, 0] },
    { name: 'test', color: '#58a6ff', pos: [2, 1, 0] },
    { name: 'deploy', color: '#f85149', pos: [0, -1, 0] },
];

function CommandNode({ command, index }) {
    const nodeRef = useRef();
    const pulseRef = useRef();

    useFrame((state) => {
        if (!nodeRef.current || !pulseRef.current) return;

        const time = state.clock.getElapsedTime();
        const offset = index * 0.5;

        // Gentle floating
        nodeRef.current.position.y = command.pos[1] + Math.sin(time + offset) * 0.1;

        // Rotation
        nodeRef.current.rotation.y = time * 0.5;

        // Pulsing effect
        const scale = 1 + Math.sin(time * 2 + offset) * 0.1;
        pulseRef.current.scale.setScalar(scale);
    });

    return (
        <group ref={nodeRef} position={command.pos}>
            {/* Node sphere */}
            <mesh>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial
                    color={command.color}
                    emissive={command.color}
                    emissiveIntensity={0.5}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>

            {/* Pulse ring */}
            <mesh ref={pulseRef}>
                <ringGeometry args={[0.2, 0.25, 32]} />
                <meshBasicMaterial
                    color={command.color}
                    transparent
                    opacity={0.3}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Command label */}
            <Text
                position={[0, -0.4, 0]}
                fontSize={0.15}
                color={command.color}
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.01}
                outlineColor="#000000"
            >
                {command.name}
            </Text>
        </group>
    );
}

export default function CommandVisualizer3D() {
    const connections = useMemo(() => {
        return [
            { from: 0, to: 1 },
            { from: 1, to: 2 },
            { from: 1, to: 3 },
        ];
    }, []);

    return (
        <group>
            {/* Render command nodes */}
            {commands.map((cmd, index) => (
                <CommandNode key={index} command={cmd} index={index} />
            ))}

            {/* Render connections */}
            {connections.map((conn, index) => {
                const from = commands[conn.from].pos;
                const to = commands[conn.to].pos;

                return (
                    <Line
                        key={index}
                        points={[from, to]}
                        color="#3fb950"
                        lineWidth={2}
                        transparent
                        opacity={0.4}
                    />
                );
            })}
        </group>
    );
}
