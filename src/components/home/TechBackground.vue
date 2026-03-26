<template>
  <div class="tech-background">
    <!-- Tech Background Elements -->
    <div class="tech-grid"></div>
    <div class="hexagon-pattern"></div>

    <!-- Circuit Lines -->
    <div class="circuit-line-1"></div>
    <div class="circuit-line-2"></div>
    <div class="circuit-line-3"></div>

    <!-- Glowing Orbs -->
    <div class="glow-orb-1"></div>
    <div class="glow-orb-2"></div>
    <div class="glow-orb-3"></div>

    <!-- Data Flow -->
    <div class="data-flow data-flow-1"></div>
    <div class="data-flow data-flow-2"></div>
    <div class="data-flow data-flow-3"></div>

    <!-- Code Particles -->
    <div class="code-particle particle-1">{ }</div>
    <div class="code-particle particle-2">&lt;/&gt;</div>
    <div class="code-particle particle-3">0101</div>
    <div class="code-particle particle-4">function()</div>

    <!-- Tech Corners -->
    <div class="tech-corner tech-corner-tl"></div>
    <div class="tech-corner tech-corner-tr"></div>
    <div class="tech-corner tech-corner-bl"></div>
    <div class="tech-corner tech-corner-br"></div>

    <!-- Scan Line -->
    <div class="scan-line"></div>

    <!-- Binary Rain -->
    <div class="binary-rain">
      <div class="binary-column" style="left: 10%; animation-delay: 0s;">1010100101</div>
      <div class="binary-column" style="left: 20%; animation-delay: -5s;">0101011010</div>
      <div class="binary-column" style="left: 30%; animation-delay: -10s;">1010101011</div>
      <div class="binary-column" style="left: 40%; animation-delay: -15s;">0101010101</div>
      <div class="binary-column" style="left: 50%; animation-delay: -8s;">1111000010</div>
      <div class="binary-column" style="left: 60%; animation-delay: -12s;">0000111101</div>
      <div class="binary-column" style="left: 70%; animation-delay: -3s;">1010101010</div>
      <div class="binary-column" style="left: 80%; animation-delay: -7s;">0101010101</div>
      <div class="binary-column" style="left: 90%; animation-delay: -18s;">1110001110</div>
    </div>

    <!-- Bottom Fade -->
    <div class="bottom-fade"></div>
  </div>
</template>

<style scoped>
.tech-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
}

/* Tech grid background */
.tech-grid {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    linear-gradient(rgba(56, 189, 248, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(56, 189, 248, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
  background-position: 0 0;
  opacity: 0.4;
}

/* Animated circuit lines */
.circuit-line-1 {
  position: absolute;
  top: 20%;
  left: -10%;
  width: 60%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.6), transparent);
  animation: circuitFlow 8s linear infinite;
}

.circuit-line-2 {
  position: absolute;
  top: 40%;
  right: -10%;
  left: auto;
  width: 50%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), transparent);
  animation: circuitFlowReverse 10s linear infinite;
}

.circuit-line-3 {
  position: absolute;
  bottom: 30%;
  left: -5%;
  width: 70%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.5), transparent);
  animation: circuitFlow 12s linear infinite 2s;
}

/* Glowing orbs */
.glow-orb-1 {
  position: absolute;
  top: -15%;
  right: -10%;
  width: 50vw;
  height: 50vw;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.2) 0%, rgba(6, 182, 212, 0.08) 50%, transparent 70%);
  border-radius: 50%;
  filter: blur(50px);
  animation: techPulse 15s ease-in-out infinite;
}

.glow-orb-2 {
  position: absolute;
  bottom: -20%;
  left: -5%;
  width: 45vw;
  height: 45vw;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.18) 0%, rgba(99, 102, 241, 0.06) 50%, transparent 70%);
  border-radius: 50%;
  filter: blur(45px);
  animation: techPulse 18s ease-in-out infinite reverse;
}

.glow-orb-3 {
  position: absolute;
  top: 50%;
  left: 35%;
  width: 35vw;
  height: 35vw;
  background: radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, rgba(6, 182, 212, 0.04) 50%, transparent 70%);
  border-radius: 50%;
  filter: blur(40px);
  animation: techPulse 20s ease-in-out infinite;
}

/* Floating code particles */
.code-particle {
  position: absolute;
  font-family: 'Fira Code', 'Monaco', monospace;
  font-size: 12px;
  color: rgba(56, 189, 248, 0.3);
  animation: codeFloat 20s ease-in-out infinite;
}

.particle-1 {
  top: 25%;
  left: 15%;
}

.particle-2 {
  top: 35%;
  right: 20%;
  animation-delay: -5s;
}

.particle-3 {
  bottom: 30%;
  left: 25%;
  animation-delay: -10s;
}

.particle-4 {
  top: 60%;
  right: 30%;
  animation-delay: -15s;
}

/* Hexagon pattern */
.hexagon-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'%3E%3Cpath d='M25 0 L50 12.5 L50 37.5 L25 50 L0 37.5 L0 12.5 Z' fill='none' stroke='rgba(56, 189, 248, 0.05)' stroke-width='1'/%3E%3C/svg%3E");
  background-size: 60px 70px;
  opacity: 0.6;
}

/* Data flow lines */
.data-flow {
  position: absolute;
  width: 3px;
  height: 100px;
  background: linear-gradient(180deg, transparent, rgba(56, 189, 248, 0.6), transparent);
  animation: dataFlow 6s ease-in-out infinite;
}

.data-flow-1 {
  top: 15%;
  left: 20%;
}

.data-flow-2 {
  top: 25%;
  right: 25%;
  animation-delay: -2s;
}

.data-flow-3 {
  bottom: 20%;
  left: 30%;
  animation-delay: -4s;
}

/* Tech corner decorations */
.tech-corner {
  position: absolute;
  width: 100px;
  height: 100px;
  border: 2px solid rgba(56, 189, 248, 0.3);
}

.tech-corner-tl {
  top: 5%;
  left: 5%;
  border-right: none;
  border-bottom: none;
}

.tech-corner-tr {
  top: 5%;
  right: 5%;
  border-left: none;
  border-bottom: none;
}

.tech-corner-bl {
  bottom: 5%;
  left: 5%;
  border-right: none;
  border-top: none;
}

.tech-corner-br {
  bottom: 5%;
  right: 5%;
  border-left: none;
  border-top: none;
}

/* Scanning line effect */
.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.4), transparent);
  animation: scanDown 15s linear infinite;
  opacity: 0.5;
}

/* Binary code rain */
.binary-rain {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  opacity: 0.15;
}

.binary-column {
  position: absolute;
  top: -100%;
  font-family: 'Fira Code', monospace;
  font-size: 14px;
  color: rgba(56, 189, 248, 0.6);
  writing-mode: vertical-rl;
  animation: binaryRain 20s linear infinite;
}

/* Bottom gradient fade */
.bottom-fade {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(0deg, var(--bg-primary) 0%, transparent 100%);
}

/* Keyframes - These should be global if used elsewhere, but for now kept here */
@keyframes circuitFlow {
  0% { transform: translateX(-100%); opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { transform: translateX(200%); opacity: 0; }
}

@keyframes circuitFlowReverse {
  0% { transform: translateX(200%); opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { transform: translateX(-100%); opacity: 0; }
}

@keyframes techPulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 0.8; }
}

@keyframes codeFloat {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(10px, -10px); }
  50% { transform: translate(-5px, 15px); }
  75% { transform: translate(-10px, -5px); }
}

@keyframes dataFlow {
  0% { transform: translateY(-100%); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(200%); opacity: 0; }
}

@keyframes scanDown {
  0% { transform: translateY(0); }
  100% { transform: translateY(100vh); }
}

@keyframes binaryRain {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(200%); }
}
</style>
