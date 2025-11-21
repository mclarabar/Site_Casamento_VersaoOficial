const button = document.getElementById('playButton');
const audio = document.getElementById('audio');
let isPlaying = false;

// Configurações do áudio
audio.volume = 0.5; // Volume a 50%

// Tentar tocar automaticamente quando a página carrega
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Primeiro tenta tocar mutado (permitido pelos navegadores)
    await audio.play();
    
    // Se conseguir, desmuta gradualmente
    setTimeout(() => {
      audio.muted = false;
      isPlaying = true;
      button.textContent = '🎵 ⏸️';
    }, 1000);
    
  } catch (error) {
    console.log('Autoplay não permitido pelo navegador');
    // Mostrar uma notificação para o usuário clicar no botão
    showAutoplayMessage();
  }
});

// Controle do botão play/pause
button.addEventListener('click', async () => {
  try {
    if (isPlaying) {
      audio.pause();
      button.textContent = '🎵 ▶️';
      isPlaying = false;
    } else {
      // Desmuta e toca
      audio.muted = false;
      await audio.play();
      button.textContent = '🎵 ⏸️';
      isPlaying = true;
    }
  } catch (error) {
    console.log('Erro ao reproduzir áudio:', error);
  }
});

// Quando a música termina
audio.addEventListener('ended', () => {
  button.textContent = '🎵 ▶️';
  isPlaying = false;
});

// Função para mostrar mensagem de autoplay
function showAutoplayMessage() {
  // Criar uma notificação discreta
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    background: rgba(44, 19, 96, 0.9);
    color: white;
    padding: 10px 15px;
    border-radius: 8px;
    font-size: 14px;
    z-index: 1001;
    max-width: 250px;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    cursor: pointer;
  `;
  notification.innerHTML = '🎵 Clique para tocar a música';
  
  document.body.appendChild(notification);
  
  // Remove após 5 segundos ou ao clicar
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 5000);
  
  notification.addEventListener('click', () => {
    button.click();
    notification.remove();
  });
}

// Fallback: tentar tocar na primeira interação do usuário
let hasInteracted = false;
const tryAutoplayOnInteraction = async () => {
  if (!hasInteracted && !isPlaying) {
    hasInteracted = true;
    try {
      audio.muted = false;
      await audio.play();
      isPlaying = true;
      button.textContent = '🎵 ⏸️';
    } catch (error) {
      console.log('Não foi possível iniciar o áudio automaticamente');
    }
  }
};

// Eventos de interação do usuário
['click', 'scroll', 'keydown'].forEach(event => {
  document.addEventListener(event, tryAutoplayOnInteraction, { once: true });
});
