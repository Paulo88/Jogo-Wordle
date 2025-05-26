const palavras = ["livro", "piano", "tigre", "verde", "nuvem", "cobra", "carta", "janela", "banco", "festa"];
let palavraSecreta = "";
let tentativas = 0;
let dicaAtual = "";

const input = document.getElementById("guess");
const feedback = document.getElementById("feedback");
const mensagemVitoria = document.getElementById("win-message");
const dicaEl = document.getElementById("hint-message");

// Escolhe uma palavra aleatória e gera a dica da letra revelada
function escolherPalavraAleatoria() {
  palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)].toLowerCase();
  dicaAtual = gerarDica(palavraSecreta);
}

// Gera dica com letra revelada aleatória da palavra secreta
function gerarDica(palavra) {
  return `Contém a letra: ${palavra[Math.floor(Math.random() * palavra.length)].toUpperCase()}`;
}

// Atualiza o texto da dica na interface
function atualizarDica() {
  dicaAtual = gerarDica(palavraSecreta);
  dicaEl.textContent = `💡 Dica: ${dicaAtual}`;
}

// Verifica a tentativa do jogador e mostra resultado
function checkGuess() {
  const tentativa = input.value.toLowerCase();
  if (tentativa.length !== 5) {
    alert("Digite uma palavra com exatamente 5 letras.");
    return;
  }

  const resultado = document.createElement("div");
  resultado.classList.add("resultado-linha");

  for (let i = 0; i < 5; i++) {
    const letra = document.createElement("span");
    letra.classList.add("letter");
    letra.textContent = tentativa[i].toUpperCase();

    if (tentativa[i] === palavraSecreta[i]) {
      letra.classList.add("correct");
    } else if (palavraSecreta.includes(tentativa[i])) {
      letra.classList.add("present");
    } else {
      letra.classList.add("wrong");
    }
    resultado.appendChild(letra);
  }

  // Adiciona abaixo do que já existe (mantém histórico)
  feedback.appendChild(resultado);

  tentativas++;

  if (tentativa === palavraSecreta) {
    finalizarVitoria();
  } else {
    input.value = "";
    input.focus();
  }
}


// Exibe mensagem de vitória e animação
function finalizarVitoria() {
  mensagemVitoria.textContent = `🎉 Você acertou em ${tentativas} tentativa(s)!`;
  confetti();
}

// Reseta o jogo para uma nova rodada
function resetGame() {
  tentativas = 0;
  mensagemVitoria.textContent = "";
  feedback.innerHTML = "";
  input.value = "";
  escolherPalavraAleatoria();
  //atualizarDica(); // isso mostra a dica imediatamente
  dicaEl.textContent = ""; // limpa a dica!
  input.focus();
}

// Alterna visibilidade do modal de instruções
function toggleHowToPlay() {
  const modal = document.getElementById("how-to-play-modal");
  modal.classList.toggle("hidden");
}

// Inicializa o jogo
resetGame();

function abrirComoJogar() {
  const modal = document.getElementById("modal-como-jogar");
  if (modal.style.display === "block") {
    modal.style.display = "none";
  } else {
    modal.style.display = "block";
  }
}

function fecharModal() {
  document.getElementById("modal-como-jogar").style.display = "none";
}

// Adiciona suporte à tecla Enter para submeter a tentativa
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    checkGuess();
  }
});
