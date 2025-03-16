// Your script here.
const synth = window.speechSynthesis;
const textInput = document.querySelector("#textInput");
const voiceSelect = document.querySelector("#voiceSelect");
const rateInput = document.querySelector("#rate");
const pitchInput = document.querySelector("#pitch");
const speakButton = document.querySelector("#speakButton");
const stopButton = document.querySelector("#stopButton");

let voices = [];

// Function to populate available voices
function populateVoices() {
    voices = synth.getVoices();
    voiceSelect.innerHTML = "";
    voices.forEach((voice, index) => {
        const option = document.createElement("option");
        option.textContent = `${voice.name} (${voice.lang})`;
        option.value = index;
        voiceSelect.appendChild(option);
    });
}

// Load voices when available
populateVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoices;
}

// Function to speak the text
function speakText() {
    if (synth.speaking) {
        synth.cancel(); // Stop ongoing speech before speaking new text
    }

    const text = textInput.value.trim();
    if (text === "") {
        alert("Please enter some text to speak!");
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoiceIndex = voiceSelect.value;
    utterance.voice = voices[selectedVoiceIndex];
    utterance.rate = rateInput.value;
    utterance.pitch = pitchInput.value;

    synth.speak(utterance);
}

// Function to stop speech
function stopSpeech() {
    synth.cancel();
}

// Event listeners for buttons
speakButton.addEventListener("click", speakText);
stopButton.addEventListener("click", stopSpeech);
