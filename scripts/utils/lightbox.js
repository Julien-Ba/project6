import { trapFocus } from "../api/accessibility.js";





// ----- Variables ----- \\

const lightbox = document.querySelector('.background');
const focusableEls = lightbox.querySelectorAll('button');
const mediaContainer = document.querySelector('.media-container');
const closeLightboxBtn = lightbox.querySelector('button:has(.fa-x)');
const switchLightboxBtns = lightbox.querySelectorAll('button:has(.switch-lightbox)');
const previousMediaBtn = lightbox.querySelector('button:has(.btn-previous)');
const nextMediaBtn = lightbox.querySelector('button:has(.btn-next)');





// ----- Event Listeners ----- \\

// open the lightbox
mediaContainer.addEventListener('click', openLightbox);

// close the lightbox
closeLightboxBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('keydown', escLightbox);

// switch media
switchLightboxBtns.forEach(btn => btn.addEventListener('click', switchLightbox));
lightbox.addEventListener('keydown', switchLightbox);

// accessibility
lightbox.addEventListener('keydown', event => trapFocus(event, focusableEls));





// ----- Functions ----- \\

function openLightbox(event) {
    const media = event.target;
    if (!media.classList.contains('card-img')) return;
    lightbox.dataset.lightbox_opened = 'true';
    lightbox.ariaHidden = 'false';
    media.dataset.lightbox_focus = 'true';
    nextMediaBtn.focus();
}

function closeLightbox() {
    lightbox.dataset.lightbox_opened = 'false';
    lightbox.ariaHidden = 'true';
    mediaContainer.querySelectorAll('.card-img').forEach(img => img.dataset.lightbox_focus = 'false');
}

function escLightbox(event) {
    // Close lightbox when escape key is pressed
    const isEscPressed = (event.key === 'Escape' || event.keyCode === 27);
    if (lightbox.ariaHidden === 'false' && isEscPressed)
        closeLightbox();
}

function switchLightbox(event) {
    const side = switchSide(event);
    if (side === undefined) return;
    const medias = mediaContainer.querySelectorAll('.card-img');
    const len = medias.length;
    let index = 0;

    for (let i = 0; i < len; i++) {
        if (medias[i].dataset.lightbox_focus && medias[i].dataset.lightbox_focus == 'true') {
            index = i;
            break;
        }
    }

    medias[index].dataset.lightbox_focus = 'false';

    if (side === 'left') {
        if (index === 0) index = len;
        medias[index - 1].dataset.lightbox_focus = 'true';
    } else {
        if (index === len - 1) index = -1;
        medias[index + 1].dataset.lightbox_focus = 'true';
    }
}

function switchSide(event) {
    //check if a switch button has been clicked or the keys left/right have been pressed

    if (lightbox.ariaHidden === 'true')
        return;

    const isLeftPressed = event.key === 'ArrowLeft' || event.keyCode === 37;
    const isRightPressed = event.key === 'ArrowRight' || event.keyCode === 39;
    const isPreviousClicked = event.target === previousMediaBtn;
    const isNextClicked = event.target === nextMediaBtn;

    if (event.type === 'keydown' && !isLeftPressed && !isRightPressed)
        return;
    if (event.type === 'click' && !isPreviousClicked && !isNextClicked)
        return;

    let side = 'right';
    if (isPreviousClicked || isLeftPressed)
        side = 'left';

    return side;
}
