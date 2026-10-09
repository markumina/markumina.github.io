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
      return { speaker: "Lily", text: "The " + item + " will not help with " + target + "." };
    }
  },

  movement: {
    billiTrips: {
      anywhere: [
        { speaker: "Lily", text: "Shit, these shoes are too big." },
        { speaker: "Lily", text: "I'm fine. The ground got ambitious." }
      ],
      outside: [
        { speaker: "Lily", text: "There was gravel. A lot of gravel." },
        { speaker: "Lily", text: "Wet leaves. Of course." },
        { speaker: "Lily", text: "That paving stone moved." },
        { speaker: "Lily", text: "The curb started it." }
      ],
      inside: [
        { speaker: "Lily", text: "That chair absolutely moved." },
        { speaker: "Lily", text: "That floor tile has it in for me." },
        { speaker: "Lily", text: "Who polished this floor?" }
      ]
    }
  },

  items: {
    deliveryTag: {
      held: { speaker: "Lily", text: "An old delivery tag from Bruno's place, from 1978. Let's go show him before he closes." },
      description: { speaker: "Lily", text: "Rain-softened paper from a delivery made to the pump station in 1978." }
    },
    brassToken: {
      held: { speaker: "Mark", text: "The token with the triangular notch. It must fit somewhere." },
      description: { speaker: "Mark", text: "A heavy brass token marked with a small triangle." }
    },
    pryBar: {
      held: { speaker: "Mark", text: "The short pry bar. Good for one stubborn piece of wood." },
      description: { speaker: "Mark", text: "Old iron, short enough to carry, and still solid." }
    },
    ceramicFuse: {
      held: { speaker: "Lily", text: "The fuse. There was an empty socket in Bruno's back room." },
      description: { speaker: "Lily", text: "A white ceramic fuse from a box of old electrical parts." }
    },
    amberLens: {
      held: { speaker: "Lily", text: "The amber lens. It looks older than the cabinet it was locked in." },
      description: { speaker: "Lily", text: "A thick amber survey lens in a brass ring." }
    },
    pumpkinCookie: {
      held: { speaker: "Lily", text: "A pumpkin-shaped cookie. One of the bats keeps staring at it." },
      description: { speaker: "Lily", text: "Ginger, molasses, and a face considerably happier than the bats." }
    },
    punchCup: {
      held: { speaker: "Mark", text: "An empty paper cup from Nora's tasting table." },
      description: { speaker: "Mark", text: "Orange paper, black stars, and no cider yet." }
    },
    spicedPunch: {
      held: { speaker: "Lily", text: "A warm cup of Nora's spiced apple cider." },
      description: { speaker: "Lily", text: "Apple, cinnamon, orange peel, and a suspicious amount of clove." }
    },
    nightPerfume: {
      held: { speaker: "Lily", text: "Nora's little amber bottle of Perfume of the Night." },
      description: { speaker: "Lily", text: "A few sprays made from pumpkin essential oil, cedar, and clove." }
    },
    sparkPlugWire: {
      held: { speaker: "Mark", text: "The red spark plug wire from the car graveyard. Old, flexible, and still tough." },
      description: { speaker: "Mark", text: "A long red ignition lead with sound insulation and a metal terminal at each end." }
    },
    wrappedPizza: {
      held: { speaker: "Lily", text: "A warm slice of Bruno's pizza wrapped in foil." },
      description: { speaker: "Lily", text: "Still warm, folded into foil, with a red paper napkin tucked around it." }
    },
    towRope: {
      held: { speaker: "Mark", text: "The old tow rope from the car graveyard. It is dry, heavy, and still sound." },
      description: { speaker: "Mark", text: "A long braided tow rope with one good steel hook left on it." }
    },
    looseTire: {
      held: { speaker: "Lily", text: "A loose junkyard tire. Heavy, flat, and still round enough to roll." },
      description: { speaker: "Mark", text: "An old wheel and tire from beside the red muscle car. It is not attached to anything anymore." }
    },
    brakeFluid: {
      held: { speaker: "Mark", text: "Half a container of brake fluid from Danny's garage." },
      description: { speaker: "Lily", text: "Old brake fluid in a scuffed plastic bottle. The cap is still tight." }
    },
    sideCutters: {
      held: { speaker: "Mark", text: "A small pair of red-handled side cutters from the yard behind Bellini's." },
      description: { speaker: "Mark", text: "Old diagonal cutters. The hinge is loose, but the jaws still meet cleanly." }
    }
  },

  opening: {
    firstVisit: [
      { speaker: "Lily", text: "The fireflies are going down the bridge path." },
      { speaker: "Mark", text: "At midnight?" },
      { speaker: "Lily", text: "They probably know the neighborhood better than we do." }
    ]
  },

  willowStreet: {
    utilityBox: { speaker: "Mark", text: "New lock, old box. The cable runs downhill." },
    riverStone: { speaker: "Lily", text: "Just a cold round stone. It can stay here." },
    upperWindows: [
      { speaker: "Lily", text: "I wonder what's up there." },
      { speaker: "Mark", text: "Why?" }
    ]
  },

  tony: {
    windowCall: { speaker: "Lily", text: "Hey! What's up there!" },
    firstMeeting: [
      { speaker: "Tony", text: "Hey, Lily." },
      { speaker: "Lily", text: "Tony? I didn't know you lived here." },
      { speaker: "Tony", text: "I don't. I'm at my aunt's house." },
      { speaker: "Mark", text: "Come down." },
      { speaker: "Tony", text: "Just for a little while." }
    ],
    microwaveDeparture: [
      { speaker: "Tony", text: "I gotta go back. I left some stuff in the microwave." },
      { speaker: "Lily", text: "What stuff?" },
      { speaker: "Tony", text: "Micro Magic fries." }
    ],
    waitingAtWindow: { speaker: "Tony", text: "I have to finish the Micro Magic fries first." },
    alreadyFollowing: { speaker: "Tony", text: "I'm down here." },
    helpRecruitment: [
      { speaker: "Lily", text: "Tony, come with us. We need one more person at the pump house." },
      { speaker: "Tony", text: "For what?" },
      { speaker: "Mark", text: "Standing on a pry bar." },
      { speaker: "Tony", text: "Okay. Just for a little while." }
    ],
    helpedAlready: { speaker: "Tony", text: "I already helped. My aunt says the fries are getting weird." }
  },

  trashCanMan: {
    exitGreeting: { speaker: "Man in the can", text: "Hey, Mark, the squirrels are looking for you. They think you're nuts." },
    rant: [
      { speaker: "Man in the can", text: "Pizza is tomato and bread. My teacher used to insist it was bad for you." },
      { speaker: "Man in the can", text: "She also said you should never write on yellow lined paper with a pen." },
      { speaker: "Man in the can", text: "They're ballpoint pens now. The ink doesn't bleed into the page like it did in her time, when they used inkwell pens." }
    ],
    repeatRemarks: [
      { speaker: "Man in the can", text: "Tomato. Bread. Somehow this was a classroom emergency." },
      { speaker: "Man in the can", text: "Ballpoint pen. Yellow paper. Perfectly safe." },
      { speaker: "Man in the can", text: "The squirrels did not say why they needed you." }
    ]
  },

  belliniYard: {
    shed: { speaker: "Mark", text: "The shed door is swollen shut. Whatever mattered was left outside." },
    crates: { speaker: "Lily", text: "Bellini's delivery crates. The newest date burned into one is 1986." },
    sideCuttersTaken: { speaker: "Mark", text: "Old side cutters. Loose hinge, clean jaws. These still work." }
  },

  lowerWillow: {
    bandFirstVisit: [
      { speaker: "Lily", text: "That's probably Jamie's band playing." },
      { speaker: "Mark", text: "Sounds like high school band practice." },
      { speaker: "Lily", text: "They've been working on that same song all month." }
    ],
    bandWindow: [
      { speaker: "Lily", text: "Jamie's band is still working on it." },
      { speaker: "Mark", text: "The drummer found the chorus this time." }
    ],
    porch: { speaker: "Lily", text: "A paper pumpkin turning under the porch light. Someone still changes that bulb." },
    doorWiggle: [
      { speaker: "Mark", text: "Wiggly door. Wiggle it more?" },
      { speaker: "Lily", text: "Whatever." }
    ],
    vacantLot: { speaker: "Lily", text: "Old tire tracks cut through the weeds and keep going downhill." },
    twinsChallenge: [
      { speaker: "Danny", text: "Hey, wussbags! Come kickstart this and you can have it." },
      { speaker: "Lily", text: "What if we don't?" },
      { speaker: "Danny", text: "Just get over here." },
      { speaker: "Mark", text: "Kiss my ass, turkey." }
    ],
    twinsEscaped: { speaker: "Lily", text: "Wussies!" },
    twinsCaught: [
      { speaker: "Danny", text: "Too slow. Pizza tax." },
      { speaker: "Lily", text: "He took the wrapped pizza." }
    ]
  },

  dannysGarage: {
    firstVisit: [
      { speaker: "Mark", text: "Oh fuck, a KX250!" },
      { speaker: "Mark", text: "This thing would rip your arms out of their sockets." },
      { speaker: "Lily", text: "So will Danny if he sees us here." },
      { speaker: "Mark", text: "This is Danny's house?" },
      { speaker: "Lily", text: "Yeah, but he's like somewhere. On probation or something." },
      { speaker: "Mark", text: "You don't go \"somewhere on probation.\"" },
      { speaker: "Lily", text: "Whatever. Let's go. We gotta do stuff." },
      { speaker: "Mark", text: "Like do what?" },
      { speaker: "Lily", text: "I dunno. Let's get out of here, though." }
    ],
    bikeRepeat: { speaker: "Mark", text: "A 1997 KX250. That thing would be completely unreasonable." },
    brakeFluidTaken: { speaker: "Lily", text: "Half a container of brake fluid. Cap's tight. Let's go." }
  },

  woodline: {
    streetlight: { speaker: "Mark", text: "Last bulb on the line. The wire stops here, but the tire tracks do not." },
    chain: { speaker: "Lily", text: "Someone dropped the chain years ago and kept driving through." }
  },

  carGraveyard: {
    sedan: { speaker: "Mark", text: "Early nineties. It looks like every school parking lot at once." },
    tireTaken: { speaker: "Lily", text: "A loose junkyard tire. Heavy, flat, and still round enough to roll." },
    tireImpact: { speaker: "Mark", text: "The tire hit the bumper and the hood latch let go." },
    turboEngine: [
      { speaker: "Lily", text: "OMG, this is a 2.2 turbo!" },
      { speaker: "Mark", text: "It is probably rusted into one piece." },
      { speaker: "Lily", text: "We should take it." },
      { speaker: "Mark", text: "We cannot just take it. We have to find out who owns it and offer them, like, a hundred bucks." },
      { speaker: "Lily", text: "A hundred bucks?" },
      { speaker: "Mark", text: "For the whole car." },
      { speaker: "Lily", text: "More like free. Who cares anyway? We can just drive it off-road." },
      { speaker: "Mark", text: "Off-road where?" },
      { speaker: "Lily", text: "Near the power lines." },
      { speaker: "Mark", text: "It has no front wheel." },
      { speaker: "Lily", text: "Fine. Then we start with the hundred bucks." }
    ],
    turboEngineRepeat: { speaker: "Lily", text: "A 2.2 turbo, assuming the engine and the rust can still be separated." },
    olderShell: { speaker: "Lily", text: "The trees have been here long enough to grow around the bumper." },
    hoodOpened: { speaker: "Mark", text: "The hinges complain, but the hood stays up." },
    wireVisible: { speaker: "Lily", text: "Most of the wiring is brittle. One red ignition lead still bends." },
    hoodEmpty: { speaker: "Mark", text: "Nothing else in the engine bay wants to come quietly." },
    missingWheel: { speaker: "Lily", text: "One wheel off, two blocks under it, and twenty years of leaves." },
    wireSecured: { speaker: "Mark", text: "The good ignition lead is trapped behind a rusted steel retaining strap. Pulling it will tear the insulation." },
    wireNeedsCutters: { speaker: "Lily", text: "Hold the side cutters. I'll keep the ignition lead out of the way." },
    wireTaken: { speaker: "Mark", text: "A red spark plug wire. Old, but the insulation still flexes." },
    ropeTaken: [
      { speaker: "Lily", text: "There is a tow rope under the leaves." },
      { speaker: "Mark", text: "Dry in the middle, no cuts, one good hook. Keep it." }
    ],
    ropeGone: { speaker: "Lily", text: "Only a rope-shaped clean patch remains in the leaves." }
  },

  riverside: {
    lamp: { speaker: "Mark", text: "The bulb is warm. Someone still maintains this path." },
    river: { speaker: "Lily", text: "The river is almost black from here." }
  },

  bridge: {
    firstVisit: [
      { speaker: "Lily", text: "The fireflies came all the way down here." },
      { speaker: "Mark", text: "That pump building is not on the town map." }
    ],
    river: { speaker: "Lily", text: "The current and the reflected lights are moving in opposite directions." },
    emptyDrain: { speaker: "Mark", text: "Nothing else in the drain but rainwater." },
    needRope: [
      { speaker: "Lily", text: "The grate moves." },
      { speaker: "Mark", text: "There is more than rainwater under it." }
    ],
    ropeReady: { speaker: "Lily", text: "Hold the tow rope and use it on the drain." },
    ropeRigged: [
      { speaker: "Lily", text: "Loop the hook through the grate." },
      { speaker: "Mark", text: "Pull. There. Now tie the other end around the rail." },
      { speaker: "Lily", text: "I will go first." }
    ],
    trashCanClue: [
      { speaker: "Lily", text: "Mark. That is his trash can." },
      { speaker: "Mark", text: "The man from beside Bellini's." },
      { speaker: "Lily", text: "He left it beside the way into the bridge." }
    ],
    emptyTrashCan: { speaker: "Lily", text: "Empty. He left it here like a coat by the door." },
    tokenFound: { speaker: "Mark", text: "A brass token was caught in the grate. It has a triangular notch." },
    tagGone: { speaker: "Lily", text: "Only a clean patch of dust remains by the step." },
    tagFound: { speaker: "Lily", text: "An old Bellini's delivery tag. The destination says pump station." },
    pumpDoorLocked: { speaker: "Mark", text: "The lock is gone, but one swollen plank is holding the door shut." },
    pryBarSolo: [
      { speaker: "Mark", text: "Let me try it." },
      { speaker: "Lily", text: "The bar's bending." },
      { speaker: "Mark", text: "And now it's stuck in the door." }
    ],
    pryBarTogether: [
      { speaker: "Lily", text: "Both of us. Ready?" },
      { speaker: "Mark", text: "Push." },
      { speaker: "Lily", text: "It moved. Barely." },
      { speaker: "Mark", text: "We need one more person." },
      { speaker: "Lily", text: "Tony." }
    ],
    pryBarNeedThird: { speaker: "Mark", text: "The two of us already tried. We need Tony." },
    pryBarThreeSetup: [
      { speaker: "Mark", text: "All three of us on the end." },
      { speaker: "Tony", text: "Move over. I get the end." },
      { speaker: "Lily", text: "Press down on three." },
      { speaker: "Mark", text: "One. Two. Three." }
    ],
    doorCracked: [
      { speaker: "Tony", text: "It cracked!" },
      { speaker: "Mark", text: "The door's open." },
      { speaker: "Tony", text: "I'm going back before my fries get cold again." }
    ]
  },

  drainPassage: {
    firstVisit: [
      { speaker: "Lily", text: "That is not just a drain. It is a hallway." },
      { speaker: "Mark", text: "We are inside one of the bridge piers." },
      { speaker: "Lily", text: "And that ladder keeps going up." },
      { speaker: "Mark", text: "Of course it does." }
    ],
    rope: { speaker: "Mark", text: "The knot is holding. The bridge path is straight up." },
    water: { speaker: "Lily", text: "Rainwater is running through a channel cut into the floor." },
    arch: { speaker: "Mark", text: "That little arch passes through the center of the stone pier." },
    ladder: { speaker: "Lily", text: "Rusty, but the bolts are still buried deep in the masonry." }
  },

  inspectionGallery: {
    firstVisit: [
      { speaker: "Lily", text: "Mark. That light is shimmering." },
      { speaker: "Mark", text: "It is electric. Someone is up here." },
      { speaker: "Lily", text: "Or was." },
      { speaker: "Mark", text: "We do not know who lives in there." },
      { speaker: "Lily", text: "We look from the doorway. We do not touch anything." },
      { speaker: "Mark", text: "You already decided we are going farther." },
      { speaker: "Lily", text: "Yes." }
    ],
    ladder: { speaker: "Mark", text: "The ladder drops back into the pier and down to the drain." },
    conduit: { speaker: "Mark", text: "Old inspection conduit. One newer cable has been clipped alongside it." },
    bolts: { speaker: "Lily", text: "Those bolts pass through the bridge ribs. Each one is wider than my hand." },
    glow: { speaker: "Lily", text: "The light moves like a flame, but there is no smoke." }
  },

  bridgeNook: {
    firstVisit: [
      { speaker: "Lily", text: "Oh. Someone really does live here." },
      { speaker: "Mark", text: "They are not here right now." },
      { speaker: "Lily", text: "The lamp is on. They cannot be far." },
      { speaker: "Mark", text: "Then we look without touching anything." }
    ],
    lamp: { speaker: "Mark", text: "An electric lamp made to look like kerosene. The battery cable runs under the table." },
    sandwich: { speaker: "Lily", text: "A Subway sub, still wrapped. This may be the newest thing in here." },
    table: { speaker: "Mark", text: "Two boards, three crates, and not a wobble. Whoever built it knew what they were doing." },
    mirror: { speaker: "Lily", text: "A little mirror hung from a masonry nail. The towel beside it is still damp." },
    water: { speaker: "Mark", text: "Two jugs of water. Full, clear, and recently carried up here." },
    sign: [
      { speaker: "Lily", text: "Avast ye scurvies." },
      { speaker: "Mark", text: "Specific." }
    ],
    bedroll: { speaker: "Lily", text: "Blankets folded tight, a canvas bag, and clean clothes. This is not abandoned." },
    shelf: { speaker: "Mark", text: "A radio, an inspection manual, three paperbacks, and a tin of tea." },
    violinReveal: [
      { speaker: "Lily", text: "That's him." },
      { speaker: "Mark", text: "The man from the trash can." },
      { speaker: "Lily", text: "Shh. Let him finish." },
      { speaker: "Lily", text: "Everybody walks past him every day." },
      { speaker: "Mark", text: "They don't know." },
      { speaker: "Lily", text: "Neither did we." }
    ],
    violinist: { speaker: "Lily", text: "Let's not interrupt him." }
  },

  market: {
    windows: { speaker: "Lily", text: "Every pie in the window has a little pastry leaf on top." },
    sign: { speaker: "Mark", text: "Pie Piper. Somebody crossed out Piper and hung 'to DIE for' underneath." },
    pumpkins: { speaker: "Lily", text: "Three friendly faces and one that has clearly seen the invoices." }
  },

  pieShop: {
    firstVisit: [
      { speaker: "Nora", text: "Well, look what the moon dragged in. Come warm up. The cider's behaving, mostly." },
      { speaker: "Lily", text: "We're just looking." },
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
    pieCase: { speaker: "Mark", text: "Apple, pumpkin, pecan, and one labeled only with a question mark." },
    perfumeGift: [
      { speaker: "Nora", text: "Before you go, take this. Perfume of the Night." },
      { speaker: "Lily", text: "It smells like pumpkin." },
      { speaker: "Nora", text: "Pumpkin oil, cedar, and clove. We make one little batch every Halloween." },
      { speaker: "Mark", text: "Perfume or potion?" },
      { speaker: "Nora", text: "Two sprays, perfume. Three sprays, depends who's asking." }
    ],
    afterBatCookie: { speaker: "Nora", text: "You fed them. Now they will complain about crumbs until Christmas." },
    noraRepeat: { speaker: "Nora", text: "Do not mind the bats. They were marked down after Halloween of 1987." },
    cookieToBats: [
      { speaker: "Right Bat", text: "At last. Tribute." },
      { speaker: "Lily", text: "It is half a cookie." },
      { speaker: "Left Bat", text: "At last. Measured tribute." }
    ],
    cupFilled: { speaker: "Nora", text: "One scoop, sweetheart. That cider has opinions." },
    pizzaTrade: [
      { speaker: "Nora", text: "Bruno's pizza? Give me that before the bats form a committee." },
      { speaker: "Lily", text: "np" },
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
    photographs: { speaker: "Lily", text: "One photograph shows Bruno's father carrying pizza boxes under the bridge." },
    restroom: {
      firstVisit: [
        { speaker: "Lily", text: "Move over. I'm coming in." },
        { speaker: "Mark", text: "Hey, what the hell?" },
        { speaker: "Bruno", text: "Heyy! No a fighting!" }
      ],
      garland: { speaker: "Lily", text: "Three paper pumpkins and one piece of tape doing all the work." },
      mirror: { speaker: "Lily", text: "This light has no mercy." },
      sink: { speaker: "Mark", text: "The cold tap is cold. The hot tap is also cold." },
      toilet: { speaker: "Mark", text: "Yep. That's the toilet." }
    },
    bruno: {
      trusted: { speaker: "Bruno", text: "The backa room is open. Minda the flour sacks." },
      deliveryStory: [
        { speaker: "Bruno", text: "My father, he useda make deliveries unda that bridge. Looooonga timee ago." }
      ],
      lateOffer: [
        { speaker: "Bruno", text: "ay." },
        { speaker: "Bruno", text: "u wanna the peesa pizza?" },
        { speaker: "Bruno", text: "or what" }
      ],
      wrappingPizza: { speaker: "Bruno", text: "u wanna wrapped up? ima gonna wrap... just a minute." },
      replacementPizza: { speaker: "Bruno", text: "Whadda happened to the first one? Ah, nevva mind. Ima wrappa one more." },
      pizzaReady: { speaker: "Bruno", text: "Here ya go." },
      pizzaGone: { speaker: "Bruno", text: "I already wrappa that one for ya." },
      backroomRefusal: { speaker: "Bruno", text: "whatt? you wanna go back inna there? nah, come ahhn." },
      tagAlreadyGiven: { speaker: "Bruno", text: "Keep it. My fatha woulda like that." },
      tagConversation: [
        { speaker: "Bruno", text: "Where'da u find this?" },
        { speaker: "Lily", text: "At the pump-building door." },
        { speaker: "Bruno", text: "The pump buildin'? He never tell me that." },
        { speaker: "Bruno", text: "My fatha deliver to the night crew. Then one winta, the orders stop." },
        { speaker: "Bruno", text: "But he keepa goin out at night. He never say where, he never say why." },
        { speaker: "Bruno", text: "This is his writin'. His bridge stuff is inna back room." },
        { speaker: "Bruno", text: "I never make sense of it. Maybe you do. Go look." }
      ],
      ciderConversation: [
        { speaker: "Bruno", text: "Nora's cider. Cinnamon, clove, and a formal warning froma the dentist." },
        { speaker: "Lily", text: "She said one scoop." },
        { speaker: "Bruno", text: "Nora alwaysa confuse hospitality with enforcement." }
      ]
    }
  },

  backroom: {
    firstVisit: [
      { speaker: "Bruno", text: "My fatha, he save everything excepta useful shelf space." },
      { speaker: "Mark", text: "These are plans for the bridge." },
      { speaker: "Bruno", text: "He call somethin' in these papers the Labyrinth." },
      { speaker: "Bruno", text: "I always think he mean the streets. Now I dunno." },
      { speaker: "Bruno", text: "He never find what he look for. Then there was no time lefta ask." },
      { speaker: "Bruno", text: "Take whateva helps." }
    ],
    pryBarGone: { speaker: "Mark", text: "A clean line in the dust marks where the pry bar was." },
    pryBarTaken: { speaker: "Mark", text: "A short iron pry bar. Not elegant, but neither is that boarded door." },
    plans: [
      { speaker: "Lily", text: "There are handwritten pages tucked behind the bridge plan." },
      { speaker: "Mark", text: "October seventeenth. The bridge plans lie. The route is present, but will not show itself." },
      { speaker: "Mark", text: "The amber survey lens responds to the markings. If I can bring it into the Labyrinth, it may reveal the path." },
      { speaker: "Lily", text: "He capitalized Labyrinth." },
      { speaker: "Mark", text: "And never wrote down where its entrance was." },
      { speaker: "Lily", text: "Maybe he never found it." }
    ],
    fuseGone: { speaker: "Lily", text: "Only a small clean mark remains on the workbench." },
    fuseTaken: { speaker: "Lily", text: "A ceramic fuse. It is the same size as the empty socket on the wall." },
    fuseInstalled: { speaker: "Mark", text: "The cabinet circuit is live again." },
    fuseMissing: { speaker: "Lily", text: "The right-hand socket is empty." },
    cabinetEmpty: { speaker: "Lily", text: "The lens shelf is empty. Everything else is ordinary camera hardware." },
    cabinetUnpowered: { speaker: "Mark", text: "The electric catch is dead. The wall box is missing a fuse." },
    lensFound: [
      { speaker: "Lily", text: "The amber survey lens from the manuscript." },
      { speaker: "Mark", text: "He thought it could reveal a route through the Labyrinth." },
      { speaker: "Bruno", text: "He keepa that locked up all these years. I never know why." }
    ],
    pryBarUsed: [
      { speaker: "Mark", text: "The plank is moving." },
      { speaker: "Lily", text: "Quietly was never an option." }
    ],
    fuseAlreadyInstalled: { speaker: "Mark", text: "The fuse is already in place." },
    fuseUsed: [
      { speaker: "Mark", text: "The cabinet light came on." },
      { speaker: "Lily", text: "So did a light somewhere under the bridge." }
    ]
  },

  pumpStation: {
    firstVisit: [
      { speaker: "Lily", text: "It smells like river water and old pennies." },
      { speaker: "Mark", text: "The fireflies got in before we did." }
    ],
    workbench: { speaker: "Mark", text: "Every maintenance log after 1978 was removed." },
    pump: { speaker: "Lily", text: "The pump casing has the same triangular mark as the token." },
    crateMoved: [
      { speaker: "Lily", text: "Help me move the crate." },
      { speaker: "Mark", text: "That hatch was hidden, not forgotten." }
    ],
    hatchLocked: { speaker: "Mark", text: "A triangular slot. Nothing on a municipal key ring would fit it." },
    tokenUsed: [
      { speaker: "Lily", text: "The token fits." },
      { speaker: "Mark", text: "The pump station was built around this." }
    ]
  },

  vestibule: {
    firstVisit: [
      { speaker: "Mark", text: "This is not part of the pump station." },
      { speaker: "Lily", text: "No. The pump station is sitting on top of it." }
    ],
    mural: { speaker: "Lily", text: "An amber eye opens the circle. That is all the mosaic says." },
    pedestal: { speaker: "Mark", text: "No inscription. Just a ring of scratches around the empty top." },
    barrierLocked: { speaker: "Lily", text: "The socket in the center is the size of a camera lens." },
    lensUsed: [
      { speaker: "Lily", text: "The lens is gathering light from nowhere." },
      { speaker: "Mark", text: "And the stone is moving." }
    ]
  },

  chamber: {
    firstVisit: [
      { speaker: "Lily", text: "This is not a basement." },
      { speaker: "Mark", text: "Basements usually have ceilings." }
    ],
    starAlreadySet: { speaker: "Lily", text: "The brass dial is pointing at the broken constellation." },
    starSet: { speaker: "Lily", text: "The dial stops at the missing star. Its brass contact swings toward the ring, then springs back." },
    contactTied: { speaker: "Mark", text: "The red ignition lead is holding both brass eyes together." },
    contactLoose: { speaker: "Mark", text: "One brass eye is on the dial and one is on the ring. They need to be held together." },
    riverAlreadySet: { speaker: "Mark", text: "The floor dial will not turn any farther." },
    riverSet: { speaker: "Mark", text: "The dial turns once. Water moves somewhere behind the wall." },
    portalDormant: { speaker: "Lily", text: "The ring is connected to both mechanisms in the room." },
    starMissing: { speaker: "Mark", text: "The floor is set. The brass star dial is not." },
    riverMissing: { speaker: "Lily", text: "The stars are set. The round floor dial is not." },
    wireMissing: { speaker: "Mark", text: "Both dials are set, but the loose brass contact keeps springing away from the ring." },
    portalOpening: [
      { speaker: "Lily", text: "The wall inside the ring is gone." },
      { speaker: "Mark", text: "The floor is going with it." }
    ],
    wireUsed: { speaker: "Mark", text: "The spark plug wire holds the dial's brass contact against the ring." }
  },

  cosmos: {
    ending: [
      { speaker: "Lily", text: "Mark." },
      { speaker: "Mark", text: "I know." },
      { speaker: "Lily", text: "There is no down." },
      { speaker: "Mark", text: "Then don't let go." }
    ],
    returnLine: { speaker: "Mark", text: "There is no down." }
  }
};
