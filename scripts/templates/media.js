import { MediaData } from "../api/verify_data.js";



export class MediaTemplate extends MediaData {

    constructor(data) {
        super(data);
    }

    async getMediaDOM() {
        const article = document.createElement('article');
        article.classList.add('card');

        article.appendChild(await this.getMediaImgDOM());
        article.appendChild(this.getMediaTitleDOM());
        article.appendChild(this.getMediaLikesDOM());
        return article;
    }

    async getMediaImgDOM() {
        const img = document.createElement('img');
        img.src = await this.getMedia();
        img.alt = this.getMediaData().title;
        img.loading = 'lazy';
        img.classList.add('card-img');
        return img;
    }

    getMediaTitleDOM() {
        const h2 = document.createElement('h2');
        h2.textContent = this.getMediaData().title;
        h2.classList.add('card-title');
        return h2;
    }

    getMediaLikesDOM() {
        const p = document.createElement('p');
        p.textContent = this.getMediaData().likes;
        p.classList.add('card-likes');
        return p;
    }

}
