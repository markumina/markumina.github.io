/*
 * Nothing dialogue script
 *
 * Edit character names and spoken text here. Each single remark is one
 * { speaker, text } object. Conversations are arrays in the order shown.
 * Game rules and scene behavior stay in game.js.
 */

window.NOTHING_DIALOGUE = {
  system: {
    sceneLoadError: { speaker: "System", text: "The scene could not be opened." },
    cannotUse: function (item, target) {
      return { speaker: "Billi", text: "The " + item + " will not help with " + target + "." };
    }
  },

  items: {
    deliveryTag: {
      held: { speaker: "Billi", text: "An old delivery tag from Bruno's place, from 1978. Let's go show him before he closes." },
      description: { speaker: "Billi", text: "Rain-softened paper from a delivery made to the pump station in 1978." }
    },
    brassToken: {
      held: { speaker: "Mumi", text: "The token with the triangular notch. It must fit somewhere." },
      description: { speaker: "Mumi", text: "A heavy brass token marked with a small triangle." }
    },
    pryBar: {
      held: { speaker: "Mumi", text: "The short pry bar. Good for one stubborn piece of wood." },
      description: { speaker: "Mumi", text: "Old iron, short enough to carry, and still solid." }
    },
    ceramicFuse: {
      held: { speaker: "Billi", text: "The fuse. There was an empty socket in Bruno's back room." },
      description: { speaker: "Billi", text: "A white ceramic fuse from a box of old electrical parts." }
    },
    amberLens: {
      held: { speaker: "Billi", text: "The amber lens. It looks older than the cabinet it was locked in." },
      description: { speaker: "Billi", text: "A thick amber survey lens in a brass ring." }
    },
    pumpkinCookie: {
      held: { speaker: "Billi", text: "A pumpkin-shaped cookie. One of the bats keeps staring at it." },
      description: { speaker: "Billi", text: "Ginger, molasses, and a face considerably happier than the bats." }
    },
    punchCup: {
      held: { speaker: "Mumi", text: "An empty paper cup from Nora's tasting table." },
      description: { speaker: "Mumi", text: "Orange paper, black stars, and no cider yet." }
    },
    spicedPunch: {
      held: { speaker: "Billi", text: "A warm cup of Nora's spiced apple cider." },
      description: { speaker: "Billi", text: "Apple, cinnamon, orange peel, and a suspicious amount of clove." }
    },
    nightPerfume: {
      held: { speaker: "Billi", text: "Nora's little amber bottle of Perfume of the Night." },
      description: { speaker: "Billi", text: "A few sprays made from pumpkin essential oil, cedar, and clove." }
    },
    sparkPlugWire: {
      held: { speaker: "Mumi", text: "The red spark plug wire from the car graveyard. Old, flexible, and still tough." },
      description: { speaker: "Mumi", text: "A long red ignition lead with sound insulation and a metal terminal at each end." }
    },
    wrappedPizza: {
      held: { speaker: "Billi", text: "A warm slice of Bruno's pizza wrapped in foil." },
      description: { speaker: "Billi", text: "Still warm, folded into foil, with a red paper napkin tucked around it." }
    }
  },

  opening: {
    firstVisit: [
      { speaker: "Billi", text: "The fireflies are going down the bridge path." },
      { speaker: "Mumi", text: "At midnight?" },
      { speaker: "Billi", text: "They probably know the neighborhood better than we do." }
    ]
  },

  willowStreet: {
    utilityBox: { speaker: "Mumi", text: "New lock, old box. The cable runs downhill." },
    riverStone: { speaker: "Billi", text: "Just a cold round stone. It can stay here." }
  },

  lowerWillow: {
    porch: { speaker: "Billi", text: "A paper pumpkin turning under the porch light. Someone still changes that bulb." },
    shutteredShop: { speaker: "Mumi", text: "The lettering is gone. The shelves are still in there." },
    vacantLot: { speaker: "Billi", text: "Old tire tracks cut through the weeds and keep going downhill." }
  },

  woodline: {
    streetlight: { speaker: "Mumi", text: "Last bulb on the line. The wire stops here, but the tire tracks do not." },
    chain: { speaker: "Billi", text: "Someone dropped the chain years ago and kept driving through." }
  },

  carGraveyard: {
    sedan: { speaker: "Mumi", text: "Early nineties. It looks like every school parking lot at once." },
    olderShell: { speaker: "Billi", text: "The trees have been here long enough to grow around the bumper." },
    hoodOpened: { speaker: "Mumi", text: "The hinges complain, but the hood stays up." },
    wireVisible: { speaker: "Billi", text: "Most of the wiring is brittle. One red ignition lead still bends." },
    hoodEmpty: { speaker: "Mumi", text: "Nothing else in the engine bay wants to come quietly." },
    missingWheel: { speaker: "Billi", text: "One wheel off, two blocks under it, and twenty years of leaves." },
    wireTaken: { speaker: "Mumi", text: "A red spark plug wire. Old, but the insulation still flexes." }
  },

  riverside: {
    lamp: { speaker: "Mumi", text: "The bulb is warm. Someone still maintains this path." },
    river: { speaker: "Billi", text: "The river is almost black from here." }
  },

  bridge: {
    firstVisit: [
      { speaker: "Billi", text: "The fireflies came all the way down here." },
      { speaker: "Mumi", text: "That pump building is not on the town map." }
    ],
    river: { speaker: "Billi", text: "The current and the reflected lights are moving in opposite directions." },
    emptyDrain: { speaker: "Mumi", text: "Nothing else in the drain but rainwater." },
    tokenFound: { speaker: "Mumi", text: "A brass token was caught in the grate. It has a triangular notch." },
    tagGone: { speaker: "Billi", text: "Only a clean patch of dust remains by the step." },
    tagFound: { speaker: "Billi", text: "An old Bellini's delivery tag. The destination says pump station." },
    pumpDoorLocked: { speaker: "Mumi", text: "The lock is gone, but one swollen plank is holding the door shut." }
  },

  market: {
    windows: { speaker: "Billi", text: "Every pie in the window has a little pastry leaf on top." },
    sign: { speaker: "Mumi", text: "Pie Piper. Somebody crossed out Piper and hung 'to DIE for' underneath." },
    pumpkins: { speaker: "Billi", text: "Three friendly faces and one that has clearly seen the invoices." }
  },

  pieShop: {
    firstVisit: [
      { speaker: "Nora", text: "Well, look what the moon dragged in. Come warm up. The cider's behaving, mostly." },
      { speaker: "Billi", text: "We're just looking." },
      { speaker: "Nora", text: "Everybody says that. Then the pie gets involved." },
      { speaker: "Left Bat", text: "Her sales pitch has casualties." }
    ],
    batRemarks: [
      { speaker: "Left Bat", text: "Two people walk into a pie shop. Neither checks the ceiling. Typical." },
      { speaker: "Middle Bat", text: "They looked sharper through the window." },
      { speaker: "Right Bat", text: "That was your quiet walk? The floor filed a complaint." },
      { speaker: "Left Bat", text: "We voted. Your shoes are the scariest thing in here." }
    ],
    batsAfterCookie: { speaker: "Middle Bat", text: "We take back one thing we said about your shoes. Not which thing." },
    decorations: { speaker: "Nora", text: "I put up one garland in 1989. It has been multiplying ever since." },
    ciderPot: { speaker: "Nora", text: "Spiced apple cider. The pot only looks guilty." },
    cupTaken: { speaker: "Nora", text: "Take a cup. That is what the cups are conducting themselves for." },
    cookieTaken: { speaker: "Nora", text: "Take one. The bats cannot reach the table and resent architecture." },
    pieCase: { speaker: "Mumi", text: "Apple, pumpkin, pecan, and one labeled only with a question mark." },
    perfumeGift: [
      { speaker: "Nora", text: "Before you go, take this. Perfume of the Night." },
      { speaker: "Billi", text: "It smells like pumpkin." },
      { speaker: "Nora", text: "Pumpkin oil, cedar, and clove. We make one little batch every Halloween." },
      { speaker: "Mumi", text: "Perfume or potion?" },
      { speaker: "Nora", text: "Two sprays, perfume. Three sprays, depends who's asking." }
    ],
    afterBatCookie: { speaker: "Nora", text: "You fed them. Now they will complain about crumbs until Christmas." },
    noraRepeat: { speaker: "Nora", text: "Do not mind the bats. They were marked down after Halloween of 1987." },
    cookieToBats: [
      { speaker: "Right Bat", text: "At last. Tribute." },
      { speaker: "Billi", text: "It is half a cookie." },
      { speaker: "Left Bat", text: "At last. Measured tribute." }
    ],
    cupFilled: { speaker: "Nora", text: "One scoop, sweetheart. That cider has opinions." },
    pizzaTrade: [
      { speaker: "Nora", text: "Bruno's pizza? Give me that before the bats form a committee." },
      { speaker: "Billi", text: "np" },
      { speaker: "Nora", text: "This is alittle teal bracelet. Put it on. It suits you, and unlike them, it minds its own business." }
    ]
  },

  pizzeria: {
    firstVisit: [
      { speaker: "Bruno", text: "Ayyy! How'sa u mutha and fatha?" },
      { speaker: "Bruno", text: "U looka too skinny. Eat somethin!" },
      { speaker: "Bruno", text: "Hey, wanna the fries and a coupla piece a pizza?" },
      { speaker: "Bruno", text: "U gotta hurry up becuza ima closa in a few minute." }
    ],
    photographs: { speaker: "Billi", text: "One photograph shows Bruno's father carrying pizza boxes under the bridge." },
    bruno: {
      trusted: { speaker: "Bruno", text: "The backa room is open. Minda the flour sacks." },
      deliveryStory: [
        { speaker: "Bruno", text: "My fatha useda make deliveries unda that bridge. Looooonga timee ago." }
      ],
      lateOffer: [
        { speaker: "Bruno", text: "ay." },
        { speaker: "Bruno", text: "u wanna the peesa pizza?" },
        { speaker: "Bruno", text: "or what" }
      ],
      wrappingPizza: { speaker: "Bruno", text: "u wanna wrapped up? ima gonna wrap... just a minute." },
      pizzaReady: { speaker: "Bruno", text: "Here ya go." },
      pizzaGone: { speaker: "Bruno", text: "I already wrappa that one for ya." },
      backroomRefusal: { speaker: "Bruno", text: "whatt? you wanna go back inna there? nah, come ahhn." },
      tagAlreadyGiven: { speaker: "Bruno", text: "Keep it. My fatha woulda like that." },
      tagConversation: [
        { speaker: "Bruno", text: "Where'da u find this?" },
        { speaker: "Billi", text: "At the pump-building door." },
        { speaker: "Bruno", text: "My fatha deliver to the night crew. Then one winta, the orders stop." },
        { speaker: "Bruno", text: "His bridge stuff is inna back room. Go look." }
      ],
      ciderConversation: [
        { speaker: "Bruno", text: "Nora's cider. Cinnamon, clove, and a formal warning froma the dentist." },
        { speaker: "Billi", text: "She said one scoop." },
        { speaker: "Bruno", text: "Nora alwaysa confuse hospitality with enforcement." }
      ]
    }
  },

  backroom: {
    firstVisit: [
      { speaker: "Bruno", text: "My fatha, he save everything excepta useful shelf space." },
      { speaker: "Mumi", text: "These are plans for the bridge." },
      { speaker: "Bruno", text: "And the olda pump room unda it. Take whateva helps." }
    ],
    pryBarGone: { speaker: "Mumi", text: "A clean line in the dust marks where the pry bar was." },
    pryBarTaken: { speaker: "Mumi", text: "A short iron pry bar. Not elegant, but neither is that boarded door." },
    plans: { speaker: "Billi", text: "The bridge plans show a pump room. The sheet ends where the floor should be." },
    fuseGone: { speaker: "Billi", text: "The workbench is mostly tomato tins now." },
    fuseTaken: { speaker: "Billi", text: "A ceramic fuse. It is the same size as the empty socket on the wall." },
    fuseInstalled: { speaker: "Mumi", text: "The cabinet circuit is live again." },
    fuseMissing: { speaker: "Billi", text: "The right-hand socket is empty." },
    cabinetEmpty: { speaker: "Billi", text: "Only ordinary camera parts remain." },
    cabinetUnpowered: { speaker: "Mumi", text: "The electric catch is dead. The wall box is missing a fuse." },
    lensFound: [
      { speaker: "Billi", text: "An amber survey lens." },
      { speaker: "Bruno", text: "My fatha say it show things ordinary glassa miss." }
    ],
    pryBarUsed: [
      { speaker: "Mumi", text: "The plank is moving." },
      { speaker: "Billi", text: "Quietly was never an option." }
    ],
    fuseAlreadyInstalled: { speaker: "Mumi", text: "The fuse is already in place." },
    fuseUsed: [
      { speaker: "Mumi", text: "The cabinet light came on." },
      { speaker: "Billi", text: "So did a light somewhere under the bridge." }
    ]
  },

  pumpStation: {
    firstVisit: [
      { speaker: "Billi", text: "It smells like river water and old pennies." },
      { speaker: "Mumi", text: "The fireflies got in before we did." }
    ],
    workbench: { speaker: "Mumi", text: "Every maintenance log after 1978 was removed." },
    pump: { speaker: "Billi", text: "The pump casing has the same triangular mark as the token." },
    crateMoved: [
      { speaker: "Billi", text: "Help me move the crate." },
      { speaker: "Mumi", text: "That hatch was hidden, not forgotten." }
    ],
    hatchLocked: { speaker: "Mumi", text: "A triangular slot. Nothing on a municipal key ring would fit it." },
    tokenUsed: [
      { speaker: "Billi", text: "The token fits." },
      { speaker: "Mumi", text: "The pump station was built around this." }
    ]
  },

  vestibule: {
    firstVisit: [
      { speaker: "Mumi", text: "This is not part of the pump station." },
      { speaker: "Billi", text: "No. The pump station is sitting on top of it." }
    ],
    mural: { speaker: "Billi", text: "An amber eye opens the circle. That is all the mosaic says." },
    pedestal: { speaker: "Mumi", text: "No inscription. Just a ring of scratches around the empty top." },
    barrierLocked: { speaker: "Billi", text: "The socket in the center is the size of a camera lens." },
    lensUsed: [
      { speaker: "Billi", text: "The lens is gathering light from nowhere." },
      { speaker: "Mumi", text: "And the stone is moving." }
    ]
  },

  chamber: {
    firstVisit: [
      { speaker: "Billi", text: "This is not a basement." },
      { speaker: "Mumi", text: "Basements usually have ceilings." }
    ],
    starAlreadySet: { speaker: "Billi", text: "The brass dial is pointing at the broken constellation." },
    starSet: { speaker: "Billi", text: "The dial stops at the missing star. Its brass contact swings toward the ring, then springs back." },
    contactTied: { speaker: "Mumi", text: "The red ignition lead is holding both brass eyes together." },
    contactLoose: { speaker: "Mumi", text: "One brass eye is on the dial and one is on the ring. They need to be held together." },
    riverAlreadySet: { speaker: "Mumi", text: "The floor dial will not turn any farther." },
    riverSet: { speaker: "Mumi", text: "The dial turns once. Water moves somewhere behind the wall." },
    portalDormant: { speaker: "Billi", text: "The ring is connected to both mechanisms in the room." },
    starMissing: { speaker: "Mumi", text: "The floor is set. The brass star dial is not." },
    riverMissing: { speaker: "Billi", text: "The stars are set. The round floor dial is not." },
    wireMissing: { speaker: "Mumi", text: "Both dials are set, but the loose brass contact keeps springing away from the ring." },
    portalOpening: [
      { speaker: "Billi", text: "The wall inside the ring is gone." },
      { speaker: "Mumi", text: "The floor is going with it." }
    ],
    wireUsed: { speaker: "Mumi", text: "The spark plug wire holds the dial's brass contact against the ring." }
  },

  cosmos: {
    ending: [
      { speaker: "Billi", text: "Mumi." },
      { speaker: "Mumi", text: "I know." },
      { speaker: "Billi", text: "There is no down." },
      { speaker: "Mumi", text: "Then don't let go." }
    ],
    returnLine: { speaker: "Mumi", text: "There is no down." }
  }
};
