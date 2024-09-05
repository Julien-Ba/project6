const lightbox = document.querySelector('.background');

document.addEventListener('click', openLightbox);

const closeLightboxBtn = document.querySelector('.lightbox-btn > .fa-x');
closeLightboxBtn.addEventListener('click', closeLightbox);
document.addEventListener('keydown', escLightbox);

const switchLightboxBtns = document.querySelectorAll('.switch-lightbox');
switchLightboxBtns.forEach(btn => btn.addEventListener('click', switchLightbox));
document.addEventListener('keydown', switchLightbox);

function openLightbox(event) {
    const media = event.target;
    if (!media.classList.contains('card-img') || !media.parentNode.classList.contains('card')) return;
    lightbox.dataset.lightbox_opened = 'true';
    lightbox.ariaHidden = 'false';
    media.dataset.lightbox_focus = 'true';
}

function closeLightbox() {
    lightbox.dataset.lightbox_opened = 'false';
    lightbox.ariaHidden = 'true';
    document.querySelectorAll('.card > .card-img').forEach(img => img.dataset.lightbox_focus = 'false');
}

function escLightbox(event) {
    // Close lightbox when escape key is pressed
    if (lightbox.ariaHidden === 'false' && event.keyCode === 27)
        closeLightbox();
}

function switchLightbox(event) {
    const side = switchSide(event);
    if (side == null) return;
    const medias = document.querySelectorAll('.media-container .card-img');
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
    // undefined allow clicks
    if (lightbox.ariaHidden === 'false' && event.keyCode !== undefined && event.keyCode !== 37 && event.keyCode !== 39 || event.keyCode === 27)
        return;
    let side = 'right';
    if (event.target.classList.contains('btn-previous') || event.keyCode === 37)
        side = 'left';
    return side;
}
