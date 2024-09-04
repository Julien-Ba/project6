import { getPhotographers } from '../api/fetch_data.js';
import { MediaTemplate } from '../templates/media.js';
import { PhotographerTemplate } from '../templates/photographer.js';
import { displayModal, closeModal, validateForm } from '../utils/contactForm.js';
import { likesCounter } from '../utils/counterLikes.js';
import { extendFilter, sortFilters, sortMedia } from '../utils/filterMedia.js';
import { openLightbox, closeLightbox, switchLightbox } from '../utils/lightbox.js';



async function populatePhotographer(photographers, id) {
    for (const photographer of photographers) {
        if (photographer.id != id) continue;

        const photographerHeader = document.querySelector('.photograph-header');
        const main = document.querySelector('#main');
        const modalTitle = document.querySelector('#contact_modal h2');

        const photographerModel = new PhotographerTemplate(photographer);

        const infoDOM = photographerModel.getUserInfoDOM();
        photographerHeader.insertAdjacentElement('afterbegin', infoDOM);

        const pictureDOM = await photographerModel.getUserImgDOM();
        photographerHeader.insertAdjacentElement('beforeend', pictureDOM);

        const contactDOM = photographerModel.getUserData().name;
        modalTitle.textContent += `\n ${contactDOM}`;


        const numbersDOM = await photographerModel.getUserNumbersDOM();
        main.insertAdjacentElement('beforeend', numbersDOM);

        break;
    }
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

const submitForm = document.querySelector('form');
submitForm.addEventListener('submit', validateForm);

const extendFilterBtn = document.querySelector('.filter-extender');
extendFilterBtn.addEventListener('click', extendFilter);

const filterParameters = document.querySelectorAll('.filter-parameters > li');
filterParameters.forEach(filter => filter.addEventListener('click', sortFilters));

document.addEventListener('click', likesCounter);

document.addEventListener('click', openLightbox);

const closeLightboxBtn = document.querySelector('.lightbox-btn > .fa-x');
closeLightboxBtn.addEventListener('click', closeLightbox);

const switchLightboxBtns = document.querySelectorAll('.switch-lightbox');
switchLightboxBtns.forEach(btn => btn.addEventListener('click', switchLightbox));