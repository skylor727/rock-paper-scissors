/*----- constants -----*/
const playerCpu = {
  player: "1",
  cpu: "0",
  pWins: 0,
  cWins: 0,
  ties: 0,
};

const choices = {
  R: { imgPath: "css/imgs/rock.png", beats: "S" },
  P: { imgPath: "css/imgs/paper.png", beats: "R" },
  S: { imgPath: "css/imgs/scissors.png", beats: "P" },
};

/*----- cached element references -----*/
const imgEls = document.querySelectorAll(".img-container > img");
const scoreEls = document.querySelectorAll(".score");

/*----- event listeners -----*/
document
  .querySelector(".button-container")
  .addEventListener("click", handleChoice);
/*----- functions -----*/


async function handleChoice(evt) {
  const target = evt.target.innerHTML;
  if (target === "R" || target === "P" || target === "S") {
    imgEls.forEach((el) => el.classList.remove("img-border"));
    await playSound();
    playerCpu.player = evt.target.innerHTML;
    playerCpu.cpu = "RPS".charAt(Math.floor(Math.random() * 3));
    renderImage();
    compareChoice(playerCpu.player, playerCpu.cpu);
  }
}

 function renderImage() {
  imgEls[0].src = `${choices[playerCpu.player].imgPath}`;
  imgEls[1].src = `${choices[playerCpu.cpu].imgPath}`;
}

function compareChoice(pChoice, cChoice) {
  if (choices[pChoice].beats === cChoice) {
    imgEls[0].classList.add("img-border");
    playerCpu.pWins++;
    scoreEls[0].innerHTML = playerCpu.pWins;
  } else if (choices[cChoice].beats === pChoice) {
    imgEls[1].classList.add("img-border");
    playerCpu.cWins++;
    scoreEls[2].innerHTML = playerCpu.cWins;
  } else
  playerCpu.ties++;
  scoreEls[1].innerHTML = playerCpu.ties;
}

 function playSound() {
  const audio = new Audio("sounds/countdown.wav");
  audio.volume = 0.1;
  audio.play();
  return sleep(3000);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
