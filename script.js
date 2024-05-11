const strings = document.querySelectorAll('.slider');
const playButtons = document.querySelectorAll('.play-note');
const audio = document.getElementById('audio');

const notes = {
    'E': 329.63,
    // Adicione as frequências para as outras notas
};

strings.forEach((string, index) => {
    string.addEventListener('input', function() {
        const note = this.parentElement.querySelector('.tuning-note').innerText;
        const frequency = 440 * Math.pow(2, (this.value - 50) / 12);
        console.log(`Tuning ${note} - Frequency: ${frequency.toFixed(2)} Hz`);
        
        // Calculate difference in cents
        const diffCents = 1200 * Math.log2(frequency / notes[note]);
        
        // Update UI
        if (Math.abs(diffCents) <= 10) {
            this.style.backgroundColor = '#66ff66'; // Green
        } else {
            this.style.backgroundColor = '#ddd'; // Default color
        }
    });

    playButtons[index].addEventListener('click', function() {
        const note = this.parentElement.querySelector('.tuning-note').innerText;
        const oscillator = audio.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.value = notes[note];
        oscillator.connect(audio.destination);
        oscillator.start();
        setTimeout(() => {
            oscillator.stop();
        }, 500); // Stop playing after 0.5 seconds
    });
});
