document.addEventListener("DOMContentLoaded", function() {

    // --- Expandable Card Logic ---
    const eventCards = document.querySelectorAll('.event-card');
    const EXPAND_THRESHOLD_PX = 130; // Content taller than this will be expandable

    eventCards.forEach(card => {
        const description = card.querySelector('.description');
        // Check if the description's full height exceeds the threshold
        if (description && description.scrollHeight > EXPAND_THRESHOLD_PX) {
            card.classList.add('expandable');
            card.addEventListener('click', () => {
                description.classList.toggle('expanded');
            });
        }
    });


    // --- Timeline Animation Logic ---
    
    // Get all the event cards
    const events = document.querySelectorAll('.event-card');

    // This function checks if an element is in the viewport and adds the 'visible' class
    const revealOnScroll = () => {
        // Set a trigger point for the animation (85% from the top of the viewport)
        const triggerBottom = window.innerHeight * 0.85;

        events.forEach(el => {
            const boxTop = el.getBoundingClientRect().top;

            // If the top of the card is above the trigger point, make it visible
            if (boxTop < triggerBottom) {
                el.classList.add('visible');
            }
        });
    };
    
    // Add an event listener to run the check every time the user scrolls
    window.addEventListener('scroll', revealOnScroll);
    
    // Run the check once on page load to reveal any events already in view
    revealOnScroll();
});

document.addEventListener('DOMContentLoaded', function() {
    const expandableCards = document.querySelectorAll('.event-card[data-expandable="true"]');

    expandableCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('expanded');
        });
    });
});