const strings = document.querySelectorAll('.slider');

strings.forEach(string => {
    string.addEventListener('input', function() {
        const note = this.parentElement.querySelector('.tuning-note').innerText;
        const frequency = 440 * Math.pow(2, (this.value - 50) / 12);
        console.log(`Tuning ${note} - Frequency: ${frequency.toFixed(2)} Hz`);
        // You can add logic here to play the corresponding note or provide visual feedback
    });
});
