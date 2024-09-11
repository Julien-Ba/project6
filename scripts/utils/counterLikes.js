const container = document.querySelector('.media-container');
container.addEventListener('click', likesCounter);

function likesCounter(event) {
    const likes = event.target;

    if (!likes.classList.contains('card-likes')) return;

    const totalLikes = document.querySelector('.total-likes');

    if (!likes.dataset.liked || likes.dataset.liked === 'false') {
        isLikeNumber(likes, 0);
        likes.textContent = (Number(likes.textContent) + 1).toString();
        totalLikes.textContent = (Number(totalLikes.textContent) + 1).toString();
        likes.dataset.liked = 'true';
        return;
    }

    if (likes.dataset.liked === 'true') {
        isLikeNumber(likes, 1);
        likes.textContent = (Number(likes.textContent) - 1).toString();
        totalLikes.textContent = (Number(totalLikes.textContent) - 1).toString();
        likes.dataset.liked = 'false';
    }
}

function isLikeNumber(likes, resetPoint) {
    if (Number.isNaN(likes.textContent)) {
        console.warn(`The ${likes} was containing ${likes.textContent}, NOT a valid value, resetting to ${resetPoint} ...`);
        likes.textContent = `${resetPoint}`;
    }
}
