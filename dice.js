const dice1 = document.getElementById('dice1');
const dice2 = document.getElementById('dice2');
const audio = document.getElementById('audio');
const dice1Result = document.getElementById('dice1Result');
const dice2Result = document.getElementById('dice2Result');
const sumResult = document.getElementById('sumResult');
const betResult = document.getElementById('betResult');
const creditsDisplay = document.getElementById('credits');
const betAmountInput = document.getElementById('betAmount');
const betNumberInput = document.getElementById('betNumber');
const rollButton = document.querySelector('.btn');

let credits = 10000;
creditsDisplay.textContent = credits;

if (navigator.maxTouchPoints > 0) {
  document.addEventListener('touchstart', (event) => {
    event.stopPropagation();
    roll();
  });
}

rollButton.addEventListener('click', (event) => {
  event.stopPropagation();
  roll();
});

function roll() {

  const betAmount = parseInt(betAmountInput.value);
  const betNumber = parseInt(betNumberInput.value);

  if (isNaN(betAmount) || betAmount <= 0 || betAmount > credits) {
    betResult.textContent = 'Invalid bet amount!';
    betResult.className = 'lose';
    return;
  }
  if (isNaN(betNumber) || betNumber < 2 || betNumber > 12) {
    betResult.textContent = 'Guess must be between 2 and 12!';
    betResult.className = 'lose';
    return;
  }

  credits -= betAmount;
  creditsDisplay.textContent = credits;

  rollButton.disabled = true;


    audio.play().catch(err => console.error("Audio play failed:", err));
    dice1.classList.add('spin1');
    dice2.classList.add('spin2');
    setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
        const randomNumber1 = Math.floor(Math.random() * 6) + 1;
        const randomNumber2 = Math.floor(Math.random() * 6) + 1;
        dice1.querySelector('.face').className = `face face-${randomNumber1}`;
        dice2.querySelector('.face').className = `face face-${randomNumber2}`;
        const luckyNumber = randomNumber1 + randomNumber2;
        dice1Result.innerText = `Dice 1: ${randomNumber1}`;
        dice2Result.innerText = `Dice 2: ${randomNumber2}`;
        sumResult.innerText = `Your Luck Number is: ${luckyNumber}`;

    if (luckyNumber === betNumber) {
        const winnings = betAmount * 1;
        credits += winnings;
        betResult.textContent = `You win ${winnings} credits!`;
        betResult.className = 'win';
      } else {
        betResult.textContent = 'You lose!';
        betResult.className = 'lose';
      }
      creditsDisplay.textContent = credits;
  
      if (credits <= 0) {
        rollButton.disabled = true;
        betResult.textContent = 'Game Over! You’re out of credits.';
      } else {
        rollButton.disabled = false;
      }
  
      if (navigator.share) {
        navigator.share({
          title: 'Dice Roll Result',
          text: `I rolled a ${luckyNumber}! ${betResult.textContent} 🎲`,
        }).catch(err => console.error("Share failed:", err));
      }

        dice1.classList.remove('spin1');
        dice2.classList.remove('spin2');
    }, 1000);
}
