// include.js

async function includeHTML() {
    const includes = document.querySelectorAll('[data-include]');
    for (const el of includes) {
        const file = el.getAttribute('data-include');
        try {
            const response = await fetch(file);
            if (!response.ok) throw new Error(`${file} not found`);
            const html = await response.text();
            el.innerHTML = html;
        } catch (err) {
            console.error('Include failed:', err);
        }
    }

    // Optional: Activate sticky header after insert
    const header = document.getElementById("header");
    if (header) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 50) {
                header.classList.add("is-sticky");
            } else {
                header.classList.remove("is-sticky");
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", includeHTML);
