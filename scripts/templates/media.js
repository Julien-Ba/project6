export class MediaTemplate {

    constructor(data, media) {
        this.media = media;

        this.title = data.title;
        this.likes = data.likes;
        this.date = data.date;
    }

    getImgDOM() {
        const article = document.createElement('article');
        article.classList.add('card');

        const image = this.getMediaImgDOM();
        image.setAttribute('tabindex', '0');
        article.appendChild(image);
        article.appendChild(this.getMediaTitleDOM());
        article.appendChild(this.getMediaLikesDOM());
        return article;
    }

    getMediaDOM(type) {
        const article = document.createElement('article');
        article.classList.add('card');

        if (type === 'image') {
            article.appendChild(this.getMediaImgDOM());
        } else {
            article.appendChild(this.getMediaVideoDOM());
        }
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
        img.classList.add('card-media');
        img.dataset.date = this.date;
        return img;
    }

    getMediaVideoDOM() {
        const video = document.createElement('video');
        video.src = this.media;
        video.alt = this.title;
        video.loop = true;
        video.classList.add('card-video');
        video.classList.add('card-media');
        video.dataset.date = this.date;
        return video;
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
