const container = document.querySelector('.media-container');
container.addEventListener('click', likesCounter);

function likesCounter(event) {
    const likes = event.target;

    if (!likes.classList.contains('card-likes')) return;

    const totalLikes = document.querySelector('.total-likes');

    if (!likes.dataset.liked || likes.dataset.liked === 'false') {
        likes.textContent = (parseInt(likes.textContent) + 1).toString();
        totalLikes.textContent = (parseInt(totalLikes.textContent) + 1).toString();
        likes.dataset.liked = 'true';
        return;
    }

    if (likes.dataset.liked === 'true') {
        likes.textContent = (parseInt(likes.textContent) - 1).toString();
        totalLikes.textContent = (parseInt(totalLikes.textContent) - 1).toString();
        likes.dataset.liked = 'false';
    }
}