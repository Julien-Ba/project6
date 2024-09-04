export { sortMedia };



const extendFilterBtn = document.querySelector('.filter-extender');
extendFilterBtn.addEventListener('click', extendFilter);

const filterParameters = document.querySelectorAll('.filter-parameters > li');
filterParameters.forEach(filter => filter.addEventListener('click', sortFilters));

function extendFilter(event) {
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

function sortFilters(event) {
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

    // return extendFilter(extender)
    extender.click();

    // sort media by event.target
    sortMedia(target);
}

function sortMedia(parameter) {
    const medias = Array.from(document.querySelectorAll('.media-container > .card'));
    switch (parameter.textContent) {
        case 'Titre':
            medias.sort((a, b) => {
                const titleA = a.querySelector('.card-title').textContent.toLowerCase();
                const titleB = b.querySelector('.card-title').textContent.toLowerCase();
                return titleA.localeCompare(titleB);
            });
            break;
        case 'Popularité':
            medias.sort((a, b) => {
                const likesA = Number(a.querySelector('.card-likes').textContent);
                const likesB = Number(b.querySelector('.card-likes').textContent);
                return likesB - likesA;
            });
            break;
        case 'Date':
            break;
        default:
            console.warn('Invalid sorting parameter');
    }

    const fragment = document.createDocumentFragment();
    medias.forEach(media => fragment.appendChild(media));

    const parent = document.querySelector('.media-container');
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    parent.appendChild(fragment);
}
