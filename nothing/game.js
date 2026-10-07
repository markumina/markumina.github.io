const SAVE_KEY = "nothing-save-v1";
const SCRIPT = window.NOTHING_DIALOGUE;
const SOUND = window.NOTHING_SOUND || {
  syncScene: function () {},
  step: function () {},
  trip: function () {},
  bracelet: function () {},
  mouse: function () {},
  trashCan: function () {},
  transition: function () {}
};

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
    image: "assets/scene-street-crisp.png",
    alt: "A quiet riverside street with a pizzeria and a path leading down toward a bridge",
    location: "Willow Street / 11:47 PM",
    start: [52, 85],
    walk: { minX: 5, maxX: 95, minY: 72, maxY: 91 },
    hotspots: [
      { action: "streetUtility", label: "utility box", left: 0, top: 50, width: 12, height: 30, walk: [11, 82] },
      { action: "riverStone", label: "round stone", left: 8, top: 66, width: 9, height: 12, walk: [15, 83] },
      { action: "bridgePath", label: "riverside path", left: 11, top: 44, width: 37, height: 45, walk: [26, 80], kind: "exit", arrow: "up-right", arrowX: 25, arrowY: 66 },
      { action: "upperWindows", label: "upper windows", left: 52, top: 9, width: 47, height: 20, walk: [79, 75] },
      { action: "pizzeriaDoor", label: "Bellini's Pizza", left: 60, top: 29, width: 38, height: 49, walk: [82, 82], kind: "exit", arrow: "right", arrowX: 76, arrowY: 62 },
      { action: "marketPath", label: "shops farther up Willow Street", left: 88, top: 79, width: 12, height: 15, walk: [93, 86], kind: "exit", arrow: "right", arrowX: 48, arrowY: 42 },
      { action: "trashCanMan", label: "man in a trash can", left: 85, top: 58, width: 15, height: 25, walk: [84, 78] },
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
      { action: "upperWindows", label: "upper windows", left: 86, top: 16, width: 11, height: 23, walk: [88, 75] },
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
      { asset: "assets/bridge-halloween-banner.svg", left: 2, top: 8.5, width: 29, height: 12, className: "scene-decoration--bridge-banner" },
      {
        asset: "assets/bridge-step-no-paper.png",
        left: 85.4167,
        top: 61.3281,
        width: 4.9479,
        height: 5.8594,
        className: "scene-decoration--patch",
        when: function () { return state.flags.deliveryTagFound; }
      },
      {
        asset: "assets/bridge-pry-bar.svg",
        left: 77,
        top: 49,
        width: 14,
        height: 24,
        className: "scene-decoration--pry-bar",
        when: function () { return state.flags.pryBarWedged; }
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
    image: "assets/scene-pizzeria-crisp.png",
    alt: "A modest family pizzeria with Bruno behind the counter",
    location: "Bellini's Pizza",
    start: [20, 87],
    walk: { minX: 6, maxX: 94, minY: 67, maxY: 92 },
    hotspots: [
      { action: "pizzeriaExit", label: "Willow Street", left: 14, top: 72, width: 20, height: 20, walk: [20, 91], kind: "exit", arrow: "down-left", arrowX: 50, arrowY: 80 },
      { action: "townPhotos", label: "old town photographs", left: 5, top: 13, width: 31, height: 30, walk: [28, 73] },
      { action: "restroomDoor", label: "restroom", left: 35.5, top: 18, width: 8.5, height: 43, walk: [40, 73], kind: "exit", arrow: "up", arrowX: 51, arrowY: 77 },
      { action: "pizzaCounter", label: "pizza slices", left: 43, top: 39, width: 24, height: 17, walk: [58, 72] },
      { action: "bruno", label: "Bruno", left: 66, top: 23, width: 17, height: 27, walk: [68, 72] },
      { action: "backroomDoor", label: "back room", left: 86, top: 19, width: 14, height: 52, walk: [90, 78], kind: "exit", arrow: "right" }
    ]
  },
  restroom: {
    image: "assets/scene-pizzeria-restroom.png",
    alt: "A small tiled restroom inside Bellini's Pizza with a sink, mirror, and toilet",
    location: "Bellini's / Restroom",
    start: [15, 86],
    walk: { minX: 6, maxX: 94, minY: 72, maxY: 91 },
    hotspots: [
      { action: "restroomExit", label: "back to Bellini's", left: 0, top: 10, width: 20, height: 77, walk: [9, 82], kind: "exit", arrow: "left", arrowX: 55, arrowY: 72 },
      { action: "restroomGarland", label: "paper pumpkin garland", left: 17, top: 12, width: 20, height: 24, walk: [28, 73] },
      { action: "restroomMirror", label: "mirror", left: 39, top: 14, width: 20, height: 30, walk: [49, 74] },
      { action: "restroomSink", label: "sink", left: 37, top: 36, width: 25, height: 32, walk: [50, 79] },
      { action: "restroomToilet", label: "toilet", left: 70, top: 43, width: 26, height: 42, walk: [79, 82] }
    ]
  },
  market: {
    image: "assets/scene-pied-piper-exterior.png",
    alt: "A warmly lit Halloween pie shop three doors down from Bellini's",
    location: "Market Street / Three Doors Down",
    start: [12, 85],
    walk: { minX: 5, maxX: 95, minY: 72, maxY: 91 },
    decorations: [
      { asset: "assets/pied-piper-sign.svg", left: 75, top: 15.5, width: 16, height: 20, className: "scene-decoration--sign" },
      {
        asset: "assets/market-window-open.svg",
        left: 28.55,
        top: 27.2,
        width: 3.8,
        height: 11.3,
        className: "scene-decoration--tony-window",
        when: function () { return state.flags.tonyWindowOpen; }
      },
      {
        asset: "assets/tony-window-head.svg",
        left: 28.55,
        top: 27.2,
        width: 3.8,
        height: 11.3,
        className: "scene-decoration--tony-window-head",
        when: function () { return state.flags.tonyAtWindow; }
      }
    ],
    hotspots: [
      { action: "marketBack", label: "Willow Street", left: 0, top: 35, width: 14, height: 38, walk: [8, 82], kind: "exit", arrow: "left", arrowX: 42, arrowY: 68 },
      { action: "tonyWindow", label: "lit upstairs window", left: 25, top: 22, width: 11, height: 24, walk: [31, 78] },
      { action: "piperWindows", label: "Pie Piper windows", left: 43, top: 38, width: 29, height: 34, walk: [58, 78] },
      { action: "upperWindows", label: "upper windows", left: 45, top: 12, width: 31, height: 24, walk: [65, 76] },
      { action: "piperSign", label: "altered Pie Piper sign", left: 74, top: 16, width: 18, height: 20, walk: [80, 77] },
      { action: "piperDoor", label: "Pie Piper", left: 72, top: 38, width: 16, height: 39, walk: [78, 82], kind: "exit", arrow: "up", arrowX: 35, arrowY: 78 },
      { action: "marketPumpkins", label: "jack-o'-lanterns", left: 64, top: 62, width: 34, height: 19, walk: [79, 82] }
    ]
  },
  piedPiper: {
    image: "assets/scene-pied-piper.png",
    alt: "A cozy Halloween pie shop with the lively Nora Piper, hanging bats, cookies, cider, and an amber perfume bottle",
    location: "Pie Piper",
    start: [14, 84],
    walk: { minX: 6, maxX: 94, minY: 68, maxY: 91 },
    decorations: [
      {
        asset: "assets/piper-table-no-cookies.png",
        left: 32.5521,
        top: 42.9688,
        width: 13.6719,
        height: 12.6953,
        className: "scene-decoration--patch",
        when: function () { return state.flags.cookieTaken; }
      },
      {
        asset: "assets/piper-one-cup-less.png",
        left: 41.4063,
        top: 43.3594,
        width: 4.1667,
        height: 7.0313,
        className: "scene-decoration--patch",
        when: function () { return state.flags.cupTaken; }
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
      restroomVisited: false,
      trashCanGreetingHeard: false,
      tonyMet: false,
      tonyWindowOpen: false,
      tonyAtWindow: false,
      tonyFollowing: false,
      tonyCasualScenesRemaining: 0,
      tonyHelpingDoor: false,
      tonyHelpedDoor: false,
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
      pryBarWedged: false,
      pryBarTwoPersonAttempted: false,
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
let itemNoticeTimer = null;
let braceletAnimationTimers = [];
let bridgeMouseTimer = null;
let trashCanStrollTimer = null;
let doorPryTimer = null;
let walkRequest = 0;
let batRemarkIndex = 0;
let trashCanRemarkIndex = 0;
let billiTripTimer = null;
let billiLimpWalks = 0;
let walksUntilBilliTrips = 18 + Math.floor(Math.random() * 13);
let previousTripRemark = "";
let positions = {
  billi: { x: 52, y: 85 },
  mumi: { x: 47, y: 86 },
  tony: { x: 42, y: 87 }
};

const gameStage = document.querySelector("#game-stage");
const sceneImage = document.querySelector("#scene-image");
const scenePatches = document.querySelector("#scene-patches");
const sceneDecorations = document.querySelector("#scene-decorations");
const sceneLoader = document.querySelector("#scene-loader");
const bridgeMouse = document.querySelector("#bridge-mouse");
const trashCanMan = document.querySelector("#trash-can-man");
const hotspots = document.querySelector("#hotspots");
const inventory = document.querySelector("#inventory");
const heldItem = document.querySelector("#held-item");
const locationLabel = document.querySelector("#location-label");
const objectLabel = document.querySelector("#object-label");
const itemNotice = document.querySelector("#item-notice");
const itemNoticeTitle = document.querySelector("#item-notice-title");
const itemNoticeText = document.querySelector("#item-notice-text");
const dialogue = document.querySelector("#dialogue");
const speaker = document.querySelector("#speaker");
const dialogueLine = document.querySelector("#dialogue-line");
const dialogueNext = document.querySelector("#dialogue-next");
const endingPanel = document.querySelector("#ending-panel");
const playAgain = document.querySelector("#play-again");
const restartGame = document.querySelector("#restart-game");
const billi = document.querySelector("#billi");
const mumi = document.querySelector("#mumi");
const tony = document.querySelector("#tony");

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

function showItemNotice(title, text) {
  if (itemNoticeTimer !== null) window.clearTimeout(itemNoticeTimer);
  itemNoticeTitle.textContent = title;
  itemNoticeText.textContent = text;
  itemNotice.hidden = false;
  itemNotice.classList.remove("is-visible");
  void itemNotice.offsetWidth;
  itemNotice.classList.add("is-visible");
  itemNoticeTimer = window.setTimeout(function () {
    itemNoticeTimer = null;
    itemNotice.hidden = true;
    itemNotice.classList.remove("is-visible");
  }, 2600);
}

function selectItem(item) {
  const details = itemDetails[item];
  if (state.selectedItem === item) {
    state.selectedItem = null;
    saveState();
    renderInventory();
    showItemNotice("back in the pocket", details.label);
    return;
  }

  state.selectedItem = item;
  saveState();
  renderInventory();
  showItemNotice("holding " + details.label, details.held.text);
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
        showItemNotice(details.label, details.description.text);
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
  tony.hidden = !state.flags.tonyFollowing;
  placeWalker(billi, positions.billi);
  placeWalker(mumi, positions.mumi);
  if (state.flags.tonyFollowing) placeWalker(tony, positions.tony);
}

function resetWalkers(scene) {
  walkRequest += 1;
  billi.classList.remove("is-walking", "is-left");
  mumi.classList.remove("is-walking", "is-left");
  tony.classList.remove("is-walking", "is-left");
  const start = sceneDefinitions[scene].start;

  if (scene === "cosmos") {
    positions = {
      billi: { x: start[0], y: start[1] },
      mumi: { x: start[0] - 10, y: start[1] + 6 },
      tony: { x: start[0] - 16, y: start[1] + 8 }
    };
  } else {
    positions = {
      billi: { x: start[0], y: start[1] },
      mumi: { x: start[0] - 5, y: start[1] + 1 },
      tony: { x: start[0] - 10, y: start[1] + 2 }
    };
  }

  renderWalkers();
}

function setFacing(element, left) {
  element.classList.toggle("is-left", left);
}

function stopBraceletAnimation() {
  braceletAnimationTimers.forEach(function (timer) { window.clearTimeout(timer); });
  braceletAnimationTimers = [];
  gameStage.classList.remove("is-bracelet-cutaway");
  gameStage.style.removeProperty("--bracelet-focus-x");
  gameStage.style.removeProperty("--bracelet-focus-y");
  gameStage.style.removeProperty("--bracelet-shift-x");
  gameStage.style.removeProperty("--bracelet-shift-y");
  billi.classList.remove("is-receiving-bracelet");
}

function clearBridgeMouse() {
  if (bridgeMouseTimer !== null) {
    window.clearTimeout(bridgeMouseTimer);
    bridgeMouseTimer = null;
  }
  if (!bridgeMouse) return;
  bridgeMouse.classList.remove("is-running");
  bridgeMouse.hidden = true;
}

function runBridgeMouse() {
  clearBridgeMouse();
  bridgeMouseTimer = window.setTimeout(function () {
    bridgeMouseTimer = null;
    if (!bridgeMouse || state.scene !== "bridge") return;
    bridgeMouse.hidden = false;
    void bridgeMouse.offsetWidth;
    bridgeMouse.classList.add("is-running");
    SOUND.mouse();
    bridgeMouseTimer = window.setTimeout(clearBridgeMouse, 2700);
  }, 650);
}

function clearTrashCanStroll() {
  if (trashCanStrollTimer !== null) {
    window.clearTimeout(trashCanStrollTimer);
    trashCanStrollTimer = null;
  }
  if (trashCanMan) trashCanMan.classList.remove("is-strolling");
}

function scheduleTrashCanStroll(firstWait) {
  clearTrashCanStroll();
  if (!trashCanMan || state.scene !== "street") return;

  const delay = firstWait
    ? 4500 + Math.random() * 5000
    : 12000 + Math.random() * 14000;

  trashCanStrollTimer = window.setTimeout(function () {
    trashCanStrollTimer = null;
    if (state.scene !== "street") return;
    trashCanMan.classList.add("is-strolling");
    SOUND.trashCan();
    trashCanStrollTimer = window.setTimeout(function () {
      trashCanStrollTimer = null;
      trashCanMan.classList.remove("is-strolling");
      scheduleTrashCanStroll(false);
    }, 2650);
  }, delay);
}

function syncTrashCanStroll() {
  if (state.scene !== "street") {
    clearTrashCanStroll();
    return;
  }
  if (trashCanStrollTimer === null && !trashCanMan.classList.contains("is-strolling")) {
    scheduleTrashCanStroll(true);
  }
}

function clearDoorPryAnimation() {
  if (doorPryTimer !== null) {
    window.clearTimeout(doorPryTimer);
    doorPryTimer = null;
  }
  gameStage.classList.remove("is-three-person-pry", "is-door-cracked");
}

function startTonyFollowing(helpingDoor) {
  const bounds = sceneDefinitions[state.scene].walk;
  state.flags.tonyFollowing = true;
  state.flags.tonyAtWindow = false;
  state.flags.tonyHelpingDoor = helpingDoor;
  state.flags.tonyCasualScenesRemaining = helpingDoor ? 0 : 3;
  positions.tony = {
    x: clamp(positions.mumi.x - 5, bounds.minX, bounds.maxX),
    y: clamp(positions.mumi.y + 1, bounds.minY, bounds.maxY)
  };
  saveState();
  renderSceneDecorations();
  renderWalkers();
}

function prepareTonyTransition(lines, onDone) {
  const nextLines = lines ? lines.slice() : [];
  let nextDone = onDone;

  if (
    state.flags.tonyFollowing &&
    !state.flags.tonyHelpingDoor &&
    state.flags.tonyCasualScenesRemaining > 0
  ) {
    state.flags.tonyCasualScenesRemaining -= 1;

    if (state.flags.tonyCasualScenesRemaining === 0) {
      nextLines.push(...SCRIPT.tony.microwaveDeparture);
      nextDone = function () {
        state.flags.tonyFollowing = false;
        state.flags.tonyAtWindow = true;
        saveState();
        renderWalkers();
        renderSceneDecorations();
        if (onDone) onDone();
      };
    }
  }

  return { lines: nextLines, onDone: nextDone };
}

function crackPumpDoorWithTony() {
  if (doorPryTimer !== null) return;
  walkRequest += 1;
  positions = {
    billi: { x: 81, y: 79 },
    mumi: { x: 86, y: 80 },
    tony: { x: 90, y: 79 }
  };
  setFacing(billi, false);
  setFacing(mumi, false);
  setFacing(tony, true);
  renderWalkers();
  gameStage.classList.add("is-three-person-pry");

  const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 450 : 1500;
  doorPryTimer = window.setTimeout(function () {
    doorPryTimer = null;
    gameStage.classList.remove("is-three-person-pry");
    gameStage.classList.add("is-door-cracked");
    state.flags.pumpDoorOpen = true;
    state.flags.tonyHelpedDoor = true;
    saveState();

    playDialogue(SCRIPT.bridge.doorCracked, function () {
      state.flags.tonyFollowing = false;
      state.flags.tonyHelpingDoor = false;
      state.flags.tonyAtWindow = true;
      saveState();
      clearDoorPryAnimation();
      enterPumphouse();
    });
  }, duration);
}

function playBraceletAnimation() {
  stopBraceletAnimation();
  walkRequest += 1;
  billi.classList.remove("is-walking", "is-tripping");
  mumi.classList.remove("is-walking");
  tony.classList.remove("is-walking");
  hideObjectLabel();

  const focusY = clamp(positions.billi.y - 3.5, 10, 90);
  gameStage.style.setProperty("--bracelet-focus-x", positions.billi.x + "%");
  gameStage.style.setProperty("--bracelet-focus-y", focusY + "%");
  gameStage.style.setProperty("--bracelet-shift-x", clamp(50 - positions.billi.x, -35, 35) + "%");
  gameStage.style.setProperty("--bracelet-shift-y", clamp(61 - focusY, -24, 24) + "%");
  billi.classList.remove("has-bracelet");
  void gameStage.offsetWidth;
  gameStage.classList.add("is-bracelet-cutaway");

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealDelay = reducedMotion ? 120 : 690;
  const finishDelay = reducedMotion ? 700 : 2860;

  braceletAnimationTimers.push(window.setTimeout(function () {
    billi.classList.add("has-bracelet", "is-receiving-bracelet");
    SOUND.bracelet();
  }, revealDelay));

  braceletAnimationTimers.push(window.setTimeout(function () {
    stopBraceletAnimation();
    billi.classList.add("has-bracelet");
  }, finishDelay));
}

function chooseBilliTripRemark() {
  const outdoorScenes = ["street", "lowerWillow", "woodline", "carGraveyard", "riverside", "bridge", "market"];
  const remarks = SCRIPT.movement.billiTrips;
  const sceneRemarks = outdoorScenes.includes(state.scene) ? remarks.outside : remarks.inside;
  const choices = remarks.anywhere.concat(sceneRemarks).filter(function (line) {
    return line.text !== previousTripRemark;
  });
  const line = choices[Math.floor(Math.random() * choices.length)];
  previousTripRemark = line.text;
  return line;
}

function shouldBilliTrip(distance) {
  if (distance < 8 || billiLimpWalks > 0) return false;
  walksUntilBilliTrips -= 1;
  if (walksUntilBilliTrips > 0) return false;
  walksUntilBilliTrips = 24 + Math.floor(Math.random() * 19);
  return true;
}

function tripBilli(request, onRecovered) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const duration = reducedMotion ? 350 : 1150;
  const remark = chooseBilliTripRemark();

  billi.classList.remove("is-walking", "is-limping");
  mumi.classList.remove("is-walking");
  tony.classList.remove("is-walking");
  billi.classList.add("is-tripping");
  SOUND.trip(state.scene);
  showItemNotice(remark.speaker, remark.text);

  billiTripTimer = window.setTimeout(function () {
    billiTripTimer = null;
    if (request !== walkRequest) return;
    billi.classList.remove("is-tripping");
    billi.classList.add("is-limping", "is-walking");
    mumi.classList.add("is-walking");
    if (state.flags.tonyFollowing) tony.classList.add("is-walking");
    billiLimpWalks = 2;
    onRecovered();
  }, duration);
}

function walkTo(x, y, onArrival) {
  if (billiTripTimer !== null) return;
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
  const tonyTarget = {
    x: clamp(target.x - direction * 10, bounds.minX, bounds.maxX),
    y: clamp(target.y + 2, bounds.minY, bounds.maxY)
  };
  const billiStart = { ...positions.billi };
  const mumiStart = { ...positions.mumi };
  const tonyStart = { ...positions.tony };
  const distance = Math.hypot(target.x - billiStart.x, (target.y - billiStart.y) * 1.5);
  const tripAt = shouldBilliTrip(distance) ? 0.34 + Math.random() * 0.34 : null;

  if (distance < 0.8) {
    positions.billi = target;
    positions.mumi = mumiTarget;
    if (state.flags.tonyFollowing) positions.tony = tonyTarget;
    renderWalkers();
    if (onArrival) onArrival();
    return;
  }

  walkRequest += 1;
  const request = walkRequest;
  const duration = clamp(distance * 34, 260, 1900);
  let progress = 0;
  let previousFrameTime = performance.now();
  let lastFootstepTime = previousFrameTime - 300;
  let hasTripped = false;
  setFacing(billi, direction < 0);
  setFacing(mumi, direction < 0);
  setFacing(tony, direction < 0);
  billi.classList.add("is-walking");
  mumi.classList.add("is-walking");
  if (state.flags.tonyFollowing) tony.classList.add("is-walking");

  function frame(now) {
    if (request !== walkRequest) return;
    const frameDuration = Math.min(80, Math.max(0, now - previousFrameTime));
    const isLimping = billi.classList.contains("is-limping");
    const walkingSpeed = isLimping ? 0.84 : 1;
    previousFrameTime = now;
    progress = Math.min(1, progress + (frameDuration / duration) * walkingSpeed);
    positions.billi = {
      x: billiStart.x + (target.x - billiStart.x) * progress,
      y: billiStart.y + (target.y - billiStart.y) * progress
    };
    positions.mumi = {
      x: mumiStart.x + (mumiTarget.x - mumiStart.x) * progress,
      y: mumiStart.y + (mumiTarget.y - mumiStart.y) * progress
    };
    if (state.flags.tonyFollowing) {
      positions.tony = {
        x: tonyStart.x + (tonyTarget.x - tonyStart.x) * progress,
        y: tonyStart.y + (tonyTarget.y - tonyStart.y) * progress
      };
    }
    renderWalkers();

    const footstepInterval = isLimping ? 390 : 275;
    if (now - lastFootstepTime >= footstepInterval) {
      SOUND.step(state.scene, isLimping);
      lastFootstepTime = now;
    }

    if (tripAt !== null && !hasTripped && progress >= tripAt && progress < 1) {
      hasTripped = true;
      tripBilli(request, function () {
        previousFrameTime = performance.now();
        lastFootstepTime = previousFrameTime;
        window.requestAnimationFrame(frame);
      });
      return;
    }

    if (progress < 1) {
      window.requestAnimationFrame(frame);
      return;
    }

    billi.classList.remove("is-walking");
    mumi.classList.remove("is-walking");
    tony.classList.remove("is-walking");
    if (billiLimpWalks > 0) {
      billiLimpWalks -= 1;
      if (billiLimpWalks === 0) billi.classList.remove("is-limping");
    }
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
  SOUND.syncScene(state.scene);
  syncTrashCanStroll();
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
  stopBraceletAnimation();
  clearBridgeMouse();
  clearTrashCanStroll();
  clearDoorPryAnimation();
  const tonyTransition = prepareTonyTransition(lines, onDone);
  SOUND.transition(state.scene, scene);
  state.scene = scene;
  state.selectedItem = null;
  saveState();
  renderScene(true);
  if (tonyTransition.lines.length) {
    playDialogue(tonyTransition.lines, tonyTransition.onDone);
  } else {
    hideDialogue();
    if (tonyTransition.onDone) tonyTransition.onDone();
  }
  preloadNextScenes(scene);
}

function enterBridge() {
  const firstVisit = !state.flags.bridgeVisited;
  state.flags.bridgeVisited = true;
  goToScene("bridge", firstVisit ? SCRIPT.bridge.firstVisit : null);
  if (firstVisit) runBridgeMouse();
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

function leavePizzeria() {
  const firstGreeting = !state.flags.trashCanGreetingHeard;
  state.flags.trashCanGreetingHeard = true;
  goToScene("street", firstGreeting ? [SCRIPT.trashCanMan.exitGreeting] : null);
}

function playRestroomEntrance() {
  walkRequest += 1;
  const request = walkRequest;
  const startX = 8;
  const endX = 31;
  const startedAt = performance.now();

  positions = {
    billi: { x: startX, y: 86 },
    mumi: { x: 38, y: 85 },
    tony: { x: 43, y: 86 }
  };
  setFacing(billi, false);
  setFacing(mumi, true);
  setFacing(tony, true);
  billi.classList.add("is-walking");
  mumi.classList.remove("is-walking");
  tony.classList.remove("is-walking");
  renderWalkers();

  function frame(now) {
    if (request !== walkRequest || state.scene !== "restroom") return;
    const progress = Math.min(1, (now - startedAt) / 720);
    positions.billi.x = startX + (endX - startX) * progress;
    renderWalkers();

    if (progress < 1) {
      window.requestAnimationFrame(frame);
      return;
    }

    billi.classList.remove("is-walking");
  }

  window.requestAnimationFrame(frame);
}

function enterPizzeriaRestroom() {
  const firstVisit = !state.flags.restroomVisited;
  state.flags.restroomVisited = true;
  goToScene("restroom");

  if (firstVisit) {
    playRestroomEntrance();
    playDialogue(SCRIPT.pizzeria.restroom.firstVisit);
  }
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

  upperWindows: function () {
    playDialogue(SCRIPT.willowStreet.upperWindows);
  },

  tonyWindow: function () {
    if (state.flags.tonyFollowing) {
      playLine(SCRIPT.tony.alreadyFollowing);
      return;
    }

    if (!state.flags.tonyMet) {
      playDialogue([SCRIPT.tony.windowCall], function () {
        state.flags.tonyMet = true;
        state.flags.tonyWindowOpen = true;
        state.flags.tonyAtWindow = true;
        refreshState();
        playDialogue(SCRIPT.tony.firstMeeting, function () {
          startTonyFollowing(false);
        });
      });
      return;
    }

    state.flags.tonyWindowOpen = true;
    state.flags.tonyAtWindow = true;
    refreshState();

    if (state.flags.tonyHelpedDoor) {
      playLine(SCRIPT.tony.helpedAlready);
      return;
    }

    if (state.flags.pryBarWedged && state.flags.pryBarTwoPersonAttempted) {
      playDialogue(SCRIPT.tony.helpRecruitment, function () {
        startTonyFollowing(true);
      });
      return;
    }

    playLine(SCRIPT.tony.waitingAtWindow);
  },

  trashCanMan: function () {
    clearTrashCanStroll();
    if (trashCanRemarkIndex === 0) {
      trashCanRemarkIndex += 1;
      playDialogue(SCRIPT.trashCanMan.rant, function () { scheduleTrashCanStroll(false); });
      return;
    }
    const remarks = SCRIPT.trashCanMan.repeatRemarks;
    const remark = remarks[(trashCanRemarkIndex - 1) % remarks.length];
    trashCanRemarkIndex += 1;
    playDialogue([remark], function () { scheduleTrashCanStroll(false); });
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

    if (state.flags.pryBarWedged) {
      if (
        state.flags.pryBarTwoPersonAttempted &&
        state.flags.tonyFollowing &&
        state.flags.tonyHelpingDoor
      ) {
        playDialogue(SCRIPT.bridge.pryBarThreeSetup, crackPumpDoorWithTony);
        return;
      }

      if (!state.flags.pryBarTwoPersonAttempted) {
        state.flags.pryBarTwoPersonAttempted = true;
        refreshState();
        playDialogue(SCRIPT.bridge.pryBarTogether);
        return;
      }

      playLine(SCRIPT.bridge.pryBarNeedThird);
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

  pizzeriaExit: leavePizzeria,

  restroomDoor: enterPizzeriaRestroom,

  restroomExit: function () {
    goToScene("pizzeria");
    queueBrunoOffer();
  },

  restroomGarland: function () {
    playLine(SCRIPT.pizzeria.restroom.garland);
  },

  restroomMirror: function () {
    playLine(SCRIPT.pizzeria.restroom.mirror);
  },

  restroomSink: function () {
    playLine(SCRIPT.pizzeria.restroom.sink);
  },

  restroomToilet: function () {
    playLine(SCRIPT.pizzeria.restroom.toilet);
  },

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
      state.flags.pryBarWedged = true;
      refreshState();
      playDialogue(SCRIPT.bridge.pryBarSolo);
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
      billi.classList.remove("has-bracelet");
      playDialogue(SCRIPT.pieShop.pizzaTrade, playBraceletAnimation);
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

  const noUse = SCRIPT.system.cannotUse(itemDetails[selected].label, hotspot.label);
  showItemNotice("still holding " + itemDetails[selected].label, noUse.text);
}

function preloadNextScenes(scene) {
  const sceneOrder = {
    street: ["riverside", "pizzeria", "market", "lowerWillow"],
    lowerWillow: ["street", "woodline"],
    woodline: ["lowerWillow", "carGraveyard"],
    carGraveyard: ["woodline"],
    riverside: ["street", "bridge"],
    bridge: ["riverside", "pizzeria", "pumphouse"],
    pizzeria: ["street", "restroom", "backroom", "market"],
    restroom: ["pizzeria"],
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
  stopBraceletAnimation();
  clearBridgeMouse();
  clearTrashCanStroll();
  clearDoorPryAnimation();
  if (billiTripTimer !== null) {
    window.clearTimeout(billiTripTimer);
    billiTripTimer = null;
  }
  billiLimpWalks = 0;
  walksUntilBilliTrips = 18 + Math.floor(Math.random() * 13);
  previousTripRemark = "";
  billi.classList.remove("is-tripping", "is-limping");
  if (itemNoticeTimer !== null) {
    window.clearTimeout(itemNoticeTimer);
    itemNoticeTimer = null;
  }
  itemNotice.hidden = true;
  itemNotice.classList.remove("is-visible");
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
  if (
    !button ||
    activeDialogue ||
    gameStage.classList.contains("is-bracelet-cutaway") ||
    gameStage.classList.contains("is-three-person-pry")
  ) return;
  event.stopPropagation();
  hideObjectLabel();
  const hotspot = findHotspot(button.dataset.action);
  if (!hotspot) return;
  walkTo(hotspot.walk[0], hotspot.walk[1], function () { runInteraction(hotspot); });
});

gameStage.addEventListener("click", function (event) {
  if (
    activeDialogue ||
    gameStage.classList.contains("is-bracelet-cutaway") ||
    gameStage.classList.contains("is-three-person-pry") ||
    event.target.closest("[data-action]") ||
    state.scene === "cosmos"
  ) return;
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
  if (event.key === "Enter" && activeDialogue) {
    event.preventDefault();
    event.stopPropagation();
    if (event.repeat) return;
    advanceDialogue();
    return;
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
