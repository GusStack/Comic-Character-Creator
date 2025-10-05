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

  drawBackdrop(ctx, width, canvasHeight, hero);

  const figureHeight = mapHeight(height, canvasHeight);
  const centerX = width / 2;
  const baseY = canvasHeight * 0.84;
  const metrics = createFigureMetrics(centerX, baseY, figureHeight);

  drawGroundShadow(ctx, metrics);

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

  drawSpeechBubble(ctx, metrics, hero, width, canvasHeight);
  drawActionBurst(ctx, metrics, hero);
  drawPanelFrame(ctx, width, canvasHeight, name, alignment, accentColor);
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

function drawGroundShadow(ctx, metrics) {
  ctx.save();
  ctx.fillStyle = setAlpha("#000000", 0.42);
  ctx.beginPath();
  ctx.ellipse(
    metrics.centerX,
    metrics.baseY + metrics.figureHeight * 0.02,
    metrics.figureHeight * 0.32,
    metrics.figureHeight * 0.12,
    0,
    0,
    Math.PI * 2
  );
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
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(metrics.centerX - capeWidth * 0.4, capeTop);
  ctx.quadraticCurveTo(
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
      ctx.lineTo(x, peak);
    }
  }
  ctx.quadraticCurveTo(
    metrics.centerX + capeWidth * 0.7,
    metrics.baseY - metrics.figureHeight * 0.08,
    metrics.centerX + capeWidth * 0.4,
    capeTop
  );
  ctx.closePath();
  ctx.fill();
  ctx.lineWidth = metrics.inkWeight * 0.9;
  ctx.strokeStyle = setAlpha("#050209", 0.9);
  ctx.stroke();
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

function drawPanelFrame(ctx, width, height, name, alignment, accent) {
  ctx.save();
  ctx.lineWidth = 8;
  ctx.strokeStyle = "#050209";
  ctx.strokeRect(12, 12, width - 24, height - 24);

  ctx.lineWidth = 2;
  ctx.strokeStyle = "#f7f2c7";
  ctx.strokeRect(6, 6, width - 12, height - 12);

  const captionHeight = 48;
  ctx.fillStyle = setAlpha("#fff9d0", 0.92);
  ctx.fillRect(24, height - captionHeight - 16, width - 48, captionHeight);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#050209";
  ctx.strokeRect(24, height - captionHeight - 16, width - 48, captionHeight);

  ctx.fillStyle = "#050209";
  ctx.font = "bold 20px 'Bangers', 'Comic Neue', sans-serif";
  ctx.textBaseline = "middle";
  ctx.fillText(name || "Unnamed Legend", 36, height - captionHeight - 16 + captionHeight / 2);

  ctx.font = "bold 16px 'Comic Neue', sans-serif";
  ctx.fillStyle = adjustColor(accent, 40);
  ctx.fillText(alignment, width - 150, height - captionHeight - 16 + captionHeight / 2);
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

function drawSpeechBubble(ctx, metrics, hero, width, height) {
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
  const rawMessage = powerLine || backstoryLine || fallback;
  if (!rawMessage) {
    return;
  }
  const message = rawMessage.toUpperCase();

  ctx.save();
  ctx.font = "600 16px 'Inter', sans-serif";
  const maxBubbleWidth = width * 0.72;
  const lines = wrapText(ctx, message, maxBubbleWidth - 48);
  const measured = lines.map((line) => ctx.measureText(line).width);
  const bubbleWidth = Math.min(
    maxBubbleWidth,
    Math.max(width * 0.38, Math.max(...measured) + 36)
  );
  const bubbleHeight = lines.length * 22 + 34;
  const bubbleX = Math.max(20, width * 0.08);
  const bubbleY = clamp(
    metrics.topY - metrics.figureHeight * 0.24,
    18,
    height * 0.45
  );
  const tailX = clamp(metrics.centerX - metrics.shoulderWidth * 0.12, bubbleX + 24, bubbleX + bubbleWidth - 24);
  const tailY = metrics.eyeY + metrics.headHeight * 0.25;

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

function drawActionBurst(ctx, metrics, hero) {
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
  const text = (specialtyWords[hero.specialty] || alignmentWords[hero.alignment] || "POW!").toUpperCase();

  ctx.save();
  ctx.translate(
    metrics.centerX + metrics.shoulderWidth * 1.05,
    metrics.baseY - metrics.figureHeight * 0.62
  );
  ctx.rotate(-0.1);
  const spikes = 16;
  const radius = metrics.figureHeight * 0.22;
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
form.dispatchEvent(new Event("submit", { cancelable: true }));
