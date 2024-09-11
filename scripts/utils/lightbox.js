import { simulateClick, trapFocus } from "../api/accessibility.js";





// ----- Variables ----- \\


const mediaContainer = document.querySelector('.media-container');
const lightbox = document.querySelector('.lightbox');

const focusableElements = lightbox.querySelectorAll('button');
const closeLightboxBtn = lightbox.querySelector('button:has(.fa-x)');
const switchLightboxBtns = lightbox.querySelectorAll('button:has(.switch-lightbox)');





// ----- Event Listeners ----- \\

// open the lightbox
mediaContainer.addEventListener('click', openLightbox);
mediaContainer.addEventListener('keydown', simulateClick);

// close the lightbox
closeLightboxBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('keydown', escLightbox);

// switch media
switchLightboxBtns.forEach(btn => btn.addEventListener('click', switchLightbox));
lightbox.addEventListener('keydown', switchLightbox);

// accessibility
lightbox.addEventListener('keydown', event => trapFocus(event, focusableElements));





// ----- Functions ----- \\

function openLightbox(event) {
    const media = event.target;
    if (!media.classList.contains('card-img')) return;
    lightbox.dataset.lightbox_opened = 'true';
    lightbox.ariaHidden = 'false';
    getFocusedMedia(event).dataset.lightbox_focus = 'true';
    const nextMediaBtn = lightbox.querySelector('button:has(.btn-next)');
    nextMediaBtn.focus();
    playVideo(getFocusedMedia(event));
}

function getFocusedMedia(event) {
    const lightboxMedia = lightbox.querySelectorAll('.card');
    const images = mediaContainer.querySelectorAll('.card-img');
    const len = images.length;
    let focusedMedia = lightboxMedia[0];

    for (let i = 0; i < len; i++) {
        if (images[i] !== event.target) continue;
        focusedMedia = lightboxMedia[i];
        break;
    }
    return focusedMedia;
}

function closeLightbox() {
    lightbox.dataset.lightbox_opened = 'false';
    lightbox.ariaHidden = 'true';
    const lightboxMedia = lightbox.querySelectorAll('.card');
    lightboxMedia.forEach(card => card.dataset.lightbox_focus = 'false');
}

function escLightbox(event) {
    // Close lightbox when escape key is pressed
    const isEscPressed = (event.key === 'Escape' || event.keyCode === 27);
    if (lightbox.ariaHidden === 'false' && isEscPressed)
        closeLightbox();
}

function switchLightbox(event) {
    const side = switchSide(event);
    if (!side) return;

    const lightboxMedia = lightbox.querySelectorAll('.card');
    const len = lightboxMedia.length;
    let index = 0;

    for (let i = 0; i < len; i++) {
        if (lightboxMedia[i].dataset.lightbox_focus && lightboxMedia[i].dataset.lightbox_focus == 'true') {
            index = i;
            break;
        }
    }

    lightboxMedia[index].dataset.lightbox_focus = 'false';

    if (side === 'left') {
        if (index === 0) index = len;
        lightboxMedia[index - 1].dataset.lightbox_focus = 'true';
        playVideo(lightboxMedia[index - 1]);
    } else {
        if (index === len - 1) index = -1;
        lightboxMedia[index + 1].dataset.lightbox_focus = 'true';
        playVideo(lightboxMedia[index + 1]);
    }
}

function switchSide(event) {
    //check if a switch button has been clicked or the keys left/right have been pressed

    if (lightbox.ariaHidden === 'true')
        return;

    if (event.type === 'keydown') {
        const isLeftPressed = event.key === 'ArrowLeft' || event.keyCode === 37;
        const isRightPressed = event.key === 'ArrowRight' || event.keyCode === 39;
        if (!isLeftPressed && !isRightPressed)
            return;
        return isLeftPressed ? 'left' : 'right';
    }

    if (event.type === 'click') {
        const previousMediaBtn = lightbox.querySelector('.btn-previous');
        const isPreviousClicked = event.target === previousMediaBtn || event.target === previousMediaBtn.parentElement;
        const nextMediaBtn = lightbox.querySelector('.btn-next');
        const isNextClicked = event.target === nextMediaBtn || event.target === nextMediaBtn.parentElement;
        if (!isPreviousClicked && !isNextClicked)
            return;
        return isPreviousClicked ? 'left' : 'right';
    }
}

function playVideo(card) {
    if (card.firstElementChild.tagName !== 'VIDEO')
        return;
    card.firstElementChild.currentTime = 0;
    card.firstElementChild.play();
}
