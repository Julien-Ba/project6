import { PhotographerTemplate } from '../templates/photographer.js';



async function getPhotographers() {
    const src = 'data/photographers.json';
    try {
        const response = await fetch(src);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.debug(json);
        return json;
    } catch (error) {
        console.error(error.message);
    }
}

async function displayData(photographers) {
    const photographersSection = document.querySelector('.photographer_section');

    photographers.forEach((photographer) => {
        const photographerModel = new PhotographerTemplate(photographer);
        photographerModel.getUserCardDOM().then(cardDOM => {
            photographersSection.appendChild(cardDOM);
        }).catch(error => {
            console.error('Error creating photographer card:', error);
        });
    });
}

async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();
