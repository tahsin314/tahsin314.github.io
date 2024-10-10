document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const images = document.querySelectorAll('.image-fluid');
  
    // Truncate content if necessary
    cards.forEach(card => {
        const body = card.querySelector('.vt-body');
        const maxHeight = 100; // Max height before truncation
  
        if (body.scrollHeight > maxHeight) {
            card.classList.add('truncated');
        }
    });
  
    // Toggle card expansion
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('image-fluid')) {
                card.classList.toggle('expanded');
                if (card.classList.contains('expanded')) {
                    card.classList.remove('truncated');
                } else {
                    const body = card.querySelector('.vt-body');
                    if (body.scrollHeight > 100) {
                        card.classList.add('truncated');
                    }
                }
            }
        });
    });
  
    // Toggle image expansion
    images.forEach(image => {
        image.addEventListener('click', (e) => {
            e.stopPropagation();
            if (image.classList.contains('expanded')) {
                image.classList.remove('expanded');
            } else {
                images.forEach(img => img.classList.remove('expanded'));
                image.classList.add('expanded');
            }
        });
    });
  });