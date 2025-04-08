import React, { useState, useEffect, useRef, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Main app component
const TTTVisualization = () => {
  // Theme state
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState(0); // Default to Introduction
  const [animationSpeed, setAnimationSpeed] = useState(0.5);
  const [isPaused, setIsPaused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toggle theme
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when a section is selected
  const selectSection = (index) => {
    setActiveSection(index);
    setMobileMenuOpen(false); // Close menu on selection
  };

  // Apply theme to body
  useEffect(() => {
    document.body.classList.toggle('dark-theme', darkMode);
    document.body.classList.toggle('light-theme', !darkMode); // Add light theme class too
    return () => {
      document.body.classList.remove('dark-theme', 'light-theme');
    };
  }, [darkMode]);

  // Sections
  const sections = [
    { id: 'intro', title: 'Introduction' },
    { id: 'neural', title: 'Neural Hidden State' },
    { id: 'process', title: 'TTT Process' },
    { id: 'performance', title: 'Performance' },
    { id: 'technical', title: 'Technical Details' }
  ];

  return (
    <div className={`app-container ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      {/* Streamlined header with theme toggle */}
      <header className="app-header">
        <div className="header-content">
          <h1 className="title">TTT Visualization</h1> {/* Shortened Title */}

          <div className="header-controls">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon">
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon">
                  <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                </svg>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              className="mobile-menu-toggle"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon">
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon">
                  <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className={`main-nav desktop-nav`}>
          <ul>
            {sections.map((section, index) => (
              <li key={`desktop-${section.id}`} className={activeSection === index ? 'active' : ''}>
                <button onClick={() => selectSection(index)}>
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Navigation */}
        <nav className={`main-nav mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <ul>
            {sections.map((section, index) => (
              <li key={`mobile-${section.id}`} className={activeSection === index ? 'active' : ''}>
                <button onClick={() => selectSection(index)}>
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Main content */}
      <main className="main-content">
        {activeSection === 0 && <IntroSection darkMode={darkMode} />}
        {activeSection === 1 && (
          <NeuralHiddenStateSection
            darkMode={darkMode}
            animationSpeed={animationSpeed}
            setAnimationSpeed={setAnimationSpeed}
            isPaused={isPaused}
            setIsPaused={setIsPaused}
          />
        )}
        {activeSection === 2 && <TTTProcessSection darkMode={darkMode} />}
        {activeSection === 3 && <PerformanceSection darkMode={darkMode} />}
        {activeSection === 4 && <TechnicalSection darkMode={darkMode} />}
      </main>
    </div>
  );
};

// Introduction section
const IntroSection = ({ darkMode }) => {
  return (
    <section className="section intro-section">
      <div className="section-card">
        <h2>Learning to (Learn at Test Time)</h2>
        <h3>RNNs with Expressive Hidden States</h3>

        <div className="content-grid intro-grid">
          <div className="text-column">
            <div className="highlight-box">
              <h3>The Core Idea</h3>
              <p><strong>Problem:</strong> Transformers scale quadratically with context length (expensive), while traditional RNNs struggle to effectively use long contexts due to fixed-size, less expressive hidden states.</p>
              <p><strong>TTT Solution:</strong> Create RNN-like layers with <strong>linear complexity</strong> but <strong>expressive hidden states</strong>. Achieve this by making the hidden state a machine learning model (e.g., Linear, MLP) that is continuously updated (trained) on the input sequence itself during inference (test time).</p>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <h4><span className="icon-inline">⚡</span> Linear Complexity</h4>
                <p>O(n) scaling like RNNs, efficient for long sequences.</p>
              </div>
              <div className="feature-card">
                <h4><span className="icon-inline">🧠</span> Expressive Hidden States</h4>
                <p>Hidden state is a model (W) that learns from the sequence.</p>
              </div>
              <div className="feature-card">
                <h4><span className="icon-inline">🔄</span> Self-Supervised Update</h4>
                <p>Hidden state W updates via gradient descent on a self-supervised task (e.g., reconstruction).</p>
              </div>
              <div className="feature-card">
                <h4><span className="icon-inline">📈</span> Long Context Performance</h4>
                <p>Continues to improve performance as context length increases (tested up to 32k+).</p>
              </div>
            </div>
          </div>

          <div className="visual-column">
            <div className="diagram-container">
              <TTTDiagram darkMode={darkMode} />
              <p className="diagram-caption">Fig 1: TTT Layer Concept. The hidden state (W) is updated using the input token (xₜ) via a gradient step (Update Rule), then used to predict the output (zₜ).</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Simple TTT Diagram (Refined)
const TTTDiagram = ({ darkMode }) => {
  const colors = {
    bg: darkMode ? '#1e1e2e' : '#eff1f5', // Use base background
    stroke: darkMode ? '#89b4fa' : '#1e66f5', // Blue
    fill: darkMode ? '#313244' : '#ccd0da', // Surface0
    text: darkMode ? '#cdd6f4' : '#4c4f69', // Text
    highlight: darkMode ? '#f5c2e7' : '#ea76cb', // Pink
    arrow: darkMode ? '#a6adc8' : '#6c6f85', // Subtext0
  };

  return (
    <svg width="100%" viewBox="0 0 450 300" className="ttt-diagram">
      {/* Nodes */}
      <g className="input-token" transform="translate(50, 200)">
        <rect x="0" y="0" width="100" height="50" fill={colors.fill} stroke={colors.stroke} strokeWidth="1.5" rx="5" />
        <text x="50" y="20" textAnchor="middle" fill={colors.text} fontSize="14" fontWeight="bold">Input</text>
        <text x="50" y="40" textAnchor="middle" fill={colors.text} fontSize="12" fontFamily="monospace">x<tspan baselineShift="sub">t</tspan></text>
      </g>

      <g className="hidden-state" transform="translate(50, 50)">
         <rect x="0" y="0" width="100" height="50" fill={colors.fill} stroke={colors.stroke} strokeWidth="1.5" rx="5" />
        <text x="50" y="20" textAnchor="middle" fill={colors.text} fontSize="14" fontWeight="bold">Hidden State</text>
        <text x="50" y="40" textAnchor="middle" fill={colors.text} fontSize="12" fontFamily="monospace">W<tspan baselineShift="sub">t</tspan></text>
      </g>

       <g className="prev-hidden-state" transform="translate(50, 125)">
         <rect x="0" y="0" width="100" height="50" fill={colors.fill} stroke={colors.stroke} strokeWidth="1.5" rx="5" strokeDasharray="3 3"/>
        <text x="50" y="20" textAnchor="middle" fill={colors.subtext0} fontSize="14" fontWeight="bold">Prev State</text>
        <text x="50" y="40" textAnchor="middle" fill={colors.subtext0} fontSize="12" fontFamily="monospace">W<tspan baselineShift="sub">t-1</tspan></text>
      </g>

      <g className="update-rule" transform="translate(200, 125)">
        <rect x="0" y="0" width="150" height="50" fill={colors.fill} stroke={colors.highlight} strokeWidth="1.5" rx="5" />
        <text x="75" y="20" textAnchor="middle" fill={colors.text} fontSize="14" fontWeight="bold">Update Rule</text>
        <text x="75" y="40" textAnchor="middle" fill={colors.text} fontSize="10" fontFamily="monospace">W<tspan baselineShift="sub">t</tspan> = W<tspan baselineShift="sub">t-1</tspan> - η∇ℓ(W<tspan baselineShift="sub">t-1</tspan>; x<tspan baselineShift="sub">t</tspan>)</text>
      </g>

      <g className="output-rule" transform="translate(200, 50)">
        <rect x="0" y="0" width="150" height="50" fill={colors.fill} stroke={colors.stroke} strokeWidth="1.5" rx="5" />
        <text x="75" y="20" textAnchor="middle" fill={colors.text} fontSize="14" fontWeight="bold">Output Rule</text>
         <text x="75" y="40" textAnchor="middle" fill={colors.text} fontSize="12" fontFamily="monospace">z<tspan baselineShift="sub">t</tspan> = f(x<tspan baselineShift="sub">t</tspan>; W<tspan baselineShift="sub">t</tspan>)</text>
      </g>

       <g className="output-token" transform="translate(380, 50)">
        <rect x="0" y="0" width="70" height="50" fill={colors.fill} stroke={colors.stroke} strokeWidth="1.5" rx="5" />
        <text x="35" y="20" textAnchor="middle" fill={colors.text} fontSize="14" fontWeight="bold">Output</text>
        <text x="35" y="40" textAnchor="middle" fill={colors.text} fontSize="12" fontFamily="monospace">z<tspan baselineShift="sub">t</tspan></text>
      </g>

      {/* Connections */}
      <defs>
        <marker id={`arrowhead-${darkMode ? 'dark' : 'light'}`} markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill={colors.arrow} />
        </marker>
         <marker id={`arrowhead-highlight-${darkMode ? 'dark' : 'light'}`} markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill={colors.highlight} />
        </marker>
      </defs>

      <g className="connections">
        {/* Input -> Update */}
        <path d="M 150 225 Q 175 225, 185 175 L 200 150" fill="none" stroke={colors.arrow} strokeWidth="1.5" markerEnd={`url(#arrowhead-${darkMode ? 'dark' : 'light'})`} />
        {/* Prev State -> Update */}
        <line x1="150" y1="150" x2="200" y2="150" stroke={colors.arrow} strokeWidth="1.5" markerEnd={`url(#arrowhead-${darkMode ? 'dark' : 'light'})`} />
         {/* Update -> Hidden State */}
        <path d="M 275 125 Q 275 100, 150 75" fill="none" stroke={colors.highlight} strokeWidth="1.5" markerEnd={`url(#arrowhead-highlight-${darkMode ? 'dark' : 'light'})`} strokeDasharray="4 2"/>
        {/* Hidden State -> Output Rule */}
        <line x1="150" y1="75" x2="200" y2="75" stroke={colors.arrow} strokeWidth="1.5" markerEnd={`url(#arrowhead-${darkMode ? 'dark' : 'light'})`} />
         {/* Input -> Output Rule (dependency for f) */}
         <path d="M 100 200 Q 150 150, 200 100" fill="none" stroke={colors.arrow} strokeWidth="1.5" markerEnd={`url(#arrowhead-${darkMode ? 'dark' : 'light'})`} strokeDasharray="2 2"/>
         {/* Output Rule -> Output */}
        <line x1="350" y1="75" x2="380" y2="75" stroke={colors.arrow} strokeWidth="1.5" markerEnd={`url(#arrowhead-${darkMode ? 'dark' : 'light'})`} />
      </g>
    </svg>
  );
};


// Neural Hidden State Section (Refined)
const NeuralHiddenStateSection = ({ darkMode, animationSpeed, setAnimationSpeed, isPaused, setIsPaused }) => {
  const [modelType, setModelType] = useState('linear'); // 'linear' or 'mlp'

  return (
    <section className="section neural-section">
      <div className="section-card">
        <div className="section-header" style={{
          background: darkMode
            ? 'linear-gradient(90deg, var(--mauve) 0%, var(--lavender) 100%)'
            : 'linear-gradient(90deg, var(--mauve) 0%, var(--lavender) 100%)' // Keep gradient consistent
        }}>
          <h2>The Adaptive Hidden State</h2>
          <p>The core of TTT: The hidden state (W) is a model that learns during inference.</p>
        </div>

        <div className="section-content">
          <div className="controls-row">
            <div className="model-selector">
              <span>Hidden State Model:</span>
              <div className="button-group">
                <button
                  className={modelType === 'linear' ? 'active' : ''}
                  onClick={() => setModelType('linear')}
                >
                  Linear Model (W)
                </button>
                <button
                  className={modelType === 'mlp' ? 'active' : ''}
                  onClick={() => setModelType('mlp')}
                >
                  MLP (W₁, W₂)
                </button>
              </div>
            </div>

            <div className="animation-controls">
              <button
                className="control-button"
                onClick={() => setIsPaused(!isPaused)}
                aria-label={isPaused ? "Play animation" : "Pause animation"}
              >
                {isPaused ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon"><path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon"><path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" /></svg>
                )}
              </button>

              <div className="speed-control">
                <span className="speed-label">Update Speed:</span>
                <input
                  type="range"
                  min="0.1"
                  max="2"
                  step="0.1"
                  value={animationSpeed}
                  onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
                  className="speed-slider"
                />
                <span className="speed-value">{animationSpeed.toFixed(1)}x</span>
              </div>
            </div>
          </div>

          <div className="neural-visualization">
            <NeuralNetworkAnimation
              darkMode={darkMode}
              modelType={modelType}
              speed={animationSpeed}
              paused={isPaused}
            />
          </div>

          <div className="description-box">
            {modelType === 'linear' ? (
              <>
                <h4>TTT-Linear</h4>
                <p>The hidden state is a single weight matrix (W). It's updated with each token using gradient descent on a self-supervised reconstruction loss. This captures linear relationships in the input sequence efficiently.</p>
              </>
            ) : (
              <>
                <h4>TTT-MLP</h4>
                <p>The hidden state is a 2-layer Multi-Layer Perceptron (MLP) with weights (W₁, W₂). This allows capturing more complex, non-linear patterns in the sequence data, potentially leading to better performance in long contexts, but with higher computational cost for the update step.</p>
              </>
            )}
             <p className="animation-note"><em>Animation shows a conceptual representation of the dynamic weights. Colors indicate weight sign/magnitude (Blue/Positive, Red/Negative).</em></p>
          </div>
        </div>
      </div>
    </section>
  );
};


// Neural Network Animation Component (Refined)
const NeuralNetworkAnimation = ({ darkMode, modelType, speed, paused }) => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const previousTimeRef = useRef(null);
  const [time, setTime] = useState(0);

  // Define network structure based on model type
  const layers = modelType === 'linear' ? [4, 4] : [4, 6, 4]; // Adjusted MLP size for better visualization
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);

  // Initialize nodes and links
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const width = canvas.width;
    const height = canvas.height;

    let newNodes = [];
    let newLinks = [];

    // Create nodes for each layer
    layers.forEach((nodeCount, layerIndex) => {
      const layerOffset = width / (layers.length + 1) * (layerIndex + 1);
      const nodeRadius = Math.min(15, height / (nodeCount * 2.5)); // Dynamic radius

      for (let i = 0; i < nodeCount; i++) {
        const y = height / (nodeCount + 1) * (i + 1);
        const node = {
          id: `node-${layerIndex}-${i}`,
          x: layerOffset,
          y: y,
          layer: layerIndex,
          radius: nodeRadius,
          color: darkMode ?
            ['#74c7ec', '#89b4fa', '#b4befe'][layerIndex % 3] : // Sky, Blue, Lavender (Dark)
            ['#04a5e5', '#1e66f5', '#7287fd'][layerIndex % 3]  // Sky, Blue, Lavender (Light)
        };
        newNodes.push(node);
      }
    });

    // Create links between nodes
    for (let layerIndex = 0; layerIndex < layers.length - 1; layerIndex++) {
      const sourceNodes = newNodes.filter(node => node.layer === layerIndex);
      const targetNodes = newNodes.filter(node => node.layer === layerIndex + 1);

      sourceNodes.forEach(source => {
        targetNodes.forEach(target => {
          newLinks.push({
            id: `link-${source.id}-${target.id}`,
            source: source.id,
            target: target.id,
            baseValue: (Math.random() * 2 - 1) * 0.4, // Initial random weight
            sourceNode: source,
            targetNode: target
          });
        });
      });
    }

    setNodes(newNodes);
    setLinks(newLinks);
  }, [layers, darkMode, canvasRef.current?.width, canvasRef.current?.height]); // Re-run if canvas size changes

  // Animation loop
  const animate = useCallback((timestamp) => {
    if (previousTimeRef.current === null) {
      previousTimeRef.current = timestamp;
    }

    const deltaTime = timestamp - previousTimeRef.current;

    if (!paused) {
      // Use a smoother time progression, less jumpy than modulo
      setTime(prevTime => prevTime + deltaTime * 0.0003 * speed);
    }

    previousTimeRef.current = timestamp;
    requestRef.current = requestAnimationFrame(animate);
  }, [paused, speed]);

  useEffect(() => {
    previousTimeRef.current = null; // Reset time reference when dependencies change
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);

  // Draw the network
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || nodes.length === 0) return; // Ensure nodes are initialized

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Background
    ctx.fillStyle = darkMode ? '#1e1e2e' : '#eff1f5'; // Base background
    ctx.fillRect(0, 0, width, height);

    // Draw links with animated weights
    links.forEach(link => {
      const source = link.sourceNode; // Use pre-linked nodes
      const target = link.targetNode;

      if (!source || !target) return;

      // Animate weights based on time - smoother oscillation
      const timeFactor = Math.sin(time * 1.5 + source.layer * 0.5 + source.y * 0.01);
      const weight = link.baseValue + timeFactor * 0.3; // Oscillate around base value

      // Determine color and thickness based on weight
      const absWeight = Math.abs(weight);
      const alpha = Math.min(0.8, absWeight * 1.5); // More subtle alpha
      const strokeColor = weight > 0
        ? darkMode ? `rgba(137, 180, 250, ${alpha})` : `rgba(30, 102, 245, ${alpha})` // Blue
        : darkMode ? `rgba(243, 139, 168, ${alpha})` : `rgba(210, 15, 57, ${alpha})`; // Red

      // Draw link
      ctx.beginPath();
      ctx.moveTo(source.x, source.y);
      ctx.lineTo(target.x, target.y);
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = Math.min(3, absWeight * 4 + 0.3); // Clamp max thickness
      ctx.stroke();
    });

    // Draw nodes
    nodes.forEach(node => {
      // Node circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.fill();

      // Node border
      ctx.strokeStyle = darkMode ? '#45475a' : '#bcc0cc'; // Surface1 / Surface1
      ctx.lineWidth = 1;
      ctx.stroke();

      // Pulse animation for input/output layers (more subtle)
      const pulseFactor = Math.sin(time * 2 + node.layer * Math.PI);
      if ((node.layer === 0 || node.layer === layers.length - 1) && pulseFactor > 0.5) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + pulseFactor * 3, 0, Math.PI * 2); // Smaller pulse
        ctx.strokeStyle = darkMode ? `rgba(205, 214, 244, ${0.4 * pulseFactor})` : `rgba(76, 79, 105, ${0.4 * pulseFactor})`; // Text / Text
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    });

  }, [time, nodes, links, darkMode]); // Rerun drawing when these change

  return (
    <canvas
      ref={canvasRef}
      width={600} // Fixed width, adjust as needed
      height={350} // Fixed height
      className="neural-canvas"
    />
  );
};


// TTT Process Section (Refined)
const TTTProcessSection = ({ darkMode }) => {
  return (
    <section className="section process-section">
      <div className="section-card">
        <h2>The Test-Time Training Process</h2>
        <p className="section-subtitle">How the hidden state learns from the sequence during inference.</p>

        <div className="process-visualization">
          <TTTProcessVisualization darkMode={darkMode} />
        </div>

        <h3>Key Steps in the Inner Loop</h3>

        <div className="process-steps">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Receive Input Token (x<tspan baselineShift="sub">t</tspan>)</h4>
              <p>The next token in the sequence arrives.</p>
            </div>
          </div>

          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Compute Self-Supervised Loss (ℓ)</h4>
              <p>A loss is calculated based on how well the *current* hidden state (W<tspan baselineShift="sub">t-1</tspan>) performs a self-supervised task on x<tspan baselineShift="sub">t</tspan> (e.g., reconstructing masked parts of x<tspan baselineShift="sub">t</tspan>).</p>
            </div>
          </div>

          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Calculate Gradient (∇ℓ)</h4>
              <p>The gradient of the loss with respect to the *previous* hidden state W<tspan baselineShift="sub">t-1</tspan> is computed: ∇ℓ(W<tspan baselineShift="sub">t-1</tspan>; x<tspan baselineShift="sub">t</tspan>).</p>
            </div>
          </div>

          <div className="step-card">
            <div className="step-number">4</div>
            <div className="step-content">
              <h4>Update Hidden State (W<tspan baselineShift="sub">t</tspan>)</h4>
              <p>The hidden state is updated using one step of gradient descent: W<tspan baselineShift="sub">t</tspan> = W<tspan baselineShift="sub">t-1</tspan> - η∇ℓ.</p>
            </div>
          </div>

           <div className="step-card">
            <div className="step-number">5</div>
            <div className="step-content">
              <h4>Generate Output (z<tspan baselineShift="sub">t</tspan>)</h4>
              <p>The *updated* hidden state W<tspan baselineShift="sub">t</tspan> is used with the input x<tspan baselineShift="sub">t</tspan> to produce the output token z<tspan baselineShift="sub">t</tspan> = f(x<tspan baselineShift="sub">t</tspan>; W<tspan baselineShift="sub">t</tspan>).</p>
            </div>
          </div>
        </div>
         <p className="process-note">This entire inner loop (steps 1-5) happens for *every token* during inference. The outer loop (standard model training) learns the initial W<tspan baselineShift="sub">0</tspan>, the function f, the learning rate η, and the parameters of the self-supervised task ℓ.</p>
      </div>
    </section>
  );
};


// TTT Process Visualization Component (Refined)
const TTTProcessVisualization = ({ darkMode }) => {
  const [time, setTime] = useState(0);
  const [tokens, setTokens] = useState([]);
  const tokenStream = useRef("TTT makes the hidden state a model itself updated via self-supervised learning".split(/\s+/));
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const previousTimeRef = useRef(null);
  const [hiddenStateMatrix, setHiddenStateMatrix] = useState([]);
  const matrixSize = 5; // Size of the visualized matrix

  // Initialize hidden state matrix
  useEffect(() => {
    const initialMatrix = Array(matrixSize).fill(0).map(() =>
      Array(matrixSize).fill(0).map(() => (Math.random() - 0.5) * 0.8) // Initial random weights
    );
    setHiddenStateMatrix(initialMatrix);
  }, []);

  // Initialize tokens
  useEffect(() => {
    const initialTokens = tokenStream.current.map((word, index) => ({
      id: index,
      text: word.replace(/[.,;]/g, ''),
      processed: false,
      highlight: false,
      gradientMagnitude: 0,
    }));
    setTokens(initialTokens);
  }, []);

  // Animation loop
  useEffect(() => {
    const animate = (timestamp) => {
      if (previousTimeRef.current === null) {
        previousTimeRef.current = timestamp;
      }
      const deltaTime = timestamp - previousTimeRef.current;
      setTime(prevTime => prevTime + deltaTime * 0.0008); // Slightly faster animation
      previousTimeRef.current = timestamp;
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  // Process tokens and update visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || tokens.length === 0) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Background
    ctx.fillStyle = darkMode ? '#1e1e2e' : '#eff1f5';
    ctx.fillRect(0, 0, width, height);

    // --- Token Stream Visualization ---
    const tokenSpacing = 75;
    const tokenStartY = 50;
    const maxVisibleTokens = Math.floor((width - 40) / tokenSpacing);
    const totalAnimationCycle = tokens.length; // One full pass through tokens
    const currentCycleTime = time % totalAnimationCycle;
    const processIndex = Math.floor(currentCycleTime);
    const processProgress = currentCycleTime - processIndex; // 0 to 1 progress within the current token

    // Update token states
    tokens.forEach((token, index) => {
      token.processed = index < processIndex;
      token.highlight = index === processIndex;
      // Simulate gradient calculation during highlight phase
      token.gradientMagnitude = token.highlight ? Math.sin(processProgress * Math.PI) : 0; // Gradient peaks mid-process
    });

    // Calculate visible range
    const centerTokenIndex = processIndex;
    const visibleStartIndex = Math.max(0, centerTokenIndex - Math.floor(maxVisibleTokens / 2));
    const visibleEndIndex = Math.min(tokens.length, visibleStartIndex + maxVisibleTokens);
    const offsetX = width / 2 - (centerTokenIndex - visibleStartIndex + 0.5) * tokenSpacing; // Center the current token

    // Draw tokens
    for (let i = visibleStartIndex; i < visibleEndIndex; i++) {
      const token = tokens[i];
      const x = offsetX + (i - visibleStartIndex) * tokenSpacing;
      const y = tokenStartY;
      const tokenWidth = Math.max(50, token.text.length * 7 + 10);

      // Token Box
      ctx.beginPath();
      ctx.roundRect(x - tokenWidth / 2, y - 15, tokenWidth, 30, 5);
      ctx.lineWidth = token.highlight ? 2 : 1;
      ctx.strokeStyle = token.highlight ? (darkMode ? '#f5c2e7' : '#ec4899') // Pink
                       : token.processed ? (darkMode ? '#89b4fa' : '#1e66f5') // Blue
                       : (darkMode ? '#6c7086' : '#9ca0b0'); // Overlay0
      ctx.fillStyle = token.highlight ? (darkMode ? 'rgba(245, 194, 231, 0.2)' : 'rgba(234, 118, 203, 0.1)')
                      : token.processed ? (darkMode ? 'rgba(137, 180, 250, 0.1)' : 'rgba(30, 102, 245, 0.05)')
                      : (darkMode ? 'rgba(49, 50, 68, 0.5)' : 'rgba(204, 208, 218, 0.5)'); // Surface0 / Surface0
      ctx.fill();
      ctx.stroke();

      // Token Text
      ctx.fillStyle = darkMode ? '#cdd6f4' : '#4c4f69';
      ctx.font = token.highlight ? 'bold 11px sans-serif' : '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(token.text, x, y);

      // --- Connections and Gradient ---
      const hiddenStateCenterY = height * 0.65;
      if (token.highlight) {
        // Line to Gradient Symbol
        ctx.beginPath();
        ctx.moveTo(x, y + 15);
        ctx.lineTo(x, y + 45);
        ctx.strokeStyle = darkMode ? '#f5c2e7' : '#ec4899'; // Pink
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Gradient Symbol (∇ℓ) - pulsing
        const gradientPulse = token.gradientMagnitude * 5;
        ctx.fillStyle = darkMode ? '#f5c2e7' : '#ec4899';
        ctx.font = `bold ${18 + gradientPulse}px monospace`;
        ctx.fillText('∇ℓ', x, y + 65 + gradientPulse / 2);

        // Line from Gradient to Hidden State
        ctx.beginPath();
        ctx.moveTo(x, y + 80 + gradientPulse);
        ctx.lineTo(x, hiddenStateCenterY - 40); // Point towards matrix top
        ctx.strokeStyle = darkMode ? '#f5c2e7' : '#ec4899';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 2]);
        ctx.stroke();
        ctx.setLineDash([]); // Reset dash pattern

      } else if (token.processed) {
         // Line indicating contribution to state (subtle)
         ctx.beginPath();
         ctx.moveTo(x, y + 15);
         ctx.lineTo(x, hiddenStateCenterY - 40);
         ctx.strokeStyle = darkMode ? 'rgba(137, 180, 250, 0.3)' : 'rgba(30, 102, 245, 0.2)'; // Faint Blue
         ctx.lineWidth = 0.5;
         ctx.stroke();
      }
    }

    // --- Hidden State Matrix Visualization ---
    const matrixTotalSize = matrixSize * 20; // Cell size = 20
    const matrixStartX = width / 2 - matrixTotalSize / 2;
    const matrixStartY = hiddenStateCenterY - matrixTotalSize / 2;

    // Update matrix based on gradient magnitude of the highlighted token
    const currentToken = tokens[processIndex];
    const gradientEffect = currentToken?.gradientMagnitude * 0.1 || 0; // Max effect of 0.1

    ctx.save(); // Save context for matrix drawing
    ctx.translate(matrixStartX, matrixStartY);

    // Draw Matrix Cells
    for (let i = 0; i < matrixSize; i++) {
      for (let j = 0; j < matrixSize; j++) {
        // Apply gradient effect (simulate update) - make it slightly random which cells change
        const shouldUpdate = Math.random() < processProgress * 0.5; // More likely to update as progress increases
        const updateDirection = Math.random() > 0.5 ? 1 : -1;
        const currentValue = hiddenStateMatrix[i][j] + (shouldUpdate ? gradientEffect * updateDirection : 0);
        hiddenStateMatrix[i][j] = Math.max(-1, Math.min(1, currentValue)); // Clamp value

        const value = hiddenStateMatrix[i][j];
        const absValue = Math.abs(value);
        const blueIntensity = Math.max(0, value);
        const redIntensity = Math.max(0, -value);

        // Interpolate between base and blue/red
        const r = Math.round(darkMode ? 30 + redIntensity * (243 - 30) : 239 + redIntensity * (210 - 239));
        const g = Math.round(darkMode ? 30 + blueIntensity * (137 - 30) : 239 + blueIntensity * (30 - 239));
        const b = Math.round(darkMode ? 46 + blueIntensity * (180 - 46) : 245 + blueIntensity * (102 - 245));
        const alpha = 0.3 + absValue * 0.6; // Base alpha + value intensity

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fillRect(j * 20, i * 20, 19, 19); // Cell size 20, gap 1

        // Add subtle shimmer on update
        if (shouldUpdate && gradientEffect > 0.01) {
           ctx.fillStyle = darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
           ctx.fillRect(j * 20, i * 20, 19, 19);
        }
      }
    }
    ctx.restore(); // Restore context

    // Draw Matrix Border and Label
    ctx.strokeStyle = darkMode ? '#b4befe' : '#7287fd'; // Lavender
    ctx.lineWidth = 1.5;
    ctx.strokeRect(matrixStartX - 5, matrixStartY - 5, matrixTotalSize + 10, matrixTotalSize + 10);
    ctx.fillStyle = darkMode ? '#cdd6f4' : '#4c4f69';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Hidden State W (Model Weights)', width / 2, matrixStartY - 15);

    // Draw Labels
    ctx.fillStyle = darkMode ? '#a6adc8' : '#6c6f85'; // Subtext0
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Input Token Stream', width / 2, tokenStartY - 30);
    if (currentToken?.highlight) {
       ctx.fillStyle = darkMode ? '#f5c2e7' : '#ec4899'; // Pink
       ctx.fillText(`Calculating Gradient ∇ℓ for "${currentToken.text}"`, width / 2, height - 50);
       ctx.fillText(`Updating Hidden State W...`, width / 2, height - 30);
    } else {
       ctx.fillStyle = darkMode ? '#a6adc8' : '#6c6f85'; // Subtext0
       ctx.fillText(`Waiting for next token...`, width / 2, height - 40);
    }


  }, [time, tokens, darkMode, hiddenStateMatrix]); // Rerun drawing when these change

  return (
    <canvas
      ref={canvasRef}
      width={800} // Wider canvas for stream
      height={350}
      className="process-canvas"
    />
  );
};


// Performance Section (Refined)
const PerformanceSection = ({ darkMode }) => {
  const [contextLength, setContextLength] = useState(32000);

  // Performance data from Figure 2 (right panel)
  const performanceData = [
    { tokens: 128,  Transformer: 11.0, Mamba: 10.8, 'TTT-Linear': 10.7, 'TTT-MLP': 10.5 },
    { tokens: 256,  Transformer: 10.8, Mamba: 10.6, 'TTT-Linear': 10.5, 'TTT-MLP': 10.3 },
    { tokens: 512,  Transformer: 10.6, Mamba: 10.4, 'TTT-Linear': 10.3, 'TTT-MLP': 10.1 },
    { tokens: 1000, Transformer: 10.4, Mamba: 10.2, 'TTT-Linear': 10.1, 'TTT-MLP': 9.9 },
    { tokens: 2000, Transformer: 10.2, Mamba: 10.0, 'TTT-Linear': 9.9,  'TTT-MLP': 9.8 },
    { tokens: 4000, Transformer: 9.9,  Mamba: 9.8,  'TTT-Linear': 9.7,  'TTT-MLP': 9.6 },
    { tokens: 8000, Transformer: 9.6,  Mamba: 9.6,  'TTT-Linear': 9.5,  'TTT-MLP': 9.4 },
    { tokens: 16000,Transformer: 9.2,  Mamba: 9.5,  'TTT-Linear': 9.2,  'TTT-MLP': 9.1 }, // Mamba plateaus
    { tokens: 32000,Transformer: 8.8,  Mamba: 9.5,  'TTT-Linear': 9.0,  'TTT-MLP': 8.9 }  // TTT continues improving
  ];

  // Colors for the chart lines (Catppuccin)
  const lineColors = {
    Transformer: darkMode ? '#fab387' : '#fe640b', // Peach
    Mamba: darkMode ? '#cba6f7' : '#8839ef',       // Mauve
    'TTT-Linear': darkMode ? '#89dceb' : '#04a5e5', // Sky
    'TTT-MLP': darkMode ? '#74c7ec' : '#209fb5'     // Sapphire
  };

  const tickColor = darkMode ? '#bac2de' : '#5c5f77'; // Subtext1
  const labelColor = darkMode ? '#cdd6f4' : '#4c4f69'; // Text
  const gridColor = darkMode ? '#313244' : '#ccd0da'; // Surface0

  return (
    <section className="section performance-section">
      <div className="section-card">
        <h2>Performance: Long Context Capability</h2>
        <p className="section-subtitle">Comparing perplexity (lower is better) across different context lengths on the Books3 dataset (1.3B parameter models).</p>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={performanceData.filter(d => d.tokens <= contextLength)}
              margin={{ top: 5, right: 30, left: 0, bottom: 25 }} // Adjusted margins
            >
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis
                dataKey="tokens"
                type="number"
                scale="log"
                domain={[128, 32000]} // Fixed domain for log scale
                ticks={[128, 256, 512, 1000, 2000, 4000, 8000, 16000, 32000]}
                tickFormatter={(value) => value >= 1000 ? `${value/1000}k` : value}
                label={{
                  value: 'Context Length (Tokens, log scale)',
                  position: 'insideBottom',
                  offset: -15, // Adjusted offset
                  fill: labelColor,
                  fontSize: 12
                }}
                stroke={tickColor}
                tick={{ fill: tickColor, fontSize: 11 }}
              />
              <YAxis
                domain={[8.5, 11.5]} // Adjusted domain based on data
                label={{
                  value: 'Perplexity', // Simpler label
                  angle: -90,
                  position: 'insideLeft',
                  offset: 10, // Adjusted offset
                  fill: labelColor,
                  fontSize: 12
                }}
                stroke={tickColor}
                tick={{ fill: tickColor, fontSize: 11 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? 'rgba(30, 30, 46, 0.9)' : 'rgba(239, 241, 245, 0.9)', // Base/Base with alpha
                  color: labelColor,
                  border: `1px solid ${gridColor}`,
                  borderRadius: '4px',
                  fontSize: '12px',
                  padding: '8px'
                }}
                itemStyle={{ color: labelColor }}
                cursor={{ stroke: darkMode ? '#a6adc8' : '#6c6f85', strokeWidth: 1, strokeDasharray: "3 3" }} // Subtext0
              />
              <Legend
                wrapperStyle={{
                  color: labelColor,
                  fontSize: '12px',
                  paddingTop: '10px' // Add space below chart
                }}
                iconSize={10}
              />
              {Object.entries(lineColors).map(([name, color]) => (
                 <Line
                  key={name}
                  type="monotone"
                  dataKey={name}
                  name={name}
                  stroke={color}
                  strokeWidth={2.5} // Slightly thicker lines
                  dot={{ r: 3, fill: color, strokeWidth: 0 }}
                  activeDot={{ r: 5, stroke: darkMode ? '#11111b' : '#dce0e8', strokeWidth: 2 }} // Crust/Crust
                />
              ))}
            </LineChart>
          </ResponsiveContainer>

          <div className="context-slider">
            <label htmlFor="contextRange">Max Context:</label>
            <input
              id="contextRange"
              type="range"
              min={512} // Start slider later for clarity
              max={32000}
              step={128} // Finer steps
              value={contextLength}
              onChange={(e) => setContextLength(Number(e.target.value))}
              className="range-slider"
            />
            <span className="context-value">{contextLength >= 1000 ? `${(contextLength/1000).toFixed(1)}k` : contextLength}</span>
          </div>
        </div>

        <div className="insights-grid">
          <div className="insight-card">
            <h4><span className="icon-inline">✅</span> TTT Advantage</h4>
            <p>Both TTT-Linear and TTT-MLP outperform Mamba beyond 16k context, demonstrating better utilization of long-range information.</p>
          </div>
          <div className="insight-card">
            <h4><span className="icon-inline">📉</span> Continuous Improvement</h4>
            <p>Unlike Mamba, TTT models show continuously decreasing perplexity up to 32k context, similar to Transformers.</p>
          </div>
          <div className="insight-card">
            <h4><span className="icon-inline">⚡</span> Linear Complexity</h4>
            <p>TTT achieves this long-context performance with linear O(n) complexity, making it much more efficient than Transformers (O(n²)) for inference.</p>
          </div>
           <div className="insight-card">
            <h4><span className="icon-inline">🐌</span> TTT-MLP Latency</h4>
            <p>While TTT-MLP shows slightly better perplexity, its update step is more complex, leading to higher latency than TTT-Linear (See Technical Details).</p>
          </div>
        </div>
      </div>
    </section>
  );
};


// Technical Details Section (Refined)
const TechnicalSection = ({ darkMode }) => {
  return (
    <section className="section technical-section">
      <div className="section-card">
        <h2>Technical Details & Optimizations</h2>
        <p className="section-subtitle">Making Test-Time Training efficient on modern hardware.</p>

        <div className="content-grid tech-grid">
          <div className="text-column">
            <div className="tech-explanation">
              <h3>Efficiency Enhancements</h3>

              <div className="tech-card">
                <h4>Mini-Batch TTT (Parallelization)</h4>
                <p>Instead of updating the hidden state W after every single token (Online GD), updates are computed in parallel for a mini-batch of `b` tokens (e.g., b=16) using the state from the *start* of the batch (W<tspan baselineShift="sub">t-β</tspan>). The final state W<tspan baselineShift="sub">t</tspan> is then calculated via a cumulative sum. This significantly improves GPU utilization.</p>
                 <div className="formula-box">
                  <span>Parallel Gradient Calculation:</span>
                  <div className="math-formula">
                    G<tspan baselineShift="sub">i</tspan> = ∇ℓ(W<tspan baselineShift="sub">start</tspan>; x<tspan baselineShift="sub">i</tspan>)   for i in batch
                  </div>
                 </div>
              </div>

              <div className="tech-card">
                <h4>Dual Form Computation (Hardware Acceleration)</h4>
                <p>Avoids explicitly materializing intermediate gradients (G<tspan baselineShift="sub">t</tspan>) and states (W<tspan baselineShift="sub">t</tspan>) within a batch. It reformulates the update and output calculation using highly optimized matrix-matrix multiplications (matmuls), leveraging hardware like TensorCores.</p>
                <div className="formula-box">
                  <span>Simplified Dual Update (Linear Case):</span>
                  <div className="math-formula">
                    W<tspan baselineShift="sub">batch_end</tspan> ≈ W<tspan baselineShift="sub">start</tspan> - η (W<tspan baselineShift="sub">start</tspan>X - X) Xᵀ
                  </div>
                  <small>X contains batch tokens. Outputs Z are also computed via matmuls.</small>
                </div>
                 <p>Result: <strong>~5x faster</strong> training/inference compared to the naive "primal" form.</p>
              </div>
            </div>
          </div>

          <div className="visual-column">
            <div className="optimization-visual">
              <DualFormVisualization darkMode={darkMode} />
               <p className="diagram-caption">Fig: Primal vs. Dual Form. Dual form leverages large matrix operations for efficiency.</p>
            </div>
          </div>
        </div>

        <div className="limitations-section">
          <h3>Limitations & Future Directions</h3>

          <div className="limitations-grid">
            <div className="limitation-card">
              <h4><span className="icon-inline">⏱️</span> Wall-Clock Time</h4>
              <p>TTT-MLP, despite FLOP efficiency, can have higher latency than optimized RNNs like Mamba due to the complexity of the inner-loop update (MLP forward/backward pass per batch).</p>
            </div>
            <div className="limitation-card">
              <h4><span className="icon-inline">💾</span> Memory Bandwidth</h4>
              <p>The dual form relies heavily on matrix operations, which can be memory bandwidth-intensive, potentially bottlenecking performance on some systems.</p>
            </div>
             <div className="limitation-card">
              <h4><span className="icon-inline">🔮</span> Future: Scalability</h4>
              <p>Exploring TTT with even larger hidden state models (e.g., small Transformers) and context lengths (millions of tokens) is a key research direction.</p>
            </div>
            <div className="limitation-card">
              <h4><span className="icon-inline">⚙️</span> Future: Optimizers</h4>
              <p>Integrating more advanced optimizers (e.g., Adam) into the inner loop instead of plain SGD could potentially improve learning quality.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


// Dual Form Visualization (Refined)
const DualFormVisualization = ({ darkMode }) => {
  const [time, setTime] = useState(0);
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const previousTimeRef = useRef(null);

  // Animation loop
  useEffect(() => {
    const animate = (timestamp) => {
      if (previousTimeRef.current === null) previousTimeRef.current = timestamp;
      const deltaTime = timestamp - previousTimeRef.current;
      setTime(prevTime => prevTime + deltaTime * 0.001); // Slower, smoother animation
      previousTimeRef.current = timestamp;
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  // Draw visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Background
    ctx.fillStyle = darkMode ? '#1e1e2e' : '#eff1f5';
    ctx.fillRect(0, 0, width, height);

    // --- Draw Primal Form Side ---
    const primalX = width * 0.25;
    const topY = 50;
    const boxWidth = width * 0.4;
    const boxHeight = 120;

    ctx.fillStyle = darkMode ? '#181825' : '#f1f5f9'; // Mantle / Crust
    ctx.strokeStyle = darkMode ? '#45475a' : '#bcc0cc'; // Surface1
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(primalX - boxWidth / 2, topY, boxWidth, boxHeight, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = darkMode ? '#cdd6f4' : '#4c4f69'; // Text
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Primal Form (Sequential)', primalX, topY + 25);

    // Simulate sequential processing
    const numSteps = 5;
    const stepWidth = boxWidth / (numSteps + 1);
    const stepY = topY + 70;
    const currentStep = Math.floor(time * 1.5) % numSteps;

    for (let i = 0; i < numSteps; i++) {
      const stepX = primalX - boxWidth / 2 + stepWidth * (i + 0.5);
      const isActive = i === currentStep;

      // Step Box
      ctx.beginPath();
      ctx.roundRect(stepX - stepWidth * 0.4, stepY - 15, stepWidth * 0.8, 30, 4);
      ctx.fillStyle = isActive ? (darkMode ? '#f38ba8' : '#e11d48') // Red
                      : (darkMode ? '#45475a' : '#e2e8f0'); // Surface1 / Surface0
      ctx.fill();
      ctx.strokeStyle = darkMode ? '#6c7086' : '#9ca0b0'; // Overlay0
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Step Text (G_t or W_t)
      ctx.fillStyle = isActive ? '#11111b' : (darkMode ? '#a6adc8' : '#6c6f85'); // Crust / Subtext0
      ctx.font = '10px monospace';
      ctx.fillText(i % 2 === 0 ? `∇ℓ(W${i})` : `W${i+1}`, stepX, stepY);

      // Arrow
      if (i < numSteps - 1) {
        const arrowStartX = stepX + stepWidth * 0.4;
        const arrowEndX = arrowStartX + stepWidth * 0.2;
        ctx.beginPath();
        ctx.moveTo(arrowStartX, stepY);
        ctx.lineTo(arrowEndX, stepY);
        ctx.strokeStyle = darkMode ? '#6c7086' : '#9ca0b0'; // Overlay0
        ctx.lineWidth = 1;
        ctx.stroke();
        // Arrowhead
        ctx.beginPath();
        ctx.moveTo(arrowEndX, stepY);
        ctx.lineTo(arrowEndX - 4, stepY - 3);
        ctx.lineTo(arrowEndX - 4, stepY + 3);
        ctx.closePath();
        ctx.fillStyle = darkMode ? '#6c7086' : '#9ca0b0';
        ctx.fill();
      }
    }
    ctx.fillStyle = darkMode ? '#f38ba8' : '#dc2626'; // Red
    ctx.font = '12px sans-serif';
    ctx.fillText('Bottleneck: Sequential Ops', primalX, topY + boxHeight + 20);


    // --- Draw Dual Form Side ---
    const dualX = width * 0.75;

    ctx.fillStyle = darkMode ? '#313244' : '#eff6ff'; // Surface0 / Blue-50
    ctx.strokeStyle = darkMode ? '#89b4fa' : '#1e66f5'; // Blue
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(dualX - boxWidth / 2, topY, boxWidth, boxHeight, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = darkMode ? '#cdd6f4' : '#4c4f69'; // Text
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Dual Form (Parallel Matmuls)', dualX, topY + 25);

    // Simulate matrix operations
    const matrixSizeDual = 40;
    const matrixYDual = topY + 70;
    const matrixSpacing = 50;

    // Input Matrix X
    drawMatrix(ctx, dualX - matrixSpacing * 1.5, matrixYDual, matrixSizeDual, time * 2, darkMode, '#fab387', '#fe640b'); // Peach
    ctx.fillText('X', dualX - matrixSpacing * 1.5, matrixYDual + matrixSizeDual + 10);

    // Weight Matrix W
    drawMatrix(ctx, dualX - matrixSpacing * 0.5, matrixYDual, matrixSizeDual, time * 1.5, darkMode, '#cba6f7', '#8839ef'); // Mauve
    ctx.fillText('W', dualX - matrixSpacing * 0.5, matrixYDual + matrixSizeDual + 10);

    // Output Matrix Z
    drawMatrix(ctx, dualX + matrixSpacing * 0.5, matrixYDual, matrixSizeDual, time * 2.5, darkMode, '#a6e3a1', '#40a02b'); // Green
    ctx.fillText('Z', dualX + matrixSpacing * 0.5, matrixYDual + matrixSizeDual + 10);

    // Operation Symbols
    ctx.font = 'bold 20px sans-serif';
    ctx.fillStyle = darkMode ? '#a6adc8' : '#6c6f85'; // Subtext0
    ctx.fillText('⊗', dualX - matrixSpacing, matrixYDual + matrixSizeDual / 2); // Matmul symbol
    ctx.fillText('=', dualX, matrixYDual + matrixSizeDual / 2);

    ctx.fillStyle = darkMode ? '#a6e3a1' : '#16a34a'; // Green
    ctx.font = '12px sans-serif';
    ctx.fillText('Advantage: Parallel & Hardware Optimized', dualX, topY + boxHeight + 20);

    // --- Connecting Arrow ---
    const arrowStartY = topY + boxHeight / 2;
    const arrowEndY = arrowStartY;
    const arrowStartX = primalX + boxWidth / 2 + 10;
    const arrowEndX = dualX - boxWidth / 2 - 10;
    const controlY = arrowStartY - 40; // Curve control point

    ctx.beginPath();
    ctx.moveTo(arrowStartX, arrowStartY);
    ctx.quadraticCurveTo((arrowStartX + arrowEndX) / 2, controlY, arrowEndX, arrowEndY);
    ctx.strokeStyle = darkMode ? '#94e2d5' : '#179299'; // Teal
    ctx.lineWidth = 2;
    ctx.stroke();

    // Arrowhead for connecting arrow
    const angle = Math.atan2(0, arrowEndX - arrowStartX); // Angle is 0 here
    const arrowSize = 8;
    ctx.beginPath();
    ctx.moveTo(arrowEndX, arrowEndY);
    ctx.lineTo(arrowEndX - arrowSize * Math.cos(angle - Math.PI / 6), arrowEndY - arrowSize * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(arrowEndX - arrowSize * Math.cos(angle + Math.PI / 6), arrowEndY - arrowSize * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fillStyle = darkMode ? '#94e2d5' : '#179299'; // Teal
    ctx.fill();

    ctx.fillStyle = darkMode ? '#94e2d5' : '#179299'; // Teal
    ctx.font = 'italic 12px sans-serif';
    ctx.fillText('Equivalent Result, Faster Execution', width / 2, controlY + 10);


  }, [time, darkMode]);

  // Helper to draw a matrix visualization
  const drawMatrix = (ctx, x, y, size, timeOffset, darkMode, colorDark, colorLight) => {
      const cellSize = size / 4;
      ctx.save();
      ctx.translate(x - size / 2, y - size / 2);
      for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
              const value = Math.sin(timeOffset + i * 0.5 + j * 0.3);
              const alpha = 0.4 + Math.abs(value) * 0.5;
              ctx.fillStyle = darkMode ? `${colorDark}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`
                                       : `${colorLight}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`;
              ctx.fillRect(j * cellSize, i * cellSize, cellSize - 1, cellSize - 1);
          }
      }
      ctx.strokeStyle = darkMode ? colorDark : colorLight;
      ctx.lineWidth = 0.5;
      ctx.strokeRect(0, 0, size, size);
      ctx.restore();
  };


  return (
    <canvas
      ref={canvasRef}
      width={700}
      height={250} // Reduced height
      className="technical-canvas"
    />
  );
};


// Add styles (Completed and Refined)
const styles = `
  /* Base styles with Catppuccin theme */
  :root {
    /* Light theme (Latte) */
    --rosewater-l: #dc8a78; --flamingo-l: #dd7878; --pink-l: #ea76cb; --mauve-l: #8839ef; --red-l: #d20f39; --maroon-l: #e64553; --peach-l: #fe640b; --yellow-l: #df8e1d; --green-l: #40a02b; --teal-l: #179299; --sky-l: #04a5e5; --sapphire-l: #209fb5; --blue-l: #1e66f5; --lavender-l: #7287fd;
    --text-l: #4c4f69; --subtext1-l: #5c5f77; --subtext0-l: #6c6f85; --overlay2-l: #7c7f93; --overlay1-l: #8c8fa1; --overlay0-l: #9ca0b0; --surface2-l: #acb0be; --surface1-l: #bcc0cc; --surface0-l: #ccd0da; --base-l: #eff1f5; --mantle-l: #e6e9ef; --crust-l: #dce0e8;
  }

  .dark-theme {
    /* Dark theme (Mocha) */
    --rosewater-d: #f5e0dc; --flamingo-d: #f2cdcd; --pink-d: #f5c2e7; --mauve-d: #cba6f7; --red-d: #f38ba8; --maroon-d: #eba0ac; --peach-d: #fab387; --yellow-d: #f9e2af; --green-d: #a6e3a1; --teal-d: #94e2d5; --sky-d: #89dceb; --sapphire-d: #74c7ec; --blue-d: #89b4fa; --lavender-d: #b4befe;
    --text-d: #cdd6f4; --subtext1-d: #bac2de; --subtext0-d: #a6adc8; --overlay2-d: #9399b2; --overlay1-d: #7f849c; --overlay0-d: #6c7086; --surface2-d: #585b70; --surface1-d: #45475a; --surface0-d: #313244; --base-d: #1e1e2e; --mantle-d: #181825; --crust-d: #11111b;

    --primary: var(--blue-d); --secondary: var(--mauve-d); --accent: var(--pink-d); --success: var(--green-d); --warning: var(--yellow-d); --danger: var(--red-d);
    --bg: var(--base-d); --bg-alt: var(--mantle-d); --bg-alt2: var(--surface0-d); --border: var(--surface1-d); --shadow: rgba(0, 0, 0, 0.3); --card-bg: var(--mantle-d); --card-border: var(--surface0-d); --text: var(--text-d); --text-subtle: var(--subtext0-d); --text-muted: var(--overlay0-d);
  }

  .light-theme {
    --primary: var(--blue-l); --secondary: var(--mauve-l); --accent: var(--pink-l); --success: var(--green-l); --warning: var(--yellow-l); --danger: var(--red-l);
    --bg: var(--base-l); --bg-alt: var(--mantle-l); --bg-alt2: var(--surface0-l); --border: var(--surface1-l); --shadow: rgba(76, 79, 105, 0.1); --card-bg: #ffffff; --card-border: var(--crust-l); --text: var(--text-l); --text-subtle: var(--subtext0-l); --text-muted: var(--overlay0-l);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.6;
    color: var(--text);
    background-color: var(--bg);
    transition: background-color 0.3s ease, color 0.3s ease;
    font-size: 16px;
  }

  @supports (font-variation-settings: normal) {
    body { font-family: 'InterVariable', sans-serif; }
  }

  .app-container { min-height: 100vh; }

  /* Header */
  .app-header {
    background-color: var(--card-bg);
    border-bottom: 1px solid var(--card-border);
    position: sticky; top: 0; z-index: 1000;
    padding: 0.5rem 1rem;
    box-shadow: 0 1px 3px var(--shadow);
    transition: background-color 0.3s ease, border-color 0.3s ease;
  }
  .header-content { display: flex; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto; }
  .title { font-size: clamp(1rem, 3vw, 1.25rem); font-weight: 600; color: var(--text); }
  .header-controls { display: flex; align-items: center; gap: 0.5rem; }
  .theme-toggle, .mobile-menu-toggle {
    background: none; border: none; color: var(--primary); cursor: pointer; padding: 0.35rem;
    display: flex; align-items: center; justify-content: center; border-radius: 50%;
    transition: background-color 0.2s ease, color 0.2s ease;
  }
  .theme-toggle:hover, .mobile-menu-toggle:hover { background-color: var(--bg-alt); }
  .icon { width: 1.25rem; height: 1.25rem; }
  .icon-inline { display: inline-block; vertical-align: middle; margin-right: 0.25em; font-size: 1.1em; }

  /* Navigation */
  .main-nav { max-width: 1200px; margin: 0.25rem auto 0; }
  .main-nav ul { display: flex; list-style: none; gap: 0.25rem; flex-wrap: wrap; justify-content: center; }
  .main-nav li { position: relative; }
  .main-nav button {
    background: none; border: none; color: var(--text-subtle); cursor: pointer;
    padding: 0.5rem 0.75rem; font-size: 0.9rem; font-weight: 500;
    transition: color 0.2s ease; white-space: nowrap; border-radius: 4px;
  }
  .main-nav li.active button { color: var(--primary); background-color: var(--bg-alt); }
  .main-nav li:not(.active) button:hover { color: var(--primary); background-color: var(--bg-alt); }

  /* Mobile Navigation Specifics */
  .mobile-menu-toggle { display: none; } /* Hidden by default */
  .mobile-nav { display: none; } /* Hidden by default */

  /* Main Content */
  .main-content { max-width: 1200px; margin: 1.5rem auto; padding: 0 1rem; }

  /* Section common styles */
  .section { margin-bottom: 2.5rem; }
  .section-card {
    background-color: var(--card-bg); border-radius: 8px;
    box-shadow: 0 2px 10px var(--shadow); padding: 1.5rem;
    border: 1px solid var(--card-border);
    transition: background-color 0.3s ease, border-color 0.3s ease;
  }
  .section h2 { font-size: clamp(1.4rem, 4vw, 1.75rem); margin-bottom: 0.5rem; font-weight: 600; color: var(--text); }
  .section h3 { font-size: clamp(1.1rem, 3vw, 1.25rem); margin-top: 1.5rem; margin-bottom: 0.75rem; font-weight: 600; color: var(--primary); }
  .section h4 { font-size: 1rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--secondary); }
  .section p { margin-bottom: 1rem; color: var(--text); font-size: 0.95rem; }
  .section-subtitle { color: var(--text-subtle); margin-top: -0.25rem; margin-bottom: 1.5rem; font-size: 1rem; }
  .diagram-caption, .animation-note, .process-note { font-size: 0.8rem; color: var(--text-muted); text-align: center; margin-top: 0.5rem; font-style: italic; }

  /* Grid layouts */
  .content-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
  .features-grid, .insights-grid, .limitations-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 1rem; }
  .feature-card, .insight-card, .limitation-card, .tech-card { background-color: var(--bg-alt); padding: 1rem; border-radius: 6px; border: 1px solid var(--border); }
  .tech-card { margin-bottom: 1rem; }

  /* Intro section */
  .intro-grid { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); align-items: center; }
  .highlight-box { background-color: var(--bg-alt2); border-left: 4px solid var(--primary); padding: 1rem; margin-bottom: 1.5rem; border-radius: 4px; }
  .highlight-box h3 { color: var(--primary); margin-top: 0; }
  .diagram-container { text-align: center; }

  /* Neural section */
  .section-header { background: var(--gradient, linear-gradient(90deg, var(--mauve), var(--lavender))); color: #fff; padding: 1.5rem; border-radius: 8px 8px 0 0; margin: -1.5rem -1.5rem 1.5rem -1.5rem; }
  .dark-theme .section-header { --gradient: linear-gradient(90deg, var(--mauve-d), var(--lavender-d)); }
  .light-theme .section-header { --gradient: linear-gradient(90deg, var(--mauve-l), var(--lavender-l)); }
  .section-header h2 { color: #fff; margin-bottom: 0.25rem; }
  .section-header p { color: rgba(255, 255, 255, 0.85); font-size: 0.9rem; margin-bottom: 0; }
  .controls-row { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; gap: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border); }
  .model-selector span, .speed-label { color: var(--text-subtle); font-size: 0.9rem; font-weight: 500; }
  .button-group { display: flex; border-radius: 6px; overflow: hidden; box-shadow: 0 1px 2px var(--shadow); }
  .button-group button { padding: 0.4rem 0.8rem; border: none; background-color: var(--bg-alt); color: var(--text); cursor: pointer; font-size: 0.85rem; transition: background-color 0.2s ease, color 0.2s ease; border-right: 1px solid var(--border); }
  .button-group button:last-child { border-right: none; }
  .button-group button.active { background-color: var(--primary); color: #fff; }
  .button-group button:not(.active):hover { background-color: var(--bg-alt2); }
  .animation-controls { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
  .control-button { width: 2.25rem; height: 2.25rem; } /* Slightly larger */
  .speed-control { display: flex; align-items: center; gap: 0.5rem; }
  .speed-slider { width: 8rem; height: 4px; background-color: var(--border); border-radius: 2px; appearance: none; outline: none; cursor: pointer; }
  .speed-slider::-webkit-slider-thumb { appearance: none; width: 1rem; height: 1rem; background-color: var(--primary); border-radius: 50%; cursor: pointer; transition: background-color 0.2s ease; }
  .speed-slider::-moz-range-thumb { width: 1rem; height: 1rem; background-color: var(--primary); border-radius: 50%; cursor: pointer; border: none; }
  .speed-value { font-size: 0.85rem; color: var(--text-subtle); min-width: 2.5em; text-align: right; }
  .neural-visualization, .process-visualization, .optimization-visual { width: 100%; margin-bottom: 1rem; display: flex; justify-content: center; }
  .neural-canvas, .process-canvas, .technical-canvas { max-width: 100%; height: auto; border-radius: 6px; border: 1px solid var(--border); background-color: var(--bg); }
  .description-box { background-color: var(--bg-alt); padding: 1rem; border-radius: 6px; color: var(--text); font-size: 0.9rem; border: 1px solid var(--border); }

  /* Process section */
  .process-steps { display: grid; gap: 1rem; margin-top: 1.5rem; }
  .step-card { display: flex; align-items: flex-start; gap: 1rem; background-color: var(--bg-alt); padding: 1rem; border-radius: 6px; border: 1px solid var(--border); }
  .step-number { flex-shrink: 0; width: 2rem; height: 2rem; background-color: var(--primary); color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1rem; }
  .step-content h4 { margin-top: 0.1rem; margin-bottom: 0.25rem; color: var(--primary); font-size: 1rem; }
  .step-content p { font-size: 0.9rem; margin-bottom: 0; color: var(--text-subtle); }
  .math-formula { font-family: 'Latin Modern Math', 'Cambria Math', serif; background-color: var(--bg-alt2); padding: 0.3rem 0.6rem; border-radius: 4px; margin-top: 0.5rem; font-size: 0.9em; overflow-x: auto; white-space: nowrap; border: 1px solid var(--border); }
  .formula-box { margin-top: 0.5rem; }
  .formula-box span { font-size: 0.85rem; color: var(--text-subtle); display: block; margin-bottom: 0.2rem; }
  .formula-box small { font-size: 0.75rem; color: var(--text-muted); display: block; margin-top: 0.2rem; }

  /* Performance Section */
  .chart-container { margin-bottom: 2rem; }
  .chart-description { font-size: 0.9rem; color: var(--text-subtle); text-align: center; margin-bottom: 1rem; }
  .context-slider { display: flex; align-items: center; justify-content: center; gap: 0.75rem; margin-top: 1rem; flex-wrap: wrap; }
  .context-slider label { font-size: 0.9rem; color: var(--text-subtle); }
  .range-slider { width: 15rem; max-width: 60%; height: 4px; background-color: var(--border); border-radius: 2px; appearance: none; outline: none; cursor: pointer; }
  .range-slider::-webkit-slider-thumb { appearance: none; width: 1rem; height: 1rem; background-color: var(--primary); border-radius: 50%; cursor: pointer; }
  .range-slider::-moz-range-thumb { width: 1rem; height: 1rem; background-color: var(--primary); border-radius: 50%; cursor: pointer; border: none; }
  .context-value { font-size: 0.9rem; font-weight: 500; color: var(--primary); min-width: 3.5em; text-align: right; }
  .recharts-tooltip-wrapper { outline: none; } /* Remove focus outline */

  /* Technical Section */
  .tech-grid { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); align-items: flex-start; }
  .limitations-section { margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border); }
  .limitations-section h3 { color: var(--warning); } /* Use warning color */
  .limitation-card h4 { color: var(--warning); }

  /* Responsive Design */
  @media (max-width: 768px) {
    .title { font-size: 1.1rem; }
    .desktop-nav { display: none; } /* Hide desktop nav on mobile */
    .mobile-menu-toggle { display: flex; } /* Show hamburger */
    .mobile-nav {
      display: block;
      position: absolute;
      top: 100%; /* Position below header */
      left: 0;
      right: 0;
      background-color: var(--card-bg);
      border-bottom: 1px solid var(--card-border);
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-out;
      box-shadow: 0 4px 6px var(--shadow);
    }
    .mobile-nav.open { max-height: 500px; /* Or enough height */ }
    .mobile-nav ul { flex-direction: column; padding: 0.5rem 0; gap: 0; }
    .mobile-nav li { width: 100%; }
    .mobile-nav button { width: 100%; text-align: left; padding: 0.75rem 1rem; border-radius: 0; }
    .mobile-nav li.active button { background-color: var(--bg-alt); }

    .main-content { margin-top: 1rem; padding: 0 0.75rem; }
    .section-card { padding: 1rem; }
    .controls-row { flex-direction: column; align-items: stretch; }
    .model-selector, .animation-controls { width: 100%; justify-content: center; }
    .speed-slider { width: 10rem; }
    .range-slider { width: 10rem; }
    .process-steps { grid-template-columns: 1fr; } /* Stack steps */
    .step-card { flex-direction: column; align-items: center; text-align: center; }
    .step-number { margin-bottom: 0.5rem; }
    .tech-grid { grid-template-columns: 1fr; } /* Stack tech details */
    .optimization-visual { order: -1; margin-bottom: 1.5rem; } /* Move visual above text */
  }

  @media (min-width: 769px) {
    .main-nav.desktop-nav { display: block; } /* Show desktop nav */
  }
`;

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// Add Google Font (Inter)
const fontLink = document.createElement('link');
fontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Inter+Variable:wght@400..600&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

export default TTTVisualization;