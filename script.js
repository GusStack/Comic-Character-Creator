const form = document.getElementById("character-form");
const canvas = document.getElementById("hero-canvas");
const ctx = canvas.getContext("2d");

const sheetName = document.getElementById("sheet-name");
const sheetSummary = document.getElementById("sheet-summary");
const sheetPower = document.getElementById("sheet-power");
const sheetTraits = document.getElementById("sheet-traits");
const sheetBackstory = document.getElementById("sheet-backstory");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  const traits = formData.getAll("traits");
  const heroData = {
    name: formData.get("name")?.trim() || "Unnamed Legend",
    gender: formData.get("gender"),
    alignment: formData.get("alignment"),
    origin: formData.get("origin"),
    specialty: formData.get("specialty"),
    height: formData.get("height"),
    traits,
    primaryColor: formData.get("primaryColor"),
    secondaryColor: formData.get("secondaryColor"),
    accentColor: formData.get("accentColor"),
    power: formData.get("power")?.trim(),
    backstory: formData.get("backstory")?.trim(),
  };

  updateSheet(heroData);
  drawHero(heroData);
});

function updateSheet(hero) {
  sheetName.textContent = hero.name;

  const summary = `${hero.alignment} ${hero.origin.toLowerCase()} ${hero.specialty.toLowerCase()} (${hero.gender.toLowerCase()}, ${hero.height.toLowerCase()} build)`;
  sheetSummary.textContent = capitalizeSentences(summary);

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
  const { primaryColor, secondaryColor, accentColor, alignment, origin, height } = hero;
  const { width, height: canvasHeight } = canvas;

  ctx.clearRect(0, 0, width, canvasHeight);

  const backgroundGradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
  backgroundGradient.addColorStop(0, adjustColor(primaryColor, 40));
  backgroundGradient.addColorStop(1, "#08081f");
  ctx.fillStyle = backgroundGradient;
  ctx.fillRect(0, 0, width, canvasHeight);

  if (origin.includes("Cosmic") || origin.includes("Interdimensional")) {
    renderStars(ctx, width, canvasHeight, accentColor);
  } else if (origin.includes("Technological")) {
    renderCircuitry(ctx, width, canvasHeight, secondaryColor);
  }

  const bodyHeight = mapHeight(height, canvasHeight);
  const bodyWidth = bodyHeight * 0.35;
  const baseY = canvasHeight * 0.85;
  const centerX = width / 2;

  if (alignment === "Hero" || alignment === "Anti-hero") {
    drawCape(ctx, centerX, baseY, bodyHeight, secondaryColor, alignment === "Anti-hero");
  } else if (alignment === "Villain") {
    drawCape(ctx, centerX, baseY, bodyHeight, darkenColor(secondaryColor, 45), true);
  }

  drawBody(ctx, centerX, baseY, bodyWidth, bodyHeight, primaryColor, accentColor);
  drawHead(ctx, centerX, baseY - bodyHeight - bodyWidth * 0.25, bodyWidth * 0.4, accentColor);
  drawEmblem(ctx, centerX, baseY - bodyHeight * 0.55, bodyWidth * 0.45, accentColor);

  if (hero.specialty === "Mystic") {
    drawAura(ctx, centerX, baseY - bodyHeight * 0.4, bodyWidth * 1.6, accentColor, 0.25);
  } else if (hero.specialty === "Speedster") {
    drawSpeedLines(ctx, centerX, baseY, bodyHeight, accentColor);
  } else if (hero.specialty === "Stealth") {
    drawShadow(ctx, centerX, baseY, bodyWidth, bodyHeight, secondaryColor);
  }

  if (hero.power) {
    drawPowerGlyph(ctx, centerX, baseY - bodyHeight * 1.2, accentColor);
  }
}

function mapHeight(heightLabel, canvasHeight) {
  const ratios = {
    Short: 0.38,
    Average: 0.45,
    Tall: 0.5,
    Towering: 0.58,
  };
  return canvasHeight * (ratios[heightLabel] || ratios.Average);
}

function drawCape(ctx, centerX, baseY, bodyHeight, color, jagged = false) {
  ctx.save();
  const topY = baseY - bodyHeight * 0.9;
  const width = bodyHeight * 0.7;
  const gradient = ctx.createLinearGradient(centerX, topY, centerX, baseY);
  gradient.addColorStop(0, adjustColor(color, 40));
  gradient.addColorStop(1, adjustColor(color, -30));
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(centerX - width / 2, topY);
  ctx.quadraticCurveTo(centerX - width, baseY - bodyHeight * 0.2, centerX - width / 2, baseY);
  if (jagged) {
    for (let i = 0; i < 4; i++) {
      const offset = (width / 4) * i;
      const peakY = baseY + (i % 2 === 0 ? 14 : -10);
      ctx.lineTo(centerX - width / 2 + offset, peakY);
    }
  }
  ctx.lineTo(centerX + width / 2, baseY);
  ctx.quadraticCurveTo(centerX + width, baseY - bodyHeight * 0.2, centerX + width / 2, topY);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawBody(ctx, centerX, baseY, bodyWidth, bodyHeight, color, accent) {
  ctx.save();
  const torsoHeight = bodyHeight * 0.65;
  const legHeight = bodyHeight * 0.35;
  const shoulderWidth = bodyWidth * 1.2;

  const gradient = ctx.createLinearGradient(centerX, baseY - bodyHeight, centerX, baseY);
  gradient.addColorStop(0, adjustColor(color, 25));
  gradient.addColorStop(1, adjustColor(color, -20));
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(centerX - shoulderWidth / 2, baseY - bodyHeight);
  ctx.lineTo(centerX + shoulderWidth / 2, baseY - bodyHeight);
  ctx.lineTo(centerX + bodyWidth / 2, baseY - legHeight);
  ctx.quadraticCurveTo(centerX + bodyWidth * 0.6, baseY, centerX, baseY);
  ctx.quadraticCurveTo(centerX - bodyWidth * 0.6, baseY, centerX - bodyWidth / 2, baseY - legHeight);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = adjustColor(accent, 20);
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(centerX, baseY - bodyHeight);
  ctx.lineTo(centerX, baseY);
  ctx.stroke();

  ctx.fillStyle = accent;
  ctx.fillRect(centerX - bodyWidth * 0.45, baseY - legHeight - 6, bodyWidth * 0.9, 12);
  ctx.restore();
}

function drawHead(ctx, centerX, headCenterY, radius, accentColor) {
  ctx.save();
  const gradient = ctx.createRadialGradient(centerX, headCenterY, radius * 0.3, centerX, headCenterY, radius);
  gradient.addColorStop(0, accentColor);
  gradient.addColorStop(1, adjustColor(accentColor, -40));
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(centerX, headCenterY, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(255,255,255,0.3)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(centerX, headCenterY, radius * 0.65, Math.PI * 0.25, Math.PI * 0.75);
  ctx.arc(centerX, headCenterY, radius * 0.65, Math.PI * 1.25, Math.PI * 1.75, true);
  ctx.stroke();
  ctx.restore();
}

function drawEmblem(ctx, centerX, y, width, accent) {
  ctx.save();
  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.moveTo(centerX, y - width * 0.6);
  ctx.lineTo(centerX + width / 2, y);
  ctx.quadraticCurveTo(centerX, y + width * 0.8, centerX - width / 2, y);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawAura(ctx, centerX, y, radius, color, alpha) {
  ctx.save();
  const gradient = ctx.createRadialGradient(centerX, y, radius * 0.2, centerX, y, radius);
  gradient.addColorStop(0, setAlpha(color, alpha));
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(centerX, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawSpeedLines(ctx, centerX, baseY, bodyHeight, color) {
  ctx.save();
  ctx.strokeStyle = setAlpha(color, 0.6);
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  for (let i = -3; i <= 3; i++) {
    ctx.beginPath();
    const y = baseY - bodyHeight * 0.5 + i * 14;
    ctx.moveTo(centerX - 120, y);
    ctx.lineTo(centerX + 120, y - 12);
    ctx.stroke();
  }
  ctx.restore();
}

function drawShadow(ctx, centerX, baseY, bodyWidth, bodyHeight, color) {
  ctx.save();
  ctx.fillStyle = setAlpha(color, 0.35);
  ctx.beginPath();
  ctx.ellipse(centerX, baseY + 18, bodyWidth * 1.6, bodyHeight * 0.25, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawPowerGlyph(ctx, centerX, y, color) {
  ctx.save();
  ctx.strokeStyle = setAlpha(color, 0.8);
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(centerX, y, 26, 0, Math.PI * 2);
  ctx.moveTo(centerX - 14, y);
  ctx.lineTo(centerX, y + 18);
  ctx.lineTo(centerX + 14, y - 12);
  ctx.stroke();
  ctx.restore();
}

function renderStars(ctx, width, height, color) {
  ctx.save();
  for (let i = 0; i < 40; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height * 0.6;
    const size = Math.random() * 2.5 + 0.5;
    ctx.fillStyle = setAlpha(color, Math.random() * 0.6 + 0.2);
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function renderCircuitry(ctx, width, height, color) {
  ctx.save();
  ctx.strokeStyle = setAlpha(color, 0.4);
  ctx.lineWidth = 1.5;
  for (let x = 30; x < width; x += 45) {
    ctx.beginPath();
    ctx.moveTo(x, height * 0.1);
    ctx.lineTo(x, height * 0.8);
    ctx.stroke();
    for (let y = height * 0.2; y < height * 0.8; y += 60) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 22, y + 18);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x + 22, y + 18, 4, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  ctx.restore();
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

// Render a default hero on load
form.dispatchEvent(new Event("submit", { cancelable: true }));
