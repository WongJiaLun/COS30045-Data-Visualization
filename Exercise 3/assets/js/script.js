/**
 * Accordion functionality for FAQ section
 * Toggles 'open' class on accordion items when header is clicked
 */

document.addEventListener('DOMContentLoaded', function () {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(function (header) {
        header.addEventListener('click', function () {
            const accordionItem = this.closest('.accordion-item');
            const isOpen = accordionItem.classList.contains('open');

            // Optional: close other open items (uncomment for exclusive accordion)
            // const allItems = document.querySelectorAll('.accordion-item');
            // allItems.forEach(function (item) {
            //     if (item !== accordionItem) {
            //         item.classList.remove('open');
            //     }
            // });

            // Toggle the clicked item
            accordionItem.classList.toggle('open');

            // Update aria-expanded for accessibility
            const expanded = accordionItem.classList.contains('open') ? 'true' : 'false';
            this.setAttribute('aria-expanded', expanded);
        });
    });
});