import { getPhotographers } from '../api/fetch_data.js';
import { PhotographerTemplate } from '../templates/photographer.js';



async function displayUserCardDOM(photographers) {
    const photographersSection = document.querySelector('.photographer_section');

    photographers.forEach(async (photographer) => {
        const photographerModel = new PhotographerTemplate(photographer);
        const cardDOM = await photographerModel.getUserCardDOM();
        photographersSection.appendChild(cardDOM);
    });
}

async function init() {
    const { photographers } = await getPhotographers();
    displayUserCardDOM(photographers);
}

init();
