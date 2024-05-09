document.addEventListener('DOMContentLoaded', function () {
    var iso = new Isotope('#container-projects', {
        itemSelector: '.project-item',
        layoutMode: 'fitRows'
    });

    // Binding filter buttons
    document.querySelectorAll('.btn-group button').forEach(function(button) {
        button.addEventListener('click', function() {
            var filterValue = this.getAttribute('data-filter');
            iso.arrange({ filter: filterValue });
        });
    });
});
