const secretWord = "sorte";
const feedbackDiv = document.getElementById("feedback");
const winMessage = document.getElementById("win-message");
const themeToggle = document.getElementById("theme-toggle");

window.onload = function () {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.body.classList.add("dark");
    updateThemeButton(true);
  } else {
    updateThemeButton(false);
  }
};

function toggleTheme() {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateThemeButton(isDark);
}

function updateThemeButton(isDark) {
  themeToggle.textContent = isDark ? "🌞 Modo Claro" : "🌙 Modo Escuro";
}

function checkGuess() {
  const guessInput = document.getElementById("guess");
  const guess = guessInput.value.toLowerCase();

  if (guess.length !== 5) {
    alert("A palavra deve ter 5 letras.");
    return;
  }

  const row = document.createElement("div");

  for (let i = 0; i < 5; i++) {
    const letterDiv = document.createElement("div");
    letterDiv.classList.add("letter");
    letterDiv.textContent = guess[i];

    if (guess[i] === secretWord[i]) {
      letterDiv.classList.add("correct");
    } else if (secretWord.includes(guess[i])) {
      letterDiv.classList.add("present");
    } else {
      letterDiv.classList.add("wrong");
    }

    row.appendChild(letterDiv);
  }

  feedbackDiv.appendChild(row);
  guessInput.value = "";

  if (guess === secretWord) {
    winMessage.textContent = "🎉 Parabéns! Você acertou a palavra!";
    guessInput.disabled = true;
    confettiCelebration();
  }
}

function resetGame() {
  document.getElementById("guess").value = "";
  document.getElementById("guess").disabled = false;
  feedbackDiv.innerHTML = "";
  winMessage.textContent = "";
}

function confettiCelebration() {
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 }
  });
}
