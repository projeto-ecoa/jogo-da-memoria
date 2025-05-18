const audio = document.getElementById('musica-jogo');


const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const icones = [
    'Mesotriona',
    'Acetocloro',
    'Azoxistrobina',
    'Bifentrina',
    'Dicamba',
    'Epoxiconazol',
    'Flufenaceto',
    'Fluxapiroxade',
    'Mesosulfuron',
    'Tebuconazol',
    'Protioconazol',
    'Sulfentrazona',
];


const createElement = (tag, className) => {
    const elemento = document.createElement(tag);
    elemento.className = className;
    return elemento;
  };

let primeiraCarta = '';
let segundaCarta = '';

const endGame = () => {
    const cartasDsabilitadas = document.querySelectorAll('.desabilitador-da-carta');
  
    if (cartasDsabilitadas.length === 24) {
      clearInterval(this.loop);
      document.getElementById('modalPlayer').textContent = spanPlayer.innerHTML;
      document.getElementById('modalTime').textContent = timer.innerHTML;
      document.getElementById('modal-vitória').style.display = 'flex';    
    }
  };

  function closeModal() {
    document.getElementById('modal-vitória').style.display = 'none';
    // Recarrega o jogo ou redireciona, se quiser
    location.reload();
  }
  
  const checkCards = () => {
    const primeiroIcone = primeiraCarta.getAttribute('data-icone');
    const segundoIcone = segundaCarta.getAttribute('data-icone');
  
    if (primeiroIcone === segundoIcone) {
  
      primeiraCarta.firstChild.classList.add('desabilitador-da-carta');
      segundaCarta.firstChild.classList.add('desabilitador-da-carta');
  
      primeiraCarta = '';
      segundaCarta = '';
  
      endGame();
  
    } else {
      setTimeout(() => {
  
        primeiraCarta.classList.remove('revelar-carta');
        segundaCarta.classList.remove('revelar-carta');
  
        primeiraCarta = '';
        segundaCarta = '';
    
      }, 500);
    }
  
  };


  const revealCard = ({ target }) => {

    if (target.parentNode.className.includes('revelar-carta')) {
      return;
    }
  
    if (primeiraCarta === '') {
  
      target.parentNode.classList.add('revelar-carta');
      primeiraCarta = target.parentNode;
  
    } else if (segundaCarta === '') {
  
      target.parentNode.classList.add('revelar-carta');
      segundaCarta = target.parentNode;
  
      checkCards();
  
    }
  };
    const createCard = (icone) => {

    const card = createElement('div', 'card');
    const frente = createElement('div', 'face frente');
    const fundo = createElement('div', 'face fundo');
  
    frente.style.backgroundImage = `url('../Ícones/${icone}.png')`;
  
    card.appendChild(frente);
    card.appendChild(fundo);
  
    card.setAttribute('data-icone', icone);
    card.addEventListener('click', revealCard);
  
    return card;
  };


  const loadGame = () => {
    const duplicadorDeCartas = [...icones, ...icones];
  
    const embaralhar = duplicadorDeCartas.sort(() => Math.random() - 0.5);
  
    embaralhar.forEach((icone) => {
      const card = createCard(icone);
      grid.appendChild(card);
    });
  };

  const startTimer = () => {

    this.loop = setInterval(() => {
      const currentTime = +timer.innerHTML;
      timer.innerHTML = currentTime + 1;
    }, 1000);
  
  }



  function vitoria() {
    const modal = document.getElementById('modal-vitoria');
    modal.style.display = 'flex';
    const som = document.getElementById('som-vitoria');
    som.play();
}

document.getElementById('jogar-novamente').addEventListener('click', () => {
    document.getElementById('modal-vitoria').style.display = 'none';
    criarTabuleiro();
});
  
  window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();
    audio.play();
  }
