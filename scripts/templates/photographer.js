import { PhotographerData } from "../api/photographer_data.js";


export class PhotographerTemplate extends PhotographerData {

    constructor(data) {
        super(data);
    }

    async getUserCardDOM() {
        const article = document.createElement('article');
        article.classList.add('card')

        const link = document.createElement('a');
        link.href = `./photographer.html?id=${this.getUserData().id}`;
        article.appendChild(link);

        link.appendChild(await this.createImg());
        link.appendChild(this.createTitle());
        link.appendChild(this.createSubtitle());
        link.appendChild(this.createDescription());
        link.appendChild(this.createPrice());

        return article;
    }

    async createImg() {
        const img = document.createElement('img');
        img.src = await this.getUserPicture();
        img.alt = `Portrait of ${this.getUserData().name}`;
        img.loading = 'lazy';
        img.classList.add('card-img');
        return img;
    }

    createTitle() {
        const h2 = document.createElement('h2');
        h2.textContent = this.getUserData().name;
        h2.classList.add('card-title');
        return h2;
    }

    createSubtitle() {
        const h3 = document.createElement('h3');
        h3.textContent = `${this.getUserData().city}, ${this.getUserData().country}`;
        h3.classList.add('card-subtitle');
        return h3;
    }

    createDescription() {
        const p = document.createElement('p');
        p.textContent = this.getUserData().tagline;
        p.classList.add('card-description');
        return p;
    }

    createPrice() {
        const p = document.createElement('p');
        p.textContent = `${this.getUserData().price}€/jour`;
        p.classList.add('card-price');
        return p;
    }

}
