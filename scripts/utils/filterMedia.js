import { simulateClick, trapFocus } from "../api/accessibility.js";
export { sortMedia };



const container = document.querySelector('.filter-container');
let focusableElements = container.querySelectorAll('i,li');
container.addEventListener('keydown', event => trapFocus(event, focusableElements));

const extendFilterBtn = container.querySelector('.filter-extender');
extendFilterBtn.addEventListener('click', extendFilter);
extendFilterBtn.addEventListener('keydown', simulateClick);
// disalbe default fontawesome behaviour
setTimeout(() => {
    extendFilterBtn.ariaHidden = false;
}, 3000);

const filterParameters = container.querySelectorAll('.filter-parameters > li');
filterParameters.forEach(filter => filter.addEventListener('click', sortFilters));
filterParameters.forEach(filter => filter.addEventListener('keydown', simulateClick));

function extendFilter(event) {
    const btn = event.target;
    // if the container was closed
    if (btn.classList.contains('fa-chevron-down')) {
        // toggle the close icon
        btn.classList.remove('fa-chevron-down');
        btn.classList.add('fa-chevron-up');
        // add focus to the list elements, ignore the icon
        for (let i = 1; i < focusableElements.length; i++) {
            focusableElements[i].setAttribute('tabindex', '0');
        }
        // if the conatiner was open
    } else {
        // toggle the open icon
        btn.classList.remove('fa-chevron-up');
        btn.classList.add('fa-chevron-down');
        // remove the focus from the list elements, ignore the icon
        for (let i = 1; i < focusableElements.length; i++) {
            focusableElements[i].setAttribute('aria-hidden', 'true');
        }
    }

    // toggle the display on all the elements but the first one
    const elements = document.querySelectorAll('.filter-parameters > *:not(:first-child)');
    elements.forEach(element => {
        element.style.display = element.style.display === 'block' ? '' : 'block';
    });
    // if elements order was changed, display the first one as per default
    const firstElement = document.querySelector('.filter-parameters').firstElementChild;
    firstElement.style.display = 'block';

    // reset the list order for the focus trap
    focusableElements = container.querySelectorAll('i,li');
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
    sortMedia(target, document.querySelectorAll('.media-container > .card'));
    sortMedia(target, document.querySelectorAll('.lightbox > .card'));
}

function sortMedia(parameter, elements) {
    const parent = elements[0].parentElement;
    const medias = Array.from(elements);
    for (let element in parent.childrenElements) {
        if (element.classList.contains('card'))
            parent.removeChild(parent.firstChild);
    }
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
            medias.sort((a, b) => {
                const dateA = Date.parse(a.querySelector('.card-media').dataset.date);
                const dateB = Date.parse(b.querySelector('.card-media').dataset.date);
                return dateB - dateA;
            });
            break;
        default:
            console.warn('Invalid sorting parameter');
    }

    const fragment = document.createDocumentFragment();
    medias.forEach(media => fragment.appendChild(media));
    parent.appendChild(fragment);
}
