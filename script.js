let isPlaying = false;
let timer;

function playClick() {
  const click = new Audio('click.wav');
  click.play();
}

function startStop() {
  const tempo = document.getElementById('tempo').value;
  const timeSignature = document.getElementById('timeSignature').value;
  
  if (tempo > 0) {
    if (!isPlaying) {
      const [beatsPerMeasure, beatValue] = timeSignature.split('/');
      const interval = 60000 / tempo;

      timer = setInterval(() => {
        playClick();
      }, interval);

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
