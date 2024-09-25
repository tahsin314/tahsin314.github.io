document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('dynamic-text');
    const textDisplay = document.createElement('span');
    container.appendChild(textDisplay);
    const cursor = document.createElement('span');
    cursor.textContent = '█'; // Cursor character
    cursor.style.opacity = '1';
    container.appendChild(cursor); // Add cursor to the DOM

    const phrases = [
        "I am an AI and machine learning researcher specializing in developing deep learning models for medical imaging and natural language processing tasks.",
        "With expertise in computer vision and sequence modeling, I have co-authored several publications on patient assessment, diagnostic tools, and anomaly detection.",
        "My work covers a range of projects, including ICU patient monitoring, object detection, and disease diagnosis support using multimodal data integration.",
        "I’m passionate about advancing healthcare through innovative AI solutions—but let’s be honest, I sometimes spend more time procrastinating on my next research paper than actually writing it!",
        "Despite my creative distractions, I’ve still managed to gain recognition in various deep learning competitions. Imagine what I could achieve if I stopped getting sidetracked!"
    ];
    
    let phraseIndex = 0;
    let wordIndex = 0;
    let words = [];
    let isBuilding = false;

    function typeWords() {
        if (!isBuilding && phraseIndex < phrases.length) {
            words = phrases[phraseIndex].split(" ");
            isBuilding = true;
            wordIndex = 0;
        }

        if (wordIndex < words.length) {
            textDisplay.textContent += (wordIndex === 0 ? '' : ' ') + words[wordIndex++];
            setTimeout(typeWords, 100); // Delay before next word
        } else if (phraseIndex < phrases.length) {
            textDisplay.textContent += '\n'; // Move to next line after a phrase
            phraseIndex++;
            isBuilding = false;
            if (phraseIndex < phrases.length) {
                setTimeout(typeWords, 1000); // Delay before next phrase
            }
        }
    }

    typeWords(); // Start typing process

    // Blinking cursor effect
    setInterval(function() {
        cursor.style.opacity = (cursor.style.opacity === '0' ? '1' : '0');
    }, 500);
});
