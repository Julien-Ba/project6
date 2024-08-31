import { getPhotographers } from '../api/fetch_data.js';
import { MediaTemplate } from '../templates/media.js';
import { PhotographerTemplate } from '../templates/photographer.js';
import { displayModal, closeModal } from '../utils/contactForm.js';
import { extendFilter, sortFilters } from '../utils/filterMedia.js';



async function populatePhotographer(photographers, medias) {

    const id = new URLSearchParams(window.location.search).get('id');

    photographers.forEach(async (photographer) => {
        if (photographer.id != id) return;

        const photographerHeader = document.querySelector('.photograph-header');
        const photographerModel = new PhotographerTemplate(photographer);

        const infoDOM = photographerModel.getUserInfoDOM();
        photographerHeader.insertAdjacentElement('afterbegin', infoDOM);

        const pictureDOM = await photographerModel.getUserImgDOM();
        photographerHeader.insertAdjacentElement('beforeend', pictureDOM);
    });

    const mediaContainer = document.querySelector('.media-container');

    medias.forEach(async (media) => {
        if (media.photographerId != id) return;
        const mediaModel = new MediaTemplate(media);

        const mediaDOM = await mediaModel.getMediaDOM();
        mediaContainer.insertAdjacentElement('beforeend', mediaDOM);
    });

}

async function init() {
    const { photographers, media } = await getPhotographers();
    populatePhotographer(photographers, media);
}

init();

const openModalBtn = document.querySelector('.contact_button');
openModalBtn.addEventListener('click', displayModal);

const closeModalBtn = document.querySelector('.close-modal-btn');
closeModalBtn.addEventListener('click', closeModal);

const extendFilterBtn = document.querySelector('.filter-extender');
extendFilterBtn.addEventListener('click', extendFilter);

const filterContainer = document.querySelector('.filter-parameters');
const filterParameters = filterContainer.querySelectorAll(':scope > li');
filterParameters.forEach((filter) => filter.addEventListener('click', sortFilters));
