const winnerPoints = 3;
const announcment = document.querySelector(".announcment");
const playerHand = document.querySelector(".playerhand");
const computerHand = document.querySelector(".computerhand");
const playerScore = document.querySelector(".player-score p");
const comScore = document.querySelector(".comp-score p");

const game = () => {
  //arrow function, shortcut
  let pScore = 0;
  let cScore = 0;

  // start the game
  const startGame = () => {
    const playBtn = document.querySelector(".introbutton");
    const introScreen = document.querySelector(".intro");
    const match = document.querySelector(".match");

    playBtn.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      match.classList.add("fadeIn");
    });
  };

  // play a match
  const playMatch = () => {
    const options = document.querySelectorAll(".options button");
    const hands = document.querySelectorAll(".hands img");

    hands.forEach((hand) => {
      hand.addEventListener("animationend", function () {
        this.style.animation = ""; //this refers to each hand
      });
    });

    //computer options
    const comOptions = ["rock", "paper", "scissors"];
    //loops through the options when clicking the button
    options.forEach((option) => {
      option.addEventListener("click", function () {
        // create random number from 0-2
        const comNumber = Math.floor(Math.random() * 3);
        // choose the value from the option choices, matches random number and position
        const comChoice = comOptions[comNumber];
        //call compare

        setTimeout(() => {
          compare(this.textContent, comChoice);

          //update image
          // this refers to the value of the function it is placed in
          playerHand.src = `./assets/${this.textContent}.png`;
          computerHand.src = `./assets/${comChoice}.png`;
        }, 2000);
        //animation of hands
        playerHand.style.animation = "shakePlayer 2s ease";
        computerHand.style.animation = "shakeComputer 2s ease";
      });
    });
  };

  const end = () => {
    const endDiv = document.querySelector(".end");
    const againbtn = document.querySelector(".end button");
    const optbtns = document.querySelector(".options");

    // announce the winner

    if (pScore == winnerPoints) {
      announcment.textContent = "Game is over. You won 🥳";
    } else if (cScore == winnerPoints) {
      announcment.textContent = "Game is over. You lost😔";
    }

    // fading in button
    optbtns.classList.add("fadeOut");
    endDiv.classList.remove("fadeOut");
    document.getElementById("again").style.zIndex = "1";

    // start a new game
    againbtn.addEventListener("click", () => {
      playerScore.textContent = 0;
      comScore.textContent = 0;
      announcment.textContent = "Choose your move";
      endDiv.classList.add("fadeOut");
      optbtns.classList.remove("fadeOut");
      playerHand.src = "./assets/rock.png";
      computerHand.src = "./assets/rock.png";
    });
  };

  const updateScore = () => {
    playerScore.textContent = pScore;
    comScore.textContent = cScore;

    if (pScore == winnerPoints || cScore == winnerPoints) {
      end();
      pScore = 0;
      cScore = 0;
    }
  };

  const compare = (playerChoice, comChoice) => {
    // update text

    if (playerChoice === comChoice) {
      announcment.textContent = "It's a tie!";
      return;
    } else if (playerChoice === "rock") {
      if (comChoice === "scissors") {
        announcment.textContent = "You win 😍";
        pScore++;
        updateScore();
        return;
      } else {
        announcment.textContent = "Computer wins 😪";
        cScore++;
        updateScore();
        return;
      }
    } else if (playerChoice === "paper") {
      if (comChoice === "rock") {
        announcment.textContent = "You win 😍";
        pScore++;
        updateScore();
        return;
      } else {
        announcment.textContent = "Computer wins 😪";
        cScore++;
        updateScore();
        return;
      }
    } else if (playerChoice === "scissors") {
      if (comChoice === "rock") {
        announcment.textContent = "Computer wins 😪";
        cScore++;
        updateScore();
        return;
      } else {
        announcment.textContent = "You win 😍";
        pScore++;
        updateScore();
        return;
      }
    }
  };

  //call all the inner functions
  startGame();
  playMatch();
};
// start the game function
game();
