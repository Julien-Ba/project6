document.addEventListener('click', openLightbox);

const closeLightboxBtn = document.querySelector('.lightbox-btn > .fa-x');
closeLightboxBtn.addEventListener('click', closeLightbox);

const switchLightboxBtns = document.querySelectorAll('.switch-lightbox');
switchLightboxBtns.forEach(btn => btn.addEventListener('click', switchLightbox));

function openLightbox(event) {
    const media = event.target;
    if (!media.classList.contains('card-img') || !media.parentNode.classList.contains('card')) return;
    const container = document.querySelector('.background');
    container.dataset.lightbox_opened = 'true';
    container.ariaHidden = 'false';
    media.dataset.lightbox_focus = 'true';
}

function closeLightbox() {
    const container = document.querySelector('.background');
    container.dataset.lightbox_opened = 'false';
    container.ariaHidden = 'true';
    document.querySelectorAll('.card > .card-img').forEach(img => img.dataset.lightbox_focus = 'false');
}

function switchLightbox(event) {
    const side = event.target;
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

    if (side.classList.contains('btn-previous')) {
        if (index === 0) index = len;
        medias[index - 1].dataset.lightbox_focus = 'true';
    } else {
        if (index === len - 1) index = -1;
        medias[index + 1].dataset.lightbox_focus = 'true';
    }
}
