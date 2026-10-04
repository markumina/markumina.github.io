const SAVE_KEY = "nothing-save-v1";

const itemDetails = {
  deliveryTag: {
    label: "delivery tag",
    speaker: "Billi",
    held: "The old Bellini's delivery tag. Enzo should see it.",
    description: "Rain-softened paper from a delivery made to the pump station in 1978."
  },
  brassToken: {
    label: "brass token",
    speaker: "Mumi",
    held: "The token with the triangular notch. It must fit somewhere.",
    description: "A heavy brass token marked with a small triangle."
  },
  pryBar: {
    label: "pry bar",
    speaker: "Mumi",
    held: "The short pry bar. Good for one stubborn piece of wood.",
    description: "Old iron, short enough to carry, and still solid."
  },
  ceramicFuse: {
    label: "ceramic fuse",
    speaker: "Billi",
    held: "The fuse. There was an empty socket in Enzo's back room.",
    description: "A white ceramic fuse from a box of old electrical parts."
  },
  amberLens: {
    label: "amber lens",
    speaker: "Billi",
    held: "The amber lens. It looks older than the cabinet it was locked in.",
    description: "A thick amber survey lens in a brass ring."
  }
};

const sceneDefinitions = {
  street: {
    image: "assets/scene-street.png",
    alt: "A quiet riverside street with a pizzeria and a path leading down toward a bridge",
    location: "Willow Street / 11:47 PM",
    start: [52, 85],
    walk: { minX: 5, maxX: 95, minY: 72, maxY: 91 },
    hotspots: [
      { action: "streetUtility", label: "utility box", left: 0, top: 50, width: 12, height: 30, walk: [11, 82] },
      { action: "riverStone", label: "round stone", left: 8, top: 66, width: 9, height: 12, walk: [15, 83] },
      { action: "bridgePath", label: "riverside path", left: 11, top: 44, width: 37, height: 45, walk: [26, 80], kind: "exit", arrow: "down-left", arrowX: 25, arrowY: 66 },
      { action: "pizzeriaDoor", label: "Bellini's Pizza", left: 60, top: 29, width: 38, height: 49, walk: [82, 82], kind: "exit", arrow: "right", arrowX: 76, arrowY: 62 }
    ]
  },
  riverside: {
    image: "assets/scene-riverside.png",
    alt: "A quiet riverside path descending from town toward an old stone bridge",
    location: "Riverside Path",
    start: [18, 83],
    walk: { minX: 5, maxX: 95, minY: 69, maxY: 91 },
    hotspots: [
      { action: "riversideBack", label: "Willow Street", left: 0, top: 13, width: 24, height: 68, walk: [10, 76], kind: "exit", arrow: "up-left", arrowX: 38, arrowY: 44 },
      { action: "riversideLamp", label: "old streetlamp", left: 38, top: 29, width: 15, height: 48, walk: [46, 78] },
      { action: "riversideRiver", label: "river", left: 52, top: 43, width: 38, height: 27, walk: [65, 72] },
      { action: "riversideForward", label: "under the bridge", left: 73, top: 29, width: 27, height: 62, walk: [89, 82], kind: "exit", arrow: "right", arrowX: 72, arrowY: 64 }
    ]
  },
  bridge: {
    image: "assets/scene-bridge.png",
    alt: "A path beneath an old bridge beside an abandoned pump building",
    location: "Under Hawthorn Bridge",
    start: [40, 84],
    walk: { minX: 5, maxX: 95, minY: 72, maxY: 91 },
    patches: [
      {
        target: [328, 157, 19, 15],
        source: [304, 157],
        when: function () { return state.flags.deliveryTagFound; }
      }
    ],
    hotspots: [
      { action: "bridgeBack", label: "riverside path", left: 0, top: 45, width: 14, height: 26, walk: [8, 78], kind: "exit", arrow: "left", arrowX: 43, arrowY: 45 },
      { action: "bridgeRiver", label: "river", left: 14, top: 28, width: 32, height: 38, walk: [29, 77] },
      { action: "stormDrain", label: "storm drain", left: 1, top: 74, width: 11, height: 12, walk: [13, 84], kind: "pickup" },
      { action: "pumpDoor", label: "boarded pump building", left: 72, top: 16, width: 27, height: 55, walk: [85, 81], arrow: "right", arrowX: 72, arrowY: 68 },
      { action: "deliveryTag", label: "paper by the step", left: 80, top: 60, width: 16, height: 17, walk: [82, 82], kind: "pickup", when: function () { return !state.flags.deliveryTagFound; } }
    ]
  },
  pizzeria: {
    image: "assets/scene-pizzeria.png",
    alt: "A modest family pizzeria with Enzo behind the counter",
    location: "Bellini's Pizza",
    start: [20, 87],
    walk: { minX: 6, maxX: 94, minY: 67, maxY: 92 },
    hotspots: [
      { action: "pizzeriaExit", label: "Willow Street", left: 0, top: 40, width: 11, height: 50, walk: [8, 84], kind: "exit", arrow: "left" },
      { action: "townPhotos", label: "old town photographs", left: 5, top: 13, width: 31, height: 30, walk: [28, 73] },
      { action: "pizzaCounter", label: "pizza counter", left: 37, top: 38, width: 49, height: 28, walk: [58, 72] },
      { action: "enzo", label: "Enzo Bellini", left: 66, top: 23, width: 17, height: 27, walk: [68, 72] },
      { action: "backroomDoor", label: "back room", left: 86, top: 19, width: 14, height: 52, walk: [90, 78], kind: "exit", arrow: "right" }
    ]
  },
  backroom: {
    image: "assets/scene-backroom.png",
    alt: "A pizzeria back room with old plans, tools, a fuse box, and a locked cabinet",
    location: "Bellini's / Back Room",
    start: [11, 85],
    walk: { minX: 5, maxX: 95, minY: 70, maxY: 92 },
    patches: [
      {
        target: [123, 101, 18, 63],
        source: [141, 101],
        when: function () { return state.flags.pryBarFound; }
      },
      {
        target: [185, 109, 26, 14],
        source: [159, 109],
        when: function () { return state.flags.fuseFound || state.flags.fuseInstalled; }
      },
      {
        target: [321, 61, 29, 31],
        source: [350, 61],
        when: function () { return state.flags.lensTaken; }
      }
    ],
    hotspots: [
      { action: "backroomExit", label: "dining room", left: 0, top: 17, width: 10, height: 70, walk: [7, 84], kind: "exit", arrow: "left" },
      { action: "pryBar", label: "short pry bar", left: 28, top: 34, width: 10, height: 34, walk: [33, 78], kind: "pickup", when: function () { return !state.flags.pryBarFound; } },
      { action: "oldPlans", label: "old bridge plans", left: 36, top: 22, width: 31, height: 27, walk: [51, 72] },
      { action: "ceramicFuse", label: "white ceramic fuse", left: 49, top: 42, width: 13, height: 12, walk: [54, 73], kind: "pickup", when: function () { return !state.flags.fuseFound && !state.flags.fuseInstalled; } },
      { action: "fuseBox", label: "fuse box", left: 69, top: 17, width: 12, height: 30, walk: [73, 73] },
      { action: "cameraCabinet", label: "locked cabinet", left: 81, top: 9, width: 19, height: 60, walk: [87, 77] }
    ]
  },
  pumphouse: {
    image: function () {
      return state.flags.hatchRevealed
        ? "assets/scene-pumphouse-revealed.png"
        : "assets/scene-pumphouse-hidden.png";
    },
    alt: function () {
      return state.flags.hatchRevealed
        ? "An abandoned pump room with a small floor hatch uncovered"
        : "An abandoned pump room with a crate and tarp covering part of the floor";
    },
    location: "Abandoned Pump Station",
    start: [17, 86],
    walk: { minX: 5, maxX: 95, minY: 71, maxY: 92 },
    hotspots: [
      { action: "pumpExit", label: "bridge path", left: 0, top: 12, width: 10, height: 73, walk: [7, 83], kind: "exit", arrow: "left" },
      { action: "workbench", label: "workbench", left: 0, top: 27, width: 28, height: 33, walk: [22, 75] },
      { action: "oldPump", label: "water pumps", left: 29, top: 17, width: 47, height: 43, walk: [52, 72] },
      {
        action: "coveredFloor",
        label: "crate and tarp",
        left: 68,
        top: 48,
        width: 31,
        height: 25,
        walk: [76, 79],
        when: function () { return !state.flags.hatchRevealed; }
      },
      {
        action: "hiddenHatch",
        label: "floor hatch",
        left: 65,
        top: 55,
        width: 24,
        height: 16,
        walk: [72, 78],
        arrow: "down",
        when: function () { return state.flags.hatchRevealed; }
      }
    ]
  },
  vestibule: {
    image: "assets/scene-vestibule.png",
    alt: "A spare stone vestibule with a star mosaic and a circular barrier",
    location: "Below the Pump Station",
    start: [18, 85],
    walk: { minX: 6, maxX: 94, minY: 72, maxY: 91 },
    hotspots: [
      { action: "vestibuleExit", label: "stairs to the pump room", left: 0, top: 13, width: 27, height: 59, walk: [16, 79], kind: "exit", arrow: "left" },
      { action: "mural", label: "star mosaic", left: 36, top: 18, width: 22, height: 28, walk: [46, 72] },
      { action: "pedestal", label: "stone pedestal", left: 38, top: 43, width: 24, height: 26, walk: [50, 76] },
      { action: "barrier", label: "circular stone barrier", left: 67, top: 18, width: 32, height: 53, walk: [81, 78], arrow: "right" }
    ]
  },
  chamber: {
    image: "assets/scene-chamber.png",
    alt: "A dark astronomical chamber with two mechanisms and a dormant stone ring",
    location: "The Chamber",
    start: [17, 86],
    walk: { minX: 6, maxX: 94, minY: 71, maxY: 92 },
    hotspots: [
      { action: "chamberExit", label: "vestibule", left: 0, top: 19, width: 18, height: 52, walk: [10, 81], kind: "exit", arrow: "left" },
      { action: "starDial", label: "brass star dial", left: 35, top: 31, width: 19, height: 33, walk: [44, 75] },
      { action: "riverDial", label: "round floor dial", left: 52, top: 61, width: 19, height: 15, walk: [61, 79] },
      { action: "portal", label: "stone ring", left: 69, top: 15, width: 30, height: 58, walk: [82, 78], arrow: "right" }
    ]
  },
  cosmos: {
    image: "assets/scene-cosmos.png",
    alt: "Two people floating among sparse stars beyond a broken stone ring",
    location: "Nowhere",
    start: [58, 61],
    walk: { minX: 5, maxX: 95, minY: 20, maxY: 90 },
    hotspots: []
  }
};

function owns(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}

function freshState() {
  return {
    version: 1,
    scene: "street",
    inventory: [],
    selectedItem: null,
    flags: {
      introSeen: false,
      bridgeVisited: false,
      deliveryTagFound: false,
      tokenFound: false,
      pizzeriaVisited: false,
      enzoTrusts: false,
      backroomVisited: false,
      pryBarFound: false,
      fuseFound: false,
      fuseInstalled: false,
      lensTaken: false,
      pumpDoorOpen: false,
      pumphouseVisited: false,
      hatchRevealed: false,
      hatchOpen: false,
      vestibuleVisited: false,
      barrierOpen: false,
      chamberVisited: false,
      starDialSet: false,
      riverDialSet: false,
      portalOpen: false,
      ended: false
    }
  };
}

function loadState() {
  const clean = freshState();

  try {
    const saved = JSON.parse(window.localStorage.getItem(SAVE_KEY));
    if (!saved || saved.version !== clean.version) return clean;

    const scene = owns(sceneDefinitions, saved.scene) ? saved.scene : clean.scene;
    const savedInventory = Array.isArray(saved.inventory)
      ? saved.inventory.filter(function (item) { return owns(itemDetails, item); })
      : [];
    const selectedItem = savedInventory.includes(saved.selectedItem) ? saved.selectedItem : null;

    return {
      ...clean,
      ...saved,
      scene: scene,
      inventory: [...new Set(savedInventory)],
      selectedItem: selectedItem,
      flags: { ...clean.flags, ...(saved.flags || {}) }
    };
  } catch {
    return clean;
  }
}

let state = loadState();
let activeDialogue = null;
let dialogueIndex = 0;
let dialogueDone = null;
let walkRequest = 0;
let positions = {
  billi: { x: 52, y: 85 },
  mumi: { x: 47, y: 86 }
};

const gameStage = document.querySelector("#game-stage");
const sceneImage = document.querySelector("#scene-image");
const scenePatches = document.querySelector("#scene-patches");
const sceneLoader = document.querySelector("#scene-loader");
const hotspots = document.querySelector("#hotspots");
const inventory = document.querySelector("#inventory");
const heldItem = document.querySelector("#held-item");
const locationLabel = document.querySelector("#location-label");
const objectLabel = document.querySelector("#object-label");
const dialogue = document.querySelector("#dialogue");
const speaker = document.querySelector("#speaker");
const dialogueLine = document.querySelector("#dialogue-line");
const dialogueNext = document.querySelector("#dialogue-next");
const endingPanel = document.querySelector("#ending-panel");
const playAgain = document.querySelector("#play-again");
const restartGame = document.querySelector("#restart-game");
const billi = document.querySelector("#billi");
const mumi = document.querySelector("#mumi");

function sceneValue(value) {
  return typeof value === "function" ? value() : value;
}

function saveState() {
  try {
    window.localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch {
    // The game remains playable when storage is unavailable.
  }
}

function hasItem(item) {
  return state.inventory.includes(item);
}

function addItem(item) {
  if (!hasItem(item)) state.inventory.push(item);
}

function removeItem(item) {
  state.inventory = state.inventory.filter(function (entry) { return entry !== item; });
  if (state.selectedItem === item) state.selectedItem = null;
}

function setLine(name, text) {
  playDialogue([{ speaker: name, text: text }]);
}

function showDialogueLine() {
  const line = activeDialogue[dialogueIndex];
  dialogue.hidden = false;
  speaker.textContent = line.speaker;
  dialogueLine.textContent = line.text;
  dialogueNext.hidden = false;
}

function playDialogue(lines, onDone) {
  activeDialogue = lines;
  dialogueIndex = 0;
  dialogueDone = onDone || null;
  showDialogueLine();
}

function hideDialogue() {
  activeDialogue = null;
  dialogueDone = null;
  dialogue.hidden = true;
  dialogueNext.hidden = true;
}

function advanceDialogue() {
  if (!activeDialogue) return;

  dialogueIndex += 1;
  if (dialogueIndex < activeDialogue.length) {
    showDialogueLine();
    return;
  }

  const onDone = dialogueDone;
  hideDialogue();
  if (onDone) onDone();
}

function selectItem(item) {
  if (state.selectedItem === item) {
    state.selectedItem = null;
    saveState();
    renderInventory();
    setLine(itemDetails[item].speaker, itemDetails[item].description);
    return;
  }

  state.selectedItem = item;
  saveState();
  renderInventory();
  setLine(itemDetails[item].speaker, itemDetails[item].held);
}

function renderInventory() {
  inventory.replaceChildren();

  if (state.inventory.length === 0) {
    const empty = document.createElement("span");
    empty.className = "inventory-empty";
    empty.textContent = "empty";
    inventory.append(empty);
  } else {
    state.inventory.forEach(function (item) {
      const details = itemDetails[item];
      const button = document.createElement("button");
      button.className = "inventory-item";
      button.type = "button";
      button.textContent = details.label;
      button.title = state.selectedItem === item ? "Put away " + details.label : "Hold " + details.label;
      button.setAttribute("aria-pressed", state.selectedItem === item ? "true" : "false");
      button.addEventListener("click", function () { selectItem(item); });
      button.addEventListener("contextmenu", function (event) {
        event.preventDefault();
        setLine(details.speaker, details.description);
      });
      inventory.append(button);
    });
  }

  if (state.selectedItem) {
    heldItem.hidden = false;
    heldItem.querySelector("strong").textContent = itemDetails[state.selectedItem].label;
  } else {
    heldItem.hidden = true;
  }
}

function showObjectLabel(label) {
  objectLabel.textContent = label;
  objectLabel.hidden = false;
}

function hideObjectLabel() {
  objectLabel.hidden = true;
}

function renderScenePatches(imageSource) {
  scenePatches.replaceChildren();
  const definition = sceneDefinitions[state.scene];

  (definition.patches || []).forEach(function (patch) {
    if (patch.when && !patch.when()) return;

    const target = patch.target;
    const source = patch.source;
    const patchElement = document.createElement("span");
    const patchImage = document.createElement("img");

    patchElement.className = "scene-patch";
    patchElement.style.left = (target[0] / 384 * 100) + "%";
    patchElement.style.top = (target[1] / 256 * 100) + "%";
    patchElement.style.width = (target[2] / 384 * 100) + "%";
    patchElement.style.height = (target[3] / 256 * 100) + "%";

    patchImage.src = imageSource;
    patchImage.alt = "";
    patchImage.draggable = false;
    patchImage.width = 384;
    patchImage.height = 256;
    patchImage.style.width = (384 / target[2] * 100) + "%";
    patchImage.style.height = (256 / target[3] * 100) + "%";
    patchImage.style.left = -(source[0] / target[2] * 100) + "%";
    patchImage.style.top = -(source[1] / target[3] * 100) + "%";

    patchElement.append(patchImage);
    scenePatches.append(patchElement);
  });
}

function renderHotspots() {
  hotspots.replaceChildren();
  const definition = sceneDefinitions[state.scene];

  definition.hotspots.forEach(function (hotspot) {
    if (hotspot.when && !hotspot.when()) return;

    const button = document.createElement("button");
    button.className = "hotspot";
    button.type = "button";
    button.dataset.action = hotspot.action;
    button.dataset.label = hotspot.label;
    if (hotspot.arrow) {
      button.dataset.arrow = hotspot.arrow;
      button.style.setProperty("--arrow-x", (hotspot.arrowX || 50) + "%");
      button.style.setProperty("--arrow-y", (hotspot.arrowY || 50) + "%");
    }
    button.setAttribute("aria-label", hotspot.label);
    button.style.left = hotspot.left + "%";
    button.style.top = hotspot.top + "%";
    button.style.width = hotspot.width + "%";
    button.style.height = hotspot.height + "%";
    button.addEventListener("pointerenter", function () { showObjectLabel(hotspot.label); });
    button.addEventListener("pointerleave", hideObjectLabel);
    button.addEventListener("focus", function () { showObjectLabel(hotspot.label); });
    button.addEventListener("blur", hideObjectLabel);
    hotspots.append(button);
  });
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function quantize(value, pixels) {
  return Math.round((value / 100) * pixels) / pixels * 100;
}

function placeWalker(element, position) {
  element.style.left = quantize(position.x, 384) + "%";
  element.style.top = quantize(position.y, 256) + "%";
}

function renderWalkers() {
  placeWalker(billi, positions.billi);
  placeWalker(mumi, positions.mumi);
}

function resetWalkers(scene) {
  walkRequest += 1;
  billi.classList.remove("is-walking", "is-left");
  mumi.classList.remove("is-walking", "is-left");
  const start = sceneDefinitions[scene].start;

  if (scene === "cosmos") {
    positions = {
      billi: { x: start[0], y: start[1] },
      mumi: { x: start[0] - 10, y: start[1] + 6 }
    };
  } else {
    positions = {
      billi: { x: start[0], y: start[1] },
      mumi: { x: start[0] - 5, y: start[1] + 1 }
    };
  }

  renderWalkers();
}

function setFacing(element, left) {
  element.classList.toggle("is-left", left);
}

function walkTo(x, y, onArrival) {
  if (state.scene === "cosmos") {
    if (onArrival) onArrival();
    return;
  }

  const bounds = sceneDefinitions[state.scene].walk;
  const target = {
    x: clamp(x, bounds.minX, bounds.maxX),
    y: clamp(y, bounds.minY, bounds.maxY)
  };
  const direction = target.x >= positions.billi.x ? 1 : -1;
  const mumiTarget = {
    x: clamp(target.x - direction * 5, bounds.minX, bounds.maxX),
    y: clamp(target.y + 1, bounds.minY, bounds.maxY)
  };
  const billiStart = { ...positions.billi };
  const mumiStart = { ...positions.mumi };
  const distance = Math.hypot(target.x - billiStart.x, (target.y - billiStart.y) * 1.5);

  if (distance < 0.8) {
    positions.billi = target;
    positions.mumi = mumiTarget;
    renderWalkers();
    if (onArrival) onArrival();
    return;
  }

  walkRequest += 1;
  const request = walkRequest;
  const duration = clamp(distance * 34, 260, 1900);
  const startTime = performance.now();
  setFacing(billi, direction < 0);
  setFacing(mumi, direction < 0);
  billi.classList.add("is-walking");
  mumi.classList.add("is-walking");

  function frame(now) {
    if (request !== walkRequest) return;
    const progress = Math.min(1, (now - startTime) / duration);
    positions.billi = {
      x: billiStart.x + (target.x - billiStart.x) * progress,
      y: billiStart.y + (target.y - billiStart.y) * progress
    };
    positions.mumi = {
      x: mumiStart.x + (mumiTarget.x - mumiStart.x) * progress,
      y: mumiStart.y + (mumiTarget.y - mumiStart.y) * progress
    };
    renderWalkers();

    if (progress < 1) {
      window.requestAnimationFrame(frame);
      return;
    }

    billi.classList.remove("is-walking");
    mumi.classList.remove("is-walking");
    if (onArrival) onArrival();
  }

  window.requestAnimationFrame(frame);
}

function renderScene(resetCharacters) {
  const definition = sceneDefinitions[state.scene];
  const imageSource = sceneValue(definition.image);
  const imageAlt = sceneValue(definition.alt);
  const imageChanged = sceneImage.getAttribute("src") !== imageSource;

  gameStage.dataset.scene = state.scene;
  locationLabel.textContent = definition.location;
  sceneImage.alt = imageAlt;
  endingPanel.hidden = !(state.scene === "cosmos" && state.flags.ended);

  if (imageChanged) {
    sceneLoader.hidden = false;
    sceneImage.addEventListener("load", function () { sceneLoader.hidden = true; }, { once: true });
    sceneImage.addEventListener("error", function () {
      sceneLoader.hidden = true;
      setLine("System", "The scene could not be opened.");
    }, { once: true });
    sceneImage.src = imageSource;
  } else if (sceneImage.complete) {
    sceneLoader.hidden = true;
  }

  renderHotspots();
  renderScenePatches(imageSource);
  renderInventory();
  hideObjectLabel();
  if (resetCharacters) resetWalkers(state.scene);
}

function refreshState() {
  saveState();
  renderHotspots();
  renderScenePatches(sceneValue(sceneDefinitions[state.scene].image));
  renderInventory();
}

function goToScene(scene, lines) {
  state.scene = scene;
  state.selectedItem = null;
  saveState();
  renderScene(true);
  if (lines && lines.length) {
    playDialogue(lines);
  } else {
    hideDialogue();
  }
  preloadNextScenes(scene);
}

function enterBridge() {
  const firstVisit = !state.flags.bridgeVisited;
  state.flags.bridgeVisited = true;
  goToScene("bridge", firstVisit ? [
    { speaker: "Billi", text: "The fireflies came all the way down here." },
    { speaker: "Mumi", text: "That pump building is not on the town map." }
  ] : null);
}

function enterPizzeria() {
  const firstVisit = !state.flags.pizzeriaVisited;
  state.flags.pizzeriaVisited = true;
  goToScene("pizzeria", firstVisit ? [
    { speaker: "Enzo", text: "The oven is off, but I can still manage two slices." },
    { speaker: "Billi", text: "We're only walking." },
    { speaker: "Enzo", text: "Under that bridge? Then walk with your eyes open." }
  ] : null);
}

function enterBackroom() {
  const firstVisit = !state.flags.backroomVisited;
  state.flags.backroomVisited = true;
  goToScene("backroom", firstVisit ? [
    { speaker: "Enzo", text: "My father saved everything except useful shelf space." },
    { speaker: "Mumi", text: "These are plans for the bridge." },
    { speaker: "Enzo", text: "And the old pump room under it. Take what helps." }
  ] : null);
}

function enterPumphouse() {
  const firstVisit = !state.flags.pumphouseVisited;
  state.flags.pumphouseVisited = true;
  goToScene("pumphouse", firstVisit ? [
    { speaker: "Billi", text: "It smells like river water and old pennies." },
    { speaker: "Mumi", text: "The fireflies got in before we did." }
  ] : null);
}

function enterVestibule() {
  const firstVisit = !state.flags.vestibuleVisited;
  state.flags.vestibuleVisited = true;
  goToScene("vestibule", firstVisit ? [
    { speaker: "Mumi", text: "This is not part of the pump station." },
    { speaker: "Billi", text: "No. The pump station is sitting on top of it." }
  ] : null);
}

function enterChamber() {
  const firstVisit = !state.flags.chamberVisited;
  state.flags.chamberVisited = true;
  goToScene("chamber", firstVisit ? [
    { speaker: "Billi", text: "This is not a basement." },
    { speaker: "Mumi", text: "Basements usually have ceilings." }
  ] : null);
}

function enterCosmos() {
  state.scene = "cosmos";
  state.selectedItem = null;
  saveState();
  renderScene(true);
  playDialogue([
    { speaker: "Billi", text: "Mumi." },
    { speaker: "Mumi", text: "I know." },
    { speaker: "Billi", text: "There is no down." },
    { speaker: "Mumi", text: "Then don't let go." }
  ], function () {
    state.flags.ended = true;
    saveState();
    endingPanel.hidden = false;
    playAgain.focus();
  });
}

const actions = {
  streetUtility: function () {
    setLine("Mumi", "New lock, old box. The cable runs downhill.");
  },

  riverStone: function () {
    setLine("Billi", "Just a cold round stone. It can stay here.");
  },

  bridgePath: function () { goToScene("riverside"); },
  pizzeriaDoor: enterPizzeria,

  riversideBack: function () { goToScene("street"); },

  riversideLamp: function () {
    setLine("Mumi", "The bulb is warm. Someone still maintains this path.");
  },

  riversideRiver: function () {
    setLine("Billi", "The river is almost black from here.");
  },

  riversideForward: enterBridge,

  bridgeBack: function () { goToScene("riverside"); },

  bridgeRiver: function () {
    setLine("Billi", "The current and the reflected lights are moving in opposite directions.");
  },

  stormDrain: function () {
    if (state.flags.tokenFound) {
      setLine("Mumi", "Nothing else in the drain but rainwater.");
      return;
    }
    state.flags.tokenFound = true;
    addItem("brassToken");
    refreshState();
    setLine("Mumi", "A brass token was caught in the grate. It has a triangular notch.");
  },

  deliveryTag: function () {
    if (state.flags.deliveryTagFound) {
      setLine("Billi", "Only a clean patch of dust remains by the step.");
      return;
    }
    state.flags.deliveryTagFound = true;
    addItem("deliveryTag");
    refreshState();
    setLine("Billi", "An old Bellini's delivery tag. The destination says pump station.");
  },

  pumpDoor: function () {
    if (state.flags.pumpDoorOpen) {
      enterPumphouse();
      return;
    }
    setLine("Mumi", "The lock is gone, but one swollen plank is holding the door shut.");
  },

  pizzeriaExit: function () { goToScene("street"); },

  townPhotos: function () {
    setLine("Billi", "One photograph shows Enzo's father carrying pizza boxes under the bridge.");
  },

  pizzaCounter: function () {
    setLine("Mumi", "Two slices left. Finally, a problem with an obvious answer.");
  },

  enzo: function () {
    if (state.flags.enzoTrusts) {
      setLine("Enzo", "The back room is open. Mind the flour sacks.");
      return;
    }
    setLine("Enzo", "My father used to make deliveries under that bridge. Long time ago.");
  },

  backroomDoor: function () {
    if (!state.flags.enzoTrusts) {
      setLine("Enzo", "Family storage. What did you find under the bridge?");
      return;
    }
    enterBackroom();
  },

  backroomExit: function () { goToScene("pizzeria"); },

  pryBar: function () {
    if (state.flags.pryBarFound) {
      setLine("Mumi", "A clean line in the dust marks where the pry bar was.");
      return;
    }
    state.flags.pryBarFound = true;
    addItem("pryBar");
    refreshState();
    setLine("Mumi", "A short iron pry bar. Not elegant, but neither is that boarded door.");
  },

  oldPlans: function () {
    setLine("Billi", "The bridge plans show a pump room. The sheet ends where the floor should be.");
  },

  ceramicFuse: function () {
    if (state.flags.fuseFound || state.flags.fuseInstalled) {
      setLine("Billi", "The workbench is mostly tomato tins now.");
      return;
    }
    state.flags.fuseFound = true;
    addItem("ceramicFuse");
    refreshState();
    setLine("Billi", "A ceramic fuse. It is the same size as the empty socket on the wall.");
  },

  fuseBox: function () {
    if (state.flags.fuseInstalled) {
      setLine("Mumi", "The cabinet circuit is live again.");
      return;
    }
    setLine("Billi", "The right-hand socket is empty.");
  },

  cameraCabinet: function () {
    if (state.flags.lensTaken) {
      setLine("Billi", "Only ordinary camera parts remain.");
      return;
    }
    if (!state.flags.fuseInstalled) {
      setLine("Mumi", "The electric catch is dead. The wall box is missing a fuse.");
      return;
    }
    state.flags.lensTaken = true;
    addItem("amberLens");
    refreshState();
    playDialogue([
      { speaker: "Billi", text: "An amber survey lens." },
      { speaker: "Enzo", text: "My father said it showed things that ordinary glass missed." }
    ]);
  },

  pumpExit: function () { goToScene("bridge"); },

  workbench: function () {
    setLine("Mumi", "Every maintenance log after 1978 was removed.");
  },

  oldPump: function () {
    setLine("Billi", "The pump casing has the same triangular mark as the token.");
  },

  coveredFloor: function () {
    state.flags.hatchRevealed = true;
    saveState();
    renderScene(false);
    playDialogue([
      { speaker: "Billi", text: "Help me move the crate." },
      { speaker: "Mumi", text: "That hatch was hidden, not forgotten." }
    ]);
  },

  hiddenHatch: function () {
    if (state.flags.hatchOpen) {
      enterVestibule();
      return;
    }
    setLine("Mumi", "A triangular slot. Nothing on a municipal key ring would fit it.");
  },

  vestibuleExit: function () { goToScene("pumphouse"); },

  mural: function () {
    setLine("Billi", "An amber eye opens the circle. That is all the mosaic says.");
  },

  pedestal: function () {
    setLine("Mumi", "No inscription. Just a ring of scratches around the empty top.");
  },

  barrier: function () {
    if (state.flags.barrierOpen) {
      enterChamber();
      return;
    }
    setLine("Billi", "The socket in the center is the size of a camera lens.");
  },

  chamberExit: function () { goToScene("vestibule"); },

  starDial: function () {
    if (state.flags.starDialSet) {
      setLine("Billi", "The brass dial is pointing at the broken constellation.");
      return;
    }
    state.flags.starDialSet = true;
    refreshState();
    setLine("Billi", "The dial stops at the only constellation missing a star.");
  },

  riverDial: function () {
    if (state.flags.riverDialSet) {
      setLine("Mumi", "The floor dial will not turn any farther.");
      return;
    }
    state.flags.riverDialSet = true;
    refreshState();
    setLine("Mumi", "The dial turns once. Water moves somewhere behind the wall.");
  },

  portal: function () {
    if (!state.flags.starDialSet && !state.flags.riverDialSet) {
      setLine("Billi", "The ring is connected to both mechanisms in the room.");
      return;
    }
    if (!state.flags.starDialSet) {
      setLine("Mumi", "The floor is set. The brass star dial is not.");
      return;
    }
    if (!state.flags.riverDialSet) {
      setLine("Billi", "The stars are set. The round floor dial is not.");
      return;
    }
    state.flags.portalOpen = true;
    saveState();
    playDialogue([
      { speaker: "Billi", text: "The wall inside the ring is gone." },
      { speaker: "Mumi", text: "The floor is going with it." }
    ], enterCosmos);
  }
};

const itemUses = {
  deliveryTag: {
    enzo: function () {
      if (state.flags.enzoTrusts) {
        setLine("Enzo", "Keep it. My father would have liked that.");
        return;
      }
      removeItem("deliveryTag");
      state.flags.enzoTrusts = true;
      refreshState();
      playDialogue([
        { speaker: "Enzo", text: "Where did you find this?" },
        { speaker: "Billi", text: "At the pump-building door." },
        { speaker: "Enzo", text: "My father delivered to the night crew. Then one winter the orders stopped." },
        { speaker: "Enzo", text: "His bridge things are in the back room. Go look." }
      ]);
    }
  },
  pryBar: {
    pumpDoor: function () {
      if (state.flags.pumpDoorOpen) {
        enterPumphouse();
        return;
      }
      removeItem("pryBar");
      state.flags.pumpDoorOpen = true;
      refreshState();
      playDialogue([
        { speaker: "Mumi", text: "The plank is moving." },
        { speaker: "Billi", text: "Quietly was never an option." }
      ], enterPumphouse);
    }
  },
  ceramicFuse: {
    fuseBox: function () {
      if (state.flags.fuseInstalled) {
        setLine("Mumi", "The fuse is already in place.");
        return;
      }
      removeItem("ceramicFuse");
      state.flags.fuseInstalled = true;
      refreshState();
      playDialogue([
        { speaker: "Mumi", text: "The cabinet light came on." },
        { speaker: "Billi", text: "So did a light somewhere under the bridge." }
      ]);
    }
  },
  brassToken: {
    hiddenHatch: function () {
      if (state.flags.hatchOpen) {
        enterVestibule();
        return;
      }
      removeItem("brassToken");
      state.flags.hatchOpen = true;
      refreshState();
      playDialogue([
        { speaker: "Billi", text: "The token fits." },
        { speaker: "Mumi", text: "The pump station was built around this." }
      ], enterVestibule);
    }
  },
  amberLens: {
    barrier: function () {
      if (state.flags.barrierOpen) {
        enterChamber();
        return;
      }
      removeItem("amberLens");
      state.flags.barrierOpen = true;
      refreshState();
      playDialogue([
        { speaker: "Billi", text: "The lens is gathering light from nowhere." },
        { speaker: "Mumi", text: "And the stone is moving." }
      ], enterChamber);
    }
  }
};

function findHotspot(action) {
  return sceneDefinitions[state.scene].hotspots.find(function (hotspot) {
    return hotspot.action === action && (!hotspot.when || hotspot.when());
  });
}

function clearSelection() {
  if (!state.selectedItem) return;
  state.selectedItem = null;
  saveState();
  renderInventory();
}

function runInteraction(hotspot) {
  const action = actions[hotspot.action];
  if (!action) return;

  if (!state.selectedItem) {
    action();
    return;
  }

  const selected = state.selectedItem;
  const useAction = itemUses[selected] && itemUses[selected][hotspot.action];
  if (useAction) {
    useAction();
    return;
  }

  if (hotspot.kind === "exit" || hotspot.kind === "pickup") {
    clearSelection();
    action();
    return;
  }

  setLine("Billi", "The " + itemDetails[selected].label + " will not help with " + hotspot.label + ".");
}

function preloadNextScenes(scene) {
  const sceneOrder = {
    street: ["riverside", "pizzeria"],
    riverside: ["street", "bridge"],
    bridge: ["riverside", "pizzeria", "pumphouse"],
    pizzeria: ["street", "backroom"],
    backroom: ["pizzeria", "bridge"],
    pumphouse: ["bridge", "vestibule"],
    vestibule: ["pumphouse", "chamber"],
    chamber: ["vestibule", "cosmos"],
    cosmos: []
  };

  const preload = function () {
    sceneOrder[scene].forEach(function (nextScene) {
      const image = new Image();
      image.src = sceneValue(sceneDefinitions[nextScene].image);
    });

    if (scene === "pumphouse" && !state.flags.hatchRevealed) {
      const revealed = new Image();
      revealed.src = "assets/scene-pumphouse-revealed.png";
    }
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(preload, { timeout: 1200 });
  } else {
    window.setTimeout(preload, 250);
  }
}

function resetToBeginning() {
  state = freshState();
  saveState();
  renderScene(true);
  state.flags.introSeen = true;
  saveState();
  playDialogue([
    { speaker: "Billi", text: "The fireflies are going down the bridge path." },
    { speaker: "Mumi", text: "At midnight?" },
    { speaker: "Billi", text: "They probably know the neighborhood better than we do." }
  ]);
  preloadNextScenes("street");
}

hotspots.addEventListener("click", function (event) {
  const button = event.target.closest("[data-action]");
  if (!button || activeDialogue) return;
  event.stopPropagation();
  hideObjectLabel();
  const hotspot = findHotspot(button.dataset.action);
  if (!hotspot) return;
  walkTo(hotspot.walk[0], hotspot.walk[1], function () { runInteraction(hotspot); });
});

gameStage.addEventListener("click", function (event) {
  if (activeDialogue || event.target.closest("[data-action]") || state.scene === "cosmos") return;
  const rect = gameStage.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  walkTo(x, y);
});

dialogue.addEventListener("click", function (event) {
  event.stopPropagation();
  advanceDialogue();
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && activeDialogue && event.target === document.body) {
    event.preventDefault();
    advanceDialogue();
  }
  if (event.key === "Escape" && state.selectedItem) {
    clearSelection();
  }
});

restartGame.addEventListener("click", function () {
  if (window.confirm("Start Nothing again from the beginning?")) resetToBeginning();
});

playAgain.addEventListener("click", resetToBeginning);

renderScene(true);

if (state.scene === "cosmos") {
  if (state.flags.ended) {
    setLine("Mumi", "There is no down.");
  } else {
    enterCosmos();
  }
} else if (!state.flags.introSeen) {
  state.flags.introSeen = true;
  saveState();
  playDialogue([
    { speaker: "Billi", text: "The fireflies are going down the bridge path." },
    { speaker: "Mumi", text: "At midnight?" },
    { speaker: "Billi", text: "They probably know the neighborhood better than we do." }
  ]);
} else {
  hideDialogue();
}

preloadNextScenes(state.scene);
