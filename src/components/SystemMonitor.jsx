import { useEffect, useState, useRef } from 'react';
import { Activity, Cpu, HardDrive, MemoryStick, Network, Thermometer } from 'lucide-react';

const mockProcesses = [
  { pid: 1402, name: 'devcli-server', cpu: 12.4, mem: 256, user: 'developer' },
  { pid: 2841, name: 'node', cpu: 8.1, mem: 512, user: 'developer' },
  { pid: 942, name: 'go-build', cpu: 45.2, mem: 128, user: 'root' },
  { pid: 3120, name: 'docker-d', cpu: 2.4, mem: 1024, user: 'root' },
  { pid: 4105, name: 'postgres', cpu: 1.2, mem: 128, user: 'postgres' },
  { pid: 152, name: 'systemd', cpu: 0.1, mem: 12, user: 'root' },
  { pid: 5621, name: 'vim', cpu: 0.5, mem: 45, user: 'developer' },
  { pid: 8842, name: 'zsh', cpu: 0.1, mem: 8, user: 'developer' },
];

function generateSparklineData(length, min, max) {
  return Array.from({ length }, () =>
    Math.floor(Math.random() * (max - min + 1)) + min
  );
}

function Sparkline({ data, color }) {
  const max = Math.max(...data) || 100;
  const min = Math.min(...data) || 0;
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

const StatCard = ({ icon: Icon, label, value, unit, color, sparkline }) => (
  <div className="bg-terminal-bg-light border border-terminal-border rounded-lg p-4 relative overflow-hidden">
    {sparkline && (
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <Sparkline data={sparkline} color={color} />
      </div>
    )}
    <div className="relative z-10">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4" style={{ color }} />
        <span className="text-terminal-text-dim text-xs uppercase tracking-wider font-mono">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold font-mono" style={{ color }}>{value}</span>
        {unit && <span className="text-terminal-text-dim text-xs font-mono">{unit}</span>}
      </div>
    </div>
  </div>
);

export default function SystemMonitor() {
  const [stats, setStats] = useState({
    cpu: 24.5,
    memory: 62.1,
    disk: 42.0,
    network: { up: 1.2, down: 4.5 },
    temperature: 48,
    processes: 124,
    uptime: '12:45:22',
  });

  const [cpuHistory, setCpuHistory] = useState(generateSparklineData(30, 10, 80));
  const [memHistory, setMemHistory] = useState(generateSparklineData(30, 30, 60));
  const [processes, setProcesses] = useState(mockProcesses);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setStats(prev => ({
        ...prev,
        cpu: Math.max(0, Math.min(100, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(0, Math.min(100, prev.memory + (Math.random() - 0.5) * 5)),
        network: {
          up: Math.max(0, prev.network.up + (Math.random() - 0.5) * 0.5),
          down: Math.max(0, prev.network.down + (Math.random() - 0.5) * 2),
        },
        temperature: Math.max(30, Math.min(85, prev.temperature + (Math.random() - 0.5) * 3)),
      }));

      setCpuHistory(prev => [...prev.slice(1), Math.floor(Math.random() * 50) + 15]);
      setMemHistory(prev => [...prev.slice(1), Math.floor(Math.random() * 30) + 35]);

      setProcesses(prev => prev.map(p => ({
        ...p,
        cpu: Math.max(0.1, Math.min(99, p.cpu + (Math.random() - 0.5) * 5)),
        mem: Math.max(1, p.mem + (Math.random() - 0.5) * 10),
      })));
    }, 2000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

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

      <div className="terminal-body space-y-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            icon={Cpu}
            label="CPU"
            value={stats.cpu.toFixed(1)}
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
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-terminal-bg-light border border-terminal-border rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Network className="w-4 h-4 text-terminal-cyan" />
              <span className="text-terminal-text-dim text-xs uppercase font-mono">Network</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-terminal-text-dim text-[10px] block">Down</span>
                <div className="text-terminal-green font-mono text-sm">{stats.network.down.toFixed(1)} MB/s</div>
              </div>
              <div className="text-right">
                <span className="text-terminal-text-dim text-[10px] block">Up</span>
                <div className="text-terminal-blue font-mono text-sm">{stats.network.up.toFixed(1)} MB/s</div>
              </div>
            </div>
          </div>
          <div className="bg-terminal-bg-light border border-terminal-border rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-terminal-orange" />
              <span className="text-terminal-text-dim text-xs uppercase font-mono">Uptime</span>
            </div>
            <div className="text-terminal-text font-mono text-sm">{stats.uptime}</div>
            <div className="text-terminal-text-dim text-[10px] mt-1">{stats.processes} processes running</div>
          </div>
        </div>

        {/* Process List */}
        <div>
          <p className="text-terminal-text-dim text-xs mb-2 font-mono"># Top Processes</p>
          <div className="bg-terminal-bg-light rounded-lg border border-terminal-border overflow-hidden">
            <div className="grid grid-cols-12 gap-2 px-3 py-1.5 bg-terminal-border/30 text-[10px] text-terminal-text-dim font-mono">
              <span className="col-span-2">PID</span>
              <span className="col-span-4">NAME</span>
              <span className="col-span-2">USER</span>
              <span className="col-span-2">CPU</span>
              <span className="col-span-2">MEM</span>
            </div>
            <div className="max-h-[160px] overflow-y-auto custom-scrollbar">
              {processes
                .sort((a, b) => b.cpu - a.cpu)
                .map((proc) => (
                  <div
                    key={proc.pid}
                    className="grid grid-cols-12 gap-2 px-3 py-1.5 text-xs hover:bg-terminal-border/10 transition-colors font-mono"
                  >
                    <span className="col-span-2 text-terminal-text-dim">{proc.pid}</span>
                    <span className="col-span-4 text-terminal-text truncate">{proc.name}</span>
                    <span className="col-span-2 text-terminal-text-dim truncate">{proc.user}</span>
                    <span className={`col-span-2 ${proc.cpu > 20 ? 'text-terminal-yellow' : 'text-terminal-green'}`}>
                      {proc.cpu.toFixed(1)}%
                    </span>
                    <span className="col-span-2 text-terminal-blue">{proc.mem}MB</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
