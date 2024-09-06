import { getMediaByPhotographerID, getPhotographerByID, getPhotographers } from '../api/fetch_data.js';
import { PhotographerData, MediaData } from '../api/verify_data.js';
import { MediaTemplate } from '../templates/media.js';
import { PhotographerTemplate } from '../templates/photographer.js';
import { sortMedia } from '../utils/filterMedia.js';



async function populatePhotographer(photographer) {
    const photographerData = new PhotographerData(photographer);
    const data = photographerData.getUserData();
    const picture = photographerData.getUserPicture();
    const photographerModel = new PhotographerTemplate(data, picture);

    const photographerHeader = document.querySelector('.photograph-header');
    const main = document.querySelector('#main');
    const modalTitle = document.querySelector('#contact_modal h2');

    const infoDOM = photographerModel.getUserInfoDOM();
    photographerHeader.insertAdjacentElement('afterbegin', infoDOM);

    const pictureDOM = await photographerModel.getUserImgDOM();
    photographerHeader.insertAdjacentElement('beforeend', pictureDOM);

    const contactName = data.name;
    modalTitle.textContent += `\n ${contactName}`;

    const numbersDOM = await photographerModel.getUserNumbersDOM();
    main.insertAdjacentElement('beforeend', numbersDOM);
}

async function populateMedia(medias) {
    const mediaPromises = medias.map(async media => {
        const mediaData = new MediaData(media);
        const data = mediaData.getMediaData();
        const picture = await mediaData.getImage();
        const mediaModel = new MediaTemplate(data, picture);
        return mediaModel.getImgDOM();
    });

    const loadedMedias = await Promise.all(mediaPromises);
    const mediaContainer = document.querySelector('.media-container');
    loadedMedias.forEach(mediaDOM => {
        mediaContainer.insertAdjacentElement('beforeend', mediaDOM);
    });

    const sortByDefault = document.querySelectorAll('.filter-parameters > li')[0];
    sortMedia(sortByDefault, loadedMedias);
}

async function populateLightbox(medias) {
    const mediaPromises = medias.map(async media => {
        const mediaData = new MediaData(media);
        const data = mediaData.getMediaData();
        const picture = await mediaData.getMedia();
        const mediaType = mediaData.getMediaType();
        const mediaModel = new MediaTemplate(data, picture);
        return mediaModel.getMediaDOM(mediaType);
    });

    const loadedMedias = await Promise.all(mediaPromises);
    const lightbox = document.querySelector('.lightbox');
    loadedMedias.forEach(mediaDOM => {
        lightbox.insertAdjacentElement('beforeend', mediaDOM);
    });

    const sortByDefault = document.querySelectorAll('.filter-parameters > li')[0];
    sortMedia(sortByDefault, loadedMedias);
}

async function init() {
    const { photographers, media } = await getPhotographers();
    const id = new URLSearchParams(window.location.search).get('id');
    populatePhotographer(await getPhotographerByID(photographers, id));
    populateMedia(await getMediaByPhotographerID(media, id));
    populateLightbox(await getMediaByPhotographerID(media, id));
}

init();
