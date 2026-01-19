import React, { useState, useEffect } from 'react';
import { Shield, Activity, AlertTriangle, Globe, Mail, Zap, Lock, Wifi } from 'lucide-react';

const NIDPSDashboard = () => {
  const [packets, setPackets] = useState(2345678);
  const [threats, setThreats] = useState(28);
  const [blockedIPs, setBlockedIPs] = useState(152);
  const [threatLevel, setThreatLevel] = useState(87);
  const [chartData, setChartData] = useState([]);
  const [scanLine, setScanLine] = useState(0);

  useEffect(() => {
    const initialData = Array.from({ length: 60 }, () => Math.random() * 100);
    setChartData(initialData);

    const interval = setInterval(() => {
      setPackets(prev => prev + Math.floor(Math.random() * 1000));
      setChartData(prev => [...prev.slice(1), Math.random() * 100]);
      setThreats(prev => prev + (Math.random() > 0.7 ? 1 : 0));
    }, 1500);

    const scanInterval = setInterval(() => {
      setScanLine(prev => (prev + 1) % 100);
    }, 50);

    return () => {
      clearInterval(interval);
      clearInterval(scanInterval);
    };
  }, []);

  const gaugeRotation = (threatLevel / 100) * 180 - 90;

  return (
    <div className="min-h-screen bg-black p-2 md:p-4 font-mono overflow-hidden relative">
      {/* Animated Hex Grid Background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, cyan 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, #00ff88 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'pulse 4s ease-in-out infinite'
        }}></div>
      </div>

      {/* Scanning Lines */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30"
          style={{ top: `${scanLine}%`, transition: 'top 0.05s linear' }}
        ></div>
      </div>

      {/* Corner Decorations */}
      <div className="fixed top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-cyan-500 opacity-50"></div>
      <div className="fixed top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-cyan-500 opacity-50"></div>
      <div className="fixed bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-cyan-500 opacity-50"></div>
      <div className="fixed bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-cyan-500 opacity-50"></div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.1; }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px #06b6d4, 0 0 10px #06b6d4, 0 0 15px #06b6d4; }
          50% { box-shadow: 0 0 10px #06b6d4, 0 0 20px #06b6d4, 0 0 30px #06b6d4; }
        }
        @keyframes slideData {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .glow-box {
          animation: glow 2s ease-in-out infinite;
        }
        .hologram {
          background: linear-gradient(180deg, rgba(6, 182, 212, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(6, 182, 212, 0.3);
          box-shadow: inset 0 0 20px rgba(6, 182, 212, 0.1);
        }
        .data-stream {
          animation: slideData 10s linear infinite;
        }
      `}</style>

      {/* Main Container */}
      <div className="relative max-w-[1800px] mx-auto z-10">
        {/* Header */}
        <div className="relative mb-4 p-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-lg">
          <div className="bg-black rounded-lg p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10"></div>
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 animate-pulse"></div>
            
            <div className="relative flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500 blur-md animate-pulse"></div>
                  <div className="relative flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg border border-red-400">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    <span className="text-white font-bold tracking-wider">LIVE</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-cyan-400' : 'bg-gray-600'}`}></div>
                  ))}
                </div>
              </div>
              
              <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 flex-1 text-center tracking-wider">
                AI-POWERED NETWORK INTRUSION DETECTION & PREVENTION SYSTEM
              </h1>
              
              <div className="flex items-center gap-2 text-cyan-400 text-sm">
                <Wifi className="w-4 h-4 animate-pulse" />
                <span className="font-mono">SYS.ONLINE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {/* Total Packets */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative hologram rounded-lg p-4 border-cyan-400 overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-400 opacity-10 rounded-full blur-2xl"></div>
              <Activity className="w-8 h-8 text-cyan-400 mb-2" />
              <div className="text-cyan-300 text-xs tracking-wider mb-1 font-bold">TOTAL PACKETS</div>
              <div className="text-4xl font-bold text-white tracking-wider font-mono">{packets.toLocaleString()}</div>
              <div className="mt-2 flex gap-1">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="flex-1 h-1 bg-cyan-500/30 rounded" style={{
                    height: `${Math.random() * 8 + 2}px`
                  }}></div>
                ))}
              </div>
            </div>
          </div>

          {/* Active Threats */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative hologram rounded-lg p-4 border-blue-400 overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-400 opacity-10 rounded-full blur-2xl"></div>
              <Shield className="w-8 h-8 text-blue-400 mb-2" />
              <div className="text-blue-300 text-xs tracking-wider mb-1 font-bold">ACTIVE THREATS</div>
              <div className="text-4xl font-bold text-white tracking-wider font-mono">{threats}</div>
              <div className="mt-2 text-xs text-blue-300 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                <span>MONITORING</span>
              </div>
            </div>
          </div>

          {/* Blocked IPs */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg blur opacity-60 group-hover:opacity-90 transition-opacity glow-box"></div>
            <div className="relative hologram rounded-lg p-4 border-orange-400 overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-red-400 opacity-20 rounded-full blur-2xl animate-pulse"></div>
              <AlertTriangle className="w-8 h-8 text-orange-400 mb-2 animate-pulse" />
              <div className="text-orange-300 text-xs tracking-wider mb-1 font-bold">BLOCKED IPs</div>
              <div className="text-4xl font-bold text-orange-400 tracking-wider font-mono">{blockedIPs}</div>
              <div className="mt-2 text-xs text-orange-300 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>SECURED</span>
              </div>
            </div>
          </div>

          {/* Threat Level Gauge */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-lg blur opacity-60 group-hover:opacity-90 transition-opacity"></div>
            <div className="relative hologram rounded-lg p-4 border-red-400 overflow-hidden">
              <div className="text-center">
                <div className="text-gray-400 text-xs mb-2 tracking-wider font-bold">THREAT LEVEL</div>
                <div className="relative w-full h-32">
                  <svg viewBox="0 0 200 110" className="w-full h-full">
                    <defs>
                      <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4ade80" />
                        <stop offset="50%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#ef4444" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    <path
                      d="M 20 90 A 80 80 0 0 1 180 90"
                      fill="none"
                      stroke="#1f2937"
                      strokeWidth="25"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 20 90 A 80 80 0 0 1 180 90"
                      fill="none"
                      stroke="url(#gaugeGradient)"
                      strokeWidth="22"
                      strokeLinecap="round"
                      filter="url(#glow)"
                    />
                    <circle cx="100" cy="90" r="6" fill="#1f2937" />
                    <line
                      x1="100"
                      y1="90"
                      x2="100"
                      y2="25"
                      stroke="white"
                      strokeWidth="4"
                      strokeLinecap="round"
                      filter="url(#glow)"
                      transform={`rotate(${gaugeRotation} 100 90)`}
                      style={{ transition: 'transform 0.5s ease' }}
                    />
                    <circle cx="100" cy="90" r="8" fill="white" filter="url(#glow)" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ top: '30px' }}>
                    <div className="text-orange-400 text-xs font-bold mb-1 tracking-widest animate-pulse">HIGH</div>
                    <div className="text-white text-5xl font-bold tracking-wider font-mono">{threatLevel}</div>
                  </div>
                  <div className="absolute bottom-2 left-2 text-green-400 text-xs font-bold">0</div>
                  <div className="absolute bottom-2 right-2 text-red-400 text-xs font-bold">100</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-4">
          {/* Attack Types */}
          <div className="lg:col-span-3 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg blur"></div>
            <div className="relative hologram rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-cyan-400" />
                <h2 className="text-cyan-400 font-bold tracking-wider">ATTACK TYPES</h2>
              </div>
              <div className="space-y-2">
                {[
                  { name: 'Port Scans', count: 12, icon: '🔍', color: 'cyan', progress: 60 },
                  { name: 'DDoS Attacks', count: 8, icon: '⚡', color: 'blue', progress: 40 },
                  { name: 'Brute Force', count: 5, icon: '🔨', color: 'yellow', progress: 25 },
                  { name: 'Malware', count: 3, icon: '🦠', color: 'red', progress: 15 }
                ].map((attack, idx) => (
                  <div key={idx} className="relative group">
                    <div className={`absolute inset-0 bg-${attack.color}-500/20 rounded blur group-hover:blur-md transition-all`}></div>
                    <div className="relative bg-black/50 border border-cyan-500/30 p-3 rounded backdrop-blur">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{attack.icon}</span>
                          <span className="text-white text-sm">{attack.name}</span>
                        </div>
                        <span className={`text-${attack.color}-400 text-2xl font-bold font-mono`}>{attack.count}</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1.5">
                        <div 
                          className={`bg-gradient-to-r from-${attack.color}-400 to-${attack.color}-600 h-1.5 rounded-full transition-all duration-1000`}
                          style={{ width: `${attack.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Network Traffic Analysis */}
          <div className="lg:col-span-6 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg blur"></div>
            <div className="relative hologram rounded-lg p-4 h-full">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-cyan-400 font-bold tracking-wider">NETWORK TRAFFIC ANALYSIS</h2>
                <div className="flex gap-1">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-cyan-500 rounded-sm animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
                  ))}
                </div>
              </div>
              <div className="text-cyan-300 text-xs mb-3 tracking-wider">PACKETS PER SECOND</div>
              <div className="relative h-64 bg-black/50 rounded border border-cyan-500/30 p-3 overflow-hidden">
                {/* Grid */}
                <div className="absolute inset-0 opacity-20">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="absolute w-full border-t border-cyan-500/30" style={{ top: `${i * 12.5}%` }}></div>
                  ))}
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="absolute h-full border-l border-cyan-500/30" style={{ left: `${i * 8.33}%` }}></div>
                  ))}
                </div>
                
                <svg className="w-full h-full relative z-10" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="30%" stopColor="#3b82f6" />
                      <stop offset="60%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                    </linearGradient>
                    <filter id="lineGlow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  <polygon
                    fill="url(#areaGradient)"
                    points={`0,100 ${chartData.map((value, i) => 
                      `${(i / (chartData.length - 1)) * 100},${100 - value}`
                    ).join(' ')} 100,100`}
                  />
                  
                  <polyline
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="3"
                    filter="url(#lineGlow)"
                    points={chartData.map((value, i) => 
                      `${(i / (chartData.length - 1)) * 100}%,${100 - value}%`
                    ).join(' ')}
                  />
                </svg>
              </div>
              <div className="text-center text-cyan-400 text-xs mt-2 tracking-wider">TIME AXIS →</div>
            </div>
          </div>

          {/* Right Stats Panel */}
          <div className="lg:col-span-3 space-y-3">
            {/* Blocked IP Addresses */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-lg blur"></div>
              <div className="relative hologram rounded-lg p-4">
                <h2 className="text-cyan-400 font-bold mb-3 text-sm tracking-wider">BLOCKED IP ADDRESSES</h2>
                <div className="space-y-2 max-h-40 overflow-hidden">
                  {['203.0.113.45', '45.67.89.22', '156.78.21.34', '98.45.33.11'].map((ip, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute inset-0 bg-red-500/20 rounded blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative bg-black/50 border border-red-500/30 p-2 rounded font-mono text-sm text-red-400 flex items-center justify-between">
                        <span>{ip}</span>
                        <Lock className="w-3 h-3" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Automated Actions */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-red-500/20 rounded-lg blur"></div>
              <div className="relative hologram rounded-lg p-4">
                <h2 className="text-cyan-400 font-bold mb-3 text-sm tracking-wider">AUTOMATED ACTIONS</h2>
                <div className="space-y-2">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-red-500/30 rounded blur animate-pulse"></div>
                    <div className="relative bg-black/70 border-2 border-red-500 p-3 rounded flex items-center gap-2">
                      <Shield className="w-4 h-4 text-red-400 animate-pulse" />
                      <span className="text-red-300 text-xs tracking-wide">FIREWALL: 156.78.21.34</span>
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-green-500/30 rounded blur"></div>
                    <div className="relative bg-black/70 border-2 border-green-500 p-3 rounded flex items-center gap-2">
                      <Mail className="w-4 h-4 text-green-400" />
                      <span className="text-green-300 text-xs tracking-wide">EMAIL ALERT SENT</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
          {/* Recent Alerts */}
          <div className="lg:col-span-2 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-lg blur"></div>
            <div className="relative hologram rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-orange-400 animate-pulse" />
                <h2 className="text-orange-400 font-bold tracking-wider">RECENT ALERTS</h2>
              </div>
              <div className="space-y-2">
                {[
                  { name: 'SYN Flood Attack', level: 'HIGH', color: 'red', time: '00:42:15' },
                  { name: 'Brute Force Attempt', level: 'MEDIUM', color: 'orange', time: '00:38:42' },
                  { name: 'ARP Spoofing', level: 'HIGH', color: 'red', time: '00:35:11' }
                ].map((alert, idx) => (
                  <div key={idx} className="relative group">
                    <div className={`absolute inset-0 bg-${alert.color}-500/20 rounded blur opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                    <div className="relative bg-black/70 border border-cyan-500/30 p-3 rounded">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white text-sm font-medium">{alert.name}</span>
                        <span className={`bg-${alert.color}-600 text-white text-xs px-3 py-1 rounded-full font-bold tracking-wider border border-${alert.color}-400`}>
                          {alert.level}
                        </span>
                      </div>
                      <div className="text-cyan-400 text-xs font-mono">{alert.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* World Map */}
          <div className="lg:col-span-3 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg blur"></div>
            <div className="relative hologram rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-5 h-5 text-cyan-400" />
                <h2 className="text-cyan-400 font-bold tracking-wider">GLOBAL THREAT MAP</h2>
              </div>
              <div className="relative h-64 bg-black/50 rounded border border-cyan-500/30 overflow-hidden">
                {/* Map Grid */}
                <div className="absolute inset-0 opacity-20">
                  {[...Array(10)].map((_, i) => (
                    <React.Fragment key={i}>
                      <div className="absolute w-full border-t border-cyan-500/30" style={{ top: `${i * 10}%` }}></div>
                      <div className="absolute h-full border-l border-cyan-500/30" style={{ left: `${i * 10}%` }}></div>
                    </React.Fragment>
                  ))}
                </div>

                {/* Globe Icon */}
                <Globe className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 text-cyan-600 opacity-10" />
                
                {/* Threat Points */}
                <div className="absolute inset-0">
                  {[
                    { x: 15, y: 30 }, { x: 35, y: 45 }, { x: 55, y: 25 },
                    { x: 70, y: 40 }, { x: 85, y: 35 }, { x: 25, y: 70 },
                    { x: 45, y: 65 }, { x: 78, y: 60 }
                  ].map((pos, i) => (
                    <div key={i} className="absolute" style={{ left: `${pos.x}%`, top: `${pos.y}%` }}>
                      <div className="relative">
                        <div className="absolute inset-0 w-6 h-6 bg-red-500 rounded-full blur-md animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
                        <div className="relative w-4 h-4 bg-red-500 rounded-full border-2 border-red-300">
                          <div className="absolute inset-0 bg-red-400 rounded-full animate-ping"></div>
                        </div>
                      </div>
                      {/* Connection Lines */}
                      {i < 7 && (
                        <svg className="absolute top-0 left-0 w-screen h-screen pointer-events-none" style={{ transform: 'translate(-50%, -50%)' }}>
                          <line
                            x1="0"
                            y1="0"
                            x2={`${(pos.x - 15) * 10}px`}
                            y2={`${(pos.y - 30) * 5}px`}
                            stroke="rgba(239, 68, 68, 0.3)"
                            strokeWidth="1"
                            className="animate-pulse"
                          />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>

                {/* Data Streams */}
                <div className="absolute bottom-2 left-2 right-2 flex gap-1 overflow-hidden">
                  <div className="data-stream text-cyan-400 text-xs font-mono whitespace-nowrap">
                    TRACKING: 28 ACTIVE THREATS | GLOBAL COVERAGE: 99.8% | RESPONSE TIME: 0.003s
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NIDPSDashboard;