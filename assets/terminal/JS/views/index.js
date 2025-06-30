// terminal.js - Logic for the hero section terminal text animation

document.addEventListener('DOMContentLoaded', () => {
    const dynamicTextElement = document.getElementById('dynamic-text');
    if (dynamicTextElement) {
        const terminalPhrases = [
            "I am an AI and machine learning researcher specializing in developing deep learning models for medical imaging and natural language processing tasks.",
            "With expertise in computer vision and sequence modeling, I have co-authored several publications on patient assessment, diagnostic tools, and anomaly detection.",
            "My work covers a range of projects, including ICU patient monitoring, small object detection in CT images, and disease diagnosis support using multimodal data integration.",
            "I’m passionate about advancing healthcare through innovative AI solutions. However, I sometimes spend more time procrastinating on my next research ideas than actually working on it!",
            "Despite my creative distractions, I’ve still managed to gain recognition (mostly by my loving family members and friends LOL). Imagine what I could achieve if I stopped getting sidetracked!"
        ];
        let phraseIndex = 0; 
        let charIndex = 0; 
        let currentText = ''; 
        
        function typeTerminal() {
            if (charIndex < terminalPhrases[phraseIndex].length) {
                currentText += terminalPhrases[phraseIndex].charAt(charIndex);
                dynamicTextElement.textContent = currentText;
                dynamicTextElement.setAttribute('data-text', currentText); // For CSS glitch effect
                charIndex++;
                setTimeout(typeTerminal, 60); // Typing speed (ms per character)
            } else { 
                setTimeout(eraseTerminal, 3000); // Wait before erasing
            }
        }

        function eraseTerminal() {
            if (charIndex > 0) {
                currentText = terminalPhrases[phraseIndex].substring(0, charIndex - 1);
                dynamicTextElement.textContent = currentText;
                dynamicTextElement.setAttribute('data-text', currentText); 
                charIndex--;
                setTimeout(eraseTerminal, 35); // Erasing speed
            } else {
                phraseIndex = (phraseIndex + 1) % terminalPhrases.length; 
                currentText = ''; 
                dynamicTextElement.setAttribute('data-text', currentText);
                setTimeout(typeTerminal, 500); // Wait before typing next phrase
            }
        }

        if (terminalPhrases.length > 0) { 
            dynamicTextElement.classList.add('cursor-blink'); // Add cursor style once ready
            typeTerminal(); 
        }
    } else {
        console.warn("Terminal text element ('dynamic-text') not found.");
    }
});
