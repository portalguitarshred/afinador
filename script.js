let isPlaying = false;
let timer;

function playClick() {
  const click = new Audio('click.mp3');
  click.play();
}

function startStop() {
  const tempo = document.getElementById('tempo').value;
  
  if (tempo > 0) {
    if (!isPlaying) {
      timer = setInterval(playClick, 60000 / tempo);
      document.getElementById('startStop').innerText = 'Parar';
      isPlaying = true;
    } else {
      clearInterval(timer);
      document.getElementById('startStop').innerText = 'Iniciar';
      isPlaying = false;
    }
  } else {
    alert('Digite um valor válido para o BPM.');
  }
}

document.getElementById('startStop').addEventListener('click', startStop);
