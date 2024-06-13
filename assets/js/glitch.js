const glitchElements = document.querySelectorAll('.glitch');

function glitchText() {
  glitchElements.forEach(element => {
    const glitchColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`; // Random glitch color

    // Less frequent color change for Matrix-like effect
    if (Math.random() > 0.9) {
      element.style.color = glitchColor;
    }

    element.style.textShadow = `
      0 0 2px ${glitchColor},
      2px 2px 4px rgba(0, 0, 0, 0.2),
      -2px -2px 4px rgba(0, 0, 0, 0.2)
    `;
  });
}

setInterval(glitchText, 200); // Update glitch effect less frequently for Matrix style
