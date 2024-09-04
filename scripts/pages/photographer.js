import { getMediaByPhotographerID, getPhotographerByID, getPhotographers } from '../api/fetch_data.js';
import { MediaTemplate } from '../templates/media.js';
import { PhotographerTemplate } from '../templates/photographer.js';
import { sortMedia } from '../utils/filterMedia.js';



async function populatePhotographer(photographer) {
    const photographerModel = new PhotographerTemplate(photographer);

    const photographerHeader = document.querySelector('.photograph-header');
    const main = document.querySelector('#main');
    const modalTitle = document.querySelector('#contact_modal h2');

    const infoDOM = photographerModel.getUserInfoDOM();
    photographerHeader.insertAdjacentElement('afterbegin', infoDOM);

    const pictureDOM = await photographerModel.getUserImgDOM();
    photographerHeader.insertAdjacentElement('beforeend', pictureDOM);

    const contactName = photographerModel.getUserData().name;
    modalTitle.textContent += `\n ${contactName}`;

    const numbersDOM = await photographerModel.getUserNumbersDOM();
    main.insertAdjacentElement('beforeend', numbersDOM);
}

async function populateMedia(medias) {
    const mediaPromises = medias.map(media => {
        const mediaModel = new MediaTemplate(media);
        return mediaModel.getMediaDOM();
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
    populatePhotographer(await getPhotographerByID(photographers, id));
    populateMedia(await getMediaByPhotographerID(media, id));
}

init();
