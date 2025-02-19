let jogadorAtual = "X";
let tabuleiro = ["", "", "", "", "", "", "", "", ""];
const mensagem = document.querySelector(".message");
const resultado = document.querySelector("#resultado");
const celulas = document.querySelectorAll(".celula");

function criarConfetes() {
    for (let i = 0; i < 150; i++) {
        const confete = document.createElement("div");
        confete.classList.add("confete");
        confete.style.left = Math.random() * 100 + "vw";
        confete.style.top = -10 + "px";
        confete.style.width = Math.random() * 10 + 5 + "px";
        confete.style.height = Math.random() * 15 + 5 + "px";
        confete.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confete.style.animationDuration = (Math.random() * 3 + 2) + "s";
        document.body.appendChild(confete);
        setTimeout(() => confete.remove(), 4000);
    }
}

function verificarVencedor() {
    const combinacoesVencedoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];
    for (let combo of combinacoesVencedoras) {
        const [a, b, c] = combo;
        if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
            setTimeout(() => {
                resultado.textContent = `Jogador ${tabuleiro[a]} venceu!`;
                criarConfetes();
                setTimeout(reiniciarJogo, 4000);
            }, 300);
            return;
        }
    }
    if (!tabuleiro.includes("")) {
        setTimeout(() => {
            resultado.textContent = "Deu velha!";
            setTimeout(reiniciarJogo, 3000);
        }, 300);
    }
}

function lidarComClique(event) {
    const index = event.target.getAttribute("data-index");
    if (tabuleiro[index] === "") {
        tabuleiro[index] = jogadorAtual;
        event.target.textContent = jogadorAtual;
        event.target.classList.add("taken");
        setTimeout(() => {
            verificarVencedor();
            jogadorAtual = jogadorAtual === "X" ? "O" : "X";
            mensagem.textContent = `Vez do jogador: ${jogadorAtual}`;
        }, 100);
    }
}

function reiniciarJogo() {
    tabuleiro.fill("", 0, 9);
    celulas.forEach(celula => {
        celula.textContent = "";
        celula.classList.remove("taken");
    });
    resultado.textContent = "";
    jogadorAtual = "X";
    mensagem.textContent = `Vez do jogador: X`;
}

celulas.forEach(celula => {
    celula.addEventListener("click", lidarComClique);
});
