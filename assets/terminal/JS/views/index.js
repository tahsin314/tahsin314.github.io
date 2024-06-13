document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('dynamic-text');
    const textDisplay = document.createElement('span');
    container.appendChild(textDisplay);
    const cursor = document.createElement('span');
    cursor.textContent = '█'; // Cursor character
    cursor.style.opacity = '1';
    container.appendChild(cursor); // Add cursor to the DOM

    const phrases = [
        "As a master tinkerer of the virtual and physical realms,",
        "I’ve parlayed my passion for electrical engineering from the vibrant classrooms of Bangladesh University of Engineering and Technology (BUET) to the innovative labs at the University of Florida.",
        "From designing life-saving medical diagnostic tools to mentoring future prodigies in the art of machine learning,",
        "my journey is punctuated with one mission: to blend technology and healthcare in ways that were once thought to be the stuff of science fiction.",
        "When I’m not programming the next big AI breakthrough or analyzing complex datasets,",
        "you might find me deep in the pages of a sci-fi novel, drawing inspiration for my next project,",
        "or crafting algorithms that might one day power your smart devices.",
        "After all, in a world increasingly run by technology, someone needs to hold the reins and ensure it's used for good—why not me?"
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
