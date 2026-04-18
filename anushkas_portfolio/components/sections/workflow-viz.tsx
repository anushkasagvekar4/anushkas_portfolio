"use client";

import { useCallback } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Sparkles, FileAudio, FileJson, CheckCircle } from "lucide-react";

// Custom node styles to match the OS theme
const nodeStyle = {
  background: "#111118",
  color: "#f0f0f8",
  border: "1px solid #1e1e28",
  borderRadius: "12px",
  padding: "16px",
  fontSize: "12px",
  fontFamily: "var(--font-inter)",
  minWidth: "150px",
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center" as const,
  gap: "8px",
};

const initialNodes = [
  {
    id: "1",
    position: { x: 50, y: 150 },
    data: {
      label: (
        <>
          <FileAudio size={20} className="text-muted-foreground" />
          <div className="font-bold mt-2">Raw Audio</div>
          <div className="text-[10px] text-muted-foreground">"Voice Input"</div>
        </>
      ),
    },
    style: nodeStyle,
  },
  {
    id: "2",
    position: { x: 250, y: 50 },
    data: {
      label: (
        <>
          <Sparkles size={20} className="text-[#a78bfa]" />
          <div className="font-bold text-[#a78bfa] mt-2">Gemini API</div>
          <div className="text-[10px] text-muted-foreground">Transcription</div>
        </>
      ),
    },
    style: nodeStyle,
  },
  {
    id: "3",
    position: { x: 450, y: 150 },
    data: {
      label: (
        <>
          <FileJson size={20} className="text-[#2dd4bf]" />
          <div className="font-bold text-[#2dd4bf] mt-2">JSON Parse</div>
          <div className="text-[10px] text-muted-foreground">Structured Data</div>
        </>
      ),
    },
    style: nodeStyle,
  },
  {
    id: "4",
    position: { x: 650, y: 150 },
    data: {
      label: (
        <>
          <CheckCircle size={20} className="text-[#fb923c]" />
          <div className="font-bold text-[#fb923c] mt-2">Auto-fill Form</div>
          <div className="text-[10px] text-muted-foreground">DB Insert</div>
        </>
      ),
    },
    style: nodeStyle,
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true, style: { stroke: "#a78bfa" } },
  { id: "e2-3", source: "2", target: "3", animated: true, style: { stroke: "#2dd4bf" } },
  { id: "e3-4", source: "3", target: "4", animated: true, style: { stroke: "#fb923c" } },
];

export function WorkflowViz() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <section className="flex flex-col gap-8 py-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          AI Workflows <span className="font-mono text-sm text-muted-foreground ml-2">/ systems.map</span>
        </h2>
        <p className="text-muted-foreground">
          Interactive view of the Voice-to-Form pipeline built for AI Mishqat.
        </p>
      </div>

      <div className="h-[400px] w-full rounded-3xl border border-border bg-[#0c0c10] overflow-hidden relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          className="bg-transparent"
        >
          <Controls className="bg-card border-border fill-foreground" />
          <MiniMap 
            nodeColor="#a78bfa" 
            maskColor="rgba(12, 12, 16, 0.8)" 
            className="bg-card border-border" 
          />
          <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="#1e1e28" />
        </ReactFlow>
      </div>
    </section>
  );
}
