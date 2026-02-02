import { useEffect, useState, useRef } from 'react';
import { Activity, Cpu, HardDrive, MemoryStick, Network, Thermometer } from 'lucide-react';

// interface SystemStats {
  cpu= [
  { pid, name, cpu, mem, user,
  { pid, name, cpu, mem, user,
  { pid, name, cpu, mem, user,
  { pid, name, cpu, mem, user,
  { pid, name, cpu, mem, user,
  { pid, name, cpu, mem, user,
  { pid, name, cpu, mem, user,
  { pid, name, cpu, mem, user,
];

function generateSparklineData() {
  return Array.from({ length) => 
    Math.floor(Math.random() * (max - min + 1)) + min
  );
}

function Sparkline({ data, color }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - ((val - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        points={points}
        vectorEffect="non-scaling-stroke"
      />
      <polygon
        fill={`${color}20`}
        stroke="none"
        points={`0,100 ${points} 100,100`}
      />
    </svg>
  );
}

export default function SystemMonitor() {
  const [stats, setStats] = useState({
    cpu);

  const [cpuHistory, setCpuHistory] = useState(generateSparklineData(30, 10, 80));
  const [memHistory, setMemHistory] = useState(generateSparklineData(30, 30, 60));
  const [processes, setProcesses] = useState(mockProcesses);
  const intervalRef = useRef | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      // Update stats with random variations
      setStats(prev => ({
        cpu) - 0.5) * 10)),
        memory, Math.min(90, prev.memory + (Math.random() - 0.5) * 5)),
        disk,
        network, prev.network.up + (Math.random() - 0.5) * 0.5),
          down, prev.network.down + (Math.random() - 0.5) * 2),
        },
        temperature, Math.min(75, prev.temperature + (Math.random() - 0.5) * 3)),
        processes) - 0.5) * 3),
        uptime,
      }));

      // Update sparklines
      setCpuHistory(prev => [...prev.slice(1), Math.floor(Math.random() * 50) + 15]);
      setMemHistory(prev => [...prev.slice(1), Math.floor(Math.random() * 30) + 35]);

      // Slightly vary process stats
      setProcesses(prev => prev.map(p => ({
        ...p,
        cpu) - 0.5) * 5)),
        mem, p.mem + (Math.random() - 0.5) * 10),
      })));
    }, 1000);

    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, []);

  const StatCard = ({ 
    icon) => (
    <div className="bg-terminal-bg-light border border-terminal-border rounded-lg p-4 relative overflow-hidden">
      {sparkline && (
        <div className="absolute inset-0 opacity-20">
          <Sparkline data={sparkline} color={color} />
        </div>
      )}
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <Icon className="w-4 h-4" style={{ color }} />
          <span className="text-terminal-text-dim text-xs uppercase tracking-wider">{label}</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold" style={{ color }}>{value}</span>
          {unit && <span className="text-terminal-text-dim text-sm">{unit}</span>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="terminal-dot terminal-dot-red" />
        <div className="terminal-dot terminal-dot-yellow" />
        <div className="terminal-dot terminal-dot-green" />
        <span className="ml-4 text-terminal-text-dim text-sm flex items-center gap-2">
          <Activity className="w-4 h-4" />
          System Monitor
        </span>
      </div>

      <div className="terminal-body">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md)} 
            unit="%" 
            color="#3fb950"
            sparkline={cpuHistory}
          />
          <StatCard 
            icon={MemoryStick} 
            label="Memory" 
            value={stats.memory.toFixed(1)} 
            unit="%" 
            color="#58a6ff"
            sparkline={memHistory}
          />
          <StatCard 
            icon={HardDrive} 
            label="Disk" 
            value={stats.disk.toFixed(0)} 
            unit="%" 
            color="#a371f7"
          />
          <StatCard 
            icon={Thermometer} 
            label="Temp" 
            value={stats.temperature.toFixed(1)} 
            unit="°C" 
            color={stats.temperature > 65 ? '#f85149' : '#d29922'}
          />
        </div>

        {/* Network & Uptime */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-terminal-bg-light border border-terminal-border rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Network className="w-4 h-4 text-terminal-cyan" />
              <span className="text-terminal-text-dim text-xs uppercase">Network</span>
            </div>
            <div className="flex justify-between">
              <div>
                <span className="text-terminal-text-dim text-xs">↓ Down</span>
                <div className="text-terminal-green">{stats.network.down.toFixed(1)} MB/s</div>
              </div>
              <div>
                <span className="text-terminal-text-dim text-xs">↑ Up</span>
                <div className="text-terminal-blue">{stats.network.up.toFixed(1)} MB/s</div>
              </div>
            </div>
          </div>
          <div className="bg-terminal-bg-light border border-terminal-border rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-terminal-orange" />
              <span className="text-terminal-text-dim text-xs uppercase">Uptime</span>
            </div>
            <div className="text-terminal-text font-mono">{stats.uptime}</div>
            <div className="text-terminal-text-dim text-xs">{stats.processes} processes</div>
          </div>
        </div>

        {/* Process List */}
        <div>
          <p className="text-terminal-text-dim text-sm mb-3"># Top Processes</p>
          <div className="bg-terminal-bg-light rounded-lg border border-terminal-border overflow-hidden">
            <div className="grid grid-cols-12 gap-2 px-3 py-2 bg-terminal-border/30 text-xs text-terminal-text-dim">
              <span className="col-span-2">PID</span>
              <span className="col-span-4">NAME</span>
              <span className="col-span-2">USER</span>
              <span className="col-span-2">CPU%</span>
              <span className="col-span-2">MEM</span>
            </div>
            <div className="max-h-[150px] overflow-y-auto">
              {processes
                .sort((a, b) => b.cpu - a.cpu)
                .slice(0, 8)
                .map((proc) => (
                  <div 
                    key={proc.pid}
                    className="grid grid-cols-12 gap-2 px-3 py-1.5 text-sm hover)}%</span>
                    <span className="col-span-2 text-terminal-purple">{proc.mem.toFixed(0)}MB</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

