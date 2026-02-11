import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleNetwork3D() {
    const particlesRef = useRef();
    const linesRef = useRef();
    const particleCount = 80;
    const connectionDistance = 2.5;

    const { positions, velocities } = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        const vel = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            // Distribute particles in a sphere
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const radius = 5 + Math.random() * 3;

            pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
            pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            pos[i3 + 2] = radius * Math.cos(phi);

            // Random velocities
            vel[i3] = (Math.random() - 0.5) * 0.01;
            vel[i3 + 1] = (Math.random() - 0.5) * 0.01;
            vel[i3 + 2] = (Math.random() - 0.5) * 0.01;
        }

        return { positions: pos, velocities: vel };
    }, []);

    useFrame(() => {
        if (!particlesRef.current) return;

        const positions = particlesRef.current.geometry.attributes.position.array;

        // Update particle positions
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            positions[i3] += velocities[i3];
            positions[i3 + 1] += velocities[i3 + 1];
            positions[i3 + 2] += velocities[i3 + 2];

            // Boundary check - keep particles in sphere
            const distance = Math.sqrt(
                positions[i3] ** 2 +
                positions[i3 + 1] ** 2 +
                positions[i3 + 2] ** 2
            );

            if (distance > 8) {
                velocities[i3] *= -1;
                velocities[i3 + 1] *= -1;
                velocities[i3 + 2] *= -1;
            }
        }

        particlesRef.current.geometry.attributes.position.needsUpdate = true;

        // Update connections
        if (linesRef.current) {
            const linePositions = [];

            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                for (let j = i + 1; j < particleCount; j++) {
                    const j3 = j * 3;

                    const dx = positions[i3] - positions[j3];
                    const dy = positions[i3 + 1] - positions[j3 + 1];
                    const dz = positions[i3 + 2] - positions[j3 + 2];
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    if (dist < connectionDistance) {
                        linePositions.push(
                            positions[i3], positions[i3 + 1], positions[i3 + 2],
                            positions[j3], positions[j3 + 1], positions[j3 + 2]
                        );
                    }
                }
            }

            linesRef.current.geometry.setFromPoints(
                linePositions.reduce((acc, val, idx) => {
                    if (idx % 3 === 0) {
                        acc.push(new THREE.Vector3(
                            linePositions[idx],
                            linePositions[idx + 1],
                            linePositions[idx + 2]
                        ));
                    }
                    return acc;
                }, [])
            );
        }
    });

    return (
        <group>
            {/* Particles */}
            <points ref={particlesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={particleCount}
                        array={positions}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.08}
                    color="#3fb950"
                    transparent
                    opacity={0.8}
                    sizeAttenuation
                    blending={THREE.AdditiveBlending}
                />
            </points>

            {/* Connection lines */}
            <lineSegments ref={linesRef}>
                <bufferGeometry />
                <lineBasicMaterial
                    color="#3fb950"
                    transparent
                    opacity={0.2}
                    blending={THREE.AdditiveBlending}
                />
            </lineSegments>
        </group>
    );
}
