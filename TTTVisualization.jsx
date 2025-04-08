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


// Add styles - completely redesigned
const styles = `
  :root {
    /* Theme colors */
    --color-primary: #4361ee;
    --color-accent: #f72585;
    --color-success: #06d6a0;
    --color-warning: #ffd166;
    --color-danger: #ef476f;
    
    /* Light theme */
    --light-bg: #ffffff;
    --light-card: #f5f7fa;
    --light-text: #2b2d42;
    --light-text-secondary: #555b6e;
    --light-border: #e5e7eb;
    --light-hover: #f0f4f8;
    --light-muted: #6c757d;
  
    /* Dark theme */
    --dark-bg: #0f172a;
    --dark-card: #1e293b;
    --dark-text: #f8fafc;
    --dark-text-secondary: #cbd5e1;
    --dark-border: #334155;
    --dark-hover: #1e293b;
    --dark-muted: #94a3b8;
  }

  /* Apply theme */
  .light-theme {
    --bg: var(--light-bg);
    --card: var(--light-card);
    --text: var(--light-text);
    --text-secondary: var(--light-text-secondary);
    --border: var(--light-border);
    --hover: var(--light-hover);
    --muted: var(--light-muted);
  }

  .dark-theme {
    --bg: var(--dark-bg);
    --card: var(--dark-card);
    --text: var(--dark-text);
    --text-secondary: var(--dark-text-secondary);
    --border: var(--dark-border);
    --hover: var(--dark-hover);
    --muted: var(--dark-muted);
  }

  /* Base styles */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    line-height: 1.6;
    color: var(--text);
    background-color: var(--bg);
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  /* App container */
  .app-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Header */
  .app-header {
    background-color: var(--card);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
    padding: 0.75rem 1.5rem;
    transition: background-color 0.3s ease;
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1280px;
    margin: 0 auto;
  }

  .app-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text);
  }

  .header-controls {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .theme-toggle, .mobile-menu-toggle {
    background: none;
    border: none;
    color: var(--text);
    cursor: pointer;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.2s ease;
  }

  .theme-toggle:hover, .mobile-menu-toggle:hover {
    background-color: var(--hover);
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }

  /* Navigation */
  .main-nav {
    max-width: 1280px;
    margin: 0.5rem auto 0;
  }

  .main-nav ul {
    display: flex;
    list-style: none;
    gap: 0.5rem;
  }

  .main-nav li {
    position: relative;
  }

  .main-nav button {
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    padding: 0.6rem 1rem;
    font-size: 0.95rem;
    font-weight: 500;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
  }

  .main-nav li.active button {
    color: var(--color-primary);
    background-color: color-mix(in srgb, var(--color-primary) 10%, transparent);
    font-weight: 600;
  }

  .main-nav button:hover {
    background-color: var(--hover);
    color: var(--text);
  }

  /* Mobile menu */
  .mobile-menu-toggle {
    display: none;
  }

  .mobile-nav {
    display: none;
  }

  /* Main content */
  .main-content {
    flex: 1;
    max-width: 1280px;
    margin: 2rem auto;
    padding: 0 1.5rem;
  }

  /* Section common styles */
  .section {
    margin-bottom: 3rem;
  }

  .section-card {
    background-color: var(--card);
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 
                0 10px 15px rgba(0, 0, 0, 0.03);
    padding: 2rem;
    transition: background-color 0.3s ease;
  }

  .section h2 {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: var(--text);
  }

  .section h3 {
    font-size: 1.4rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--text);
  }

  .section h4 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: var(--text);
  }

  .section p {
    margin-bottom: 1.5rem;
    color: var(--text-secondary);
    font-size: 1rem;
    line-height: 1.6;
  }

  .section-subtitle {
    color: var(--text-secondary);
    margin-top: -0.5rem;
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }

  /* Responsive styles */
  @media (max-width: 768px) {
    .app-header {
      padding: 0.75rem 1rem;
    }
    
    .app-title {
      font-size: 1.25rem;
    }
    
    .mobile-menu-toggle {
      display: flex;
    }
    
    .desktop-nav {
      display: none;
    }
    
    .mobile-nav {
      display: block;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background-color: var(--card);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
    }
    
    .mobile-nav.open {
      max-height: 300px;
    }
    
    .mobile-nav ul {
      flex-direction: column;
      gap: 0;
      padding: 0.5rem 0;
    }
    
    .mobile-nav button {
      width: 100%;
      text-align: left;
      padding: 0.75rem 1.5rem;
      border-radius: 0;
    }
    
    .main-content {
      margin: 1.5rem auto;
      padding: 0 1rem;
    }
    
    .section-card {
      padding: 1.5rem;
      border-radius: 0.75rem;
    }
    
    .section h2 {
      font-size: 1.5rem;
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    .main-content {
      padding: 0 2rem;
    }
  }

  /* Content grid layouts */
  .content-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  /* Modern card layouts */
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin: 1.5rem 0;
  }

  .feature-card, .info-card {
    background-color: var(--bg);
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    border: 1px solid var(--border);
  }

  .feature-card:hover, .info-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 640px) {
    .card-grid {
      grid-template-columns: 1fr;
    }
  }

  /* Add more specific component styles here */
`;

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// Add Google Font (Inter)
const fontLink = document.createElement('link');
fontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

export default TTTVisualization;