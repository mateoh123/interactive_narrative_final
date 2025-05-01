let currentScene = startScene;
let timerStarted = false;
let audioStarted = false;

//ITEM KEYS//
var key = false;
var ladder = false;
var pot = false;

//ROOM ITEMS MASTER SECTION//
const displayElement = document.getElementById("myArrayDisplay");
const livingroomItems = ["Picture of Max", "Urn", "Reading Glasses"];
const diningroomItems = ["Turtles", "Picture of Aunt"];
const kitchenItems = ["Pot", "Jellybeans"];
const hallwayItems = [
  "Family Portrait",
  "College Diploma",
  "Important Documents",
];
const bathroomItems = ["Hair Dryer", "Toothbrush", "Moms Ring"];
const momsroomItems = ["Ladder", "Graduation Tassels", "Sunglasses"];
const yourbedroomItems = ["Pictures of Friends", "Plushie from Ex", "Key"];

//ROOM MOVEMENT RESPONSES MASTER SECTION//
const livingroomCommands = [
  "enter the living room",
  "enter living room",
  "living room",
];
const diningroomCommands = [
  "enter the dining room",
  "enter dining room",
  "dining room",
];
const kitchenCommands = ["enter the kitchen", "enter kitchen", "kitchen"];
const hallwayCommands = ["enter the hallway", "enter hallway", "hallway"];
const bathroomCommands = ["enter the bathroom", "enter bathroom", "bathroom"];
const momsroomCommands = ["enter moms room", "moms room"];
const myroomCommands = ["enter my room", "my room"];

//ITEM GRABBING RESPONSES MASTER SECTION//
const maxpictureCommands = [
  "grab picture of max",
  "take picture of max",
  "picture of max",
];

const urnCommands = ["grab urn", "take urn", "urn"];
const readingglassesCommands = [
  "grab reading glasses",
  "take reading glasses",
  "reading glasses",
];
const turtlesCommands = ["grab turtles", "take turtles", "turtles"];
const auntpictureCommands = [
  "grab picture of aunt",
  "take picture of aunt",
  "picture of aunt",
];
const potCommands = ["grab pot", "take pot", "pot"];
const jellybeansCommands = ["grab jellybeans", "take jellybeans", "jellybeans"];
const familypictureCommands = [
  "grab family portrait",
  "take family portrait",
  "family portrait",
];
const collegediplomaCommands = [
  "grab college diploma",
  "take college diploma",
  "college diploma",
];
const documentsCommands = [
  "grab important documents",
  "take important documents",
  "important documents",
];
const hairdryerCommands = ["grab hair dryer", "take hair dryer", "hair dryer"];
const toothbrushCommands = ["grab toothbrush", "take toothbrush", "toothbrush"];
const ringCommands = ["grab moms ring", "take moms ring", "moms ring"];
const ladderCommands = ["grab ladder", "take ladder", "ladder"];
const graduationtasselsCommands = [
  "grab graduation tassels",
  "take graduation tassels",
  "graduation tassels",
];
const glassesCommands = ["grab sunglasses", "take sunglasses", "sunglasses"];
const shoesCommands = ["grab shoes", "take shoes", "shoes"];
const friendpictureCommands = [
  "grab pictures of friends",
  "take pictures of friends",
  "pictures of friends",
];
const explushieCommands = [
  "grab plushie from ex",
  "take plushie from ex",
  "plushie from ex",
];
const clothesCommands = ["grab clothes", "take clothes", "clothes"];
const keyCommands = ["grab key", "take key", "key"];

function updateGame(location, story, moves, arrayItem) {
  document.getElementById("locationText").textContent = location;
  document.getElementById("story").innerHTML = story;
  document.getElementById("movementText").innerHTML = moves;
  document.getElementById("theArray").innerHTML = arrayItem;
  document.getElementById("commandInput").value = "";
}

function startSixtySecondTimer() {
  if (timerStarted) return;

  timerStarted = true;
  let timeLeft = 60;
  const timerElement = document.getElementById("timer");

  timerElement.textContent = timeLeft;

  const countdown = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    updateBackgroundColor(timeLeft);

    if (timeLeft <= 0) {
      window.location.href = "why_care.html";
      loopAudio.pause();
      loopAudio.currentTime = 0;
      clearInterval(countdown);
      timerElement.textContent = "";
    }
  }, 1000);
}

function updateBackgroundColor(timeLeft) {
  const progress = (60 - timeLeft) / 60;

  const r = Math.round(progress * 255);
  const g = 0;
  const b = 0;

  document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

function reactionQuips(quipText) {
  document.getElementById("quip").innerHTML = quipText;
}

function processCommand() {
  const input = document
    .getElementById("commandInput")
    .value.trim()
    .toLowerCase();
  currentScene(input);

  if (!audioStarted) {
    const audio = document.getElementById("firesound");
    audio.play();
    audioStarted = true;
  }
}

function startScene(command) {
  if (!command) {
    updateGame(
      "Outside",
      `Was dodging all those police blockades really worth this?<br />
      My house stands in front of you, a raging fire threatening to engulf it.`,
      "Should I <strong>enter house</strong>, or <strong>drive away</strong>?",
      "nothing im outside!"
    );
    return;
  }

  //Movement Commands//

  if (command === "enter house") {
    currentScene = livingRoomScene;
    currentScene("");
  } else if (command === "drive away") {
    window.location.href = "why_care.html";
  } else {
    alert("Try typing: 'enter house' or 'drive away'");
  }
}

function livingRoomScene(command) {
  if (!command) {
    updateGame(
      "Living Room",
      "Smoke is seeping through the cracks. My living room looks ransacked. Probably from my mom escpaing in such a hurry. <br />I only have 60 seconds before this smoke fills the house.",
      "Should I <strong>enter the dining room</strong> or <strong>enter the hallway</strong>?",
      (document.getElementById("theArray").innerText =
        livingroomItems.join(", "))
    );
    reactionQuips("");
    if (!timerStarted) {
      document.getElementById("timer").innerHTML = "60";
      startSixtySecondTimer();
    }
    return;
  }
  //ITEM COMMANDS//
  if (maxpictureCommands.includes(command)) {
    reactionQuips(
      "I'll take the picture of my dog Max. I cant leave his memory behind"
    );
    index = livingroomItems.indexOf("Picture of Max");
    removeItem = livingroomItems.splice(index, 1);
    document.getElementById("theArray").innerText = livingroomItems.join(", ");
    document.getElementById("commandInput").value = "";
  } else if (urnCommands.includes(command) && ladder) {
    reactionQuips("I'll take Max's Urn. I cant let him burn again.");
    index = livingroomItems.indexOf("Urn");
    removeItem = livingroomItems.splice(index, 1);
    document.getElementById("theArray").innerText = livingroomItems.join(", ");
    document.getElementById("commandInput").value = "";
  } else if (urnCommands.includes(command) && !ladder) {
    reactionQuips(
      "I cant reach Max's Urn. Im gonna need something to get higher"
    );
    document.getElementById("commandInput").value = "";
  } else if (readingglassesCommands.includes(command)) {
    reactionQuips(
      "I'll take my moms reading glasses. She may need them later."
    );
    index = livingroomItems.indexOf("Reading Glasses");
    removeItem = livingroomItems.splice(index, 1);
    document.getElementById("theArray").innerText = livingroomItems.join(", ");
    document.getElementById("commandInput").value = "";
    //MOVEMENT COMMANDS
  } else if (diningroomCommands.includes(command)) {
    currentScene = diningRoom;
    currentScene("");
  } else if (hallwayCommands.includes(command)) {
    currentScene = hallRoom;
    currentScene("");
  } else {
    alert("I dont think I can do that here!");
  }
}

function diningRoom(command) {
  if (!command) {
    updateGame(
      "Dining Room",
      "The dining room sits untouched, we barely use it. Most of my meals are eaten on the couch or in my room. The turtles sink in their tank, oblivious to the destruction raging outside. The beautiful mountains I used to wake up to every morning, are burning right in front of me.",
      "Should I <strong>enter the living room</strong> or <strong>enter the kitchen</strong>?",
      (document.getElementById("theArray").innerText =
        diningroomItems.join(", "))
    );
    reactionQuips("");
    return;
  }

  //ITEM COMMANDS//
  if (turtlesCommands.includes(command) && pot) {
    reactionQuips("I put my turtles in the pot. I can take them with me now");
    index = diningroomItems.indexOf("Turtles");
    removeItem = diningroomItems.splice(index, 1);
    document.getElementById("theArray").innerText = diningroomItems.join(", ");
    document.getElementById("commandInput").value = "";
  } else if (turtlesCommands.includes(command) && !pot) {
    reactionQuips(
      "I cant just carry the turtles without something to put them in!"
    );
    document.getElementById("commandInput").value = "";
  } else if (auntpictureCommands.includes(command)) {
    reactionQuips(
      "My favorite aunt...she may be dead but doesnt mean her picture has to be."
    );
    index = diningroomItems.indexOf("Picture of Aunt");
    removeItem = diningroomItems.splice(index, 1);
    document.getElementById("theArray").innerText = diningroomItems.join(", ");
    document.getElementById("commandInput").value = "";
  }
  //MOVEMENT COMMANDS//
  else if (livingroomCommands.includes(command)) {
    currentScene = livingRoomScene;
    currentScene("");
  } else if (kitchenCommands.includes(command)) {
    currentScene = kitchenScene;
    currentScene("");
  } else if (command) {
    alert("I dont think I can do that here!");
  }
}

function kitchenScene(command) {
  if (!command) {
    updateGame(
      "Kitchen",
      "My mom left the dishes in the sink, and her breakfast on the counter. It would probably be pointless to take all the food. There is a pot on the stove though, that could be useful.",
      "Should I <strong>enter the dining room</strong>?",
      (document.getElementById("theArray").innerText = kitchenItems.join(", "))
    );
    reactionQuips("");
    return;
  }
  if (potCommands.includes(command)) {
    reactionQuips("This metal pot could be useful for something");
    pot = true;
    index = kitchenItems.indexOf("Pot");
    removeItem = kitchenItems.splice(index, 1);
    document.getElementById("theArray").innerText = kitchenItems.join(", ");
    document.getElementById("commandInput").value = "";
  } else if (jellybeansCommands.includes(command)) {
    reactionQuips("Just in case I get hungry, I have someting to eat.");
    index = kitchenItems.indexOf("Jellybeans");
    removeItem = kitchenItems.splice(index, 1);
    document.getElementById("theArray").innerText = kitchenItems.join(", ");
    document.getElementById("commandInput").value = "";
  }
  //MOVEMENT COMMANDS//
  else if (diningroomCommands.includes(command)) {
    currentScene = diningRoom;
    currentScene("");
  } else if (command) {
    alert("I dont think I can do that here!");
  }
}

function hallRoom(command) {
  if (!command) {
    updateGame(
      "Hallway",
      "My hallway is filled top to bottoms of family pictures, paintings and diplomas<br>You don't even need to be family to end up on this wall. <br>Some of the pictures seem to of been torn off the wall. I wonder if my mom took them with her?",
      "Should I <strong>enter the living room</strong>, <strong>enter the bathroom</strong>, <strong>enter moms room</strong>, or <strong>enter my room</strong>?",
      (document.getElementById("theArray").innerText = hallwayItems.join(", "))
    );
    reactionQuips("");
    return;
  }

  //ITEM COMMANDS//
  if (familypictureCommands.includes(command)) {
    reactionQuips(
      "I cant leave this behind. Its rare mom, my sister and I are in the same room."
    );
    index = hallwayItems.indexOf("Family Portrait");
    removeItem = hallwayItems.splice(index, 1);
    document.getElementById("theArray").innerText = hallwayItems.join(", ");
    document.getElementById("commandInput").value = "";
  } else if (collegediplomaCommands.includes(command)) {
    reactionQuips(
      "My sisters high school diploma. I wonder if she'd care if it burned..."
    );
    index = hallwayItems.indexOf("College Diploma");
    removeItem = hallwayItems.splice(index, 1);
    document.getElementById("theArray").innerText = hallwayItems.join(", ");
    document.getElementById("commandInput").value = "";
  } else if (documentsCommands.includes(command) && key) {
    reactionQuips(
      "I'll need my SSN Card for sure, glad I found the key in time!"
    );
    index = hallwayItems.indexOf("Important Documents");
    removeItem = hallwayItems.splice(index, 1);
    document.getElementById("theArray").innerText = hallwayItems.join(", ");
    document.getElementById("commandInput").value = "";
  } else if (documentsCommands.includes(command) && !key) {
    reactionQuips("I cant get to these without the key! Where did I put it?");
    document.getElementById("commandInput").value = "";
  }
  //MOVEMENT COMMANDS//
  else if (livingroomCommands.includes(command)) {
    currentScene = livingRoomScene;
    currentScene("");
  } else if (bathroomCommands.includes(command)) {
    currentScene = bathroomScene;
    currentScene("");
  } else if (momsroomCommands.includes(command)) {
    currentScene = momsroomScene;
    currentScene("");
  } else if (myroomCommands.includes(command)) {
    currentScene = myroomScene;
    currentScene("");
  } else if (command) {
    alert("I dont think I can do that here!");
  }
}

function bathroomScene(command) {
  if (!command) {
    updateGame(
      "Bathroom",
      "My already tiny bathroom, feels almost claustrophobic with the amount of smoke filling up the tiny room.<br /> The tiny window, id always open to let in fresh air is wafting the smell of smoke everywhere. <br /> I cant bare to look at myself in mirror right now, this is all too much.",
      "Should I <strong>enter the hallway</strong>?",
      (document.getElementById("theArray").innerText = bathroomItems.join(", "))
    );
    reactionQuips("");
    return;
  }
  //ITEM COMMANDS//
  if (hairdryerCommands.includes(command)) {
    reactionQuips(
      "Will I even need this, its so hot my hair is drying itself."
    );
    index = bathroomItems.indexOf("Hair Dryer");
    removeItem = bathroomItems.splice(index, 1);
    document.getElementById("theArray").innerText = bathroomItems.join(", ");
    document.getElementById("commandInput").value = "";
  } else if (toothbrushCommands.includes(command)) {
    reactionQuips("My favorite toothbrush, will my mouth smell like ash now?");
    index = bathroomItems.indexOf("Toothbrush");
    removeItem = bathroomItems.splice(index, 1);
    document.getElementById("theArray").innerText = bathroomItems.join(", ");
    document.getElementById("commandInput").value = "";
  } else if (ringCommands.includes(command)) {
    reactionQuips("My mom will be so happy I saved her ring.");
    index = bathroomItems.indexOf("Moms Ring");
    removeItem = bathroomItems.splice(index, 1);
    document.getElementById("theArray").innerText = bathroomItems.join(", ");
    document.getElementById("commandInput").value = "";
  }
  //MOVEMENT COMMANDS
  else if (hallwayCommands.includes(command)) {
    currentScene = hallRoom;
    currentScene("");
  } else if (command) {
    alert("I dont think I can do that here!");
  }
}

function momsroomScene(command) {
  if (!command) {
    updateGame(
      "Moms Room",
      "She has so many things in this room, mannequin stand, wooden vanity, jewerly top to bottom. What isnt flammable? <br />The gold looks tarnished under this lighting, everything is going to reek of smoke if it survives.",
      "Should I <strong>enter the hallway</strong>?",
      (document.getElementById("theArray").innerText = momsroomItems.join(", "))
    );
    reactionQuips("");
    return;
  }

  //ITEM COMMANDS//
  if (ladderCommands.includes(command)) {
    reactionQuips("Moms tiny ladder. This could be useful!");
    index = momsroomItems.indexOf("Ladder");
    removeItem = momsroomItems.splice(index, 1);
    document.getElementById("theArray").innerText = momsroomItems.join(", ");
    document.getElementById("commandInput").value = "";
    ladder = true;
  } else if (graduationtasselsCommands.includes(command)) {
    reactionQuips(
      "Mom has these on display on her mannequin, she'll want to keep these"
    );
    index = momsroomItems.indexOf("Graduation Tassels");
    removeItem = momsroomItems.splice(index, 1);
    document.getElementById("theArray").innerText = momsroomItems.join(", ");
    document.getElementById("commandInput").value = "";
  } else if (glassesCommands.includes(command)) {
    reactionQuips(
      "Mom's huge rack of sunglasses is so daunting. I cant take them all, I just take the least ugly ones."
    );
    index = momsroomItems.indexOf("Sunglasses");
    removeItem = momsroomItems.splice(index, 1);
    document.getElementById("theArray").innerText = momsroomItems.join(", ");
    document.getElementById("commandInput").value = "";
  }
  //MOVEMENT COMMANDS//
  else if (hallwayCommands.includes(command)) {
    currentScene = hallRoom;
    currentScene("");
  } else if (command) {
    alert("I dont think I can do that here!");
  }
}

function myroomScene(command) {
  if (!command) {
    updateGame(
      "My Room",
      "My absurdly bright curtains, look much better in this light. Im definetly not taking those with me.<br/> My old theater shirts, Madison and I's polariod photo, even my PS5, I cant take it all.",
      "Should I <strong>enter the hallway</strong>?",
      (document.getElementById("theArray").innerText =
        yourbedroomItems.join(", "))
    );
    reactionQuips("");
    return;
  }

  //ITEM COMMANDS//
  if (friendpictureCommands.includes(command)) {
    reactionQuips(
      "Madison and I, My Dog, My favorite flower. These are all photos worth keeping."
    );
    index = yourbedroomItems.indexOf("Pictures of Friends");
    removeItem = yourbedroomItems.splice(index, 1);
    document.getElementById("theArray").innerText = yourbedroomItems.join(", ");
    document.getElementById("commandInput").value = "";
  } else if (explushieCommands.includes(command)) {
    reactionQuips("I guess I'll take this. He has his fathers eyes...");
    index = yourbedroomItems.indexOf("Plushie from Ex");
    removeItem = yourbedroomItems.splice(index, 1);
    document.getElementById("theArray").innerText = yourbedroomItems.join(", ");
    document.getElementById("commandInput").value = "";
  } else if (keyCommands.includes(command)) {
    reactionQuips("A key! I could use this for something.");
    index = yourbedroomItems.indexOf("Key");
    removeItem = yourbedroomItems.splice(index, 1);
    document.getElementById("theArray").innerText = yourbedroomItems.join(", ");
    document.getElementById("commandInput").value = "";
    key = true;
  }
  //MOVEMENT COMMANDS//
  else if (hallwayCommands.includes(command)) {
    currentScene = hallRoom;
    currentScene("");
  } else if (command) {
    alert("I dont think I can do that here!");
  }
}

startScene("");
