export class MediaTemplate {

    constructor(data, media) {
        this.media = media;

        this.title = data.title;
        this.likes = data.likes;
    }

    getMediaDOM() {
        const article = document.createElement('article');
        article.classList.add('card');

        article.appendChild(this.getMediaImgDOM());
        article.appendChild(this.getMediaTitleDOM());
        article.appendChild(this.getMediaLikesDOM());
        return article;
    }

    getMediaImgDOM() {
        const img = document.createElement('img');
        img.src = this.media;
        img.alt = this.title;
        img.loading = 'lazy';
        img.classList.add('card-img');
        return img;
    }

    getMediaTitleDOM() {
        const h2 = document.createElement('h2');
        h2.textContent = this.title;
        h2.classList.add('card-title');
        return h2;
    }

    getMediaLikesDOM() {
        const p = document.createElement('p');
        p.textContent = this.likes;
        p.classList.add('card-likes');
        p.ariaLabel = 'number of likes';
        return p;
    }

}
