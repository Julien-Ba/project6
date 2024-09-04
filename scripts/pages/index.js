import { getPhotographers } from '../api/fetch_data.js';
import { PhotographerData } from '../api/verify_data.js';
import { PhotographerTemplate } from '../templates/photographer.js';



function displayUserCardDOM(photographers) {
    const photographersSection = document.querySelector('.photographer_section');

    photographers.forEach(async (photographer) => {
        const photographerData = new PhotographerData(photographer);
        const data = photographerData.getUserData();
        const picture = photographerData.getUserPicture();
        const photographerTemplate = new PhotographerTemplate(data, picture);
        photographersSection.appendChild(await photographerTemplate.getUserCardDOM());
    });
}

async function init() {
    const { photographers } = await getPhotographers();
    displayUserCardDOM(photographers);
}

init();
