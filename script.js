const form = document.getElementById("character-form");
const canvas = document.getElementById("hero-canvas");
const ctx = canvas.getContext("2d");

const presetSelect = document.getElementById("preset-select");
const sheetName = document.getElementById("sheet-name");
const sheetSummary = document.getElementById("sheet-summary");
const sheetPower = document.getElementById("sheet-power");
const sheetTraits = document.getElementById("sheet-traits");
const sheetBackstory = document.getElementById("sheet-backstory");
const sheetTheme = document.getElementById("sheet-theme");

const PRESETS = {
  custom: {
    label: "Custom Mix",
    tagline: "",
  },
  "cosmic-guardian": {
    label: "Cosmic Guardian",
    name: "Starlance Prime",
    gender: "Non-binary",
    alignment: "Hero",
    origin: "Cosmic Wanderer",
    specialty: "Mystic",
    height: "Tall",
    traits: ["Compassionate", "Strategic", "Stoic"],
    primaryColor: "#314dff",
    secondaryColor: "#ff5d9d",
    accentColor: "#f4ff8d",
    power: "Solar-sung Singularity Lance",
    backstory:
      "Forged within the heart of a dying star, Starlance Prime patrols the astral planes to keep the cosmic lattice from unraveling.",
    tagline: "Sentinel of the Celestial Spires",
    sfx: "ASTRAL!",
    bubble: "THE CONSTELLATIONS ANSWER MY CALL!",
    heroArt: {
      src: "assets/panels/cosmic-guardian.svg",
      frame: { heightRatio: 0.78, baseline: 0.9, centerX: 0.5 },
      bubble: {
        anchorX: 0.78,
        anchorY: 0.12,
        widthRatio: 0.48,
        tailX: 0.62,
        tailY: 0.34,
      },
      sfx: { anchorX: 0.24, anchorY: 0.26, radiusRatio: 0.2, rotation: -0.18 },
    },
  },
  "neon-rogue": {
    label: "Neon Rogue",
    name: "Overclock",
    gender: "Genderfluid",
    alignment: "Anti-hero",
    origin: "Technological Construct",
    specialty: "Speedster",
    height: "Average",
    traits: ["Chaotic", "Strategic", "Charismatic"],
    primaryColor: "#11a0ff",
    secondaryColor: "#0c032c",
    accentColor: "#ff0078",
    power: "Photon-split Velocity Drives",
    backstory:
      "After merging with a black market AI, Overclock races through the megacity's data-streams to redistribute stolen futures.",
    tagline: "Streak of the Midnight Megacity",
    sfx: "VRRRRM!",
    bubble: "LIGHTS OUT FOR THE GRIDLORDS!",
    heroArt: {
      src: "assets/panels/neon-rogue.svg",
      frame: { heightRatio: 0.76, baseline: 0.9, centerX: 0.52 },
      bubble: {
        anchorX: 0.76,
        anchorY: 0.1,
        widthRatio: 0.5,
        tailX: 0.58,
        tailY: 0.32,
      },
      sfx: { anchorX: 0.26, anchorY: 0.2, radiusRatio: 0.22, rotation: -0.12 },
    },
  },
  "mythic-sorcerer": {
    label: "Mythic Sorcerer",
    name: "Eldra Nyx",
    gender: "Female",
    alignment: "Hero",
    origin: "Interdimensional",
    specialty: "Mystic",
    height: "Average",
    traits: ["Compassionate", "Charismatic"],
    primaryColor: "#6f2dff",
    secondaryColor: "#f6a13b",
    accentColor: "#ffe29d",
    power: "Chrono-etched Sigil Weaving",
    backstory:
      "Eldra Nyx slipped between realms to bind timefractures with rune-sung incantations, striking bargains with forgotten pantheons.",
    tagline: "Oracle of the Everwoven",
    sfx: "SHIMMER!",
    bubble: "BY THE THREADS OF FATE, BE STILL!",
    heroArt: {
      src: "assets/panels/mythic-sorcerer.svg",
      frame: { heightRatio: 0.8, baseline: 0.92, centerX: 0.48 },
      bubble: {
        anchorX: 0.74,
        anchorY: 0.14,
        widthRatio: 0.5,
        tailX: 0.56,
        tailY: 0.38,
      },
      sfx: { anchorX: 0.3, anchorY: 0.28, radiusRatio: 0.24, rotation: -0.2 },
    },
  },
  "shadow-operative": {
    label: "Shadow Operative",
    name: "Nocturne Wraith",
    gender: "Male",
    alignment: "Vigilante",
    origin: "Earth-born",
    specialty: "Stealth Operative",
    height: "Tall",
    traits: ["Stoic", "Strategic"],
    primaryColor: "#161d2b",
    secondaryColor: "#c7d1ff",
    accentColor: "#ffe066",
    power: "Umbral Phase Step",
    backstory:
      "An ex-intelligence asset, Nocturne Wraith vanished from public record and now hunts the corrupt underbelly beneath storm-soaked skylines.",
    tagline: "Whisper in the Rain",
    sfx: "SLNK!",
    bubble: "YOUR SHADOWS BETRAY YOU.",
    heroArt: {
      src: "assets/panels/shadow-operative.svg",
      frame: { heightRatio: 0.82, baseline: 0.92, centerX: 0.5 },
      bubble: {
        anchorX: 0.76,
        anchorY: 0.18,
        widthRatio: 0.48,
        tailX: 0.58,
        tailY: 0.4,
      },
      sfx: { anchorX: 0.26, anchorY: 0.26, radiusRatio: 0.22, rotation: -0.16 },
    },
  },
  "atomic-sentinel": {
    label: "Atomic Sentinel",
    name: "Voltarion-6",
    gender: "Unspecified",
    alignment: "Hero",
    origin: "Mutant",
    specialty: "Defender",
    height: "Towering",
    traits: ["Stoic", "Compassionate"],
    primaryColor: "#f25c05",
    secondaryColor: "#313131",
    accentColor: "#ffec3d",
    power: "Planetary Core Overcharge",
    backstory:
      "Born from an experimental reactor breach, Voltarion-6 channels tectonic force to shield cities from apocalyptic fallout.",
    tagline: "Bulwark of the Radiant Dawn",
    sfx: "BRRRAK-KOOM!",
    bubble: "THE CORE BURNS FOR THE PEOPLE!",
    heroArt: {
      src: "assets/panels/atomic-sentinel.svg",
      frame: { heightRatio: 0.82, baseline: 0.92, centerX: 0.5 },
      bubble: {
        anchorX: 0.78,
        anchorY: 0.12,
        widthRatio: 0.5,
        tailX: 0.62,
        tailY: 0.34,
      },
      sfx: { anchorX: 0.24, anchorY: 0.24, radiusRatio: 0.22, rotation: -0.14 },
    },
  },
};

const heroArtCache = new Map();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderHero();
});

presetSelect.addEventListener("change", () => {
  const key = presetSelect.value;
  if (key === "custom") {
    renderHero();
    return;
  }
  applyPresetToForm(key);
  renderHero();
});

function renderHero() {
  const heroData = collectHeroData();
  updateSheet(heroData);
  drawHero(heroData);
}

function resolveHeroArtEntry(hero) {
  const preset = PRESETS[hero.presetKey];
  const config = hero.heroArt || preset?.heroArt;
  if (!config?.src) {
    return { status: "missing", image: null, config: null };
  }

  let entry = heroArtCache.get(config.src);
  if (!entry) {
    const image = new Image();
    entry = { status: "loading", image, config };
    heroArtCache.set(config.src, entry);
    image.addEventListener("load", () => {
      entry.status = "loaded";
      if (presetSelect.value === hero.presetKey) {
        window.requestAnimationFrame(() => renderHero());
      }
    });
    image.addEventListener("error", () => {
      entry.status = "error";
    });
    image.src = config.src;
  }

  entry.config = config;
  return entry;
}

function collectHeroData() {
  const formData = new FormData(form);
  const traits = formData.getAll("traits");
  const presetKey = presetSelect.value || "custom";
  const presetMeta = PRESETS[presetKey] || PRESETS.custom;

  return {
    name: formData.get("name")?.trim() || presetMeta.name || "Unnamed Legend",
    gender: formData.get("gender") || presetMeta.gender || "Unspecified",
    alignment: formData.get("alignment") || presetMeta.alignment || "Hero",
    origin: formData.get("origin") || presetMeta.origin || "Earth-born",
    specialty: formData.get("specialty") || presetMeta.specialty || "Defender",
    height: formData.get("height") || presetMeta.height || "Average",
    traits,
    primaryColor: formData.get("primaryColor") || presetMeta.primaryColor || "#2c4bff",
    secondaryColor: formData.get("secondaryColor") || presetMeta.secondaryColor || "#ff3d6a",
    accentColor: formData.get("accentColor") || presetMeta.accentColor || "#fdd835",
    power: formData.get("power")?.trim() || presetMeta.power || "",
    backstory: formData.get("backstory")?.trim() || presetMeta.backstory || "",
    presetKey,
    presetLabel: presetMeta.label,
    presetTagline: presetMeta.tagline,
    presetSfx: presetMeta.sfx,
    presetBubble: presetMeta.bubble,
    heroArt: presetMeta.heroArt || null,
  };
}

function applyPresetToForm(key) {
  const preset = PRESETS[key];
  if (!preset) {
    return;
  }

  const setValue = (name, value) => {
    const field = form.elements.namedItem(name);
    if (!field || typeof value === "undefined") {
      return;
    }
    if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
      field.value = value;
    } else if (field instanceof HTMLSelectElement) {
      field.value = value;
    }
  };

  setValue("name", preset.name || "");
  setValue("gender", preset.gender || "Unspecified");
  setValue("alignment", preset.alignment || "Hero");
  setValue("origin", preset.origin || "Earth-born");
  setValue("specialty", preset.specialty || "Defender");
  setValue("height", preset.height || "Average");
  setValue("primaryColor", preset.primaryColor || "#2c4bff");
  setValue("secondaryColor", preset.secondaryColor || "#ff3d6a");
  setValue("accentColor", preset.accentColor || "#fdd835");
  setValue("power", preset.power || "");
  setValue("backstory", preset.backstory || "");

  const traitInputs = form.querySelectorAll('input[name="traits"]');
  traitInputs.forEach((input) => {
    input.checked = !!preset.traits?.includes(input.value);
  });
}

function updateSheet(hero) {
  sheetName.textContent = hero.name;

  const summary = `${hero.alignment} ${hero.origin.toLowerCase()} ${hero.specialty.toLowerCase()} (${hero.gender.toLowerCase()}, ${hero.height.toLowerCase()} build)`;
  sheetSummary.textContent = capitalizeSentences(summary);

  if (hero.presetKey !== "custom" && (hero.presetTagline || hero.presetLabel)) {
    sheetTheme.textContent = (hero.presetTagline || hero.presetLabel).toUpperCase();
    sheetTheme.style.display = "block";
  } else {
    sheetTheme.textContent = "";
    sheetTheme.style.display = "none";
  }

  sheetPower.textContent = hero.power ? `Signature Power: ${hero.power}` : "";

  sheetTraits.innerHTML = "";
  if (hero.traits.length) {
    hero.traits.forEach((trait) => {
      const badge = document.createElement("span");
      badge.textContent = trait;
      sheetTraits.appendChild(badge);
    });
  }

  sheetBackstory.textContent = hero.backstory
    ? hero.backstory
    : "Every icon begins with a blank page. Sketch their legend above.";
}

function drawHero(hero) {
  const {
    primaryColor,
    secondaryColor,
    accentColor,
    alignment,
    origin,
    height,
    specialty,
    power,
    name,
  } = hero;
  const { width, height: canvasHeight } = canvas;

  ctx.clearRect(0, 0, width, canvasHeight);

  const figureHeight = mapHeight(height, canvasHeight);
  const centerX = width / 2;
  const baseY = canvasHeight * 0.84;
  const metrics = createFigureMetrics(centerX, baseY, figureHeight);
  const artEntry = resolveHeroArtEntry(hero);
  const artConfigured = !!artEntry.config;
  const artLoaded = artConfigured && artEntry.status === "loaded";
  const artFrame = artConfigured
    ? computeHeroArtFrame(artEntry.config, width, canvasHeight, artLoaded ? artEntry.image : null)
    : null;

  drawBackdrop(ctx, width, canvasHeight, hero);
  drawBackdropLinework(ctx, width, canvasHeight, hero, metrics);

  drawPresetBackdrop(ctx, width, canvasHeight, hero, metrics);

  if (artFrame) {
    drawGroundShadow(ctx, metrics, {
      centerX: artFrame.centerX,
      baseY: artFrame.baselineY,
      width: artFrame.width * 0.32,
      height: artFrame.height * 0.16,
    });
  } else {
    drawGroundShadow(ctx, metrics);
  }

  if (artLoaded) {
    drawIllustratedHero(ctx, hero, artEntry.image, artFrame);
  } else if (artConfigured && artEntry.status === "loading") {
    drawIllustratedPlaceholder(ctx, hero, artFrame || metrics);
  } else {
    if (alignment === "Hero" || alignment === "Anti-hero") {
      drawDrapedCape(ctx, metrics, secondaryColor, alignment === "Anti-hero");
    } else if (alignment === "Villain") {
      drawDrapedCape(ctx, metrics, darkenColor(secondaryColor, 35), true);
    }

    drawLeg(ctx, metrics, hero, "left");
    drawLeg(ctx, metrics, hero, "right");

    drawTorso(ctx, metrics, hero);
    drawArm(ctx, metrics, hero, "left");
    drawArm(ctx, metrics, hero, "right");
    drawHair(ctx, metrics, hero);
    drawHeadAndFace(ctx, metrics, hero);
    drawCostumeHighlights(ctx, metrics, hero);
    inkMuscleContours(ctx, metrics, hero);
    drawFigureSketchLines(ctx, metrics);

    if (specialty === "Mystic") {
      drawMysticSigils(ctx, metrics, accentColor);
    } else if (specialty === "Speedster") {
      drawSpeedBurst(ctx, metrics, accentColor);
    } else if (specialty === "Stealth") {
      drawStealthShadow(ctx, metrics, secondaryColor);
    }

    if (power) {
      drawPowerGlyphBurst(ctx, metrics, accentColor);
    }

    if (/Cosmic|Interdimensional/i.test(origin)) {
      drawKirbyKrackle(ctx, metrics, accentColor);
    } else if (/Technological/i.test(origin)) {
      drawTechGlyphs(ctx, metrics, secondaryColor);
    }
  }

  if (artLoaded) {
    drawHeroArtAura(ctx, hero, artFrame);
  }

  drawPresetForeground(ctx, metrics, hero, width, canvasHeight);
  drawPanelTexture(ctx, width, canvasHeight, hero, metrics);
  drawSpeechBubble(ctx, metrics, hero, width, canvasHeight, artFrame);
  drawActionBurst(ctx, metrics, hero, artFrame);
  drawPanelVignette(ctx, width, canvasHeight);
  drawPanelFrame(ctx, width, canvasHeight, hero);
}

function computeHeroArtFrame(config, canvasWidth, canvasHeight, image) {
  if (!config) {
    return null;
  }
  const frame = config.frame || {};
  const heightRatio = clamp(frame.heightRatio ?? 0.78, 0.35, 1);
  const baselineRatio = clamp(frame.baseline ?? 0.9, 0.55, 1.05);
  const centerRatio = clamp(frame.centerX ?? 0.5, 0.1, 0.9);
  const fallbackWidthRatio = clamp(frame.widthRatio ?? 0.42, 0.2, 0.9);
  const targetHeight = canvasHeight * heightRatio;
  let targetWidth = canvasWidth * fallbackWidthRatio;
  if (image?.naturalWidth && image?.naturalHeight) {
    const aspect = image.naturalWidth / image.naturalHeight;
    if (Number.isFinite(aspect) && aspect > 0) {
      targetWidth = targetHeight * aspect;
    }
  }
  const centerX = canvasWidth * centerRatio;
  const baselineY = canvasHeight * baselineRatio;
  const x = centerX - targetWidth / 2;
  const y = baselineY - targetHeight;
  return { x, y, width: targetWidth, height: targetHeight, baselineY, centerX };
}

function drawIllustratedHero(ctx, hero, image, frame) {
  if (!image || !frame) {
    return;
  }
  const accent = hero.accentColor || hero.primaryColor || "#ffffff";
  const ink = setAlpha("#050209", 0.85);

  ctx.save();
  ctx.shadowColor = setAlpha(hero.secondaryColor || hero.primaryColor || "#000000", 0.45);
  ctx.shadowBlur = 24;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 10;
  ctx.drawImage(image, frame.x, frame.y, frame.width, frame.height);
  ctx.restore();

  ctx.save();
  ctx.globalCompositeOperation = "multiply";
  const depthGradient = ctx.createLinearGradient(frame.x, frame.y, frame.x, frame.y + frame.height);
  depthGradient.addColorStop(0, setAlpha(adjustColor(accent, 30), 0.1));
  depthGradient.addColorStop(0.55, setAlpha("#000000", 0));
  depthGradient.addColorStop(1, setAlpha("#000000", 0.2));
  ctx.fillStyle = depthGradient;
  ctx.fillRect(frame.x, frame.y, frame.width, frame.height);
  ctx.restore();

  ctx.save();
  ctx.lineWidth = Math.max(frame.width * 0.005, 2.4);
  ctx.strokeStyle = ink;
  ctx.strokeRect(frame.x + 1.5, frame.y + 1.5, frame.width - 3, frame.height - 3);
  ctx.restore();
}

function drawIllustratedPlaceholder(ctx, hero, frameOrMetrics) {
  if (!frameOrMetrics) {
    return;
  }
  const fallbackHeight = frameOrMetrics.height ?? frameOrMetrics.figureHeight ?? 320;
  const fallbackWidth = frameOrMetrics.width ?? fallbackHeight * 0.58;
  const estimatedCenter =
    frameOrMetrics.centerX ??
    (typeof frameOrMetrics.x === "number"
      ? frameOrMetrics.x + (frameOrMetrics.width ?? fallbackWidth) / 2
      : null);
  const centerX = Number.isFinite(estimatedCenter) ? estimatedCenter : canvas.width / 2;
  const estimatedBaseline =
    frameOrMetrics.baselineY ??
    frameOrMetrics.baseY ??
    (typeof frameOrMetrics.y === "number"
      ? frameOrMetrics.y + (frameOrMetrics.height ?? fallbackHeight)
      : null);
  let baselineY = Number.isFinite(estimatedBaseline) ? estimatedBaseline : null;
  if (!Number.isFinite(baselineY)) {
    baselineY = typeof canvas.height === "number" && canvas.height > 0 ? canvas.height * 0.88 : fallbackHeight;
  }
  const width = frameOrMetrics.width ?? fallbackWidth;
  const height = frameOrMetrics.height ?? fallbackHeight;
  const x = frameOrMetrics.x ?? centerX - width / 2;
  const y = frameOrMetrics.y ?? baselineY - height;
  const primary = hero.primaryColor || "#6c7cfc";
  const secondary = hero.secondaryColor || adjustColor(primary, -20);

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x + width * 0.5, y);
  ctx.quadraticCurveTo(x + width, y + height * 0.1, x + width, y + height * 0.42);
  ctx.quadraticCurveTo(x + width, y + height * 0.92, x + width * 0.5, y + height);
  ctx.quadraticCurveTo(x, y + height * 0.92, x, y + height * 0.42);
  ctx.quadraticCurveTo(x, y + height * 0.1, x + width * 0.5, y);
  ctx.closePath();
  const gradient = ctx.createLinearGradient(x, y, x, y + height);
  gradient.addColorStop(0, setAlpha(primary, 0.34));
  gradient.addColorStop(0.5, setAlpha(secondary, 0.28));
  gradient.addColorStop(1, setAlpha("#05020d", 0.45));
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.lineWidth = Math.max(width * 0.01, 2);
  ctx.setLineDash([10, 8]);
  ctx.strokeStyle = setAlpha("#ffffff", 0.4);
  ctx.stroke();

  ctx.setLineDash([]);
  ctx.globalAlpha = 0.35;
  ctx.strokeStyle = setAlpha(hero.accentColor || "#ffffff", 0.45);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x + width * 0.18, y + height * 0.22);
  ctx.lineTo(x + width * 0.82, y + height * 0.78);
  ctx.moveTo(x + width * 0.82, y + height * 0.22);
  ctx.lineTo(x + width * 0.18, y + height * 0.78);
  ctx.stroke();

  ctx.restore();

  ctx.save();
  ctx.fillStyle = setAlpha("#ffffff", 0.86);
  ctx.font = "600 18px 'Inter', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("INKING HERO...", centerX, y + height * 0.52);
  ctx.restore();
}

function drawHeroArtAura(ctx, hero, frame) {
  if (!frame) {
    return;
  }
  const accent = hero.accentColor || hero.primaryColor || "#ffffff";
  const auraCenterX = frame.centerX;
  const auraCenterY = frame.y + frame.height * 0.45;
  const auraRadius = Math.max(frame.width, frame.height) * 0.68;

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  const gradient = ctx.createRadialGradient(
    auraCenterX,
    auraCenterY,
    auraRadius * 0.15,
    auraCenterX,
    auraCenterY,
    auraRadius
  );
  gradient.addColorStop(0, setAlpha(accent, 0.6));
  gradient.addColorStop(0.35, setAlpha(hero.primaryColor || accent, 0.18));
  gradient.addColorStop(1, setAlpha("#000000", 0));
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.ellipse(auraCenterX, auraCenterY, auraRadius * 0.9, auraRadius * 0.7, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function mapHeight(heightLabel, canvasHeight) {
  const ratios = {
    Short: 0.45,
    Average: 0.52,
    Tall: 0.58,
    Towering: 0.64,
  };
  return canvasHeight * (ratios[heightLabel] || ratios.Average);
}

function createFigureMetrics(centerX, baseY, figureHeight) {
  const topY = baseY - figureHeight;
  const headHeight = figureHeight * 0.2;
  const neckHeight = figureHeight * 0.035;
  const shoulderY = topY + headHeight + neckHeight;
  const torsoHeight = figureHeight * 0.46;
  const waistY = shoulderY + torsoHeight * 0.6;
  const hipY = baseY - figureHeight * 0.36;
  const shoulderWidth = figureHeight * 0.38;
  const waistWidth = figureHeight * 0.24;
  const hipWidth = figureHeight * 0.28;
  const limbWidth = figureHeight * 0.12;
  const forearmWidth = figureHeight * 0.1;
  const bootHeight = figureHeight * 0.18;
  const gloveLength = figureHeight * 0.12;
  const inkWeight = Math.max(2.6, figureHeight * 0.014);
  const eyeY = topY + headHeight * 0.52;
  const noseY = topY + headHeight * 0.74;
  const chinY = topY + headHeight * 0.98;

  return {
    centerX,
    baseY,
    topY,
    figureHeight,
    headHeight,
    neckHeight,
    shoulderY,
    torsoHeight,
    waistY,
    hipY,
    shoulderWidth,
    waistWidth,
    hipWidth,
    limbWidth,
    forearmWidth,
    bootHeight,
    gloveLength,
    inkWeight,
    eyeY,
    noseY,
    chinY,
  };
}

function drawBackdrop(ctx, width, height, hero) {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, adjustColor(hero.primaryColor, 55));
  gradient.addColorStop(0.6, adjustColor(hero.primaryColor, -5));
  gradient.addColorStop(1, "#04020d");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  drawSunburst(ctx, width, height, hero.accentColor);

  ctx.save();
  ctx.globalAlpha = 0.32;
  ctx.fillStyle = createHalftonePattern(
    ctx,
    setAlpha("#ffffff", 0.2),
    setAlpha("#000000", 0),
    3,
    12
  );
  ctx.fillRect(0, 0, width, height);
  ctx.restore();

  if (/Cosmic|Interdimensional/i.test(hero.origin)) {
    drawStarfield(ctx, width, height, hero.accentColor);
  }

  if (/Technological/i.test(hero.origin)) {
    drawTechBackdrop(ctx, width, height, hero.secondaryColor);
  }

  ctx.save();
  const horizon = height * 0.72;
  const horizonGradient = ctx.createLinearGradient(0, horizon - 40, 0, horizon + 80);
  horizonGradient.addColorStop(0, setAlpha("#000000", 0));
  horizonGradient.addColorStop(0.6, setAlpha("#000000", 0.4));
  horizonGradient.addColorStop(1, setAlpha("#000000", 0.85));
  ctx.fillStyle = horizonGradient;
  ctx.fillRect(0, horizon - 40, width, 160);
  ctx.restore();
}

function drawBackdropLinework(ctx, width, height, hero, metrics) {
  drawPerspectiveCityGrid(ctx, width, height, hero, metrics);
  drawPerspectiveGround(ctx, width, height, hero, metrics);
  drawPanelSpeedlines(ctx, width, height, hero, metrics);
}

function drawPerspectiveCityGrid(ctx, width, height, hero, metrics) {
  ctx.save();
  const horizon = height * 0.68;
  const buildingCount = 7;
  const bandWidth = width / (buildingCount - 1);
  const baseCandidate = hero.secondaryColor || hero.primaryColor || "#555555";
  const baseColor =
    typeof baseCandidate === "string" && baseCandidate.trim().startsWith("#")
      ? baseCandidate
      : "#555555";

  for (let i = -1; i < buildingCount; i++) {
    const baseX = i * bandWidth * 0.85;
    const buildingHeight = metrics.figureHeight * (0.45 + ((i % 3) * 0.08 + 0.12));
    const skew = bandWidth * 0.18 * (i % 2 === 0 ? -1 : 1);
    const topWidth = bandWidth * (0.45 + ((i % 2) * 0.08));
    const path = new Path2D();
    path.moveTo(baseX, height);
    path.lineTo(baseX + bandWidth, height);
    path.lineTo(baseX + topWidth + skew, horizon - buildingHeight);
    path.lineTo(baseX + skew * 0.2, horizon - buildingHeight * 0.95);
    path.closePath();

    ctx.globalAlpha = 0.45;
    ctx.fillStyle = setAlpha(darkenColor(baseColor, 42 - (i % 4) * 8), 0.55);
    ctx.fill(path);

    ctx.globalAlpha = 0.9;
    ctx.lineWidth = metrics.inkWeight * 0.6;
    ctx.strokeStyle = setAlpha("#050209", 0.65);
    ctx.stroke(path);

    ctx.save();
    ctx.clip(path);
    ctx.lineWidth = metrics.inkWeight * 0.22;
    ctx.strokeStyle = setAlpha("#ffffff", 0.16);
    const rows = 6;
    for (let r = 1; r < rows; r++) {
      const y = height - (buildingHeight * r) / rows;
      ctx.beginPath();
      ctx.moveTo(baseX - bandWidth * 0.15, y);
      ctx.lineTo(baseX + bandWidth * 1.1, y - skew * 0.18);
      ctx.stroke();
    }
    const columns = 3;
    for (let c = 1; c < columns; c++) {
      const x = baseX + (bandWidth * c) / columns;
      ctx.beginPath();
      ctx.moveTo(x, height);
      ctx.lineTo(x + skew * 0.6, horizon - buildingHeight * 0.92);
      ctx.strokeStyle = setAlpha("#050209", 0.18);
      ctx.stroke();
    }
    ctx.restore();
  }
  ctx.restore();
}

function drawPerspectiveGround(ctx, width, height, hero, metrics) {
  ctx.save();
  const vanishX = width / 2 + metrics.shoulderWidth * 0.2;
  const vanishY = metrics.baseY - metrics.figureHeight * 0.35;
  ctx.lineWidth = metrics.inkWeight * 0.3;
  ctx.strokeStyle = setAlpha("#050209", 0.28);
  for (let i = -8; i <= 8; i++) {
    ctx.beginPath();
    ctx.moveTo(i * width * 0.12, height);
    ctx.lineTo(vanishX + i * 4, vanishY);
    ctx.stroke();
  }

  ctx.strokeStyle = setAlpha("#ffffff", 0.12);
  const lanes = 4;
  for (let l = 1; l <= lanes; l++) {
    const t = l / (lanes + 1);
    const y = metrics.baseY + metrics.figureHeight * 0.1 * l;
    ctx.beginPath();
    ctx.moveTo(-width * 0.2, y);
    ctx.quadraticCurveTo(vanishX, vanishY + metrics.figureHeight * 0.15 * t, width * 1.2, y);
    ctx.stroke();
  }

  ctx.restore();
}

function drawPanelSpeedlines(ctx, width, height, hero, metrics) {
  ctx.save();
  ctx.globalAlpha = 0.35;
  const accentCandidate = hero.accentColor || hero.primaryColor || "#ffffff";
  const accent =
    typeof accentCandidate === "string" && accentCandidate.trim().startsWith("#")
      ? accentCandidate
      : "#ffffff";
  ctx.strokeStyle = setAlpha(adjustColor(accent, -20), 0.45);
  ctx.lineWidth = metrics.inkWeight * 0.45;
  const vanishX = metrics.centerX;
  const vanishY = metrics.baseY - metrics.figureHeight * 0.55;
  for (let i = 0; i < 7; i++) {
    const offset = i / 6;
    ctx.beginPath();
    ctx.moveTo(-width * 0.05, height * (0.12 + offset * 0.45));
    ctx.lineTo(vanishX - metrics.shoulderWidth * 0.6 + offset * metrics.shoulderWidth * 0.9, vanishY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width * 1.05, height * (0.12 + offset * 0.45));
    ctx.lineTo(vanishX + metrics.shoulderWidth * 0.6 - offset * metrics.shoulderWidth * 0.9, vanishY);
    ctx.stroke();
  }
  ctx.restore();
}

function drawPresetBackdrop(ctx, width, height, hero, metrics) {
  switch (hero.presetKey) {
    case "cosmic-guardian":
      drawCosmicBackdrop(ctx, width, height, hero, metrics);
      break;
    case "neon-rogue":
      drawNeonBackdrop(ctx, width, height, hero, metrics);
      break;
    case "mythic-sorcerer":
      drawMythicBackdrop(ctx, width, height, hero, metrics);
      break;
    case "shadow-operative":
      drawShadowBackdrop(ctx, width, height, hero, metrics);
      break;
    case "atomic-sentinel":
      drawAtomicBackdrop(ctx, width, height, hero, metrics);
      break;
    default:
      break;
  }
}

function drawPresetForeground(ctx, metrics, hero, width, height) {
  switch (hero.presetKey) {
    case "cosmic-guardian":
      drawCosmicForeground(ctx, metrics, hero);
      break;
    case "neon-rogue":
      drawNeonForeground(ctx, metrics, hero, width, height);
      break;
    case "mythic-sorcerer":
      drawMythicForeground(ctx, metrics, hero);
      break;
    case "shadow-operative":
      drawShadowForeground(ctx, metrics, hero, width, height);
      break;
    case "atomic-sentinel":
      drawAtomicForeground(ctx, metrics, hero);
      break;
    default:
      break;
  }
}

function drawCosmicBackdrop(ctx, width, height, hero, metrics) {
  ctx.save();
  const auraY = metrics.baseY - metrics.figureHeight * 0.62;
  const auraRadius = metrics.figureHeight * 0.86;
  const gradient = ctx.createRadialGradient(
    metrics.centerX,
    auraY,
    auraRadius * 0.15,
    metrics.centerX,
    auraY,
    auraRadius
  );
  gradient.addColorStop(0, setAlpha(hero.accentColor, 0.55));
  gradient.addColorStop(0.55, setAlpha(hero.primaryColor, 0.18));
  gradient.addColorStop(1, setAlpha("#02020f", 0));
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.ellipse(metrics.centerX, auraY, auraRadius * 0.92, auraRadius * 0.78, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.translate(metrics.centerX, auraY);
  ctx.globalAlpha = 0.55;
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.rotate((Math.PI / 8) * i);
    ctx.strokeStyle = setAlpha(hero.secondaryColor, 0.5 - i * 0.08);
    ctx.lineWidth = metrics.inkWeight * (1.2 - i * 0.15);
    ctx.ellipse(0, 0, auraRadius * (0.55 + i * 0.12), auraRadius * (0.32 + i * 0.08), 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.3;
  for (let i = 0; i < 40; i++) {
    const angle = (Math.PI * 2 * i) / 40;
    const orbitRadius = auraRadius * (0.35 + (i % 5) * 0.05);
    const x = metrics.centerX + Math.cos(angle) * orbitRadius;
    const y = auraY + Math.sin(angle) * orbitRadius * 0.72;
    const size = (i % 7) * 0.8 + 1.5;
    ctx.beginPath();
    ctx.fillStyle = setAlpha(hero.accentColor, 0.5);
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawCosmicForeground(ctx, metrics, hero) {
  ctx.save();
  ctx.translate(metrics.centerX, metrics.baseY - metrics.figureHeight * 0.54);
  ctx.globalAlpha = 0.7;
  for (let i = 0; i < 5; i++) {
    const rotation = (Math.PI * i) / 5;
    ctx.save();
    ctx.rotate(rotation);
    ctx.beginPath();
    ctx.strokeStyle = setAlpha(hero.accentColor, 0.55 - i * 0.08);
    ctx.lineWidth = metrics.inkWeight * 0.7;
    ctx.moveTo(metrics.figureHeight * 0.05, 0);
    ctx.quadraticCurveTo(
      metrics.figureHeight * 0.28,
      -metrics.figureHeight * 0.1,
      metrics.figureHeight * 0.36,
      0
    );
    ctx.stroke();
    ctx.restore();
  }

  ctx.globalAlpha = 0.65;
  for (let i = 0; i < 20; i++) {
    const angle = (Math.PI * 2 * i) / 20;
    const radius = metrics.figureHeight * (0.2 + (i % 4) * 0.05);
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius * 0.6;
    ctx.beginPath();
    ctx.fillStyle = setAlpha(hero.secondaryColor, 0.4);
    ctx.arc(x, y, metrics.figureHeight * 0.015 * ((i % 3) + 1), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawNeonBackdrop(ctx, width, height, hero, metrics) {
  const horizon = height * 0.74;
  ctx.save();
  ctx.globalAlpha = 0.85;
  for (let i = -1; i < 9; i++) {
    const buildingWidth = width / 8;
    const x = i * buildingWidth + Math.random() * 18 - 9;
    const buildingHeight = metrics.figureHeight * (0.6 + Math.random() * 0.6);
    ctx.fillStyle = setAlpha(hero.secondaryColor, 0.9);
    ctx.fillRect(x, horizon - buildingHeight, buildingWidth * 0.9, buildingHeight);

    ctx.fillStyle = setAlpha(hero.accentColor, 0.45);
    const windowCount = 6;
    for (let w = 0; w < windowCount; w++) {
      const wx = x + buildingWidth * 0.15 + (w % 2) * buildingWidth * 0.35;
      const wy = horizon - buildingHeight + (w + 1) * (buildingHeight / (windowCount + 1));
      ctx.fillRect(wx, wy, buildingWidth * 0.18, buildingHeight * 0.03);
    }
  }
  ctx.restore();

  ctx.save();
  ctx.beginPath();
  ctx.rect(0, horizon, width, height - horizon);
  ctx.clip();
  ctx.globalAlpha = 0.6;
  ctx.strokeStyle = setAlpha(hero.primaryColor, 0.45);
  ctx.lineWidth = 1.5;
  for (let i = 1; i < 8; i++) {
    const y = horizon + i * metrics.figureHeight * 0.08;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  ctx.strokeStyle = setAlpha(hero.accentColor, 0.35);
  for (let i = -6; i <= 6; i++) {
    ctx.beginPath();
    ctx.moveTo(metrics.centerX + i * metrics.figureHeight * 0.18, horizon);
    ctx.lineTo(metrics.centerX + i * metrics.figureHeight * 0.05, height);
    ctx.stroke();
  }
  ctx.restore();
}

function drawNeonForeground(ctx, metrics, hero, width, height) {
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.strokeStyle = setAlpha(hero.accentColor, 0.65);
  ctx.lineWidth = metrics.inkWeight * 0.7;
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    const offset = (i - 3) * metrics.figureHeight * 0.08;
    ctx.moveTo(metrics.centerX + offset, metrics.baseY - metrics.figureHeight * 0.78);
    ctx.quadraticCurveTo(
      metrics.centerX + offset * 1.4,
      metrics.baseY - metrics.figureHeight * 0.4,
      metrics.centerX + offset * 0.3,
      metrics.baseY - metrics.figureHeight * 0.05
    );
    ctx.stroke();
  }

  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = setAlpha(hero.secondaryColor, 0.4);
  for (let i = 0; i < 18; i++) {
    const x = metrics.centerX + (Math.random() - 0.5) * metrics.shoulderWidth * 2.4;
    const y = metrics.baseY - Math.random() * metrics.figureHeight * 0.9;
    const widthPulse = metrics.figureHeight * 0.05 * Math.random();
    const heightPulse = metrics.figureHeight * 0.12 * Math.random();
    ctx.fillRect(x, y, widthPulse, heightPulse);
  }
  ctx.restore();
}

function drawMythicBackdrop(ctx, width, height, hero, metrics) {
  ctx.save();
  ctx.translate(metrics.centerX, metrics.baseY - metrics.figureHeight * 0.58);
  const radius = metrics.figureHeight * 0.68;
  const gradient = ctx.createRadialGradient(0, 0, radius * 0.1, 0, 0, radius);
  gradient.addColorStop(0, setAlpha(hero.accentColor, 0.65));
  gradient.addColorStop(0.6, setAlpha(hero.secondaryColor, 0.22));
  gradient.addColorStop(1, setAlpha("#120620", 0));
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = setAlpha(hero.secondaryColor, 0.75);
  ctx.lineWidth = metrics.inkWeight * 0.8;
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.arc(0, 0, radius * (0.55 + i * 0.15), 0, Math.PI * 2);
    ctx.stroke();
  }

  const glyphs = ["✧", "☉", "✴", "☽", "❂", "✦"];
  ctx.fillStyle = setAlpha(hero.accentColor, 0.8);
  ctx.font = `600 ${Math.round(metrics.figureHeight * 0.08)}px 'Bangers', sans-serif`;
  for (let i = 0; i < glyphs.length; i++) {
    const angle = (Math.PI * 2 * i) / glyphs.length;
    const glyphRadius = radius * 0.72;
    ctx.save();
    ctx.rotate(angle);
    ctx.fillText(glyphs[i], glyphRadius - radius * 0.05, 0);
    ctx.restore();
  }
  ctx.restore();
}

function drawMythicForeground(ctx, metrics, hero) {
  ctx.save();
  ctx.translate(metrics.centerX, metrics.baseY - metrics.figureHeight * 0.4);
  ctx.fillStyle = setAlpha(hero.accentColor, 0.6);
  for (let i = 0; i < 12; i++) {
    const angle = (Math.PI * 2 * i) / 12;
    const distance = metrics.figureHeight * 0.4;
    const x = Math.cos(angle) * distance * 0.4;
    const y = Math.sin(angle) * distance * 0.4;
    ctx.beginPath();
    ctx.arc(x, y, metrics.figureHeight * 0.025, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.strokeStyle = setAlpha(hero.secondaryColor, 0.7);
  ctx.lineWidth = metrics.inkWeight * 0.6;
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    const outerRadius = metrics.figureHeight * 0.45;
    const startAngle = (Math.PI * 2 * i) / 6;
    ctx.arc(0, 0, outerRadius, startAngle, startAngle + Math.PI * 0.2);
    ctx.stroke();
  }
  ctx.restore();
}

function drawShadowBackdrop(ctx, width, height, hero, metrics) {
  ctx.save();
  const spotlight = ctx.createRadialGradient(
    metrics.centerX,
    metrics.baseY - metrics.figureHeight * 0.85,
    metrics.figureHeight * 0.2,
    metrics.centerX,
    metrics.baseY,
    metrics.figureHeight * 1.6
  );
  spotlight.addColorStop(0, setAlpha(hero.secondaryColor, 0.45));
  spotlight.addColorStop(0.4, setAlpha(hero.secondaryColor, 0.18));
  spotlight.addColorStop(1, setAlpha("#020109", 0));
  ctx.fillStyle = spotlight;
  ctx.fillRect(0, 0, width, height);

  ctx.globalAlpha = 0.8;
  ctx.fillStyle = setAlpha(hero.primaryColor, 0.85);
  const baseY = metrics.baseY + metrics.figureHeight * 0.15;
  for (let i = -2; i < 10; i++) {
    const buildingWidth = width / 9;
    const buildingHeight = metrics.figureHeight * (0.7 + Math.random() * 0.5);
    const x = i * buildingWidth + Math.random() * 12;
    ctx.fillRect(x, baseY - buildingHeight, buildingWidth * 0.9, buildingHeight);
  }
  ctx.restore();
}

function drawShadowForeground(ctx, metrics, hero, width, height) {
  ctx.save();
  ctx.strokeStyle = setAlpha(hero.secondaryColor, 0.4);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(
    metrics.centerX,
    metrics.baseY - metrics.figureHeight * 0.55,
    metrics.figureHeight * 0.5,
    metrics.figureHeight * 0.32,
    0,
    0,
    Math.PI * 2
  );
  ctx.stroke();

  ctx.globalAlpha = 0.55;
  ctx.strokeStyle = setAlpha("#a6b7ff", 0.45);
  ctx.lineWidth = 1.2;
  const rainLines = 60;
  for (let i = 0; i < rainLines; i++) {
    const startX = Math.random() * width;
    const startY = Math.random() * height * 0.9;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX - 6, startY + 18);
    ctx.stroke();
  }
  ctx.restore();
}

function drawAtomicBackdrop(ctx, width, height, hero, metrics) {
  ctx.save();
  ctx.globalAlpha = 0.6;
  const stripeHeight = metrics.figureHeight * 0.22;
  for (let i = -2; i < 8; i++) {
    ctx.beginPath();
    const y1 = height * 0.58 + stripeHeight * i;
    const y2 = y1 - stripeHeight * 0.6;
    ctx.moveTo(-width * 0.1, y1);
    ctx.lineTo(width * 1.1, y2);
    ctx.lineTo(width * 1.1, y2 + stripeHeight);
    ctx.lineTo(-width * 0.1, y1 + stripeHeight);
    ctx.closePath();
    ctx.fillStyle = i % 2 === 0 ? setAlpha(hero.accentColor, 0.32) : setAlpha(hero.secondaryColor, 0.28);
    ctx.fill();
  }
  ctx.restore();

  ctx.save();
  const coreY = metrics.baseY - metrics.figureHeight * 0.6;
  const coreRadius = metrics.figureHeight * 0.7;
  const coreGradient = ctx.createRadialGradient(
    metrics.centerX,
    coreY,
    coreRadius * 0.15,
    metrics.centerX,
    coreY,
    coreRadius
  );
  coreGradient.addColorStop(0, setAlpha(hero.accentColor, 0.6));
  coreGradient.addColorStop(0.5, setAlpha(hero.primaryColor, 0.25));
  coreGradient.addColorStop(1, setAlpha("#120500", 0));
  ctx.fillStyle = coreGradient;
  ctx.beginPath();
  ctx.ellipse(metrics.centerX, coreY, coreRadius * 0.95, coreRadius * 0.82, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawAtomicForeground(ctx, metrics, hero) {
  ctx.save();
  ctx.translate(metrics.centerX, metrics.baseY - metrics.figureHeight * 0.5);
  ctx.rotate(-0.2);
  ctx.strokeStyle = setAlpha(hero.accentColor, 0.7);
  ctx.lineWidth = metrics.inkWeight * 0.9;
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    const radius = metrics.figureHeight * (0.35 + i * 0.08);
    ctx.ellipse(0, 0, radius * 1.1, radius * 0.45, i * 0.6, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.globalAlpha = 0.6;
  for (let i = 0; i < 16; i++) {
    ctx.beginPath();
    const angle = (Math.PI * 2 * i) / 16;
    const radius = metrics.figureHeight * 0.5;
    ctx.moveTo(Math.cos(angle) * radius * 0.2, Math.sin(angle) * radius * 0.2);
    ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
    ctx.strokeStyle = setAlpha(hero.primaryColor, 0.5);
    ctx.lineWidth = metrics.inkWeight * 0.5;
    ctx.stroke();
  }

  ctx.fillStyle = setAlpha(hero.accentColor, 0.6);
  for (let i = 0; i < 10; i++) {
    const angle = (Math.PI * 2 * i) / 10;
    const radius = metrics.figureHeight * (0.25 + (i % 5) * 0.04);
    ctx.beginPath();
    ctx.arc(Math.cos(angle) * radius, Math.sin(angle) * radius, metrics.figureHeight * 0.02, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawSunburst(ctx, width, height, accent) {
  ctx.save();
  ctx.globalAlpha = 0.4;
  ctx.translate(width / 2, height * 0.28);
  const rays = 28;
  ctx.strokeStyle = setAlpha(adjustColor(accent, 40), 0.35);
  ctx.lineWidth = 3;
  for (let i = 0; i < rays; i++) {
    ctx.beginPath();
    const angle = (Math.PI * 2 * i) / rays;
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(angle) * width * 0.7, Math.sin(angle) * height * 0.6);
    ctx.stroke();
  }
  ctx.restore();
}

function drawGroundShadow(ctx, metrics, overrides = {}) {
  const centerX = overrides.centerX ?? metrics.centerX;
  const baseY = overrides.baseY ?? metrics.baseY + metrics.figureHeight * 0.02;
  const width = overrides.width ?? metrics.figureHeight * 0.32;
  const height = overrides.height ?? metrics.figureHeight * 0.12;
  ctx.save();
  ctx.fillStyle = setAlpha("#000000", 0.42);
  ctx.beginPath();
  ctx.ellipse(centerX, baseY, width, height, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawDrapedCape(ctx, metrics, color, jagged) {
  ctx.save();
  const capeTop = metrics.topY + metrics.figureHeight * 0.12;
  const capeBottom = metrics.baseY + metrics.figureHeight * 0.18;
  const capeWidth = metrics.figureHeight * 0.78;
  const gradient = ctx.createLinearGradient(metrics.centerX, capeTop, metrics.centerX, capeBottom);
  gradient.addColorStop(0, adjustColor(color, 45));
  gradient.addColorStop(0.5, color);
  gradient.addColorStop(1, adjustColor(color, -55));
  const capePath = new Path2D();
  capePath.moveTo(metrics.centerX - capeWidth * 0.4, capeTop);
  capePath.quadraticCurveTo(
    metrics.centerX - capeWidth * 0.7,
    metrics.baseY - metrics.figureHeight * 0.1,
    metrics.centerX - capeWidth * 0.45,
    capeBottom
  );
  if (jagged) {
    const segments = 6;
    for (let i = 0; i < segments; i++) {
      const t = i / segments;
      const x = metrics.centerX - capeWidth * 0.45 + capeWidth * 0.9 * t;
      const peak = capeBottom + (i % 2 === 0 ? 14 : -12);
      capePath.lineTo(x, peak);
    }
  } else {
    capePath.lineTo(metrics.centerX + capeWidth * 0.45, capeBottom);
  }
  capePath.quadraticCurveTo(
    metrics.centerX + capeWidth * 0.7,
    metrics.baseY - metrics.figureHeight * 0.08,
    metrics.centerX + capeWidth * 0.4,
    capeTop
  );
  capePath.closePath();

  ctx.fillStyle = gradient;
  ctx.fill(capePath);
  ctx.lineWidth = metrics.inkWeight * 0.9;
  ctx.strokeStyle = setAlpha("#050209", 0.9);
  ctx.stroke(capePath);

  ctx.save();
  ctx.clip(capePath);
  drawCrosshatchTexture(
    ctx,
    metrics.centerX - capeWidth * 0.55,
    capeTop,
    capeWidth * 1.1,
    capeBottom - capeTop,
    {
      spacing: metrics.figureHeight * 0.06,
      weight: metrics.inkWeight * 0.18,
      alpha: 0.14,
    }
  );
  ctx.restore();

  ctx.restore();
}

function drawLeg(ctx, metrics, hero, side) {
  const direction = side === "left" ? -1 : 1;
  const hipX = metrics.centerX + (metrics.hipWidth / 2) * direction;
  const kneeX = hipX + metrics.limbWidth * 0.4 * direction;
  const kneeY = metrics.baseY - metrics.figureHeight * 0.22;
  const ankleX = hipX + metrics.limbWidth * 0.55 * direction;
  const ankleY = metrics.baseY - metrics.bootHeight;

  ctx.save();
  const legPath = new Path2D();
  legPath.moveTo(hipX, metrics.hipY);
  legPath.quadraticCurveTo(
    hipX + metrics.limbWidth * 0.35 * direction,
    metrics.hipY + metrics.figureHeight * 0.12,
    kneeX,
    kneeY
  );
  legPath.quadraticCurveTo(
    kneeX + metrics.limbWidth * 0.25 * direction,
    kneeY + metrics.figureHeight * 0.08,
    ankleX,
    ankleY
  );
  legPath.lineTo(ankleX + metrics.limbWidth * 0.22 * direction, metrics.baseY);
  legPath.lineTo(hipX - metrics.limbWidth * 0.55 * direction, metrics.baseY);
  legPath.lineTo(hipX - metrics.limbWidth * 0.2 * direction, ankleY);
  legPath.quadraticCurveTo(
    hipX - metrics.limbWidth * 0.3 * direction,
    kneeY + metrics.figureHeight * 0.08,
    hipX - metrics.limbWidth * 0.05 * direction,
    kneeY
  );
  legPath.quadraticCurveTo(
    hipX - metrics.limbWidth * 0.1 * direction,
    metrics.hipY + metrics.figureHeight * 0.1,
    hipX,
    metrics.hipY
  );
  legPath.closePath();

  const legGradient = ctx.createLinearGradient(hipX, metrics.hipY, hipX, metrics.baseY);
  legGradient.addColorStop(0, adjustColor(hero.primaryColor, 18));
  legGradient.addColorStop(0.45, hero.primaryColor);
  legGradient.addColorStop(1, adjustColor(hero.primaryColor, -45));
  ctx.fillStyle = legGradient;
  ctx.fill(legPath);
  ctx.lineWidth = metrics.inkWeight;
  ctx.strokeStyle = "#050209";
  ctx.stroke(legPath);

  ctx.save();
  ctx.clip(legPath);
  ctx.globalAlpha = 0.25;
  ctx.fillStyle = createHalftonePattern(
    ctx,
    setAlpha("#000000", 0.7),
    setAlpha("#000000", 0),
    2,
    8
  );
  ctx.fillRect(hipX - metrics.figureHeight, metrics.hipY, metrics.figureHeight * 2, metrics.figureHeight);
  ctx.globalAlpha = 1;
  ctx.beginPath();
  ctx.moveTo(hipX + metrics.limbWidth * 0.25 * direction, kneeY - metrics.figureHeight * 0.05);
  ctx.quadraticCurveTo(
    hipX + metrics.limbWidth * 0.5 * direction,
    metrics.hipY + metrics.figureHeight * 0.22,
    hipX + metrics.limbWidth * 0.1 * direction,
    metrics.hipY + metrics.figureHeight * 0.28
  );
  ctx.strokeStyle = setAlpha("#050209", 0.55);
  ctx.lineWidth = metrics.inkWeight * 0.45;
  ctx.stroke();
  drawCrosshatchTexture(
    ctx,
    hipX - metrics.limbWidth * 0.9,
    metrics.hipY,
    metrics.limbWidth * 1.8,
    metrics.figureHeight * 0.6,
    {
      spacing: metrics.figureHeight * 0.045,
      weight: metrics.inkWeight * 0.16,
      alpha: 0.18,
    }
  );
  ctx.restore();

  ctx.save();
  ctx.clip(legPath);
  ctx.beginPath();
  ctx.moveTo(hipX - metrics.limbWidth * 0.25 * direction, kneeY + metrics.figureHeight * 0.05);
  ctx.quadraticCurveTo(
    hipX - metrics.limbWidth * 0.45 * direction,
    kneeY + metrics.figureHeight * 0.16,
    ankleX - metrics.limbWidth * 0.18 * direction,
    ankleY + metrics.figureHeight * 0.05
  );
  ctx.strokeStyle = setAlpha("#ffffff", 0.28);
  ctx.lineWidth = metrics.inkWeight * 0.35;
  ctx.stroke();
  ctx.restore();

  const bootPath = new Path2D();
  bootPath.moveTo(hipX - metrics.limbWidth * 0.4 * direction, ankleY);
  bootPath.lineTo(ankleX + metrics.limbWidth * 0.4 * direction, ankleY);
  bootPath.lineTo(ankleX + metrics.limbWidth * 0.55 * direction, metrics.baseY);
  bootPath.lineTo(hipX - metrics.limbWidth * 0.65 * direction, metrics.baseY);
  bootPath.closePath();
  const bootGradient = ctx.createLinearGradient(
    hipX,
    ankleY,
    hipX,
    metrics.baseY + metrics.bootHeight * 0.25
  );
  bootGradient.addColorStop(0, adjustColor(hero.secondaryColor, 20));
  bootGradient.addColorStop(1, adjustColor(hero.secondaryColor, -35));
  ctx.fillStyle = bootGradient;
  ctx.fill(bootPath);
  ctx.lineWidth = metrics.inkWeight * 0.95;
  ctx.strokeStyle = "#050209";
  ctx.stroke(bootPath);

  ctx.save();
  ctx.clip(bootPath);
  ctx.globalAlpha = 0.3;
  ctx.fillStyle = createHalftonePattern(
    ctx,
    setAlpha("#ffffff", 0.25),
    setAlpha("#000000", 0),
    2,
    7
  );
  ctx.fillRect(
    hipX - metrics.limbWidth * 0.8,
    ankleY - metrics.bootHeight * 0.4,
    metrics.limbWidth * 1.6,
    metrics.bootHeight * 1.5
  );
  ctx.restore();

  ctx.beginPath();
  ctx.moveTo(hipX - metrics.limbWidth * 0.2 * direction, ankleY - metrics.bootHeight * 0.2);
  ctx.quadraticCurveTo(
    hipX + metrics.limbWidth * 0.3 * direction,
    ankleY - metrics.bootHeight * 0.5,
    ankleX,
    ankleY - metrics.bootHeight * 0.25
  );
  ctx.strokeStyle = setAlpha("#ffffff", 0.45);
  ctx.lineWidth = metrics.inkWeight * 0.4;
  ctx.stroke();
  ctx.restore();
}

function drawTorso(ctx, metrics, hero) {
  const leftShoulderX = metrics.centerX - metrics.shoulderWidth / 2;
  const rightShoulderX = metrics.centerX + metrics.shoulderWidth / 2;

  ctx.save();
  const torsoPath = new Path2D();
  torsoPath.moveTo(leftShoulderX, metrics.shoulderY);
  torsoPath.quadraticCurveTo(
    metrics.centerX,
    metrics.shoulderY - metrics.figureHeight * 0.08,
    rightShoulderX,
    metrics.shoulderY
  );
  torsoPath.quadraticCurveTo(
    metrics.centerX + metrics.shoulderWidth * 0.55,
    metrics.shoulderY + metrics.torsoHeight * 0.4,
    metrics.centerX + metrics.waistWidth / 2,
    metrics.waistY
  );
  torsoPath.quadraticCurveTo(
    metrics.centerX + metrics.waistWidth * 0.3,
    metrics.waistY + metrics.figureHeight * 0.06,
    metrics.centerX + metrics.hipWidth / 2,
    metrics.hipY
  );
  torsoPath.lineTo(metrics.centerX - metrics.hipWidth / 2, metrics.hipY);
  torsoPath.quadraticCurveTo(
    metrics.centerX - metrics.waistWidth * 0.3,
    metrics.waistY + metrics.figureHeight * 0.06,
    metrics.centerX - metrics.waistWidth / 2,
    metrics.waistY
  );
  torsoPath.quadraticCurveTo(
    metrics.centerX - metrics.shoulderWidth * 0.55,
    metrics.shoulderY + metrics.torsoHeight * 0.4,
    leftShoulderX,
    metrics.shoulderY
  );
  torsoPath.closePath();

  const torsoGradient = ctx.createLinearGradient(
    metrics.centerX,
    metrics.shoulderY,
    metrics.centerX,
    metrics.hipY
  );
  torsoGradient.addColorStop(0, adjustColor(hero.primaryColor, 30));
  torsoGradient.addColorStop(0.5, hero.primaryColor);
  torsoGradient.addColorStop(1, adjustColor(hero.primaryColor, -40));
  ctx.fillStyle = torsoGradient;
  ctx.fill(torsoPath);
  ctx.lineWidth = metrics.inkWeight;
  ctx.strokeStyle = "#050209";
  ctx.stroke(torsoPath);

  ctx.save();
  ctx.clip(torsoPath);
  ctx.globalAlpha = 0.22;
  ctx.fillStyle = createHalftonePattern(
    ctx,
    setAlpha("#ffffff", 0.22),
    setAlpha("#000000", 0),
    2,
    10
  );
  ctx.fillRect(
    metrics.centerX,
    metrics.shoulderY,
    metrics.shoulderWidth,
    metrics.figureHeight * 0.65
  );
  ctx.globalAlpha = 1;
  ctx.beginPath();
  ctx.moveTo(metrics.centerX, metrics.shoulderY + metrics.torsoHeight * 0.12);
  ctx.quadraticCurveTo(
    metrics.centerX + metrics.shoulderWidth * 0.35,
    metrics.shoulderY + metrics.torsoHeight * 0.2,
    metrics.centerX,
    metrics.shoulderY + metrics.torsoHeight * 0.32
  );
  ctx.strokeStyle = setAlpha("#050209", 0.6);
  ctx.lineWidth = metrics.inkWeight * 0.55;
  ctx.stroke();
  for (let i = 1; i <= 3; i++) {
    ctx.beginPath();
    const y = metrics.waistY - metrics.figureHeight * 0.04 + i * metrics.figureHeight * 0.045;
    ctx.moveTo(metrics.centerX - metrics.waistWidth * 0.22, y);
    ctx.quadraticCurveTo(
      metrics.centerX,
      y + metrics.figureHeight * 0.015,
      metrics.centerX + metrics.waistWidth * 0.22,
      y
    );
    ctx.strokeStyle = setAlpha("#050209", 0.45 - i * 0.06);
    ctx.lineWidth = metrics.inkWeight * 0.4;
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.moveTo(metrics.centerX - metrics.shoulderWidth * 0.3, metrics.shoulderY + metrics.torsoHeight * 0.18);
  ctx.quadraticCurveTo(
    metrics.centerX - metrics.waistWidth * 0.4,
    metrics.waistY,
    metrics.centerX - metrics.waistWidth * 0.25,
    metrics.waistY + metrics.figureHeight * 0.06
  );
  ctx.moveTo(metrics.centerX + metrics.shoulderWidth * 0.3, metrics.shoulderY + metrics.torsoHeight * 0.18);
  ctx.quadraticCurveTo(
    metrics.centerX + metrics.waistWidth * 0.4,
    metrics.waistY,
    metrics.centerX + metrics.waistWidth * 0.25,
    metrics.waistY + metrics.figureHeight * 0.06
  );
  ctx.strokeStyle = setAlpha("#050209", 0.5);
  ctx.lineWidth = metrics.inkWeight * 0.38;
  ctx.stroke();
  drawCrosshatchTexture(
    ctx,
    metrics.centerX - metrics.shoulderWidth * 0.8,
    metrics.shoulderY,
    metrics.shoulderWidth * 1.6,
    metrics.figureHeight * 0.72,
    {
      spacing: metrics.figureHeight * 0.05,
      weight: metrics.inkWeight * 0.16,
      alpha: 0.16,
    }
  );
  ctx.restore();

  ctx.save();
  ctx.clip(torsoPath);
  ctx.globalAlpha = 0.28;
  ctx.beginPath();
  ctx.moveTo(metrics.centerX + metrics.shoulderWidth * 0.4, metrics.shoulderY + metrics.figureHeight * 0.08);
  ctx.quadraticCurveTo(
    metrics.centerX + metrics.shoulderWidth * 0.65,
    metrics.shoulderY + metrics.figureHeight * 0.28,
    metrics.centerX + metrics.waistWidth * 0.4,
    metrics.waistY
  );
  ctx.lineTo(metrics.centerX + metrics.waistWidth * 0.2, metrics.waistY + metrics.figureHeight * 0.08);
  ctx.quadraticCurveTo(
    metrics.centerX + metrics.shoulderWidth * 0.28,
    metrics.shoulderY + metrics.figureHeight * 0.18,
    metrics.centerX + metrics.shoulderWidth * 0.32,
    metrics.shoulderY + metrics.figureHeight * 0.05
  );
  ctx.closePath();
  ctx.fillStyle = setAlpha("#ffffff", 0.35);
  ctx.fill();
  ctx.restore();

  const beltY = metrics.waistY + metrics.figureHeight * 0.02;
  const beltHeight = metrics.figureHeight * 0.06;
  const beltX = metrics.centerX - metrics.waistWidth * 0.85;
  const beltWidth = metrics.waistWidth * 1.7;
  const beltGradient = ctx.createLinearGradient(
    metrics.centerX,
    beltY,
    metrics.centerX,
    beltY + beltHeight
  );
  beltGradient.addColorStop(0, adjustColor(hero.secondaryColor, 25));
  beltGradient.addColorStop(1, adjustColor(hero.secondaryColor, -20));
  ctx.fillStyle = beltGradient;
  ctx.fillRect(beltX, beltY, beltWidth, beltHeight);
  ctx.lineWidth = metrics.inkWeight * 0.8;
  ctx.strokeStyle = "#050209";
  ctx.strokeRect(beltX, beltY, beltWidth, beltHeight);

  const buckleWidth = metrics.waistWidth * 0.35;
  const buckleHeight = beltHeight * 0.7;
  const buckleX = metrics.centerX - buckleWidth / 2;
  const buckleY = beltY + (beltHeight - buckleHeight) / 2;
  ctx.fillStyle = adjustColor(hero.accentColor, 10);
  ctx.fillRect(buckleX, buckleY, buckleWidth, buckleHeight);
  ctx.strokeRect(buckleX, buckleY, buckleWidth, buckleHeight);

  ctx.save();
  ctx.translate(metrics.centerX, metrics.shoulderY + metrics.torsoHeight * 0.28);
  const emblemHeight = metrics.figureHeight * 0.12;
  const emblemWidth = metrics.shoulderWidth * 0.55;
  ctx.beginPath();
  ctx.moveTo(0, -emblemHeight / 2);
  ctx.quadraticCurveTo(emblemWidth / 2, -emblemHeight * 0.1, 0, emblemHeight / 2);
  ctx.quadraticCurveTo(-emblemWidth / 2, -emblemHeight * 0.1, 0, -emblemHeight / 2);
  ctx.closePath();
  ctx.fillStyle = hero.accentColor;
  ctx.fill();
  ctx.lineWidth = metrics.inkWeight * 0.75;
  ctx.strokeStyle = "#050209";
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, -emblemHeight * 0.45);
  ctx.lineTo(emblemWidth * 0.3, 0);
  ctx.lineTo(0, emblemHeight * 0.45);
  ctx.lineTo(-emblemWidth * 0.3, 0);
  ctx.closePath();
  ctx.fillStyle = setAlpha("#ffffff", 0.3);
  ctx.fill();
  ctx.restore();
  ctx.restore();
}

function drawArm(ctx, metrics, hero, side) {
  const direction = side === "left" ? -1 : 1;
  const shoulderX = metrics.centerX + (metrics.shoulderWidth / 2) * direction;
  const elbowX = shoulderX + metrics.limbWidth * 0.8 * direction;
  const elbowY = metrics.shoulderY + metrics.figureHeight * 0.16;
  const wristX = metrics.centerX + metrics.waistWidth * 0.75 * direction;
  const wristY = metrics.waistY + metrics.figureHeight * 0.02;
  const handY = wristY + metrics.gloveLength * 0.4;

  ctx.save();
  const armPath = new Path2D();
  armPath.moveTo(shoulderX, metrics.shoulderY);
  armPath.quadraticCurveTo(
    shoulderX + metrics.limbWidth * 0.4 * direction,
    metrics.shoulderY + metrics.figureHeight * 0.08,
    elbowX,
    elbowY
  );
  armPath.quadraticCurveTo(
    wristX,
    metrics.waistY - metrics.figureHeight * 0.04,
    wristX,
    wristY
  );
  armPath.lineTo(wristX - metrics.forearmWidth * direction, handY);
  armPath.quadraticCurveTo(
    elbowX - metrics.limbWidth * 0.4 * direction,
    elbowY + metrics.figureHeight * 0.04,
    shoulderX - metrics.limbWidth * 0.25 * direction,
    metrics.shoulderY + metrics.figureHeight * 0.06
  );
  armPath.closePath();

  const armGradient = ctx.createLinearGradient(
    shoulderX,
    metrics.shoulderY,
    wristX,
    wristY
  );
  armGradient.addColorStop(0, adjustColor(hero.primaryColor, 25));
  armGradient.addColorStop(0.6, hero.primaryColor);
  armGradient.addColorStop(1, adjustColor(hero.primaryColor, -32));
  ctx.fillStyle = armGradient;
  ctx.fill(armPath);
  ctx.lineWidth = metrics.inkWeight;
  ctx.strokeStyle = "#050209";
  ctx.stroke(armPath);

  ctx.save();
  ctx.clip(armPath);
  ctx.globalAlpha = 0.26;
  ctx.fillStyle = createHalftonePattern(
    ctx,
    setAlpha("#000000", 0.7),
    setAlpha("#000000", 0),
    2,
    8
  );
  ctx.fillRect(
    shoulderX - metrics.limbWidth,
    metrics.shoulderY,
    metrics.limbWidth * 2.2,
    metrics.figureHeight * 0.35
  );
  ctx.globalAlpha = 1;
  ctx.beginPath();
  ctx.moveTo(shoulderX + metrics.limbWidth * 0.25 * direction, metrics.shoulderY + metrics.figureHeight * 0.14);
  ctx.quadraticCurveTo(
    elbowX + metrics.limbWidth * 0.35 * direction,
    elbowY,
    wristX - metrics.forearmWidth * 0.35 * direction,
    wristY - metrics.gloveLength * 0.05
  );
  ctx.strokeStyle = setAlpha("#050209", 0.55);
  ctx.lineWidth = metrics.inkWeight * 0.45;
  ctx.stroke();
  drawCrosshatchTexture(
    ctx,
    shoulderX - metrics.limbWidth * 0.9,
    metrics.shoulderY,
    metrics.limbWidth * 1.8,
    metrics.figureHeight * 0.45,
    {
      spacing: metrics.figureHeight * 0.04,
      weight: metrics.inkWeight * 0.15,
      alpha: 0.18,
    }
  );
  ctx.restore();

  ctx.save();
  ctx.clip(armPath);
  ctx.beginPath();
  ctx.moveTo(shoulderX - metrics.limbWidth * 0.2 * direction, metrics.shoulderY + metrics.figureHeight * 0.05);
  ctx.quadraticCurveTo(
    elbowX - metrics.limbWidth * 0.22 * direction,
    elbowY,
    wristX - metrics.forearmWidth * 0.55 * direction,
    wristY + metrics.gloveLength * 0.1
  );
  ctx.strokeStyle = setAlpha("#ffffff", 0.32);
  ctx.lineWidth = metrics.inkWeight * 0.35;
  ctx.stroke();
  ctx.restore();

  const glovePath = new Path2D();
  glovePath.moveTo(wristX, wristY - metrics.gloveLength * 0.1);
  glovePath.lineTo(wristX + metrics.forearmWidth * 0.6 * direction, wristY + metrics.gloveLength * 0.4);
  glovePath.lineTo(wristX - metrics.forearmWidth * 0.2 * direction, handY + metrics.gloveLength * 0.5);
  glovePath.lineTo(wristX - metrics.forearmWidth * 0.9 * direction, wristY + metrics.gloveLength * 0.2);
  glovePath.closePath();
  const gloveGradient = ctx.createLinearGradient(
    wristX,
    wristY,
    wristX,
    handY + metrics.gloveLength * 0.5
  );
  gloveGradient.addColorStop(0, adjustColor(hero.secondaryColor, 28));
  gloveGradient.addColorStop(1, adjustColor(hero.secondaryColor, -25));
  ctx.fillStyle = gloveGradient;
  ctx.fill(glovePath);
  ctx.lineWidth = metrics.inkWeight * 0.9;
  ctx.strokeStyle = "#050209";
  ctx.stroke(glovePath);

  ctx.save();
  ctx.clip(glovePath);
  ctx.globalAlpha = 0.34;
  ctx.fillStyle = createHalftonePattern(
    ctx,
    setAlpha("#ffffff", 0.2),
    setAlpha("#000000", 0),
    2,
    7
  );
  ctx.fillRect(
    wristX - metrics.forearmWidth,
    wristY - metrics.gloveLength * 0.2,
    metrics.forearmWidth * 1.6,
    metrics.gloveLength * 1.4
  );
  ctx.restore();

  ctx.beginPath();
  ctx.moveTo(shoulderX, metrics.shoulderY + metrics.figureHeight * 0.03);
  ctx.quadraticCurveTo(
    elbowX + metrics.limbWidth * 0.1 * direction,
    elbowY,
    wristX - metrics.forearmWidth * 0.2 * direction,
    wristY - metrics.gloveLength * 0.2
  );
  ctx.strokeStyle = setAlpha("#ffffff", 0.38);
  ctx.lineWidth = metrics.inkWeight * 0.35;
  ctx.stroke();
  ctx.restore();
}

function drawHair(ctx, metrics, hero) {
  const hairColor = getHairColor(hero);
  if (!hairColor) {
    return;
  }

  const cheekWidth = metrics.shoulderWidth * 0.26;
  ctx.save();
  const hairPath = new Path2D();
  hairPath.moveTo(metrics.centerX - cheekWidth * 1.2, metrics.topY + metrics.headHeight * 0.28);
  hairPath.quadraticCurveTo(
    metrics.centerX - cheekWidth * 0.4,
    metrics.topY - metrics.headHeight * 0.55,
    metrics.centerX + cheekWidth * 0.6,
    metrics.topY - metrics.headHeight * 0.5
  );
  hairPath.quadraticCurveTo(
    metrics.centerX + cheekWidth * 1.35,
    metrics.topY + metrics.headHeight * 0.1,
    metrics.centerX + cheekWidth * 1.1,
    metrics.eyeY + metrics.headHeight * 0.26
  );
  hairPath.quadraticCurveTo(
    metrics.centerX + cheekWidth * 0.4,
    metrics.eyeY + metrics.headHeight * 0.55,
    metrics.centerX - cheekWidth * 0.9,
    metrics.eyeY + metrics.headHeight * 0.32
  );
  hairPath.quadraticCurveTo(
    metrics.centerX - cheekWidth * 1.3,
    metrics.topY + metrics.headHeight * 0.46,
    metrics.centerX - cheekWidth * 1.2,
    metrics.topY + metrics.headHeight * 0.28
  );
  hairPath.closePath();

  const gradient = ctx.createLinearGradient(
    metrics.centerX,
    metrics.topY - metrics.headHeight * 0.6,
    metrics.centerX,
    metrics.eyeY + metrics.headHeight * 0.55
  );
  gradient.addColorStop(0, adjustColor(hairColor, 40));
  gradient.addColorStop(0.5, hairColor);
  gradient.addColorStop(1, adjustColor(hairColor, -45));

  ctx.fillStyle = gradient;
  ctx.fill(hairPath);
  ctx.lineWidth = metrics.inkWeight * 1.05;
  ctx.strokeStyle = "#050209";
  ctx.stroke(hairPath);

  ctx.beginPath();
  ctx.moveTo(metrics.centerX + cheekWidth * 0.45, metrics.topY - metrics.headHeight * 0.35);
  ctx.quadraticCurveTo(
    metrics.centerX + cheekWidth * 0.2,
    metrics.topY - metrics.headHeight * 0.15,
    metrics.centerX + cheekWidth * 0.7,
    metrics.topY + metrics.headHeight * 0.05
  );
  ctx.strokeStyle = setAlpha("#ffffff", 0.35);
  ctx.lineWidth = metrics.inkWeight * 0.45;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(metrics.centerX - cheekWidth * 0.9, metrics.eyeY + metrics.headHeight * 0.28);
  ctx.quadraticCurveTo(
    metrics.centerX - cheekWidth,
    metrics.eyeY + metrics.headHeight * 0.12,
    metrics.centerX - cheekWidth * 0.6,
    metrics.topY + metrics.headHeight * 0.12
  );
  ctx.strokeStyle = setAlpha("#ffffff", 0.18);
  ctx.lineWidth = metrics.inkWeight * 0.35;
  ctx.stroke();

  ctx.restore();
}

function drawCostumeHighlights(ctx, metrics, hero) {
  ctx.save();
  ctx.fillStyle = setAlpha("#ffffff", 0.18);
  ctx.beginPath();
  ctx.moveTo(metrics.centerX - metrics.shoulderWidth * 0.18, metrics.shoulderY + metrics.figureHeight * 0.06);
  ctx.quadraticCurveTo(
    metrics.centerX - metrics.shoulderWidth * 0.08,
    metrics.shoulderY + metrics.figureHeight * 0.02,
    metrics.centerX + metrics.shoulderWidth * 0.02,
    metrics.shoulderY + metrics.figureHeight * 0.12
  );
  ctx.quadraticCurveTo(
    metrics.centerX - metrics.shoulderWidth * 0.12,
    metrics.shoulderY + metrics.figureHeight * 0.28,
    metrics.centerX - metrics.shoulderWidth * 0.18,
    metrics.shoulderY + metrics.figureHeight * 0.06
  );
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(metrics.centerX + metrics.shoulderWidth * 0.22, metrics.waistY - metrics.figureHeight * 0.06);
  ctx.quadraticCurveTo(
    metrics.centerX + metrics.waistWidth * 0.35,
    metrics.waistY,
    metrics.centerX + metrics.waistWidth * 0.18,
    metrics.waistY + metrics.figureHeight * 0.08
  );
  ctx.quadraticCurveTo(
    metrics.centerX + metrics.waistWidth * 0.05,
    metrics.waistY,
    metrics.centerX + metrics.shoulderWidth * 0.15,
    metrics.waistY - metrics.figureHeight * 0.05
  );
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(metrics.centerX - metrics.limbWidth * 0.6, metrics.hipY + metrics.figureHeight * 0.05);
  ctx.quadraticCurveTo(
    metrics.centerX - metrics.limbWidth * 0.2,
    metrics.hipY + metrics.figureHeight * 0.15,
    metrics.centerX - metrics.limbWidth * 0.55,
    metrics.hipY + metrics.figureHeight * 0.32
  );
  ctx.quadraticCurveTo(
    metrics.centerX - metrics.limbWidth * 0.8,
    metrics.hipY + metrics.figureHeight * 0.2,
    metrics.centerX - metrics.limbWidth * 0.6,
    metrics.hipY + metrics.figureHeight * 0.05
  );
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(metrics.centerX + metrics.limbWidth * 0.55, metrics.shoulderY + metrics.figureHeight * 0.08);
  ctx.quadraticCurveTo(
    metrics.centerX + metrics.limbWidth * 0.85,
    metrics.shoulderY + metrics.figureHeight * 0.22,
    metrics.centerX + metrics.limbWidth * 0.4,
    metrics.shoulderY + metrics.figureHeight * 0.28
  );
  ctx.quadraticCurveTo(
    metrics.centerX + metrics.limbWidth * 0.2,
    metrics.shoulderY + metrics.figureHeight * 0.18,
    metrics.centerX + metrics.limbWidth * 0.55,
    metrics.shoulderY + metrics.figureHeight * 0.08
  );
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function inkMuscleContours(ctx, metrics, hero) {
  ctx.save();
  ctx.strokeStyle = setAlpha("#050209", 0.58);
  ctx.lineWidth = metrics.inkWeight * 0.36;

  ctx.beginPath();
  ctx.moveTo(metrics.centerX - metrics.shoulderWidth * 0.12, metrics.shoulderY + metrics.figureHeight * 0.04);
  ctx.quadraticCurveTo(
    metrics.centerX,
    metrics.shoulderY + metrics.figureHeight * 0.08,
    metrics.centerX + metrics.shoulderWidth * 0.12,
    metrics.shoulderY + metrics.figureHeight * 0.04
  );
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(metrics.centerX - metrics.shoulderWidth * 0.18, metrics.shoulderY + metrics.figureHeight * 0.1);
  ctx.quadraticCurveTo(
    metrics.centerX - metrics.shoulderWidth * 0.22,
    metrics.shoulderY + metrics.figureHeight * 0.24,
    metrics.centerX - metrics.waistWidth * 0.28,
    metrics.waistY
  );
  ctx.moveTo(metrics.centerX + metrics.shoulderWidth * 0.18, metrics.shoulderY + metrics.figureHeight * 0.1);
  ctx.quadraticCurveTo(
    metrics.centerX + metrics.shoulderWidth * 0.22,
    metrics.shoulderY + metrics.figureHeight * 0.24,
    metrics.centerX + metrics.waistWidth * 0.28,
    metrics.waistY
  );
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(metrics.centerX - metrics.limbWidth * 0.45, metrics.hipY + metrics.figureHeight * 0.08);
  ctx.quadraticCurveTo(
    metrics.centerX - metrics.limbWidth * 0.3,
    metrics.hipY + metrics.figureHeight * 0.16,
    metrics.centerX - metrics.limbWidth * 0.42,
    metrics.hipY + metrics.figureHeight * 0.25
  );
  ctx.moveTo(metrics.centerX + metrics.limbWidth * 0.45, metrics.hipY + metrics.figureHeight * 0.08);
  ctx.quadraticCurveTo(
    metrics.centerX + metrics.limbWidth * 0.3,
    metrics.hipY + metrics.figureHeight * 0.16,
    metrics.centerX + metrics.limbWidth * 0.42,
    metrics.hipY + metrics.figureHeight * 0.25
  );
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(metrics.centerX - metrics.limbWidth * 0.3, metrics.baseY - metrics.bootHeight * 0.85);
  ctx.quadraticCurveTo(
    metrics.centerX - metrics.limbWidth * 0.2,
    metrics.baseY - metrics.bootHeight * 0.65,
    metrics.centerX - metrics.limbWidth * 0.28,
    metrics.baseY - metrics.bootHeight * 0.4
  );
  ctx.moveTo(metrics.centerX + metrics.limbWidth * 0.3, metrics.baseY - metrics.bootHeight * 0.85);
  ctx.quadraticCurveTo(
    metrics.centerX + metrics.limbWidth * 0.2,
    metrics.baseY - metrics.bootHeight * 0.65,
    metrics.centerX + metrics.limbWidth * 0.28,
    metrics.baseY - metrics.bootHeight * 0.4
  );
  ctx.stroke();

  ctx.strokeStyle = setAlpha("#050209", 0.42);
  ctx.lineWidth = metrics.inkWeight * 0.28;
  ctx.beginPath();
  ctx.moveTo(metrics.centerX - metrics.shoulderWidth * 0.08, metrics.shoulderY + metrics.torsoHeight * 0.4);
  ctx.quadraticCurveTo(
    metrics.centerX,
    metrics.shoulderY + metrics.torsoHeight * 0.46,
    metrics.centerX + metrics.shoulderWidth * 0.08,
    metrics.shoulderY + metrics.torsoHeight * 0.4
  );
  ctx.stroke();

  ctx.restore();
}

function drawFigureSketchLines(ctx, metrics) {
  ctx.save();
  ctx.strokeStyle = setAlpha("#050209", 0.3);
  ctx.lineWidth = metrics.inkWeight * 0.2;
  const leftEdge = metrics.centerX - metrics.shoulderWidth * 0.58;
  const rightEdge = metrics.centerX + metrics.shoulderWidth * 0.58;
  const tickCount = 10;
  for (let i = 0; i < tickCount; i++) {
    const y = metrics.topY + metrics.headHeight * 0.3 + i * metrics.figureHeight * 0.055;
    ctx.beginPath();
    ctx.moveTo(leftEdge - metrics.figureHeight * 0.02, y);
    ctx.lineTo(leftEdge, y + metrics.figureHeight * 0.012);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(rightEdge + metrics.figureHeight * 0.02, y);
    ctx.lineTo(rightEdge, y + metrics.figureHeight * 0.012);
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = setAlpha("#ffffff", 0.18);
  ctx.lineWidth = metrics.inkWeight * 0.16;
  ctx.setLineDash([metrics.figureHeight * 0.015, metrics.figureHeight * 0.02]);
  ctx.beginPath();
  ctx.ellipse(
    metrics.centerX,
    metrics.baseY - metrics.figureHeight * 0.2,
    metrics.shoulderWidth * 0.9,
    metrics.figureHeight * 0.32,
    0,
    0,
    Math.PI * 2
  );
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = setAlpha("#050209", 0.34);
  ctx.lineWidth = metrics.inkWeight * 0.18;
  for (let i = -2; i <= 2; i++) {
    ctx.beginPath();
    const arcY = metrics.baseY + metrics.figureHeight * 0.05 + i * metrics.figureHeight * 0.02;
    ctx.moveTo(metrics.centerX - metrics.shoulderWidth * 0.52, arcY);
    ctx.quadraticCurveTo(
      metrics.centerX,
      arcY + metrics.figureHeight * 0.05,
      metrics.centerX + metrics.shoulderWidth * 0.52,
      arcY
    );
    ctx.stroke();
  }
  ctx.restore();
}

function drawHeadAndFace(ctx, metrics, hero) {
  const cheekWidth = metrics.shoulderWidth * 0.26;
  const jawWidth = metrics.shoulderWidth * 0.18;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(metrics.centerX + cheekWidth * 1.02, metrics.eyeY + metrics.headHeight * 0.12);
  ctx.quadraticCurveTo(
    metrics.centerX + cheekWidth * 1.22,
    metrics.eyeY,
    metrics.centerX + cheekWidth * 0.95,
    metrics.eyeY - metrics.headHeight * 0.16
  );
  ctx.quadraticCurveTo(
    metrics.centerX + cheekWidth * 1.1,
    metrics.topY + metrics.headHeight * 0.04,
    metrics.centerX + cheekWidth * 0.75,
    metrics.topY + metrics.headHeight * 0.02
  );
  ctx.quadraticCurveTo(
    metrics.centerX + cheekWidth * 1.05,
    metrics.topY + metrics.headHeight * 0.3,
    metrics.centerX + cheekWidth * 0.95,
    metrics.eyeY + metrics.headHeight * 0.18
  );
  ctx.closePath();
  ctx.fillStyle = adjustColor(hero.accentColor, 35);
  ctx.globalAlpha = 0.55;
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.lineWidth = metrics.inkWeight * 0.5;
  ctx.strokeStyle = setAlpha("#050209", 0.5);
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(metrics.centerX, metrics.topY - metrics.headHeight * 0.12);
  ctx.bezierCurveTo(
    metrics.centerX + cheekWidth,
    metrics.topY + metrics.headHeight * 0.2,
    metrics.centerX + cheekWidth,
    metrics.eyeY,
    metrics.centerX + jawWidth,
    metrics.chinY
  );
  ctx.quadraticCurveTo(
    metrics.centerX,
    metrics.chinY + metrics.headHeight * 0.08,
    metrics.centerX - jawWidth,
    metrics.chinY
  );
  ctx.bezierCurveTo(
    metrics.centerX - cheekWidth,
    metrics.eyeY,
    metrics.centerX - cheekWidth,
    metrics.topY + metrics.headHeight * 0.2,
    metrics.centerX,
    metrics.topY - metrics.headHeight * 0.12
  );
  ctx.closePath();

  const skinGradient = ctx.createLinearGradient(
    metrics.centerX,
    metrics.topY,
    metrics.centerX,
    metrics.chinY
  );
  skinGradient.addColorStop(0, adjustColor(hero.accentColor, 55));
  skinGradient.addColorStop(0.4, adjustColor(hero.accentColor, 15));
  skinGradient.addColorStop(1, adjustColor(hero.accentColor, -10));
  ctx.fillStyle = skinGradient;
  ctx.fill();
  ctx.lineWidth = metrics.inkWeight * 0.9;
  ctx.strokeStyle = "#050209";
  ctx.stroke();

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(metrics.centerX - cheekWidth * 1.05, metrics.eyeY + metrics.headHeight * 0.12);
  ctx.quadraticCurveTo(
    metrics.centerX - cheekWidth * 1.25,
    metrics.eyeY,
    metrics.centerX - cheekWidth * 0.95,
    metrics.eyeY - metrics.headHeight * 0.16
  );
  ctx.quadraticCurveTo(
    metrics.centerX - cheekWidth * 1.05,
    metrics.topY + metrics.headHeight * 0.04,
    metrics.centerX - cheekWidth * 0.72,
    metrics.topY + metrics.headHeight * 0.06
  );
  ctx.quadraticCurveTo(
    metrics.centerX - cheekWidth * 1.05,
    metrics.topY + metrics.headHeight * 0.36,
    metrics.centerX - cheekWidth * 0.92,
    metrics.eyeY + metrics.headHeight * 0.2
  );
  ctx.closePath();
  ctx.fillStyle = adjustColor(hero.accentColor, 25);
  ctx.globalAlpha = 0.55;
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.lineWidth = metrics.inkWeight * 0.5;
  ctx.strokeStyle = setAlpha("#050209", 0.5);
  ctx.stroke();
  ctx.restore();

  ctx.save();
  const maskHeight = metrics.headHeight * 0.62;
  ctx.beginPath();
  ctx.moveTo(metrics.centerX - cheekWidth, metrics.eyeY - maskHeight * 0.4);
  ctx.quadraticCurveTo(
    metrics.centerX,
    metrics.eyeY - maskHeight * 0.7,
    metrics.centerX + cheekWidth,
    metrics.eyeY - maskHeight * 0.4
  );
  ctx.lineTo(metrics.centerX + cheekWidth * 0.85, metrics.eyeY + maskHeight * 0.35);
  ctx.quadraticCurveTo(
    metrics.centerX,
    metrics.eyeY + maskHeight * 0.6,
    metrics.centerX - cheekWidth * 0.85,
    metrics.eyeY + maskHeight * 0.35
  );
  ctx.closePath();
  const maskGradient = ctx.createLinearGradient(
    metrics.centerX,
    metrics.eyeY - maskHeight * 0.5,
    metrics.centerX,
    metrics.eyeY + maskHeight * 0.4
  );
  maskGradient.addColorStop(0, adjustColor(hero.primaryColor, 30));
  maskGradient.addColorStop(0.45, hero.primaryColor);
  maskGradient.addColorStop(1, adjustColor(hero.primaryColor, -30));
  ctx.globalAlpha = 0.82;
  ctx.fillStyle = maskGradient;
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.lineWidth = metrics.inkWeight * 0.8;
  ctx.strokeStyle = "#050209";
  ctx.stroke();

  ctx.save();
  ctx.clip();
  ctx.globalAlpha = 0.35;
  ctx.fillStyle = createHalftonePattern(
    ctx,
    setAlpha("#000000", 0.7),
    setAlpha("#000000", 0),
    2.4,
    8
  );
  ctx.fillRect(
    metrics.centerX - cheekWidth,
    metrics.eyeY,
    cheekWidth * 2,
    maskHeight * 0.75
  );
  ctx.restore();

  ctx.restore();

  ctx.save();
  ctx.beginPath();
  ctx.ellipse(
    metrics.centerX,
    metrics.eyeY + metrics.headHeight * 0.38,
    cheekWidth * 0.9,
    metrics.headHeight * 0.35,
    0,
    0,
    Math.PI * 2
  );
  ctx.clip();
  drawCrosshatchTexture(
    ctx,
    metrics.centerX - cheekWidth,
    metrics.eyeY,
    cheekWidth * 2,
    metrics.headHeight * 0.9,
    {
      spacing: metrics.figureHeight * 0.03,
      weight: metrics.inkWeight * 0.14,
      alpha: 0.2,
    }
  );
  ctx.restore();

  ctx.save();
  ctx.fillStyle = "#fdfdfd";
  const eyeWidth = metrics.shoulderWidth * 0.08;
  const eyeHeight = metrics.headHeight * 0.12;
  ctx.beginPath();
  ctx.ellipse(
    metrics.centerX - eyeWidth * 0.7,
    metrics.eyeY,
    eyeWidth,
    eyeHeight,
    -0.15,
    0,
    Math.PI * 2
  );
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(
    metrics.centerX + eyeWidth * 0.7,
    metrics.eyeY,
    eyeWidth,
    eyeHeight,
    0.15,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.fillStyle = "#050209";
  ctx.beginPath();
  ctx.arc(metrics.centerX - eyeWidth * 0.5, metrics.eyeY, eyeWidth * 0.35, 0, Math.PI * 2);
  ctx.arc(metrics.centerX + eyeWidth * 0.5, metrics.eyeY, eyeWidth * 0.35, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(metrics.centerX - eyeWidth * 1.4, metrics.eyeY - eyeHeight * 0.8);
  ctx.quadraticCurveTo(
    metrics.centerX - eyeWidth * 0.1,
    metrics.eyeY - eyeHeight * 1.2,
    metrics.centerX - eyeWidth * 0.3,
    metrics.eyeY - eyeHeight * 0.2
  );
  ctx.moveTo(metrics.centerX + eyeWidth * 1.4, metrics.eyeY - eyeHeight * 0.8);
  ctx.quadraticCurveTo(
    metrics.centerX + eyeWidth * 0.1,
    metrics.eyeY - eyeHeight * 1.2,
    metrics.centerX + eyeWidth * 0.3,
    metrics.eyeY - eyeHeight * 0.2
  );
  ctx.strokeStyle = setAlpha("#050209", 0.9);
  ctx.lineWidth = metrics.inkWeight * 0.5;
  ctx.lineCap = "round";
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(metrics.centerX, metrics.eyeY + eyeHeight * 0.6);
  ctx.quadraticCurveTo(
    metrics.centerX + eyeWidth * 0.15,
    metrics.noseY,
    metrics.centerX,
    metrics.noseY + eyeHeight * 0.4
  );
  ctx.strokeStyle = setAlpha("#050209", 0.6);
  ctx.lineWidth = metrics.inkWeight * 0.45;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(metrics.centerX - eyeWidth, metrics.noseY + eyeHeight * 1.2);
  ctx.quadraticCurveTo(
    metrics.centerX,
    metrics.noseY + eyeHeight * 1.5,
    metrics.centerX + eyeWidth,
    metrics.noseY + eyeHeight * 1.2
  );
  ctx.strokeStyle = setAlpha("#050209", 0.65);
  ctx.lineWidth = metrics.inkWeight * 0.5;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(metrics.centerX - cheekWidth * 0.4, metrics.eyeY - maskHeight * 0.58);
  ctx.quadraticCurveTo(
    metrics.centerX - cheekWidth * 0.08,
    metrics.eyeY - maskHeight * 0.45,
    metrics.centerX - cheekWidth * 0.18,
    metrics.eyeY - maskHeight * 0.12
  );
  ctx.moveTo(metrics.centerX + cheekWidth * 0.4, metrics.eyeY - maskHeight * 0.58);
  ctx.quadraticCurveTo(
    metrics.centerX + cheekWidth * 0.08,
    metrics.eyeY - maskHeight * 0.45,
    metrics.centerX + cheekWidth * 0.18,
    metrics.eyeY - maskHeight * 0.12
  );
  ctx.strokeStyle = setAlpha("#ffffff", 0.4);
  ctx.lineWidth = metrics.inkWeight * 0.35;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(metrics.centerX - jawWidth * 0.6, metrics.noseY + eyeHeight * 1.6);
  ctx.quadraticCurveTo(
    metrics.centerX,
    metrics.noseY + eyeHeight * 1.75,
    metrics.centerX + jawWidth * 0.6,
    metrics.noseY + eyeHeight * 1.6
  );
  ctx.strokeStyle = setAlpha("#050209", 0.55);
  ctx.lineWidth = metrics.inkWeight * 0.4;
  ctx.stroke();

  ctx.restore();

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(metrics.centerX + jawWidth * 0.8, metrics.eyeY + maskHeight * 0.15);
  ctx.quadraticCurveTo(
    metrics.centerX + jawWidth,
    metrics.eyeY + maskHeight * 0.6,
    metrics.centerX,
    metrics.chinY + metrics.headHeight * 0.04
  );
  ctx.quadraticCurveTo(
    metrics.centerX - jawWidth,
    metrics.eyeY + maskHeight * 0.6,
    metrics.centerX - jawWidth * 0.8,
    metrics.eyeY + maskHeight * 0.15
  );
  ctx.closePath();
  ctx.clip();
  ctx.globalAlpha = 0.28;
  ctx.fillStyle = createHalftonePattern(
    ctx,
    setAlpha("#000000", 0.6),
    setAlpha("#000000", 0),
    2.2,
    8
  );
  ctx.fillRect(
    metrics.centerX - jawWidth,
    metrics.eyeY,
    jawWidth * 2,
    metrics.headHeight * 0.6
  );
  ctx.restore();
}

function drawMysticSigils(ctx, metrics, color) {
  ctx.save();
  ctx.translate(metrics.centerX, metrics.baseY - metrics.figureHeight * 0.45);
  const rings = 3;
  for (let i = 0; i < rings; i++) {
    ctx.beginPath();
    const radius = metrics.figureHeight * (0.32 + i * 0.08);
    ctx.setLineDash([6, 4]);
    ctx.lineDashOffset = i * 6;
    ctx.strokeStyle = setAlpha(color, 0.65 - i * 0.15);
    ctx.lineWidth = metrics.inkWeight * (0.8 - i * 0.2);
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.setLineDash([]);
  for (let j = 0; j < 5; j++) {
    ctx.beginPath();
    const angle = (Math.PI * 2 * j) / 5;
    const x = Math.cos(angle) * metrics.figureHeight * 0.36;
    const y = Math.sin(angle) * metrics.figureHeight * 0.2;
    ctx.fillStyle = setAlpha(color, 0.75);
    ctx.arc(x, y, metrics.figureHeight * 0.04, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawSpeedBurst(ctx, metrics, color) {
  ctx.save();
  ctx.strokeStyle = setAlpha(color, 0.75);
  ctx.lineWidth = metrics.inkWeight * 0.9;
  ctx.lineCap = "round";
  const originY = metrics.baseY - metrics.figureHeight * 0.5;
  for (let i = -5; i <= 5; i++) {
    ctx.beginPath();
    const offset = i * 16;
    ctx.moveTo(metrics.centerX - metrics.figureHeight * 0.9, originY + offset);
    ctx.lineTo(metrics.centerX + metrics.figureHeight * 0.9, originY + offset - 18);
    ctx.stroke();
  }
  ctx.restore();
}

function drawStealthShadow(ctx, metrics, color) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(metrics.centerX - metrics.shoulderWidth, metrics.topY + metrics.figureHeight * 0.1);
  ctx.lineTo(metrics.centerX + metrics.shoulderWidth * 0.2, metrics.baseY);
  ctx.lineTo(metrics.centerX - metrics.shoulderWidth * 1.4, metrics.baseY);
  ctx.closePath();
  ctx.fillStyle = setAlpha(color, 0.35);
  ctx.fill();
  ctx.restore();
}

function drawKirbyKrackle(ctx, metrics, color) {
  ctx.save();
  const centerX = metrics.centerX;
  const centerY = metrics.baseY - metrics.figureHeight * 0.55;
  const radius = metrics.figureHeight * 0.65;
  const nodes = 32;
  for (let i = 0; i < nodes; i++) {
    const angle = (Math.PI * 2 * i) / nodes + Math.random() * 0.2;
    const distance = radius * (0.45 + Math.random() * 0.6);
    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;
    const size = metrics.figureHeight * (0.03 + Math.random() * 0.05);

    ctx.beginPath();
    ctx.fillStyle = "#050209";
    ctx.arc(x, y, size * 1.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = setAlpha(color, 0.7);
    ctx.lineWidth = metrics.inkWeight * 0.8;
    ctx.arc(x, y, size * 1.6, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = setAlpha(color, 0.8);
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawTechGlyphs(ctx, metrics, color) {
  ctx.save();
  ctx.strokeStyle = setAlpha(color, 0.8);
  ctx.lineWidth = metrics.inkWeight * 0.6;
  const coreX = metrics.centerX;
  const coreY = metrics.baseY - metrics.figureHeight * 0.6;
  const radius = metrics.figureHeight * 0.6;
  for (let i = 0; i < 5; i++) {
    const angle = (Math.PI * 2 * i) / 5 + Math.PI / 5;
    const x = coreX + Math.cos(angle) * radius * 0.7;
    const y = coreY + Math.sin(angle) * radius * 0.4;
    ctx.beginPath();
    ctx.arc(x, y, metrics.figureHeight * 0.08, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(coreX, coreY);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
  ctx.restore();
}

function drawTechBackdrop(ctx, width, height, color) {
  ctx.save();
  ctx.strokeStyle = setAlpha(color, 0.35);
  ctx.lineWidth = 1.5;
  for (let x = 24; x < width; x += 36) {
    ctx.beginPath();
    ctx.moveTo(x, height * 0.15);
    ctx.lineTo(x, height * 0.75);
    ctx.stroke();
    for (let y = height * 0.2; y < height * 0.75; y += 60) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 18, y + 14);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x + 18, y + 14, 4, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  ctx.restore();
}

function drawPanelFrame(ctx, width, height, hero) {
  ctx.save();
  const accent = hero.accentColor || "#fdea55";
  const secondary = hero.secondaryColor || "#ffffff";

  ctx.lineWidth = 14;
  ctx.strokeStyle = setAlpha(adjustColor(accent, -10), 0.95);
  ctx.strokeRect(4.5, 4.5, width - 9, height - 9);

  ctx.lineWidth = 6;
  ctx.strokeStyle = "#050209";
  ctx.strokeRect(10, 10, width - 20, height - 20);

  ctx.lineWidth = 2.5;
  ctx.strokeStyle = setAlpha("#fff7d0", 0.85);
  ctx.strokeRect(18, 18, width - 36, height - 36);

  const tickColor = setAlpha(adjustColor(accent, 25), 0.9);
  const tickLength = 32;
  ctx.fillStyle = tickColor;
  ctx.fillRect(24, 20, tickLength, 4);
  ctx.fillRect(width - 24 - tickLength, height - 24, tickLength, 4);
  ctx.fillRect(24, height - 24, 4, tickLength * 0.6);
  ctx.fillRect(width - 28, 20, 4, tickLength * 0.6);

  const strapHeight = 48;
  const strapY = 28;
  ctx.fillStyle = setAlpha(adjustColor(secondary, 35), 0.9);
  ctx.fillRect(34, strapY, width - 68, strapHeight);
  ctx.save();
  ctx.beginPath();
  ctx.rect(34, strapY, width - 68, strapHeight);
  ctx.clip();
  ctx.globalAlpha = 0.25;
  ctx.fillStyle = createHalftonePattern(
    ctx,
    setAlpha(adjustColor(accent, 20), 0.8),
    setAlpha("#ffffff", 0),
    2.2,
    8
  );
  ctx.fillRect(34, strapY, width - 68, strapHeight);
  ctx.restore();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#050209";
  ctx.strokeRect(34, strapY, width - 68, strapHeight);

  ctx.fillStyle = "#050209";
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  ctx.font = "bold 20px 'Bangers', 'Comic Neue', sans-serif";
  const strapLabel = hero.presetKey !== "custom" ? hero.presetLabel : "Custom Mix";
  ctx.fillText(strapLabel.toUpperCase(), 48, strapY + strapHeight / 2);
  ctx.textAlign = "right";
  ctx.font = "600 14px 'Inter', sans-serif";
  ctx.fillStyle = adjustColor(accent, -5);
  ctx.fillText(hero.alignment.toUpperCase(), width - 48, strapY + strapHeight / 2);

  const captionHeight = 72;
  const captionY = height - captionHeight - 32;
  ctx.fillStyle = setAlpha("#fff9d0", 0.94);
  ctx.fillRect(42, captionY, width - 84, captionHeight);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#050209";
  ctx.strokeRect(42, captionY, width - 84, captionHeight);

  ctx.textAlign = "left";
  ctx.fillStyle = "#050209";
  ctx.font = `bold ${Math.round(Math.min(28, width * 0.08))}px 'Bangers', 'Comic Neue', sans-serif`;
  ctx.fillText((hero.name || "Unnamed Legend").toUpperCase(), 58, captionY + captionHeight * 0.38);

  ctx.font = "600 15px 'Inter', sans-serif";
  ctx.fillStyle = adjustColor(accent, -15);
  const captionLine =
    hero.presetKey !== "custom"
      ? hero.presetTagline || hero.presetLabel
      : `${hero.alignment} • ${hero.specialty}`;
  ctx.fillText(captionLine.toUpperCase(), 58, captionY + captionHeight * 0.72);

  ctx.textAlign = "right";
  ctx.fillStyle = adjustColor(secondary, 15);
  ctx.font = "bold 16px 'Bangers', sans-serif";
  ctx.fillText(`SPECIAL ${hero.specialty.toUpperCase()}`, width - 58, captionY + captionHeight * 0.72);
  ctx.restore();
}

function drawStarfield(ctx, width, height, color) {
  ctx.save();
  const stars = 120;
  for (let i = 0; i < stars; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height * 0.55;
    const size = Math.random() * 2.2 + 0.4;
    ctx.fillStyle = setAlpha(color, 0.2 + Math.random() * 0.6);
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
    if (Math.random() > 0.72) {
      ctx.beginPath();
      ctx.strokeStyle = setAlpha("#ffffff", 0.45);
      ctx.lineWidth = 1;
      ctx.moveTo(x - size * 2, y);
      ctx.lineTo(x + size * 2, y);
      ctx.moveTo(x, y - size * 2);
      ctx.lineTo(x, y + size * 2);
      ctx.stroke();
    }
  }
  ctx.restore();
}

function drawPowerGlyphBurst(ctx, metrics, color) {
  ctx.save();
  ctx.translate(metrics.centerX, metrics.baseY - metrics.figureHeight * 0.68);
  const radius = metrics.figureHeight * 0.32;
  const rays = 18;
  for (let i = 0; i < rays; i++) {
    ctx.beginPath();
    const angle = (Math.PI * 2 * i) / rays;
    const inner = radius * 0.35;
    const outer = radius * (0.65 + (i % 2 === 0 ? 0.2 : -0.08));
    ctx.moveTo(Math.cos(angle) * inner, Math.sin(angle) * inner);
    ctx.lineTo(Math.cos(angle) * outer, Math.sin(angle) * outer);
    ctx.strokeStyle = setAlpha(color, 0.85);
    ctx.lineWidth = metrics.inkWeight * 0.9;
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.45, 0, Math.PI * 2);
  ctx.fillStyle = setAlpha(color, 0.32);
  ctx.fill();
  ctx.restore();
}

function drawPanelTexture(ctx, width, height, hero, metrics) {
  ctx.save();
  ctx.globalAlpha = 0.08;
  ctx.fillStyle = createHalftonePattern(
    ctx,
    setAlpha("#050209", 0.22),
    setAlpha("#000000", 0),
    2,
    6
  );
  ctx.fillRect(16, 16, width - 32, height - 32);
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.strokeStyle = setAlpha("#050209", 0.24);
  ctx.lineWidth = metrics.inkWeight * 0.18;
  const strokes = 70;
  for (let i = 0; i < strokes; i++) {
    const startX = Math.random() * width;
    const startY = Math.random() * height;
    const angle = -0.9 + Math.random() * 1.8;
    const length = metrics.figureHeight * (0.08 + Math.random() * 0.12);
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX + Math.cos(angle) * length, startY + Math.sin(angle) * length);
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.12;
  ctx.strokeStyle = setAlpha("#ffffff", 0.14);
  ctx.lineWidth = metrics.inkWeight * 0.2;
  for (let i = 1; i <= 3; i++) {
    const radius = Math.min(width, height) * (0.28 + i * 0.1);
    ctx.beginPath();
    ctx.ellipse(
      metrics.centerX,
      metrics.baseY - metrics.figureHeight * 0.42,
      radius,
      radius * 0.55,
      -0.08,
      0,
      Math.PI * 2
    );
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.16;
  ctx.strokeStyle = setAlpha("#050209", 0.26);
  ctx.lineWidth = metrics.inkWeight * 0.22;
  for (let i = 0; i < 4; i++) {
    const baseX = i % 2 === 0 ? 20 : width - 20;
    const baseY = i < 2 ? 24 : height - 24;
    ctx.beginPath();
    ctx.moveTo(baseX, baseY);
    ctx.lineTo(baseX + (i % 2 === 0 ? 36 : -36), baseY + (i < 2 ? 28 : -28));
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(baseX, baseY);
    ctx.lineTo(baseX + (i % 2 === 0 ? 26 : -26), baseY + (i < 2 ? 42 : -42));
    ctx.stroke();
  }
  ctx.restore();
}

function drawPanelVignette(ctx, width, height) {
  ctx.save();
  const gradient = ctx.createRadialGradient(
    width / 2,
    height / 2,
    Math.min(width, height) * 0.45,
    width / 2,
    height / 2,
    Math.max(width, height) * 0.8
  );
  gradient.addColorStop(0, setAlpha("#000000", 0));
  gradient.addColorStop(1, setAlpha("#000000", 0.38));
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.14;
  ctx.strokeStyle = setAlpha("#050209", 0.3);
  ctx.lineWidth = 2;
  const hatchSpacing = 36;
  for (let x = -width; x < width * 2; x += hatchSpacing) {
    ctx.beginPath();
    ctx.moveTo(x, -10);
    ctx.lineTo(x + hatchSpacing * 0.6, height + 10);
    ctx.stroke();
  }
  ctx.restore();
}

function drawSpeechBubble(ctx, metrics, hero, width, height, artFrame) {
  const presetLine = hero.presetBubble?.trim();
  const powerLine = hero.power?.trim();
  const backstoryLine = hero.backstory
    ?.split(/[\n\.\!\?]/)
    .map((line) => line.trim())
    .find((line) => line.length > 0);
  const fallback = hero.alignment === "Villain"
    ? `${hero.name.toUpperCase()} WILL RULE!`
    : hero.alignment === "Vigilante"
    ? "THE CITY IS MINE TO GUARD!"
    : hero.alignment === "Anti-hero"
    ? "DON'T MISTAKE ME FOR A SAVIOR!"
    : "UPHOLDING JUSTICE!";
  const rawMessage = presetLine || powerLine || backstoryLine || fallback;
  if (!rawMessage) {
    return;
  }
  const message = rawMessage.toUpperCase();

  ctx.save();
  ctx.font = "600 16px 'Inter', sans-serif";
  const maxBubbleWidth = width * 0.72;
  const lines = wrapText(ctx, message, maxBubbleWidth - 48);
  const measured = lines.map((line) => ctx.measureText(line).width);
  const bubbleGuide = artFrame && hero.heroArt?.bubble ? hero.heroArt.bubble : null;
  const computedWidth = Math.max(width * 0.38, Math.max(...measured) + 36);
  const bubbleWidth = Math.min(
    maxBubbleWidth,
    bubbleGuide ? width * clamp(bubbleGuide.widthRatio ?? 0.5, 0.3, 0.78) : computedWidth
  );
  let bubbleX = Math.max(20, width * 0.08);
  let bubbleY = clamp(
    metrics.topY - metrics.figureHeight * 0.24,
    18,
    height * 0.45
  );
  let tailX = clamp(
    metrics.centerX - metrics.shoulderWidth * 0.12,
    bubbleX + 24,
    bubbleX + bubbleWidth - 24
  );
  let tailY = metrics.eyeY + metrics.headHeight * 0.25;
  if (bubbleGuide) {
    const anchorX = clamp(bubbleGuide.anchorX ?? 0.76, 0.12, 0.92);
    const anchorY = clamp(bubbleGuide.anchorY ?? 0.12, 0.02, 0.6);
    const centerX = width * anchorX;
    bubbleX = clamp(centerX - bubbleWidth / 2, 18, width - bubbleWidth - 18);
    bubbleY = clamp(height * anchorY, 14, height * 0.55);
    tailX = clamp(width * (bubbleGuide.tailX ?? anchorX), bubbleX + 24, bubbleX + bubbleWidth - 24);
    tailY = clamp(height * (bubbleGuide.tailY ?? (anchorY + 0.18)), bubbleY + 24, bubbleY + 260);
  }
  const bubbleHeight = lines.length * 22 + 34;

  ctx.beginPath();
  ctx.moveTo(bubbleX + 18, bubbleY);
  ctx.quadraticCurveTo(bubbleX, bubbleY, bubbleX, bubbleY + 18);
  ctx.lineTo(bubbleX, bubbleY + bubbleHeight - 18);
  ctx.quadraticCurveTo(
    bubbleX,
    bubbleY + bubbleHeight,
    bubbleX + 18,
    bubbleY + bubbleHeight
  );
  const tailBaseX = bubbleX + bubbleWidth * 0.7;
  ctx.lineTo(tailBaseX - 12, bubbleY + bubbleHeight);
  ctx.quadraticCurveTo(
    tailBaseX + 10,
    bubbleY + bubbleHeight + 4,
    tailX,
    tailY
  );
  ctx.quadraticCurveTo(
    tailBaseX - 6,
    bubbleY + bubbleHeight - 18,
    bubbleX + bubbleWidth - 18,
    bubbleY + bubbleHeight - 8
  );
  ctx.quadraticCurveTo(
    bubbleX + bubbleWidth,
    bubbleY + bubbleHeight - 8,
    bubbleX + bubbleWidth,
    bubbleY + bubbleHeight - 28
  );
  ctx.lineTo(bubbleX + bubbleWidth, bubbleY + 18);
  ctx.quadraticCurveTo(
    bubbleX + bubbleWidth,
    bubbleY,
    bubbleX + bubbleWidth - 18,
    bubbleY
  );
  ctx.closePath();

  ctx.shadowColor = setAlpha("#050209", 0.4);
  ctx.shadowBlur = 12;
  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 6;
  ctx.fillStyle = setAlpha("#fffef5", 0.94);
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#050209";
  ctx.stroke();

  ctx.save();
  ctx.clip();
  ctx.globalAlpha = 0.2;
  ctx.fillStyle = createHalftonePattern(
    ctx,
    setAlpha(hero.accentColor, 0.8),
    setAlpha("#ffffff", 0),
    2,
    9
  );
  ctx.fillRect(bubbleX, bubbleY, bubbleWidth, bubbleHeight);
  ctx.restore();

  ctx.fillStyle = "#050209";
  ctx.textBaseline = "top";
  let textY = bubbleY + 16;
  for (const line of lines) {
    ctx.fillText(line, bubbleX + 20, textY);
    textY += 22;
  }
  ctx.restore();
}

function drawActionBurst(ctx, metrics, hero, artFrame) {
  const specialtyWords = {
    Mystic: "ARCANA!",
    Speedster: "ZOOM!",
    Defender: "SHIELD!",
    Powerhouse: "SMASH!",
    Stealth: "SHADOW!",
    Tactician: "STRIKE!",
  };
  const alignmentWords = {
    Hero: "ZAP!",
    Villain: "DOOM!",
    "Anti-hero": "BAM!",
    Vigilante: "THWACK!",
  };
  const burst = hero.presetSfx || specialtyWords[hero.specialty] || alignmentWords[hero.alignment] || "POW!";
  const text = burst.toUpperCase();

  ctx.save();
  const sfxGuide = artFrame && hero.heroArt?.sfx ? hero.heroArt.sfx : null;
  const burstX = sfxGuide
    ? canvas.width * clamp(sfxGuide.anchorX ?? 0.24, 0.05, 0.95)
    : metrics.centerX + metrics.shoulderWidth * 1.05;
  const burstY = sfxGuide
    ? canvas.height * clamp(sfxGuide.anchorY ?? 0.24, 0.05, 0.92)
    : metrics.baseY - metrics.figureHeight * 0.62;
  ctx.translate(burstX, burstY);
  ctx.rotate(sfxGuide ? sfxGuide.rotation ?? -0.16 : -0.1);
  const spikes = 16;
  const radius = sfxGuide
    ? Math.max(artFrame.width, artFrame.height) * clamp(sfxGuide.radiusRatio ?? 0.2, 0.12, 0.32)
    : metrics.figureHeight * 0.22;
  ctx.beginPath();
  for (let i = 0; i < spikes; i++) {
    const angle = (Math.PI * 2 * i) / spikes;
    const r = i % 2 === 0 ? radius : radius * 0.65;
    ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
  }
  ctx.closePath();
  ctx.fillStyle = adjustColor(hero.accentColor, 35);
  ctx.fill();
  ctx.lineWidth = metrics.inkWeight * 1.1;
  ctx.strokeStyle = "#050209";
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.6, 0, Math.PI * 2);
  ctx.fillStyle = adjustColor(hero.secondaryColor, 15);
  ctx.fill();
  ctx.lineWidth = metrics.inkWeight * 0.8;
  ctx.stroke();

  ctx.fillStyle = "#fff9e8";
  ctx.font = `bold ${Math.round(metrics.figureHeight * 0.07)}px 'Bangers', sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 0, 0);
  ctx.restore();
}

function drawCrosshatchTexture(ctx, x, y, width, height, options = {}) {
  const spacing = Math.max(4, options.spacing || 12);
  const angle = options.angle ?? Math.PI / 4;
  const weight = options.weight || 1;
  const alpha = options.alpha ?? 0.2;
  const passes = options.passes || 2;
  const color = options.color || "#050209";

  const maxDistance = width + height;
  for (let pass = 0; pass < passes; pass++) {
    const rotation = pass % 2 === 0 ? angle : -angle;
    ctx.save();
    ctx.translate(x + width / 2, y + height / 2);
    ctx.rotate(rotation);
    ctx.beginPath();
    for (let i = -maxDistance; i <= maxDistance; i += spacing) {
      ctx.moveTo(i, -maxDistance);
      ctx.lineTo(i, maxDistance);
    }
    ctx.strokeStyle = setAlpha(color, alpha);
    ctx.lineWidth = weight;
    ctx.stroke();
    ctx.restore();
  }
}

function wrapText(ctx, text, maxWidth) {
  const words = text.split(/\s+/);
  const lines = [];
  let current = "";
  for (const word of words) {
    const testLine = current ? `${current} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = testLine;
    }
  }
  if (current) {
    lines.push(current);
  }
  return lines;
}

function getHairColor(hero) {
  if (
    hero.alignment === "Villain" ||
    hero.specialty === "Stealth" ||
    /Technological/i.test(hero.origin)
  ) {
    return null;
  }

  const base = hero.secondaryColor || hero.primaryColor || "#4b3d8f";
  if (/Cosmic|Interdimensional/i.test(hero.origin)) {
    return adjustColor(base, 35);
  }
  if (hero.gender === "Female" || hero.gender === "Genderfluid") {
    return adjustColor(base, 20);
  }
  if (hero.alignment === "Anti-hero") {
    return adjustColor(base, -15);
  }
  return adjustColor(base, -5);
}

function createHalftonePattern(ctx, dotColor, backgroundColor, dotSize = 4, spacing = 8) {
  const patternCanvas = document.createElement("canvas");
  const scale = window.devicePixelRatio || 1;
  patternCanvas.width = spacing * scale;
  patternCanvas.height = spacing * scale;
  const patternCtx = patternCanvas.getContext("2d");
  patternCtx.scale(scale, scale);
  patternCtx.fillStyle = backgroundColor;
  patternCtx.fillRect(0, 0, spacing, spacing);
  patternCtx.fillStyle = dotColor;
  patternCtx.beginPath();
  patternCtx.arc(spacing / 2, spacing / 2, dotSize / 2, 0, Math.PI * 2);
  patternCtx.fill();
  return ctx.createPattern(patternCanvas, "repeat");
}

function adjustColor(hex, amount) {
  const { r, g, b } = hexToRgb(hex);
  return `rgb(${clamp(r + amount, 0, 255)}, ${clamp(g + amount, 0, 255)}, ${clamp(b + amount, 0, 255)})`;
}

function darkenColor(hex, amount) {
  return adjustColor(hex, -Math.abs(amount));
}

function setAlpha(hex, alpha) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function hexToRgb(hex) {
  let sanitized = hex.replace("#", "");
  if (sanitized.length === 3) {
    sanitized = sanitized
      .split("")
      .map((char) => char + char)
      .join("");
  }
  const bigint = parseInt(sanitized, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function capitalizeSentences(text) {
  return text.replace(/(^|\.\s+)([a-z])/g, (match, prefix, char) => `${prefix}${char.toUpperCase()}`);
}

// Render initial hero using default form selections
renderHero();
