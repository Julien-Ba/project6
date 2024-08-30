import { getPhotographers } from '../api/fetch_data.js';
import { PhotographerTemplate } from '../templates/photographer.js';



async function populatePhotographer(photographers) {
    const photographerHeader = document.querySelector('.photograph-header');

    photographers.forEach(async (photographer) => {
        const id = new URLSearchParams(window.location.search).get('id');
        if (photographer.id != id) return;

        const photographerModel = new PhotographerTemplate(photographer);

        const infoDOM = photographerModel.getUserInfoDOM();
        photographerHeader.insertAdjacentElement('afterbegin', infoDOM);

        const pictureDOM = await photographerModel.getUserImgDOM();
        photographerHeader.insertAdjacentElement('beforeend', pictureDOM);
    });
}

async function init() {
    const { photographers } = await getPhotographers();
    populatePhotographer(photographers);
}

init();