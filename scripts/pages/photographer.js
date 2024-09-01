import { getPhotographers } from '../api/fetch_data.js';
import { MediaTemplate } from '../templates/media.js';
import { PhotographerTemplate } from '../templates/photographer.js';
import { displayModal, closeModal } from '../utils/contactForm.js';
import { extendFilter, sortFilters, sortMedia } from '../utils/filterMedia.js';



async function populatePhotographer(photographers, id) {
    photographers.forEach(async (photographer) => {
        if (photographer.id != id) return;

        const photographerHeader = document.querySelector('.photograph-header');
        const photographerModel = new PhotographerTemplate(photographer);

        const infoDOM = photographerModel.getUserInfoDOM();
        photographerHeader.insertAdjacentElement('afterbegin', infoDOM);

        const pictureDOM = await photographerModel.getUserImgDOM();
        photographerHeader.insertAdjacentElement('beforeend', pictureDOM);
    });
}

async function populateMedia(medias, id) {
    const mediaPromises = medias
        .filter(media => media.photographerId == id)
        .map(async (media) => {
            const mediaModel = new MediaTemplate(media);
            return await mediaModel.getMediaDOM();
        });

    const loadedMedias = await Promise.all(mediaPromises);
    const mediaContainer = document.querySelector('.media-container');
    loadedMedias.forEach(mediaDOM => {
        mediaContainer.insertAdjacentElement('beforeend', mediaDOM);
    });

    const sortByDefault = document.querySelectorAll('.filter-parameters > li')[0];
    sortMedia(sortByDefault);
}

async function init() {
    const { photographers, media } = await getPhotographers();
    const id = new URLSearchParams(window.location.search).get('id');
    populatePhotographer(photographers, id);
    populateMedia(media, id);
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
