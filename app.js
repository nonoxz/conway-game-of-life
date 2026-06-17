const canvas = document.querySelector("#lifeCanvas");
const ctx = canvas.getContext("2d");
const heroCanvas = document.querySelector("#heroCanvas");
const heroCtx = heroCanvas.getContext("2d");

const controls = {
  languageSelect: document.querySelector("#languageSelect"),
  toggleRun: document.querySelector("#toggleRun"),
  step: document.querySelector("#step"),
  randomize: document.querySelector("#randomize"),
  clear: document.querySelector("#clear"),
  patternSelect: document.querySelector("#patternSelect"),
  loadPattern: document.querySelector("#loadPattern"),
  speed: document.querySelector("#speed"),
  density: document.querySelector("#density"),
  cellSize: document.querySelector("#cellSize"),
  generationCount: document.querySelector("#generationCount"),
  liveCount: document.querySelector("#liveCount"),
  densityCount: document.querySelector("#densityCount"),
};

const translations = {
  en: {
    title: "Conway's Game of Life",
    metaDescription: "Interactive Conway's Game of Life simulator with rules, history, and research links.",
    navAria: "Main navigation",
    brandAria: "Go to simulator",
    navRules: "Rules",
    navHistory: "History",
    navStudies: "Studies",
    languageLabel: "Language",
    heroEyebrow: "Cellular automaton · B3/S23",
    heroTitle: "Conway's Game of Life",
    heroCopy: "A universe of cells that are born, survive, or disappear by following four simple rules. You define the initial seed; the system does the rest.",
    heroCta: "Open simulator",
    simEyebrow: "Explore emergent patterns",
    simTitle: "Interactive simulator",
    controlsAria: "Simulator controls",
    controlsTitle: "Controls",
    start: "Start",
    pause: "Pause",
    step: "Step",
    randomize: "Random",
    clear: "Clear",
    patternLabel: "Initial pattern",
    patternGlider: "Glider",
    patternBlinker: "Blinker",
    patternRPentomino: "R-pentomino",
    patternGosper: "Gosper glider gun",
    loadPattern: "Load pattern",
    speedLabel: "Speed",
    densityLabel: "Random density",
    cellSizeLabel: "Cell size",
    cellCompact: "Compact",
    cellMedium: "Medium",
    cellLarge: "Large",
    statsAria: "Statistics",
    generation: "Generation",
    liveCells: "Live cells",
    densityStat: "Density",
    boardAria: "Game of Life board",
    rulesEyebrow: "Core idea",
    rulesTitle: "What is it about?",
    rulesCopy: "The Game of Life has no objective, score, or opponents. It is a zero-player game: once the initial state is set, each generation is calculated automatically from neighboring cells.",
    ruleOne: "A live cell with fewer than two live neighbors dies by isolation.",
    ruleTwo: "A live cell with two or three live neighbors survives.",
    ruleThree: "A live cell with more than three live neighbors dies by overcrowding.",
    ruleFour: "A dead cell with exactly three live neighbors becomes alive.",
    historyEyebrow: "Historical context",
    historyTitle: "History of the Game of Life",
    historyOneDate: "1940s",
    historyOneTitle: "Von Neumann's question",
    historyOneCopy: "John von Neumann studied machines capable of self-replication. Conway looked for a much simpler version of those ideas using local rules.",
    historyTwoTitle: "Conway and Gardner",
    historyTwoCopy: "John Horton Conway introduced Life, and Martin Gardner popularized it in Scientific American, turning it into a classic of recreational mathematics.",
    historyThreeDate: "1970 onward",
    historyThreeTitle: "Gliders, guns, and computation",
    historyThreeCopy: "Bill Gosper discovered the first glider gun, proving unbounded growth. Later work showed that Life can implement universal computation.",
    historyFourDate: "Today",
    historyFourTitle: "A living community",
    historyFourCopy: "Researchers and enthusiasts continue to find oscillators, spaceships, giant patterns, and formal proofs about this minimal universe.",
    studiesEyebrow: "Keep studying",
    studiesTitle: "Studies and useful links",
    resourceReference: "Reference",
    resourceLifeWiki: "Rules, origin, patterns, algorithms, and community vocabulary.",
    resourceArticle: "Article",
    resourceScholarpedia: "Academic overview by Eugene Izhikevich, John Conway, and Anil Seth.",
    resourceComputation: "Computation",
    resourceLogic: "Construction of AND, OR, and NOT logic gates through glider collisions.",
    resourceRecent: "Recent research",
    resourceOmniperiodic: "Work on oscillators of every period and the history of the problem.",
    resourceComplexity: "Complexity",
    resourceCritical: "Study of critical behavior and dynamics in cellular automata.",
    resourceFormal: "Formal verification",
    resourceHol: "Verified implementation of Game of Life inside Game of Life.",
    footerPrefix: "Made by",
    footerSuffix: "to explore how minimal rules create surprising behavior.",
    locale: "en-US",
  },
  es: {
    title: "Juego de la Vida de Conway",
    metaDescription: "Simulador interactivo del Juego de la Vida de Conway con reglas, historia y enlaces de estudio.",
    navAria: "Navegación principal",
    brandAria: "Ir al simulador",
    navRules: "Reglas",
    navHistory: "Historia",
    navStudies: "Estudios",
    languageLabel: "Idioma",
    heroEyebrow: "Autómata celular · B3/S23",
    heroTitle: "Juego de la Vida de Conway",
    heroCopy: "Un universo de células que nacen, sobreviven o desaparecen siguiendo cuatro reglas simples. Tú defines la semilla inicial; el sistema hace el resto.",
    heroCta: "Abrir simulador",
    simEyebrow: "Explora patrones emergentes",
    simTitle: "Simulador interactivo",
    controlsAria: "Controles del simulador",
    controlsTitle: "Controles",
    start: "Iniciar",
    pause: "Pausar",
    step: "Paso",
    randomize: "Azar",
    clear: "Limpiar",
    patternLabel: "Patrón inicial",
    patternGlider: "Planeador",
    patternBlinker: "Intermitente",
    patternRPentomino: "R-pentominó",
    patternGosper: "Cañón de planeadores",
    loadPattern: "Cargar patrón",
    speedLabel: "Velocidad",
    densityLabel: "Densidad aleatoria",
    cellSizeLabel: "Tamaño de celda",
    cellCompact: "Compacto",
    cellMedium: "Medio",
    cellLarge: "Grande",
    statsAria: "Estadísticas",
    generation: "Generación",
    liveCells: "Células vivas",
    densityStat: "Densidad",
    boardAria: "Tablero del Juego de la Vida",
    rulesEyebrow: "Idea central",
    rulesTitle: "¿En qué consiste?",
    rulesCopy: "El Juego de la Vida no tiene objetivo, puntaje ni rivales. Es un juego de cero jugadores: una vez definido el estado inicial, cada generación se calcula automáticamente a partir de sus vecinas.",
    ruleOne: "Una célula viva con menos de dos vecinas vivas muere por aislamiento.",
    ruleTwo: "Una célula viva con dos o tres vecinas vivas sobrevive.",
    ruleThree: "Una célula viva con más de tres vecinas vivas muere por sobrepoblación.",
    ruleFour: "Una célula muerta con exactamente tres vecinas vivas nace.",
    historyEyebrow: "Contexto histórico",
    historyTitle: "Historia del Juego de la Vida",
    historyOneDate: "Década de 1940",
    historyOneTitle: "La pregunta de von Neumann",
    historyOneCopy: "John von Neumann estudió máquinas capaces de autorreplicarse. Conway buscó una versión mucho más simple de esas ideas usando reglas locales.",
    historyTwoTitle: "Conway y Gardner",
    historyTwoCopy: "John Horton Conway presentó Life y Martin Gardner lo popularizó en Scientific American, convirtiéndolo en un clásico de la matemática recreativa.",
    historyThreeDate: "1970 en adelante",
    historyThreeTitle: "Planeadores, cañones y computación",
    historyThreeCopy: "Bill Gosper descubrió el primer cañón de planeadores, mostrando crecimiento ilimitado. Más tarde se demostró que Life puede implementar computación universal.",
    historyFourDate: "Hoy",
    historyFourTitle: "Una comunidad viva",
    historyFourCopy: "Investigadores y aficionados siguen encontrando osciladores, naves, patrones gigantes y demostraciones formales sobre este universo mínimo.",
    studiesEyebrow: "Para seguir estudiando",
    studiesTitle: "Estudios y enlaces útiles",
    resourceReference: "Referencia",
    resourceLifeWiki: "Reglas, origen, patrones, algoritmos y vocabulario de la comunidad.",
    resourceArticle: "Artículo",
    resourceScholarpedia: "Resumen académico de Eugene Izhikevich, John Conway y Anil Seth.",
    resourceComputation: "Computación",
    resourceLogic: "Construcción de puertas lógicas AND, OR y NOT mediante colisiones de planeadores.",
    resourceRecent: "Investigación reciente",
    resourceOmniperiodic: "Trabajo sobre osciladores de todos los periodos y la historia del problema.",
    resourceComplexity: "Complejidad",
    resourceCritical: "Estudio sobre comportamiento crítico y dinámica en autómatas celulares.",
    resourceFormal: "Verificación formal",
    resourceHol: "Implementación verificada de Game of Life dentro de Game of Life.",
    footerPrefix: "Hecho por",
    footerSuffix: "para explorar cómo reglas mínimas producen comportamientos sorprendentes.",
    locale: "es-CL",
  },
  pt: {
    title: "Jogo da Vida de Conway",
    metaDescription: "Simulador interativo do Jogo da Vida de Conway com regras, história e links de pesquisa.",
    navAria: "Navegação principal",
    brandAria: "Ir para o simulador",
    navRules: "Regras",
    navHistory: "História",
    navStudies: "Estudos",
    languageLabel: "Idioma",
    heroEyebrow: "Autômato celular · B3/S23",
    heroTitle: "Jogo da Vida de Conway",
    heroCopy: "Um universo de células que nascem, sobrevivem ou desaparecem seguindo quatro regras simples. Você define a semente inicial; o sistema faz o resto.",
    heroCta: "Abrir simulador",
    simEyebrow: "Explore padrões emergentes",
    simTitle: "Simulador interativo",
    controlsAria: "Controles do simulador",
    controlsTitle: "Controles",
    start: "Iniciar",
    pause: "Pausar",
    step: "Passo",
    randomize: "Aleatório",
    clear: "Limpar",
    patternLabel: "Padrão inicial",
    patternGlider: "Planador",
    patternBlinker: "Piscador",
    patternRPentomino: "R-pentominó",
    patternGosper: "Canhão de planadores de Gosper",
    loadPattern: "Carregar padrão",
    speedLabel: "Velocidade",
    densityLabel: "Densidade aleatória",
    cellSizeLabel: "Tamanho da célula",
    cellCompact: "Compacto",
    cellMedium: "Médio",
    cellLarge: "Grande",
    statsAria: "Estatísticas",
    generation: "Geração",
    liveCells: "Células vivas",
    densityStat: "Densidade",
    boardAria: "Tabuleiro do Jogo da Vida",
    rulesEyebrow: "Ideia central",
    rulesTitle: "Do que se trata?",
    rulesCopy: "O Jogo da Vida não tem objetivo, pontuação nem adversários. É um jogo de zero jogadores: depois que o estado inicial é definido, cada geração é calculada automaticamente a partir das células vizinhas.",
    ruleOne: "Uma célula viva com menos de duas vizinhas vivas morre por isolamento.",
    ruleTwo: "Uma célula viva com duas ou três vizinhas vivas sobrevive.",
    ruleThree: "Uma célula viva com mais de três vizinhas vivas morre por superpopulação.",
    ruleFour: "Uma célula morta com exatamente três vizinhas vivas nasce.",
    historyEyebrow: "Contexto histórico",
    historyTitle: "História do Jogo da Vida",
    historyOneDate: "Década de 1940",
    historyOneTitle: "A pergunta de von Neumann",
    historyOneCopy: "John von Neumann estudou máquinas capazes de se autorreplicar. Conway procurou uma versão muito mais simples dessas ideias usando regras locais.",
    historyTwoTitle: "Conway e Gardner",
    historyTwoCopy: "John Horton Conway apresentou Life, e Martin Gardner o popularizou na Scientific American, transformando-o em um clássico da matemática recreativa.",
    historyThreeDate: "A partir de 1970",
    historyThreeTitle: "Planadores, canhões e computação",
    historyThreeCopy: "Bill Gosper descobriu o primeiro canhão de planadores, provando crescimento ilimitado. Trabalhos posteriores mostraram que Life pode implementar computação universal.",
    historyFourDate: "Hoje",
    historyFourTitle: "Uma comunidade viva",
    historyFourCopy: "Pesquisadores e entusiastas continuam encontrando osciladores, naves, padrões gigantes e provas formais sobre este universo mínimo.",
    studiesEyebrow: "Continue estudando",
    studiesTitle: "Estudos e links úteis",
    resourceReference: "Referência",
    resourceLifeWiki: "Regras, origem, padrões, algoritmos e vocabulário da comunidade.",
    resourceArticle: "Artigo",
    resourceScholarpedia: "Visão acadêmica de Eugene Izhikevich, John Conway e Anil Seth.",
    resourceComputation: "Computação",
    resourceLogic: "Construção de portas lógicas AND, OR e NOT por colisões de planadores.",
    resourceRecent: "Pesquisa recente",
    resourceOmniperiodic: "Trabalho sobre osciladores de todos os períodos e a história do problema.",
    resourceComplexity: "Complexidade",
    resourceCritical: "Estudo sobre comportamento crítico e dinâmica em autômatos celulares.",
    resourceFormal: "Verificação formal",
    resourceHol: "Implementação verificada de Game of Life dentro de Game of Life.",
    footerPrefix: "Feito por",
    footerSuffix: "para explorar como regras mínimas criam comportamentos surpreendentes.",
    locale: "pt-BR",
  },
};

let currentLanguage = "en";

const colors = {
  dead: "#090c0a",
  grid: "#1c2a24",
  live: "#2ec4b6",
  liveWarm: "#ffd166",
  trail: "#19352f",
};

const patterns = {
  glider: [
    [1, 0],
    [2, 1],
    [0, 2],
    [1, 2],
    [2, 2],
  ],
  blinker: [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  pulsar: [
    [2, 0], [3, 0], [4, 0], [8, 0], [9, 0], [10, 0],
    [0, 2], [5, 2], [7, 2], [12, 2],
    [0, 3], [5, 3], [7, 3], [12, 3],
    [0, 4], [5, 4], [7, 4], [12, 4],
    [2, 5], [3, 5], [4, 5], [8, 5], [9, 5], [10, 5],
    [2, 7], [3, 7], [4, 7], [8, 7], [9, 7], [10, 7],
    [0, 8], [5, 8], [7, 8], [12, 8],
    [0, 9], [5, 9], [7, 9], [12, 9],
    [0, 10], [5, 10], [7, 10], [12, 10],
    [2, 12], [3, 12], [4, 12], [8, 12], [9, 12], [10, 12],
  ],
  rPentomino: [
    [1, 0],
    [2, 0],
    [0, 1],
    [1, 1],
    [1, 2],
  ],
  acorn: [
    [1, 0],
    [3, 1],
    [0, 2],
    [1, 2],
    [4, 2],
    [5, 2],
    [6, 2],
  ],
  gosper: [
    [24, 0],
    [22, 1], [24, 1],
    [12, 2], [13, 2], [20, 2], [21, 2], [34, 2], [35, 2],
    [11, 3], [15, 3], [20, 3], [21, 3], [34, 3], [35, 3],
    [0, 4], [1, 4], [10, 4], [16, 4], [20, 4], [21, 4],
    [0, 5], [1, 5], [10, 5], [14, 5], [16, 5], [17, 5], [22, 5], [24, 5],
    [10, 6], [16, 6], [24, 6],
    [11, 7], [15, 7],
    [12, 8], [13, 8],
  ],
};

let cellSize = Number(controls.cellSize.value);
let cols = 0;
let rows = 0;
let grid = [];
let previousGrid = [];
let generation = 0;
let running = false;
let lastTick = 0;
let drawing = false;
let drawState = true;

function createGrid(width, height) {
  return Array.from({ length: height }, () => Array(width).fill(false));
}

function resizeBoard() {
  const box = canvas.parentElement.getBoundingClientRect();
  const nextWidth = Math.max(320, Math.floor(box.width));
  const nextHeight = Math.max(320, Math.floor(box.height));
  canvas.width = nextWidth * window.devicePixelRatio;
  canvas.height = nextHeight * window.devicePixelRatio;
  ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);

  const nextCols = Math.floor(nextWidth / cellSize);
  const nextRows = Math.floor(nextHeight / cellSize);
  const nextGrid = createGrid(nextCols, nextRows);
  const nextPrevious = createGrid(nextCols, nextRows);
  const copyRows = Math.min(rows, nextRows);
  const copyCols = Math.min(cols, nextCols);

  for (let y = 0; y < copyRows; y += 1) {
    for (let x = 0; x < copyCols; x += 1) {
      nextGrid[y][x] = grid[y]?.[x] || false;
      nextPrevious[y][x] = previousGrid[y]?.[x] || false;
    }
  }

  cols = nextCols;
  rows = nextRows;
  grid = nextGrid;
  previousGrid = nextPrevious;
  draw();
  updateStats();
}

function countNeighbors(x, y) {
  let count = 0;
  for (let dy = -1; dy <= 1; dy += 1) {
    for (let dx = -1; dx <= 1; dx += 1) {
      if (dx === 0 && dy === 0) continue;
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < cols && ny >= 0 && ny < rows && grid[ny][nx]) {
        count += 1;
      }
    }
  }
  return count;
}

function stepGeneration() {
  const next = createGrid(cols, rows);
  previousGrid = grid.map((row) => row.slice());

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const alive = grid[y][x];
      const neighbors = countNeighbors(x, y);
      next[y][x] = alive ? neighbors === 2 || neighbors === 3 : neighbors === 3;
    }
  }

  grid = next;
  generation += 1;
  draw();
  updateStats();
}

function draw() {
  const width = canvas.width / window.devicePixelRatio;
  const height = canvas.height / window.devicePixelRatio;
  ctx.fillStyle = colors.dead;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = colors.grid;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = 0; x <= cols; x += 1) {
    const px = x * cellSize + 0.5;
    ctx.moveTo(px, 0);
    ctx.lineTo(px, rows * cellSize);
  }
  for (let y = 0; y <= rows; y += 1) {
    const py = y * cellSize + 0.5;
    ctx.moveTo(0, py);
    ctx.lineTo(cols * cellSize, py);
  }
  ctx.stroke();

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      if (previousGrid[y]?.[x] && !grid[y][x]) {
        ctx.fillStyle = colors.trail;
        ctx.fillRect(x * cellSize + 1, y * cellSize + 1, cellSize - 2, cellSize - 2);
      }
      if (grid[y][x]) {
        ctx.fillStyle = (x + y + generation) % 7 === 0 ? colors.liveWarm : colors.live;
        ctx.fillRect(x * cellSize + 1, y * cellSize + 1, cellSize - 2, cellSize - 2);
      }
    }
  }
}

function updateStats() {
  const locale = translations[currentLanguage].locale;
  const live = grid.reduce((total, row) => total + row.filter(Boolean).length, 0);
  const density = cols * rows === 0 ? 0 : Math.round((live / (cols * rows)) * 1000) / 10;
  controls.generationCount.textContent = generation.toLocaleString(locale);
  controls.liveCount.textContent = live.toLocaleString(locale);
  controls.densityCount.textContent = `${density}%`;
}

function setRunning(nextRunning) {
  running = nextRunning;
  controls.toggleRun.textContent = translations[currentLanguage][running ? "pause" : "start"];
  controls.toggleRun.classList.toggle("primary", !running);
}

function applyLanguage(language) {
  currentLanguage = translations[language] ? language : "en";
  const dictionary = translations[currentLanguage];
  document.documentElement.lang = currentLanguage;
  document.title = dictionary.title;
  document.querySelector("#metaDescription").setAttribute("content", dictionary.metaDescription);

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) element.textContent = dictionary[key];
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const key = element.dataset.i18nAriaLabel;
    if (dictionary[key]) element.setAttribute("aria-label", dictionary[key]);
  });

  setRunning(running);
  updateStats();
}

function randomize() {
  const chance = Number(controls.density.value) / 100;
  grid = createGrid(cols, rows).map((row) => row.map(() => Math.random() < chance));
  previousGrid = createGrid(cols, rows);
  generation = 0;
  draw();
  updateStats();
}

function clearBoard() {
  grid = createGrid(cols, rows);
  previousGrid = createGrid(cols, rows);
  generation = 0;
  setRunning(false);
  draw();
  updateStats();
}

function loadPattern(name) {
  clearBoard();
  const pattern = patterns[name] || patterns.glider;
  const patternWidth = Math.max(...pattern.map(([x]) => x)) + 1;
  const patternHeight = Math.max(...pattern.map(([, y]) => y)) + 1;
  const startX = Math.max(0, Math.floor((cols - patternWidth) / 2));
  const startY = Math.max(0, Math.floor((rows - patternHeight) / 2));

  pattern.forEach(([x, y]) => {
    const px = startX + x;
    const py = startY + y;
    if (px >= 0 && px < cols && py >= 0 && py < rows) {
      grid[py][px] = true;
    }
  });

  draw();
  updateStats();
}

function pointerToCell(event) {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((event.clientX - rect.left) / cellSize);
  const y = Math.floor((event.clientY - rect.top) / cellSize);
  return { x, y };
}

function paintCell(event, forceState) {
  const { x, y } = pointerToCell(event);
  if (x < 0 || x >= cols || y < 0 || y >= rows) return;
  grid[y][x] = forceState;
  previousGrid[y][x] = false;
  draw();
  updateStats();
}

function loop(timestamp) {
  const interval = 1000 / Number(controls.speed.value);
  if (running && timestamp - lastTick >= interval) {
    stepGeneration();
    lastTick = timestamp;
  }
  requestAnimationFrame(loop);
}

function setupHero() {
  const heroCols = 70;
  const heroRows = 45;
  let heroGrid = createGrid(heroCols, heroRows);
  patterns.gosper.forEach(([x, y]) => {
    heroGrid[y + 12][x + 10] = true;
  });

  function heroNeighbors(x, y) {
    let count = 0;
    for (let dy = -1; dy <= 1; dy += 1) {
      for (let dx = -1; dx <= 1; dx += 1) {
        if (dx === 0 && dy === 0) continue;
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && nx < heroCols && ny >= 0 && ny < heroRows && heroGrid[ny][nx]) {
          count += 1;
        }
      }
    }
    return count;
  }

  function heroStep() {
    const next = createGrid(heroCols, heroRows);
    for (let y = 0; y < heroRows; y += 1) {
      for (let x = 0; x < heroCols; x += 1) {
        const neighbors = heroNeighbors(x, y);
        next[y][x] = heroGrid[y][x] ? neighbors === 2 || neighbors === 3 : neighbors === 3;
      }
    }
    heroGrid = next;
  }

  function heroDraw() {
    const rect = heroCanvas.getBoundingClientRect();
    heroCanvas.width = Math.floor(rect.width * window.devicePixelRatio);
    heroCanvas.height = Math.floor(rect.height * window.devicePixelRatio);
    heroCtx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    const size = Math.max(5, Math.min(rect.width / heroCols, rect.height / heroRows));
    heroCtx.fillStyle = "#080b09";
    heroCtx.fillRect(0, 0, rect.width, rect.height);
    for (let y = 0; y < heroRows; y += 1) {
      for (let x = 0; x < heroCols; x += 1) {
        if (!heroGrid[y][x]) continue;
        heroCtx.fillStyle = (x + y) % 5 === 0 ? colors.liveWarm : colors.live;
        heroCtx.fillRect(x * size + 1, y * size + 1, size - 1, size - 1);
      }
    }
  }

  setInterval(() => {
    heroStep();
    heroDraw();
  }, 130);
  heroDraw();
}

controls.toggleRun.addEventListener("click", () => setRunning(!running));
controls.step.addEventListener("click", stepGeneration);
controls.randomize.addEventListener("click", randomize);
controls.clear.addEventListener("click", clearBoard);
controls.loadPattern.addEventListener("click", () => loadPattern(controls.patternSelect.value));
controls.languageSelect.addEventListener("change", () => applyLanguage(controls.languageSelect.value));
controls.cellSize.addEventListener("change", () => {
  cellSize = Number(controls.cellSize.value);
  resizeBoard();
});

canvas.addEventListener("pointerdown", (event) => {
  drawing = true;
  const { x, y } = pointerToCell(event);
  drawState = !(grid[y]?.[x] || false);
  canvas.setPointerCapture(event.pointerId);
  paintCell(event, drawState);
});

canvas.addEventListener("pointermove", (event) => {
  if (!drawing) return;
  paintCell(event, drawState);
});

canvas.addEventListener("pointerup", () => {
  drawing = false;
});

canvas.addEventListener("pointercancel", () => {
  drawing = false;
});

window.addEventListener("resize", resizeBoard);

applyLanguage("en");
resizeBoard();
loadPattern("gosper");
setupHero();
requestAnimationFrame(loop);
