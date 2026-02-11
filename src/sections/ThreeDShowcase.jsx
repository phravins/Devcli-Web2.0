import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import CommandVisualizer3D from '../components/CommandVisualizer3D';
import DevCLILogo3D from '../components/DevCLILogo3D';
import HolographicTerminal from '../components/HolographicTerminal';
import { Sparkles, Boxes, Layers } from 'lucide-react';

export default function ThreeDShowcase() {
    return (
        <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-terminal-bg relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-terminal-text mb-4">
                        Interactive 3D Experience
                    </h2>
                    <p className="text-terminal-text-dim max-w-2xl mx-auto">
                        Explore DevCLI's features in an immersive 3D environment. Drag to rotate, scroll to zoom.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    {/* 3D DevCLI Logo */}
                    <div className="terminal-window terminal-glow h-[400px]">
                        <div className="terminal-header">
                            <div className="terminal-dot terminal-dot-red" />
                            <div className="terminal-dot terminal-dot-yellow" />
                            <div className="terminal-dot terminal-dot-green" />
                            <span className="ml-4 text-terminal-text-dim text-sm">3D ASCII Logo</span>
                        </div>
                        <div className="terminal-body h-full p-0">
                            <Suspense fallback={
                                <div className="flex items-center justify-center h-full">
                                    <div className="text-terminal-text-dim">Loading 3D scene...</div>
                                </div>
                            }>
                                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                                    <ambientLight intensity={0.5} />
                                    <pointLight position={[10, 10, 10]} intensity={0.8} color="#3fb950" />
                                    <DevCLILogo3D position={[0, 0, 0]} scale={0.8} />
                                    <OrbitControls enableZoom={true} enablePan={false} autoRotate autoRotateSpeed={1} />
                                    <Environment preset="city" />
                                </Canvas>
                            </Suspense>
                        </div>
                    </div>

                    {/* Command Flow Visualizer */}
                    <div className="terminal-window terminal-glow-blue h-[400px]">
                        <div className="terminal-header">
                            <div className="terminal-dot terminal-dot-red" />
                            <div className="terminal-dot terminal-dot-yellow" />
                            <div className="terminal-dot terminal-dot-green" />
                            <span className="ml-4 text-terminal-text-dim text-sm">Command Pipeline</span>
                        </div>
                        <div className="terminal-body h-full p-0">
                            <Suspense fallback={
                                <div className="flex items-center justify-center h-full">
                                    <div className="text-terminal-text-dim">Loading pipeline...</div>
                                </div>
                            }>
                                <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                                    <ambientLight intensity={0.5} />
                                    <pointLight position={[5, 5, 5]} intensity={0.8} />
                                    <CommandVisualizer3D />
                                    <OrbitControls enableZoom={true} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                                </Canvas>
                            </Suspense>
                        </div>
                    </div>
                </div>

                {/* Holographic Terminal */}
                <div className="terminal-window terminal-glow-purple h-[450px]">
                    <div className="terminal-header">
                        <div className="terminal-dot terminal-dot-red" />
                        <div className="terminal-dot terminal-dot-yellow" />
                        <div className="terminal-dot terminal-dot-green" />
                        <span className="ml-4 text-terminal-text-dim text-sm">Holographic Display</span>
                    </div>
                    <div className="terminal-body h-full p-0">
                        <Suspense fallback={
                            <div className="flex items-center justify-center h-full">
                                <div className="text-terminal-text-dim">Initializing hologram...</div>
                            </div>
                        }>
                            <Canvas camera={{ position: [0, 0, 4], fov: 60 }}>
                                <ambientLight intensity={0.4} />
                                <pointLight position={[5, 5, 5]} intensity={0.6} color="#3fb950" />
                                <pointLight position={[-5, -5, -5]} intensity={0.4} color="#58a6ff" />
                                <HolographicTerminal position={[0, 0, 0]} />
                                <OrbitControls enableZoom={true} enablePan={false} />
                            </Canvas>
                        </Suspense>
                    </div>
                </div>

                {/* Feature Highlights */}
                <div className="grid md:grid-cols-3 gap-6 mt-12">
                    <div className="text-center p-6 border border-terminal-border rounded-lg bg-terminal-bg-light">
                        <Sparkles className="w-10 h-10 text-terminal-green mx-auto mb-4" />
                        <h4 className="text-terminal-text font-bold mb-2">Real-time 3D</h4>
                        <p className="text-terminal-text-dim text-sm">
                            Interactive 3D visualizations powered by Three.js and React Three Fiber
                        </p>
                    </div>
                    <div className="text-center p-6 border border-terminal-border rounded-lg bg-terminal-bg-light">
                        <Boxes className="w-10 h-10 text-terminal-blue mx-auto mb-4" />
                        <h4 className="text-terminal-text font-bold mb-2">GPU Accelerated</h4>
                        <p className="text-terminal-text-dim text-sm">
                            Smooth 60fps animations using WebGL hardware acceleration
                        </p>
                    </div>
                    <div className="text-center p-6 border border-terminal-border rounded-lg bg-terminal-bg-light">
                        <Layers className="w-10 h-10 text-terminal-purple mx-auto mb-4" />
                        <h4 className="text-terminal-text font-bold mb-2">Interactive UI</h4>
                        <p className="text-terminal-text-dim text-sm">
                            Drag to rotate, scroll to zoom, click to interact with 3D elements
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
