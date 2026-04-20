"use client";

import { useState, useCallback, useEffect } from "react";
import { 
  ReactFlow, 
  Background, 
  BackgroundVariant, 
  useNodesState, 
  useEdgesState, 
  addEdge,
  Connection,
  Edge,
  Node,
  ReactFlowInstance
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { motion, AnimatePresence } from "framer-motion";
import { scenarios, Scenario } from "@/data/scenarios";
import { Terminal, Cpu, Play, CheckCircle2, AlertCircle, Layers, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const nodeStyle = {
  background: "var(--card)",
  color: "var(--foreground)",
  border: "1px solid var(--border)",
  borderRadius: "0.75rem",
  padding: "1rem",
  fontSize: "11px",
  fontFamily: "var(--font-mono)",
  minWidth: "140px",
  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
};

export function LogicStudio() {
  const [selectedId, setSelectedId] = useState(scenarios[0].id);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  
  const currentScenario = scenarios.find(s => s.id === selectedId) || scenarios[0];

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>(currentScenario.nodes.map(n => ({...n, style: nodeStyle})));
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);

  useEffect(() => {
    // Reset state when scenario changes
    setNodes(currentScenario.nodes.map(n => ({...n, style: nodeStyle, opacity: 0})));
    setEdges([]);
    setLogs([]);
    setIsRunning(false);
    setProgress(0);
  }, [selectedId, currentScenario, setNodes, setEdges]);

  const runSimulation = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setLogs([]);
    setProgress(0);
    
    const totalSteps = currentScenario.terminalLogs.length;
    
    // Step-by-step simulation
    for (let i = 0; i < totalSteps; i++) {
      setLogs(prev => [...prev, currentScenario.terminalLogs[i]]);
      setProgress(((i + 1) / totalSteps) * 100);
      
      // Reveal nodes and edges gradually
      const nodeIndex = Math.floor((i / totalSteps) * currentScenario.nodes.length);
      setNodes(nds => nds.map((n, idx) => idx <= nodeIndex ? { ...n, opacity: 1 } : n));
      
      if (nodeIndex > 0) {
        const edge = currentScenario.edges.find(e => e.target === currentScenario.nodes[nodeIndex].id);
        if (edge) {
          setEdges(eds => [...eds, { ...edge, animated: true }]);
        }
      }

      await new Promise(resolve => setTimeout(resolve, 800));
    }
    
    setIsRunning(false);
  };

  return (
    <section className="flex flex-col gap-12 py-16" id="logic-studio">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit">
          <Cpu size={14} className="text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Logic Studio v1.0</span>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tighter text-foreground md:text-4xl">
            Engineered Strategy
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Don't just watch static demos. Simulate how I architect AI solutions to high-stakes business problems.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar: Scenario Selection */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="p-1 bg-muted/30 rounded-2xl border border-border flex flex-col gap-1">
            {scenarios.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedId(s.id)}
                className={cn(
                  "flex flex-col gap-1 p-4 rounded-xl transition-all text-left group",
                  selectedId === s.id 
                    ? "bg-card border border-border shadow-sm" 
                    : "hover:bg-muted/50 border border-transparent"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={cn(
                    "text-sm font-bold",
                    selectedId === s.id ? "text-primary" : "text-foreground"
                  )}>
                    {s.title}
                  </span>
                  {selectedId === s.id && <Zap size={14} className="text-primary fill-primary" />}
                </div>
                <p className="text-[11px] text-muted-foreground line-clamp-1 group-hover:line-clamp-none transition-all">
                  {s.problem}
                </p>
              </button>
            ))}
          </div>

          {/* Problem Card */}
          <div className="p-6 rounded-3xl border border-border bg-card/50 backdrop-blur-sm flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <AlertCircle size={14} /> The Problem
              </h3>
              <p className="text-sm leading-relaxed text-foreground/90 italic">
                "{currentScenario.problem}"
              </p>
            </div>

            <div className="pt-6 border-t border-border mt-auto">
              <button
                onClick={runSimulation}
                disabled={isRunning}
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all",
                  isRunning 
                    ? "bg-muted text-muted-foreground cursor-not-allowed" 
                    : "bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20"
                )}
              >
                {isRunning ? (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    <Cpu size={18} />
                  </motion.div>
                ) : <Play size={18} fill="currentColor" />}
                {isRunning ? "Running Simulation..." : "Run Solution Architect"}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content: Terminal & Canvas */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full min-h-[500px]">
            {/* Terminal Window */}
            <div className="rounded-3xl border border-border bg-[#0a0a0f] overflow-hidden flex flex-col shadow-2xl relative group/terminal">
              {/* Scanline effect */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-20 opacity-20" />
              
              <div className="p-3 border-b border-border bg-muted/20 flex items-center justify-between relative z-30">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-primary" />
                  <span className="text-[10px] font-mono text-muted-foreground uppercase">AnushkaOS Terminal</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                </div>
              </div>
              <div className="p-4 font-mono text-[12px] flex flex-col gap-2 overflow-y-auto max-h-[400px]">
                <AnimatePresence mode="popLayout">
                  {logs.map((log, i) => (
                    <motion.div
                      key={`${selectedId}-log-${i}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex gap-2"
                    >
                      <span className="text-primary/50 shrink-0 select-none">›</span>
                      <span className="text-primary/90">{log}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {isRunning && (
                  <motion.div 
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-2 h-4 bg-primary/40 mt-1"
                  />
                )}
                {!isRunning && logs.length === 0 && (
                  <div className="text-muted-foreground italic text-[10px] mt-2">
                    System on standby. Trigger architect to begin logs.
                  </div>
                )}
              </div>

              {/* Impact Ticker overlay */}
              <AnimatePresence>
                {!isRunning && logs.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-primary/10 border border-primary/20 backdrop-blur-md flex items-center gap-4"
                  >
                    <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/30">
                      <Zap size={24} fill="currentColor" />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-2xl font-black text-primary leading-none">
                        {currentScenario.metrics.value}
                      </div>
                      <div className="text-[10px] font-bold uppercase text-muted-foreground tracking-tight">
                        {currentScenario.metrics.label}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Workflow Canvas */}
            <div className="rounded-3xl border border-border bg-card overflow-hidden relative shadow-inner group/canvas transition-all duration-700 hover:border-primary/30">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover/canvas:opacity-100 transition-opacity duration-700" />
              
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <Layers size={14} className="text-muted-foreground" />
                <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Architectural Canvas</span>
              </div>
              
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onInit={setRfInstance}
                fitView
                className="bg-transparent"
                nodesDraggable={false}
                nodesConnectable={false}
                zoomOnScroll={false}
                panOnDrag={false}
              >
                <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="var(--border)" />
              </ReactFlow>

              {!isRunning && logs.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-[1px] pointer-events-none">
                  <div className="text-muted-foreground text-xs font-mono uppercase tracking-[0.2em] opacity-40">
                    Awaiting Logic Stream
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
