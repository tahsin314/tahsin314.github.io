document.addEventListener('DOMContentLoaded', function () {
    const events = document.querySelectorAll('.cd-h-timeline__event');
    const dates = document.querySelectorAll('.cd-h-timeline__date');
    let currentIndex = Array.from(events).findIndex(event => event.classList.contains('cd-h-timeline__event--selected'));

    function updateTimeline(index) {
        if (index < 0 || index >= events.length) return; // Boundary condition check

        // Remove active class from all events and dates
        events.forEach(event => event.classList.remove('cd-h-timeline__event--selected'));
        dates.forEach(date => date.classList.remove('cd-h-timeline__date--selected'));

        // Add active class to current event and date
        events[index].classList.add('cd-h-timeline__event--selected');
        dates[index].classList.add('cd-h-timeline__date--selected');

        // Update the currentIndex
        currentIndex = index;
        updateNavigationButtons();
    }

    function updateNavigationButtons() {
        // Update the Previous/Next buttons' state
        const prevButton = document.querySelector('.cd-h-timeline__navigation--prev');
        const nextButton = document.querySelector('.cd-h-timeline__navigation--next');
        
        if (currentIndex <= 0) {
            prevButton.classList.add('cd-h-timeline__navigation--inactive');
        } else {
            prevButton.classList.remove('cd-h-timeline__navigation--inactive');
        }

        if (currentIndex >= events.length - 1) {
            nextButton.classList.add('cd-h-timeline__navigation--inactive');
        } else {
            nextButton.classList.remove('cd-h-timeline__navigation--inactive');
        }
    }

    // Event listener for Previous button
    document.querySelector('.cd-h-timeline__navigation--prev').addEventListener('click', () => {
        updateTimeline(currentIndex - 1);
    });

    // Event listener for Next button
    document.querySelector('.cd-h-timeline__navigation--next').addEventListener('click', () => {
        updateTimeline(currentIndex + 1);
    });

    // Initialize the navigation buttons state
    updateNavigationButtons();
});
