import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import FloatingCodeFragments from './FloatingCodeFragments';
import ParticleNetwork3D from './ParticleNetwork3D';

export default function Scene3D({ mousePosition = { x: 0, y: 0 } }) {
    const cameraRef = useRef();

    return (
        <div className="absolute inset-0 pointer-events-none z-0">
            <Canvas
                gl={{
                    alpha: true,
                    antialias: true,
                    powerPreference: 'high-performance',
                }}
                dpr={[1, 2]}
            >
                <PerspectiveCamera
                    ref={cameraRef}
                    makeDefault
                    position={[0, 0, 8]}
                    fov={50}
                />

                {/* Lighting */}
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={0.5} color="#3fb950" />
                <pointLight position={[-10, -10, -10]} intensity={0.3} color="#58a6ff" />

                {/* 3D Elements */}
                <FloatingCodeFragments />
                <ParticleNetwork3D />

                {/* Camera controls - disabled for fixed camera with mouse parallax */}
                {/* <OrbitControls enableZoom={false} enablePan={false} /> */}

                {/* Post-processing effects */}
                <EffectComposer>
                    <Bloom
                        intensity={0.5}
                        luminanceThreshold={0.4}
                        luminanceSmoothing={0.9}
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
}
