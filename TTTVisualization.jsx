import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
    document.body.classList.toggle('light-theme', !darkMode);
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
      {/* Modern header with theme toggle */}
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">TTT Visualization</h1>

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
        <div className="intro-header">
          <h2>Learning to (Learn at Test Time)</h2>
          <h3>RNNs with Expressive Hidden States</h3>
        </div>

        <div className="content-grid intro-grid">
          <div className="intro-text">
            <div className="highlight-box">
              <h3>The Core Idea</h3>
              <p><strong>Problem:</strong> Transformers scale quadratically with context length, while traditional RNNs struggle with long contexts due to fixed-size hidden states.</p>
              <p><strong>Solution:</strong> TTT creates RNN-like architectures with <strong>linear complexity</strong> but with <strong>expressive hidden states</strong> that learn during inference.</p>
            </div>

            <div className="card-grid">
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h4>Linear Complexity</h4>
                <p>O(n) scaling like RNNs, making it efficient for processing very long sequences.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🧠</div>
                <h4>Dynamic Hidden State</h4>
                <p>Hidden state is an actual model (W) that learns from the sequence as it processes it.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔄</div>
                <h4>Self-Supervised Update</h4>
                <p>Hidden state updates via gradient descent on a self-supervised task during inference.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📈</div>
                <h4>Long Context Performance</h4>
                <p>Continues improving as context length increases, tested up to 32k+ tokens.</p>
              </div>
            </div>
          </div>

          <div className="intro-visual">
            <ModernTTTDiagram darkMode={darkMode} />
            <p className="diagram-caption">Fig 1: TTT Layer Architecture. The hidden state (W) is updated using the input token (xₜ) and then used to predict the output (zₜ).</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Modern TTT Diagram
const ModernTTTDiagram = ({ darkMode }) => {
  const colors = {
    bg: darkMode ? '#1e293b' : '#f8fafc',
    stroke: darkMode ? '#4361ee' : '#4361ee', // Primary blue
    fill: darkMode ? '#334155' : '#e2e8f0',   // Surface color
    text: darkMode ? '#f8fafc' : '#1e293b',   // Text color
    highlight: darkMode ? '#f72585' : '#f72585', // Accent color
    arrow: darkMode ? '#94a3b8' : '#64748b',   // Muted color
  };

  return (
    <svg width="100%" viewBox="0 0 450 300" className="ttt-diagram">
      {/* Background */}
      <rect x="0" y="0" width="450" height="300" fill={colors.bg} rx="12" />

      {/* Nodes - Modern Style */}
      <g className="input-token" transform="translate(50, 200)">
        <rect x="0" y="0" width="100" height="50" fill={colors.fill} stroke={colors.stroke} strokeWidth="2" rx="8" />
        <text x="50" y="20" textAnchor="middle" fill={colors.text} fontSize="14" fontWeight="bold">Input</text>
        <text x="50" y="40" textAnchor="middle" fill={colors.text} fontSize="14" fontFamily="monospace">xₜ</text>
      </g>

      <g className="hidden-state" transform="translate(50, 50)">
        <rect x="0" y="0" width="100" height="50" fill={colors.fill} stroke={colors.stroke} strokeWidth="2" rx="8" />
        <text x="50" y="20" textAnchor="middle" fill={colors.text} fontSize="14" fontWeight="bold">Hidden State</text>
        <text x="50" y="40" textAnchor="middle" fill={colors.text} fontSize="14" fontFamily="monospace">Wₜ</text>
      </g>

      <g className="prev-hidden-state" transform="translate(50, 125)">
        <rect x="0" y="0" width="100" height="50" fill={colors.fill} stroke={colors.stroke} strokeWidth="1.5" rx="8" strokeDasharray="3 3"/>
        <text x="50" y="20" textAnchor="middle" fill={colors.text} fontSize="14" fontWeight="bold">Prev State</text>
        <text x="50" y="40" textAnchor="middle" fill={colors.text} fontSize="14" fontFamily="monospace">Wₜ₋₁</text>
      </g>

      <g className="update-rule" transform="translate(200, 125)">
        <rect x="0" y="0" width="150" height="50" fill={colors.fill} stroke={colors.highlight} strokeWidth="2" rx="8" />
        <text x="75" y="20" textAnchor="middle" fill={colors.text} fontSize="14" fontWeight="bold">Update Rule</text>
        <text x="75" y="40" textAnchor="middle" fill={colors.text} fontSize="12" fontFamily="monospace">Wₜ = Wₜ₋₁ - η∇ℓ(Wₜ₋₁; xₜ)</text>
      </g>

      <g className="output-rule" transform="translate(200, 50)">
        <rect x="0" y="0" width="150" height="50" fill={colors.fill} stroke={colors.stroke} strokeWidth="2" rx="8" />
        <text x="75" y="20" textAnchor="middle" fill={colors.text} fontSize="14" fontWeight="bold">Output Rule</text>
        <text x="75" y="40" textAnchor="middle" fill={colors.text} fontSize="12" fontFamily="monospace">zₜ = f(xₜ; Wₜ)</text>
      </g>

      <g className="output-token" transform="translate(380, 50)">
        <rect x="0" y="0" width="70" height="50" fill={colors.fill} stroke={colors.stroke} strokeWidth="2" rx="8" />
        <text x="35" y="20" textAnchor="middle" fill={colors.text} fontSize="14" fontWeight="bold">Output</text>
        <text x="35" y="40" textAnchor="middle" fill={colors.text} fontSize="14" fontFamily="monospace">zₜ</text>
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


// TTT Process Section (Redesigned)
const TTTProcessSection = ({ darkMode }) => {
  return (
    <section className="section process-section">
      <div className="section-card">
        <h2>The Test-Time Training Process</h2>
        <p className="section-subtitle">How the hidden state learns from the sequence during inference</p>

        <div className="process-flow">
          <SimplifiedProcessVisualization darkMode={darkMode} />
        </div>

        <div className="process-steps">
          <h3>Key Steps in the TTT Loop</h3>
          
          <div className="steps-container">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Receive Input Token</h4>
                <p>The current token xₜ in the sequence arrives at the TTT layer.</p>
              </div>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Compute Self-Supervised Loss</h4>
                <p>Calculate a loss based on how well the current hidden state Wₜ₋₁ performs on the input token (e.g., reconstruction loss).</p>
              </div>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Calculate Gradient</h4>
                <p>Compute the gradient of the loss with respect to the previous hidden state: ∇ℓ(Wₜ₋₁; xₜ).</p>
              </div>
            </div>

            <div className="step-card">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Update Hidden State</h4>
                <p>Apply a gradient descent step to update the hidden state: Wₜ = Wₜ₋₁ - η∇ℓ</p>
              </div>
            </div>

            <div className="step-card">
              <div className="step-number">5</div>
              <div className="step-content">
                <h4>Generate Output</h4>
                <p>Use the updated hidden state Wₜ with input xₜ to produce the output zₜ = f(xₜ; Wₜ).</p>
              </div>
            </div>
          </div>
        </div>

        <div className="process-summary">
          <h3>The TTT Advantage</h3>
          <div className="card-grid">
            <div className="info-card">
              <h4>📈 Continuous Learning</h4>
              <p>TTT's hidden state is a model itself that keeps learning during inference, adapting to the specific content in the sequence.</p>
            </div>
            <div className="info-card">
              <h4>⚡ Linear Complexity</h4>
              <p>Unlike Transformer's quadratic complexity, TTT scales linearly with sequence length, making it efficient for long contexts.</p>
            </div>
            <div className="info-card">
              <h4>🔄 Self-Supervision</h4>
              <p>The hidden state updates using a self-supervised task (no external labels needed), learning patterns directly from the data.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Simplified Process Visualization Component
const SimplifiedProcessVisualization = ({ darkMode }) => {
  const canvasRef = useRef(null);
  const [time, setTime] = useState(0);
  const requestRef = useRef(null);
  const previousTimeRef = useRef(null);

  // Animation loop
  useEffect(() => {
    const animate = (timestamp) => {
      if (previousTimeRef.current === null) {
        previousTimeRef.current = timestamp;
      }
      const deltaTime = timestamp - previousTimeRef.current;
      setTime(prevTime => prevTime + deltaTime * 0.001);
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

    // Colors based on theme
    const colors = {
      bg: darkMode ? '#1e293b' : '#f8fafc',
      primary: '#4361ee',
      secondary: darkMode ? '#f8fafc' : '#1e293b',
      accent: '#f72585',
      highlight: '#06d6a0',
      muted: darkMode ? '#94a3b8' : '#64748b',
    };

    // Fill background
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, width, height);

    // Define elements
    const tokenRadius = 25;
    const hiddenStateWidth = 100;
    const hiddenStateHeight = 80;
    const outputRadius = 25;

    // Positions
    const centerY = height / 2;
    const tokenX = 80;
    const hiddenStateX = width / 2;
    const outputX = width - 80;

    // Animation state based on time
    const cycleTime = 5; // seconds per cycle
    const normalizedTime = (time % cycleTime) / cycleTime;
    
    // Animated highlights based on cycle stage
    const stage = Math.floor(normalizedTime * 5); // 5 stages in the process
    const stageProgress = (normalizedTime * 5) % 1; // Progress within current stage (0-1)

    // 1. Draw connecting arrows with flow animation
    // Token to hidden state
    const arrowOffset = 20 * Math.sin(time * 2) * (stage === 0 ? 1 : 0.3);
    
    ctx.beginPath();
    ctx.moveTo(tokenX + tokenRadius, centerY);
    ctx.lineTo(hiddenStateX - hiddenStateWidth/2, centerY + arrowOffset);
    ctx.strokeStyle = stage === 0 ? colors.accent : colors.muted;
    ctx.lineWidth = stage === 0 ? 3 : 2;
    ctx.stroke();
    
    // Hidden state to output
    const outputArrowOffset = 20 * Math.sin(time * 2) * (stage === 4 ? 1 : 0.3);
    
    ctx.beginPath();
    ctx.moveTo(hiddenStateX + hiddenStateWidth/2, centerY + outputArrowOffset);
    ctx.lineTo(outputX - outputRadius, centerY);
    ctx.strokeStyle = stage === 4 ? colors.highlight : colors.muted;
    ctx.lineWidth = stage === 4 ? 3 : 2;
    ctx.stroke();

    // 2. Draw hidden state (with update effect)
    ctx.save();
    // Apply subtle "update" effect during stages 2-3
    if (stage >= 2 && stage <= 3) {
      const shakeAmount = 2 * Math.sin(time * 20) * stageProgress;
      ctx.translate(shakeAmount, shakeAmount);
    }
    
    // Hidden state background
    ctx.fillStyle = colors.bg;
    ctx.strokeStyle = stage >= 2 && stage <= 3 ? colors.accent : colors.primary;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(
      hiddenStateX - hiddenStateWidth/2, 
      centerY - hiddenStateHeight/2, 
      hiddenStateWidth, 
      hiddenStateHeight, 
      10
    );
    ctx.fill();
    ctx.stroke();
    
    // Matrix visualization inside hidden state
    const matrixSize = 4;
    const cellSize = Math.min(hiddenStateWidth, hiddenStateHeight) * 0.6 / matrixSize;
    const matrixStartX = hiddenStateX - (cellSize * matrixSize) / 2;
    const matrixStartY = centerY - (cellSize * matrixSize) / 2;
    
    for (let i = 0; i < matrixSize; i++) {
      for (let j = 0; j < matrixSize; j++) {
        // Matrix values that change during update (stages 2-3)
        let cellValue;
        if (stage >= 2 && stage <= 3) {
          cellValue = Math.sin(time * 3 + i * 0.7 + j * 0.5) * stageProgress;
        } else {
          cellValue = Math.sin(time * 0.5 + i * 0.7 + j * 0.5) * 0.5;
        }
        
        const colorIntensity = Math.abs(cellValue);
        const x = matrixStartX + j * cellSize;
        const y = matrixStartY + i * cellSize;
        
        ctx.fillStyle = cellValue > 0 
          ? `rgba(67, 97, 238, ${0.3 + colorIntensity * 0.7})` // Blue for positive
          : `rgba(247, 37, 133, ${0.3 + colorIntensity * 0.7})`; // Pink for negative
          
        ctx.fillRect(x, y, cellSize - 1, cellSize - 1);
      }
    }
    
    // Hidden state label
    ctx.fillStyle = colors.secondary;
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Hidden State (W)', hiddenStateX, centerY - hiddenStateHeight/2 - 10);
    ctx.restore();

    // 3. Draw input token
    ctx.beginPath();
    ctx.arc(tokenX, centerY, tokenRadius, 0, Math.PI * 2);
    ctx.fillStyle = stage === 0 ? 'rgba(247, 37, 133, 0.7)' : 'rgba(247, 37, 133, 0.4)';
    ctx.fill();
    ctx.strokeStyle = colors.accent;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Token label
    ctx.fillStyle = colors.secondary;
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Input Token', tokenX, centerY - tokenRadius - 10);
    ctx.font = 'bold 18px monospace';
    ctx.fillText('xₜ', tokenX, centerY + 5);

    // 4. Draw output token
    ctx.beginPath();
    ctx.arc(outputX, centerY, outputRadius, 0, Math.PI * 2);
    ctx.fillStyle = stage === 4 ? 'rgba(6, 214, 160, 0.7)' : 'rgba(6, 214, 160, 0.4)';
    ctx.fill();
    ctx.strokeStyle = colors.highlight;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Output label
    ctx.fillStyle = colors.secondary;
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Output', outputX, centerY - outputRadius - 10);
    ctx.font = 'bold 18px monospace';
    ctx.fillText('zₜ', outputX, centerY + 5);

    // 5. Draw gradient calculation (visible only in stages 1-2)
    if (stage === 1 || stage === 2) {
      const gradX = (hiddenStateX + tokenX) / 2;
      const gradY = centerY + 60;
      const gradSize = 40 + 10 * Math.sin(time * 4) * stageProgress;
      
      ctx.fillStyle = 'rgba(247, 37, 133, 0.15)';
      ctx.beginPath();
      ctx.arc(gradX, gradY, gradSize, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = colors.accent;
      ctx.font = `bold ${16 + 4 * stageProgress}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('∇ℓ', gradX, gradY + 6);
      
      // Connecting line to hidden state
      ctx.beginPath();
      ctx.moveTo(gradX, gradY - gradSize * 0.7);
      ctx.lineTo(hiddenStateX, centerY + hiddenStateHeight/2 - 10);
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // 6. Stage indicator
    ctx.fillStyle = colors.secondary;
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    const stageTexts = [
      "1. Process Input Token",
      "2. Calculate Loss & Gradient",
      "3. Update Hidden State Weights",
      "4. Apply Updated Weights",
      "5. Generate Output"
    ];
    ctx.fillText(stageTexts[stage], width / 2, height - 20);

  }, [time, darkMode]);

  return (
    <div className="process-visualization">
      <canvas 
        ref={canvasRef}
        width={700}
        height={260}
        className="process-canvas"
      />
    </div>
  );
};

// Add these styles to the existing styles:
const processStyles = `
  .process-visualization {
    display: flex;
    justify-content: center;
    margin: 2rem 0;
  }

  .process-canvas {
    max-width: 100%;
    height: auto;
    border-radius: 1rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }

  .steps-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    margin: 1.5rem 0;
  }

  .step-card {
    display: flex;
    align-items: flex-start;
    background-color: var(--bg);
    border-radius: 0.75rem;
    padding: 1.25rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border: 1px solid var(--border);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  .step-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  }

  .step-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    background-color: var(--color-primary);
    color: white;
    border-radius: 50%;
    font-weight: 600;
    font-size: 1.2rem;
    margin-right: 1rem;
    flex-shrink: 0;
  }

  .step-content {
    flex: 1;
  }

  .step-content h4 {
    margin-top: 0.2rem;
    margin-bottom: 0.5rem;
    color: var(--text);
  }

  .step-content p {
    color: var(--text-secondary);
    margin-bottom: 0;
    font-size: 0.95rem;
  }

  .process-summary {
    margin-top: 3rem;
  }

  @media (min-width: 768px) {
    .steps-container {
      grid-template-columns: 1fr 1fr;
    }
    
    .steps-container > div:last-child:nth-child(odd) {
      grid-column: 1 / 3;
    }
  }

  @media (max-width: 640px) {
    .process-canvas {
      height: 220px;
    }
    
    .step-card {
      padding: 1rem;
    }
    
    .step-number {
      width: 2rem;
      height: 2rem;
      font-size: 1rem;
      margin-right: 0.75rem;
    }
  }
`;

// Append process styles to main styles
document.querySelector('style').textContent += processStyles;

// ... rest of existing code ...

// Performance Section (Redesigned)
const PerformanceSection = ({ darkMode }) => {
  const [contextLength, setContextLength] = useState(4096);
  const maxContext = 32768;

  const handleContextChange = (e) => {
    setContextLength(Number(e.target.value));
  };

  // Generate performance data based on context length
  const generatePerformanceData = useCallback(() => {
    // Simulation of performance data
    const baseTransformerPerf = 75;
    const baseTTTPerf = 65;
    
    return Array.from({ length: 6 }, (_, i) => {
      const ctxLength = Math.pow(2, i + 10); // 1k, 2k, 4k, 8k, 16k, 32k
      
      // Simulated accuracy metrics
      const transformerAcc = baseTransformerPerf + 5 * Math.log2(ctxLength / 1024) - 0.5 * Math.log2(ctxLength / 8192);
      const tttAcc = baseTTTPerf + 8 * Math.log2(ctxLength / 1024); // TTT benefits more from context
      
      // Simulated latency metrics (higher is worse)
      const transformerLatency = Math.pow(ctxLength / 1024, 1.9); // Quadratic growth
      const tttLatency = (ctxLength / 1024) * 5; // Linear growth
      
      return {
        contextLength: ctxLength,
        contextLengthLabel: `${(ctxLength / 1024).toFixed(0)}K`,
        transformerAccuracy: Math.min(100, transformerAcc).toFixed(1),
        tttAccuracy: Math.min(100, tttAcc).toFixed(1),
        transformerLatency: transformerLatency.toFixed(0),
        tttLatency: tttLatency.toFixed(0),
      };
    });
  }, []);

  const performanceData = useMemo(() => generatePerformanceData(), [generatePerformanceData]);

  // Filtered data based on selected context length
  const filteredData = useMemo(() => {
    return performanceData.filter(item => item.contextLength <= contextLength);
  }, [performanceData, contextLength]);

  return (
    <section className="section performance-section">
      <div className="section-card">
        <h2>Performance Analysis</h2>
        <p className="section-subtitle">How TTT scales with increasing context length compared to Transformers</p>
        
        <div className="performance-controls">
          <label htmlFor="context-slider" className="control-label">
            Context Length (up to {maxContext / 1024}K tokens)
          </label>
          <div className="context-slider-container">
            <input
              id="context-slider"
              type="range"
              min="1024"
              max={maxContext}
              step="1024"
              value={contextLength}
              onChange={handleContextChange}
              className="range-slider"
            />
            <span className="context-value">{(contextLength / 1024).toFixed(0)}K</span>
          </div>
        </div>

        <div className="performance-metrics">
          <div className="metric-card">
            <div className="metric-header">
              <h3>Accuracy</h3>
              <div className="metric-legend">
                <div className="legend-item">
                  <span className="legend-marker transformer"></span>
                  <span>Transformer</span>
                </div>
                <div className="legend-item">
                  <span className="legend-marker ttt"></span>
                  <span>TTT</span>
                </div>
              </div>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={filteredData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#334155" : "#e2e8f0"} />
                  <XAxis 
                    dataKey="contextLengthLabel" 
                    stroke={darkMode ? "#94a3b8" : "#64748b"}
                    tick={{ fontSize: 12 }}
                    label={{ 
                      value: 'Context Length', 
                      position: 'insideBottom', 
                      offset: -10,
                      fill: darkMode ? "#cbd5e1" : "#4b5563",
                      fontSize: 12
                    }}
                  />
                  <YAxis 
                    stroke={darkMode ? "#94a3b8" : "#64748b"}
                    tick={{ fontSize: 12 }}
                    domain={[60, 100]}
                    label={{ 
                      value: 'Accuracy (%)', 
                      angle: -90, 
                      position: 'insideLeft',
                      fill: darkMode ? "#cbd5e1" : "#4b5563",
                      fontSize: 12
                    }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: darkMode ? "#1e293b" : "#ffffff",
                      borderColor: darkMode ? "#334155" : "#e2e8f0",
                      color: darkMode ? "#f8fafc" : "#1e293b"
                    }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Line
                    type="monotone"
                    dataKey="transformerAccuracy"
                    name="Transformer"
                    stroke={darkMode ? "#a78bfa" : "#7c3aed"}
                    strokeWidth={2}
                    activeDot={{ r: 7 }}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="tttAccuracy"
                    name="TTT"
                    stroke={darkMode ? "#4ade80" : "#10b981"}
                    strokeWidth={2}
                    activeDot={{ r: 7 }}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <h3>Latency</h3>
              <div className="metric-legend">
                <div className="legend-item">
                  <span className="legend-marker transformer"></span>
                  <span>Transformer</span>
                </div>
                <div className="legend-item">
                  <span className="legend-marker ttt"></span>
                  <span>TTT</span>
                </div>
              </div>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={filteredData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#334155" : "#e2e8f0"} />
                  <XAxis 
                    dataKey="contextLengthLabel" 
                    stroke={darkMode ? "#94a3b8" : "#64748b"}
                    tick={{ fontSize: 12 }}
                    label={{ 
                      value: 'Context Length', 
                      position: 'insideBottom', 
                      offset: -10,
                      fill: darkMode ? "#cbd5e1" : "#4b5563",
                      fontSize: 12
                    }}
                  />
                  <YAxis 
                    stroke={darkMode ? "#94a3b8" : "#64748b"}
                    tick={{ fontSize: 12 }}
                    label={{ 
                      value: 'Relative Latency', 
                      angle: -90, 
                      position: 'insideLeft',
                      fill: darkMode ? "#cbd5e1" : "#4b5563",
                      fontSize: 12
                    }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: darkMode ? "#1e293b" : "#ffffff",
                      borderColor: darkMode ? "#334155" : "#e2e8f0",
                      color: darkMode ? "#f8fafc" : "#1e293b"
                    }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Line
                    type="monotone"
                    dataKey="transformerLatency"
                    name="Transformer"
                    stroke={darkMode ? "#a78bfa" : "#7c3aed"}
                    strokeWidth={2}
                    activeDot={{ r: 7 }}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="tttLatency"
                    name="TTT"
                    stroke={darkMode ? "#4ade80" : "#10b981"}
                    strokeWidth={2}
                    activeDot={{ r: 7 }}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="performance-insights">
          <h3>Key Insights</h3>
          <div className="card-grid">
            <div className="info-card">
              <h4>Scaling Efficiency</h4>
              <p>TTT scales <strong>linearly</strong> with context length (O(n)), while Transformers scale <strong>quadratically</strong> (O(n²)), making TTT significantly more efficient for longer contexts.</p>
            </div>
            <div className="info-card">
              <h4>Accuracy Growth</h4>
              <p>TTT's accuracy continues to improve with longer contexts, eventually outperforming Transformers as context length increases beyond 8K tokens.</p>
            </div>
            <div className="info-card">
              <h4>Memory Usage</h4>
              <p>TTT uses a constant amount of memory regardless of context length, while Transformers' memory usage grows quadratically with sequence length.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Add performance section styles
const performanceStyles = `
  .performance-controls {
    margin-bottom: 2rem;
  }

  .control-label {
    display: block;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 0.5rem;
  }

  .context-slider-container {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .range-slider {
    flex: 1;
    height: 6px;
    appearance: none;
    background-color: var(--border);
    border-radius: 3px;
    outline: none;
  }

  .range-slider::-webkit-slider-thumb {
    appearance: none;
    width: 18px;
    height: 18px;
    background-color: var(--color-primary);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition: background-color 0.2s;
  }

  .range-slider::-webkit-slider-thumb:hover {
    background-color: var(--color-accent);
  }

  .range-slider::-moz-range-thumb {
    width: 18px;
    height: 18px;
    background-color: var(--color-primary);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition: background-color 0.2s;
  }

  .range-slider::-moz-range-thumb:hover {
    background-color: var(--color-accent);
  }

  .context-value {
    font-weight: 600;
    color: var(--color-primary);
    min-width: 3.5rem;
    text-align: center;
    padding: 0.25rem 0.75rem;
    background-color: color-mix(in srgb, var(--color-primary) 15%, transparent);
    border-radius: 1rem;
  }

  .performance-metrics {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 2.5rem;
  }

  .metric-card {
    background-color: var(--bg);
    border-radius: 0.75rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border: 1px solid var(--border);
    padding: 1.5rem;
  }

  .metric-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .metric-header h3 {
    margin: 0;
    font-size: 1.2rem;
  }

  .metric-legend {
    display: flex;
    gap: 1rem;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: var(--text-secondary);
  }

  .legend-marker {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }

  .legend-marker.transformer {
    background-color: #7c3aed;
  }

  .legend-marker.ttt {
    background-color: #10b981;
  }

  .chart-container {
    width: 100%;
    height: 300px;
  }

  .performance-insights {
    margin-top: 2.5rem;
  }

  .performance-insights h3 {
    margin-bottom: 1.5rem;
  }

  @media (min-width: 768px) {
    .performance-metrics {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 640px) {
    .metric-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.75rem;
    }
    
    .chart-container {
      height: 250px;
    }
  }
`;

// Append performance styles to main styles
document.querySelector('style').textContent += performanceStyles;

// Technical Details Section 
const TechnicalSection = ({ darkMode }) => {
  return (
    <section className="section technical-section">
      <div className="section-card">
        <h2>Technical Deep Dive</h2>
        <p className="section-subtitle">Understanding the implementation and theoretical foundations of TTT</p>

        <div className="technical-grid">
          <div className="technical-content">
            <div className="tech-card architecture-card">
              <h3>Architecture Comparison</h3>
              
              <div className="comparison-table-container">
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th>Model Type</th>
                      <th>Hidden State</th>
                      <th>Complexity</th>
                      <th>Memory Usage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>RNN</td>
                      <td>Fixed vector</td>
                      <td>O(n)</td>
                      <td>Constant</td>
                    </tr>
                    <tr>
                      <td>Transformer</td>
                      <td>Full history (KV cache)</td>
                      <td>O(n²)</td>
                      <td>O(n)</td>
                    </tr>
                    <tr className="highlight-row">
                      <td>TTT</td>
                      <td>Learnable model</td>
                      <td>O(n)</td>
                      <td>Constant</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="tech-card formula-card">
              <h3>Mathematical Foundation</h3>
              
              <div className="formula-container">
                <div className="formula-box">
                  <div className="formula-label">Update Rule</div>
                  <div className="formula">Wₜ = Wₜ₋₁ - η∇ℓ(Wₜ₋₁; xₜ)</div>
                  <div className="formula-description">
                    The hidden state W is updated using gradient descent on a self-supervised loss ℓ computed on the current token xₜ.
                  </div>
                </div>
                
                <div className="formula-box">
                  <div className="formula-label">Self-Supervised Task</div>
                  <div className="formula">ℓ(W; x) = L(f(mask(x); W), unmask(x))</div>
                  <div className="formula-description">
                    A common approach is masked prediction: use part of the token to predict the masked part.
                  </div>
                </div>
                
                <div className="formula-box">
                  <div className="formula-label">Output Generation</div>
                  <div className="formula">zₜ = f(xₜ; Wₜ)</div>
                  <div className="formula-description">
                    The output is computed using the updated hidden state and the current input token.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="tech-card implementations-card">
            <h3>Implementation Variants</h3>
            
            <div className="variant-list">
              <div className="variant-item">
                <div className="variant-header">
                  <h4>TTT-Linear</h4>
                  <span className="variant-tag">Faster</span>
                </div>
                <p>Hidden state is a linear layer (matrix W and bias b) updated via gradient descent. Simpler update leads to lower latency.</p>
                <pre className="code-snippet">
                  <code>W = W - lr * grad_W</code>
                  <code>b = b - lr * grad_b</code>
                </pre>
              </div>
              
              <div className="variant-item">
                <div className="variant-header">
                  <h4>TTT-MLP</h4>
                  <span className="variant-tag">More Expressive</span>
                </div>
                <p>Hidden state is a multi-layer perceptron with non-linearities. More expressive but with higher computational cost.</p>
                <pre className="code-snippet">
                  <code>for layer in mlp.layers:</code>
                  <code>  layer.W = layer.W - lr * grad(layer.W)</code>
                  <code>  layer.b = layer.b - lr * grad(layer.b)</code>
                </pre>
              </div>
              
              <div className="variant-item">
                <div className="variant-header">
                  <h4>TTT-Online</h4>
                  <span className="variant-tag">Experimental</span>
                </div>
                <p>Continuously update not just W but also the encoder and decoder during inference, adapting to domain shifts.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="limitations-section">
          <h3>Limitations & Future Work</h3>
          <div className="card-grid">
            <div className="info-card limitation-card">
              <h4>Initialization Sensitivity</h4>
              <p>The system's performance is sensitive to initial hidden state values. Poor initialization can lead to slow convergence.</p>
            </div>
            <div className="info-card limitation-card">
              <h4>Additional Latency</h4>
              <p>While computational complexity is lower, the gradient computation adds some latency compared to traditional RNNs.</p>
            </div>
            <div className="info-card limitation-card">
              <h4>Self-Supervised Task Design</h4>
              <p>Performance heavily depends on the design of the self-supervised task, which may require domain expertise.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Add technical section styles
const technicalStyles = `
  .technical-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .tech-card {
    background-color: var(--bg);
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border: 1px solid var(--border);
  }

  .tech-card h3 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-size: 1.4rem;
  }

  .comparison-table-container {
    overflow-x: auto;
    margin-bottom: 1rem;
  }

  .comparison-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
  }

  .comparison-table th, .comparison-table td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid var(--border);
  }

  .comparison-table th {
    font-weight: 600;
    color: var(--text);
    background-color: var(--card);
  }

  .comparison-table td {
    color: var(--text-secondary);
  }

  .comparison-table .highlight-row {
    background-color: color-mix(in srgb, var(--color-primary) 8%, transparent);
  }

  .comparison-table .highlight-row td {
    color: var(--text);
    font-weight: 500;
  }

  .formula-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .formula-box {
    border-left: 3px solid var(--color-primary);
    padding-left: 1rem;
  }

  .formula-label {
    font-weight: 600;
    color: var(--text);
    margin-bottom: 0.5rem;
  }

  .formula {
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    padding: 0.75rem 1rem;
    background-color: var(--card);
    border-radius: 0.5rem;
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
    overflow-x: auto;
    white-space: nowrap;
  }

  .formula-description {
    color: var(--text-secondary);
    font-size: 0.95rem;
  }

  .variant-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .variant-item {
    border-bottom: 1px solid var(--border);
    padding-bottom: 1.5rem;
  }

  .variant-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .variant-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
  }

  .variant-header h4 {
    margin: 0;
  }

  .variant-tag {
    padding: 0.25rem 0.75rem;
    background-color: var(--card);
    border-radius: 1rem;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--text-secondary);
  }

  .code-snippet {
    background-color: var(--card);
    border-radius: 0.5rem;
    padding: 1rem;
    margin-top: 1rem;
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-size: 0.9rem;
    overflow-x: auto;
  }

  .code-snippet code {
    display: block;
    color: var(--text);
    line-height: 1.5;
  }

  .limitations-section {
    margin-top: 3rem;
  }

  .limitation-card {
    border-left: 3px solid var(--color-warning);
  }

  .limitations-section h3 {
    margin-bottom: 1.5rem;
  }

  @media (min-width: 768px) {
    .technical-grid {
      grid-template-columns: 1.5fr 1fr;
    }
  }

  @media (max-width: 640px) {
    .formula {
      font-size: 0.9rem;
      padding: 0.6rem 0.8rem;
    }
    
    .comparison-table th, .comparison-table td {
      padding: 0.6rem 0.75rem;
      font-size: 0.85rem;
    }
  }
`;

// Append technical styles to main styles
document.querySelector('style').textContent += technicalStyles;

// Add Google Font for code
const codeFont = document.createElement('link');
codeFont.href = "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap";
codeFont.rel = "stylesheet";
document.head.appendChild(codeFont);

export default TTTVisualization;