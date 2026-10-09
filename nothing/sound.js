(function () {
  "use strict";

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  const soundToggle = document.querySelector("#sound-toggle");
  const preferenceKey = "nothing-sound-v1";
  const outdoorScenes = new Set(["street", "belliniSide", "belliniYard", "lowerWillow", "woodline", "carGraveyard", "riverside", "bridge", "market"]);
  const cricketScenes = new Set(["woodline", "carGraveyard", "riverside", "bridge"]);
  const residentialScenes = new Set(["street", "belliniSide", "belliniYard", "lowerWillow", "market"]);
  const riverScenes = new Set(["riverside", "bridge"]);
  const riverMixByScene = {
    bridge: { current: 0.039, ripple: 0.011 },
    riverside: { current: 0.022, ripple: 0.006 },
    street: { current: 0.008, ripple: 0.0018 },
    belliniSide: { current: 0.0032, ripple: 0.0007 },
    market: { current: 0.0011, ripple: 0.00025 }
  };
  const bridgeInteriorScenes = new Set(["drainPassage", "inspectionGallery", "bridgeNook"]);
  let enabled = true;
  let context = null;
  let masterGain = null;
  let noiseBuffer = null;
  let requestedScene = "street";
  let currentScene = null;
  let ambientVoices = [];
  let cricketTimer = null;
  let neighborhoodTimer = null;
  let musicTimer = null;
  let violinTimer = null;
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
    if (neighborhoodTimer !== null) {
      window.clearTimeout(neighborhoodTimer);
      neighborhoodTimer = null;
    }
    if (violinTimer !== null) {
      window.clearTimeout(violinTimer);
      violinTimer = null;
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
    const nearRiver = riverScenes.has(currentScene);
    const wooded = currentScene === "woodline" || currentScene === "carGraveyard";
    const base = wooded ? 3150 + Math.random() * 1050 : 3700 + Math.random() * 850;
    const pulseCount = nearRiver ? 3 + Math.floor(Math.random() * 2) : Math.random() > 0.62 ? 3 : 2;
    const level = currentScene === "bridge" ? 0.019 : nearRiver ? 0.014 : 0.011;
    const spacing = wooded ? 0.1 : 0.075;

    for (let pulse = 0; pulse < pulseCount; pulse += 1) {
      tone(base + pulse * (wooded ? 38 : 55), level, wooded ? 0.055 : 0.045, pulse * spacing, "sine");
    }

    if (nearRiver && Math.random() > 0.55) {
      tone(base - 620, 0.011, 0.05, 0.34, "sine");
      tone(base - 570, 0.011, 0.05, 0.42, "sine");
    }
  }

  function scheduleCricket() {
    if (!canPlay() || !cricketScenes.has(currentScene)) return;
    const delay = currentScene === "bridge"
      ? 650 + Math.random() * 2300
      : currentScene === "riverside"
        ? 1100 + Math.random() * 3300
        : 1900 + Math.random() * 4300;
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

  function trackAmbientVoice(source, gain) {
    const voice = { source: source, gain: gain };
    ambientVoices.push(voice);
    source.addEventListener("ended", function () {
      const index = ambientVoices.indexOf(voice);
      if (index !== -1) ambientVoices.splice(index, 1);
    }, { once: true });
  }

  function violinNote(frequency, duration, delay, level, distant) {
    if (!canPlay()) return;
    const start = context.currentTime + delay;
    const oscillator = context.createOscillator();
    const harmonic = context.createOscillator();
    const harmonicGain = context.createGain();
    const vibrato = context.createOscillator();
    const vibratoDepth = context.createGain();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();

    oscillator.type = "sawtooth";
    oscillator.frequency.setValueAtTime(frequency, start);
    harmonic.type = "triangle";
    harmonic.frequency.setValueAtTime(frequency * 2, start);
    harmonicGain.gain.value = distant ? 0.08 : 0.14;
    vibrato.type = "sine";
    vibrato.frequency.value = 5.2;
    vibratoDepth.gain.value = distant ? 1.2 : 2.6;
    filter.type = "lowpass";
    filter.frequency.value = distant ? 920 : 1850;
    filter.Q.value = distant ? 0.5 : 0.8;

    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(level, start + 0.09);
    gain.gain.setValueAtTime(level, start + Math.max(0.12, duration - 0.16));
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    vibrato.connect(vibratoDepth);
    vibratoDepth.connect(oscillator.frequency);
    oscillator.connect(filter);
    harmonic.connect(harmonicGain);
    harmonicGain.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);
    trackAmbientVoice(oscillator, gain);

    oscillator.start(start);
    harmonic.start(start);
    vibrato.start(start);
    oscillator.stop(start + duration + 0.03);
    harmonic.stop(start + duration + 0.03);
    vibrato.stop(start + duration + 0.03);
  }

  function playViolinPhrase(mode) {
    if (!canPlay() || !["inspectionGallery", "bridgeNook"].includes(currentScene)) return;
    const scene = currentScene;
    const distant = mode === "distant";
    const level = distant ? 0.0028 : 0.0105;
    const notes = [
      [293.66, 0.78],
      [349.23, 0.62],
      [440, 1.02],
      [392, 0.7],
      [349.23, 0.82],
      [329.63, 0.62],
      [293.66, 1.28],
      [261.63, 0.72],
      [293.66, 0.58],
      [349.23, 1.08],
      [329.63, 0.68],
      [293.66, 1.42]
    ];
    let cursor = 0;

    notes.forEach(function (note, index) {
      const expression = 0.9 + ((index * 7) % 4) * 0.035;
      violinNote(note[0], note[1], cursor, level * expression, distant);
      cursor += note[1] * 0.84;
    });

    violinTimer = window.setTimeout(function () {
      violinTimer = null;
      if (currentScene === scene) playViolinPhrase(mode);
    }, Math.round((cursor + 1.7) * 1000));
  }

  function playViolin(mode) {
    if (violinTimer !== null) window.clearTimeout(violinTimer);
    violinTimer = null;
    playViolinPhrase(mode);
  }

  function muffledVoiceUtterance(baseFrequency, duration, delay, pan) {
    if (!canPlay() || !residentialScenes.has(currentScene)) return;
    const start = context.currentTime + delay;
    const oscillator = context.createOscillator();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    const panner = context.createStereoPanner ? context.createStereoPanner() : null;
    const syllables = Math.max(3, Math.round(duration / 0.19));

    oscillator.type = "sawtooth";
    oscillator.frequency.setValueAtTime(baseFrequency, start);
    filter.type = "lowpass";
    filter.frequency.value = 610;
    filter.Q.value = 0.9;
    gain.gain.setValueAtTime(0.0001, start);

    for (let syllable = 0; syllable < syllables; syllable += 1) {
      const syllableStart = start + syllable * (duration / syllables);
      const syllableLength = duration / syllables;
      const level = 0.0036 + ((syllable * 7) % 3) * 0.00065;
      const inflection = 0.9 + (((syllable * 5) % 4) - 1.5) * 0.055;
      oscillator.frequency.setValueAtTime(baseFrequency * inflection, syllableStart);
      oscillator.frequency.linearRampToValueAtTime(
        baseFrequency * (inflection + (syllable % 2 ? -0.035 : 0.045)),
        syllableStart + syllableLength * 0.72
      );
      gain.gain.setValueAtTime(0.0001, syllableStart);
      gain.gain.exponentialRampToValueAtTime(level, syllableStart + syllableLength * 0.18);
      gain.gain.setValueAtTime(level, syllableStart + syllableLength * 0.55);
      gain.gain.exponentialRampToValueAtTime(0.0001, syllableStart + syllableLength * 0.92);
    }

    oscillator.connect(filter);
    filter.connect(gain);
    if (panner) {
      panner.pan.value = pan;
      gain.connect(panner);
      panner.connect(masterGain);
    } else {
      gain.connect(masterGain);
    }
    trackAmbientVoice(oscillator, gain);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.03);
  }

  function playNeighborhoodConversation() {
    if (!canPlay() || !residentialScenes.has(currentScene)) return;
    const pan = currentScene === "market" ? -0.48 : 0.52;
    const firstVoice = 132 + Math.random() * 24;
    const secondVoice = 184 + Math.random() * 30;

    muffledVoiceUtterance(firstVoice, 0.72, 0, pan);
    muffledVoiceUtterance(secondVoice, 0.9, 0.82, pan + 0.08);
    muffledVoiceUtterance(firstVoice * 1.04, 0.58, 1.88, pan);
    if (Math.random() > 0.46) {
      muffledVoiceUtterance(secondVoice * 0.96, 0.68, 2.62, pan + 0.08);
    }
  }

  function scheduleNeighborhoodConversation(firstWait) {
    if (!canPlay() || !residentialScenes.has(currentScene)) return;
    const delay = firstWait
      ? 8000 + Math.random() * 8000
      : 22000 + Math.random() * 20000;

    neighborhoodTimer = window.setTimeout(function () {
      neighborhoodTimer = null;
      playNeighborhoodConversation();
      scheduleNeighborhoodConversation(false);
    }, delay);
  }

  function muffledBandTone(frequency, level, duration, delay, type, detune) {
    if (!canPlay() || currentScene !== "lowerWillow") return;
    const start = context.currentTime + (delay || 0);
    const oscillator = context.createOscillator();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();

    oscillator.type = type || "sawtooth";
    oscillator.frequency.setValueAtTime(frequency, start);
    oscillator.detune.setValueAtTime(detune || 0, start);
    filter.type = "lowpass";
    filter.frequency.value = 820;
    filter.Q.value = 0.72;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(level, start + 0.025);
    gain.gain.setValueAtTime(level, start + Math.max(0.03, duration - 0.08));
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);
    trackAmbientVoice(oscillator, gain);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.02);
  }

  function muffledBandHit(snare, delay) {
    if (!canPlay() || currentScene !== "lowerWillow") return;
    const start = context.currentTime + (delay || 0);
    const duration = snare ? 0.1 : 0.14;
    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();

    source.buffer = noiseBuffer;
    filter.type = snare ? "bandpass" : "lowpass";
    filter.frequency.value = snare ? 680 : 175;
    filter.Q.value = snare ? 0.8 : 0.65;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(snare ? 0.0045 : 0.007, start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);
    trackAmbientVoice(source, gain);
    source.start(start, Math.random() * (noiseBuffer.duration - duration), duration + 0.02);
    source.stop(start + duration + 0.03);
  }

  function playJamiesBandPhrase() {
    if (!canPlay() || currentScene !== "lowerWillow") return;
    const roots = [146.83, 174.61, 196, 174.61];
    const melody = [293.66, 329.63, 349.23, 293.66, 349.23, 392, 349.23, 329.63];

    roots.forEach(function (root, measure) {
      const start = measure * 1.3;
      [0, 0.43, 0.86].forEach(function (offset, strum) {
        const looseness = (measure * 3 + strum) % 2 === 0 ? -7 : 5;
        muffledBandTone(root, 0.0042, 0.34, start + offset, "sawtooth", looseness);
        muffledBandTone(root * 1.4983, 0.0025, 0.3, start + offset + 0.018, "triangle", looseness - 3);
      });
      muffledBandTone(root / 2, 0.0055, 0.72, start, "triangle", measure % 2 ? 4 : -4);
      muffledBandHit(false, start);
      muffledBandHit(true, start + 0.64);
    });

    melody.forEach(function (note, index) {
      muffledBandTone(note, 0.0018, 0.27, index * 0.64 + 0.08, "square", index % 3 === 0 ? -9 : 6);
    });
  }

  function scheduleJamiesBand() {
    if (!canPlay() || currentScene !== "lowerWillow") return;
    playJamiesBandPhrase();
    musicTimer = window.setTimeout(function () {
      musicTimer = null;
      scheduleJamiesBand();
    }, 7600);
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
    if (residentialScenes.has(scene)) scheduleNeighborhoodConversation(true);

    const riverMix = riverMixByScene[scene];
    if (riverMix) {
      startAmbientNoise("lowpass", 430, riverMix.current, 0.5);
      startAmbientNoise("bandpass", 1250, riverMix.ripple, 0.82);
    }

    if (scene === "woodline" || scene === "carGraveyard") {
      startAmbientNoise("bandpass", 2100, 0.005, 0.62);
    }

    if (scene === "pumphouse") {
      startAmbientNoise("lowpass", 340, 0.011, 0.48);
      startAmbientNoise("bandpass", 980, 0.0035, 0.7);
    }

    if (bridgeInteriorScenes.has(scene)) {
      const waterLevel = scene === "drainPassage" ? 0.026 : scene === "bridgeNook" ? 0.012 : 0.006;
      startAmbientNoise("lowpass", 460, waterLevel, 0.52);
      startAmbientNoise("bandpass", 1180, scene === "drainPassage" ? 0.006 : 0.0025, 0.76);
    }

    if (scene === "bridgeNook") {
      startAmbientNoise("bandpass", 720, 0.0024, 0.58);
    }

    if (scene === "pizzeria") schedulePizzeriaMusic();
    if (scene === "lowerWillow") scheduleJamiesBand();
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
    if (["pumphouse", "vestibule", "chamber", "drainPassage", "inspectionGallery", "bridgeNook"].includes(scene)) return "stone";
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

  function tireRoll() {
    if (!canPlay()) return;
    for (let hit = 0; hit < 9; hit += 1) {
      noiseHit("bandpass", 390 + hit * 34, 0.011, 0.09, hit * 0.115, 0.76 + hit * 0.025);
    }
    noiseHit("bandpass", 980, 0.036, 0.2, 1.03, 0.68);
    tone(142, 0.018, 0.34, 1.04, "triangle", 76);
  }

  function shopDoorRattle(opening) {
    if (!canPlay()) return;
    const hits = opening ? 7 : 5;
    for (let hit = 0; hit < hits; hit += 1) {
      noiseHit("bandpass", 480 + (hit % 3) * 140, opening ? 0.022 : 0.016, 0.08, hit * 0.11, 0.68);
      tone(92 + (hit % 2) * 17, opening ? 0.01 : 0.007, 0.09, hit * 0.11, "triangle", 68);
    }
    if (opening) {
      noiseHit("lowpass", 340, 0.026, 0.32, 0.72, 0.55);
      tone(128, 0.012, 0.3, 0.74, "sawtooth", 66);
    }
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

  function garageDoor() {
    noiseHit("bandpass", 460, 0.023, 0.3, 0, 0.68);
    tone(116, 0.01, 0.24, 0.1, "triangle", 72);
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

  function drainEntry() {
    noiseHit("lowpass", 520, 0.027, 0.48, 0, 0.58);
    noiseHit("bandpass", 1250, 0.012, 0.28, 0.08, 0.72);
    tone(118, 0.012, 0.42, 0.1, "triangle", 72);
  }

  function ladderClimb() {
    [0, 0.18, 0.36, 0.54].forEach(function (delay, index) {
      noiseHit("bandpass", 620 + index * 55, 0.012, 0.09, delay, 0.82);
      tone(210 + index * 18, 0.005, 0.11, delay + 0.02, "triangle", 155 + index * 12);
    });
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

    if (["lowerWillow:dannysGarage", "dannysGarage:lowerWillow"].includes(pair)) {
      garageDoor();
    } else if (["street:pizzeria", "pizzeria:street"].includes(pair)) {
      pizzeriaDoor();
    } else if (["pizzeria:restroom", "restroom:pizzeria"].includes(pair)) {
      restroomDoor();
    } else if (["market:piedPiper", "piedPiper:market"].includes(pair)) {
      pieShopDoor();
    } else if (["pizzeria:backroom", "backroom:pizzeria"].includes(pair)) {
      backroomDoor();
    } else if (["bridge:pumphouse", "pumphouse:bridge"].includes(pair)) {
      pumpDoor();
    } else if (["bridge:drainPassage", "drainPassage:bridge"].includes(pair)) {
      drainEntry();
    } else if (["drainPassage:inspectionGallery", "inspectionGallery:drainPassage"].includes(pair)) {
      ladderClimb();
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
    violin: playViolin,
    jamiesBand: playJamiesBandPhrase,
    tireRoll: tireRoll,
    shopDoorRattle: shopDoorRattle,
    transition: transition
  };
}());
