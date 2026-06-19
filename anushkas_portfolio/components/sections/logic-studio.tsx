"use client";

import { useState } from "react";
import { 
  ReactFlow,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { motion, AnimatePresence } from "framer-motion";
import { scenarios } from "@/data/scenarios";
import { Terminal, Cpu, Play, AlertCircle, Zap, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

const nodeStyle = {
  background: "#09090b",
  color: "#fafafa",
  border: "1px solid #18181b",
  borderRadius: "8px",
  padding: "10px",
  fontSize: "10px",
  fontFamily: "var(--font-mono)",
  minWidth: "120px",
};

const buildNodes = (scenario: (typeof scenarios)[number]): Node[] =>
  scenario.nodes.map((n) => ({ ...n, style: nodeStyle, opacity: 0 }));

export function LogicStudio() {
  const [selectedId, setSelectedId] = useState(scenarios[0].id);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const currentScenario = scenarios.find(s => s.id === selectedId) || scenarios[0];

  const [nodes, setNodes] = useNodesState<Node>(buildNodes(scenarios[0]));
  const [edges, setEdges] = useEdgesState<Edge>([]);

  const selectScenario = (id: string) => {
    if (id === selectedId) return;
    const scenario = scenarios.find((s) => s.id === id) || scenarios[0];
    setSelectedId(id);
    setNodes(buildNodes(scenario));
    setEdges([]);
    setLogs([]);
    setIsRunning(false);
  };

  const runSimulation = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setLogs([]);

    const totalSteps = currentScenario.terminalLogs.length;

    for (let i = 0; i < totalSteps; i++) {
      setLogs(prev => [...prev, currentScenario.terminalLogs[i]]);

      const nodeIndex = Math.floor((i / totalSteps) * currentScenario.nodes.length);
      setNodes(nds => nds.map((n, idx) => idx <= nodeIndex ? { ...n, opacity: 1 } : n));
      
      if (nodeIndex > 0) {
        const edge = currentScenario.edges.find(e => e.target === currentScenario.nodes[nodeIndex].id);
        if (edge) {
          setEdges(eds => {
            if (eds.find(e => e.id === edge.id)) return eds;
            return [...eds, { ...edge, animated: true }];
          });
        }
      }

      await new Promise(resolve => setTimeout(resolve, 600));
    }
    
    setIsRunning(false);
  };

  return (
    <section className="flex flex-col gap-8 py-12 border-t border-border/40" id="logic-studio">
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Engineered Strategy
        </span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Logic Studio
          </h2>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            Simulate the architectural decisions behind high-stakes business systems.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Scenario Select */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          <div className="flex flex-col gap-1.5 rounded-2xl border border-border bg-card/40 p-1.5">
            {scenarios.map((s) => (
              <button
                key={s.id}
                onClick={() => selectScenario(s.id)}
                className={cn(
                  "flex flex-col gap-1 p-3 rounded-xl transition-all text-left",
                  selectedId === s.id 
                    ? "bg-foreground/5 border border-border" 
                    : "hover:bg-foreground/5 border border-transparent"
                )}
              >
                <span className={cn(
                  "text-xs font-bold",
                  selectedId === s.id ? "text-foreground" : "text-muted-foreground"
                )}>
                  {s.title}
                </span>
                <span className="text-[10px] text-muted-foreground line-clamp-1">
                  {s.problem}
                </span>
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3 p-5 rounded-2xl border border-border bg-card/40">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <AlertCircle size={12} /> Challenge
            </span>
            <p className="text-xs leading-relaxed text-muted-foreground italic">
              &quot;{currentScenario.problem}&quot;
            </p>
            <button
              onClick={runSimulation}
              disabled={isRunning}
              className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-foreground text-background text-xs font-bold transition-all hover:opacity-90 disabled:opacity-50"
            >
              {isRunning ? <Cpu size={14} className="animate-spin" /> : <Play size={14} fill="currentColor" />}
              {isRunning ? "Simulating..." : "Run Architect"}
            </button>
          </div>
        </div>

        {/* Dashboard */}
        <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[440px]">
          {/* Terminal */}
          <div className="rounded-2xl border border-border bg-black overflow-hidden flex flex-col relative">
            <div className="p-3 border-b border-border bg-muted/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal size={12} className="text-muted-foreground" />
                <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">Logic Stream</span>
              </div>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-border" />
                <div className="w-1.5 h-1.5 rounded-full bg-border" />
                <div className="w-1.5 h-1.5 rounded-full bg-border" />
              </div>
            </div>
            <div className="p-4 font-mono text-[11px] flex flex-col gap-1.5 overflow-y-auto h-[340px] scrollbar-none">
              <AnimatePresence mode="popLayout">
                {logs.map((log, i) => (
                  <motion.div
                    key={`${selectedId}-log-${i}`}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-2"
                  >
                    <span className="text-muted-foreground select-none opacity-50">›</span>
                    <span className="text-foreground/90">{log}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isRunning && <div className="w-1.5 h-3 bg-foreground/40 mt-1 animate-pulse" />}
            </div>
            
            <AnimatePresence>
              {!isRunning && logs.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-foreground text-background flex items-center justify-between"
                >
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold uppercase tracking-tight opacity-70">{currentScenario.metrics.label}</span>
                    <span className="text-xl font-black leading-none">{currentScenario.metrics.value}</span>
                  </div>
                  <Zap size={20} fill="currentColor" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Canvas */}
          <div className="rounded-2xl border border-border bg-card/40 overflow-hidden relative">
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <Layers size={12} className="text-muted-foreground" />
              <span className="text-[9px] font-bold uppercase text-muted-foreground tracking-widest">Architectural Flow</span>
            </div>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              fitView
              className="bg-transparent"
              nodesDraggable={false}
              nodesConnectable={false}
              zoomOnScroll={false}
              panOnDrag={false}
              proOptions={{ hideAttribution: true }}
            >
              <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#18181b" />
            </ReactFlow>
          </div>
        </div>
      </div>
    </section>
  );
}
