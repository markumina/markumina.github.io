(function () {
  "use strict";

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  const soundToggle = document.querySelector("#sound-toggle");
  const preferenceKey = "nothing-sound-v1";
  const outdoorScenes = new Set(["street", "lowerWillow", "woodline", "carGraveyard", "riverside", "bridge", "market"]);
  const cricketScenes = new Set(["street", "lowerWillow", "woodline", "carGraveyard", "riverside", "bridge", "market", "pumphouse"]);
  const riverScenes = new Set(["riverside", "bridge"]);
  let enabled = true;
  let context = null;
  let masterGain = null;
  let noiseBuffer = null;
  let requestedScene = "street";
  let currentScene = null;
  let ambientVoices = [];
  let cricketTimer = null;
  let musicTimer = null;
  let stepIndex = 0;

  try {
    enabled = window.localStorage.getItem(preferenceKey) !== "off";
  } catch {
    enabled = true;
  }

  function updateToggle() {
    if (!soundToggle) return;
    soundToggle.textContent = enabled ? "SND" : "OFF";
    soundToggle.setAttribute("aria-pressed", enabled ? "true" : "false");
    soundToggle.setAttribute("aria-label", enabled ? "Mute sound" : "Turn on sound");
    soundToggle.title = enabled ? "Mute sound" : "Turn on sound";
  }

  function buildNoiseBuffer() {
    const length = context.sampleRate * 2;
    const buffer = context.createBuffer(1, length, context.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;

    for (let index = 0; index < length; index += 1) {
      const white = Math.random() * 2 - 1;
      last = (last + white * 0.18) / 1.16;
      data[index] = white * 0.62 + last * 0.38;
    }

    return buffer;
  }

  function createAudio() {
    if (context || !AudioContextClass) return;
    context = new AudioContextClass();
    masterGain = context.createGain();
    masterGain.gain.value = enabled ? 0.42 : 0;
    masterGain.connect(context.destination);
    noiseBuffer = buildNoiseBuffer();
  }

  function canPlay() {
    return enabled && context && masterGain && noiseBuffer;
  }

  function stopAmbient() {
    if (cricketTimer !== null) {
      window.clearTimeout(cricketTimer);
      cricketTimer = null;
    }
    if (musicTimer !== null) {
      window.clearTimeout(musicTimer);
      musicTimer = null;
    }

    if (context) {
      const now = context.currentTime;
      ambientVoices.forEach(function (voice) {
        try {
          voice.gain.gain.cancelScheduledValues(now);
          voice.gain.gain.setValueAtTime(Math.max(0.0001, voice.gain.gain.value), now);
          voice.gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
          voice.source.stop(now + 0.4);
        } catch {
          // A voice may already have finished while the scene was changing.
        }
      });
    }

    ambientVoices = [];
    currentScene = null;
  }

  function startAmbientNoise(filterType, frequency, level, playbackRate) {
    if (!canPlay()) return;
    const now = context.currentTime;
    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();

    source.buffer = noiseBuffer;
    source.loop = true;
    source.playbackRate.value = playbackRate || 1;
    filter.type = filterType;
    filter.frequency.value = frequency;
    filter.Q.value = 0.7;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(level, now + 0.9);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);
    source.start(now, Math.random() * noiseBuffer.duration);
    ambientVoices.push({ source: source, gain: gain });
  }

  function tone(frequency, level, duration, delay, type, endFrequency) {
    if (!canPlay()) return;
    const start = context.currentTime + (delay || 0);
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = type || "sine";
    oscillator.frequency.setValueAtTime(frequency, start);
    if (endFrequency) oscillator.frequency.exponentialRampToValueAtTime(endFrequency, start + duration);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(level, start + Math.min(0.018, duration * 0.2));
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(gain);
    gain.connect(masterGain);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.02);
  }

  function noiseHit(filterType, frequency, level, duration, delay, playbackRate) {
    if (!canPlay()) return;
    const start = context.currentTime + (delay || 0);
    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    const maxOffset = Math.max(0, noiseBuffer.duration - duration - 0.05);

    source.buffer = noiseBuffer;
    source.playbackRate.value = playbackRate || 1;
    filter.type = filterType;
    filter.frequency.value = frequency;
    filter.Q.value = 1.1;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(level, start + Math.min(0.012, duration * 0.2));
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);
    source.start(start, Math.random() * maxOffset, duration + 0.02);
    source.stop(start + duration + 0.03);
  }

  function playCricket() {
    if (!canPlay() || !cricketScenes.has(currentScene)) return;
    const nearPumpStation = currentScene === "bridge";
    const indoors = currentScene === "pumphouse";
    const base = 3700 + Math.random() * 850;
    const pulseCount = nearPumpStation ? 3 + Math.floor(Math.random() * 2) : Math.random() > 0.55 ? 3 : 2;
    const level = nearPumpStation ? 0.019 : indoors ? 0.006 : 0.012;

    for (let pulse = 0; pulse < pulseCount; pulse += 1) {
      tone(base + pulse * 55, level, 0.045, pulse * 0.075, "sine");
    }

    if (nearPumpStation && Math.random() > 0.55) {
      tone(base - 620, 0.011, 0.05, 0.34, "sine");
      tone(base - 570, 0.011, 0.05, 0.42, "sine");
    }
  }

  function scheduleCricket() {
    if (!canPlay() || !cricketScenes.has(currentScene)) return;
    const delay = currentScene === "bridge"
      ? 650 + Math.random() * 2300
      : currentScene === "pumphouse"
        ? 1900 + Math.random() * 3600
        : 1400 + Math.random() * 4200;
    cricketTimer = window.setTimeout(function () {
      cricketTimer = null;
      playCricket();
      scheduleCricket();
    }, delay);
  }

  function playPizzeriaPhrase() {
    if (!canPlay() || currentScene !== "pizzeria") return;
    const melody = [
      440, 523.25, 659.25, 523.25,
      493.88, 587.33, 698.46, 587.33,
      440, 523.25, 659.25, 783.99,
      659.25, 587.33, 523.25, 493.88
    ];

    melody.forEach(function (note, index) {
      tone(note, 0.0042, 0.2, index * 0.27, "triangle");
    });

    [220, 196, 174.61, 164.81].forEach(function (note, index) {
      tone(note, 0.0032, 0.46, index * 1.08, "sine");
    });
  }

  function schedulePizzeriaMusic() {
    if (!canPlay() || currentScene !== "pizzeria") return;
    playPizzeriaPhrase();
    musicTimer = window.setTimeout(function () {
      musicTimer = null;
      schedulePizzeriaMusic();
    }, 6800);
  }

  function syncScene(scene) {
    requestedScene = scene;
    if (!canPlay() || context.state !== "running" || currentScene === scene) return;

    stopAmbient();
    currentScene = scene;

    if (outdoorScenes.has(scene)) {
      startAmbientNoise("lowpass", 1050, 0.011, 0.72);
    }

    if (cricketScenes.has(scene)) scheduleCricket();

    if (riverScenes.has(scene)) {
      const riverLevel = scene === "bridge" ? 0.039 : 0.022;
      const rippleLevel = scene === "bridge" ? 0.011 : 0.006;
      startAmbientNoise("lowpass", 430, riverLevel, 0.5);
      startAmbientNoise("bandpass", 1250, rippleLevel, 0.82);
    }

    if (scene === "woodline" || scene === "carGraveyard") {
      startAmbientNoise("bandpass", 2100, 0.005, 0.62);
    }

    if (scene === "pumphouse") {
      startAmbientNoise("lowpass", 340, 0.011, 0.48);
      startAmbientNoise("bandpass", 980, 0.0035, 0.7);
    }

    if (scene === "pizzeria") schedulePizzeriaMusic();
  }

  function arm() {
    if (!enabled || !AudioContextClass) return;
    createAudio();
    const resume = context.state === "suspended" ? context.resume() : Promise.resolve();
    resume.then(function () {
      const now = context.currentTime;
      masterGain.gain.cancelScheduledValues(now);
      masterGain.gain.setTargetAtTime(0.42, now, 0.04);
      syncScene(requestedScene);
    }).catch(function () {
      // A later user gesture will make another attempt.
    });
  }

  function sceneSurface(scene) {
    if (["lowerWillow", "woodline", "carGraveyard"].includes(scene)) return "gravel";
    if (["pizzeria", "restroom", "piedPiper"].includes(scene)) return "tile";
    if (scene === "backroom") return "wood";
    if (["pumphouse", "vestibule", "chamber"].includes(scene)) return "stone";
    return "pavement";
  }

  function step(scene, limping) {
    if (!canPlay() || context.state !== "running") return;
    const surface = sceneSurface(scene);
    const variation = stepIndex % 2 === 0 ? 1 : 0.9;
    stepIndex += 1;

    if (surface === "gravel") {
      noiseHit("highpass", 950, 0.024 * variation, 0.065, 0, 1.15);
      noiseHit("bandpass", 2350, 0.012, 0.075, 0.035, 1.3);
    } else if (surface === "tile") {
      noiseHit("highpass", 1500, 0.009 * variation, 0.035, 0, 1.1);
      tone(145 * variation, 0.008, 0.07, 0, "triangle", 105);
    } else if (surface === "wood") {
      noiseHit("bandpass", 520, 0.016 * variation, 0.075, 0, 0.82);
      tone(105 * variation, 0.008, 0.09, 0, "sine", 78);
    } else if (surface === "stone") {
      noiseHit("bandpass", 760, 0.016 * variation, 0.055, 0, 0.92);
      tone(82 * variation, 0.009, 0.08, 0, "triangle", 62);
    } else {
      noiseHit("bandpass", 1020, 0.014 * variation, 0.05, 0, 1);
      tone(92 * variation, 0.006, 0.065, 0, "sine", 72);
    }

    if (limping) {
      noiseHit("bandpass", surface === "gravel" ? 1450 : 680, 0.01, 0.12, 0.07, 0.78);
    }
  }

  function trip(scene) {
    if (!canPlay()) return;
    const surface = sceneSurface(scene);
    const frequency = surface === "gravel" ? 1300 : surface === "tile" ? 950 : 620;
    noiseHit("bandpass", frequency, 0.035, 0.22, 0, 0.8);
    noiseHit("lowpass", 260, 0.025, 0.18, 0.12, 0.72);
    tone(78, 0.014, 0.18, 0.12, "triangle", 52);
  }

  function bracelet() {
    if (!canPlay()) return;
    tone(740, 0.009, 0.28, 0, "sine", 980);
    tone(1110, 0.008, 0.34, 0.11, "sine", 1480);
    tone(1660, 0.006, 0.42, 0.23, "sine", 1940);
  }

  function mouse() {
    if (!canPlay()) return;
    for (let step = 0; step < 10; step += 1) {
      noiseHit("highpass", 1250 + (step % 3) * 210, 0.008, 0.04, step * 0.12, 1.25);
    }
    tone(1750, 0.0045, 0.09, 0.2, "sine", 2050);
  }

  function trashCan() {
    if (!canPlay()) return;
    noiseHit("bandpass", 920, 0.013, 0.08, 0, 0.82);
    tone(310, 0.007, 0.12, 0.03, "triangle", 245);
    noiseHit("bandpass", 1180, 0.01, 0.07, 0.34, 0.9);
    tone(270, 0.006, 0.11, 0.38, "triangle", 215);
  }

  function pizzeriaDoor() {
    noiseHit("bandpass", 540, 0.025, 0.32, 0, 0.72);
    tone(180, 0.012, 0.14, 0.15, "triangle", 115);
    tone(1080, 0.009, 0.42, 0.08, "sine", 880);
  }

  function pieShopDoor() {
    noiseHit("bandpass", 650, 0.018, 0.24, 0, 0.8);
    tone(1380, 0.009, 0.48, 0.05, "sine", 1260);
    tone(1840, 0.007, 0.52, 0.16, "sine", 1640);
  }

  function backroomDoor() {
    noiseHit("bandpass", 430, 0.024, 0.36, 0, 0.66);
    tone(125, 0.012, 0.2, 0.2, "triangle", 82);
  }

  function restroomDoor() {
    noiseHit("bandpass", 720, 0.014, 0.2, 0, 0.86);
    tone(210, 0.008, 0.1, 0.08, "triangle", 150);
    tone(118, 0.007, 0.12, 0.19, "sine", 84);
  }

  function pumpDoor() {
    noiseHit("lowpass", 480, 0.036, 0.58, 0, 0.55);
    tone(104, 0.018, 0.48, 0.12, "sawtooth", 48);
  }

  function hatchDoor() {
    noiseHit("lowpass", 360, 0.032, 0.5, 0, 0.5);
    tone(72, 0.017, 0.42, 0.13, "triangle", 44);
  }

  function stoneDoor() {
    noiseHit("lowpass", 290, 0.035, 0.72, 0, 0.44);
    tone(58, 0.019, 0.64, 0.08, "sawtooth", 38);
  }

  function portalSound() {
    noiseHit("bandpass", 1700, 0.022, 0.85, 0, 0.62);
    tone(86, 0.018, 0.9, 0, "sine", 42);
  }

  function transition(fromScene, toScene) {
    if (!canPlay()) return;
    const pair = fromScene + ":" + toScene;

    if (["street:pizzeria", "pizzeria:street"].includes(pair)) {
      pizzeriaDoor();
    } else if (["pizzeria:restroom", "restroom:pizzeria"].includes(pair)) {
      restroomDoor();
    } else if (["market:piedPiper", "piedPiper:market"].includes(pair)) {
      pieShopDoor();
    } else if (["pizzeria:backroom", "backroom:pizzeria"].includes(pair)) {
      backroomDoor();
    } else if (["bridge:pumphouse", "pumphouse:bridge"].includes(pair)) {
      pumpDoor();
    } else if (["pumphouse:vestibule", "vestibule:pumphouse"].includes(pair)) {
      hatchDoor();
    } else if (["vestibule:chamber", "chamber:vestibule"].includes(pair)) {
      stoneDoor();
    } else if (toScene === "cosmos") {
      portalSound();
    }
  }

  function toggleSound(event) {
    event.preventDefault();
    event.stopPropagation();
    enabled = !enabled;

    try {
      window.localStorage.setItem(preferenceKey, enabled ? "on" : "off");
    } catch {
      // The preference only lasts for this page when storage is unavailable.
    }

    updateToggle();

    if (enabled) {
      arm();
      return;
    }

    stopAmbient();
    if (context && masterGain) {
      const now = context.currentTime;
      masterGain.gain.cancelScheduledValues(now);
      masterGain.gain.setTargetAtTime(0.0001, now, 0.03);
    }
  }

  updateToggle();

  if (!AudioContextClass && soundToggle) {
    soundToggle.hidden = true;
  } else {
    document.addEventListener("pointerdown", arm, true);
    document.addEventListener("keydown", arm, true);
    if (soundToggle) soundToggle.addEventListener("click", toggleSound);
  }

  window.NOTHING_SOUND = {
    syncScene: syncScene,
    step: step,
    trip: trip,
    bracelet: bracelet,
    mouse: mouse,
    trashCan: trashCan,
    transition: transition
  };
}());
