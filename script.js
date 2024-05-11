window.onload = function() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {
            const source = audioContext.createMediaStreamSource(stream);
            source.connect(analyser);
            tune();
        })
        .catch(function(err) {
            console.error('Erro ao acessar o microfone:', err);
        });

    function tune() {
        requestAnimationFrame(tune);
        analyser.getByteFrequencyData(dataArray);
        
        // Exemplo de lógica para detectar frequência da nota E
        const frequency = getFrequencyFromPitch(dataArray, audioContext.sampleRate);
        const closestNote = getClosestNoteName(frequency);
        const statusElement = document.getElementById('status1');
        statusElement.textContent = `Tuning: ${closestNote}`;
        // Adicione lógica semelhante para as outras cordas
    }

    function getFrequencyFromPitch(dataArray, sampleRate) {
        const peak = Math.max(...dataArray);
        const index = dataArray.indexOf(peak);
        const hertzPerBin = sampleRate / bufferLength;
        return index * hertzPerBin;
    }

    function getClosestNoteName(frequency) {
        // Mapeie frequências para notas musicais
        const notes = {
            'E': 329.63,
            // Adicione as frequências para as outras notas
        };

        let closestNote = '';
        let minDiff = Infinity;
        for (const note in notes) {
            const diff = Math.abs(frequency - notes[note]);
          
