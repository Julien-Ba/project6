const lightbox = document.querySelector('.background');

const mediaContainer = document.querySelector('.media-container');
mediaContainer.addEventListener('click', openLightbox);

const closeLightboxBtn = lightbox.querySelector('.fa-x');
closeLightboxBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('keydown', escLightbox);

const switchLightboxBtns = lightbox.querySelectorAll('.switch-lightbox');
switchLightboxBtns.forEach(btn => btn.addEventListener('click', switchLightbox));
lightbox.addEventListener('keydown', switchLightbox);

function openLightbox(event) {
    const media = event.target;
    if (!media.classList.contains('card-img')) return;
    lightbox.dataset.lightbox_opened = 'true';
    lightbox.ariaHidden = 'false';
    media.dataset.lightbox_focus = 'true';
}

function closeLightbox() {
    lightbox.dataset.lightbox_opened = 'false';
    lightbox.ariaHidden = 'true';
    mediaContainer.querySelectorAll('.card-img').forEach(img => img.dataset.lightbox_focus = 'false');
}

function escLightbox(event) {
    // Close lightbox when escape key is pressed
    const escKey = 27;
    if (lightbox.ariaHidden === 'false' && event.keyCode === escKey)
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
    const leftKey = 37;
    const rightKey = 39;
    if (lightbox.ariaHidden === 'true' && (event.keyCode !== leftKey || event.keyCode !== rightKey))
        return;
    let side = 'right';
    if (event.target.classList.contains('btn-previous') || event.keyCode === leftKey)
        side = 'left';
    return side;
}
