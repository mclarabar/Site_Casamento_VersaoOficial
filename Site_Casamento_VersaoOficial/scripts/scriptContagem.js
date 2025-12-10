/*SCRIPT DO DIA/HORA/MINUTOS/SEGUNDOS */
const dataFinal = new Date("2026-01-10T00:00:00");

function atualizarContagem() {
  const agora = new Date();
  const diferenca = dataFinal - agora;

  if (diferenca <= 0) {
    document.querySelector(".contador").innerHTML = "<h3>Tempo Esgotado!</h3>";
    clearInterval(intervalo);
    return;
  }

  const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferenca / (1000 * 60)) % 60);
  const segundos = Math.floor((diferenca / 1000) % 60);

  document.getElementById("dias").textContent = dias.toString().padStart(2, "0");
  document.getElementById("horas").textContent = horas.toString().padStart(2, "0");
  document.getElementById("minutos").textContent = minutos.toString().padStart(2, "0");
  document.getElementById("segundos").textContent = segundos.toString().padStart(2, "0");
}

const intervalo = setInterval(atualizarContagem, 1000);
atualizarContagem();

