import { PhotographerData } from "../api/verify_data.js";


export class PhotographerTemplate extends PhotographerData {

    constructor(data) {
        super(data);
    }

    async getUserCardDOM() {
        const article = document.createElement('article');
        article.classList.add('card');

        const link = document.createElement('a');
        link.href = `./photographer.html?id=${this.getUserData().id}`;
        article.appendChild(link);

        link.appendChild(await this.getUserImgDOM());
        link.appendChild(this.getUserNameDOM());
        link.appendChild(this.getUserLocationDOM());
        link.appendChild(this.getUserTaglineDOM());
        link.appendChild(this.getUserPriceDOM());

        return article;
    }

    getUserInfoDOM() {
        const div = document.createElement('div');
        div.classList.add('user-info');

        div.appendChild(this.getUserNameDOM());
        div.appendChild(this.getUserLocationDOM());
        div.appendChild(this.getUserTaglineDOM());

        return div;
    }

    async getUserNumbersDOM() {
        const div = document.createElement('div');
        div.classList.add('user-numbers');

        div.appendChild(await this.getUserLikesDOM());
        div.appendChild(this.getUserPriceDOM());

        return div;
    }

    async getUserImgDOM() {
        const img = document.createElement('img');
        img.src = await this.getUserPicture();
        img.alt = `Portrait of ${this.getUserData().name}`;
        img.loading = 'lazy';
        img.classList.add('card-img');
        return img;
    }

    getUserNameDOM() {
        const h2 = document.createElement('h2');
        h2.textContent = this.getUserData().name;
        h2.classList.add('card-title');
        return h2;
    }

    getUserLocationDOM() {
        const h3 = document.createElement('h3');
        h3.textContent = `${this.getUserData().city}, ${this.getUserData().country}`;
        h3.classList.add('card-subtitle');
        return h3;
    }

    getUserTaglineDOM() {
        const p = document.createElement('p');
        p.textContent = this.getUserData().tagline;
        p.classList.add('card-description');
        return p;
    }

    getUserPriceDOM() {
        const p = document.createElement('p');
        p.textContent = `${this.getUserData().price}€/jour`;
        p.classList.add('card-price');
        return p;
    }

    getUserLikesDOM() {
        return new Promise((resolve) => {
            const observer = new MutationObserver((mutations, obs) => {
                const cardLikes = document.querySelectorAll('.card-likes');
                if (cardLikes.length > 0) {
                    obs.disconnect();

                    const p = document.createElement('p');
                    let likes = 0;

                    cardLikes.forEach(cardLike => likes += +cardLike.textContent);

                    p.textContent = likes;
                    p.classList.add('card-likes', 'total-likes');

                    resolve(p);
                }
            });

            observer.observe(document.querySelector('#main'), {
                subtree: true,
                childList: true
            });
        });
    }

}
