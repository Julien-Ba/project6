export function extendFilter(event) {
    const btn = event.target;
    if (btn.classList.contains('fa-chevron-down')) {
        btn.classList.remove('fa-chevron-down');
        btn.classList.add('fa-chevron-up');
    } else {
        btn.classList.remove('fa-chevron-up');
        btn.classList.add('fa-chevron-down');
    }

    const elements = document.querySelectorAll('.filter-parameters > *:not(:first-child)');
    elements.forEach(element => {
        element.style.display === '' ? element.style.display = 'block' : element.style.display = '';
    });
    document.querySelector('.filter-parameters').firstElementChild.style.display = 'block';
}

export function sortFilters(event) {
    const target = event.target;
    const parent = target.parentElement;
    const filters = Array.from(parent.querySelectorAll(':scope > li'));
    const lines = Array.from(parent.querySelectorAll(':scope > .hr'));
    const extender = parent.previousElementSibling;

    // Doesn't need to sort filters -> return extendFilter(extender);
    if (target === parent.firstElementChild) return extender.click();

    // Move the clicked filter to the top
    filters.unshift(filters.splice(filters.indexOf(target), 1)[0]);

    // Create a document fragment to hold the new order
    const fragment = document.createDocumentFragment();

    // Reinsert elements in the correct order
    filters.forEach((filter, index) => {
        if (index === 0) {
            fragment.appendChild(filter);
        } else {
            fragment.appendChild(lines[index - 1]);
            fragment.appendChild(filter);
        }
    });

    // Clear the parent and append the fragment
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    parent.appendChild(fragment);

    // return extendFilter(extender);
    extender.click();
}
