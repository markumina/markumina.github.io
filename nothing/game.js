const SAVE_KEY = "nothing-save-v1";
const SCRIPT = window.NOTHING_DIALOGUE;

const itemDetails = {
  deliveryTag: {
    label: "delivery tag",
    held: SCRIPT.items.deliveryTag.held,
    description: SCRIPT.items.deliveryTag.description
  },
  brassToken: {
    label: "brass token",
    held: SCRIPT.items.brassToken.held,
    description: SCRIPT.items.brassToken.description
  },
  pryBar: {
    label: "pry bar",
    held: SCRIPT.items.pryBar.held,
    description: SCRIPT.items.pryBar.description
  },
  ceramicFuse: {
    label: "ceramic fuse",
    held: SCRIPT.items.ceramicFuse.held,
    description: SCRIPT.items.ceramicFuse.description
  },
  amberLens: {
    label: "amber lens",
    held: SCRIPT.items.amberLens.held,
    description: SCRIPT.items.amberLens.description
  },
  pumpkinCookie: {
    label: "pumpkin cookie",
    held: SCRIPT.items.pumpkinCookie.held,
    description: SCRIPT.items.pumpkinCookie.description
  },
  punchCup: {
    label: "paper cup",
    held: SCRIPT.items.punchCup.held,
    description: SCRIPT.items.punchCup.description
  },
  spicedPunch: {
    label: "spiced cider",
    held: SCRIPT.items.spicedPunch.held,
    description: SCRIPT.items.spicedPunch.description
  },
  nightPerfume: {
    label: "Perfume of the Night",
    held: SCRIPT.items.nightPerfume.held,
    description: SCRIPT.items.nightPerfume.description
  },
  sparkPlugWire: {
    label: "spark plug wire",
    held: SCRIPT.items.sparkPlugWire.held,
    description: SCRIPT.items.sparkPlugWire.description
  },
  wrappedPizza: {
    label: "wrapped pizza",
    held: SCRIPT.items.wrappedPizza.held,
    description: SCRIPT.items.wrappedPizza.description
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
      { action: "bridgePath", label: "riverside path", left: 11, top: 44, width: 37, height: 45, walk: [26, 80], kind: "exit", arrow: "up-right", arrowX: 25, arrowY: 66 },
      { action: "pizzeriaDoor", label: "Bellini's Pizza", left: 60, top: 29, width: 38, height: 49, walk: [82, 82], kind: "exit", arrow: "right", arrowX: 76, arrowY: 62 },
      { action: "marketPath", label: "shops farther up Willow Street", left: 88, top: 79, width: 12, height: 15, walk: [93, 86], kind: "exit", arrow: "right", arrowX: 48, arrowY: 42 },
      { action: "lowerWillowPath", label: "lower Willow Street", left: 37, top: 82, width: 18, height: 14, walk: [46, 91], kind: "exit", arrow: "down-left", arrowX: 45, arrowY: 62 }
    ]
  },
  lowerWillow: {
    image: "assets/scene-lower-willow.png",
    alt: "The quiet lower end of Willow Street where occupied houses give way to vacant lots",
    location: "Lower Willow Street",
    start: [88, 85],
    walk: { minX: 5, maxX: 95, minY: 70, maxY: 92 },
    hotspots: [
      { action: "lowerWillowBack", label: "Willow Street", left: 82, top: 43, width: 18, height: 47, walk: [91, 82], kind: "exit", arrow: "up-right", arrowX: 67, arrowY: 62 },
      { action: "lowerWillowForward", label: "road past the last houses", left: 0, top: 43, width: 18, height: 43, walk: [8, 82], kind: "exit", arrow: "down-left", arrowX: 48, arrowY: 68 },
      { action: "lastPorch", label: "lit porch", left: 67, top: 25, width: 25, height: 39, walk: [77, 74] },
      { action: "shutteredShop", label: "shuttered shop", left: 22, top: 34, width: 23, height: 38, walk: [35, 76] },
      { action: "vacantLot", label: "overgrown vacant lot", left: 43, top: 38, width: 24, height: 34, walk: [55, 76] }
    ]
  },
  woodline: {
    image: "assets/scene-woodline.png",
    alt: "The last streetlamp at the edge of town beside a narrow track entering dark woods",
    location: "The Woodline",
    start: [88, 85],
    walk: { minX: 5, maxX: 95, minY: 69, maxY: 92 },
    hotspots: [
      { action: "woodlineBack", label: "lower Willow Street", left: 78, top: 35, width: 22, height: 50, walk: [91, 82], kind: "exit", arrow: "up-right", arrowX: 72, arrowY: 66 },
      { action: "woodlineForward", label: "track into the woods", left: 0, top: 33, width: 31, height: 55, walk: [10, 81], kind: "exit", arrow: "up-left", arrowX: 45, arrowY: 67 },
      { action: "lastStreetlight", label: "last streetlight", left: 61, top: 12, width: 20, height: 61, walk: [69, 75] },
      { action: "woodlandChain", label: "fallen chain barrier", left: 18, top: 49, width: 31, height: 25, walk: [36, 76] }
    ]
  },
  carGraveyard: {
    image: function () {
      if (!state.flags.carHoodOpen) return "assets/scene-car-graveyard-closed.png";
      return state.flags.sparkPlugWireFound
        ? "assets/scene-car-graveyard-empty.png"
        : "assets/scene-car-graveyard-open.png";
    },
    alt: function () {
      return state.flags.carHoodOpen
        ? "An unofficial car graveyard in the woods with the hood of a rotted red muscle car standing open"
        : "An unofficial car graveyard in the woods with a rotted red muscle car resting on blocks";
    },
    location: "Car Graveyard",
    start: [88, 85],
    walk: { minX: 5, maxX: 95, minY: 68, maxY: 92 },
    hotspots: [
      { action: "graveyardBack", label: "track to town", left: 82, top: 31, width: 18, height: 53, walk: [91, 81], kind: "exit", arrow: "up-right", arrowX: 70, arrowY: 57 },
      { action: "ninetiesSedan", label: "boxy nineties sedan", left: 0, top: 29, width: 33, height: 34, walk: [20, 72] },
      { action: "olderCarShell", label: "older car shell", left: 25, top: 25, width: 23, height: 24, walk: [36, 70] },
      { action: "muscleCarHood", label: "red muscle car hood", left: 32, top: 23, width: 32, height: 32, walk: [52, 70] },
      { action: "missingWheel", label: "missing wheel and blocks", left: 53, top: 50, width: 28, height: 22, walk: [68, 74] },
      { action: "sparkPlugWire", label: "red spark plug wire", left: 43, top: 39, width: 18, height: 15, walk: [52, 70], kind: "pickup", when: function () { return state.flags.carHoodOpen && !state.flags.sparkPlugWireFound; } }
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
      { action: "riversideForward", label: "under the bridge", left: 73, top: 29, width: 27, height: 62, walk: [84, 91], kind: "exit", arrow: "down-right", arrowX: 38, arrowY: 94 }
    ]
  },
  bridge: {
    image: "assets/scene-bridge.png",
    alt: "A path beneath an old bridge beside an abandoned pump building",
    location: "Under Hawthorn Bridge",
    start: [40, 84],
    walk: { minX: 5, maxX: 95, minY: 72, maxY: 91 },
    decorations: [
      { asset: "assets/bridge-halloween-banner.svg", left: 2, top: 1, width: 24, height: 13, className: "scene-decoration--bridge-banner" }
    ],
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
    alt: "A modest family pizzeria with Bruno behind the counter",
    location: "Bellini's Pizza",
    start: [20, 87],
    walk: { minX: 6, maxX: 94, minY: 67, maxY: 92 },
    hotspots: [
      { action: "pizzeriaExit", label: "Willow Street", left: 14, top: 72, width: 20, height: 20, walk: [20, 91], kind: "exit", arrow: "down-left", arrowX: 50, arrowY: 80 },
      { action: "townPhotos", label: "old town photographs", left: 5, top: 13, width: 31, height: 30, walk: [28, 73] },
      { action: "pizzaCounter", label: "pizza slices", left: 43, top: 39, width: 24, height: 17, walk: [58, 72] },
      { action: "bruno", label: "Bruno", left: 66, top: 23, width: 17, height: 27, walk: [68, 72] },
      { action: "backroomDoor", label: "back room", left: 86, top: 19, width: 14, height: 52, walk: [90, 78], kind: "exit", arrow: "right" }
    ]
  },
  market: {
    image: "assets/scene-pied-piper-exterior.png",
    alt: "A warmly lit Halloween pie shop three doors down from Bellini's",
    location: "Market Street / Three Doors Down",
    start: [12, 85],
    walk: { minX: 5, maxX: 95, minY: 72, maxY: 91 },
    decorations: [
      { asset: "assets/pied-piper-sign.svg", left: 75, top: 11, width: 16, height: 18, className: "scene-decoration--sign" }
    ],
    hotspots: [
      { action: "marketBack", label: "Willow Street", left: 0, top: 35, width: 14, height: 38, walk: [8, 82], kind: "exit", arrow: "left", arrowX: 42, arrowY: 68 },
      { action: "piperWindows", label: "Pie'd Piper windows", left: 43, top: 38, width: 29, height: 34, walk: [58, 78] },
      { action: "piperSign", label: "altered Pie or Die sign", left: 74, top: 9, width: 18, height: 22, walk: [80, 77] },
      { action: "piperDoor", label: "Pie'd Piper", left: 72, top: 38, width: 16, height: 39, walk: [78, 82], kind: "exit", arrow: "up", arrowX: 35, arrowY: 78 },
      { action: "marketPumpkins", label: "jack-o'-lanterns", left: 64, top: 62, width: 34, height: 19, walk: [79, 82] }
    ]
  },
  piedPiper: {
    image: "assets/scene-pied-piper.png",
    alt: "A cozy Halloween pie shop with the lively Nora Piper, hanging bats, cookies, cider, and an amber perfume bottle",
    location: "Pie'd Piper",
    start: [14, 84],
    walk: { minX: 6, maxX: 94, minY: 68, maxY: 91 },
    decorations: [
      {
        asset: "assets/piper-table-no-cups.png",
        left: 32.5521,
        top: 42.9688,
        width: 13.6719,
        height: 12.6953,
        className: "scene-decoration--patch",
        when: function () { return state.flags.cupTaken && !state.flags.cookieTaken; }
      },
      {
        asset: "assets/piper-table-no-cookies.png",
        left: 32.5521,
        top: 42.9688,
        width: 13.6719,
        height: 12.6953,
        className: "scene-decoration--patch",
        when: function () { return state.flags.cookieTaken && !state.flags.cupTaken; }
      },
      {
        asset: "assets/piper-table-empty.png",
        left: 32.5521,
        top: 42.9688,
        width: 13.6719,
        height: 12.6953,
        className: "scene-decoration--patch",
        when: function () { return state.flags.cupTaken && state.flags.cookieTaken; }
      }
    ],
    hotspots: [
      { action: "piperExit", label: "Market Street", left: 0, top: 18, width: 13, height: 55, walk: [8, 79], kind: "exit", arrow: "left", arrowX: 45, arrowY: 72 },
      { action: "piperBats", label: "hanging bats", left: 12, top: 5, width: 20, height: 17, walk: [25, 72] },
      { action: "piperDecorations", label: "Halloween shelves", left: 45, top: 5, width: 22, height: 38, walk: [55, 70] },
      { action: "witchBrew", label: "smoking cider pot", left: 27, top: 36, width: 12, height: 15, walk: [34, 75] },
      { action: "punchCups", label: "paper cider cups", left: 40, top: 39, width: 9, height: 12, walk: [44, 75], kind: "pickup", when: function () { return !state.flags.cupTaken; } },
      { action: "cookiePlate", label: "pumpkin cookies", left: 33, top: 52, width: 15, height: 10, walk: [42, 77], kind: "pickup", when: function () { return !state.flags.cookieTaken; } },
      { action: "pieCase", label: "pie case", left: 61, top: 44, width: 29, height: 28, walk: [68, 72] },
      { action: "nora", label: "Nora Piper", left: 74, top: 27, width: 14, height: 18, walk: [76, 70] }
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
    decorations: [
      {
        asset: "assets/chamber-spark-wire.svg",
        left: 0,
        top: 0,
        width: 100,
        height: 100,
        className: "scene-decoration--patch",
        when: function () { return state.flags.portalLeadTied; }
      }
    ],
    hotspots: [
      { action: "chamberExit", label: "vestibule", left: 0, top: 19, width: 18, height: 52, walk: [10, 81], kind: "exit", arrow: "left" },
      { action: "starDial", label: "brass star dial", left: 35, top: 31, width: 19, height: 33, walk: [44, 75] },
      { action: "retainingEyes", label: "loose brass contact", left: 47, top: 48, width: 27, height: 12, walk: [59, 77] },
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
      brunoOfferHeard: false,
      pizzaTaken: false,
      braceletWorn: false,
      piperVisited: false,
      nightPerfumeGiven: false,
      carHoodOpen: false,
      sparkPlugWireFound: false,
      cookieTaken: false,
      cupTaken: false,
      punchFilled: false,
      batFed: false,
      enzoHadPunch: false,
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
      portalLeadTied: false,
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

    const flags = { ...clean.flags, ...(saved.flags || {}) };
    const inventory = [...new Set(savedInventory)];
    if (flags.pizzaTaken && !flags.braceletWorn && !inventory.includes("wrappedPizza")) {
      inventory.push("wrappedPizza");
    }

    return {
      ...clean,
      ...saved,
      scene: scene,
      inventory: inventory,
      selectedItem: selectedItem,
      flags: flags
    };
  } catch {
    return clean;
  }
}

let state = loadState();
let activeDialogue = null;
let dialogueIndex = 0;
let dialogueDone = null;
let delayedDialogueTimer = null;
let pizzaWrapTimer = null;
let walkRequest = 0;
let batRemarkIndex = 0;
let positions = {
  billi: { x: 52, y: 85 },
  mumi: { x: 47, y: 86 }
};

const gameStage = document.querySelector("#game-stage");
const sceneImage = document.querySelector("#scene-image");
const scenePatches = document.querySelector("#scene-patches");
const sceneDecorations = document.querySelector("#scene-decorations");
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

function playLine(line) {
  playDialogue([line]);
}

function clearDelayedDialogue() {
  if (delayedDialogueTimer === null) return;
  window.clearTimeout(delayedDialogueTimer);
  delayedDialogueTimer = null;
}

function scheduleDialogue(lines, delay, onShow) {
  clearDelayedDialogue();
  const scene = state.scene;

  function showWhenReady() {
    if (state.scene !== scene) {
      delayedDialogueTimer = null;
      return;
    }
    if (activeDialogue) {
      delayedDialogueTimer = window.setTimeout(showWhenReady, 250);
      return;
    }
    delayedDialogueTimer = null;
    if (onShow) onShow();
    playDialogue(lines);
  }

  delayedDialogueTimer = window.setTimeout(showWhenReady, delay);
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
    playLine(itemDetails[item].description);
    return;
  }

  state.selectedItem = item;
  saveState();
  renderInventory();
  playLine(itemDetails[item].held);
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
        playLine(details.description);
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

function renderSceneDecorations() {
  sceneDecorations.replaceChildren();
  const definition = sceneDefinitions[state.scene];

  (definition.decorations || []).forEach(function (decoration) {
    if (decoration.when && !decoration.when()) return;

    const image = document.createElement("img");
    image.className = "scene-decoration" + (decoration.className ? " " + decoration.className : "");
    image.src = decoration.asset;
    image.alt = "";
    image.draggable = false;
    image.style.left = decoration.left + "%";
    image.style.top = decoration.top + "%";
    image.style.width = decoration.width + "%";
    image.style.height = decoration.height + "%";
    sceneDecorations.append(image);
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
  billi.classList.toggle("has-bracelet", state.flags.braceletWorn);
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
      playLine(SCRIPT.system.sceneLoadError);
    }, { once: true });
    sceneImage.src = imageSource;
  } else if (sceneImage.complete) {
    sceneLoader.hidden = true;
  }

  renderHotspots();
  renderScenePatches(imageSource);
  renderSceneDecorations();
  renderInventory();
  hideObjectLabel();
  if (resetCharacters) resetWalkers(state.scene);
}

function refreshState() {
  saveState();
  renderHotspots();
  renderScenePatches(sceneValue(sceneDefinitions[state.scene].image));
  renderSceneDecorations();
  renderInventory();
  renderWalkers();
}

function goToScene(scene, lines, onDone) {
  clearDelayedDialogue();
  state.scene = scene;
  state.selectedItem = null;
  saveState();
  renderScene(true);
  if (lines && lines.length) {
    playDialogue(lines, onDone);
  } else {
    hideDialogue();
    if (onDone) onDone();
  }
  preloadNextScenes(scene);
}

function enterBridge() {
  const firstVisit = !state.flags.bridgeVisited;
  state.flags.bridgeVisited = true;
  goToScene("bridge", firstVisit ? SCRIPT.bridge.firstVisit : null);
}

function queueBrunoOffer() {
  if (state.flags.brunoOfferHeard || state.flags.pizzaTaken) return;
  scheduleDialogue(SCRIPT.pizzeria.bruno.lateOffer, 15000, function () {
    state.flags.brunoOfferHeard = true;
    saveState();
  });
}

function enterPizzeria() {
  const firstVisit = !state.flags.pizzeriaVisited;
  state.flags.pizzeriaVisited = true;
  goToScene("pizzeria", firstVisit ? SCRIPT.pizzeria.firstVisit : null, queueBrunoOffer);
}

function enterPiedPiper() {
  const firstVisit = !state.flags.piperVisited;
  state.flags.piperVisited = true;
  goToScene("piedPiper", firstVisit ? SCRIPT.pieShop.firstVisit : null);
}

function enterBackroom() {
  const firstVisit = !state.flags.backroomVisited;
  state.flags.backroomVisited = true;
  goToScene("backroom", firstVisit ? SCRIPT.backroom.firstVisit : null);
}

function enterPumphouse() {
  const firstVisit = !state.flags.pumphouseVisited;
  state.flags.pumphouseVisited = true;
  goToScene("pumphouse", firstVisit ? SCRIPT.pumpStation.firstVisit : null);
}

function enterVestibule() {
  const firstVisit = !state.flags.vestibuleVisited;
  state.flags.vestibuleVisited = true;
  goToScene("vestibule", firstVisit ? SCRIPT.vestibule.firstVisit : null);
}

function enterChamber() {
  const firstVisit = !state.flags.chamberVisited;
  state.flags.chamberVisited = true;
  goToScene("chamber", firstVisit ? SCRIPT.chamber.firstVisit : null);
}

function enterCosmos() {
  state.scene = "cosmos";
  state.selectedItem = null;
  saveState();
  renderScene(true);
  playDialogue(SCRIPT.cosmos.ending, function () {
    state.flags.ended = true;
    saveState();
    endingPanel.hidden = false;
    playAgain.focus();
  });
}

const actions = {
  streetUtility: function () {
    playLine(SCRIPT.willowStreet.utilityBox);
  },

  riverStone: function () {
    playLine(SCRIPT.willowStreet.riverStone);
  },

  bridgePath: function () { goToScene("riverside"); },
  pizzeriaDoor: enterPizzeria,
  marketPath: function () { goToScene("market"); },
  lowerWillowPath: function () { goToScene("lowerWillow"); },

  lowerWillowBack: function () { goToScene("street"); },
  lowerWillowForward: function () { goToScene("woodline"); },

  lastPorch: function () {
    playLine(SCRIPT.lowerWillow.porch);
  },

  shutteredShop: function () {
    playLine(SCRIPT.lowerWillow.shutteredShop);
  },

  vacantLot: function () {
    playLine(SCRIPT.lowerWillow.vacantLot);
  },

  woodlineBack: function () { goToScene("lowerWillow"); },
  woodlineForward: function () { goToScene("carGraveyard"); },

  lastStreetlight: function () {
    playLine(SCRIPT.woodline.streetlight);
  },

  woodlandChain: function () {
    playLine(SCRIPT.woodline.chain);
  },

  graveyardBack: function () { goToScene("woodline"); },

  ninetiesSedan: function () {
    playLine(SCRIPT.carGraveyard.sedan);
  },

  olderCarShell: function () {
    playLine(SCRIPT.carGraveyard.olderShell);
  },

  muscleCarHood: function () {
    if (!state.flags.carHoodOpen) {
      state.flags.carHoodOpen = true;
      saveState();
      renderScene(false);
      playLine(SCRIPT.carGraveyard.hoodOpened);
      return;
    }
    if (!state.flags.sparkPlugWireFound) {
      playLine(SCRIPT.carGraveyard.wireVisible);
      return;
    }
    playLine(SCRIPT.carGraveyard.hoodEmpty);
  },

  missingWheel: function () {
    playLine(SCRIPT.carGraveyard.missingWheel);
  },

  sparkPlugWire: function () {
    state.flags.sparkPlugWireFound = true;
    addItem("sparkPlugWire");
    saveState();
    renderScene(false);
    playLine(SCRIPT.carGraveyard.wireTaken);
  },

  riversideBack: function () { goToScene("street"); },

  riversideLamp: function () {
    playLine(SCRIPT.riverside.lamp);
  },

  riversideRiver: function () {
    playLine(SCRIPT.riverside.river);
  },

  riversideForward: enterBridge,

  bridgeBack: function () { goToScene("riverside"); },

  bridgeRiver: function () {
    playLine(SCRIPT.bridge.river);
  },

  stormDrain: function () {
    if (state.flags.tokenFound) {
      playLine(SCRIPT.bridge.emptyDrain);
      return;
    }
    state.flags.tokenFound = true;
    addItem("brassToken");
    refreshState();
    playLine(SCRIPT.bridge.tokenFound);
  },

  deliveryTag: function () {
    if (state.flags.deliveryTagFound) {
      playLine(SCRIPT.bridge.tagGone);
      return;
    }
    state.flags.deliveryTagFound = true;
    addItem("deliveryTag");
    refreshState();
    playLine(SCRIPT.bridge.tagFound);
  },

  pumpDoor: function () {
    if (state.flags.pumpDoorOpen) {
      enterPumphouse();
      return;
    }
    playLine(SCRIPT.bridge.pumpDoorLocked);
  },

  marketBack: function () { goToScene("street"); },

  piperWindows: function () {
    playLine(SCRIPT.market.windows);
  },

  piperSign: function () {
    playLine(SCRIPT.market.sign);
  },

  piperDoor: enterPiedPiper,

  marketPumpkins: function () {
    playLine(SCRIPT.market.pumpkins);
  },

  piperExit: function () { goToScene("market"); },

  piperBats: function () {
    if (state.flags.batFed) {
      playLine(SCRIPT.pieShop.batsAfterCookie);
      return;
    }
    const remarks = SCRIPT.pieShop.batRemarks;
    const remark = remarks[batRemarkIndex % remarks.length];
    batRemarkIndex += 1;
    playLine(remark);
  },

  piperDecorations: function () {
    playLine(SCRIPT.pieShop.decorations);
  },

  witchBrew: function () {
    playLine(SCRIPT.pieShop.ciderPot);
  },

  punchCups: function () {
    state.flags.cupTaken = true;
    addItem("punchCup");
    refreshState();
    playLine(SCRIPT.pieShop.cupTaken);
  },

  cookiePlate: function () {
    state.flags.cookieTaken = true;
    addItem("pumpkinCookie");
    refreshState();
    playLine(SCRIPT.pieShop.cookieTaken);
  },

  pieCase: function () {
    playLine(SCRIPT.pieShop.pieCase);
  },

  nora: function () {
    if (!state.flags.nightPerfumeGiven) {
      state.flags.nightPerfumeGiven = true;
      addItem("nightPerfume");
      refreshState();
      playDialogue(SCRIPT.pieShop.perfumeGift);
      return;
    }
    if (state.flags.batFed) {
      playLine(SCRIPT.pieShop.afterBatCookie);
      return;
    }
    playLine(SCRIPT.pieShop.noraRepeat);
  },

  pizzeriaExit: function () { goToScene("street"); },

  townPhotos: function () {
    playLine(SCRIPT.pizzeria.photographs);
  },

  pizzaCounter: function () {
    if (state.flags.pizzaTaken) {
      playLine(SCRIPT.pizzeria.bruno.pizzaGone);
      return;
    }

    clearDelayedDialogue();
    state.flags.brunoOfferHeard = true;
    state.flags.pizzaTaken = true;
    saveState();
    playDialogue([SCRIPT.pizzeria.bruno.wrappingPizza], function () {
      if (pizzaWrapTimer !== null) window.clearTimeout(pizzaWrapTimer);
      pizzaWrapTimer = window.setTimeout(function () {
        pizzaWrapTimer = null;
        if (!state.flags.pizzaTaken || state.flags.braceletWorn || hasItem("wrappedPizza")) return;
        addItem("wrappedPizza");
        refreshState();
        if (state.scene === "pizzeria" && !activeDialogue) {
          playLine(SCRIPT.pizzeria.bruno.pizzaReady);
        }
      }, 1500);
    });
  },

  bruno: function () {
    if (state.flags.enzoTrusts) {
      playLine(SCRIPT.pizzeria.bruno.trusted);
      return;
    }
    playDialogue(SCRIPT.pizzeria.bruno.deliveryStory);
  },

  backroomDoor: function () {
    if (!state.flags.enzoTrusts) {
      playLine(SCRIPT.pizzeria.bruno.backroomRefusal);
      return;
    }
    enterBackroom();
  },

  backroomExit: function () { goToScene("pizzeria"); },

  pryBar: function () {
    if (state.flags.pryBarFound) {
      playLine(SCRIPT.backroom.pryBarGone);
      return;
    }
    state.flags.pryBarFound = true;
    addItem("pryBar");
    refreshState();
    playLine(SCRIPT.backroom.pryBarTaken);
  },

  oldPlans: function () {
    playLine(SCRIPT.backroom.plans);
  },

  ceramicFuse: function () {
    if (state.flags.fuseFound || state.flags.fuseInstalled) {
      playLine(SCRIPT.backroom.fuseGone);
      return;
    }
    state.flags.fuseFound = true;
    addItem("ceramicFuse");
    refreshState();
    playLine(SCRIPT.backroom.fuseTaken);
  },

  fuseBox: function () {
    if (state.flags.fuseInstalled) {
      playLine(SCRIPT.backroom.fuseInstalled);
      return;
    }
    playLine(SCRIPT.backroom.fuseMissing);
  },

  cameraCabinet: function () {
    if (state.flags.lensTaken) {
      playLine(SCRIPT.backroom.cabinetEmpty);
      return;
    }
    if (!state.flags.fuseInstalled) {
      playLine(SCRIPT.backroom.cabinetUnpowered);
      return;
    }
    state.flags.lensTaken = true;
    addItem("amberLens");
    refreshState();
    playDialogue(SCRIPT.backroom.lensFound);
  },

  pumpExit: function () { goToScene("bridge"); },

  workbench: function () {
    playLine(SCRIPT.pumpStation.workbench);
  },

  oldPump: function () {
    playLine(SCRIPT.pumpStation.pump);
  },

  coveredFloor: function () {
    state.flags.hatchRevealed = true;
    saveState();
    renderScene(false);
    playDialogue(SCRIPT.pumpStation.crateMoved);
  },

  hiddenHatch: function () {
    if (state.flags.hatchOpen) {
      enterVestibule();
      return;
    }
    playLine(SCRIPT.pumpStation.hatchLocked);
  },

  vestibuleExit: function () { goToScene("pumphouse"); },

  mural: function () {
    playLine(SCRIPT.vestibule.mural);
  },

  pedestal: function () {
    playLine(SCRIPT.vestibule.pedestal);
  },

  barrier: function () {
    if (state.flags.barrierOpen) {
      enterChamber();
      return;
    }
    playLine(SCRIPT.vestibule.barrierLocked);
  },

  chamberExit: function () { goToScene("vestibule"); },

  starDial: function () {
    if (state.flags.starDialSet) {
      playLine(SCRIPT.chamber.starAlreadySet);
      return;
    }
    state.flags.starDialSet = true;
    refreshState();
    playLine(SCRIPT.chamber.starSet);
  },

  retainingEyes: function () {
    if (state.flags.portalLeadTied) {
      playLine(SCRIPT.chamber.contactTied);
      return;
    }
    playLine(SCRIPT.chamber.contactLoose);
  },

  riverDial: function () {
    if (state.flags.riverDialSet) {
      playLine(SCRIPT.chamber.riverAlreadySet);
      return;
    }
    state.flags.riverDialSet = true;
    refreshState();
    playLine(SCRIPT.chamber.riverSet);
  },

  portal: function () {
    if (!state.flags.starDialSet && !state.flags.riverDialSet) {
      playLine(SCRIPT.chamber.portalDormant);
      return;
    }
    if (!state.flags.starDialSet) {
      playLine(SCRIPT.chamber.starMissing);
      return;
    }
    if (!state.flags.riverDialSet) {
      playLine(SCRIPT.chamber.riverMissing);
      return;
    }
    if (!state.flags.portalLeadTied) {
      playLine(SCRIPT.chamber.wireMissing);
      return;
    }
    state.flags.portalOpen = true;
    saveState();
    playDialogue(SCRIPT.chamber.portalOpening, enterCosmos);
  }
};

function tiePortalContact() {
  removeItem("sparkPlugWire");
  state.flags.portalLeadTied = true;
  refreshState();
  playLine(SCRIPT.chamber.wireUsed);
}

const itemUses = {
  deliveryTag: {
    bruno: function () {
      if (state.flags.enzoTrusts) {
        playLine(SCRIPT.pizzeria.bruno.tagAlreadyGiven);
        return;
      }
      removeItem("deliveryTag");
      state.flags.enzoTrusts = true;
      refreshState();
      playDialogue(SCRIPT.pizzeria.bruno.tagConversation);
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
      playDialogue(SCRIPT.backroom.pryBarUsed, enterPumphouse);
    }
  },
  ceramicFuse: {
    fuseBox: function () {
      if (state.flags.fuseInstalled) {
        playLine(SCRIPT.backroom.fuseAlreadyInstalled);
        return;
      }
      removeItem("ceramicFuse");
      state.flags.fuseInstalled = true;
      refreshState();
      playDialogue(SCRIPT.backroom.fuseUsed);
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
      playDialogue(SCRIPT.pumpStation.tokenUsed, enterVestibule);
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
      playDialogue(SCRIPT.vestibule.lensUsed, enterChamber);
    }
  },
  pumpkinCookie: {
    piperBats: function () {
      removeItem("pumpkinCookie");
      state.flags.batFed = true;
      refreshState();
      playDialogue(SCRIPT.pieShop.cookieToBats);
    }
  },
  punchCup: {
    witchBrew: function () {
      removeItem("punchCup");
      addItem("spicedPunch");
      state.flags.punchFilled = true;
      refreshState();
      playLine(SCRIPT.pieShop.cupFilled);
    }
  },
  spicedPunch: {
    bruno: function () {
      removeItem("spicedPunch");
      state.flags.enzoHadPunch = true;
      refreshState();
      playDialogue(SCRIPT.pizzeria.bruno.ciderConversation);
    }
  },
  wrappedPizza: {
    nora: function () {
      removeItem("wrappedPizza");
      state.flags.braceletWorn = true;
      refreshState();
      playDialogue(SCRIPT.pieShop.pizzaTrade);
    }
  },
  sparkPlugWire: {
    retainingEyes: tiePortalContact,
    starDial: tiePortalContact,
    portal: tiePortalContact
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

  playLine(SCRIPT.system.cannotUse(itemDetails[selected].label, hotspot.label));
}

function preloadNextScenes(scene) {
  const sceneOrder = {
    street: ["riverside", "pizzeria", "market", "lowerWillow"],
    lowerWillow: ["street", "woodline"],
    woodline: ["lowerWillow", "carGraveyard"],
    carGraveyard: ["woodline"],
    riverside: ["street", "bridge"],
    bridge: ["riverside", "pizzeria", "pumphouse"],
    pizzeria: ["street", "backroom", "market"],
    market: ["street", "piedPiper"],
    piedPiper: ["market", "pizzeria"],
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

    if (scene === "woodline" || scene === "carGraveyard") {
      [
        "assets/scene-car-graveyard-closed.png",
        "assets/scene-car-graveyard-open.png",
        "assets/scene-car-graveyard-empty.png"
      ].forEach(function (source) {
        const graveyardState = new Image();
        graveyardState.src = source;
      });
    }
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(preload, { timeout: 1200 });
  } else {
    window.setTimeout(preload, 250);
  }
}

function resetToBeginning() {
  clearDelayedDialogue();
  if (pizzaWrapTimer !== null) {
    window.clearTimeout(pizzaWrapTimer);
    pizzaWrapTimer = null;
  }
  state = freshState();
  saveState();
  renderScene(true);
  state.flags.introSeen = true;
  saveState();
  playDialogue(SCRIPT.opening.firstVisit);
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
    playLine(SCRIPT.cosmos.returnLine);
  } else {
    enterCosmos();
  }
} else if (!state.flags.introSeen) {
  state.flags.introSeen = true;
  saveState();
  playDialogue(SCRIPT.opening.firstVisit);
} else {
  hideDialogue();
  if (state.scene === "pizzeria") queueBrunoOffer();
}

preloadNextScenes(state.scene);
