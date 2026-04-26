export interface Scenario {
  id: string;
  title: string;
  problem: string;
  metrics: {
    label: string;
    value: string;
    description: string;
  };
  terminalLogs: string[];
  nodes: any[];
  edges: any[];
}

export const scenarios: Scenario[] = [
  {
    id: "invoice-chaos",
    title: "Invoice Extraction",
    problem: "A client manually processes 500+ heterogeneous invoices weekly, leading to 15% error rates and 40+ hours of manual data entry.",
    metrics: {
      label: "Efficiency Boost",
      value: "80%",
      description: "Reduction in manual processing time"
    },
    terminalLogs: [
      "Initializing Unified Vision Engine...",
      "Detected 42 batch uploads in queue.",
      "Gemini Vision API: Analyzing spatial layout...",
      "Extracting Vendor ID: 'SOLOCRAFT-99' (Confidence: 98%)",
      "Parsing line items and tax schema...",
      "Validation: Subtotal matches calculated items.",
      "Pushing structured JSON to MongoDB..."
    ],
    nodes: [
      { id: '1', position: { x: 50, y: 100 }, data: { label: 'Raw Invoice PDF' } },
      { id: '2', position: { x: 250, y: 100 }, data: { label: 'Gemini Vision AI' } },
      { id: '3', position: { x: 450, y: 50 }, data: { label: 'Schema Mapping' } },
      { id: '4', position: { x: 450, y: 150 }, data: { label: 'Logic Validation' } },
      { id: '5', position: { x: 650, y: 100 }, data: { label: 'Structured DB' } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', animated: true },
      { id: 'e2-3', source: '2', target: '3', animated: true },
      { id: 'e2-4', source: '2', target: '4', animated: true },
      { id: 'e3-5', source: '3', target: '5', animated: true },
      { id: 'e4-5', source: '4', target: '5', animated: true },
    ]
  },
  {
    id: "voice-entry",
    title: "Voice-to-Form",
    problem: "Field agents need to report findings but typing on mobile mid-site is slow and prone to inaccuracies.",
    metrics: {
      label: "Reporting Speed",
      value: "60%",
      description: "Increase in data entry velocity"
    },
    terminalLogs: [
      "Awaiting stream from WebSocket...",
      "Detected Audio Buffer (PCM 16bit)...",
      "Gemini Flash: Transcribing speech to text...",
      "Intent Analysis: Field Update detected.",
      "Mapping transcription to form schema...",
      "Auto-filling: [Temperature: 85°F], [Condition: OK]",
      "Transaction complete."
    ],
    nodes: [
      { id: '1', position: { x: 50, y: 100 }, data: { label: 'Real-time Audio' } },
      { id: '2', position: { x: 250, y: 100 }, data: { label: 'Gemini Flash' } },
      { id: '3', position: { x: 450, y: 100 }, data: { label: 'Contextual Map' } },
      { id: '4', position: { x: 650, y: 100 }, data: { label: 'Live Form UI' } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', animated: true },
      { id: 'e2-3', source: '2', target: '3', animated: true },
      { id: 'e3-4', source: '3', target: '4', animated: true },
    ]
  },
  {
    id: "support-bottleneck",
    title: "AI Response Engine",
    problem: "Global support team handles ~1000 repetitive query emails daily, delaying critical escalations.",
    metrics: {
      label: "Manual Work Cut",
      value: "70%",
      description: "Queries resolved without human intervention"
    },
    terminalLogs: [
      "Inbound Mail: [Ticket #88219] received.",
      "Classifier: Intent = 'Order Tracking'.",
      "RAG: Searching MongoDB Vector Store...",
      "Generated Context: [Shipment status: In Transit].",
      "Dafting AI response with dynamic tokens...",
      "Quality Gate: Tone = Professional, Style = Precise.",
      "Dispatching auto-response."
    ],
    nodes: [
      { id: '1', position: { x: 50, y: 100 }, data: { label: 'Inbound Email' } },
      { id: '2', position: { x: 250, y: 50 }, data: { label: 'Intent Classifier' } },
      { id: '3', position: { x: 250, y: 150 }, data: { label: 'Vector RAG' } },
      { id: '4', position: { x: 450, y: 100 }, data: { label: 'AI Composer' } },
      { id: '5', position: { x: 650, y: 100 }, data: { label: 'Resolved Ticket' } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', animated: true },
      { id: 'e1-3', source: '1', target: '3', animated: true },
      { id: 'e2-4', source: '2', target: '4', animated: true },
      { id: 'e3-4', source: '3', target: '4', animated: true },
      { id: 'e4-5', source: '4', target: '5', animated: true },
    ]
  }
];
