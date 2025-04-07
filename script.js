 let msg = new SpeechSynthesisUtterance();
    let voices = [];
    const voicesDropdown = document.querySelector('[name="voice"]');
    const options = document.querySelectorAll('[type="range"], [name="text"]');
    const speakButton = document.querySelector('#speak');
    const stopButton = document.querySelector('#stop');

    function populateVoices() {
      voices = window.speechSynthesis.getVoices();
      voicesDropdown.innerHTML = voices
        .map(voice => <option value="${voice.name}">${voice.name} (${voice.lang})</option>)
        .join('');
    }

    function setVoice() {
      msg.voice = voices.find(voice => voice.name === this.value);
    }

    function setOption() {
      msg[this.name] = this.value;
    }

    function speakText() {
      window.speechSynthesis.cancel();
      msg.text = document.querySelector('[name="text"]').value;
      window.speechSynthesis.speak(msg);
    }

    function stopText() {
      window.speechSynthesis.cancel();
    }

    window.speechSynthesis.addEventListener('voiceschanged', populateVoices);
    voicesDropdown.addEventListener('change', setVoice);
    options.forEach(option => option.addEventListener('change', setOption));
    speakButton.addEventListener('click', speakText);
    stopButton.addEventListener('click', stopText);

    populateVoices();